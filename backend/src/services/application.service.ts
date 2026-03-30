import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const applicationService = {
  // Apply for a job
  async applyForJob(userId: string, jobId: string, data: any) {
    // Check if already applied
    const existingApplication = await prisma.application.findFirst({
      where: {
        userId,
        jobId,
      },
    });

    if (existingApplication) {
      throw new Error('Already applied for this job');
    }

    // Create application
    const application = await prisma.application.create({
      data: {
        userId,
        jobId,
        coverLetter: data.coverLetter,
        resume: data.resume,
        expectedSalary: data.expectedSalary,
        availableFrom: data.availableFrom ? new Date(data.availableFrom) : null,
        status: 'PENDING',
      },
      include: {
        job: {
          include: {
            company: true,
          },
        },
      },
    });

    return application;
  },

  // Get user's applications
  async getUserApplications(userId: string, options: any = {}) {
    const { page = 1, limit = 10, status } = options;
    const skip = (page - 1) * limit;

    const where: any = { userId };
    if (status) where.status = status;

    const [applications, total] = await Promise.all([
      prisma.application.findMany({
        where,
        include: {
          job: {
            include: {
              company: {
                select: {
                  id: true,
                  name: true,
                  logo: true,
                },
              },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.application.count({ where }),
    ]);

    return { applications, total, totalPages: Math.ceil(total / limit) };
  },

  // Get company applications
  async getCompanyApplications(companyId: string, options: any = {}) {
    const { page = 1, limit = 10, status } = options;
    const skip = (page - 1) * limit;

    const where: any = {
      job: {
        companyId,
      },
    };
    if (status) where.status = status;

    const [applications, total] = await Promise.all([
      prisma.application.findMany({
        where,
        include: {
          user: {
            include: {
              student: {
                include: {
                  skills: true,
                },
              },
            },
          },
          job: {
            select: {
              id: true,
              title: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.application.count({ where }),
    ]);

    return { applications, total, totalPages: Math.ceil(total / limit) };
  },

  // Update application status
  async updateStatus(applicationId: string, companyUserId: string, status: string, notes?: string) {
    // Verify company owns this application
    const application = await prisma.application.findFirst({
      where: {
        id: applicationId,
        job: {
          company: {
            userId: companyUserId,
          },
        },
      },
    });

    if (!application) {
      throw new Error('Application not found or not authorized');
    }

    return await prisma.application.update({
      where: { id: applicationId },
      data: {
        status,
        notes: notes || application.notes,
      },
    });
  },

  // Withdraw application
  async withdrawApplication(applicationId: string, userId: string) {
    const application = await prisma.application.findFirst({
      where: {
        id: applicationId,
        userId,
      },
    });

    if (!application) {
      throw new Error('Application not found');
    }

    if (application.status === 'HIRED' || application.status === 'REJECTED') {
      throw new Error('Cannot withdraw this application');
    }

    return await prisma.application.update({
      where: { id: applicationId },
      data: { status: 'WITHDRAWN' },
    });
  },

  // Get application by ID
  async getApplicationById(applicationId: string, userId: string, userRole: string) {
    const where: any = { id: applicationId };

    if (userRole !== 'ADMIN') {
      where.OR = [
        { userId },
        {
          job: {
            company: {
              userId,
            },
          },
        },
      ];
    }

    return await prisma.application.findFirst({
      where,
      include: {
        user: {
          include: {
            student: {
              include: {
                skills: true,
                experience: true,
                projects: true,
              },
            },
          },
        },
        job: {
          include: {
            company: {
              select: {
                id: true,
                name: true,
                logo: true,
                email: true,
              },
            },
          },
        },
      },
    });
  },
};
