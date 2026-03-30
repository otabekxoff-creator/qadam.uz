import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

// GET /api/companies - Get all companies
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search');
    const industry = searchParams.get('industry');
    const size = searchParams.get('size');
    const location = searchParams.get('location');
    
    const where: any = {};
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    if (industry) where.industry = industry;
    if (size) where.size = size;
    if (location) where.location = { contains: location, mode: 'insensitive' };
    
    const skip = (page - 1) * limit;
    
    const [companies, total] = await Promise.all([
      prisma.company.findMany({
        where,
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
          _count: {
            select: { jobs: true },
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.company.count({ where }),
    ]);
    
    return NextResponse.json({
      success: true,
      data: companies,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get companies error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch companies' },
      { status: 500 }
    );
  }
}

// POST /api/companies - Create new company (admin only)
export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload || payload.role !== 'ADMIN') {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }

    const data = await req.json();
    
    const company = await prisma.company.create({
      data: {
        ...data,
        user: {
          create: {
            email: data.email,
            password: '', // Will be set later
            role: 'COMPANY',
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: company,
      message: 'Company created successfully',
    }, { status: 201 });
  } catch (error) {
    console.error('Create company error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create company' },
      { status: 500 }
    );
  }
}
