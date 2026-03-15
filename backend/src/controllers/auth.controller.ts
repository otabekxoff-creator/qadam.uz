import { Request, Response } from 'express';
import { authService } from '@/services/auth.service';
import { AuthenticatedRequest } from '@/types';
import asyncHandler from '@/utils/asyncHandler';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.register(req.body);

  res.status(201).json({
    success: true,
    data: result,
    message: 'Ro‘yxatdan o‘tish uchun tasdiqlash kodi emailingizga yuborildi',
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await authService.loginDirect(email, password);

  res.cookie('token', result.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({
    success: true,
    data: result,
    message: 'Muvaffaqiyatli kirish',
  });
});

export const verifyRegisterCode = asyncHandler(async (req: Request, res: Response) => {
  const { email, code } = req.body;
  const result = await authService.verifyRegisterCode(email, code);

  res.cookie('token', result.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({
    success: true,
    data: result,
    message: 'Email muvaffaqiyatli tasdiqlandi',
  });
});

export const loginVerifyCode = asyncHandler(async (req: Request, res: Response) => {
  const { email, code } = req.body;
  const result = await authService.verifyLoginCode(email, code);

  res.cookie('token', result.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({
    success: true,
    data: result,
    message: 'Kirish muvaffaqiyatli tasdiqlandi',
  });
});

export const getMe = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const user = await authService.getMe(req.user!.userId);
  res.json({
    success: true,
    data: user,
  });
});

export const updateProfile = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.userId;
  
  // Fayllarni to'g'ri tip orqali olish
  const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
  
  const updatedProfile = await authService.updateProfile(userId, req.body, files);
  
  res.json({
    success: true,
    data: updatedProfile,
    message: 'Profil muvaffaqiyatli yangilandi',
  });
});
