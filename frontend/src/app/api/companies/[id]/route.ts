import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

// GET /api/companies/[id] - Get company by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const company = await prisma.company.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: {
            email: true,
            isVerified: true,
          },
        },
        jobs: {
          where: { isActive: true },
          orderBy: { createdAt: 'desc' },
          take: 5,
          select: {
            id: true,
            title: true,
            type: true,
            location: true,
            salaryMin: true,
            salaryMax: true,
            salaryCurrency: true,
            createdAt: true,
            _count: {
              select: { applications: true },
            },
          },
        },
        _count: {
          select: { jobs: true },
        },
      },
    });

    if (!company) {
      return NextResponse.json(
        { success: false, message: 'Company not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: company,
    });
  } catch (error) {
    console.error('Get company error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch company' },
      { status: 500 }
    );
  }
}

// PUT /api/companies/[id] - Update company
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

    // Check if user owns this company
    const company = await prisma.company.findFirst({
      where: {
        id: params.id,
        userId: payload.userId,
      },
    });

    if (!company && payload.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, message: 'Not authorized to update this company' },
        { status: 403 }
      );
    }

    const data = await req.json();

    const updatedCompany = await prisma.company.update({
      where: { id: params.id },
      data: {
        name: data.name,
        description: data.description,
        website: data.website,
        phone: data.phone,
        industry: data.industry,
        size: data.size,
        location: data.location,
        logo: data.logo,
        benefits: data.benefits,
        culture: data.culture,
        mission: data.mission,
        vision: data.vision,
        socialLinks: data.socialLinks,
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedCompany,
      message: 'Company updated successfully',
    });
  } catch (error) {
    console.error('Update company error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update company' },
      { status: 500 }
    );
  }
}

// DELETE /api/companies/[id] - Delete company
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
    if (!payload || payload.role !== 'ADMIN') {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }

    await prisma.company.delete({
      where: { id: params.id },
    });

    return NextResponse.json({
      success: true,
      message: 'Company deleted successfully',
    });
  } catch (error) {
    console.error('Delete company error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete company' },
      { status: 500 }
    );
  }
}
