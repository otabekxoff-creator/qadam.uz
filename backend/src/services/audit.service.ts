import { PrismaClient } from '@prisma/client';
import logger from './logger';

const prisma = new PrismaClient();

/**
 * Audit Log Service - Track all changes for compliance and debugging
 */
export class AuditService {
  /**
   * Log any action
   */
  async log(
    action: string,
    entityType: string,
    entityId: string,
    userId: string,
    oldData?: Record<string, any>,
    newData?: Record<string, any>,
    metadata?: Record<string, any>
  ): Promise<void> {
    try {
      await prisma.auditLog.create({
        data: {
          action,
          entityType,
          entityId,
          userId,
          oldData: oldData ? JSON.stringify(oldData) : null,
          newData: newData ? JSON.stringify(newData) : null,
          ipAddress: metadata?.ipAddress,
          userAgent: metadata?.userAgent,
          timestamp: new Date(),
        },
      });

      logger.info(`Audit: ${action} on ${entityType}:${entityId} by ${userId}`);
    } catch (error) {
      logger.error('Failed to create audit log:', error);
    }
  }

  /**
   * Log data creation
   */
  async logCreate(
    entityType: string,
    entityId: string,
    userId: string,
    newData: Record<string, any>,
    metadata?: Record<string, any>
  ): Promise<void> {
    await this.log('CREATE', entityType, entityId, userId, undefined, newData, metadata);
  }

  /**
   * Log data update
   */
  async logUpdate(
    entityType: string,
    entityId: string,
    userId: string,
    oldData: Record<string, any>,
    newData: Record<string, any>,
    metadata?: Record<string, any>
  ): Promise<void> {
    // Calculate changes
    const changes = this.calculateChanges(oldData, newData);
    
    await this.log('UPDATE', entityType, entityId, userId, oldData, newData, {
      ...metadata,
      changes,
    });
  }

  /**
   * Log data deletion
   */
  async logDelete(
    entityType: string,
    entityId: string,
    userId: string,
    oldData: Record<string, any>,
    metadata?: Record<string, any>
  ): Promise<void> {
    await this.log('DELETE', entityType, entityId, userId, oldData, undefined, metadata);
  }

  /**
   * Log login/logout
   */
  async logAuth(
    action: 'LOGIN' | 'LOGOUT' | 'LOGIN_FAILED',
    userId: string,
    metadata?: Record<string, any>
  ): Promise<void> {
    await this.log(action, 'USER', userId, userId, undefined, undefined, metadata);
  }

  /**
   * Get audit trail for an entity
   */
  async getAuditTrail(
    entityType: string,
    entityId: string,
    options?: {
      limit?: number;
      offset?: number;
      actions?: string[];
    }
  ): Promise<Array<{
    id: string;
    action: string;
    userId: string;
    oldData: any;
    newData: any;
    timestamp: Date;
    ipAddress: string | null;
  }>> {
    const logs = await prisma.auditLog.findMany({
      where: {
        entityType,
        entityId,
        ...(options?.actions && { action: { in: options.actions } }),
      },
      orderBy: { timestamp: 'desc' },
      take: options?.limit || 50,
      skip: options?.offset || 0,
    });

    return logs.map((log) => ({
      id: log.id,
      action: log.action,
      userId: log.userId,
      oldData: log.oldData ? JSON.parse(log.oldData) : null,
      newData: log.newData ? JSON.parse(log.newData) : null,
      timestamp: log.timestamp,
      ipAddress: log.ipAddress,
    }));
  }

  /**
   * Get user's activity history
   */
  async getUserActivity(
    userId: string,
    options?: {
      limit?: number;
      offset?: number;
      startDate?: Date;
      endDate?: Date;
    }
  ): Promise<Array<{
    id: string;
    action: string;
    entityType: string;
    entityId: string;
    timestamp: Date;
  }>> {
    return await prisma.auditLog.findMany({
      where: {
        userId,
        ...(options?.startDate && { timestamp: { gte: options.startDate } }),
        ...(options?.endDate && { timestamp: { lte: options.endDate } }),
      },
      orderBy: { timestamp: 'desc' },
      take: options?.limit || 50,
      skip: options?.offset || 0,
      select: {
        id: true,
        action: true,
        entityType: true,
        entityId: true,
        timestamp: true,
      },
    });
  }

  /**
   * Calculate differences between old and new data
   */
  private calculateChanges(
    oldData: Record<string, any>,
    newData: Record<string, any>
  ): Array<{ field: string; oldValue: any; newValue: any }> {
    const changes: Array<{ field: string; oldValue: any; newValue: any }> = [];

    for (const key of Object.keys(newData)) {
      if (JSON.stringify(oldData[key]) !== JSON.stringify(newData[key])) {
        changes.push({
          field: key,
          oldValue: oldData[key],
          newValue: newData[key],
        });
      }
    }

    return changes;
  }

  /**
   * Clean old audit logs
   */
  async cleanupOldLogs(days: number = 365): Promise<number> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const result = await prisma.auditLog.deleteMany({
      where: { timestamp: { lt: cutoffDate } },
    });

    logger.info(`Cleaned up ${result.count} old audit logs`);
    return result.count;
  }

  /**
   * Get security report
   */
  async getSecurityReport(days: number = 30): Promise<{
    failedLogins: number;
    suspiciousActivities: number;
    dataExports: number;
    permissionChanges: number;
  }> {
    const since = new Date();
    since.setDate(since.getDate() - days);

    const [
      failedLogins,
      suspiciousActivities,
      dataExports,
      permissionChanges,
    ] = await Promise.all([
      prisma.auditLog.count({
        where: { action: 'LOGIN_FAILED', timestamp: { gte: since } },
      }),
      prisma.auditLog.count({
        where: {
          action: { in: ['UNAUTHORIZED_ACCESS', 'SUSPICIOUS_ACTIVITY'] },
          timestamp: { gte: since },
        },
      }),
      prisma.auditLog.count({
        where: { action: 'DATA_EXPORT', timestamp: { gte: since } },
      }),
      prisma.auditLog.count({
        where: {
          action: 'PERMISSION_CHANGE',
          entityType: 'USER',
          timestamp: { gte: since },
        },
      }),
    ]);

    return {
      failedLogins,
      suspiciousActivities,
      dataExports,
      permissionChanges,
    };
  }
}

export default new AuditService();
