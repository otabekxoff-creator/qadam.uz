import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export interface AudioUploadData {
  file: Buffer;
  filename: string;
  mimeType: string;
  size: number;
  duration?: number;
}

export interface ProcessedAudio {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  duration?: number;
  url: string;
  uploadedAt: Date;
}

export class AudioService {
  private uploadDir: string;
  private baseUrl: string;

  constructor() {
    this.uploadDir = path.join(process.cwd(), 'uploads', 'audio');
    this.baseUrl = process.env.BACKEND_URL || 'http://localhost:5000';
    
    // Ensure upload directory exists
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  // Validate audio file
  private validateAudioFile(data: AudioUploadData): { valid: boolean; error?: string } {
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

    const maxFileSize = 50 * 1024 * 1024; // 50MB
    const maxDuration = 300; // 5 minutes

    if (!allowedMimeTypes.includes(data.mimeType)) {
      return { valid: false, error: 'Faqat audio fayllari ruxsat etilgan (MP3, WAV, M4A, OGG)' };
    }

    if (data.size > maxFileSize) {
      return { valid: false, error: 'Audio fayl hajmi 50MB dan oshmasligi kerak' };
    }

    if (data.duration && data.duration > maxDuration) {
      return { valid: false, error: 'Audio yozuvi 5 daqiqadan oshmasligi kerak' };
    }

    return { valid: true };
  }

  // Generate unique filename
  private generateFilename(originalName: string, mimeType: string): string {
    const extension = this.getFileExtension(mimeType);
    const id = uuidv4();
    return `${id}${extension}`;
  }

  // Get file extension from MIME type
  private getFileExtension(mimeType: string): string {
    const extensions: Record<string, string> = {
      'audio/mpeg': '.mp3',
      'audio/mp3': '.mp3',
      'audio/wav': '.wav',
      'audio/wave': '.wav',
      'audio/x-wav': '.wav',
      'audio/mp4': '.mp4',
      'audio/m4a': '.m4a',
      'audio/ogg': '.ogg',
      'audio/webm': '.webm',
    };
    return extensions[mimeType] || '.mp3';
  }

  // Upload and process audio file
  async uploadAudio(data: AudioUploadData): Promise<ProcessedAudio> {
    // Validate file
    const validation = this.validateAudioFile(data);
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    // Generate unique filename
    const filename = this.generateFilename(data.filename, data.mimeType);
    const filePath = path.join(this.uploadDir, filename);

    // Save file
    fs.writeFileSync(filePath, data.file);

    // Get file stats
    const stats = fs.statSync(filePath);

    const processedAudio: ProcessedAudio = {
      id: uuidv4(),
      filename,
      originalName: data.filename,
      mimeType: data.mimeType,
      size: stats.size,
      duration: data.duration,
      url: `${this.baseUrl}/uploads/audio/${filename}`,
      uploadedAt: new Date(),
    };

    return processedAudio;
  }

  // Get audio file
  getAudioFile(filename: string): { filePath: string; mimeType: string } | null {
    const filePath = path.join(this.uploadDir, filename);
    
    if (!fs.existsSync(filePath)) {
      return null;
    }

    // Determine MIME type from file extension
    const extension = path.extname(filename).toLowerCase();
    const mimeType = this.getMimeTypeFromExtension(extension);

    return { filePath, mimeType };
  }

  // Get MIME type from file extension
  private getMimeTypeFromExtension(extension: string): string {
    const mimeTypes: Record<string, string> = {
      '.mp3': 'audio/mpeg',
      '.wav': 'audio/wav',
      '.mp4': 'audio/mp4',
      '.m4a': 'audio/m4a',
      '.ogg': 'audio/ogg',
      '.webm': 'audio/webm',
    };
    return mimeTypes[extension] || 'audio/mpeg';
  }

  // Delete audio file
  async deleteAudio(filename: string): Promise<boolean> {
    const filePath = path.join(this.uploadDir, filename);
    
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    }
    
    return false;
  }

  // Get audio file info
  getAudioInfo(filename: string): { size: number; uploadedAt: Date } | null {
    const filePath = path.join(this.uploadDir, filename);
    
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const stats = fs.statSync(filePath);
    
    return {
      size: stats.size,
      uploadedAt: stats.mtime,
    };
  }

  // Format file size for display
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Format duration for display
  formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  // Check if audio file exists
  audioExists(filename: string): boolean {
    const filePath = path.join(this.uploadDir, filename);
    return fs.existsSync(filePath);
  }

  // Clean up old audio files (older than specified days)
  async cleanupOldAudio(daysOld: number = 30): Promise<number> {
    const files = fs.readdirSync(this.uploadDir);
    let deletedCount = 0;
    
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);
    
    for (const file of files) {
      const filePath = path.join(this.uploadDir, file);
      const stats = fs.statSync(filePath);
      
      if (stats.mtime < cutoffDate) {
        fs.unlinkSync(filePath);
        deletedCount++;
      }
    }
    
    return deletedCount;
  }
}

export const audioService = new AudioService();
