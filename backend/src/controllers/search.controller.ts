import { Request, Response } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';
import { createError } from '../middleware/error.middleware';

const prisma = new PrismaClient();

// Global search across all entities
export const globalSearch = async (req: Request, res: Response) => {
  try {
    const { q, limit = '10' } = req.query;
    const searchTerm = q as string;
    const take = parseInt(limit as string);

    if (!searchTerm || searchTerm.length < 2) {
      throw createError('Search term must be at least 2 characters', 400);
    }

    const [jobs, companies, users] = await Promise.all([
      // Search jobs
      prisma.job.findMany({
        where: {
          OR: [
            { title: { contains: searchTerm, mode: 'insensitive' } },
            { description: { contains: searchTerm, mode: 'insensitive' } },
            { requirements: { contains: searchTerm, mode: 'insensitive' } },
            { location: { contains: searchTerm, mode: 'insensitive' } },
          ],
          isActive: true,
        },
        take,
        include: {
          company: {
            select: {
              id: true,
              name: true,
              logo: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),

      // Search companies
      prisma.company.findMany({
        where: {
          OR: [
            { name: { contains: searchTerm, mode: 'insensitive' } },
            { description: { contains: searchTerm, mode: 'insensitive' } },
            { industry: { contains: searchTerm, mode: 'insensitive' } },
          ],
        },
        take,
        select: {
          id: true,
          name: true,
          logo: true,
          industry: true,
          location: true,
        },
      }),

      // Search users (students)
      prisma.user.findMany({
        where: {
          role: 'STUDENT',
          student: {
            OR: [
              { firstName: { contains: searchTerm, mode: 'insensitive' } },
              { lastName: { contains: searchTerm, mode: 'insensitive' } },
              { bio: { contains: searchTerm, mode: 'insensitive' } },
              { major: { contains: searchTerm, mode: 'insensitive' } },
            ],
          },
        },
        take,
        include: {
          student: {
            select: {
              firstName: true,
              lastName: true,
              avatar: true,
              major: true,
            },
          },
        },
      }),
    ]);

    res.json({
      success: true,
      data: {
        jobs,
        companies,
        users,
        total: jobs.length + companies.length + users.length,
      },
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Search failed',
    });
  }
};

// Advanced job search with filters
export const searchJobs = async (req: Request, res: Response) => {
  try {
    const {
      q,
      location,
      type,
      experience,
      salary_min,
      salary_max,
      remote,
      skills,
      posted_within,
      page = '1',
      limit = '10',
      sort_by = 'relevance',
    } = req.query;

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    const take = parseInt(limit as string);

    const where: Prisma.JobWhereInput = {
      isActive: true,
    };

    // Text search
    if (q) {
      where.OR = [
        { title: { contains: q as string, mode: 'insensitive' } },
        { description: { contains: q as string, mode: 'insensitive' } },
        { requirements: { contains: q as string, mode: 'insensitive' } },
      ];
    }

    // Location filter
    if (location) {
      where.location = { contains: location as string, mode: 'insensitive' };
    }

    // Job type filter
    if (type) {
      where.type = type as string;
    }

    // Experience level filter
    if (experience) {
      where.experienceLevel = experience as string;
    }

    // Salary range filter
    if (salary_min || salary_max) {
      where.salary = {};
      if (salary_min) {
        (where.salary as any).gte = parseInt(salary_min as string);
      }
      if (salary_max) {
        (where.salary as any).lte = parseInt(salary_max as string);
      }
    }

    // Remote filter
    if (remote === 'true') {
      where.isRemote = true;
    }

    // Skills filter
    if (skills) {
      const skillList = (skills as string).split(',');
      where.skills = {
        hasEvery: skillList,
      };
    }

    // Posted within filter
    if (posted_within) {
      const days = parseInt(posted_within as string);
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);
      where.createdAt = { gte: cutoffDate };
    }

    // Sort order
    let orderBy: Prisma.JobOrderByWithRelationInput = {};
    switch (sort_by) {
      case 'newest':
        orderBy = { createdAt: 'desc' };
        break;
      case 'oldest':
        orderBy = { createdAt: 'asc' };
        break;
      case 'salary_high':
        orderBy = { salary: 'desc' };
        break;
      case 'salary_low':
        orderBy = { salary: 'asc' };
        break;
      case 'views':
        orderBy = { viewsCount: 'desc' };
        break;
      default:
        orderBy = { createdAt: 'desc' };
    }

    const [jobs, total] = await Promise.all([
      prisma.job.findMany({
        where,
        skip,
        take,
        orderBy,
        include: {
          company: {
            select: {
              id: true,
              name: true,
              logo: true,
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

    // Get available filters for faceted search
    const [locations, types, experienceLevels] = await Promise.all([
      prisma.job.groupBy({
        by: ['location'],
        where: { isActive: true },
        _count: { location: true },
        orderBy: { _count: { location: 'desc' } },
        take: 20,
      }),
      prisma.job.groupBy({
        by: ['type'],
        where: { isActive: true },
        _count: { type: true },
      }),
      prisma.job.groupBy({
        by: ['experienceLevel'],
        where: { isActive: true },
        _count: { experienceLevel: true },
      }),
    ]);

    res.json({
      success: true,
      data: {
        jobs,
        pagination: {
          total,
          page: parseInt(page as string),
          pages: Math.ceil(total / take),
          limit: take,
        },
        filters: {
          locations: locations.map(l => ({ value: l.location, count: l._count.location })),
          types: types.map(t => ({ value: t.type, count: t._count.type })),
          experienceLevels: experienceLevels.map(e => ({ value: e.experienceLevel, count: e._count.experienceLevel })),
        },
      },
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Job search failed',
    });
  }
};

// Search companies
export const searchCompanies = async (req: Request, res: Response) => {
  try {
    const {
      q,
      industry,
      location,
      size,
      page = '1',
      limit = '10',
      sort_by = 'name',
    } = req.query;

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    const take = parseInt(limit as string);

    const where: Prisma.CompanyWhereInput = {};

    if (q) {
      where.OR = [
        { name: { contains: q as string, mode: 'insensitive' } },
        { description: { contains: q as string, mode: 'insensitive' } },
      ];
    }

    if (industry) {
      where.industry = industry as string;
    }

    if (location) {
      where.location = { contains: location as string, mode: 'insensitive' };
    }

    if (size) {
      where.companySize = size as string;
    }

    let orderBy: Prisma.CompanyOrderByWithRelationInput = {};
    switch (sort_by) {
      case 'newest':
        orderBy = { createdAt: 'desc' };
        break;
      case 'jobs':
        orderBy = { jobs: { _count: 'desc' } };
        break;
      default:
        orderBy = { name: 'asc' };
    }

    const [companies, total] = await Promise.all([
      prisma.company.findMany({
        where,
        skip,
        take,
        orderBy,
        include: {
          user: {
            select: {
              _count: {
                select: { jobs: true },
              },
            },
          },
        },
      }),
      prisma.company.count({ where }),
    ]);

    res.json({
      success: true,
      data: {
        companies,
        pagination: {
          total,
          page: parseInt(page as string),
          pages: Math.ceil(total / take),
          limit: take,
        },
      },
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Company search failed',
    });
  }
};

// Search users/students
export const searchUsers = async (req: Request, res: Response) => {
  try {
    const {
      q,
      skills,
      location,
      experience_years,
      available_for_hire,
      page = '1',
      limit = '10',
    } = req.query;

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    const take = parseInt(limit as string);

    const where: Prisma.UserWhereInput = {
      role: 'STUDENT',
    };

    if (q) {
      where.student = {
        OR: [
          { firstName: { contains: q as string, mode: 'insensitive' } },
          { lastName: { contains: q as string, mode: 'insensitive' } },
          { bio: { contains: q as string, mode: 'insensitive' } },
        ],
      };
    }

    if (skills) {
      const skillList = (skills as string).split(',');
      where.student = {
        ...where.student,
        skills: { hasEvery: skillList },
      };
    }

    if (location) {
      where.student = {
        ...where.student,
        location: { contains: location as string, mode: 'insensitive' },
      };
    }

    if (available_for_hire === 'true') {
      where.student = {
        ...where.student,
        availableForHire: true,
      };
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take,
        include: {
          student: true,
        },
      }),
      prisma.user.count({ where }),
    ]);

    res.json({
      success: true,
      data: {
        users,
        pagination: {
          total,
          page: parseInt(page as string),
          pages: Math.ceil(total / take),
          limit: take,
        },
      },
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'User search failed',
    });
  }
};

// Get search suggestions (autocomplete)
export const getSearchSuggestions = async (req: Request, res: Response) => {
  try {
    const { q, type = 'all' } = req.query;
    const searchTerm = q as string;

    if (!searchTerm || searchTerm.length < 2) {
      return res.json({
        success: true,
        data: [],
      });
    }

    let suggestions: any[] = [];

    if (type === 'all' || type === 'jobs') {
      const jobSuggestions = await prisma.job.findMany({
        where: {
          title: { contains: searchTerm, mode: 'insensitive' },
          isActive: true,
        },
        take: 5,
        select: {
          id: true,
          title: true,
          company: { select: { name: true } },
        },
      });
      suggestions = [...suggestions, ...jobSuggestions.map(j => ({ ...j, type: 'job' }))];
    }

    if (type === 'all' || type === 'companies') {
      const companySuggestions = await prisma.company.findMany({
        where: {
          name: { contains: searchTerm, mode: 'insensitive' },
        },
        take: 5,
        select: {
          id: true,
          name: true,
          industry: true,
        },
      });
      suggestions = [...suggestions, ...companySuggestions.map(c => ({ ...c, type: 'company' }))];
    }

    if (type === 'all' || type === 'skills') {
      // Get unique skills from jobs
      const jobsWithSkills = await prisma.job.findMany({
        where: {
          skills: { has: searchTerm },
        },
        take: 10,
        select: { skills: true },
      });
      const uniqueSkills = [...new Set(jobsWithSkills.flatMap(j => j.skills))]
        .filter(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
        .slice(0, 5);
      suggestions = [...suggestions, ...uniqueSkills.map(s => ({ name: s, type: 'skill' }))];
    }

    res.json({
      success: true,
      data: suggestions,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to get suggestions',
    });
  }
};

// Get popular searches
export const getPopularSearches = async (req: Request, res: Response) => {
  try {
    // This would typically come from a search analytics table
    // For now, returning mock data based on job data
    const popularJobs = await prisma.job.groupBy({
      by: ['title'],
      where: { isActive: true },
      _count: { title: true },
      orderBy: { _count: { title: 'desc' } },
      take: 10,
    });

    const popularLocations = await prisma.job.groupBy({
      by: ['location'],
      where: { isActive: true },
      _count: { location: true },
      orderBy: { _count: { location: 'desc' } },
      take: 10,
    });

    res.json({
      success: true,
      data: {
        jobTitles: popularJobs.map(j => j.title),
        locations: popularLocations.map(l => l.location),
      },
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to get popular searches',
    });
  }
};

// Get recent searches for user
export const getRecentSearches = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      throw createError('Authentication required', 401);
    }

    const recentSearches = await prisma.searchHistory.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });

    res.json({
      success: true,
      data: recentSearches,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to get recent searches',
    });
  }
};

// Save search query
export const saveSearch = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const { query, filters, name } = req.body;

    if (!userId) {
      throw createError('Authentication required', 401);
    }

    if (!query) {
      throw createError('Search query is required', 400);
    }

    const savedSearch = await prisma.savedSearch.create({
      data: {
        userId,
        query,
        filters: filters || {},
        name: name || query,
      },
    });

    res.json({
      success: true,
      message: 'Search saved successfully',
      data: savedSearch,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to save search',
    });
  }
};

// Get saved searches
export const getSavedSearches = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      throw createError('Authentication required', 401);
    }

    const savedSearches = await prisma.savedSearch.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    res.json({
      success: true,
      data: savedSearches,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to get saved searches',
    });
  }
};

// Delete saved search
export const deleteSavedSearch = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const { id } = req.params;

    if (!userId) {
      throw createError('Authentication required', 401);
    }

    await prisma.savedSearch.deleteMany({
      where: { id, userId },
    });

    res.json({
      success: true,
      message: 'Saved search deleted',
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to delete saved search',
    });
  }
};

// Clear search history
export const clearSearchHistory = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      throw createError('Authentication required', 401);
    }

    await prisma.searchHistory.deleteMany({
      where: { userId },
    });

    res.json({
      success: true,
      message: 'Search history cleared',
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to clear search history',
    });
  }
};
