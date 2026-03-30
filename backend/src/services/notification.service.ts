import { PrismaClient, Prisma } from '@prisma/client';
import webpush from 'web-push';
import { emailService } from './email.service';

const prisma = new PrismaClient();

// Configure web-push
webpush.setVapidDetails(
  'mailto:admin@step.uz',
  process.env.VAPID_PUBLIC_KEY || '',
  process.env.VAPID_PRIVATE_KEY || ''
);

// Notification types
export type NotificationType =
  | 'JOB_APPLICATION'
  | 'APPLICATION_STATUS'
  | 'NEW_MESSAGE'
  | 'INTERVIEW_INVITATION'
  | 'JOB_ALERT'
  | 'PROFILE_VIEW'
  | 'SYSTEM_UPDATE'
  | 'REMINDER'
  | 'OFFER_RECEIVED'
  | 'FOLLOW_UP'
  | 'WELCOME'
  | 'SUBSCRIPTION_EXPIRY'
  | 'SECURITY_ALERT'
  | 'MENTION'
  | 'GROUP_INVITATION';

// Notification priority
export type NotificationPriority = 'low' | 'normal' | 'high' | 'urgent';

// Notification channel
export type NotificationChannel = 'in_app' | 'email' | 'push' | 'sms';

interface CreateNotificationData {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  priority?: NotificationPriority;
  channels?: NotificationChannel[];
  data?: any;
  actionUrl?: string;
  imageUrl?: string;
  scheduledFor?: Date;
}

interface UserPreferences {
  channels: {
    in_app: boolean;
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  types: Record<NotificationType, boolean>;
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
  };
}

export const notificationService = {
  // ========== CORE NOTIFICATION OPERATIONS ==========

  // Create notification
  async createNotification(data: CreateNotificationData) {
    const {
      userId,
      type,
      title,
      message,
      priority = 'normal',
      channels = ['in_app'],
      data: notificationData,
      actionUrl,
      imageUrl,
      scheduledFor,
    } = data;

    // Get user preferences
    const preferences = await this.getUserPreferences(userId);

    // Check if notification type is enabled
    if (preferences.types[type] === false) {
      return { skipped: true, reason: 'Notification type disabled by user' };
    }

    // Check quiet hours
    if (this.isInQuietHours(preferences.quietHours)) {
      // Queue for later
      return await this.queueNotification({
        ...data,
        scheduledFor: this.getNextAvailableTime(preferences.quietHours),
      });
    }

    const notification = await prisma.notification.create({
      data: {
        userId,
        type,
        title,
        message,
        priority,
        data: notificationData,
        actionUrl,
        imageUrl,
        isRead: false,
        scheduledFor,
        sentVia: channels,
      },
    });

    // Send through enabled channels
    const results: Record<string, any> = {};

    if (channels.includes('email') && preferences.channels.email) {
      try {
        results.email = await this.sendEmailNotification(userId, title, message, actionUrl);
      } catch (error) {
        results.email = { error: (error as Error).message };
      }
    }

    if (channels.includes('push') && preferences.channels.push) {
      try {
        results.push = await this.sendPushNotification(userId, title, message, actionUrl);
      } catch (error) {
        results.push = { error: (error as Error).message };
      }
    }

    if (channels.includes('sms') && preferences.channels.sms) {
      try {
        results.sms = await this.sendSMSNotification(userId, message);
      } catch (error) {
        results.sms = { error: (error as Error).message };
      }
    }

    return { notification, channelResults: results };
  },

  // Get user notifications
  async getUserNotifications(userId: string, options: any = {}) {
    const {
      page = 1,
      limit = 10,
      isRead,
      type,
      priority,
      startDate,
      endDate,
    } = options;
    const skip = (page - 1) * limit;

    const where: Prisma.NotificationWhereInput = { userId };

    if (isRead !== undefined) where.isRead = isRead;
    if (type) where.type = type;
    if (priority) where.priority = priority;
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(startDate);
      if (endDate) where.createdAt.lte = new Date(endDate);
    }

    const [notifications, total, unreadCount, unreadByType] = await Promise.all([
      prisma.notification.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.notification.count({ where }),
      prisma.notification.count({
        where: { userId, isRead: false },
      }),
      prisma.notification.groupBy({
        by: ['type'],
        where: { userId, isRead: false },
        _count: { type: true },
      }),
    ]);

    return {
      notifications,
      total,
      unreadCount,
      unreadByType: unreadByType.reduce((acc, item) => {
        acc[item.type] = item._count.type;
        return acc;
      }, {} as Record<string, number>),
      totalPages: Math.ceil(total / limit),
    };
  },

  // Mark notification as read
  async markAsRead(notificationId: string, userId: string) {
    const notification = await prisma.notification.findFirst({
      where: { id: notificationId, userId },
    });

    if (!notification) {
      throw new Error('Notification not found');
    }

    return await prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: true, readAt: new Date() },
    });
  },

  // Mark multiple as read
  async markMultipleAsRead(notificationIds: string[], userId: string) {
    return await prisma.notification.updateMany({
      where: {
        id: { in: notificationIds },
        userId,
      },
      data: { isRead: true, readAt: new Date() },
    });
  },

  // Mark all as read
  async markAllAsRead(userId: string, type?: NotificationType) {
    const where: Prisma.NotificationWhereInput = {
      userId,
      isRead: false,
    };
    if (type) where.type = type;

    return await prisma.notification.updateMany({
      where,
      data: { isRead: true, readAt: new Date() },
    });
  },

  // Delete notification
  async deleteNotification(notificationId: string, userId: string) {
    const notification = await prisma.notification.findFirst({
      where: { id: notificationId, userId },
    });

    if (!notification) {
      throw new Error('Notification not found');
    }

    return await prisma.notification.delete({
      where: { id: notificationId },
    });
  },

  // Delete multiple notifications
  async deleteMultipleNotifications(notificationIds: string[], userId: string) {
    return await prisma.notification.deleteMany({
      where: {
        id: { in: notificationIds },
        userId,
      },
    });
  },

  // Delete all read notifications
  async deleteAllRead(userId: string) {
    return await prisma.notification.deleteMany({
      where: { userId, isRead: true },
    });
  },

  // ========== PUSH NOTIFICATIONS ==========

  // Subscribe to push notifications
  async subscribePush(userId: string, subscription: webpush.PushSubscription) {
    return await prisma.pushSubscription.upsert({
      where: { userId },
      create: {
        userId,
        endpoint: subscription.endpoint,
        p256dh: subscription.keys.p256dh,
        auth: subscription.keys.auth,
      },
      update: {
        endpoint: subscription.endpoint,
        p256dh: subscription.keys.p256dh,
        auth: subscription.keys.auth,
      },
    });
  },

  // Unsubscribe from push notifications
  async unsubscribePush(userId: string) {
    return await prisma.pushSubscription.deleteMany({
      where: { userId },
    });
  },

  // Send push notification
  async sendPushNotification(userId: string, title: string, body: string, url?: string) {
    const subscription = await prisma.pushSubscription.findUnique({
      where: { userId },
    });

    if (!subscription) {
      return { sent: false, reason: 'No push subscription found' };
    }

    const payload = JSON.stringify({
      title,
      body,
      url,
      icon: '/icon.png',
      badge: '/badge.png',
    });

    try {
      await webpush.sendNotification(
        {
          endpoint: subscription.endpoint,
          keys: {
            p256dh: subscription.p256dh,
            auth: subscription.auth,
          },
        },
        payload
      );

      return { sent: true };
    } catch (error) {
      // If subscription is no longer valid, remove it
      if ((error as any).statusCode === 410) {
        await this.unsubscribePush(userId);
      }
      throw error;
    }
  },

  // ========== EMAIL NOTIFICATIONS ==========

  // Send email notification
  async sendEmailNotification(userId: string, subject: string, body: string, actionUrl?: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true, name: true },
    });

    if (!user) {
      return { sent: false, reason: 'User not found' };
    }

    // Use email service
    return await emailService.sendEmail({
      to: user.email,
      subject,
      html: `
        <h2>${subject}</h2>
        <p>${body}</p>
        ${actionUrl ? `<a href="${actionUrl}" style="padding: 12px 24px; background: #4F46E5; color: white; text-decoration: none; border-radius: 8px;">View Details</a>` : ''}
      `,
    });
  },

  // ========== SMS NOTIFICATIONS ==========

  // Send SMS notification (placeholder - would integrate with Twilio or similar)
  async sendSMSNotification(userId: string, message: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        student: { select: { phone: true } },
      },
    });

    if (!user?.student?.phone) {
      return { sent: false, reason: 'No phone number found' };
    }

    // Placeholder for SMS integration
    console.log(`SMS to ${user.student.phone}: ${message}`);
    return { sent: true, method: 'sms' };
  },

  // ========== NOTIFICATION PREFERENCES ==========

  // Get user preferences
  async getUserPreferences(userId: string): Promise<UserPreferences> {
    const prefs = await prisma.notificationPreference.findUnique({
      where: { userId },
    });

    if (!prefs) {
      // Return default preferences
      return {
        channels: {
          in_app: true,
          email: true,
          push: false,
          sms: false,
        },
        types: {
          JOB_APPLICATION: true,
          APPLICATION_STATUS: true,
          NEW_MESSAGE: true,
          INTERVIEW_INVITATION: true,
          JOB_ALERT: true,
          PROFILE_VIEW: false,
          SYSTEM_UPDATE: true,
          REMINDER: true,
          OFFER_RECEIVED: true,
          FOLLOW_UP: true,
          WELCOME: true,
          SUBSCRIPTION_EXPIRY: true,
          SECURITY_ALERT: true,
          MENTION: true,
          GROUP_INVITATION: true,
        },
        quietHours: {
          enabled: false,
          start: '22:00',
          end: '08:00',
        },
      };
    }

    return prefs.preferences as UserPreferences;
  },

  // Update user preferences
  async updateUserPreferences(userId: string, preferences: Partial<UserPreferences>) {
    return await prisma.notificationPreference.upsert({
      where: { userId },
      create: {
        userId,
        preferences: preferences as any,
      },
      update: {
        preferences: { ...preferences } as any,
      },
    });
  },

  // Check if in quiet hours
  isInQuietHours(quietHours: UserPreferences['quietHours']): boolean {
    if (!quietHours.enabled) return false;

    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    if (quietHours.start > quietHours.end) {
      // Overnight quiet hours (e.g., 22:00 - 08:00)
      return currentTime >= quietHours.start || currentTime <= quietHours.end;
    }

    return currentTime >= quietHours.start && currentTime <= quietHours.end;
  },

  // Get next available time after quiet hours
  getNextAvailableTime(quietHours: UserPreferences['quietHours']): Date {
    const now = new Date();
    const [endHour, endMinute] = quietHours.end.split(':').map(Number);

    const nextTime = new Date(now);
    nextTime.setHours(endHour, endMinute, 0, 0);

    if (nextTime <= now) {
      nextTime.setDate(nextTime.getDate() + 1);
    }

    return nextTime;
  },

  // ========== BATCH OPERATIONS ==========

  // Queue notification for later
  async queueNotification(data: CreateNotificationData & { scheduledFor: Date }) {
    return await prisma.notificationQueue.create({
      data: {
        userId: data.userId,
        type: data.type,
        title: data.title,
        message: data.message,
        priority: data.priority,
        data: data.data,
        actionUrl: data.actionUrl,
        scheduledFor: data.scheduledFor,
        channels: data.channels,
      },
    });
  },

  // Process queued notifications
  async processQueue(batchSize: number = 50) {
    const now = new Date();
    const queued = await prisma.notificationQueue.findMany({
      where: {
        scheduledFor: { lte: now },
        processedAt: null,
      },
      take: batchSize,
      orderBy: { priority: 'desc' },
    });

    const results = [];

    for (const item of queued) {
      try {
        const result = await this.createNotification({
          userId: item.userId,
          type: item.type as NotificationType,
          title: item.title,
          message: item.message,
          priority: item.priority as NotificationPriority,
          channels: item.channels as NotificationChannel[],
          data: item.data,
          actionUrl: item.actionUrl,
        });

        await prisma.notificationQueue.update({
          where: { id: item.id },
          data: { processedAt: new Date() },
        });

        results.push({ success: true, id: item.id, result });
      } catch (error) {
        results.push({ success: false, id: item.id, error: (error as Error).message });
      }
    }

    return { processed: results.length, results };
  },

  // Send bulk notifications
  async sendBulkNotifications(
    userIds: string[],
    notificationData: Omit<CreateNotificationData, 'userId'>,
    delayMs: number = 100
  ) {
    const results = [];

    for (const userId of userIds) {
      try {
        const result = await this.createNotification({
          ...notificationData,
          userId,
        });
        results.push({ success: true, userId, result });
      } catch (error) {
        results.push({ success: false, userId, error: (error as Error).message });
      }

      // Delay to avoid overwhelming the system
      if (delayMs > 0) {
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }

    return results;
  },

  // ========== SPECIFIC NOTIFICATION TYPES ==========

  // Send job application notification
  async sendApplicationNotification(companyUserId: string, jobTitle: string, applicationId: string, applicantName: string) {
    return await this.createNotification({
      userId: companyUserId,
      type: 'JOB_APPLICATION',
      title: 'New Job Application',
      message: `${applicantName} applied for ${jobTitle}`,
      priority: 'normal',
      channels: ['in_app', 'email'],
      data: { applicationId, jobTitle, applicantName },
      actionUrl: `/dashboard/applications/${applicationId}`,
    });
  },

  // Send application status update
  async sendStatusUpdateNotification(userId: string, jobTitle: string, status: string, applicationId: string) {
    const statusMessages: Record<string, { message: string; priority: NotificationPriority }> = {
      PENDING: { message: 'Your application is pending review', priority: 'low' },
      REVIEWED: { message: 'Your application has been reviewed', priority: 'normal' },
      INTERVIEW: { message: 'You have been invited for an interview!', priority: 'high' },
      OFFERED: { message: 'Congratulations! You have received an offer', priority: 'urgent' },
      HIRED: { message: 'Welcome to the team!', priority: 'urgent' },
      REJECTED: { message: 'Thank you for your interest. Unfortunately, we will not be moving forward', priority: 'normal' },
    };

    const statusInfo = statusMessages[status] || { message: 'Your application status has been updated', priority: 'normal' };

    return await this.createNotification({
      userId,
      type: 'APPLICATION_STATUS',
      title: 'Application Status Update',
      message: `${statusInfo.message} for ${jobTitle}`,
      priority: statusInfo.priority,
      channels: statusInfo.priority === 'urgent' ? ['in_app', 'email', 'push'] : ['in_app', 'email'],
      data: { status, applicationId, jobTitle },
      actionUrl: `/dashboard/applications/${applicationId}`,
    });
  },

  // Send message notification
  async sendMessageNotification(userId: string, senderName: string, messagePreview: string, chatId: string) {
    return await this.createNotification({
      userId,
      type: 'NEW_MESSAGE',
      title: `New message from ${senderName}`,
      message: messagePreview.substring(0, 100) + (messagePreview.length > 100 ? '...' : ''),
      priority: 'normal',
      channels: ['in_app', 'push'],
      data: { chatId, senderName },
      actionUrl: `/messages/${chatId}`,
    });
  },

  // Send interview invitation
  async sendInterviewInvitation(userId: string, companyName: string, jobTitle: string, interviewDetails: any) {
    return await this.createNotification({
      userId,
      type: 'INTERVIEW_INVITATION',
      title: 'Interview Invitation',
      message: `${companyName} has invited you for an interview for ${jobTitle}`,
      priority: 'high',
      channels: ['in_app', 'email', 'push'],
      data: { interviewDetails, jobTitle, companyName },
      actionUrl: `/interviews/${interviewDetails.id}`,
    });
  },

  // Send job alert
  async sendJobAlert(userId: string, jobCount: number, jobs: any[]) {
    return await this.createNotification({
      userId,
      type: 'JOB_ALERT',
      title: `${jobCount} New Jobs Matching Your Preferences`,
      message: `We found ${jobCount} new jobs that match your criteria. Check them out!`,
      priority: 'normal',
      channels: ['in_app', 'email'],
      data: { jobCount, jobs: jobs.map(j => ({ id: j.id, title: j.title })) },
      actionUrl: '/jobs?filter=new',
    });
  },

  // Send welcome notification
  async sendWelcomeNotification(userId: string, name: string) {
    return await this.createNotification({
      userId,
      type: 'WELCOME',
      title: 'Welcome to Step Career Platform!',
      message: `Hi ${name}, welcome aboard! Complete your profile to get started.`,
      priority: 'normal',
      channels: ['in_app', 'email'],
      actionUrl: '/profile',
    });
  },

  // Send profile view notification
  async sendProfileViewNotification(userId: string, viewerName: string, viewerCompany?: string) {
    return await this.createNotification({
      userId,
      type: 'PROFILE_VIEW',
      title: 'Someone viewed your profile',
      message: viewerCompany
        ? `${viewerName} from ${viewerCompany} viewed your profile`
        : `${viewerName} viewed your profile`,
      priority: 'low',
      channels: ['in_app'],
      data: { viewerName, viewerCompany },
    });
  },

  // Send offer received notification
  async sendOfferReceivedNotification(userId: string, companyName: string, jobTitle: string, offerId: string) {
    return await this.createNotification({
      userId,
      type: 'OFFER_RECEIVED',
      title: 'Job Offer Received!',
      message: `${companyName} has extended an offer for ${jobTitle}`,
      priority: 'urgent',
      channels: ['in_app', 'email', 'push'],
      data: { offerId, companyName, jobTitle },
      actionUrl: `/offers/${offerId}`,
    });
  },

  // Send security alert
  async sendSecurityAlert(userId: string, alertType: string, details: any) {
    const alertMessages: Record<string, string> = {
      'NEW_LOGIN': 'New login detected from an unfamiliar device',
      'PASSWORD_CHANGED': 'Your password was changed',
      'EMAIL_CHANGED': 'Your email address was updated',
      'SUSPICIOUS_ACTIVITY': 'Suspicious activity detected on your account',
    };

    return await this.createNotification({
      userId,
      type: 'SECURITY_ALERT',
      title: 'Security Alert',
      message: alertMessages[alertType] || 'A security-related event occurred on your account',
      priority: 'urgent',
      channels: ['in_app', 'email', 'push'],
      data: { alertType, ...details },
      actionUrl: '/settings/security',
    });
  },

  // ========== ANALYTICS & REPORTING ==========

  // Get notification statistics
  async getNotificationStats(userId?: string, startDate?: Date, endDate?: Date) {
    const where: Prisma.NotificationWhereInput = {};

    if (userId) where.userId = userId;
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = startDate;
      if (endDate) where.createdAt.lte = endDate;
    }

    const [
      totalNotifications,
      readNotifications,
      unreadNotifications,
      byType,
      byPriority,
      byChannel,
    ] = await Promise.all([
      prisma.notification.count({ where }),
      prisma.notification.count({ where: { ...where, isRead: true } }),
      prisma.notification.count({ where: { ...where, isRead: false } }),
      prisma.notification.groupBy({
        by: ['type'],
        where,
        _count: { type: true },
      }),
      prisma.notification.groupBy({
        by: ['priority'],
        where,
        _count: { priority: true },
      }),
      // Channel stats would require a different data model
      Promise.resolve([]),
    ]);

    return {
      total: totalNotifications,
      read: readNotifications,
      unread: unreadNotifications,
      readRate: totalNotifications > 0 ? ((readNotifications / totalNotifications) * 100).toFixed(2) + '%' : '0%',
      byType: byType.reduce((acc, item) => {
        acc[item.type] = item._count.type;
        return acc;
      }, {} as Record<string, number>),
      byPriority: byPriority.reduce((acc, item) => {
        acc[item.priority || 'normal'] = item._count.priority;
        return acc;
      }, {} as Record<string, number>),
    };
  },

  // Get user engagement metrics
  async getUserEngagement(userId: string) {
    const [
      totalNotifications,
      readNotifications,
      averageReadTime,
      notificationsByDay,
    ] = await Promise.all([
      prisma.notification.count({ where: { userId } }),
      prisma.notification.count({ where: { userId, isRead: true } }),
      prisma.$queryRaw`
        SELECT AVG(EXTRACT(EPOCH FROM (read_at - created_at))) as avg_seconds
        FROM notifications
        WHERE user_id = ${userId} AND is_read = true
      `,
      prisma.$queryRaw`
        SELECT DATE(created_at) as date, COUNT(*) as count
        FROM notifications
        WHERE user_id = ${userId}
        GROUP BY DATE(created_at)
        ORDER BY date DESC
        LIMIT 30
      `,
    ]);

    return {
      totalNotifications,
      readNotifications,
      unreadNotifications: totalNotifications - readNotifications,
      averageReadTime: (averageReadTime as any)[0]?.avg_seconds || 0,
      notificationsByDay,
    };
  },

  // Clean up old notifications
  async cleanupOldNotifications(olderThanDays: number = 90) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - olderThanDays);

    const deleted = await prisma.notification.deleteMany({
      where: {
        createdAt: { lt: cutoffDate },
        isRead: true,
      },
    });

    return { deleted: deleted.count };
  },
};
