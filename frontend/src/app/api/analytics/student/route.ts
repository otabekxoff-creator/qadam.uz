import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

// GET /api/analytics/student - Get student analytics
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

    const userId = payload.userId;

    const [
      totalApplications,
      pendingApplications,
      interviewApplications,
      offeredApplications,
      rejectedApplications,
      savedJobs,
    ] = await Promise.all([
      prisma.application.count({ where: { userId } }),
      prisma.application.count({ where: { userId, status: 'PENDING' } }),
      prisma.application.count({ where: { userId, status: 'INTERVIEW' } }),
      prisma.application.count({ where: { userId, status: 'OFFERED' } }),
      prisma.application.count({ where: { userId, status: 'REJECTED' } }),
      prisma.savedJob.count({ where: { userId } }),
    ]);

    // Get recent applications
    const recentApplications = await prisma.application.findMany({
      where: { userId },
      include: {
        job: {
          select: {
            id: true,
            title: true,
            company: {
              select: {
                id: true,
                name: true,
                logo: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    // Calculate success rate
    const completedApplications = offeredApplications + rejectedApplications;
    const successRate = completedApplications > 0
      ? Math.round((offeredApplications / completedApplications) * 100)
      : 0;

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          totalApplications,
          pendingApplications,
          interviewApplications,
          offeredApplications,
          rejectedApplications,
          savedJobs,
          successRate,
        },
        recentApplications,
      },
    });
  } catch (error) {
    console.error('Student analytics error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
