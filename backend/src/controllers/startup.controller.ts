import { Request, Response } from 'express';
import { startupService } from '@/services/startup.service';
import { AuthenticatedRequest } from '@/types';
import asyncHandler from '@/utils/asyncHandler';
import { StartupStatus } from '@prisma/client';

/**
 * @desc    Yangi startap yaratish (Faqat talabalar uchun)
 * @route   POST /api/startups
 * @access  Private (Student)
 */
export const createStartup = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const startupData = {
    ...req.body,
    studentId: req.user?.userId,
    founderName: `${req.body.firstName} ${req.body.lastName}`,
    founderEmail: req.body.email,
    founderUniversity: req.body.university
  };

  const startup = await startupService.create(startupData);

  res.status(201).json({
    success: true,
    data: startup,
    message: 'Startap muvaffaqiyatli yaratildi. Tasdiqlash uchun ariza yuborildi.'
  });
});

/**
 * @desc    Barcha tasdiqlangan startaplarni olish (Ochiq)
 * @route   GET /api/startups
 * @access  Public
 */
export const getApprovedStartups = asyncHandler(async (req: Request, res: Response) => {
  const { page, limit, search } = req.query as any;
  const result = await startupService.findAllApproved(
    Number(page) || 1, 
    Number(limit) || 10, 
    search
  );

  res.json({
    success: true,
    data: result.startups,
    pagination: result.meta,
  });
});

/**
 * @desc    Bitta startapni ko'rish
 * @route   GET /api/startups/:id
 * @access  Public
 */
export const getStartupById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const startup = await startupService.findById(id);

  res.json({
    success: true,
    data: startup,
  });
});

/**
 * @desc    Talabaning o'z startaplarini ko'rish
 * @route   GET /api/startups/my-startups
 * @access  Private (Faqat Student)
 */
export const getMyStartups = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const startups = await startupService.findByStudent(req.user!.userId);

  res.json({
    success: true,
    data: startups,
    count: startups.length,
  });
});

/**
 * @desc    Startapni yangilash
 * @route   PUT /api/startups/:id
 * @access  Private (Faqat Startap egasi)
 */
export const updateStartup = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const updatedStartup = await startupService.update(id, req.user!.userId, req.body);

  res.json({
    success: true,
    data: updatedStartup,
    message: 'Startap muvaffaqiyatli yangilandi',
  });
});

/**
 * @desc    Startapni o'chirish
 * @route   DELETE /api/startups/:id
 * @access  Private (Faqat Startap egasi)
 */
export const deleteStartup = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  await startupService.delete(id, req.user!.userId);

  res.json({
    success: true,
    message: 'Startap muvaffaqiyatli o\'chirildi',
  });
});

/**
 * @desc    Admin uchun barcha startaplar
 * @route   GET /api/startups/admin/all
 * @access  Private (Admin)
 */
export const getAllStartupsForAdmin = asyncHandler(async (req: Request, res: Response) => {
  const { page, limit, status } = req.query as any;
  const result = await startupService.findAllForAdmin(
    Number(page) || 1, 
    Number(limit) || 10, 
    status as StartupStatus
  );

  res.json({
    success: true,
    data: result.startups,
    pagination: result.meta,
  });
});

/**
 * @desc    Admin: Startap statusini o'zgartirish
 * @route   PATCH /api/startups/:id/status
 * @access  Private (Admin)
 */
export const updateStatus = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const updated = await startupService.updateStatus(id, status as StartupStatus);

  res.json({
    success: true,
    data: updated,
    message: 'Startap holati muvaffaqiyatli o\'zgartirildi',
  });
});

/**
 * @desc    Startap statistikasini olish
 * @route   GET /api/startups/stats
 * @access  Public
 */
export const getStartupStats = asyncHandler(async (req: Request, res: Response) => {
  const stats = await startupService.getStats();
  res.json({
    success: true,
    data: stats,
  });
});
