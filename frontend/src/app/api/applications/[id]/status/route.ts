import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

// PATCH /api/applications/[id]/status - Update application status
export async function PATCH(
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

    const { status, notes } = await req.json();

    // Get application with job info
    const application = await prisma.application.findUnique({
      where: { id: params.id },
      include: {
        job: {
          include: {
            company: true,
          },
        },
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });

    if (!application) {
      return NextResponse.json(
        { success: false, message: 'Application not found' },
        { status: 404 }
      );
    }

    // Check authorization
    const isCompanyOwner = application.job.company.userId === payload.userId;
    const isAdmin = payload.role === 'ADMIN';

    if (!isCompanyOwner && !isAdmin) {
      return NextResponse.json(
        { success: false, message: 'Not authorized to update this application' },
        { status: 403 }
      );
    }

    const updatedApplication = await prisma.application.update({
      where: { id: params.id },
      data: {
        status,
        notes: notes || application.notes,
      },
      include: {
        job: {
          select: {
            title: true,
          },
        },
      },
    });

    // Notify applicant
    await prisma.notification.create({
      data: {
        userId: application.userId,
        type: 'APPLICATION_STATUS',
        title: 'Application Status Updated',
        message: `Your application for ${application.job.title} has been ${status.toLowerCase()}`,
        data: {
          applicationId: application.id,
          jobId: application.jobId,
          newStatus: status,
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedApplication,
      message: 'Application status updated successfully',
    });
  } catch (error) {
    console.error('Update application status error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update application status' },
      { status: 500 }
    );
  }
}

// DELETE /api/applications/[id] - Withdraw application
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

    const application = await prisma.application.findUnique({
      where: { id: params.id },
    });

    if (!application) {
      return NextResponse.json(
        { success: false, message: 'Application not found' },
        { status: 404 }
      );
    }

    // Only applicant or admin can withdraw
    if (application.userId !== payload.userId && payload.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, message: 'Not authorized to withdraw this application' },
        { status: 403 }
      );
    }

    await prisma.application.update({
      where: { id: params.id },
      data: { status: 'WITHDRAWN' },
    });

    return NextResponse.json({
      success: true,
      message: 'Application withdrawn successfully',
    });
  } catch (error) {
    console.error('Withdraw application error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to withdraw application' },
      { status: 500 }
    );
  }
}
