import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { createError } from '../middleware/error.middleware';

export const getJobs = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, search, type, location } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where: any = { isActive: true };
    
    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } },
      ];
    }
    
    if (type) where.type = type;
    if (location) where.location = { contains: location as string, mode: 'insensitive' };

    const [jobs, total] = await Promise.all([
      prisma.job.findMany({
        where,
        include: {
          company: {
            select: { id: true, name: true, logo: true, isVerified: true },
          },
        },
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' },
      }),
      prisma.job.count({ where }),
    ]);

    res.json({
      success: true,
      data: jobs,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch jobs',
    });
  }
};

export const getJobById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const jobId = Array.isArray(id) ? id[0] : id;

    const job = await prisma.job.findUnique({
      where: { id: jobId },
      include: {
        company: {
          select: {
            id: true,
            name: true,
            logo: true,
            description: true,
            website: true,
            isVerified: true,
          },
        },
      },
    });

    if (!job) {
      throw createError('Job not found', 404);
    }

    // Increment views
    await prisma.job.update({
      where: { id: jobId },
      data: { viewsCount: { increment: 1 } },
    });

    res.json({
      success: true,
      data: job,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to fetch job',
    });
  }
};

export const createJob = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const userRole = (req as any).user?.role;

    if (userRole !== 'COMPANY') {
      throw createError('Only companies can create jobs', 403);
    }

    const company = await prisma.company.findUnique({
      where: { userId },
    });

    if (!company) {
      throw createError('Company profile not found', 404);
    }

    const job = await prisma.job.create({
      data: {
        ...req.body,
        companyId: company.id,
      },
      include: {
        company: {
          select: { id: true, name: true, logo: true },
        },
      },
    });

    res.status(201).json({
      success: true,
      message: 'Job created successfully',
      data: job,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to create job',
    });
  }
};

export const updateJob = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user?.id;
    const jobId = Array.isArray(id) ? id[0] : id;

    const job = await prisma.job.findFirst({
      where: { id: jobId },
      include: { company: { select: { userId: true } } },
    });

    if (!job) {
      throw createError('Job not found', 404);
    }

    if (job.company?.userId !== userId) {
      throw createError('Not authorized to update this job', 403);
    }

    const updatedJob = await prisma.job.update({
      where: { id: jobId },
      data: req.body,
      include: {
        company: {
          select: { id: true, name: true, logo: true },
        },
      },
    });

    res.json({
      success: true,
      message: 'Job updated successfully',
      data: updatedJob,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to update job',
    });
  }
};

export const deleteJob = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user?.id;
    const jobId = Array.isArray(id) ? id[0] : id;

    const job = await prisma.job.findFirst({
      where: { id: jobId },
      include: { company: { select: { userId: true } } },
    });

    if (!job) {
      throw createError('Job not found', 404);
    }

    if (job.company?.userId !== userId) {
      throw createError('Not authorized to delete this job', 403);
    }

    await prisma.job.delete({ where: { id: jobId } });

    res.json({
      success: true,
      message: 'Job deleted successfully',
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to delete job',
    });
  }
};
