import { Router } from 'express';
import {
  uploadAudio,
  getAudio,
  getAudioInfo,
  deleteAudio,
  checkAudioExists,
  cleanupOldAudio,
  getAudioStats,
} from '@/controllers/audio.controller';
import { authenticate } from '@/middleware/auth.middleware';

const router = Router();

// Public routes (no authentication required for serving audio files)
router.get('/:filename', getAudio);
router.get('/:filename/info', getAudioInfo);
router.get('/:filename/exists', checkAudioExists);

// Apply authentication middleware to protected routes
router.use(authenticate);

// POST /api/audio/upload - Upload audio file
router.post('/upload', uploadAudio);

// DELETE /api/audio/:filename - Delete audio file
router.delete('/:filename', deleteAudio);

// POST /api/audio/cleanup - Cleanup old audio files (admin only)
router.post('/cleanup', cleanupOldAudio);

// GET /api/audio/stats - Get audio statistics (admin only)
router.get('/stats', getAudioStats);

export default router;
