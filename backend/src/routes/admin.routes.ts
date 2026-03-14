import { Router, Request, Response } from 'express';
import { authenticate, authorize } from '@/middleware/auth.middleware';
import prisma from '@/config/database';
import asyncHandler from '@/utils/asyncHandler';
import { StartupStatus } from '@prisma/client';

const router = Router();

// 1. Barcha Kutilayotgan (PENDING) startaplarni olish
router.get('/startups/pending', authenticate, authorize('ADMIN'), asyncHandler(async (req: Request, res: Response) => {
  const startups = await prisma.startup.findMany({
    where: { status: 'PENDING' },
    include: {
      student: {
        select: { firstName: true, lastName: true, university: true, phone: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  });
  
  res.json({ success: true, data: startups });
}));

// 2. Startap holatini o'zgartirish (Tasdiqlash yoki Rad etish)
router.put('/startups/:id/status', authenticate, authorize('ADMIN'), asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body; // 'APPROVED' yoki 'REJECTED'

  const startup = await prisma.startup.update({
    where: { id },
    data: { status: status as StartupStatus }
  });

  res.json({ 
    success: true, 
    data: startup,
    message: `Startap muvaffaqiyatli ${status === 'APPROVED' ? 'tasdiqlandi' : 'rad etildi'}` 
  });
}));

// (Ixtiyoriy) Tizimdagi umumiy statistika
router.get('/stats', authenticate, authorize('ADMIN'), asyncHandler(async (req: Request, res: Response) => {
  const [students, companies, jobs, startups] = await Promise.all([
    prisma.student.count(),
    prisma.company.count(),
    prisma.job.count(),
    prisma.startup.count()
  ]);

  res.json({
    success: true,
    data: { students, companies, jobs, startups }
  });
}));

export default router;
