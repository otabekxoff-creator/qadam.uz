import prisma from '@/config/database';
import { NotFoundError, ConflictError, ForbiddenError } from '@/utils/errors';
import { ApplicationStatus } from '@prisma/client';

export class ApplicationService {
  async create(studentId: string, jobId: string, coverLetter?: string) {
    const job = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      throw new NotFoundError('Ish topilmadi');
    }

    if (job.status !== 'ACTIVE') {
      throw new ForbiddenError('Bu ish o\'rni uchun ariza qabul qilinmayapti');
    }

    if (job.deadline && new Date(job.deadline) < new Date()) {
      throw new ForbiddenError('Ariza topshirish muddati tugagan');
    }

    const existing = await prisma.application.findUnique({
      where: {
        jobId_studentId: {
          jobId,
          studentId,
        },
      },
    });

    if (existing) {
      throw new ConflictError('Siz allaqachon bu ish o\'rni uchun ariza topshirgansiz');
    }

    const application = await prisma.application.create({
      data: {
        jobId,
        studentId,
        coverLetter,
        status: ApplicationStatus.PENDING,
      },
      include: {
        job: {
          select: {
            title: true,
            company: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    return application;
  }

  async getStudentApplications(userId: string) {
    const student = await prisma.student.findUnique({
      where: { userId },
    });
    
    if (!student) {
      throw new NotFoundError('Student profile not found');
    }
    
    const applications = await prisma.application.findMany({
      where: { studentId: student.id },
      orderBy: { createdAt: 'desc' },
      include: {
        job: {
          select: {
            id: true,
            title: true,
            location: true,
            type: true,
            company: {
              select: {
                name: true,
                logo: true,
              },
            },
          },
        },
      },
    });

    return applications;
  }

  async getJobApplications(jobId: string, userId: string, page: number = 1, limit: number = 10) {
    const company = await prisma.company.findUnique({
      where: { userId },
    });
    
    if (!company) {
      throw new NotFoundError('Company profile not found');
    }
    
    const job = await prisma.job.findFirst({
      where: { id: jobId, companyId: company.id },
    });

    if (!job) {
      throw new NotFoundError('Ish topilmadi');
    }

    const skip = (page - 1) * limit;

    const [applications, total] = await Promise.all([
      prisma.application.findMany({
        where: { jobId },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          student: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              university: true,
              major: true,
              avatar: true,
              resume: true,
              user: {
                select: {
                  email: true,
                }
              }
            },
          },
        },
      }),
      prisma.application.count({ where: { jobId } })
    ]);

    return {
      applications,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      }
    };
  }

  async updateStatus(
    applicationId: string, 
    userId: string, 
    status: ApplicationStatus
  ) {
    const company = await prisma.company.findUnique({
      where: { userId },
    });
    
    if (!company) {
      throw new NotFoundError('Company profile not found');
    }
    
    const application = await prisma.application.findFirst({
      where: {
        id: applicationId,
        job: {
          companyId: company.id,
        },
      },
    });

    if (!application) {
      throw new NotFoundError('Ariza topilmadi');
    }

    const updated = await prisma.application.update({
      where: { id: applicationId },
      data: { status },
      include: {
        student: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        job: {
          select: {
            title: true,
          },
        },
      },
    });

    return updated;
  }
}

export const applicationService = new ApplicationService();
