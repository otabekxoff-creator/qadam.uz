import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { createError } from '../middleware/error.middleware';

export const getCompanies = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 12, search, industry, location } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where: any = {};
    
    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } },
      ];
    }
    
    if (industry) where.industry = industry;
    if (location) where.location = { contains: location as string, mode: 'insensitive' };

    const [companies, total] = await Promise.all([
      prisma.company.findMany({
        where,
        select: {
          id: true,
          name: true,
          logo: true,
          description: true,
          industry: true,
          location: true,
          website: true,
          isVerified: true,
          _count: {
            select: { jobs: true },
          },
        },
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' },
      }),
      prisma.company.count({ where }),
    ]);

    res.json({
      success: true,
      data: companies,
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
      message: error.message || 'Failed to fetch companies',
    });
  }
};

export const getCompanyById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const companyId = Array.isArray(id) ? id[0] : id;

    const company = await prisma.company.findUnique({
      where: { id: companyId },
      include: {
        jobs: {
          where: { isActive: true },
          orderBy: { createdAt: 'desc' },
        },
        _count: {
          select: { jobs: true },
        },
      },
    });

    if (!company) {
      throw createError('Company not found', 404);
    }

    res.json({
      success: true,
      data: company,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to fetch company',
    });
  }
};

export const getCompanyStats = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;

    const company = await prisma.company.findUnique({
      where: { userId },
      include: {
        jobs: {
          include: {
            applications: true,
          },
        },
      },
    });

    if (!company) {
      throw createError('Company not found', 404);
    }

    const stats = {
      totalJobs: company.jobs.length,
      activeJobs: company.jobs.filter((j: any) => j.isActive).length,
      totalApplications: company.jobs.reduce((acc: number, job: any) => acc + job.applications.length, 0),
      pendingApplications: company.jobs.reduce(
        (acc: number, job: any) => acc + job.applications.filter((a: any) => a.status === 'PENDING').length,
        0
      ),
      totalViews: company.jobs.reduce((acc: number, job: any) => acc + job.viewsCount, 0),
    };

    res.json({
      success: true,
      data: stats,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to fetch company stats',
    });
  }
};
