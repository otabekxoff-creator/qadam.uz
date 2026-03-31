import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate, AuthRequest } from '../middleware/auth.middleware';
import { analyticsService } from '../services/analytics.service';

const router = Router();
const prisma = new PrismaClient();

// GET /api/admin/stats - Get platform statistics
router.get('/stats', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.role !== 'ADMIN') {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    const stats = await analyticsService.getPlatformStats();
    res.json({ success: true, data: stats });
  } catch (error) {
    console.error('Get admin stats error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch statistics' });
  }
});

// GET /api/admin/users - Get all users
router.get('/users', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.role !== 'ADMIN') {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search as string;
    const role = req.query.role as string;

    const skip = (page - 1) * limit;

    const where: any = {};
    if (search) {
      where.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        { student: { firstName: { contains: search, mode: 'insensitive' } } },
        { student: { lastName: { contains: search, mode: 'insensitive' } } },
        { company: { name: { contains: search, mode: 'insensitive' } } },
      ];
    }
    if (role) where.role = role;

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        include: {
          student: true,
          company: true,
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count({ where }),
    ]);

    res.json({
      success: true,
      data: users,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch users' });
  }
});

// PUT /api/admin/users/:id/verify - Toggle user verification
router.put('/users/:id/verify', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.role !== 'ADMIN') {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const updatedUser = await prisma.user.update({
      where: { id: req.params.id },
      data: { isVerified: !user.isVerified },
    });

    res.json({
      success: true,
      data: updatedUser,
      message: `User ${updatedUser.isVerified ? 'verified' : 'unverified'}`,
    });
  } catch (error) {
    console.error('Verify user error:', error);
    res.status(500).json({ success: false, message: 'Failed to update user' });
  }
});

// DELETE /api/admin/users/:id - Delete user
router.delete('/users/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.role !== 'ADMIN') {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    await prisma.user.delete({
      where: { id: req.params.id },
    });

    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete user' });
  }
});

// GET /api/admin/jobs - Get all jobs (admin view)
router.get('/jobs', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.role !== 'ADMIN') {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const status = req.query.status as string;
    const search = req.query.search as string;

    const skip = (page - 1) * limit;

    const where: any = {};
    if (status) where.isActive = status === 'active';
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
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
            },
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.job.count({ where }),
    ]);

    res.json({
      success: true,
      data: jobs,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get admin jobs error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch jobs' });
  }
});

// DELETE /api/admin/jobs/:id - Delete job
router.delete('/jobs/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.role !== 'ADMIN') {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    await prisma.job.delete({
      where: { id: req.params.id },
    });

    res.json({ success: true, message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Delete job error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete job' });
  }
});

// GET /api/admin/reports - Get admin reports
router.get('/reports', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.role !== 'ADMIN') {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    const reports = [
      { id: 1, name: 'User Growth Report', date: '2024-03-01', type: 'analytics' },
      { id: 2, name: 'Job Posting Report', date: '2024-03-01', type: 'analytics' },
      { id: 3, name: 'Application Trends', date: '2024-02-15', type: 'analytics' },
      { id: 4, name: 'Revenue Report', date: '2024-02-01', type: 'financial' },
    ];

    res.json({ success: true, data: reports });
  } catch (error) {
    console.error('Get reports error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch reports' });
  }
});

export default router;
