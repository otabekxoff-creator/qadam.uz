import prisma from '@/config/database';

export interface NotificationData {
  userId: string;
  type: string;
  title: string;
  message: string;
  data?: any;
}

export class NotificationService {
  async create(notificationData: NotificationData) {
    const notification = await prisma.notification.create({
      data: {
        userId: notificationData.userId,
        type: notificationData.type,
        title: notificationData.title,
        message: notificationData.message,
        data: notificationData.data || {},
      },
    });

    return notification;
  }

  async getUserNotifications(userId: string, limit: number = 20, offset: number = 0) {
    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    });

    const unreadCount = await prisma.notification.count({
      where: { userId, isRead: false },
    });

    return {
      notifications,
      unreadCount,
    };
  }

  async markAsRead(notificationId: string, userId: string) {
    const notification = await prisma.notification.updateMany({
      where: { 
        id: notificationId,
        userId,
      },
      data: { isRead: true },
    });

    return notification;
  }

  async markAllAsRead(userId: string) {
    const result = await prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true },
    });

    return result;
  }

  async deleteNotification(notificationId: string, userId: string) {
    const notification = await prisma.notification.deleteMany({
      where: { 
        id: notificationId,
        userId,
      },
    });

    return notification;
  }

  // Notification types
  async sendJobPostedNotification(companyUserId: string, jobData: any) {
    // Barcha talabalarga yangi vakansiya haqida bildirishnoma
    const students = await prisma.student.findMany({
      include: { user: true },
    });

    const notifications = students.map(student => ({
      userId: student.userId,
      type: 'JOB_POSTED',
      title: 'Yangi vakansiya!',
      message: `${jobData.company.name} kompaniyasi "${jobData.title}" lavozimiga ishchi qidirmoqda`,
      data: {
        jobId: jobData.id,
        companyId: jobData.companyId,
      },
    }));

    await prisma.notification.createMany({
      data: notifications,
    });

    return notifications.length;
  }

  async sendApplicationReceivedNotification(companyUserId: string, applicationData: any) {
    const notification = await this.create({
      userId: companyUserId,
      type: 'APPLICATION_RECEIVED',
      title: 'Yangi ariza!',
      message: `${applicationData.student.firstName} ${applicationData.student.lastName} "${applicationData.job.title}" lavozimiga ariza yubordi`,
      data: {
        applicationId: applicationData.id,
        jobId: applicationData.jobId,
        studentId: applicationData.studentId,
      },
    });

    return notification;
  }

  async sendApplicationStatusNotification(studentUserId: string, applicationData: any) {
    const statusMessages: Record<string, string> = {
      'PENDING': 'Arizangiz ko\'rib chiqilmoqda',
      'REVIEWING': 'Arizangiz ko\'rib chiqilmoqda',
      'INTERVIEW': 'Siz intervyuga taklif qilindingiz!',
      'OFFERED': 'Sizga ish taklif qilindi!',
      'REJECTED': 'Arizangiz rad etildi',
    };

    const message = statusMessages[applicationData.status] || 'Arizangiz holati o\'zgartirildi';

    const notification = await this.create({
      userId: studentUserId,
      type: 'APPLICATION_STATUS_CHANGED',
      title: 'Ariza holati o\'zgarti',
      message,
      data: {
        applicationId: applicationData.id,
        jobId: applicationData.jobId,
        status: applicationData.status,
      },
    });

    return notification;
  }

  async sendInterviewScheduledNotification(studentUserId: string, interviewData: any) {
    const notification = await this.create({
      userId: studentUserId,
      type: 'INTERVIEW_SCHEDULED',
      title: 'Intervyu tayinlandi!',
      message: `${interviewData.company.name} bilan intervyu: ${interviewData.date} ${interviewData.time}`,
      data: {
        interviewId: interviewData.id,
        companyId: interviewData.companyId,
        date: interviewData.date,
        time: interviewData.time,
      },
    });

    return notification;
  }
}

export const notificationService = new NotificationService();
