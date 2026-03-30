import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const searchService = {
  // Global search across jobs, companies, and users
  async globalSearch(query: string, filters: any = {}) {
    const results: any = {};

    // Search jobs
    results.jobs = await prisma.job.findMany({
      where: {
        isActive: true,
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { skills: { has: query } },
        ],
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
      take: filters.limit || 10,
    });

    // Search companies
    results.companies = await prisma.company.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { industry: { contains: query, mode: 'insensitive' } },
        ],
      },
      take: filters.limit || 10,
    });

    // Search students (limited fields)
    results.students = await prisma.student.findMany({
      where: {
        OR: [
          { firstName: { contains: query, mode: 'insensitive' } },
          { lastName: { contains: query, mode: 'insensitive' } },
          { major: { contains: query, mode: 'insensitive' } },
          { university: { contains: query, mode: 'insensitive' } },
        ],
      },
      include: {
        user: {
          select: {
            id: true,
          },
        },
      },
      take: filters.limit || 10,
    });

    return results;
  },

  // Advanced job search with filters
  async advancedJobSearch(filters: any) {
    const where: any = { isActive: true };

    if (filters.query) {
      where.OR = [
        { title: { contains: filters.query, mode: 'insensitive' } },
        { description: { contains: filters.query, mode: 'insensitive' } },
      ];
    }

    if (filters.type) where.type = filters.type;
    if (filters.experienceLevel) where.experienceLevel = filters.experienceLevel;
    if (filters.location) where.location = { contains: filters.location, mode: 'insensitive' };
    if (filters.isRemote !== undefined) where.isRemote = filters.isRemote;
    if (filters.category) where.category = filters.category;
    if (filters.skills?.length) where.skills = { hasSome: filters.skills };

    // Salary range
    if (filters.salaryMin || filters.salaryMax) {
      where.AND = [];
      if (filters.salaryMin) where.AND.push({ salaryMax: { gte: parseInt(filters.salaryMin) } });
      if (filters.salaryMax) where.AND.push({ salaryMin: { lte: parseInt(filters.salaryMax) } });
    }

    // Company filters
    if (filters.companyId) where.companyId = filters.companyId;
    if (filters.industry) {
      where.company = {
        industry: filters.industry,
      };
    }

    const skip = ((filters.page || 1) - 1) * (filters.limit || 10);

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
            },
          },
          _count: {
            select: { applications: true },
          },
        },
        skip,
        take: filters.limit || 10,
        orderBy: filters.sortBy === 'salary' 
          ? { salaryMax: 'desc' }
          : filters.sortBy === 'views'
          ? { viewsCount: 'desc' }
          : { createdAt: 'desc' },
      }),
      prisma.job.count({ where }),
    ]);

    return { jobs, total };
  },

  // Get search suggestions
  async getSearchSuggestions(query: string) {
    const [jobTitles, companyNames, skills] = await Promise.all([
      prisma.job.findMany({
        where: {
          title: { contains: query, mode: 'insensitive' },
          isActive: true,
        },
        select: { title: true },
        distinct: ['title'],
        take: 5,
      }),
      prisma.company.findMany({
        where: {
          name: { contains: query, mode: 'insensitive' },
        },
        select: { name: true },
        distinct: ['name'],
        take: 5,
      }),
      prisma.job.findMany({
        where: {
          skills: { has: query },
          isActive: true,
        },
        select: { skills: true },
        take: 5,
      }),
    ]);

    return {
      jobTitles: jobTitles.map((j) => j.title),
      companyNames: companyNames.map((c) => c.name),
      skills: [...new Set(skills.flatMap((j) => j.skills))].slice(0, 5),
    };
  },
};
