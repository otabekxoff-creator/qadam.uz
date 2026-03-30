import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

// GET /api/applications/[id] - Get application by ID
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

    const application = await prisma.application.findUnique({
      where: { id: params.id },
      include: {
        job: {
          include: {
            company: {
              select: {
                id: true,
                name: true,
                logo: true,
                email: true,
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            student: {
              select: {
                firstName: true,
                lastName: true,
                avatar: true,
                major: true,
                university: true,
              },
            },
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
    const isOwner = application.userId === payload.userId;
    const isCompanyOwner = application.job.company.id === payload.userId;
    const isAdmin = payload.role === 'ADMIN';

    if (!isOwner && !isCompanyOwner && !isAdmin) {
      return NextResponse.json(
        { success: false, message: 'Not authorized to view this application' },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      data: application,
    });
  } catch (error) {
    console.error('Get application error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch application' },
      { status: 500 }
    );
  }
}

// PUT /api/applications/[id] - Update application
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

    const application = await prisma.application.findUnique({
      where: { id: params.id },
    });

    if (!application) {
      return NextResponse.json(
        { success: false, message: 'Application not found' },
        { status: 404 }
      );
    }

    // Only applicant can update their own application
    if (application.userId !== payload.userId && payload.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, message: 'Not authorized to update this application' },
        { status: 403 }
      );
    }

    const data = await req.json();

    const updatedApplication = await prisma.application.update({
      where: { id: params.id },
      data: {
        coverLetter: data.coverLetter,
        resume: data.resume,
        expectedSalary: data.expectedSalary,
        availableFrom: data.availableFrom ? new Date(data.availableFrom) : null,
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedApplication,
      message: 'Application updated successfully',
    });
  } catch (error) {
    console.error('Update application error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update application' },
      { status: 500 }
    );
  }
}
