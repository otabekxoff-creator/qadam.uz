import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

// GET /api/jobs - Get all jobs with filtering
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search');
    const type = searchParams.get('type');
    const location = searchParams.get('location');
    const isRemote = searchParams.get('isRemote');
    const salaryMin = searchParams.get('salaryMin');
    const salaryMax = searchParams.get('salaryMax');
    const skills = searchParams.get('skills')?.split(',');
    const companyId = searchParams.get('companyId');
    
    const where: any = { isActive: true };
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    if (type) where.type = type;
    if (location) where.location = { contains: location, mode: 'insensitive' };
    if (isRemote !== null) where.isRemote = isRemote === 'true';
    if (companyId) where.companyId = companyId;
    
    if (salaryMin || salaryMax) {
      where.AND = [];
      if (salaryMin) where.AND.push({ salaryMax: { gte: parseInt(salaryMin) } });
      if (salaryMax) where.AND.push({ salaryMin: { lte: parseInt(salaryMax) } });
    }
    
    if (skills?.length) {
      where.skills = { hasSome: skills };
    }
    
    const skip = (page - 1) * limit;
    
    const [jobs, total] = await Promise.all([
      prisma.job.findMany({
        where,
        include: {
          company: {
            select: {
              id: true,
              name: true,
              logo: true,
              location: true,
              isVerified: true,
            },
          },
          _count: {
            select: { applications: true },
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.job.count({ where }),
    ]);
    
    return NextResponse.json({
      success: true,
      data: jobs,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get jobs error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch jobs' },
      { status: 500 }
    );
  }
}

// POST /api/jobs - Create new job (company only)
export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload || payload.role !== 'COMPANY') {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }

    const data = await req.json();
    
    const company = await prisma.company.findUnique({
      where: { userId: payload.userId },
    });
    
    if (!company) {
      return NextResponse.json(
        { success: false, message: 'Company profile not found' },
        { status: 404 }
      );
    }

    const job = await prisma.job.create({
      data: {
        ...data,
        companyId: company.id,
        skills: data.skills || [],
        requirements: data.requirements || [],
        responsibilities: data.responsibilities || [],
        benefits: data.benefits || [],
        tags: data.tags || [],
        salaryCurrency: data.salaryCurrency || 'UZS',
        viewsCount: 0,
      },
    });

    return NextResponse.json({
      success: true,
      data: job,
      message: 'Job created successfully',
    }, { status: 201 });
  } catch (error) {
    console.error('Create job error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create job' },
      { status: 500 }
    );
  }
}
