import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

// Types
interface JobFilters {
  search?: string;
  type?: string;
  location?: string;
  isRemote?: boolean;
  companyId?: string;
  skills?: string[];
  category?: string;
  experienceLevel?: string;
  salaryMin?: number;
  salaryMax?: number;
  page?: number;
  limit?: number;
  sortBy?: 'createdAt' | 'salary' | 'views' | 'applications';
  sortOrder?: 'asc' | 'desc';
  postedWithin?: '24h' | '3d' | '7d' | '30d' | 'all';
}

interface CreateJobData {
  title: string;
  description: string;
  requirements?: string[];
  responsibilities?: string[];
  benefits?: string[];
  type: string;
  location: string;
  isRemote?: boolean;
  salaryMin?: number;
  salaryMax?: number;
  currency?: string;
  skills?: string[];
  category?: string;
  experienceLevel?: string;
  deadline?: Date;
}

interface UpdateJobData extends Partial<CreateJobData> {
  isActive?: boolean;
}

export const jobService = {
  // Create a new job with validation
  async createJob(data: CreateJobData, companyId: string) {
    // Validate required fields
    if (!data.title || !data.description || !data.type || !data.location) {
      throw new Error('Missing required fields: title, description, type, location');
    }

    // Check if company exists
    const company = await prisma.company.findUnique({
      where: { id: companyId },
    });

    if (!company) {
      throw new Error('Company not found');
    }

    return await prisma.job.create({
      data: {
        ...data,
        companyId,
        isActive: true,
        viewsCount: 0,
      } as any,
      include: {
        company: {
          select: {
            id: true,
            name: true,
            logo: true,
            location: true,
            isVerified: true,
          },
        },
      },
    });
  },

  // Get all jobs with comprehensive filters
  async getJobs(filters: JobFilters = {}) {
    const where: Prisma.JobWhereInput = { isActive: true };
    
    // Search filter
    if (filters.search) {
      where.OR = [
        { title: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
        { company: { name: { contains: filters.search, mode: 'insensitive' } } },
      ];
    }
    
    // Type filter
    if (filters.type) {
      where.type = filters.type;
    }

    // Category filter - not in schema
    // if (filters.category) {
    //   where.category = filters.category;
    // }

    // Experience level filter
    if (filters.experienceLevel) {
      where.experienceLevel = filters.experienceLevel;
    }
    
    // Location filter
    if (filters.location) {
      where.location = { contains: filters.location, mode: 'insensitive' };
    }
    
    // Remote filter
    if (filters.isRemote !== undefined) {
      where.isRemote = filters.isRemote;
    }
    
    // Company filter
    if (filters.companyId) {
      where.companyId = filters.companyId;
    }

    // Skills filter
    if (filters.skills?.length) {
      where.skills = { hasSome: filters.skills };
    }

    // Salary range filter
    if (filters.salaryMin !== undefined || filters.salaryMax !== undefined) {
      where.AND = [];
      if (filters.salaryMin !== undefined) {
        where.salaryMax = { gte: filters.salaryMin };
      }
      if (filters.salaryMax !== undefined) {
        where.salaryMin = { lte: filters.salaryMax };
      }
    }

    // Posted within filter
    if (filters.postedWithin && filters.postedWithin !== 'all') {
      const days = {
        '24h': 1,
        '3d': 3,
        '7d': 7,
        '30d': 30,
      }[filters.postedWithin];
      
      if (days) {
        where.createdAt = {
          gte: new Date(Date.now() - days * 24 * 60 * 60 * 1000),
        };
      }
    }
    
    // Pagination
    const page = Math.max(1, filters.page || 1);
    const limit = Math.min(50, Math.max(1, filters.limit || 10));
    const skip = (page - 1) * limit;

    // Sort order
    let orderBy: Prisma.JobOrderByWithRelationInput = {};
    switch (filters.sortBy) {
      case 'salary':
        orderBy = { salaryMax: filters.sortOrder || 'desc' };
        break;
      case 'views':
        orderBy = { viewsCount: filters.sortOrder || 'desc' };
        break;
      case 'applications':
        orderBy = { viewsCount: filters.sortOrder || 'desc' };
        break;
      default:
        orderBy = { createdAt: filters.sortOrder || 'desc' };
    }
    
    const [jobs, total] = await Promise.all([
      prisma.job.findMany({
        where,
        include: {
          company: {
            select: {
              id: true,
              name: true,
              logo: true,
              location: true,
              isVerified: true,
              companySize: true,
              industry: true,
            },
          },
          _count: {
            select: { applications: true },
          },
        },
        skip,
        take: limit,
        orderBy,
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

  // Get job by ID with full details
  async getJobById(id: string, userId?: string) {
    const job = await prisma.job.findUnique({
      where: { id },
      include: {
        company: {
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
            email: true,
            phone: true,
            _count: {
              select: { jobs: true },
            },
          },
        },
        _count: {
          select: { applications: true },
        },
      },
    });
    
    if (!job) {
      throw new Error('Job not found');
    }

    // Check if user has already applied
    let hasApplied = false;
    if (userId) {
      const existingApplication = await prisma.application.findFirst({
        where: {
          jobId: id,
          student: {
            userId,
          },
        },
      });
      hasApplied = !!existingApplication;
    }
    
    // Check if user has saved this job
    let isSaved = false;
    if (userId) {
      const savedJob = await prisma.savedJob.findFirst({
        where: {
          jobId: id,
          userId,
        },
      });
      isSaved = !!savedJob;
    }
    
    // Increment views
    await prisma.job.update({
      where: { id },
      data: { viewsCount: { increment: 1 } },
    });
    
    return {
      ...job,
      hasApplied,
      isSaved,
    };
  },

  // Update job with validation
  async updateJob(id: string, data: UpdateJobData, userId: string) {
    // Verify ownership
    const job = await prisma.job.findFirst({
      where: {
        id,
        company: {
          userId,
        },
      },
    });
    
    if (!job) {
      throw new Error('Job not found or not authorized');
    }

    // Prevent changing companyId
    delete (data as any).companyId;
    
    return await prisma.job.update({
      where: { id },
      data,
      include: {
        company: {
          select: {
            id: true,
            name: true,
            logo: true,
          },
        },
      },
    });
  },

  // Delete job with validation
  async deleteJob(id: string, userId: string) {
    // Verify ownership
    const job = await prisma.job.findFirst({
      where: {
        id,
        company: {
          userId,
        },
      },
      include: {
        _count: {
          select: { applications: true },
        },
      },
    });
    
    if (!job) {
      throw new Error('Job not found or not authorized');
    }

    // Check if job has applications
    if (job._count.applications > 0) {
      // Instead of deleting, mark as inactive
      return await prisma.job.update({
        where: { id },
        data: { isActive: false },
      });
    }
    
    return await prisma.job.delete({
      where: { id },
    });
  },

  // Close job posting (mark as inactive)
  async closeJob(id: string, userId: string) {
    // Verify ownership
    const job = await prisma.job.findFirst({
      where: {
        id,
        company: {
          userId,
        },
      },
    });
    
    if (!job) {
      throw new Error('Job not found or not authorized');
    }
    
    return await prisma.job.update({
      where: { id },
      data: { isActive: false },
    });
  },

  // Reopen job posting
  async reopenJob(id: string, userId: string) {
    // Verify ownership
    const job = await prisma.job.findFirst({
      where: {
        id,
        company: {
          userId,
        },
      },
    });
    
    if (!job) {
      throw new Error('Job not found or not authorized');
    }
    
    return await prisma.job.update({
      where: { id },
      data: { isActive: true },
    });
  },

  // Get job categories with counts - not implemented (category field not in schema)
  async getJobCategories() {
    return [];
  },

  // Get popular locations with job counts
  async getPopularLocations(limit: number = 10) {
    const locations = await prisma.job.groupBy({
      by: ['location'],
      where: { isActive: true },
      _count: {
        location: true,
      },
      orderBy: {
        _count: {
          location: 'desc',
        },
      },
      take: limit,
    });

    return locations
      .filter(l => l.location)
      .map(l => ({
        name: l.location,
        count: l._count.location,
      }));
  },

  // Get job types with counts
  async getJobTypes() {
    const types = await prisma.job.groupBy({
      by: ['type'],
      where: { isActive: true },
      _count: {
        type: true,
      },
      orderBy: {
        _count: {
          type: 'desc',
        },
      },
    });

    return types.map(t => ({
      name: t.type,
      count: t._count.type,
    }));
  },

  // Get experience levels with counts - not implemented (experienceLevel field not in schema)
  async getExperienceLevels() {
    return [];
  },

  // Search jobs with advanced options
  async searchJobs(query: string, filters: any = {}) {
    const where: Prisma.JobWhereInput = {
      isActive: true,
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { company: { name: { contains: query, mode: 'insensitive' } } },
        { skills: { hasSome: [query] } },
      ],
    };

    if (filters.location) {
      where.location = { contains: filters.location, mode: 'insensitive' };
    }

    if (filters.type) {
      where.type = filters.type;
    }

    return await prisma.job.findMany({
      where,
      include: {
        company: {
          select: {
            id: true,
            name: true,
            logo: true,
            isVerified: true,
          },
        },
        _count: {
          select: { applications: true },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });
  },

  // Get similar jobs
  async getSimilarJobs(jobId: string, limit: number = 5) {
    const job = await prisma.job.findUnique({
      where: { id: jobId },
      select: {
        type: true,
        location: true,
        skills: true,
        companyId: true,
      },
    });

    if (!job) {
      throw new Error('Job not found');
    }

    return await prisma.job.findMany({
      where: {
        id: { not: jobId },
        isActive: true,
        OR: [
          { type: job.type },
          { location: job.location },
          { skills: { hasSome: job.skills || [] } },
        ],
        companyId: { not: job.companyId },
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
      take: limit,
      orderBy: { createdAt: 'desc' },
    });
  },

  // Get featured jobs
  async getFeaturedJobs(limit: number = 10) {
    return await prisma.job.findMany({
      where: {
        isActive: true,
        company: {
          isVerified: true,
        },
      },
      include: {
        company: {
          select: {
            id: true,
            name: true,
            logo: true,
            isVerified: true,
          },
        },
        _count: {
          select: { applications: true },
        },
      },
      orderBy: [
        { viewsCount: 'desc' },
        { createdAt: 'desc' },
      ],
      take: limit,
    });
  },

  // Get newest jobs
  async getNewestJobs(limit: number = 10) {
    return await prisma.job.findMany({
      where: { isActive: true },
      include: {
        company: {
          select: {
            id: true,
            name: true,
            logo: true,
            isVerified: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  },

  // Get hot jobs (most applications)
  async getHotJobs(limit: number = 10) {
    const jobs = await prisma.job.findMany({
      where: { isActive: true },
      include: {
        company: {
          select: {
            id: true,
            name: true,
            logo: true,
          },
        },
        _count: {
          select: { applications: true },
        },
      },
      orderBy: { viewsCount: 'desc' },
      take: limit,
    });

    return jobs.filter(job => job._count.applications > 0);
  },

  // Get salary statistics - simplified (salary fields may not be in schema)
  async getSalaryStats(filters: any = {}) {
    return {
      min: 0,
      max: 0,
      average: 0,
      median: 0,
    };
  },

  // Get job statistics for a company
  async getCompanyJobStats(companyId: string) {
    const [
      totalJobs,
      activeJobs,
      closedJobs,
      totalViews,
      totalApplications,
      jobsByType,
      recentJobs,
    ] = await Promise.all([
      prisma.job.count({ where: { companyId } }),
      prisma.job.count({ where: { companyId, isActive: true } }),
      prisma.job.count({ where: { companyId, isActive: false } }),
      prisma.job.aggregate({
        where: { companyId },
        _sum: { viewsCount: true },
      }),
      prisma.application.count({
        where: { job: { companyId } },
      }),
      prisma.job.groupBy({
        by: ['type'],
        where: { companyId },
        _count: { type: true },
      }),
      prisma.job.findMany({
        where: { companyId },
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: {
          _count: {
            select: { applications: true },
          },
        },
      }),
    ]);

    return {
      totalJobs,
      activeJobs,
      closedJobs,
      totalViews: totalViews._sum.viewsCount || 0,
      totalApplications,
      jobsByType,
      recentJobs,
    };
  },

  // Save/Unsave job for user
  async toggleSaveJob(jobId: string, userId: string) {
    const existing = await prisma.savedJob.findFirst({
      where: {
        jobId,
        userId,
      },
    });

    if (existing) {
      await prisma.savedJob.delete({
        where: { id: existing.id },
      });
      return { saved: false };
    } else {
      await prisma.savedJob.create({
        data: {
          jobId,
          userId,
        },
      });
      return { saved: true };
    }
  },

  // Get user's saved jobs
  async getSavedJobs(userId: string, filters: any = {}) {
    const page = Math.max(1, filters.page || 1);
    const limit = Math.min(50, Math.max(1, filters.limit || 10));
    const skip = (page - 1) * limit;

    const [savedJobs, total] = await Promise.all([
      prisma.savedJob.findMany({
        where: { userId },
        include: {
          job: {
            include: {
              company: {
                select: {
                  id: true,
                  name: true,
                  logo: true,
                  location: true,
                  isVerified: true,
                },
              },
            },
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.savedJob.count({ where: { userId } }),
    ]);

    return {
      jobs: savedJobs.map(saved => saved.job),
      total,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  // Get recommended jobs for user
  async getRecommendedJobs(userId: string, limit: number = 10) {
    // Get user's saved jobs and applications to understand preferences
    const userData = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        savedJobs: {
          include: {
            job: {
              select: {
                category: true,
                type: true,
                location: true,
                skills: true,
              },
            },
          },
        },
        student: {
          include: {
            skills: true,
          },
        },
      },
    });

    if (!userData) {
      throw new Error('User not found');
    }

    // Extract user skills and preferences
    const userSkills = userData.student?.skills.map(s => s.name) || [];
    const savedCategories = userData.savedJobs.map(sj => sj.job.category).filter(Boolean);
    const savedTypes = userData.savedJobs.map(sj => sj.job.type).filter(Boolean);
    const preferredLocations = userData.savedJobs.map(sj => sj.job.location).filter(Boolean);

    // Find jobs matching user preferences
    const recommendedJobs = await prisma.job.findMany({
      where: {
        isActive: true,
        NOT: {
          savedBy: {
            some: { userId },
          },
        },
        OR: [
          { skills: { hasSome: userSkills } },
          { category: { in: savedCategories } },
          { type: { in: savedTypes } },
          { location: { in: preferredLocations } },
        ],
      },
      include: {
        company: {
          select: {
            id: true,
            name: true,
            logo: true,
            isVerified: true,
          },
        },
      },
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    // Score and rank jobs
    const scoredJobs = recommendedJobs.map(job => {
      let score = 0;
      
      // Skill match score
      const matchingSkills = job.skills?.filter(skill => userSkills.includes(skill)) || [];
      score += matchingSkills.length * 10;
      
      // Category match
      if (savedCategories.includes(job.category || '')) score += 5;
      
      // Type match
      if (savedTypes.includes(job.type)) score += 3;
      
      // Location match
      if (preferredLocations.includes(job.location)) score += 2;
      
      // Verified company bonus
      if (job.company.isVerified) score += 2;
      
      // Recency bonus (jobs posted in last 7 days)
      const daysSincePosted = (Date.now() - new Date(job.createdAt).getTime()) / (1000 * 60 * 60 * 24);
      if (daysSincePosted <= 7) score += 3;
      
      return { ...job, matchScore: score };
    });

    // Sort by score
    return scoredJobs.sort((a, b) => b.matchScore - a.matchScore);
  },

  // Report job - not implemented (jobReport model not in schema)
  async reportJob(jobId: string, userId: string, reason: string, description?: string) {
    return { message: 'Report feature not implemented' };
  },

  // Duplicate job (for reposting similar jobs)
  async duplicateJob(id: string, userId: string, updates?: Partial<CreateJobData>) {
    // Verify ownership
    const job = await prisma.job.findFirst({
      where: {
        id,
        company: {
          userId,
        },
      },
    });
    
    if (!job) {
      throw new Error('Job not found or not authorized');
    }

    // Create new job with same data
    const { id: oldId, createdAt, updatedAt, viewsCount, applicationsCount, ...jobData } = job as any;
    
    return await prisma.job.create({
      data: {
        ...jobData,
        ...updates,
        title: updates?.title || `${jobData.title} (Copy)`,
        isActive: true,
        viewsCount: 0,
      } as any,
      include: {
        company: {
          select: {
            id: true,
            name: true,
            logo: true,
          },
        },
      },
    });
  },
};
