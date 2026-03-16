import { Request, Response } from 'express';
import { audioService } from '@/services/audio.service';
import { AuthenticatedRequest } from '@/types';
import asyncHandler from '@/utils/asyncHandler';
import multer from 'multer';

// Configure multer for audio file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB
  },
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      'audio/mpeg',
      'audio/mp3',
      'audio/wav',
      'audio/wave',
      'audio/x-wav',
      'audio/mp4',
      'audio/m4a',
      'audio/ogg',
      'audio/webm',
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Faqat audio fayllari ruxsat etilgan (MP3, WAV, M4A, OGG, WebM)'));
    }
  },
});

export const uploadAudio = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;
  
  // Use multer middleware to handle file upload
  upload.single('audio')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Audio fayli yuborilmadi',
      });
    }

    try {
      const processedAudio = await audioService.uploadAudio({
        file: req.file.buffer,
        filename: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
        duration: req.body.duration ? parseFloat(req.body.duration) : undefined,
      });

      res.status(201).json({
        success: true,
        data: processedAudio,
        message: 'Audio fayli muvaffaqiyatli yuklandi',
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Audio yuklashda xatolik',
      });
    }
  });
});

export const getAudio = asyncHandler(async (req: Request, res: Response) => {
  const { filename } = req.params;

  const audioFile = audioService.getAudioFile(filename);

  if (!audioFile) {
    return res.status(404).json({
      success: false,
      message: 'Audio fayli topilmadi',
    });
  }

  // Set appropriate headers
  res.setHeader('Content-Type', audioFile.mimeType);
  res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
  res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year

  // Stream the file
  res.sendFile(audioFile.filePath);
});

export const getAudioInfo = asyncHandler(async (req: Request, res: Response) => {
  const { filename } = req.params;

  const audioInfo = audioService.getAudioInfo(filename);

  if (!audioInfo) {
    return res.status(404).json({
      success: false,
      message: 'Audio fayli topilmadi',
    });
  }

  res.json({
    success: true,
    data: {
      filename,
      size: audioInfo.size,
      formattedSize: audioService.formatFileSize(audioInfo.size),
      uploadedAt: audioInfo.uploadedAt,
    },
    message: 'Audio ma\'lumotlari muvaffaqiyatli olindi',
  });
});

export const deleteAudio = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;
  const { filename } = req.params;

  // In a real application, you would check if the user owns this audio file
  // For now, we'll allow any authenticated user to delete

  const deleted = await audioService.deleteAudio(filename);

  if (!deleted) {
    return res.status(404).json({
      success: false,
      message: 'Audio fayli topilmadi yoki allaqachon o\'chirilgan',
    });
  }

  res.json({
    success: true,
    message: 'Audio fayli muvaffaqiyatli o\'chirildi',
  });
});

export const checkAudioExists = asyncHandler(async (req: Request, res: Response) => {
  const { filename } = req.params;

  const exists = audioService.audioExists(filename);

  res.json({
    success: true,
    data: { exists },
    message: exists ? 'Audio fayli mavjud' : 'Audio fayli mavjud emas',
  });
});

// Cleanup old audio files (admin only)
export const cleanupOldAudio = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;
  const daysOld = parseInt(req.query.daysOld as string) || 30;

  // In a real application, you would check if the user is an admin
  // For now, we'll allow any authenticated user

  const deletedCount = await audioService.cleanupOldAudio(daysOld);

  res.json({
    success: true,
    data: { deletedCount },
    message: `${deletedCount} ta eski audio fayllari o'chirildi`,
  });
});

// Get audio upload statistics (admin only)
export const getAudioStats = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;

  // In a real application, you would check if the user is an admin
  // For now, we'll allow any authenticated user

  const fs = require('fs');
  const path = require('path');
  
  const uploadDir = path.join(process.cwd(), 'uploads', 'audio');
  
  if (!fs.existsSync(uploadDir)) {
    return res.json({
      success: true,
      data: {
        totalFiles: 0,
        totalSize: 0,
        formattedTotalSize: '0 Bytes',
      },
      message: 'Audio statistikasi',
    });
  }

  const files = fs.readdirSync(uploadDir);
  let totalSize = 0;

  for (const file of files) {
    const filePath = path.join(uploadDir, file);
    const stats = fs.statSync(filePath);
    totalSize += stats.size;
  }

  res.json({
    success: true,
    data: {
      totalFiles: files.length,
      totalSize,
      formattedTotalSize: audioService.formatFileSize(totalSize),
    },
    message: 'Audio statistikasi',
  });
});
