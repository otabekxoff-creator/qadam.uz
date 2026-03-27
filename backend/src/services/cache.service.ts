import redisService from '@/config/redis';
import logger from '@/config/logger';
import prisma from '@/config/database';

export class CacheService {
  private readonly defaultTTL = 300; // 5 minutes

  // User caching
  async cacheUser(userId: string, userData: any, ttl: number = this.defaultTTL): Promise<void> {
    try {
      const key = `user:${userId}`;
      await redisService.cacheJSON(key, userData, ttl);
    } catch (error) {
      logger.error('Error caching user:', error);
    }
  }

  async getCachedUser(userId: string): Promise<any | null> {
    try {
      const key = `user:${userId}`;
      return await redisService.getCachedJSON(key);
    } catch (error) {
      logger.error('Error getting cached user:', error);
      return null;
    }
  }

  async invalidateUser(userId: string): Promise<void> {
    try {
      const key = `user:${userId}`;
      await redisService.del(key);
    } catch (error) {
      logger.error('Error invalidating user cache:', error);
    }
  }

  // Job caching
  async cacheJobs(jobs: any[], filters: any, ttl: number = this.defaultTTL): Promise<void> {
    try {
      const key = `jobs:${JSON.stringify(filters)}`;
      await redisService.cacheJSON(key, jobs, ttl);
    } catch (error) {
      logger.error('Error caching jobs:', error);
    }
  }

  async getCachedJobs(filters: any): Promise<any[] | null> {
    try {
      const key = `jobs:${JSON.stringify(filters)}`;
      return await redisService.getCachedJSON(key);
    } catch (error) {
      logger.error('Error getting cached jobs:', error);
      return null;
    }
  }

  async invalidateJobsCache(): Promise<void> {
    try {
      const pattern = 'jobs:*';
      // Note: This would require implementing a pattern-based deletion
      // For now, we'll just log it
      logger.info('Invalidating jobs cache (pattern-based deletion needed)');
    } catch (error) {
      logger.error('Error invalidating jobs cache:', error);
    }
  }

  async invalidateStartups(): Promise<void> {
    try {
      const pattern = 'startups:*';
      // Note: This would require implementing a pattern-based deletion
      // For now, we'll just log it
      logger.info('Invalidating startups cache (pattern-based deletion needed)');
    } catch (error) {
      logger.error('Error invalidating startups cache:', error);
    }
  }

  // Startup caching
  async cacheStartups(startups: any[], filters: any, ttl: number = this.defaultTTL): Promise<void> {
    try {
      const key = `startups:${JSON.stringify(filters)}`;
      await redisService.cacheJSON(key, startups, ttl);
    } catch (error) {
      logger.error('Error caching startups:', error);
    }
  }

  async getCachedStartups(filters: any): Promise<any[] | null> {
    try {
      const key = `startups:${JSON.stringify(filters)}`;
      return await redisService.getCachedJSON(key);
    } catch (error) {
      logger.error('Error getting cached startups:', error);
      return null;
    }
  }

  // Application caching
  async cacheApplications(applications: any[], userId: string, ttl: number = this.defaultTTL): Promise<void> {
    try {
      const key = `applications:${userId}`;
      await redisService.cacheJSON(key, applications, ttl);
    } catch (error) {
      logger.error('Error caching applications:', error);
    }
  }

  async getCachedApplications(userId: string): Promise<any[] | null> {
    try {
      const key = `applications:${userId}`;
      return await redisService.getCachedJSON(key);
    } catch (error) {
      logger.error('Error getting cached applications:', error);
      return null;
    }
  }

  // Rate limiting cache
  async checkRateLimit(identifier: string, limit: number, windowMs: number): Promise<boolean> {
    try {
      const key = `rate_limit:${identifier}`;
      const current = await redisService.get(key);
      
      if (!current) {
        await redisService.set(key, '1', Math.ceil(windowMs / 1000));
        return true;
      }
      
      const count = parseInt(current);
      if (count >= limit) {
        return false;
      }
      
      await redisService.increment(key);
      return true;
    } catch (error) {
      logger.error('Error checking rate limit:', error);
      return true; // Allow request if cache fails
    }
  }

  // Session caching
  async cacheSession(sessionId: string, sessionData: any, ttl: number = 86400): Promise<void> {
    try {
      const key = `session:${sessionId}`;
      await redisService.cacheJSON(key, sessionData, ttl);
    } catch (error) {
      logger.error('Error caching session:', error);
    }
  }

  async getCachedSession(sessionId: string): Promise<any | null> {
    try {
      const key = `session:${sessionId}`;
      return await redisService.getCachedJSON(key);
    } catch (error) {
      logger.error('Error getting cached session:', error);
      return null;
    }
  }

  async invalidateSession(sessionId: string): Promise<void> {
    try {
      const key = `session:${sessionId}`;
      await redisService.del(key);
    } catch (error) {
      logger.error('Error invalidating session cache:', error);
    }
  }

  // Generic cache methods
  async setCache(key: string, value: any, ttl?: number): Promise<void> {
    try {
      await redisService.cacheJSON(key, value, ttl || this.defaultTTL);
    } catch (error) {
      logger.error('Error setting cache:', error);
    }
  }

  async getCache<T>(key: string): Promise<T | null> {
    try {
      return await redisService.getCachedJSON<T>(key);
    } catch (error) {
      logger.error('Error getting cache:', error);
      return null;
    }
  }

  async deleteCache(key: string): Promise<void> {
    try {
      await redisService.del(key);
    } catch (error) {
      logger.error('Error deleting cache:', error);
    }
  }

  // Cache warming
  async warmCache(): Promise<void> {
    try {
      logger.info('Starting cache warming...');
      
      // Cache popular jobs
      const popularJobs = await prisma.job.findMany({
        where: { isActive: true },
        take: 20,
        orderBy: { viewsCount: 'desc' },
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
      
      await this.cacheJobs(popularJobs, { popular: true }, 600); // 10 minutes
      
      // Cache popular startups
      const popularStartups = await prisma.startup.findMany({
        where: { status: 'APPROVED' },
        take: 20,
        orderBy: { likesCount: 'desc' },
        include: {
          student: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      });
      
      await this.cacheStartups(popularStartups, { popular: true }, 600);
      
      logger.info('Cache warming completed');
    } catch (error) {
      logger.error('Error during cache warming:', error);
    }
  }

  // Health check
  async healthCheck(): Promise<{ status: string; redis: boolean }> {
    const redisStatus = await redisService.ping();
    
    return {
      status: redisStatus ? 'healthy' : 'unhealthy',
      redis: redisStatus,
    };
  }

  // Invalidate startups cache
  async invalidateStartups(): Promise<void> {
    try {
      // Simple cache invalidation - clear specific patterns
      await redisService.del('startups:popular');
      await redisService.del('startups:recent');
      logger.info('Invalidated startups cache');
    } catch (error) {
      logger.error('Error invalidating startups cache:', error);
      throw error;
    }
  }
}

export const cacheService = new CacheService();
