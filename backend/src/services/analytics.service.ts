import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const analyticsService = {
  // Get platform statistics (admin only)
  async getPlatformStats() {
    const [
      totalUsers,
      totalStudents,
      totalCompanies,
      totalJobs,
      totalApplications,
      newUsersToday,
      newJobsToday,
      newApplicationsToday,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: 'STUDENT' } }),
      prisma.user.count({ where: { role: 'COMPANY' } }),
      prisma.job.count(),
      prisma.application.count(),
      prisma.user.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
          },
        },
      }),
      prisma.job.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
          },
        },
      }),
      prisma.application.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
          },
        },
      }),
    ]);

    return {
      totalUsers,
      totalStudents,
      totalCompanies,
      totalJobs,
      totalApplications,
      newUsersToday,
      newJobsToday,
      newApplicationsToday,
    };
  },

  // Get student analytics
  async getStudentAnalytics(userId: string) {
    const [
      totalApplications,
      pendingApplications,
      interviewApplications,
      offeredApplications,
      rejectedApplications,
      savedJobs,
      profileViews,
    ] = await Promise.all([
      prisma.application.count({ where: { userId } }),
      prisma.application.count({ where: { userId, status: 'PENDING' } }),
      prisma.application.count({ where: { userId, status: 'INTERVIEW' } }),
      prisma.application.count({ where: { userId, status: 'OFFERED' } }),
      prisma.application.count({ where: { userId, status: 'REJECTED' } }),
      prisma.savedJob.count({ where: { userId } }),
      // Profile views would come from analytics table
      0,
    ]);

    return {
      totalApplications,
      pendingApplications,
      interviewApplications,
      offeredApplications,
      rejectedApplications,
      savedJobs,
      profileViews,
      successRate: totalApplications > 0
        ? Math.round(((offeredApplications + interviewApplications) / totalApplications) * 100)
        : 0,
    };
  },

  // Get company analytics
  async getCompanyAnalytics(companyId: string) {
    const [
      totalJobs,
      activeJobs,
      totalApplications,
      pendingApplications,
      viewedApplications,
      hiredCount,
    ] = await Promise.all([
      prisma.job.count({ where: { companyId } }),
      prisma.job.count({ where: { companyId, isActive: true } }),
      prisma.application.count({
        where: {
          job: {
            companyId,
          },
        },
      }),
      prisma.application.count({
        where: {
          job: { companyId },
          status: 'PENDING',
        },
      }),
      prisma.application.count({
        where: {
          job: { companyId },
          status: { in: ['REVIEWED', 'INTERVIEW', 'OFFERED', 'HIRED'] },
        },
      }),
      prisma.application.count({
        where: {
          job: { companyId },
          status: 'HIRED',
        },
      }),
    ]);

    return {
      totalJobs,
      activeJobs,
      totalApplications,
      pendingApplications,
      viewedApplications,
      hiredCount,
      conversionRate: totalApplications > 0
        ? Math.round((hiredCount / totalApplications) * 100)
        : 0,
    };
  },

  // Get popular skills
  async getPopularSkills(limit: number = 10) {
    const jobs = await prisma.job.findMany({
      where: { isActive: true },
      select: { skills: true },
    });

    const skillCount: Record<string, number> = {};
    jobs.forEach((job) => {
      job.skills.forEach((skill) => {
        skillCount[skill] = (skillCount[skill] || 0) + 1;
      });
    });

    return Object.entries(skillCount)
      .map(([skill, count]) => ({ skill, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  },

  // Get monthly growth
  async getMonthlyGrowth() {
    const months = 6;
    const data = [];

    for (let i = 0; i < months; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      const [newUsers, newJobs, newApplications] = await Promise.all([
        prisma.user.count({
          where: {
            createdAt: {
              gte: startOfMonth,
              lte: endOfMonth,
            },
          },
        }),
        prisma.job.count({
          where: {
            createdAt: {
              gte: startOfMonth,
              lte: endOfMonth,
            },
          },
        }),
        prisma.application.count({
          where: {
            createdAt: {
              gte: startOfMonth,
              lte: endOfMonth,
            },
          },
        }),
      ]);

      data.push({
        month: date.toLocaleString('default', { month: 'short' }),
        newUsers,
        newJobs,
        newApplications,
      });
    }

    return data.reverse();
  },
};
