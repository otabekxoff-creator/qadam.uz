import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

// GET /api/jobs/[id] - Get job by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const job = await prisma.job.findUnique({
      where: { id: params.id },
      include: {
        company: {
          select: {
            id: true,
            name: true,
            description: true,
            logo: true,
            website: true,
            industry: true,
            size: true,
            location: true,
            isVerified: true,
          },
        },
        _count: {
          select: { applications: true },
        },
      },
    });

    if (!job) {
      return NextResponse.json(
        { success: false, message: 'Job not found' },
        { status: 404 }
      );
    }

    // Increment views
    await prisma.job.update({
      where: { id: params.id },
      data: { viewsCount: { increment: 1 } },
    });

    return NextResponse.json({
      success: true,
      data: job,
    });
  } catch (error) {
    console.error('Get job error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch job' },
      { status: 500 }
    );
  }
}

// PUT /api/jobs/[id] - Update job
export async function PUT(
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

    // Check if user owns this job
    const job = await prisma.job.findFirst({
      where: {
        id: params.id,
        company: {
          userId: payload.userId,
        },
      },
    });

    if (!job && payload.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, message: 'Not authorized to update this job' },
        { status: 403 }
      );
    }

    const data = await req.json();

    const updatedJob = await prisma.job.update({
      where: { id: params.id },
      data: {
        title: data.title,
        description: data.description,
        requirements: data.requirements,
        responsibilities: data.responsibilities,
        skills: data.skills,
        type: data.type,
        experienceLevel: data.experienceLevel,
        location: data.location,
        isRemote: data.isRemote,
        salaryMin: data.salaryMin,
        salaryMax: data.salaryMax,
        salaryCurrency: data.salaryCurrency,
        benefits: data.benefits,
        department: data.department,
        category: data.category,
        tags: data.tags,
        isActive: data.isActive,
        expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedJob,
      message: 'Job updated successfully',
    });
  } catch (error) {
    console.error('Update job error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update job' },
      { status: 500 }
    );
  }
}

// DELETE /api/jobs/[id] - Delete job
export async function DELETE(
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

    // Check if user owns this job
    const job = await prisma.job.findFirst({
      where: {
        id: params.id,
        company: {
          userId: payload.userId,
        },
      },
    });

    if (!job && payload.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, message: 'Not authorized to delete this job' },
        { status: 403 }
      );
    }

    await prisma.job.delete({
      where: { id: params.id },
    });

    return NextResponse.json({
      success: true,
      message: 'Job deleted successfully',
    });
  } catch (error) {
    console.error('Delete job error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete job' },
      { status: 500 }
    );
  }
}
