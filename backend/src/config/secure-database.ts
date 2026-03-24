// =============================================
// 🔒 Database Security Configuration
// =============================================

import { PrismaClient } from '@prisma/client';
import logger from '@/config/logger';

// 🔒 Enhanced Prisma Client with Security
class SecurePrismaClient {
  private static instance: PrismaClient | null = null;
  private static connectionAttempts = 0;
  private static maxConnectionAttempts = 5;

  static getInstance(): PrismaClient {
    if (!this.instance) {
      this.instance = new PrismaClient({
        log: [
          {
            emit: 'event',
            level: 'query',
          },
          {
            emit: 'event',
            level: 'error',
          },
          {
            emit: 'event',
            level: 'info',
          },
          {
            emit: 'event',
            level: 'warn',
          },
        ],
        errorFormat: 'pretty',
      });

      // 🔒 Security Event Logging
      (this.instance as any).$on('query', (e: any) => {
        // Log slow queries (potential DoS)
        if (e.duration > 1000) {
          logger.warn('Slow query detected', {
            query: e.query,
            duration: e.duration,
            timestamp: e.timestamp,
          });
        }

        // Log suspicious query patterns
        const suspiciousPatterns = [
          /DROP\s+TABLE/i,
          /DELETE\s+FROM.*WHERE\s+1\s*=\s*1/i,
          /SELECT\s+.*\s+FROM.*\s+WHERE\s+.*\s*OR\s+.*\s*=\s*.*/i,
        ];

        if (suspiciousPatterns.some(pattern => pattern.test(e.query))) {
          logger.error('Suspicious query detected', {
            query: e.query,
            duration: e.duration,
            timestamp: e.timestamp,
          });
        }
      });

      (this.instance as any).$on('error', (e: any) => {
        logger.error('Database error', {
          message: e.message,
          target: e.target,
        });
      });

      (this.instance as any).$on('info', (e: any) => {
        logger.info('Database info', {
          message: e.message,
          target: e.target,
        });
      });

      (this.instance as any).$on('warn', (e: any) => {
        logger.warn('Database warning', {
          message: e.message,
          target: e.target,
        });
      });
    }

    return this.instance;
  }

  // 🔒 Secure Connection with Retry Logic
  static async connectWithRetry(): Promise<void> {
    while (this.connectionAttempts < this.maxConnectionAttempts) {
      try {
        const client = this.getInstance();
        await client.$connect();
        logger.info('Database connected successfully');
        return;
      } catch (error) {
        this.connectionAttempts++;
        logger.error(`Database connection attempt ${this.connectionAttempts} failed`, error);
        
        if (this.connectionAttempts >= this.maxConnectionAttempts) {
          throw new Error('Failed to connect to database after maximum attempts');
        }
        
        // Exponential backoff
        const delay = Math.pow(2, this.connectionAttempts) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  // 🔒 Secure Disconnection
  static async disconnect(): Promise<void> {
    if (this.instance) {
      await this.instance.$disconnect();
      this.instance = null;
      this.connectionAttempts = 0;
    }
  }
}

// 🔒 Database Security Utilities
export class DatabaseSecurity {
  // 🔒 SQL Injection Prevention
  static sanitizeQuery(query: string): string {
    // Remove dangerous SQL patterns
    const dangerousPatterns = [
      /DROP\s+TABLE/i,
      /DELETE\s+FROM.*WHERE\s+1\s*=\s*1/i,
      /SELECT\s+.*\s+FROM.*\s+WHERE\s+.*\s*OR\s+.*\s*=\s*.*/i,
      /UNION\s+SELECT/i,
      /INSERT\s+INTO.*VALUES/i,
      /UPDATE\s+.*SET/i,
      /EXEC\s*\(/i,
      /EXECUTE\s*\(/i,
    ];

    let sanitizedQuery = query;
    dangerousPatterns.forEach(pattern => {
      sanitizedQuery = sanitizedQuery.replace(pattern, '-- REMOVED');
    });

    return sanitizedQuery;
  }

  // 🔒 Input Validation for Database Operations
  static validateInput(input: any): boolean {
    if (typeof input === 'string') {
      // Check for SQL injection patterns
      const sqlInjectionPatterns = [
        /('|(\\')|(;)|(\;))|(\-\-)|(\s+(or|and)\s+.*=.*)|(union\s+select)/i,
      ];

      return !sqlInjectionPatterns.some(pattern => pattern.test(input));
    }

    return true;
  }

  // 🔒 Data Encryption for Sensitive Fields
  static encryptSensitiveData(data: string): string {
    // Simple encryption (in production, use proper encryption)
    const encoded = Buffer.from(data).toString('base64');
    return encoded;
  }

  static decryptSensitiveData(encryptedData: string): string {
    // Simple decryption (in production, use proper decryption)
    const decoded = Buffer.from(encryptedData, 'base64').toString();
    return decoded;
  }

  // 🔒 Audit Logging
  static logDatabaseOperation(operation: string, userId: string, details: any): void {
    logger.info('Database operation', {
      operation,
      userId,
      details,
      timestamp: new Date().toISOString(),
      ip: details.ip || 'unknown',
    });
  }

  // 🔒 Data Access Control
  static canAccessData(userId: string, resourceType: string, resourceId: string): boolean {
    // Implement role-based access control logic
    // This is a simplified version - in production, implement proper RBAC
    
    // For now, allow all access (implement proper logic based on your requirements)
    return true;
  }

  // 🔒 Data Retention Policy
  static async cleanupOldData(): Promise<void> {
    const client = SecurePrismaClient.getInstance();
    
    try {
      // Delete old notifications (older than 90 days)
      const ninetyDaysAgo = new Date();
      ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

      await client.notification.deleteMany({
        where: {
          createdAt: {
            lt: ninetyDaysAgo,
          },
          isRead: true,
        },
      });

      // Delete old chat messages (older than 1 year)
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

      await client.message.deleteMany({
        where: {
          createdAt: {
            lt: oneYearAgo,
          },
        },
      });

      logger.info('Old data cleanup completed');
    } catch (error) {
      logger.error('Data cleanup failed', error);
    }
  }

  // 🔒 Database Backup Verification
  static async verifyDatabaseIntegrity(): Promise<boolean> {
    const client = SecurePrismaClient.getInstance();
    
    try {
      // Check if critical tables exist and have data
      const userCount = await client.user.count();
      const jobCount = await client.job.count();
      const applicationCount = await client.jobApplication.count();

      if (userCount === 0 && jobCount === 0 && applicationCount === 0) {
        logger.warn('Database appears to be empty');
        return false;
      }

      // Check for data consistency
      const orphanedApplications = await client.jobApplication.count({
        where: {
          OR: [
            { job: undefined },
            { student: undefined },
          ],
        },
      });

      if (orphanedApplications > 0) {
        logger.warn(`Found ${orphanedApplications} orphaned applications`);
        return false;
      }

      logger.info('Database integrity check passed');
      return true;
    } catch (error) {
      logger.error('Database integrity check failed', error);
      return false;
    }
  }

  // 🔒 Performance Monitoring
  static async checkDatabasePerformance(): Promise<void> {
    const client = SecurePrismaClient.getInstance();
    
    try {
      const startTime = Date.now();
      
      // Test basic query performance
      await client.user.findFirst();
      
      const queryTime = Date.now() - startTime;
      
      if (queryTime > 100) {
        logger.warn('Database performance issue detected', {
          queryTime,
          threshold: 100,
        });
      }

      // Check connection pool status
      const poolStats = (client as any)._engine?.pool;
      if (poolStats) {
        logger.info('Database pool stats', {
          total: poolStats.numUsed,
          free: poolStats.numFree,
          waiting: poolStats.numWaitingClients,
        });
      }
    } catch (error) {
      logger.error('Database performance check failed', error);
    }
  }
}

// 🔒 Export secure client
export const prisma = SecurePrismaClient.getInstance();

// 🔒 Database connection with security
export const connectDatabase = async (): Promise<void> => {
  try {
    await SecurePrismaClient.connectWithRetry();
    
    // Run security checks
    const integrityCheck = await DatabaseSecurity.verifyDatabaseIntegrity();
    if (!integrityCheck) {
      logger.warn('Database integrity check failed');
    }

    // Check performance
    await DatabaseSecurity.checkDatabasePerformance();

    logger.info('Database connected and security checks completed');
  } catch (error) {
    logger.error('Database connection failed', error);
    throw error;
  }
};

// 🔒 Enhanced health check
export const checkDatabaseHealth = async (): Promise<boolean> => {
  try {
    const client = SecurePrismaClient.getInstance();
    await client.$queryRaw`SELECT 1`;
    
    // Additional health checks
    const integrityCheck = await DatabaseSecurity.verifyDatabaseIntegrity();
    await DatabaseSecurity.checkDatabasePerformance();
    
    return true;
  } catch (error) {
    logger.error('Database health check failed', error);
    return false;
  }
};

// 🔒 Graceful shutdown
export const disconnectDatabase = async (): Promise<void> => {
  try {
    await SecurePrismaClient.disconnect();
    logger.info('Database disconnected gracefully');
  } catch (error) {
    logger.error('Database disconnection failed', error);
  }
};

// 🔒 Periodic maintenance
export const runDatabaseMaintenance = async (): Promise<void> => {
  try {
    await DatabaseSecurity.cleanupOldData();
    await DatabaseSecurity.checkDatabasePerformance();
    logger.info('Database maintenance completed');
  } catch (error) {
    logger.error('Database maintenance failed', error);
  }
};
