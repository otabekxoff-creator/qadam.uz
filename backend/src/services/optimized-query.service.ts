import prisma from '@/config/database';
import { cacheService } from './cache.service';
import logger from '@/config/logger';

export class OptimizedQueryService {
  // Optimized user query with caching
  async getUserWithCache(userId: string): Promise<any> {
    const cacheKey = `user:${userId}`;
    
    // Try cache first
    let user = await cacheService.getCachedUser(userId);
    
    if (!user) {
      // Query database with optimized includes
      user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          role: true,
          isActive: true,
          emailVerifiedAt: true,
          createdAt: true,
          student: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              avatar: true,
              university: true,
              major: true,
              skills: true,
            },
          },
          company: {
            select: {
              id: true,
              name: true,
              logo: true,
              description: true,
              industry: true,
              size: true,
            },
          },
        },
      });
      
      // Cache the result
      if (user) {
        await cacheService.cacheUser(userId, user, 300); // 5 minutes
      }
    }
    
    return user;
  }

  // Optimized jobs query with pagination and caching
  async getJobsOptimized(filters: any, pagination: any) {
    const cacheKey = `jobs:${JSON.stringify(filters)}:${JSON.stringify(pagination)}`;
    
    // Try cache first
    let jobs = await cacheService.getCachedJobs({ ...filters, ...pagination });
    
    if (!jobs) {
      // Build where clause efficiently
      const where: any = { isActive: true };
      
      if (filters.industry) {
        where.industry = { contains: filters.industry, mode: 'insensitive' };
      }
      
      if (filters.type) {
        where.type = filters.type;
      }
      
      if (filters.level) {
        where.level = filters.level;
      }
      
      if (filters.location) {
        where.location = { contains: filters.location, mode: 'insensitive' };
      }
      
      if (filters.skills && filters.skills.length > 0) {
        where.skills = { hasSome: filters.skills };
      }
      
      // Execute optimized query
      const [jobsData, totalCount] = await Promise.all([
        prisma.job.findMany({
          where,
          select: {
            id: true,
            title: true,
            description: true,
            salary: true,
            location: true,
            type: true,
            level: true,
            industry: true,
            skills: true,
            viewsCount: true,
            createdAt: true,
            company: {
              select: {
                id: true,
                name: true,
                logo: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
          skip: pagination.offset || 0,
          take: pagination.limit || 20,
        }),
        prisma.job.count({ where }),
      ]);
      
      jobs = jobsData;
      
      // Cache the result
      await cacheService.cacheJobs(jobsData, { ...filters, ...pagination }, 180); // 3 minutes
    }
    
    return jobs;
  }

  // Optimized startups query
  async getStartupsOptimized(filters: any, pagination: any) {
    const cacheKey = `startups:${JSON.stringify(filters)}:${JSON.stringify(pagination)}`;
    
    let startups = await cacheService.getCachedStartups({ ...filters, ...pagination });
    
    if (!startups) {
      const where: any = { status: 'APPROVED' };
      
      if (filters.stage) {
        where.stage = filters.stage;
      }
      
      if (filters.category) {
        where.category = { contains: filters.category, mode: 'insensitive' };
      }
      
      if (filters.tags && filters.tags.length > 0) {
        where.tags = { hasSome: filters.tags };
      }
      
      const [startupsData, totalCount] = await Promise.all([
        prisma.startup.findMany({
          where,
          select: {
            id: true,
            name: true,
            description: true,
            problem: true,
            solution: true,
            stage: true,
            fundingNeeded: true,
            fundingCurrency: true,
            viewsCount: true,
            likesCount: true,
            tags: true,
            createdAt: true,
            student: {
              select: {
                firstName: true,
                lastName: true,
                avatar: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
          skip: pagination.offset || 0,
          take: pagination.limit || 20,
        }),
        prisma.startup.count({ where }),
      ]);
      
      startups = startupsData;
      
      await cacheService.cacheStartups(startupsData, { ...filters, ...pagination }, 180);
    }
    
    return startups;
  }

  // Batch operations for better performance
  async getApplicationsByUser(userId: string) {
    const cacheKey = `applications:${userId}`;
    
    let applications = await cacheService.getCachedApplications(userId);
    
    if (!applications) {
      applications = await prisma.jobApplication.findMany({
        where: { userId },
        select: {
          id: true,
          status: true,
          coverLetter: true,
          createdAt: true,
          job: {
            select: {
              id: true,
              title: true,
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
      });
      
      await cacheService.cacheApplications(applications, userId, 300);
    }
    
    return applications;
  }

  // Optimized dashboard data (reduces N+1 queries)
  async getDashboardData(userId: string, userRole: string) {
    const cacheKey = `dashboard:${userId}:${userRole}`;
    
    let dashboardData = await cacheService.getCache(cacheKey);
    
    if (!dashboardData) {
      const queries = [];
      
      // Common queries
      queries.push(
        prisma.user.findUnique({
          where: { id: userId },
          select: { id: true, email: true, role: true, createdAt: true },
        })
      );
      
      if (userRole === 'STUDENT') {
        queries.push(
          prisma.student.findUnique({
            where: { userId },
            select: {
              id: true,
              firstName: true,
              lastName: true,
              avatar: true,
              university: true,
              major: true,
              skills: true,
            },
          }),
          prisma.jobApplication.count({
            where: { userId },
          }),
          prisma.jobApplication.findMany({
            where: { userId, status: 'PENDING' },
            take: 5,
            select: {
              id: true,
              status: true,
              createdAt: true,
              job: {
                select: { title: true, company: { select: { name: true } } },
              },
            },
            orderBy: { createdAt: 'desc' },
          })
        );
      } else if (userRole === 'COMPANY') {
        queries.push(
          prisma.company.findUnique({
            where: { userId },
            select: {
              id: true,
              name: true,
              logo: true,
              description: true,
              industry: true,
            },
          }),
          prisma.job.count({
            where: { companyId: (await prisma.company.findUnique({ where: { userId } }))?.id },
          }),
          prisma.jobApplication.count({
            where: {
              job: {
                companyId: (await prisma.company.findUnique({ where: { userId } }))?.id,
              },
            },
          })
        );
      }
      
      const results = await Promise.all(queries);
      
      dashboardData = this.buildDashboardResponse(results, userRole);
      
      await cacheService.setCache(cacheKey, dashboardData, 120); // 2 minutes
    }
    
    return dashboardData;
  }

  private buildDashboardResponse(results: any[], userRole: string) {
    const baseData = {
      user: results[0],
    };
    
    if (userRole === 'STUDENT') {
      return {
        ...baseData,
        student: results[1],
        applicationCount: results[2],
        recentApplications: results[3],
      };
    } else if (userRole === 'COMPANY') {
      return {
        ...baseData,
        company: results[1],
        jobCount: results[2],
        applicationCount: results[3],
      };
    }
    
    return baseData;
  }

  // Analytics queries optimization
  async getPlatformAnalytics() {
    const cacheKey = 'platform:analytics';
    
    let analytics = await cacheService.getCache(cacheKey);
    
    if (!analytics) {
      const [
        totalUsers,
        totalStudents,
        totalCompanies,
        totalJobs,
        totalStartups,
        totalApplications,
        recentActivity,
      ] = await Promise.all([
        prisma.user.count(),
        prisma.student.count(),
        prisma.company.count(),
        prisma.job.count({ where: { isActive: true } }),
        prisma.startup.count({ where: { status: 'APPROVED' } }),
        prisma.jobApplication.count(),
        prisma.user.count({
          where: {
            createdAt: {
              gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
            },
          },
        }),
      ]);
      
      analytics = {
        totalUsers,
        totalStudents,
        totalCompanies,
        totalJobs,
        totalStartups,
        totalApplications,
        recentActivity,
        generatedAt: new Date().toISOString(),
      };
      
      await cacheService.setCache(cacheKey, analytics, 600); // 10 minutes
    }
    
    return analytics;
  }

  // Search optimization
  async searchOptimized(query: string, type: 'jobs' | 'startups' | 'all') {
    const cacheKey = `search:${query}:${type}`;
    
    let results = await cacheService.getCache(cacheKey);
    
    if (!results) {
      const searchQuery = {
        contains: query,
        mode: 'insensitive' as const,
      };
      
      const queries = [];
      
      if (type === 'jobs' || type === 'all') {
        queries.push(
          prisma.job.findMany({
            where: {
              isActive: true,
              OR: [
                { title: searchQuery },
                { description: searchQuery },
                { industry: searchQuery },
                { location: searchQuery },
              ],
            },
            select: {
              id: true,
              title: true,
              description: true,
              location: true,
              type: true,
              level: true,
              company: {
                select: { name: true, logo: true },
              },
            },
            take: 10,
          })
        );
      }
      
      if (type === 'startups' || type === 'all') {
        queries.push(
          prisma.startup.findMany({
            where: {
              status: 'APPROVED',
              OR: [
                { name: searchQuery },
                { description: searchQuery },
                { problem: searchQuery },
                { solution: searchQuery },
                { tags: { hasSome: [query] } },
              ],
            },
            select: {
              id: true,
              name: true,
              description: true,
              stage: true,
              tags: true,
              student: {
                select: { firstName: true, lastName: true },
              },
            },
            take: 10,
          })
        );
      }
      
      const searchResults = await Promise.all(queries);
      
      results = {
        jobs: type === 'jobs' || type === 'all' ? searchResults[0] : [],
        startups: type === 'startups' || type === 'all' ? 
          (type === 'all' ? searchResults[1] : searchResults[0]) : [],
        query,
        timestamp: new Date().toISOString(),
      };
      
      await cacheService.setCache(cacheKey, results, 300); // 5 minutes
    }
    
    return results;
  }

  // Invalidate cache on data changes
  async invalidateRelatedCache(type: string, id?: string) {
    switch (type) {
      case 'user':
        if (id) await cacheService.invalidateUser(id);
        break;
      case 'job':
        await cacheService.invalidateJobsCache();
        break;
      case 'startup':
        await cacheService.invalidateStartups();
        break;
      case 'application':
        if (id) await cacheService.deleteCache(`applications:${id}`);
        break;
    }
    
    (logger as any).cache(`Cache invalidated for ${type}:${id || 'all'}`);
  }
}

export const optimizedQueryService = new OptimizedQueryService();
