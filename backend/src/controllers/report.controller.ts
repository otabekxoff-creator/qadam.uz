import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { createError } from '../middleware/error.middleware';

const prisma = new PrismaClient();

// Submit a report
export const submitReport = async (req: Request, res: Response) => {
  try {
    const reporterId = (req as any).user?.id;
    const {
      type,
      targetType,
      targetId,
      reason,
      description,
      evidence,
    } = req.body;

    if (!type || !targetType || !targetId || !reason) {
      throw createError('Type, target type, target ID, and reason are required', 400);
    }

    const report = await prisma.report.create({
      data: {
        reporterId,
        type,
        targetType,
        targetId,
        reason,
        description,
        evidence: evidence || [],
        status: 'PENDING',
      },
    });

    res.json({
      success: true,
      message: 'Report submitted successfully',
      data: report,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to submit report',
    });
  }
};

// Get all reports (admin only)
export const getAllReports = async (req: Request, res: Response) => {
  try {
    const { status, type, page = '1', limit = '20' } = req.query;
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    const take = parseInt(limit as string);

    const where: any = {};
    if (status) where.status = status;
    if (type) where.type = type;

    const [reports, total] = await Promise.all([
      prisma.report.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: {
          reporter: {
            select: { id: true, email: true },
          },
          resolver: {
            select: { id: true, email: true },
          },
        },
      }),
      prisma.report.count({ where }),
    ]);

    res.json({
      success: true,
      data: {
        reports,
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
      message: error.message || 'Failed to get reports',
    });
  }
};

// Get report by ID
export const getReportById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const report = await prisma.report.findUnique({
      where: { id },
      include: {
        reporter: {
          select: { id: true, email: true },
        },
        resolver: {
          select: { id: true, email: true },
        },
      },
    });

    if (!report) {
      throw createError('Report not found', 404);
    }

    res.json({
      success: true,
      data: report,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to get report',
    });
  }
};

// Update report status
export const updateReportStatus = async (req: Request, res: Response) => {
  try {
    const resolverId = (req as any).user?.id;
    const { id } = req.params;
    const { status, resolution, actionTaken } = req.body;

    if (!status) {
      throw createError('Status is required', 400);
    }

    const report = await prisma.report.update({
      where: { id },
      data: {
        status,
        resolution,
        actionTaken,
        resolverId,
        resolvedAt: status === 'RESOLVED' ? new Date() : undefined,
      },
    });

    res.json({
      success: true,
      message: 'Report updated successfully',
      data: report,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to update report',
    });
  }
};

// Get my reports
export const getMyReports = async (req: Request, res: Response) => {
  try {
    const reporterId = (req as any).user?.id;
    const { page = '1', limit = '10' } = req.query;
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    const take = parseInt(limit as string);

    const [reports, total] = await Promise.all([
      prisma.report.findMany({
        where: { reporterId },
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.report.count({ where: { reporterId } }),
    ]);

    res.json({
      success: true,
      data: {
        reports,
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
      message: error.message || 'Failed to get reports',
    });
  }
};

// Get report statistics (admin only)
export const getReportStats = async (req: Request, res: Response) => {
  try {
    const [total, byStatus, byType, recentReports] = await Promise.all([
      prisma.report.count(),
      prisma.report.groupBy({
        by: ['status'],
        _count: { status: true },
      }),
      prisma.report.groupBy({
        by: ['type'],
        _count: { type: true },
      }),
      prisma.report.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          type: true,
          status: true,
          createdAt: true,
        },
      }),
    ]);

    // Calculate average resolution time
    const resolvedReports = await prisma.report.findMany({
      where: { status: 'RESOLVED' },
      select: {
        createdAt: true,
        resolvedAt: true,
      },
    });

    let avgResolutionTime = 0;
    if (resolvedReports.length > 0) {
      const totalHours = resolvedReports.reduce((sum, report) => {
        if (report.resolvedAt) {
          const hours = (report.resolvedAt.getTime() - report.createdAt.getTime()) / (1000 * 60 * 60);
          return sum + hours;
        }
        return sum;
      }, 0);
      avgResolutionTime = totalHours / resolvedReports.length;
    }

    res.json({
      success: true,
      data: {
        total,
        byStatus: byStatus.reduce((acc, item) => {
          acc[item.status] = item._count.status;
          return acc;
        }, {} as Record<string, number>),
        byType: byType.reduce((acc, item) => {
          acc[item.type] = item._count.type;
          return acc;
        }, {} as Record<string, number>),
        avgResolutionTime: Math.round(avgResolutionTime * 100) / 100,
        recentReports,
      },
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to get report stats',
    });
  }
};
