import { Response } from 'express';
import prisma from '@/config/database';
import { AuthenticatedRequest } from '@/types';
import asyncHandler from '@/utils/asyncHandler';
import { NotFoundError, ForbiddenError, ValidationError } from '@/utils/errors';

/**
 * @desc    Kompaniya profilini olish
 * @route   GET /api/companies/profile
 * @access  Private (Company)
 */
export const getCompanyProfile = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const company = await prisma.company.findUnique({
    where: { userId: req.user!.userId },
    include: {
      user: {
        select: { email: true, createdAt: true }
      },
      _count: {
        select: { jobs: true }
      }
    }
  });

  if (!company) {
    throw new NotFoundError('Kompaniya profili topilmadi');
  }

  res.json({
    success: true,
    data: company,
  });
});

/**
 * @desc    Kompaniya profilini yangilash
 * @route   PUT /api/companies/profile
 * @access  Private (Company)
 */
export const updateCompanyProfile = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { name, description, industry, website, location, size } = req.body;

  const company = await prisma.company.findUnique({
    where: { userId: req.user!.userId }
  });

  if (!company) {
    throw new NotFoundError('Kompaniya profili topilmadi');
  }

  const updatedCompany = await prisma.company.update({
    where: { userId: req.user!.userId },
    data: {
      name: name?.trim(),
      description: description?.trim(),
      industry: industry?.trim(),
      website: website?.trim(),
      location: location?.trim(),
      size: size,
    },
    include: {
      user: {
        select: { email: true }
      }
    }
  });

  res.json({
    success: true,
    data: updatedCompany,
    message: 'Profil muvaffaqiyatli yangilandi',
  });
});

/**
 * @desc    Kompaniya vakansiyalarini olish
 * @route   GET /api/companies/jobs
 * @access  Private (Company)
 */
export const getCompanyJobs = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { page = 1, limit = 10, status } = req.query;
  const skip = (Number(page) - 1) * Number(limit);

  const company = await prisma.company.findUnique({
    where: { userId: req.user!.userId }
  });

  if (!company) {
    throw new NotFoundError('Kompaniya profili topilmadi');
  }

  const whereClause: any = { companyId: company.id };
  if (status) {
    whereClause.status = String(status);
  }

  const [jobs, total] = await Promise.all([
    prisma.job.findMany({
      where: whereClause,
      include: {
        _count: {
          select: { applications: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: Number(limit),
    }),
    prisma.job.count({ where: whereClause }),
  ]);

  res.json({
    success: true,
    data: jobs,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / Number(limit)),
    },
  });
});

/**
 * @desc    Vakansiya uchun kelgan arizalarni olish
 * @route   GET /api/companies/jobs/:jobId/applications
 * @access  Private (Company)
 */
export const getJobApplications = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { jobId } = req.params;
  const { page = 1, limit = 10, status } = req.query;
  const skip = (Number(page) - 1) * Number(limit);

  const company = await prisma.company.findUnique({
    where: { userId: req.user!.userId }
  });

  if (!company) {
    throw new NotFoundError('Kompaniya profili topilmadi');
  }

  // Vakansiya shu kompaniyaga tegishli ekanligini tekshirish
  const job = await prisma.job.findUnique({
    where: { id: jobId }
  });

  if (!job) {
    throw new NotFoundError('Vakansiya topilmadi');
  }

  if (job.companyId !== company.id) {
    throw new ForbiddenError('Bu vakansiyaga arizalarni ko\'rish huquqingiz yo\'q');
  }

  const whereClause: any = { jobId };
  if (status) {
    whereClause.status = String(status);
  }

  const [applications, total] = await Promise.all([
    prisma.jobApplication.findMany({
      where: whereClause,
      include: {
        student: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            university: true,
            major: true,
            gpa: true,
            avatar: true,
            skills: true,
            phone: true,
            about: true,
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: Number(limit),
    }),
    prisma.jobApplication.count({ where: whereClause }),
  ]);

  res.json({
    success: true,
    data: applications,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / Number(limit)),
    },
  });
});

/**
 * @desc    Ariza holatini o'zgartirish
 * @route   PATCH /api/companies/applications/:id/status
 * @access  Private (Company)
 */
export const updateApplicationStatus = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const { status, feedback } = req.body;

  const company = await prisma.company.findUnique({
    where: { userId: req.user!.userId }
  });

  if (!company) {
    throw new NotFoundError('Kompaniya profili topilmadi');
  }

  const application = await prisma.jobApplication.findUnique({
    where: { id },
    include: { job: true }
  });

  if (!application) {
    throw new NotFoundError('Ariza topilmadi');
  }

  // Ariza shu kompaniyaga tegishli ekanligini tekshirish
  if (application.job.companyId !== company.id) {
    throw new ForbiddenError('Bu arizani o\'zgartirish huquqingiz yo\'q');
  }

  if (!['REVIEWING', 'ACCEPTED', 'REJECTED'].includes(status)) {
    throw new ValidationError('Status noto\'g\'ri');
  }

  const updatedApplication = await prisma.jobApplication.update({
    where: { id },
    data: { status },
  });

  res.json({
    success: true,
    data: updatedApplication,
    message: 'Ariza holati yangilandi',
  });
});

/**
 * @desc    Kompaniya dashboard statistikasi
 * @route   GET /api/companies/dashboard
 * @access  Private (Company)
 */
export const getCompanyDashboard = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const company = await prisma.company.findUnique({
    where: { userId: req.user!.userId }
  });

  if (!company) {
    throw new NotFoundError('Kompaniya profili topilmadi');
  }

  // Parallel ravishda statistikalarni olish
  const [
    totalJobs,
    activeJobs,
    totalApplications,
    pendingApplications,
    acceptedApplications,
    recentApplications
  ] = await Promise.all([
    prisma.job.count({ where: { companyId: company.id } }),
    prisma.job.count({ where: { companyId: company.id, status: 'ACTIVE' } }),
    prisma.jobApplication.count({
      where: { job: { companyId: company.id } }
    }),
    prisma.jobApplication.count({
      where: { job: { companyId: company.id }, status: 'PENDING' }
    }),
    prisma.jobApplication.count({
      where: { job: { companyId: company.id }, status: 'ACCEPTED' }
    }),
    prisma.jobApplication.findMany({
      where: { job: { companyId: company.id } },
      include: {
        student: {
          select: { firstName: true, lastName: true, avatar: true, university: true }
        },
        job: { select: { title: true } }
      },
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
  ]);

  res.json({
    success: true,
    data: {
      stats: {
        jobs: {
          total: totalJobs,
          active: activeJobs,
        },
        applications: {
          total: totalApplications,
          pending: pendingApplications,
          accepted: acceptedApplications,
        },
      },
      recentApplications,
    },
  });
});

/**
 * @desc    Kompaniya ro'yxatini olish (ochiq)
 * @route   GET /api/companies
 * @access  Public
 */
export const getCompanies = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { page = 1, limit = 10, industry, search } = req.query;
  const skip = (Number(page) - 1) * Number(limit);

  const whereClause: any = {};
  
  if (industry) {
    whereClause.industry = String(industry);
  }
  
  if (search) {
    whereClause.OR = [
      { name: { contains: String(search), mode: 'insensitive' } },
      { description: { contains: String(search), mode: 'insensitive' } },
    ];
  }

  const [companies, total] = await Promise.all([
    prisma.company.findMany({
      where: whereClause,
      select: {
        id: true,
        name: true,
        description: true,
        industry: true,
        location: true,
        logo: true,
        verified: true,
        size: true,
        _count: {
          select: { jobs: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: Number(limit),
    }),
    prisma.company.count({ where: whereClause }),
  ]);

  res.json({
    success: true,
    data: companies,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / Number(limit)),
    },
  });
});

/**
 * @desc    Bitta kompaniyani ko'rish (ochiq)
 * @route   GET /api/companies/:id
 * @access  Public
 */
export const getCompanyById = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;

  const company = await prisma.company.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      description: true,
      industry: true,
      website: true,
      location: true,
      logo: true,
      verified: true,
      size: true,
      createdAt: true,
      _count: {
        select: { jobs: true }
      }
    }
  });

  if (!company) {
    throw new NotFoundError('Kompaniya topilmadi');
  }

  // Kompaniyaning faol vakansiyalarini ham olish
  const activeJobs = await prisma.job.findMany({
    where: { companyId: id, status: 'ACTIVE' },
    select: {
      id: true,
      title: true,
      location: true,
      type: true,
      salaryMin: true,
      salaryMax: true,
      currency: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'desc' },
    take: 5,
  });

  res.json({
    success: true,
    data: {
      ...company,
      activeJobs,
    },
  });
});
