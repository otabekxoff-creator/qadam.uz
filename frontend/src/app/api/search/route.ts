import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/search - Global search
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q');
    const type = searchParams.get('type') || 'all';
    const limit = parseInt(searchParams.get('limit') || '10');

    if (!query) {
      return NextResponse.json(
        { success: false, message: 'Search query is required' },
        { status: 400 }
      );
    }

    const results: any = {};

    // Search jobs
    if (type === 'all' || type === 'jobs') {
      results.jobs = await prisma.job.findMany({
        where: {
          isActive: true,
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
            { skills: { has: query } },
          ],
        },
        include: {
          company: {
            select: {
              id: true,
              name: true,
              logo: true,
            },
          },
        },
        take: limit,
      });
    }

    // Search companies
    if (type === 'all' || type === 'companies') {
      results.companies = await prisma.company.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
            { industry: { contains: query, mode: 'insensitive' } },
          ],
        },
        take: limit,
      });
    }

    // Search users (students only, limited fields)
    if (type === 'all' || type === 'students') {
      results.students = await prisma.student.findMany({
        where: {
          OR: [
            { firstName: { contains: query, mode: 'insensitive' } },
            { lastName: { contains: query, mode: 'insensitive' } },
            { major: { contains: query, mode: 'insensitive' } },
            { university: { contains: query, mode: 'insensitive' } },
          ],
        },
        include: {
          user: {
            select: {
              id: true,
            },
          },
        },
        take: limit,
      });
    }

    return NextResponse.json({
      success: true,
      data: results,
      query,
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { success: false, message: 'Search failed' },
      { status: 500 }
    );
  }
}
