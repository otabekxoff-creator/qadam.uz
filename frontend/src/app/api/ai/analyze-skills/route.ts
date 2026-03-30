import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

// GET /api/ai/analyze-skills - Analyze user skills
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

    const student = await prisma.student.findUnique({
      where: { userId: payload.userId },
      include: {
        skills: true,
        applications: {
          include: {
            job: {
              select: {
                skills: true,
                title: true,
              },
            },
          },
        },
      },
    });

    if (!student) {
      return NextResponse.json(
        { success: false, message: 'Student profile not found' },
        { status: 404 }
      );
    }

    // Get all active jobs
    const jobs = await prisma.job.findMany({
      where: { isActive: true },
      select: {
        skills: true,
        title: true,
      },
    });

    // Calculate skill frequency
    const skillFrequency: Record<string, number> = {};
    jobs.forEach((job) => {
      job.skills.forEach((skill) => {
        skillFrequency[skill] = (skillFrequency[skill] || 0) + 1;
      });
    });

    // Get user's skills
    const userSkills = student.skills.map((s) => s.name);

    // Find trending skills
    const trendingSkills = Object.entries(skillFrequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([skill, count]) => ({
        skill,
        count,
        percentage: Math.round((count / jobs.length) * 100),
      }));

    // Find missing skills
    const missingSkills = trendingSkills
      .filter((t) => !userSkills.includes(t.skill))
      .slice(0, 5)
      .map((t) => ({
        skill: t.skill,
        demand: t.percentage > 30 ? 'High' : t.percentage > 15 ? 'Medium' : 'Low',
        jobCount: t.count,
      }));

    return NextResponse.json({
      success: true,
      data: {
        userSkills,
        trendingSkills,
        missingSkills,
        totalJobsAnalyzed: jobs.length,
      },
    });
  } catch (error) {
    console.error('Analyze skills error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to analyze skills' },
      { status: 500 }
    );
  }
}
