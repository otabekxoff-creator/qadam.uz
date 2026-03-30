import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { createError } from '../middleware/error.middleware';

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        student: true,
        company: true,
      },
    });

    if (!user) {
      throw createError('User not found', 404);
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to get profile',
    });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const userRole = (req as any).user?.role;
    const data = req.body;

    const updateData: any = {};

    if (userRole === 'STUDENT' && data.student) {
      updateData.student = {
        upsert: {
          create: data.student,
          update: data.student,
        },
      };
    }

    if (userRole === 'COMPANY' && data.company) {
      updateData.company = {
        upsert: {
          create: data.company,
          update: data.company,
        },
      };
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      include: {
        student: true,
        company: true,
      },
    });

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: user,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to update profile',
    });
  }
};
