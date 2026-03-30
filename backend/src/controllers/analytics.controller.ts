import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { createError } from '../middleware/error.middleware';

// Student Analytics Dashboard
export const getStudentAnalytics = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;

    const student = await prisma.student.findUnique({
      where: { userId },
      include: {
        applications: {
          include: {
            job: true,
          },
        },
      },
    });

    if (!student) {
      throw createError('Student not found', 404);
    }

    // Calculate statistics
    const totalApplications = student.applications.length;
    const pendingApplications = student.applications.filter((a: any) => a.status === 'PENDING').length;
    const interviewApplications = student.applications.filter((a: any) => a.status === 'INTERVIEW').length;
    const offeredApplications = student.applications.filter((a: any) => a.status === 'OFFERED').length;
    const rejectedApplications = student.applications.filter((a: any) => a.status === 'REJECTED').length;

    // Application trend by month
    const monthlyStats: Record<string, number> = {};
    student.applications.forEach((app: any) => {
      const month = new Date(app.createdAt).toLocaleString('uz-UZ', { month: 'short', year: 'numeric' });
      if (!monthlyStats[month]) {
        monthlyStats[month] = 0;
      }
      monthlyStats[month]++;
    });

    // Skills demand analysis
    const skillsDemand: Record<string, number> = {};
    student.applications.forEach((app: any) => {
      app.job?.skills?.forEach((skill: string) => {
        if (!skillsDemand[skill]) {
          skillsDemand[skill] = 0;
        }
        skillsDemand[skill]++;
      });
    });

    const analytics = {
      overview: {
        totalApplications,
        pendingApplications,
        interviewApplications,
        offeredApplications,
        rejectedApplications,
        successRate: totalApplications > 0 ? Math.round((offeredApplications / totalApplications) * 100) : 0,
      },
      monthlyTrend: Object.entries(monthlyStats).map(([month, count]) => ({ month, count })),
      skillsDemand: Object.entries(skillsDemand)
        .map(([skill, count]) => ({ skill, count }))
        .sort((a: any, b: any) => b.count - a.count)
        .slice(0, 10),
      recentActivity: student.applications
        .sort((a: any, b: any) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
        .slice(0, 5)
        .map((app: any) => ({
          id: app.id,
          jobTitle: app.job?.title,
          status: app.status,
          date: app.updatedAt,
        })),
    };

    res.json({
      success: true,
      data: analytics,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to fetch analytics',
    });
  }
};

// Company Analytics Dashboard
export const getCompanyAnalytics = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;

    const company = await prisma.company.findUnique({
      where: { userId },
      include: {
        jobs: {
          include: {
            applications: {
              include: {
                student: true,
              },
            },
          },
        },
      },
    });

    if (!company) {
      throw createError('Company not found', 404);
    }

    // Calculate job statistics
    const jobsStats = company.jobs.map((job: any) => ({
      id: job.id,
      title: job.title,
      totalApplications: job.applications.length,
      pendingApplications: job.applications.filter((a: any) => a.status === 'PENDING').length,
      interviewApplications: job.applications.filter((a: any) => a.status === 'INTERVIEW').length,
      hiredApplications: job.applications.filter((a: any) => a.status === 'HIRED').length,
      viewsCount: job.viewsCount,
      conversionRate: job.viewsCount > 0 ? Math.round((job.applications.length / job.viewsCount) * 100) : 0,
    }));

    // Application status distribution
    const allApplications = company.jobs.flatMap((j: any) => j.applications);
    const statusDistribution = {
      PENDING: allApplications.filter((a: any) => a.status === 'PENDING').length,
      REVIEWING: allApplications.filter((a: any) => a.status === 'REVIEWING').length,
      INTERVIEW: allApplications.filter((a: any) => a.status === 'INTERVIEW').length,
      OFFERED: allApplications.filter((a: any) => a.status === 'OFFERED').length,
      HIRED: allApplications.filter((a: any) => a.status === 'HIRED').length,
      REJECTED: allApplications.filter((a: any) => a.status === 'REJECTED').length,
    };

    // Top applicants by skills
    const applicantsBySkills: Record<string, Set<string>> = {};
    allApplications.forEach((app: any) => {
      app.student?.skills?.forEach((skill: string) => {
        if (!applicantsBySkills[skill]) {
          applicantsBySkills[skill] = new Set();
        }
        applicantsBySkills[skill].add(app.studentId);
      });
    });

    const analytics = {
      overview: {
        totalJobs: company.jobs.length,
        activeJobs: company.jobs.filter((j: any) => j.isActive).length,
        totalApplications: allApplications.length,
        totalViews: company.jobs.reduce((acc: number, j: any) => acc + j.viewsCount, 0),
        averageConversionRate: jobsStats.length > 0
          ? Math.round(jobsStats.reduce((acc: number, j: any) => acc + j.conversionRate, 0) / jobsStats.length)
          : 0,
      },
      jobsStats,
      statusDistribution,
      topSkills: Object.entries(applicantsBySkills)
        .map(([skill, students]: [string, any]) => ({ skill, count: students.size }))
        .sort((a: any, b: any) => b.count - a.count)
        .slice(0, 10),
      recentApplications: allApplications
        .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 10)
        .map((app: any) => ({
          id: app.id,
          studentName: `${app.student?.firstName} ${app.student?.lastName}`,
          jobTitle: company.jobs.find((j: any) => j.id === app.jobId)?.title,
          status: app.status,
          date: app.createdAt,
        })),
    };

    res.json({
      success: true,
      data: analytics,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to fetch analytics',
    });
  }
};

// Platform-wide statistics (for admin)
export const getPlatformAnalytics = async (req: Request, res: Response) => {
  try {
    const userRole = (req as any).user?.role;

    if (userRole !== 'ADMIN') {
      throw createError('Unauthorized', 403);
    }

    const [
      totalUsers,
      totalStudents,
      totalCompanies,
      totalJobs,
      totalApplications,
      recentUsers,
      recentJobs,
      recentApplications,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.student.count(),
      prisma.company.count(),
      prisma.job.count(),
      prisma.application.count(),
      prisma.user.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: { id: true, email: true, role: true, createdAt: true },
      }),
      prisma.job.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: { company: { select: { name: true } } },
      }),
      prisma.application.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: {
          student: { select: { firstName: true, lastName: true } },
          job: { select: { title: true } },
        },
      }),
    ]);

    const stats = {
      overview: {
        totalUsers,
        totalStudents,
        totalCompanies,
        totalJobs,
        totalApplications,
      },
      recentActivity: {
        users: recentUsers,
        jobs: recentJobs,
        applications: recentApplications,
      },
    };

    res.json({
      success: true,
      data: stats,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to fetch platform stats',
    });
  }
};
