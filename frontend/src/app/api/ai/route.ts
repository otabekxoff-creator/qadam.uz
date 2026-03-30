/**
 * AI Assistant API Routes
 * Bek AI assistant endpoints
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

// POST /api/ai/ask - Ask Bek a question
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

    const { question, context } = await req.json();
    
    if (!question) {
      return NextResponse.json(
        { success: false, message: 'Question is required' },
        { status: 400 }
      );
    }

    // Generate AI response based on question
    const answer = generateAIResponse(question, context);

    return NextResponse.json({
      success: true,
      data: {
        answer,
        assistant: {
          name: 'Bek',
          avatar: '/ai/bek-avatar.png',
          title: 'Karyera maslahatchisi',
        },
        suggestions: generateSuggestions(question),
        relatedTopics: getRelatedTopics(question),
      },
    });
  } catch (error) {
    console.error('AI ask error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to get AI response' },
      { status: 500 }
    );
  }
}

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

    // Get user profile for personalized recommendations
    const student = await prisma.student.findUnique({
      where: { userId: payload.userId },
      include: {
        user: {
          select: {
            applications: {
              include: {
                job: true,
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

    // Get matching jobs based on skills and major
    const recommendedJobs = await prisma.job.findMany({
      where: {
        isActive: true,
        OR: [
          { skills: { hasSome: student.skills } },
          { title: { contains: student.major || '', mode: 'insensitive' } },
        ],
      },
      include: {
        company: {
          select: { id: true, name: true, logo: true },
        },
      },
      take: 10,
    });

    // Calculate match scores
    const scoredJobs = recommendedJobs.map((job) => ({
      ...job,
      matchScore: calculateMatchScore(job, student),
      matchReasons: generateMatchReasons(job, student),
    }));

    // Sort by match score
    scoredJobs.sort((a, b) => b.matchScore - a.matchScore);

    return NextResponse.json({
      success: true,
      data: scoredJobs,
    });
  } catch (error) {
    console.error('AI recommendations error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to get recommendations' },
      { status: 500 }
    );
  }
}

// Helper functions
function generateAIResponse(question: string, context?: string): string {
  const lowerQuestion = question.toLowerCase();
  
  if (lowerQuestion.includes('rezyume') || lowerQuestion.includes('cv')) {
    return `Rezyume yaratish bo'yicha maslahatlar:\n\n1. **Shaxsiy ma'lumotlar**: Ism, familiya, telefon, email\n2. **Ta'lim**: Universitet, fakultet, kurs, GPA\n3. **Tajriba**: Amaliyot, loyihalar, ish tajribasi\n4. **Ko'nikmalar**: Dasturlash tillari, soft skills\n5. **Sertifikatlar**: Online kurslar, seminarlar\n\nRezyumeni 1-2 sahifada saqlang, muhim ma'lumotlarni ajratib ko'rsating.`;
  }
  
  if (lowerQuestion.includes('intervyu') || lowerQuestion.includes('suhbat')) {
    return `Intervyuga tayyorgarlik:\n\n1. **Kompaniya haqida o'rganing**: Faoliyati, loyihalari\n2. **O'zingizni tanishtiring**: 1-2 daqiqada\n3. **Kuchli tomonlaringizni ayting**: Bilim, tajriba\n4. **Zo'rak savollarga tayyorlaning**: "Kamchiliklaringiz nima?"\n5. **Savollar bering**: Kompaniya kelajagi, jamoa\n\nMuvaffaqiyat tilayman! 🎯`;
  }
  
  return `Salom! Men Bek, sizning karyera maslahatchingiz.\n\nQuyidagi mavzularda yordam bera olaman:\n- Rezyume tayyorlash\n- Intervyu tayyorgarlik\n- Ko'nikmalarni rivojlantirish\n- Ish topish strategiyasi\n- Karyera rejalashtirish\n\nSizni qiziqtirgan savolni yozing, men yordam beraman! 😊`;
}

function generateSuggestions(question: string): string[] {
  return [
    'Rezyume qanday yozish kerak?',
    'Intervyuga qanday tayyorlanish kerak?',
    "Qanday ko'nikmalar o'rganish kerak?",
    'Ish topish uchun nima qilish kerak?',
  ];
}

function getRelatedTopics(question: string): string[] {
  return [
    'Rezyume tayyorlash',
    'Intervyu texnikalari',
    'Networking',
    'Shaxsiy brend',
  ];
}

function calculateMatchScore(job: any, student: any): number {
  let score = 0;
  const matchingSkills = job.skills.filter((skill: string) => student.skills.includes(skill));
  score += (matchingSkills.length / job.skills.length) * 50;
  if (job.title.toLowerCase().includes(student.major?.toLowerCase())) score += 30;
  if (student.course && student.course >= 3) score += 20;
  return Math.min(Math.round(score), 100);
}

function generateMatchReasons(job: any, student: any): string[] {
  const reasons = [];
  const matchingSkills = job.skills.filter((skill: string) => student.skills.includes(skill));
  if (matchingSkills.length > 0) reasons.push(`Sizda ${matchingSkills.join(', ')} ko'nikmalari bor`);
  if (job.title.toLowerCase().includes(student.major?.toLowerCase())) {
    reasons.push(`Sizning yo'nalishingiz (${student.major}) mos keladi`);
  }
  return reasons;
}
