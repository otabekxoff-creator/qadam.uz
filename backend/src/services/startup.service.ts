import prisma from '@/config/database';
import { NotFoundError, ForbiddenError, ValidationError } from '@/utils/errors';
import { StartupStatus } from '@prisma/client';

export class StartupService {
  async create(data: any) {
    // Check if student exists
    const student = await prisma.student.findUnique({
      where: { id: data.studentId }
    });

    if (!student) {
      throw new NotFoundError('Talaba topilmadi');
    }

    // Create startup
    const startup = await prisma.startup.create({
      data: {
        title: data.name,
        description: data.description,
        industry: data.industry,
        stage: data.stage,
        fundingGoal: data.fundingGoal,
        teamSize: data.teamSize,
        website: data.website,
        pitch: data.pitch,
        lookingFor: data.lookingFor,
        timeline: data.timeline,
        studentId: data.studentId,
        founderName: data.founderName,
        founderEmail: data.founderEmail,
        founderUniversity: data.founderUniversity,
        status: StartupStatus.PENDING,
        logo: data.logo || null
      },
      include: {
        student: {
          select: { 
            id: true,
            firstName: true, 
            lastName: true, 
            university: true, 
            avatar: true 
          }
        }
      }
    });

    return startup;
  }

  async findAllApproved(page: number = 1, limit: number = 10, search?: string) {
    const skip = (page - 1) * limit;
    const whereClause: any = { status: StartupStatus.APPROVED };
    
    if (search) {
      whereClause.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [startups, total] = await Promise.all([
      prisma.startup.findMany({
        where: whereClause,
        include: {
          student: {
            select: { 
              id: true,
              firstName: true, 
              lastName: true, 
              university: true, 
              avatar: true 
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.startup.count({ where: whereClause }),
    ]);

    return {
      startups,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: string) {
    const startup = await prisma.startup.findUnique({
      where: { id },
      include: {
        student: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            university: true,
            major: true,
            avatar: true,
            phone: true,
          }
        }
      }
    });

    if (!startup) {
      throw new NotFoundError('Startap topilmadi');
    }

    return startup;
  }

  async create(userId: string, data: { title: string; description: string; goalAmount: number }) {
    const student = await prisma.student.findUnique({ 
      where: { userId } 
    });

    if (!student) {
      throw new NotFoundError('Talaba profili topilmadi');
    }

    const existingStartup = await prisma.startup.findFirst({
      where: { 
        studentId: student.id,
        title: { equals: data.title, mode: 'insensitive' }
      }
    });

    if (existingStartup) {
      throw new ValidationError('Bu sarlavha bilan startap allaqachon mavjud');
    }

    const startup = await prisma.startup.create({
      data: {
        title: data.title.trim(),
        description: data.description.trim(),
        goalAmount: data.goalAmount,
        studentId: student.id,
        status: StartupStatus.PENDING,
      },
      include: {
        student: {
          select: { firstName: true, lastName: true }
        }
      }
    });

    return startup;
  }

  async findByStudent(userId: string) {
    const student = await prisma.student.findUnique({ 
      where: { userId } 
    });

    if (!student) {
      throw new NotFoundError('Talaba profili topilmadi');
    }

    return prisma.startup.findMany({
      where: { studentId: student.id },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: string, userId: string, data: { title?: string; description?: string; goalAmount?: number }) {
    const student = await prisma.student.findUnique({ 
      where: { userId } 
    });

    if (!student) {
      throw new NotFoundError('Talaba profili topilmadi');
    }

    const startup = await prisma.startup.findUnique({ where: { id } });

    if (!startup) {
      throw new NotFoundError('Startap topilmadi');
    }

    if (startup.studentId !== student.id) {
      throw new ForbiddenError('Bu startapni tahrirlash huquqingiz yo\'q');
    }

    if (startup.status !== StartupStatus.PENDING) {
      throw new ValidationError('Faqat ko\'rib chiqilayotgan startaplarni tahrirlash mumkin');
    }

    return prisma.startup.update({
      where: { id },
      data: {
        ...data,
        title: data.title?.trim(),
        description: data.description?.trim(),
      },
    });
  }

  async delete(id: string, userId: string) {
    const student = await prisma.student.findUnique({ 
      where: { userId } 
    });

    if (!student) {
      throw new NotFoundError('Talaba profili topilmadi');
    }

    const startup = await prisma.startup.findUnique({ where: { id } });

    if (!startup) {
      throw new NotFoundError('Startap topilmadi');
    }

    if (startup.studentId !== student.id) {
      throw new ForbiddenError('Bu startapni o\'chirish huquqingiz yo\'q');
    }

    await prisma.startup.delete({ where: { id } });
    return { success: true };
  }

  async findAllForAdmin(page: number = 1, limit: number = 10, status?: StartupStatus) {
    const skip = (page - 1) * limit;
    const where: any = {};
    if (status) where.status = status;

    const [startups, total] = await Promise.all([
      prisma.startup.findMany({
        where,
        include: {
          student: {
            select: { firstName: true, lastName: true, email: true }
          } as any
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.startup.count({ where }),
    ]);

    return {
      startups,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async updateStatus(id: string, status: StartupStatus) {
    const startup = await prisma.startup.findUnique({ where: { id } });
    if (!startup) throw new NotFoundError('Startap topilmadi');

    return prisma.startup.update({
      where: { id },
      data: { status },
    });
  }

  async getStats() {
    const [total, approved, pending, totalGoal] = await Promise.all([
      prisma.startup.count(),
      prisma.startup.count({ where: { status: StartupStatus.APPROVED } }),
      prisma.startup.count({ where: { status: StartupStatus.PENDING } }),
      prisma.startup.aggregate({
        _sum: { goalAmount: true },
        where: { status: StartupStatus.APPROVED }
      }),
    ]);

    return {
      total,
      approved,
      pending,
      totalGoalAmount: totalGoal._sum.goalAmount || 0,
    };
  }
}

export const startupService = new StartupService();
