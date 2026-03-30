import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

// GET /api/analytics/company - Get company analytics
export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 });
    }

    // Get company
    const company = await prisma.company.findFirst({
      where: { userId: payload.userId },
    });

    if (!company) {
      return NextResponse.json(
        { success: false, message: 'Company profile not found' },
        { status: 404 }
      );
    }

    const companyId = company.id;

    const [
      totalJobs,
      activeJobs,
      totalApplications,
      pendingApplications,
      reviewedApplications,
      hiredCount,
    ] = await Promise.all([
      prisma.job.count({ where: { companyId } }),
      prisma.job.count({ where: { companyId, isActive: true } }),
      prisma.application.count({ where: { job: { companyId } } }),
      prisma.application.count({ where: { job: { companyId }, status: 'PENDING' } }),
      prisma.application.count({
        where: { job: { companyId }, status: { in: ['REVIEWED', 'INTERVIEW'] } } },
      }),
      prisma.application.count({ where: { job: { companyId }, status: 'HIRED' } }),
    ]);

    // Get recent applications
    const recentApplications = await prisma.application.findMany({
      where: { job: { companyId } },
      include: {
        user: {
          include: {
            student: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatar: true,
              },
            },
          },
        },
        job: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    // Calculate conversion rate
    const conversionRate = totalApplications > 0
      ? Math.round((hiredCount / totalApplications) * 100)
      : 0;

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          totalJobs,
          activeJobs,
          totalApplications,
          pendingApplications,
          reviewedApplications,
          hiredCount,
          conversionRate,
        },
        recentApplications,
      },
    });
  } catch (error) {
    console.error('Company analytics error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
