import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const aiService = {
  // Analyze user skills and provide recommendations
  async analyzeSkills(userId: string) {
    const student = await prisma.student.findUnique({
      where: { userId },
      include: {
        skills: true,
        applications: {
          include: {
            job: true,
          },
        },
      },
    });

    if (!student) {
      throw new Error('Student not found');
    }

    // Get all jobs to analyze skill gaps
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

    // Find skill gaps
    const trendingSkills = Object.entries(skillFrequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([skill]) => skill);

    const missingSkills = trendingSkills.filter(
      (skill) => !userSkills.includes(skill)
    );

    // Generate recommendations
    const recommendations = missingSkills.slice(0, 5).map((skill) => ({
      skill,
      reason: `High demand in ${skillFrequency[skill]} jobs`,
      priority: skillFrequency[skill] > 10 ? 'High' : 'Medium',
    }));

    return {
      userSkills,
      trendingSkills,
      missingSkills,
      recommendations,
    };
  },

  // Get job recommendations for user
  async getJobRecommendations(userId: string, limit: number = 10) {
    const student = await prisma.student.findUnique({
      where: { userId },
      include: {
        skills: true,
        applications: {
          select: {
            jobId: true,
          },
        },
      },
    });

    if (!student) {
      throw new Error('Student not found');
    }

    const userSkills = student.skills.map((s) => s.name);
    const appliedJobIds = student.applications.map((a) => a.jobId);

    // Find matching jobs
    const jobs = await prisma.job.findMany({
      where: {
        isActive: true,
        id: {
          notIn: appliedJobIds,
        },
        skills: {
          hasSome: userSkills,
        },
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
      take: limit * 2, // Get more to filter
    });

    // Calculate match scores
    const scoredJobs = jobs.map((job) => {
      const matchingSkills = job.skills.filter((skill) =>
        userSkills.includes(skill)
      );
      const matchScore = (matchingSkills.length / job.skills.length) * 100;

      return {
        ...job,
        matchScore: Math.round(matchScore),
        matchingSkills,
        missingSkills: job.skills.filter(
          (skill) => !userSkills.includes(skill)
        ),
      };
    });

    // Sort by match score and return top results
    return scoredJobs
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, limit);
  },

  // Generate AI response for chat
  async generateAIResponse(question: string, context?: string) {
    const lowerQuestion = question.toLowerCase();

    // Predefined responses for common questions
    const responses: Record<string, string> = {
      'rezyume': `Rezyume yaratish bo'yicha maslahatlar:

1. Shaxsiy ma'lumotlar: Ism, familiya, telefon, email
2. Ta'lim: Universitet, fakultet, kurs, GPA
3. Tajriba: Amaliyot, loyihalar, ish tajribasi
4. Ko'nikmalar: Dasturlash tillari, soft skills
5. Sertifikatlar: Online kurslar, seminarlar

Rezyumeni 1-2 sahifada saqlang, muhim ma'lumotlarni ajratib ko'rsating.`,

      'intervyu': `Intervyuga tayyorgarlik:

1. Kompaniya haqida o'rganing: Faoliyati, loyihalari
2. O'zingizni tanishtiring: 1-2 daqiqada
3. Kuchli tomonlaringizni ayting: Bilim, tajriba
4. Zo'rak savollarga tayyorlaning: "Kamchiliklaringiz nima?"
5. Savollar bering: Kompaniya kelajagi, jamoa

Muvaffaqiyat tilayman! 🎯`,

      'ish': `Ish topish strategiyasi:

1. Profile yarating: To'liq va professional
2. Rezyume yuklang: Sohaga mos
3. Kundalik qidirish: Yangi imkoniyatlarni kuzatib boring
4. Networking: LinkedIn va professional tadbirlarda qatnashing
5. Ariza yozish: Har bir vakansiyaga mos ariza

Step.uz da 10,000+ ish o'rni bor!`,
    };

    // Find matching response
    for (const [key, response] of Object.entries(responses)) {
      if (lowerQuestion.includes(key)) {
        return response;
      }
    }

    // Default response
    return `Salom! Men Bek, sizning karyera maslahatchingiz.

Quyidagi mavzularda yordam bera olaman:
- Rezyume tayyorlash
- Intervyu tayyorgarlik
- Ko'nikmalarni rivojlantirish
- Ish topish strategiyasi
- Karyera rejalashtirish

Sizni qiziqtirgan savolni yozing! 😊`;
  },
};
