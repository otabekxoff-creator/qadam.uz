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
        name: data.name, // Required field
        title: data.name, // Optional field, can be same as name
        description: data.description,
        stage: data.stage,
        fundingGoal: data.fundingGoal,
        teamSize: data.teamSize,
        website: data.website,
        pitch: data.pitch,
        lookingFor: data.lookingFor,
        timeline: data.timeline,
        founderName: data.founderName,
        founderEmail: data.founderEmail,
        founderUniversity: data.founderUniversity,
        status: StartupStatus.PENDING,
        logo: data.logo || null,
        student: {
          connect: {
            id: data.studentId
          }
        }
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
      prisma.startup.count({ where: whereClause })
    ]);

    return {
      startups,
      meta: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
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
            avatar: true 
          }
        }
      }
    });

    if (!startup) {
      throw new NotFoundError('Startap topilmadi');
    }

    return startup;
  }

  async findByStudent(userId: string) {
    const student = await prisma.student.findUnique({ 
      where: { userId } 
    });

    if (!student) {
      throw new NotFoundError('Talaba profili topilmadi');
    }

    const startups = await prisma.startup.findMany({
      where: { studentId: student.id },
      include: {
        student: {
          select: { firstName: true, lastName: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return startups;
  }

  async update(id: string, userId: string, data: any) {
    const student = await prisma.student.findUnique({ 
      where: { userId } 
    });

    if (!student) {
      throw new NotFoundError('Talaba profili topilmadi');
    }

    const startup = await prisma.startup.findFirst({
      where: { id, studentId: student.id }
    });

    if (!startup) {
      throw new NotFoundError('Startap topilmadi');
    }

    const updatedStartup = await prisma.startup.update({
      where: { id },
      data,
      include: {
        student: {
          select: { firstName: true, lastName: true }
        }
      }
    });

    return updatedStartup;
  }

  async delete(id: string, userId: string) {
    const student = await prisma.student.findUnique({ 
      where: { userId } 
    });

    if (!student) {
      throw new NotFoundError('Talaba profili topilmadi');
    }

    const startup = await prisma.startup.findFirst({
      where: { id, studentId: student.id }
    });

    if (!startup) {
      throw new NotFoundError('Startap topilmadi');
    }

    await prisma.startup.delete({
      where: { id }
    });
  }

  async findAllForAdmin(page: number = 1, limit: number = 10, status?: StartupStatus) {
    const skip = (page - 1) * limit;
    const whereClause: any = status ? { status } : {};

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
              email: true 
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.startup.count({ where: whereClause })
    ]);

    return {
      startups,
      meta: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  async updateStatus(id: string, status: StartupStatus) {
    const startup = await prisma.startup.findUnique({
      where: { id }
    });

    if (!startup) {
      throw new NotFoundError('Startap topilmadi');
    }

    const updatedStartup = await prisma.startup.update({
      where: { id },
      data: { status },
      include: {
        student: {
          select: { firstName: true, lastName: true, email: true }
        }
      }
    });

    return updatedStartup;
  }

  async getStats() {
    const [total, pending, approved, rejected] = await Promise.all([
      prisma.startup.count(),
      prisma.startup.count({ where: { status: StartupStatus.PENDING } }),
      prisma.startup.count({ where: { status: StartupStatus.APPROVED } }),
      prisma.startup.count({ where: { status: StartupStatus.REJECTED } })
    ]);

    return {
      total,
      pending,
      approved,
      rejected
    };
  }
}

export const startupService = new StartupService();
