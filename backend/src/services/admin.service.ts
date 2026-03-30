import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const adminService = {
  // Get platform statistics
  async getPlatformStats() {
    const [
      totalUsers,
      totalStudents,
      totalCompanies,
      totalJobs,
      totalApplications,
      totalChats,
      totalNotifications,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: 'STUDENT' } }),
      prisma.user.count({ where: { role: 'COMPANY' } }),
      prisma.job.count(),
      prisma.application.count(),
      prisma.chat.count(),
      prisma.notification.count(),
    ]);

    // Get today's stats
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      newUsersToday,
      newJobsToday,
      newApplicationsToday,
    ] = await Promise.all([
      prisma.user.count({
        where: { createdAt: { gte: today } },
      }),
      prisma.job.count({
        where: { createdAt: { gte: today } },
      }),
      prisma.application.count({
        where: { createdAt: { gte: today } },
      }),
    ]);

    return {
      totalUsers,
      totalStudents,
      totalCompanies,
      totalJobs,
      totalApplications,
      totalChats,
      totalNotifications,
      newUsersToday,
      newJobsToday,
      newApplicationsToday,
    };
  },

  // Get all users with pagination
  async getAllUsers(options: any = {}) {
    const { page = 1, limit = 10, role, search } = options;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (role) where.role = role;
    if (search) {
      where.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        {
          student: {
            OR: [
              { firstName: { contains: search, mode: 'insensitive' } },
              { lastName: { contains: search, mode: 'insensitive' } },
            ],
          },
        },
        {
          company: {
            name: { contains: search, mode: 'insensitive' },
          },
        },
      ];
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        include: {
          student: true,
          company: true,
          _count: {
            select: {
              applications: true,
            },
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count({ where }),
    ]);

    return { users, total, totalPages: Math.ceil(total / limit) };
  },

  // Get all jobs with pagination
  async getAllJobs(options: any = {}) {
    const { page = 1, limit = 10, status, search } = options;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (status !== undefined) where.isActive = status === 'active';
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [jobs, total] = await Promise.all([
      prisma.job.findMany({
        where,
        include: {
          company: {
            select: {
              id: true,
              name: true,
              logo: true,
            },
          },
          _count: {
            select: { applications: true },
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.job.count({ where }),
    ]);

    return { jobs, total, totalPages: Math.ceil(total / limit) };
  },

  // Toggle user verification status
  async toggleUserVerification(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return await prisma.user.update({
      where: { id: userId },
      data: { isVerified: !user.isVerified },
    });
  },

  // Delete user
  async deleteUser(userId: string) {
    return await prisma.user.delete({
      where: { id: userId },
    });
  },

  // Get recent activity
  async getRecentActivity(limit: number = 20) {
    const [
      recentUsers,
      recentJobs,
      recentApplications,
    ] = await Promise.all([
      prisma.user.findMany({
        include: {
          student: true,
          company: true,
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
      }),
      prisma.job.findMany({
        include: {
          company: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
      }),
      prisma.application.findMany({
        include: {
          user: {
            include: {
              student: {
                select: {
                  firstName: true,
                  lastName: true,
                },
              },
            },
          },
          job: {
            select: {
              title: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
      }),
    ]);

    return {
      recentUsers,
      recentJobs,
      recentApplications,
    };
  },
};
