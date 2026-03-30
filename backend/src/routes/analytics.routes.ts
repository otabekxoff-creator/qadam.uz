import { Router } from 'express';
import * as analyticsController from '../controllers/analytics.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// Student dashboard analytics
router.get('/student', authenticate, analyticsController.getStudentAnalytics);

// Company analytics
router.get('/company', authenticate, analyticsController.getCompanyAnalytics);

// Platform analytics (admin only)
router.get('/platform', authenticate, analyticsController.getPlatformAnalytics);

export default router;
