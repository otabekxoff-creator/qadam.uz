import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

// Types
interface CompanyFilters {
  search?: string;
  industry?: string;
  size?: string;
  location?: string;
  isVerified?: boolean;
  page?: number;
  limit?: number;
  sortBy?: 'name' | 'createdAt' | 'jobs';
  sortOrder?: 'asc' | 'desc';
  hasJobs?: boolean;
  minJobs?: number;
  maxJobs?: number;
}

interface CompanyUpdateData {
  name?: string;
  description?: string;
  logo?: string;
  website?: string;
  industry?: string;
  size?: string;
  location?: string;
  foundedYear?: number;
  email?: string;
  phone?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  benefits?: string[];
  culture?: string;
  mission?: string;
  vision?: string;
}

interface CompanyReviewData {
  rating: number;
  title: string;
  content: string;
  pros?: string;
  cons?: string;
  employmentStatus?: 'CURRENT' | 'FORMER';
  position?: string;
  duration?: string;
}

export const companyService = {
  // Get all companies with comprehensive filters
  async getCompanies(filters: CompanyFilters = {}) {
    const where: Prisma.CompanyWhereInput = {};
    
    // Search filter
    if (filters.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
        { industry: { contains: filters.search, mode: 'insensitive' } },
      ];
    }
    
    // Industry filter
    if (filters.industry) {
      where.industry = filters.industry;
    }
    
    // Size filter
    if (filters.size) {
      where.companySize = filters.size;
    }
    
    // Location filter
    if (filters.location) {
      where.location = { contains: filters.location, mode: 'insensitive' };
    }
    
    // Verification filter
    if (filters.isVerified !== undefined) {
      where.isVerified = filters.isVerified;
    }

    // Jobs count filter
    if (filters.hasJobs) {
      where.jobs = { some: {} };
    }

    // Pagination
    const page = Math.max(1, filters.page || 1);
    const limit = Math.min(50, Math.max(1, filters.limit || 10));
    const skip = (page - 1) * limit;

    // Sort order
    const orderBy: Prisma.CompanyOrderByWithRelationInput = {};
    if (filters.sortBy === 'jobs') {
      orderBy.jobs = { _count: filters.sortOrder || 'desc' };
    } else {
      orderBy[filters.sortBy || 'createdAt'] = filters.sortOrder || 'desc';
    }
    
    const [companies, total] = await Promise.all([
      prisma.company.findMany({
        where,
        select: {
          id: true,
          name: true,
          description: true,
          logo: true,
          website: true,
          industry: true,
          companySize: true,
          location: true,
          isVerified: true,
          createdAt: true,
          updatedAt: true,
          _count: {
            select: { 
              jobs: { where: { isActive: true } },
            },
          },
          jobs: {
            where: { isActive: true },
            orderBy: { createdAt: 'desc' },
            take: 3,
            select: {
              id: true,
              title: true,
              type: true,
              salaryMin: true,
              salaryMax: true,
              createdAt: true,
            },
          },
        },
        skip,
        take: limit,
        orderBy,
      }),
      prisma.company.count({ where }),
    ]);
    
    return { 
      companies, 
      total,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasMore: skip + companies.length < total,
      }
    };
  },

  // Get company by ID with full details
  async getCompanyById(id: string, userId?: string) {
    const company = await prisma.company.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            createdAt: true,
          },
        },
        jobs: {
          where: { isActive: true },
          orderBy: { createdAt: 'desc' },
          include: {
            _count: {
              select: { applications: true },
            },
          },
        },
        _count: {
          select: { 
            jobs: true,
          },
        },
      },
    });

    if (!company) {
      throw new Error('Company not found');
    }

    return {
      ...company,
      stats: {
        totalJobs: company._count.jobs,
      },
    };
  },

  // Get company by slug - not supported in current schema, use ID instead
  async getCompanyBySlug(slug: string) {
    // Slug field not in schema, search by name instead
    return await prisma.company.findFirst({
      where: { 
        name: { contains: slug.replace(/-/g, ' '), mode: 'insensitive' } 
      },
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
  },

  // Create new company
  async createCompany(data: any, userId: string) {
    // Check if user already has a company
    const existingCompany = await prisma.company.findFirst({
      where: { userId },
    });

    if (existingCompany) {
      throw new Error('User already has a company profile');
    }

    return await prisma.company.create({
      data: {
        ...data,
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });
  },

  // Update company
  async updateCompany(id: string, data: CompanyUpdateData, userId: string) {
    // Verify ownership
    const company = await prisma.company.findFirst({
      where: {
        id,
        userId,
      },
    });
    
    if (!company) {
      throw new Error('Company not found or not authorized');
    }
    
    return await prisma.company.update({
      where: { id },
      data,
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });
  },

  // Delete company
  async deleteCompany(id: string, userId: string) {
    // Verify ownership
    const company = await prisma.company.findFirst({
      where: {
        id,
        userId,
      },
    });
    
    if (!company) {
      throw new Error('Company not found or not authorized');
    }

    // Check for active jobs
    const activeJobs = await prisma.job.count({
      where: {
        companyId: id,
        isActive: true,
      },
    });

    if (activeJobs > 0) {
      throw new Error('Cannot delete company with active jobs');
    }

    return await prisma.company.delete({
      where: { id },
    });
  },

  // Get company jobs with filters
  async getCompanyJobs(companyId: string, filters: any = {}) {
    const where: Prisma.JobWhereInput = { companyId };
    
    if (filters.isActive !== undefined) {
      where.isActive = filters.isActive;
    }

    if (filters.type) {
      where.type = filters.type;
    }

    if (filters.search) {
      where.OR = [
        { title: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    if (filters.salaryMin) {
      where.salaryMax = { gte: filters.salaryMin };
    }

    if (filters.salaryMax) {
      where.salaryMin = { lte: filters.salaryMax };
    }
    
    const page = Math.max(1, filters.page || 1);
    const limit = Math.min(50, Math.max(1, filters.limit || 10));
    const skip = (page - 1) * limit;
    
    const [jobs, total] = await Promise.all([
      prisma.job.findMany({
        where,
        include: {
          _count: {
            select: { applications: true },
          },
          applications: {
            where: { status: 'PENDING' },
            orderBy: { createdAt: 'desc' },
            take: 3,
            include: {
              student: {
                select: {
                  id: true,
                  user: {
                    select: {
                      email: true,
                    },
                  },
                  avatar: true,
                },
              },
            },
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.job.count({ where }),
    ]);
    
    return { 
      jobs, 
      total,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasMore: skip + jobs.length < total,
      }
    };
  },

  // Get comprehensive company statistics
  async getCompanyStats(companyId: string) {
    const [
      totalJobs,
      activeJobs,
      closedJobs,
      totalApplications,
      pendingApplications,
      reviewedApplications,
      acceptedApplications,
      rejectedApplications,
      totalViews,
      monthlyViews,
      totalFollowers,
      totalReviews,
      averageRating,
      jobsByType,
      applicationsByMonth,
    ] = await Promise.all([
      prisma.job.count({ where: { companyId } }),
      prisma.job.count({ where: { companyId, isActive: true } }),
      prisma.job.count({ where: { companyId, isActive: false } }),
      prisma.application.count({
        where: { job: { companyId } },
      }),
      prisma.application.count({
        where: { job: { companyId }, status: 'PENDING' as any },
      }),
      prisma.application.count({
        where: { job: { companyId }, status: 'REVIEWING' as any },
      }),
      prisma.application.count({
        where: { job: { companyId }, status: 'ACCEPTED' as any },
      }),
      prisma.application.count({
        where: { job: { companyId }, status: 'REJECTED' as any },
      }),
      0, // totalViews - views field not in schema
      0, // monthlyViews - views field not in schema
      0, // totalFollowers - followers feature not in schema
      0, // totalReviews - reviews feature not in schema
      0, // averageRating - reviews feature not in schema
      prisma.job.groupBy({
        by: ['type'],
        where: { companyId },
        _count: { id: true },
      }),
      prisma.$queryRaw`
        SELECT DATE_TRUNC('month', created_at) as month, COUNT(*) as count
        FROM applications
        WHERE job_id IN (SELECT id FROM jobs WHERE company_id = ${companyId})
        AND created_at >= ${new Date(Date.now() - 12 * 30 * 24 * 60 * 60 * 1000)}
        GROUP BY DATE_TRUNC('month', created_at)
        ORDER BY month DESC
      `,
    ]);

    // Calculate conversion rate
    const conversionRate = totalApplications > 0 
      ? ((acceptedApplications / totalApplications) * 100).toFixed(2)
      : 0;

    // Calculate response time
    const responseStats = await prisma.$queryRaw<{ avg_hours: number }[]>`
      SELECT AVG(
        EXTRACT(EPOCH FROM (updated_at - created_at)) / 3600
      ) as avg_hours
      FROM applications
      WHERE job_id IN (SELECT id FROM jobs WHERE company_id = ${companyId})
      AND status != 'PENDING'
      AND updated_at IS NOT NULL
    `;
    
    return {
      jobs: {
        total: totalJobs,
        active: activeJobs,
        closed: closedJobs,
        byType: jobsByType,
      },
      applications: {
        total: totalApplications,
        pending: pendingApplications,
        reviewing: reviewedApplications,
        accepted: acceptedApplications,
        rejected: rejectedApplications,
        conversionRate: `${conversionRate}%`,
        byMonth: applicationsByMonth,
      },
      views: {
        total: 0,
        monthly: 0,
      },
      engagement: {
        followers: 0,
        reviews: 0,
        averageRating: 0,
      },
      performance: {
        averageResponseTime: responseStats[0]?.avg_hours 
          ? `${Math.round(responseStats[0].avg_hours)} hours`
          : 'N/A',
      },
    };
  },

  // Get top companies with ranking
  async getTopCompanies(limit: number = 10, timeframe: string = 'all') {
    const where: Prisma.CompanyWhereInput = { isVerified: true };

    // Time-based filtering for job counts
    let jobWhere: Prisma.JobWhereInput = {};
    if (timeframe === 'month') {
      jobWhere.createdAt = { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) };
    } else if (timeframe === 'quarter') {
      jobWhere.createdAt = { gte: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000) };
    } else if (timeframe === 'year') {
      jobWhere.createdAt = { gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000) };
    }

    const companies = await prisma.company.findMany({
      where,
      select: {
        id: true,
        name: true,
        logo: true,
        industry: true,
        location: true,
        _count: {
          select: { 
            jobs: { where: jobWhere },
          },
        },
        jobs: {
          where: jobWhere,
          orderBy: { createdAt: 'desc' },
          take: 1,
          select: {
            id: true,
          },
        },
      },
      orderBy: [
        { createdAt: 'desc' },
        { jobs: { _count: 'desc' } },
      ],
      take: limit,
    });

    // Add ranking
    return companies.map((company, index) => ({
      ...company,
      rank: index + 1,
      trending: 0,
    }));
  },

  // Search companies with autocomplete
  async searchCompanies(query: string, limit: number = 20) {
    if (!query || query.length < 2) {
      return [];
    }

    return await prisma.company.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { industry: { contains: query, mode: 'insensitive' } },
          { location: { contains: query, mode: 'insensitive' } },
        ],
      },
      select: {
        id: true,
        name: true,
        logo: true,
        industry: true,
        location: true,
        isVerified: true,
        _count: {
          select: { jobs: { where: { isActive: true } } },
        },
      },
      orderBy: [
        { isVerified: 'desc' },
        { name: 'asc' },
      ],
      take: limit,
    });
  },

  // Follow/unfollow company - not implemented
  async toggleFollow(companyId: string, userId: string) {
    return { following: false, message: 'Follow feature not implemented' };
  },

  // Get company followers - not implemented
  async getFollowers(companyId: string, page: number = 1, limit: number = 20) {
    return { followers: [], total: 0, pagination: { page, limit, totalPages: 0 } };
  },

  // Add company review - not implemented
  async addReview(companyId: string, userId: string, data: CompanyReviewData) {
    throw new Error('Review feature not implemented');
  },

  // Get company reviews - not implemented
  async getReviews(companyId: string, filters: any = {}) {
    return { reviews: [], total: 0, ratingDistribution: [], pagination: { page: 1, limit: 10, totalPages: 0 } };
  },

  // Verify company
  async verifyCompany(id: string, adminId: string) {
    return await prisma.company.update({
      where: { id },
      data: {
        isVerified: true,
      },
    });
  },

  // Feature/unfeature company - not implemented
  async toggleFeature(id: string, isFeatured: boolean) {
    return { message: 'Feature toggle not implemented' };
  },

  // Get industries list
  async getIndustries() {
    const industries = await prisma.company.groupBy({
      by: ['industry'],
      _count: { industry: true },
      orderBy: { _count: { industry: 'desc' } },
    });

    return industries
      .filter(i => i.industry)
      .map(i => ({
        name: i.industry,
        count: i._count.industry,
      }));
  },

  // Get company sizes
  async getCompanySizes() {
    return [
      '1-10',
      '11-50',
      '51-200',
      '201-500',
      '501-1000',
      '1000+',
    ];
  },

  // Get similar companies
  async getSimilarCompanies(companyId: string, limit: number = 5) {
    const company = await prisma.company.findUnique({
      where: { id: companyId },
      select: { industry: true, location: true },
    });

    if (!company) {
      throw new Error('Company not found');
    }

    return await prisma.company.findMany({
      where: {
        id: { not: companyId },
        OR: [
          { industry: company.industry },
          { location: company.location },
        ],
        isVerified: true,
      },
      select: {
        id: true,
        name: true,
        logo: true,
        industry: true,
        location: true,
        _count: {
          select: { jobs: { where: { isActive: true } } },
        },
      },
      take: limit,
    });
  },
};
