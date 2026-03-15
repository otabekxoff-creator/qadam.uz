import { Response } from 'express';
import prisma from '@/config/database';
import { AuthenticatedRequest } from '@/types';
import asyncHandler from '@/utils/asyncHandler';
import { NotFoundError, ForbiddenError, ValidationError } from '@/utils/errors';

/**
 * @desc    Talaba profilini olish
 * @route   GET /api/students/profile
 * @access  Private (Student)
 */
export const getStudentProfile = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const student = await prisma.student.findUnique({
    where: { userId: req.user!.userId },
    include: {
      user: {
        select: { email: true, createdAt: true }
      }
    }
  });

  if (!student) {
    throw new NotFoundError('Talaba profili topilmadi');
  }

  res.json({
    success: true,
    data: student,
  });
});

/**
 * @desc    Talaba profilini yangilash
 * @route   PUT /api/students/profile
 * @access  Private (Student)
 */
export const updateStudentProfile = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { firstName, lastName, phone, university, major, gpa, about, skills } = req.body;

  const student = await prisma.student.findUnique({
    where: { userId: req.user!.userId }
  });

  if (!student) {
    throw new NotFoundError('Talaba profili topilmadi');
  }

  const updatedStudent = await prisma.student.update({
    where: { userId: req.user!.userId },
    data: {
      firstName: firstName?.trim(),
      lastName: lastName?.trim(),
      phone: phone?.trim(),
      university: university?.trim(),
      major: major?.trim(),
      gpa: gpa !== undefined ? (typeof gpa === 'string' ? parseFloat(gpa) : gpa) : undefined,
      about: about?.trim(),
      skills: Array.isArray(skills) ? skills : (typeof skills === 'string' ? skills.split(',').map((s: string) => s.trim()) : undefined),
    },
    include: {
      user: {
        select: { email: true }
      }
    }
  });

  res.json({
    success: true,
    data: updatedStudent,
    message: 'Profil muvaffaqiyatli yangilandi',
  });
});

/**
 * @desc    Talaba arizalarini olish
 * @route   GET /api/students/applications
 * @access  Private (Student)
 */
export const getStudentApplications = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { page = 1, limit = 10, status } = req.query;
  const skip = (Number(page) - 1) * Number(limit);

  const student = await prisma.student.findUnique({
    where: { userId: req.user!.userId }
  });

  if (!student) {
    throw new NotFoundError('Talaba profili topilmadi');
  }

  const whereClause: any = { studentId: student.id };
  if (status) {
    whereClause.status = String(status);
  }

  const [applications, total] = await Promise.all([
    prisma.application.findMany({
      where: whereClause,
      include: {
        job: {
          include: {
            company: {
              select: { name: true, logo: true, location: true }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: Number(limit),
    }),
    prisma.application.count({ where: whereClause }),
  ]);

  res.json({
    success: true,
    data: applications,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / Number(limit)),
    },
  });
});

/**
 * @desc    Talaba dashboard statistikasi
 * @route   GET /api/students/dashboard
 * @access  Private (Student)
 */
export const getStudentDashboard = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const student = await prisma.student.findUnique({
    where: { userId: req.user!.userId }
  });

  if (!student) {
    throw new NotFoundError('Talaba profili topilmadi');
  }

  // Parallel ravishda statistikalarni olish
  const [
    totalApplications,
    pendingApplications,
    acceptedApplications,
    rejectedApplications,
    totalStartups,
    approvedStartups,
    recentApplications
  ] = await Promise.all([
    prisma.application.count({ where: { studentId: student.id } }),
    prisma.application.count({ where: { studentId: student.id, status: 'PENDING' } }),
    prisma.application.count({ where: { studentId: student.id, status: 'ACCEPTED' } }),
    prisma.application.count({ where: { studentId: student.id, status: 'REJECTED' } }),
    prisma.startup.count({ where: { studentId: student.id } }),
    prisma.startup.count({ where: { studentId: student.id, status: 'APPROVED' } }),
    prisma.application.findMany({
      where: { studentId: student.id },
      include: {
        job: {
          include: {
            company: { select: { name: true, logo: true } }
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
  ]);

  res.json({
    success: true,
    data: {
      stats: {
        applications: {
          total: totalApplications,
          pending: pendingApplications,
          accepted: acceptedApplications,
          rejected: rejectedApplications,
        },
        startups: {
          total: totalStartups,
          approved: approvedStartups,
        },
      },
      recentApplications,
    },
  });
});

/**
 * @desc    Boshqa talaba profilini ko'rish (ochiq)
 * @route   GET /api/students/:id
 * @access  Public
 */
export const getStudentById = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;

  const student = await prisma.student.findUnique({
    where: { id },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      university: true,
      major: true,
      gpa: true,
      about: true,
      avatar: true,
      skills: true,
      createdAt: true,
      // contact faqat o'zi ko'radi
    }
  });

  if (!student) {
    throw new NotFoundError('Talaba topilmadi');
  }

  res.json({
    success: true,
    data: student,
  });
});
