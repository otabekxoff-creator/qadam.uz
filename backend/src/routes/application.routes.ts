import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { roleMiddleware } from '../middleware/auth.middleware';
import { getMyApplications, createApplication, updateApplicationStatus } from '../controllers/application.controller';

const router = Router();

router.get('/my', authMiddleware, getMyApplications);
router.post('/', authMiddleware, roleMiddleware(['STUDENT']), createApplication);
router.patch('/:id/status', authMiddleware, roleMiddleware(['COMPANY']), updateApplicationStatus);

export default router;
