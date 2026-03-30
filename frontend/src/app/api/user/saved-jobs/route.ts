import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

// GET /api/user/saved-jobs - Get saved jobs
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

    const skip = (page - 1) * limit;

    const [savedJobs, total] = await Promise.all([
      prisma.savedJob.findMany({
        where: { userId: payload.userId },
        include: {
          job: {
            include: {
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
        skip,
        take: limit,
      }),
      prisma.savedJob.count({ where: { userId: payload.userId } }),
    ]);

    return NextResponse.json({
      success: true,
      data: savedJobs,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get saved jobs error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch saved jobs' },
      { status: 500 }
    );
  }
}

// POST /api/user/saved-jobs - Save a job
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

    const { jobId } = await req.json();

    if (!jobId) {
      return NextResponse.json(
        { success: false, message: 'Job ID is required' },
        { status: 400 }
      );
    }

    // Check if already saved
    const existing = await prisma.savedJob.findFirst({
      where: {
        userId: payload.userId,
        jobId,
      },
    });

    if (existing) {
      return NextResponse.json(
        { success: false, message: 'Job already saved' },
        { status: 400 }
      );
    }

    const savedJob = await prisma.savedJob.create({
      data: {
        userId: payload.userId,
        jobId,
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

    return NextResponse.json({
      success: true,
      data: savedJob,
      message: 'Job saved successfully',
    }, { status: 201 });
  } catch (error) {
    console.error('Save job error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to save job' },
      { status: 500 }
    );
  }
}

// DELETE /api/user/saved-jobs - Remove saved job
export async function DELETE(req: NextRequest) {
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
    const savedJobId = searchParams.get('id');

    if (!savedJobId) {
      return NextResponse.json(
        { success: false, message: 'Saved job ID is required' },
        { status: 400 }
      );
    }

    await prisma.savedJob.deleteMany({
      where: {
        id: savedJobId,
        userId: payload.userId,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Job removed from saved list',
    });
  } catch (error) {
    console.error('Remove saved job error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to remove saved job' },
      { status: 500 }
    );
  }
}
