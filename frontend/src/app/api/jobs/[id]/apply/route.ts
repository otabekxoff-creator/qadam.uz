import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

// GET /api/jobs/[id]/apply - Get application status for a job
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 });
    }

    const application = await prisma.application.findFirst({
      where: {
        jobId: params.id,
        userId: payload.userId,
      },
      include: {
        job: {
          select: {
            title: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        hasApplied: !!application,
        application: application,
      },
    });
  } catch (error) {
    console.error('Check application status error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to check application status' },
      { status: 500 }
    );
  }
}

// POST /api/jobs/[id]/apply - Apply for a job
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 });
    }

    // Check if user is a student
    if (payload.role !== 'STUDENT') {
      return NextResponse.json(
        { success: false, message: 'Only students can apply for jobs' },
        { status: 403 }
      );
    }

    // Check if already applied
    const existingApplication = await prisma.application.findFirst({
      where: {
        jobId: params.id,
        userId: payload.userId,
      },
    });

    if (existingApplication) {
      return NextResponse.json(
        { success: false, message: 'Already applied for this job' },
        { status: 400 }
      );
    }

    // Check if job exists and is active
    const job = await prisma.job.findUnique({
      where: { id: params.id },
      include: {
        company: {
          select: {
            id: true,
            name: true,
            userId: true,
          },
        },
      },
    });

    if (!job) {
      return NextResponse.json(
        { success: false, message: 'Job not found' },
        { status: 404 }
      );
    }

    if (!job.isActive) {
      return NextResponse.json(
        { success: false, message: 'This job is no longer active' },
        { status: 400 }
      );
    }

    const { coverLetter, resume, expectedSalary, availableFrom } = await req.json();

    // Create application
    const application = await prisma.application.create({
      data: {
        jobId: params.id,
        userId: payload.userId,
        coverLetter,
        resume,
        expectedSalary,
        availableFrom: availableFrom ? new Date(availableFrom) : null,
        status: 'PENDING',
      },
    });

    // Create notification for company
    await prisma.notification.create({
      data: {
        userId: job.company.userId,
        type: 'JOB_APPLICATION',
        title: 'New Application',
        message: `You have a new application for ${job.title}`,
        data: {
          applicationId: application.id,
          jobId: params.id,
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: application,
      message: 'Application submitted successfully',
    }, { status: 201 });
  } catch (error) {
    console.error('Apply for job error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit application' },
      { status: 500 }
    );
  }
}
