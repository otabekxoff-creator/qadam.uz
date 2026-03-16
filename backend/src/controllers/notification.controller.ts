import { Request, Response } from 'express';
import { notificationService } from '@/services/notification.service';
import { AuthenticatedRequest } from '@/types';
import asyncHandler from '@/utils/asyncHandler';

export const getNotifications = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;
  const limit = parseInt(req.query.limit as string) || 20;
  const offset = parseInt(req.query.offset as string) || 0;

  const result = await notificationService.getUserNotifications(userId, limit, offset);

  res.json({
    success: true,
    data: result,
    message: 'Bildirishnomalar muvaffaqiyatli olindi',
  });
});

export const markAsRead = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;
  const { notificationId } = req.params;

  await notificationService.markAsRead(notificationId, userId);

  res.json({
    success: true,
    message: 'Bildirishnoma o\'qilgan deb belgilandi',
  });
});

export const markAllAsRead = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;

  const result = await notificationService.markAllAsRead(userId);

  res.json({
    success: true,
    data: { updatedCount: result.count },
    message: 'Barcha bildirishnomalar o\'qilgan deb belgilandi',
  });
});

export const deleteNotification = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;
  const { notificationId } = req.params;

  await notificationService.deleteNotification(notificationId, userId);

  res.json({
    success: true,
    message: 'Bildirishnoma o\'chirildi',
  });
});

export const getUnreadCount = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;

  const result = await notificationService.getUserNotifications(userId, 1, 0);

  res.json({
    success: true,
    data: { unreadCount: result.unreadCount },
    message: 'O\'qilmagan bildirishnomalar soni',
  });
});
