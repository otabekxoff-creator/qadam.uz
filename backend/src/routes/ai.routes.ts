import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { askBek, getConversationHistory, analyzeSkills, getJobRecommendations } from '../controllers/ai.controller';

const router = Router();

router.post('/ask', authMiddleware, askBek);
router.get('/history', authMiddleware, getConversationHistory);
router.get('/skills-analysis', authMiddleware, analyzeSkills);
router.get('/job-recommendations', authMiddleware, getJobRecommendations);

export default router;
