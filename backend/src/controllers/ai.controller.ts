import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { createError } from '../middleware/error.middleware';

// AI Assistant "Bek" - Career Counselor and Helper
export const askBek = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const { question, context } = req.body;

    if (!question) {
      throw createError('Question is required', 400);
    }

    // AI Response Logic - Professional Career Assistant
    const response = generateAIResponse(question, context);

    res.json({
      success: true,
      data: {
        answer: response,
        assistant: {
          name: 'Bek',
          avatar: '/ai/bek-avatar.png',
          title: 'Karyera maslahatchisi',
        },
        suggestions: generateSuggestions(question),
        relatedTopics: getRelatedTopics(question),
      },
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to get AI response',
    });
  }
};

export const getConversationHistory = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const { page = 1, limit = 20 } = req.query;

    // Placeholder - aiConversation model doesn't exist in schema yet
    res.json({
      success: true,
      data: [],
      meta: {
        total: 0,
        page: Number(page),
        limit: Number(limit),
        totalPages: 0,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch conversation history',
    });
  }
};

export const analyzeSkills = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;

    // Get user profile
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        student: true,
        company: true,
      },
    });

    if (!user) {
      throw createError('User not found', 404);
    }

    // AI Skill Analysis
    const skillAnalysis = {
      currentSkills: user.student?.skills || [],
      missingSkills: analyzeMissingSkills(user.student?.skills || []),
      recommendations: generateSkillRecommendations(user.student?.major || ''),
      careerPath: suggestCareerPath(user.student?.major || '', user.student?.skills || []),
      learningResources: getLearningResources(user.student?.major || ''),
    };

    res.json({
      success: true,
      data: skillAnalysis,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to analyze skills',
    });
  }
};

export const getJobRecommendations = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;

    // Get user profile
    const student = await prisma.student.findUnique({
      where: { userId },
    });

    if (!student) {
      throw createError('Student profile not found', 404);
    }

    // Get matching jobs
    const jobs = await prisma.job.findMany({
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

    // AI-powered matching score
    const scoredJobs = jobs.map((job) => ({
      ...job,
      matchScore: calculateMatchScore(job, student),
      reasons: generateMatchReasons(job, student),
    }));

    // Sort by match score
    scoredJobs.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));

    res.json({
      success: true,
      data: scoredJobs,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to get job recommendations',
    });
  }
};

// Helper functions for AI responses
function generateAIResponse(question: string, context?: string): string {
  const lowerQuestion = question.toLowerCase();

  // Resume/CV related
  if (lowerQuestion.includes('rezume') || lowerQuestion.includes('cv') || lowerQuestion.includes('tajriba')) {
    return `Rezyume yaratish bo'yicha maslahatlar:

1. **Shaxsiy ma'lumotlar**: Ism, familiya, telefon, email
2. **Ta'lim**: Universitet, fakultet, kurs, GPA
3. **Tajriba**: Amaliyot, loyihalar, ish tajribasi
4. **Ko'nikmalar**: Dasturlash tillari, soft skills
5. **Sertifikatlar**: Online kurslar, seminarlar

Rezyumeni 1-2 sahifada saqlang, muhim ma'lumotlarni ajratib ko'rsating.`;
  }

  // Interview related
  if (lowerQuestion.includes('intervyu') || lowerQuestion.includes('suhbat')) {
    return `Intervyuga tayyorgarlik:

1. **Kompaniya haqida o'rganing**: Faoliyati, loyihalari
2. **O'zingizni tanishtiring**: 1-2 daqiqada
3. **Kuchli tomonlaringizni ayting**: Bilim, tajriba
4. **Zo'rak savollarga tayyorlaning**: "Kamchiliklaringiz nima?"
5. **Savollar bering**: Kompaniya kelajagi, jamoa

Muvaffaqiyat tilayman! 🎯`;
  }

  // Skills related
  if (lowerQuestion.includes('skill') || lowerQuestion.includes('ko\'nikma') || lowerQuestion.includes('bilim')) {
    return `Zamonaviy ko'nikmalar:

**Texnik ko'nikmalar:**
- Dasturlash (JavaScript, Python, Java)
- Ma'lumotlar bazasi (SQL, PostgreSQL)
- Bulutli texnologiyalar (AWS, Azure)
- AI/ML asoslari

**Soft skills:**
- Jamoada ishlash
- Muammolarni yechish
- Kommunikatsiya
- Time management

Qaysi sohada o'sishni xohlaysiz?`;
  }

  // Job search related
  if (lowerQuestion.includes('ish') || lowerQuestion.includes('job') || lowerQuestion.includes('topish')) {
    return `Ish topish strategiyasi:

1. **Profil yaratish**: LinkedIn, GitHub, Step.uz
2. **Portfolio**: 3-5 ta loyiha
3. **Networking**: Uchrashuvlar, meetup'lar
4. **Arizalar**: Har kuni 5-10 ta ariza
5. **Intervyu**: Muntazam mashq qilish

Step.uz platformasidan foydalaning - 500+ kompaniya sizni kutmoqda!`;
  }

  // Default response
  return `Salom! Men Bek, sizning karyera maslahatchingiz. 

Quyidagi mavzularda yordam bera olaman:
- Rezyume tayyorlash
- Intervyu tayyorgarlik
- Ko'nikmalarni rivojlantirish
- Ish topish strategiyasi
- Karyera rejalashtirish

Sizni qiziqtirgan savolni yozing, men yordam beraman! 😊`;
}

function generateSuggestions(question: string): string[] {
  const suggestions = [
    'Rezyume qanday yozish kerak?',
    'Intervyuga qanday tayyorlanish kerak?',
    'Qanday ko\'nikmalar o\'rganish kerak?',
    'Ish topish uchun nima qilish kerak?',
    'Karyerani qanday rejalashtirish kerak?',
  ];
  return suggestions;
}

function getRelatedTopics(question: string): string[] {
  return [
    'Rezyume tayyorlash',
    'Intervyu texnikalari',
    'Networking',
    'Shaxsiy brend',
    'Karyera o\'sishi',
  ];
}

function analyzeMissingSkills(skills: string[]): string[] {
  const modernSkills = ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Git', 'Docker', 'AWS'];
  return modernSkills.filter((skill) => !skills.includes(skill));
}

function generateSkillRecommendations(major: string): string[] {
  const recommendations: Record<string, string[]> = {
    'Computer Science': ['Data Structures', 'Algorithms', 'System Design', 'Cloud Computing'],
    'Software Engineering': ['Agile Methodologies', 'CI/CD', 'Testing', 'Microservices'],
    'Data Science': ['Machine Learning', 'Statistics', 'Python', 'SQL', 'Data Visualization'],
    'default': ['Communication', 'Problem Solving', 'Project Management', 'Leadership'],
  };
  return recommendations[major] || recommendations['default'];
}

function suggestCareerPath(major: string, skills: string[]): string {
  const paths: Record<string, string> = {
    'Computer Science': 'Software Developer → Senior Developer → Tech Lead → Engineering Manager',
    'Software Engineering': 'Junior Developer → Full-stack Developer → Senior Developer → Architect',
    'Data Science': 'Data Analyst → Data Scientist → Senior Data Scientist → Chief Data Officer',
  };
  return paths[major] || 'Junior → Middle → Senior → Lead → Manager';
}

function getLearningResources(major: string): Array<{ title: string; url: string; type: string }> {
  return [
    { title: 'Coursera - Professional Certificates', url: 'https://coursera.org', type: 'course' },
    { title: 'freeCodeCamp', url: 'https://freecodecamp.org', type: 'practice' },
    { title: 'Udemy - Programming Courses', url: 'https://udemy.com', type: 'course' },
    { title: 'LeetCode - Coding Practice', url: 'https://leetcode.com', type: 'practice' },
  ];
}

function calculateMatchScore(job: any, student: any): number {
  let score = 0;
  
  // Skills match
  const matchingSkills = job.skills.filter((skill: string) => 
    student.skills.includes(skill)
  );
  score += (matchingSkills.length / job.skills.length) * 50;
  
  // Major relevance
  if (job.title.toLowerCase().includes(student.major?.toLowerCase())) {
    score += 30;
  }
  
  // Experience level
  if (student.course && student.course >= 3) {
    score += 20;
  }
  
  return Math.min(Math.round(score), 100);
}

function generateMatchReasons(job: any, student: any): string[] {
  const reasons = [];
  
  const matchingSkills = job.skills.filter((skill: string) => 
    student.skills.includes(skill)
  );
  
  if (matchingSkills.length > 0) {
    reasons.push(`Sizda ${matchingSkills.join(', ')} ko'nikmalari bor`);
  }
  
  if (job.title.toLowerCase().includes(student.major?.toLowerCase())) {
    reasons.push(`Sizning yo'nalishingiz (${student.major}) mos keladi`);
  }
  
  return reasons;
}
