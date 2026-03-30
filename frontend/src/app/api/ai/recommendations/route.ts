import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

// GET /api/ai/recommendations - Get job recommendations
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
    const limit = parseInt(searchParams.get('limit') || '10');

    const student = await prisma.student.findUnique({
      where: { userId: payload.userId },
      include: {
        skills: true,
        applications: {
          select: { jobId: true },
        },
      },
    });

    if (!student) {
      return NextResponse.json(
        { success: false, message: 'Student profile not found' },
        { status: 404 }
      );
    }

    const userSkills = student.skills.map((s: any) => s.name);
    const appliedJobIds = student.applications.map((a: any) => a.jobId);

    // Find matching jobs
    const jobs = await prisma.job.findMany({
      where: {
        isActive: true,
        id: { notIn: appliedJobIds },
        skills: { hasSome: userSkills.length > 0 ? userSkills : undefined },
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
      take: limit * 2,
    });

    // Calculate match scores
    const scoredJobs = jobs.map((job) => {
      const matchingSkills = job.skills.filter((skill) =>
        userSkills.includes(skill)
      );
      const matchScore =
        userSkills.length > 0
          ? Math.round((matchingSkills.length / job.skills.length) * 100)
          : 50;

      return {
        ...job,
        matchScore,
        matchingSkills,
        missingSkills: job.skills.filter((skill) => !userSkills.includes(skill)),
      };
    });

    // Sort by match score and return top results
    const recommendations = scoredJobs
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, limit);

    return NextResponse.json({
      success: true,
      data: recommendations,
    });
  } catch (error) {
    console.error('Get recommendations error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to get recommendations' },
      { status: 500 }
    );
  }
}
