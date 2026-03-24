import { Router } from 'express';
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  getUnreadCount,
} from '@/controllers/notification.controller';
import { authenticate } from '@/middleware/auth.middleware';

const router = Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// GET /api/notifications - Get user notifications
router.get('/', getNotifications);

// GET /api/notifications/unread-count - Get unread count
router.get('/unread-count', getUnreadCount);

// PUT /api/notifications/:notificationId/read - Mark notification as read
router.put('/:notificationId/read', markAsRead);

// PUT /api/notifications/read-all - Mark all notifications as read
router.put('/read-all', markAllAsRead);

// DELETE /api/notifications/:notificationId - Delete notification
router.delete('/:notificationId', deleteNotification);

export default router;
