import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { getMyNotifications, markAsRead, markAllAsRead, deleteNotification } from '../controllers/notification.controller';

const router = Router();

router.get('/', authMiddleware, getMyNotifications);
router.patch('/:id/read', authMiddleware, markAsRead);
router.patch('/read-all', authMiddleware, markAllAsRead);
router.delete('/:id', authMiddleware, deleteNotification);

export default router;
