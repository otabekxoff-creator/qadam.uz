import prisma from '@/config/database';
import { NotFoundError } from '@/utils/errors';
import { CreateJobInput, UpdateJobInput, JobQueryInput } from '@/validators/job.validator';
import { JobStatus } from '@prisma/client';

export class JobService {
  async create(userId: string, data: CreateJobInput) {
    const company = await prisma.company.findUnique({
      where: { userId },
    });
    
    if (!company) {
      throw new NotFoundError('Company profile not found');
    }
    
    const job = await prisma.job.create({
      data: {
        title: data.title,
        description: data.description,
        requirements: Array.isArray(data.requirements) ? data.requirements : [data.requirements],
        responsibilities: Array.isArray(data.responsibilities) ? data.responsibilities : [data.responsibilities],
        skills: data.skills || [],
        salaryMin: data.salaryMin?.toString(),
        salaryMax: data.salaryMax?.toString(),
        currency: data.currency,
        location: data.location,
        type: data.type,
        deadline: data.deadline ? new Date(data.deadline) : null,
        company: {
          connect: {
            id: company.id,
          },
        },
      },
      include: {
        company: {
          select: {
            name: true,
            logo: true,
            location: true,
          },
        },
      },
    });
    return job;
  }

  async findAll(query: JobQueryInput) {
    const { page, limit, search, location, type, skills } = query;
    const skip = (page - 1) * limit;

    const where: any = {
      status: JobStatus.ACTIVE,
    };

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (location) {
      where.location = { contains: location, mode: 'insensitive' };
    }

    if (type) {
      where.type = type;
    }

    if (skills) {
      const skillArray = skills.split(',').map(s => s.trim());
      where.skills = { hasEvery: skillArray };
    }

    const [jobs, total] = await Promise.all([
      prisma.job.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          company: {
            select: {
              id: true,
              name: true,
              logo: true,
              location: true,
              industry: true,
            },
          },
          _count: {
            select: { applications: true },
          },
        },
      }),
      prisma.job.count({ where }),
    ]);

    return {
      jobs,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: string) {
    const job = await prisma.job.findUnique({
      where: { id },
      include: {
        company: {
          select: {
            id: true,
            name: true,
            logo: true,
            description: true,
            location: true,
            website: true,
            size: true,
            industry: true,
          },
        },
        applications: {
          select: {
            id: true,
            status: true,
            createdAt: true,
            student: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });

    if (!job) {
      throw new NotFoundError('Job not found');
    }

    return job;
  }

  async update(jobId: string, userId: string, data: UpdateJobInput) {
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
      throw new NotFoundError('Job not found or unauthorized');
    }

    const updated = await prisma.job.update({
      where: { id: jobId },
      data: {
        ...data,
        deadline: data.deadline ? new Date(data.deadline) : undefined,
      },
      include: {
        company: {
          select: {
            name: true,
            logo: true,
          },
        },
      },
    });

    return updated;
  }

  async delete(jobId: string, userId: string) {
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
      throw new NotFoundError('Job not found or unauthorized');
    }

    await prisma.job.delete({ where: { id: jobId } });
    return { message: 'Job deleted successfully' };
  }

  async getCompanyJobs(userId: string, page: number = 1, limit: number = 10) {
    const company = await prisma.company.findUnique({
      where: { userId },
    });
    
    if (!company) {
      throw new NotFoundError('Company profile not found');
    }
    
    const skip = (page - 1) * limit;

    const [jobs, total] = await Promise.all([
      prisma.job.findMany({
        where: { companyId: company.id },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          _count: {
            select: { applications: true },
          },
        },
      }),
      prisma.job.count({ where: { companyId: company.id } }),
    ]);

    return {
      jobs,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}

export const jobService = new JobService();
