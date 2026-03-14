import { Request, Response } from 'express';
import prisma from '@/config/database';
import { AuthenticatedRequest } from '@/types';
import asyncHandler from '@/utils/asyncHandler';
import { AppError, NotFoundError, ForbiddenError, ValidationError } from '@/utils/errors';

/**
 * @desc    Barcha tasdiqlangan startaplarni olish (Ochiq)
 * @route   GET /api/startups
 * @access  Public
 */
export const getApprovedStartups = asyncHandler(async (req: Request, res: Response) => {
  const { page = 1, limit = 10, search } = req.query;
  const skip = (Number(page) - 1) * Number(limit);

  const whereClause: any = { status: 'APPROVED' };
  
  if (search) {
    whereClause.OR = [
      { title: { contains: String(search), mode: 'insensitive' } },
      { description: { contains: String(search), mode: 'insensitive' } },
    ];
  }

  const [startups, total] = await Promise.all([
    prisma.startup.findMany({
      where: whereClause,
      include: {
        student: {
          select: { 
            id: true,
            firstName: true, 
            lastName: true, 
            university: true, 
            avatar: true 
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: Number(limit),
    }),
    prisma.startup.count({ where: whereClause }),
  ]);

  res.json({
    success: true,
    data: startups,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / Number(limit)),
    },
  });
});

/**
 * @desc    Bitta startapni ko'rish
 * @route   GET /api/startups/:id
 * @access  Public (tasdiqlanganlar uchun) / Private (o'z startapi uchun)
 */
export const getStartupById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const startup = await prisma.startup.findUnique({
    where: { id },
    include: {
      student: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          university: true,
          major: true,
          avatar: true,
          phone: true,
        }
      }
    }
  });

  if (!startup) {
    throw new NotFoundError('Startap topilmadi');
  }

  res.json({
    success: true,
    data: startup,
  });
});

/**
 * @desc    Yangi startap yaratish
 * @route   POST /api/startups
 * @access  Private (Faqat Student)
 */
export const createStartup = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { title, description, goalAmount } = req.body;

  // Validatsiya
  if (!title || title.trim().length < 5) {
    throw new ValidationError('Sarlavha kamida 5 ta belgidan iborat bo\'lishi kerak');
  }
  
  if (!description || description.trim().length < 20) {
    throw new ValidationError('Tavsif kamida 20 ta belgidan iborat bo\'lishi kerak');
  }
  
  const amount = parseFloat(goalAmount);
  if (isNaN(amount) || amount <= 0) {
    throw new ValidationError('Maqsad miqdori musbat son bo\'lishi kerak');
  }
  
  if (amount > 300000000) {
    throw new ValidationError('Maqsad miqdori 300 million so\'mdan oshmasligi kerak');
  }

  // Talabaning ID sini topish
  const student = await prisma.student.findUnique({ 
    where: { userId: req.user!.userId } 
  });

  if (!student) {
    throw new NotFoundError('Talaba profili topilmadi');
  }

  // Bir xil sarlavha bilan startap borligini tekshirish
  const existingStartup = await prisma.startup.findFirst({
    where: { 
      studentId: student.id,
      title: { equals: title, mode: 'insensitive' }
    }
  });

  if (existingStartup) {
    throw new ValidationError('Bu sarlavha bilan startap allaqachon mavjud');
  }

  const startup = await prisma.startup.create({
    data: {
      title: title.trim(),
      description: description.trim(),
      goalAmount: amount,
      studentId: student.id,
      status: 'PENDING',
    },
    include: {
      student: {
        select: { firstName: true, lastName: true }
      }
    }
  });

  res.status(201).json({
    success: true,
    data: startup,
    message: 'Startap muvaffaqiyatli yuborildi. Admin tomonidan ko\'rib chiqiladi.',
  });
});

/**
 * @desc    Talabaning o'z startaplarini ko'rish
 * @route   GET /api/startups/my-startups
 * @access  Private (Faqat Student)
 */
export const getMyStartups = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const student = await prisma.student.findUnique({ 
    where: { userId: req.user!.userId } 
  });

  if (!student) {
    throw new NotFoundError('Talaba profili topilmadi');
  }

  const startups = await prisma.startup.findMany({
    where: { studentId: student.id },
    orderBy: { createdAt: 'desc' },
  });

  res.json({
    success: true,
    data: startups,
    count: startups.length,
  });
});

/**
 * @desc    Startapni yangilash
 * @route   PUT /api/startups/:id
 * @access  Private (Faqat Startap egasi - PENDING holatida)
 */
export const updateStartup = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const { title, description, goalAmount } = req.body;

  const student = await prisma.student.findUnique({ 
    where: { userId: req.user!.userId } 
  });

  if (!student) {
    throw new NotFoundError('Talaba profili topilmadi');
  }

  const startup = await prisma.startup.findUnique({ where: { id } });

  if (!startup) {
    throw new NotFoundError('Startap topilmadi');
  }

  // Startap egasi ekanligini tekshirish
  if (startup.studentId !== student.id) {
    throw new ForbiddenError('Bu startapni tahrirlash huquqingiz yo\'q');
  }

  // Faqat PENDING holatida tahrirlash mumkin
  if (startup.status !== 'PENDING') {
    throw new ValidationError('Faqat ko\'rib chiqilayotgan startaplarni tahrirlash mumkin');
  }

  // Validatsiya
  const updateData: any = {};
  
  if (title) {
    if (title.trim().length < 5) {
      throw new ValidationError('Sarlavha kamida 5 ta belgidan iborat bo\'lishi kerak');
    }
    updateData.title = title.trim();
  }
  
  if (description) {
    if (description.trim().length < 20) {
      throw new ValidationError('Tavsif kamida 20 ta belgidan iborat bo\'lishi kerak');
    }
    updateData.description = description.trim();
  }
  
  if (goalAmount !== undefined) {
    const amount = parseFloat(goalAmount);
    if (isNaN(amount) || amount <= 0) {
      throw new ValidationError('Maqsad miqdori musbat son bo\'lishi kerak');
    }
    if (amount > 300000000) {
      throw new ValidationError('Maqsad miqdori 300 million so\'mdan oshmasligi kerak');
    }
    updateData.goalAmount = amount;
  }

  const updatedStartup = await prisma.startup.update({
    where: { id },
    data: updateData,
  });

  res.json({
    success: true,
    data: updatedStartup,
    message: 'Startap muvaffaqiyatli yangilandi',
  });
});

/**
 * @desc    Startapni o'chirish
 * @route   DELETE /api/startups/:id
 * @access  Private (Faqat Startap egasi - PENDING holatida)
 */
export const deleteStartup = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;

  const student = await prisma.student.findUnique({ 
    where: { userId: req.user!.userId } 
  });

  if (!student) {
    throw new NotFoundError('Talaba profili topilmadi');
  }

  const startup = await prisma.startup.findUnique({ where: { id } });

  if (!startup) {
    throw new NotFoundError('Startap topilmadi');
  }

  // Startap egasi ekanligini tekshirish
  if (startup.studentId !== student.id) {
    throw new ForbiddenError('Bu startapni o\'chirish huquqingiz yo\'q');
  }

  // Faqat PENDING holatida o'chirish mumkin
  if (startup.status !== 'PENDING') {
    throw new ValidationError('Faqat ko\'rib chiqilayotgan startaplarni o\'chirish mumkin');
  }

  await prisma.startup.delete({ where: { id } });

  res.json({
    success: true,
    message: 'Startap muvaffaqiyatli o\'chirildi',
  });
});

/**
 * @desc    Admin: Barcha startaplarni olish (status bo'yicha filter)
 * @route   GET /api/startups/admin/all
 * @access  Private (Faqat Admin)
 */
export const getAllStartupsForAdmin = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { page = 1, limit = 20, status } = req.query;
  const skip = (Number(page) - 1) * Number(limit);

  const whereClause: any = {};
  
  if (status && ['PENDING', 'APPROVED', 'REJECTED'].includes(String(status))) {
    whereClause.status = String(status);
  }

  const [startups, total] = await Promise.all([
    prisma.startup.findMany({
      where: whereClause,
      include: {
        student: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            university: true,
            major: true,
            avatar: true,
            user: { select: { email: true } }
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: Number(limit),
    }),
    prisma.startup.count({ where: whereClause }),
  ]);

  // Statistika
  const stats = await prisma.startup.groupBy({
    by: ['status'],
    _count: true,
  });

  res.json({
    success: true,
    data: startups,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / Number(limit)),
    },
    stats: stats.reduce((acc, item) => {
      acc[item.status] = item._count;
      return acc;
    }, {} as Record<string, number>),
  });
});

/**
 * @desc    Admin: Startap statusini o'zgartirish
 * @route   PATCH /api/startups/:id/status
 * @access  Private (Faqat Admin)
 */
export const updateStartupStatus = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const { status, rejectionReason } = req.body;

  if (!['APPROVED', 'REJECTED'].includes(status)) {
    throw new ValidationError('Status faqat APPROVED yoki REJECTED bo\'lishi mumkin');
  }

  if (status === 'REJECTED' && !rejectionReason) {
    throw new ValidationError('Rad etish sababi ko\'rsatilishi shart');
  }

  const startup = await prisma.startup.findUnique({ where: { id } });

  if (!startup) {
    throw new NotFoundError('Startap topilmadi');
  }

  if (startup.status !== 'PENDING') {
    throw new ValidationError('Faqat ko\'rib chiqilayotgan startaplar holatini o\'zgartirish mumkin');
  }

  const updatedStartup = await prisma.startup.update({
    where: { id },
    data: { 
      status,
      // Agar kerak bo'lsa, rejectionReason ni saqlash uchun schema ga qo'shish mumkin
    },
  });

  res.json({
    success: true,
    data: updatedStartup,
    message: status === 'APPROVED' 
      ? 'Startap muvaffaqiyatli tasdiqlandi' 
      : 'Startap rad etildi',
  });
});

/**
 * @desc    Startap statistikasini olish
 * @route   GET /api/startups/stats
 * @access  Public
 */
export const getStartupStats = asyncHandler(async (req: Request, res: Response) => {
  const stats = await prisma.startup.groupBy({
    by: ['status'],
    _count: true,
    _sum: {
      goalAmount: true,
    },
  });

  const totalStartups = await prisma.startup.count();
  const totalGoalAmount = await prisma.startup.aggregate({
    where: { status: 'APPROVED' },
    _sum: { goalAmount: true },
  });

  res.json({
    success: true,
    data: {
      byStatus: stats.reduce((acc, item) => {
        acc[item.status] = {
          count: item._count,
          totalAmount: item._sum.goalAmount || 0,
        };
        return acc;
      }, {} as Record<string, { count: number; totalAmount: number }>),
      total: totalStartups,
      totalApprovedAmount: totalGoalAmount._sum.goalAmount || 0,
    },
  });
});
