import { PrismaClient } from '@prisma/client';
import logger from './logger';
import redisService from './redis';

const prisma = new PrismaClient();

/**
 * Analytics Service - Track all user activities and system metrics
 */
export class AnalyticsService {
  /**
   * Track user activity
   */
  async trackActivity(
    userId: string,
    action: string,
    metadata: Record<string, any> = {}
  ): Promise<void> {
    try {
      // Store in database
      await prisma.activityLog.create({
        data: {
          userId,
          action,
          metadata: JSON.stringify(metadata),
          ipAddress: metadata.ipAddress,
          userAgent: metadata.userAgent,
          timestamp: new Date(),
        },
      });

      // Update real-time stats in Redis
      const today = new Date().toISOString().split('T')[0];
      await redisService.increment(`stats:activity:${today}:${action}`);
      await redisService.increment(`stats:user:${userId}:${action}`);

      logger.info(`Activity tracked: ${action} by user ${userId}`);
    } catch (error) {
      logger.error('Failed to track activity:', error);
    }
  }

  /**
   * Track page view
   */
  async trackPageView(
    page: string,
    userId?: string,
    metadata: Record<string, any> = {}
  ): Promise<void> {
    try {
      await prisma.pageView.create({
        data: {
          page,
          userId,
          sessionId: metadata.sessionId,
          referrer: metadata.referrer,
          userAgent: metadata.userAgent,
          ipAddress: metadata.ipAddress,
          timestamp: new Date(),
        },
      });

      // Update daily stats
      const today = new Date().toISOString().split('T')[0];
      await redisService.increment(`stats:pageviews:${today}`);
      await redisService.increment(`stats:page:${page}:${today}`);
    } catch (error) {
      logger.error('Failed to track page view:', error);
    }
  }

  /**
   * Track search query
   */
  async trackSearch(
    query: string,
    filters: Record<string, any>,
    resultsCount: number,
    userId?: string
  ): Promise<void> {
    try {
      await prisma.searchLog.create({
        data: {
          query,
          filters: JSON.stringify(filters),
          resultsCount,
          userId,
          timestamp: new Date(),
        },
      });

      // Update popular searches
      await redisService.increment(`stats:search:${query.toLowerCase()}`);
    } catch (error) {
      logger.error('Failed to track search:', error);
    }
  }

  /**
   * Get dashboard statistics
   */
  async getDashboardStats(): Promise<{
    users: { total: number; newToday: number; activeToday: number };
    jobs: { total: number; newToday: number; active: number };
    applications: { total: number; newToday: number; byStatus: Record<string, number> };
    startups: { total: number; newToday: number; funded: number };
    pageViews: { today: number; thisWeek: number; thisMonth: number };
  }> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);

    const monthAgo = new Date(today);
    monthAgo.setDate(monthAgo.getDate() - 30);

    const [
      totalUsers,
      newUsersToday,
      activeUsersToday,
      totalJobs,
      newJobsToday,
      activeJobs,
      totalApplications,
      newApplicationsToday,
      applicationsByStatus,
      totalStartups,
      newStartupsToday,
      fundedStartups,
      pageViewsToday,
      pageViewsWeek,
      pageViewsMonth,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { createdAt: { gte: today } } }),
      prisma.user.count({
        where: {
          OR: [
            { student: { updatedAt: { gte: today } } },
            { company: { updatedAt: { gte: today } } },
          ],
        },
      }),
      prisma.job.count(),
      prisma.job.count({ where: { createdAt: { gte: today } } }),
      prisma.job.count({ where: { status: 'ACTIVE' } }),
      prisma.application.count(),
      prisma.application.count({ where: { createdAt: { gte: today } } }),
      prisma.application.groupBy({ by: ['status'], _count: { status: true } }),
      prisma.startup.count(),
      prisma.startup.count({ where: { createdAt: { gte: today } } }),
      prisma.startup.count({ where: { status: 'FUNDED' } }),
      prisma.pageView.count({ where: { timestamp: { gte: today } } }),
      prisma.pageView.count({ where: { timestamp: { gte: weekAgo } } }),
      prisma.pageView.count({ where: { timestamp: { gte: monthAgo } } }),
    ]);

    const byStatus = applicationsByStatus.reduce(
      (acc, curr) => ({ ...acc, [curr.status]: curr._count.status }),
      {}
    );

    return {
      users: {
        total: totalUsers,
        newToday: newUsersToday,
        activeToday: activeUsersToday,
      },
      jobs: {
        total: totalJobs,
        newToday: newJobsToday,
        active: activeJobs,
      },
      applications: {
        total: totalApplications,
        newToday: newApplicationsToday,
        byStatus,
      },
      startups: {
        total: totalStartups,
        newToday: newStartupsToday,
        funded: fundedStartups,
      },
      pageViews: {
        today: pageViewsToday,
        thisWeek: pageViewsWeek,
        thisMonth: pageViewsMonth,
      },
    };
  }

  /**
   * Get user engagement metrics
   */
  async getUserEngagement(userId: string): Promise<{
    totalLogins: number;
    lastActive: Date | null;
    pageViews: number;
    searches: number;
    applications: number;
    jobViews: number;
    favoriteJobs: number;
  }> {
    const [
      activityCount,
      lastActivity,
      pageViews,
      searches,
      applications,
      jobViews,
    ] = await Promise.all([
      prisma.activityLog.count({ where: { userId } }),
      prisma.activityLog.findFirst({
        where: { userId },
        orderBy: { timestamp: 'desc' },
        select: { timestamp: true },
      }),
      prisma.pageView.count({ where: { userId } }),
      prisma.searchLog.count({ where: { userId } }), // Fixed: Changed userID to userId
      prisma.application.count({ where: { student: { userId } } }),
      prisma.activityLog.count({
        where: { userId, action: 'VIEW_JOB' },
      }),
    ]);

    return {
      totalLogins: activityCount,
      lastActive: lastActivity?.timestamp || null,
      pageViews,
      searches,
      applications,
      jobViews,
      favoriteJobs: 0,
    };
  }

  /**
   * Get popular content
   */
  async getPopularContent(): Promise<{
    topJobs: Array<{ id: string; title: string; views: number }>;
    topStartups: Array<{ id: string; name: string; views: number }>;
    topSearches: Array<{ query: string; count: number }>;
    topPages: Array<{ page: string; views: number }>;
  }> {
    const [topJobs, topStartups, topSearches, topPages] = await Promise.all([
      prisma.job.findMany({
        take: 5,
        orderBy: { viewsCount: 'desc' },
        select: { id: true, title: true, viewsCount: true },
      }),
      prisma.startup.findMany({
        take: 5,
        orderBy: { viewsCount: 'desc' },
        select: { id: true, name: true, viewsCount: true },
      }),
      prisma.searchLog.groupBy({
        by: ['query'],
        _count: { query: true },
        orderBy: { _count: { query: 'desc' } },
        take: 10,
      }),
      prisma.pageView.groupBy({
        by: ['page'],
        _count: { page: true },
        orderBy: { _count: { page: 'desc' } },
        take: 10,
      }),
    ]);

    return {
      topJobs: topJobs.map((j) => ({ ...j, views: j.viewsCount || 0 })),
      topStartups: topStartups.map((s) => ({ ...s, views: s.viewsCount || 0 })),
      topSearches: topSearches.map((s) => ({ query: s.query, count: s._count.query })),
      topPages: topPages.map((p) => ({ page: p.page, views: p._count.page })),
    };
  }

  /**
   * Clean old analytics data
   */
  async cleanupOldData(days: number = 90): Promise<void> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    await Promise.all([
      prisma.activityLog.deleteMany({
        where: { timestamp: { lt: cutoffDate } },
      }),
      prisma.pageView.deleteMany({
        where: { timestamp: { lt: cutoffDate } },
      }),
      prisma.searchLog.deleteMany({
        where: { timestamp: { lt: cutoffDate } },
      }),
    ]);

    logger.info(`Cleaned up analytics data older than ${days} days`);
  }
}

export default new AnalyticsService();
