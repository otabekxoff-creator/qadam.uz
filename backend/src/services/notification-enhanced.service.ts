import { PrismaClient } from '@prisma/client';
import logger from './logger';
import queueService from './queue.service';

const prisma = new PrismaClient();

/**
 * Enhanced Notification Service with Preferences
 */
export class NotificationService {
  /**
   * Send notification to user
   */
  async sendNotification(
    userId: string,
    type: string,
    title: string,
    message: string,
    data?: Record<string, any>
  ): Promise<void> {
    try {
      // Check user preferences
      const preferences = await this.getUserPreferences(userId);
      
      if (!preferences.enabled || !preferences[type]?.enabled) {
        logger.info(`Notification skipped for user ${userId} - disabled`);
        return;
      }

      // Create notification record
      const notification = await prisma.notification.create({
        data: {
          userId,
          type,
          title,
          message,
          data: data ? JSON.stringify(data) : null,
          isRead: false,
          createdAt: new Date(),
        },
      });

      // Queue for immediate delivery channels
      if (preferences.push?.enabled) {
        await queueService.addJob('notifications', {
          userId,
          notification,
          channel: 'push',
        }, {
          delay: 0,
        });
      }

      // Queue for email (with delay)
      if (preferences.email?.enabled && preferences[type]?.email) {
        await queueService.addJob('notifications', {
          userId,
          notification,
          channel: 'email',
        }, {
          delay: 5000, // 5 second delay to batch emails
        });
      }

      // Real-time socket notification
      this.emitToUser(userId, 'notification', notification);

      logger.info(`Notification sent to user ${userId}: ${title}`);
    } catch (error) {
      logger.error('Failed to send notification:', error);
    }
  }

  /**
   * Get user notification preferences
   */
  async getUserPreferences(userId: string): Promise<{
    enabled: boolean;
    push?: { enabled: boolean };
    email?: { enabled: boolean };
    [key: string]: any;
  }> {
    const prefs = await prisma.notificationPreference.findUnique({
      where: { userId },
    });

    if (!prefs) {
      // Return default preferences
      return {
        enabled: true,
        push: { enabled: true },
        email: { enabled: true },
        JOB_APPLICATION: { enabled: true, email: true },
        JOB_OFFER: { enabled: true, email: true },
        STARTUP_STATUS: { enabled: true, email: true },
        CHAT_MESSAGE: { enabled: true, email: false },
        SYSTEM: { enabled: true, email: true },
      };
    }

    return JSON.parse(prefs.preferences);
  }

  /**
   * Update user notification preferences
   */
  async updatePreferences(
    userId: string,
    preferences: Record<string, any>
  ): Promise<void> {
    await prisma.notificationPreference.upsert({
      where: { userId },
      update: {
        preferences: JSON.stringify(preferences),
        updatedAt: new Date(),
      },
      create: {
        userId,
        preferences: JSON.stringify(preferences),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  /**
   * Mark notification as read
   */
  async markAsRead(notificationId: string): Promise<void> {
    await prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: true, readAt: new Date() },
    });
  }

  /**
   * Mark all notifications as read for user
   */
  async markAllAsRead(userId: string): Promise<number> {
    const result = await prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true, readAt: new Date() },
    });

    return result.count;
  }

  /**
   * Get user notifications
   */
  async getNotifications(
    userId: string,
    options?: {
      limit?: number;
      offset?: number;
      unreadOnly?: boolean;
    }
  ): Promise<Array<{
    id: string;
    type: string;
    title: string;
    message: string;
    data: any;
    isRead: boolean;
    createdAt: Date;
  }>> {
    const notifications = await prisma.notification.findMany({
      where: {
        userId,
        ...(options?.unreadOnly && { isRead: false }),
      },
      orderBy: { createdAt: 'desc' },
      take: options?.limit || 20,
      skip: options?.offset || 0,
    });

    return notifications.map((n) => ({
      ...n,
      data: n.data ? JSON.parse(n.data) : null,
    }));
  }

  /**
   * Get unread count
   */
  async getUnreadCount(userId: string): Promise<number> {
    return await prisma.notification.count({
      where: { userId, isRead: false },
    });
  }

  /**
   * Delete old notifications
   */
  async cleanupOldNotifications(days: number = 30): Promise<number> {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);

    const result = await prisma.notification.deleteMany({
      where: {
        isRead: true,
        createdAt: { lt: cutoff },
      },
    });

    logger.info(`Cleaned up ${result.count} old notifications`);
    return result.count;
  }

  /**
   * Emit event to user via WebSocket
   */
  private emitToUser(userId: string, event: string, data: any): void {
    // This would integrate with your WebSocket/Socket.io setup
    // socket.to(`user:${userId}`).emit(event, data);
    logger.info(`Emitting ${event} to user ${userId}`);
  }

  /**
   * Send bulk notifications
   */
  async sendBulkNotifications(
    userIds: string[],
    type: string,
    title: string,
    message: string,
    data?: Record<string, any>
  ): Promise<void> {
    const batchSize = 100;
    for (let i = 0; i < userIds.length; i += batchSize) {
      const batch = userIds.slice(i, i + batchSize);
      
      await Promise.all(
        batch.map((userId) =>
          this.sendNotification(userId, type, title, message, data)
        )
      );
    }
  }

  /**
   * Create notification templates
   */
  templates = {
    jobApplication: (jobTitle: string, companyName: string) => ({
      title: 'Ariza topshirildi',
      message: `Siz "${jobTitle}" vakansiyasiga ariza topshiridingiz (${companyName})`,
      type: 'JOB_APPLICATION',
    }),

    jobOffer: (jobTitle: string, companyName: string) => ({
      title: 'Ish taklifi!',
      message: `"${companyName}" kompaniyasi sizga "${jobTitle}" lavozimini taklif qilmoqda`,
      type: 'JOB_OFFER',
    }),

    startupApproved: (startupName: string) => ({
      title: 'Startap tasdiqlandi!',
      message: `"${startupName}" startapingiz tasdiqlandi va platformada chop etildi`,
      type: 'STARTUP_STATUS',
    }),

    newMessage: (senderName: string) => ({
      title: 'Yangi xabar',
      message: `${senderName} sizga xabar yubordi`,
      type: 'CHAT_MESSAGE',
    }),

    systemNotification: (title: string, message: string) => ({
      title,
      message,
      type: 'SYSTEM',
    }),
  };
}

export default new NotificationService();
