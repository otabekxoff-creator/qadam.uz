import prisma from '@/config/database';
import { hashPassword, comparePassword, generateToken } from '@/utils/helpers';
import { ConflictError, UnauthorizedError, NotFoundError } from '@/utils/errors';
import { UserRole } from '@prisma/client';
import { RegisterInput } from '@/validators/auth.validator';
import { generateVerificationCode, sendEmail } from '@/services/email.service';
import fs from 'fs';
import path from 'path';

const deleteOldFile = (fileUrl?: string | null) => {
  if (!fileUrl) return;
  try {
    const filePath = path.join(process.cwd(), fileUrl);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (err) {
    console.error("Eski faylni o'chirishda xatolik:", err);
  }
};

export class AuthService {
  async register(data: RegisterInput) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictError('Email allaqachon ro\'yxatdan o\'tgan');
    }

    const hashedPassword = await hashPassword(data.password);

    const code = generateVerificationCode();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 daqiqa

    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        role: data.role,
        verificationCode: code,
        verificationCodeExpiresAt: expiresAt,
        ...(data.role === UserRole.STUDENT && {
          student: {
            create: {
              firstName: data.firstName!,
              lastName: data.lastName!,
            },
          },
        }),
        ...(data.role === UserRole.COMPANY && {
          company: {
            create: {
              name: data.companyName!,
              industry: data.industry!,
              location: data.location!,
              size: '1-10',
            },
          },
        }),
      },
      include: {
        student: true,
        company: true,
      },
    });

    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
    const subject = 'Step.uz – Ro‘yxatdan o‘tishni tasdiqlash kodi';
    const html = `
      <h1>Step.uz</h1>
      <p>Ro‘yxatdan o‘tishni yakunlash uchun quyidagi tasdiqlash kodini kiriting:</p>
      <p style="font-size: 24px; font-weight: bold; letter-spacing: 4px;">${code}</p>
      <p>Kod 15 daqiqa davomida amal qiladi.</p>
      <p>Agar bu amaliyotni o‘zingiz boshlamagan bo‘lsangiz, ushbu xabarni e'tiborsiz qoldiring.</p>
      <p><a href="${backendUrl}">Step.uz</a></p>
    `;

    await sendEmail(user.email, subject, html);

    return {
      email: user.email,
    };
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        student: true,
        company: true,
      },
    });

    if (!user) {
      throw new UnauthorizedError('Email yoki parol noto\'g\'ri');
    }

    if (!user.isActive) {
      throw new UnauthorizedError('Hisob faolsizlantirilgan');
    }

    const isValidPassword = await comparePassword(password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedError('Email yoki parol noto\'g\'ri');
    }

    const code = generateVerificationCode();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 daqiqa

    await prisma.user.update({
      where: { id: user.id },
      data: {
        loginCode: code,
        loginCodeExpiresAt: expiresAt,
      },
    });

    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
    const subject = 'Step.uz – Kirish uchun tasdiqlash kodi';
    const html = `
      <h1>Step.uz</h1>
      <p>Tizimga kirishni tasdiqlash uchun quyidagi kodni kiriting:</p>
      <p style="font-size: 24px; font-weight: bold; letter-spacing: 4px;">${code}</p>
      <p>Kod 10 daqiqa davomida amal qiladi.</p>
      <p>Agar bu amaliyotni o‘zingiz boshlamagan bo‘lsangiz, hisobingizni himoya qilish choralarini ko‘ring.</p>
      <p><a href="${backendUrl}">Step.uz</a></p>
    `;

    await sendEmail(user.email, subject, html);

    return { email: user.email };
  }

  async verifyRegisterCode(email: string, code: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { student: true, company: true },
    });

    if (!user || !user.verificationCode || !user.verificationCodeExpiresAt) {
      throw new UnauthorizedError('Tasdiqlash kodi topilmadi');
    }

    if (user.verificationCode !== code) {
      throw new UnauthorizedError('Tasdiqlash kodi noto‘g‘ri');
    }

    if (user.verificationCodeExpiresAt < new Date()) {
      throw new UnauthorizedError('Tasdiqlash kodi muddati tugagan');
    }

    const updated = await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerifiedAt: new Date(),
        verificationCode: null,
        verificationCodeExpiresAt: null,
      },
      include: { student: true, company: true },
    });

    const token = generateToken({
      userId: updated.id,
      email: updated.email,
      role: updated.role,
    });

    return {
      user: {
        id: updated.id,
        email: updated.email,
        role: updated.role,
        profile: updated.student || updated.company,
      },
      token,
    };
  }

  async verifyLoginCode(email: string, code: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { student: true, company: true },
    });

    if (!user || !user.loginCode || !user.loginCodeExpiresAt) {
      throw new UnauthorizedError('Kirish kodi topilmadi');
    }

    if (user.loginCode !== code) {
      throw new UnauthorizedError('Kirish kodi noto‘g‘ri');
    }

    if (user.loginCodeExpiresAt < new Date()) {
      throw new UnauthorizedError('Kirish kodi muddati tugagan');
    }

    const updated = await prisma.user.update({
      where: { id: user.id },
      data: {
        loginCode: null,
        loginCodeExpiresAt: null,
      },
      include: { student: true, company: true },
    });

    const token = generateToken({
      userId: updated.id,
      email: updated.email,
      role: updated.role,
    });

    return {
      user: {
        id: updated.id,
        email: updated.email,
        role: updated.role,
        profile: updated.student || updated.company,
      },
      token,
    };
  }

  async getMe(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        student: true,
        company: true,
      },
    });

    if (!user) {
      throw new NotFoundError('Foydalanuvchi topilmadi');
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      profile: user.student || user.company,
    };
  }

  async updateProfile(userId: string, data: any, files?: any) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { student: true, company: true }
    });

    if (!user) throw new NotFoundError('Foydalanuvchi topilmadi');

    let avatarPath = files?.avatar?.[0]?.filename ? `/uploads/${files.avatar[0].filename}` : undefined;
    let resumePath = files?.resume?.[0]?.filename ? `/uploads/${files.resume[0].filename}` : undefined;
    let logoPath = files?.logo?.[0]?.filename ? `/uploads/${files.logo[0].filename}` : undefined;

    if (user.role === 'STUDENT') {
      if (avatarPath && user.student?.avatar) deleteOldFile(user.student.avatar);
      if (resumePath && user.student?.resume) deleteOldFile(user.student.resume);

      const skillsArray = data.skills ? data.skills.split(',').map((s: string) => s.trim()) : undefined;
      
      const updatedStudent = await prisma.student.update({
        where: { userId: userId },
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          university: data.university,
          major: data.major,
          gpa: data.gpa ? parseFloat(data.gpa) : undefined,
          about: data.about,
          ...(skillsArray && { skills: skillsArray }),
          ...(avatarPath && { avatar: avatarPath }),
          ...(resumePath && { resume: resumePath }),
        },
      });
      return updatedStudent;
    }

    if (user.role === 'COMPANY') {
      if (logoPath && user.company?.logo) deleteOldFile(user.company.logo);

      const updatedCompany = await prisma.company.update({
        where: { userId: userId },
        data: {
          name: data.companyName,
          description: data.description,
          industry: data.industry,
          website: data.website,
          location: data.location,
          size: data.size,
          ...(logoPath && { logo: logoPath }),
        },
      });
      return updatedCompany;
    }
  }
}

export const authService = new AuthService();
