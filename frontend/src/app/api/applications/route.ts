import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

// GET /api/applications - Get user applications
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

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');

    const where: any = { userId: payload.userId };
    if (status) where.status = status;

    const skip = (page - 1) * limit;

    const [applications, total] = await Promise.all([
      prisma.application.findMany({
        where,
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
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.application.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: applications,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get applications error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}

// POST /api/applications - Create new application
export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 });
    }

    const { jobId, coverLetter, resume, expectedSalary } = await req.json();

    // Check if already applied
    const existingApplication = await prisma.application.findFirst({
      where: {
        userId: payload.userId,
        jobId,
      },
    });

    if (existingApplication) {
      return NextResponse.json(
        { success: false, message: 'Already applied for this job' },
        { status: 400 }
      );
    }

    const application = await prisma.application.create({
      data: {
        userId: payload.userId,
        jobId,
        coverLetter,
        resume,
        expectedSalary,
        status: 'PENDING',
      },
      include: {
        job: {
          select: {
            title: true,
            company: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    // Create notification for company
    await prisma.notification.create({
      data: {
        userId: payload.userId,
        type: 'JOB_APPLICATION',
        title: 'New Application',
        message: `You have a new application for ${application.job.title}`,
        data: {
          applicationId: application.id,
          jobId,
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: application,
      message: 'Application submitted successfully',
    }, { status: 201 });
  } catch (error) {
    console.error('Create application error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit application' },
      { status: 500 }
    );
  }
}
