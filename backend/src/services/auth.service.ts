import prisma from '@/config/database';
import { hashPassword, comparePassword, generateToken } from '@/utils/helpers';
import { ConflictError, UnauthorizedError, NotFoundError } from '@/utils/errors';
import { UserRole } from '@prisma/client';
import { RegisterInput } from '@/validators/auth.validator';
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

    // Email tasdiqlashsiz to'g'ridan-to'g'ri ro'yxatdan o'tkazish
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        role: data.role,
        emailVerifiedAt: new Date(), // To'g'ridan-to'g'ri tasdiqlash
        isActive: true,
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

    // Return user data without email verification
    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        emailVerifiedAt: user.emailVerifiedAt,
        student: user.student,
        company: user.company,
      },
      token: generateToken({
        userId: user.id,
        email: user.email,
        role: user.role,
      }),
    };
  }

  async loginDirect(email: string, password: string) {
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
      throw new UnauthorizedError('Hisob faol emas');
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Email yoki parol noto\'g\'ri');
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        emailVerifiedAt: user.emailVerifiedAt,
        student: user.student,
        company: user.company,
      },
      token: generateToken({
        userId: user.id,
        email: user.email,
        role: user.role,
      }),
    };
  }

  async verifyRegisterCode(email: string, code: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        student: true,
        company: true,
      },
    });

    if (!user) {
      throw new NotFoundError('Foydalanuvchi topilmadi');
    }

    if (user.emailVerifiedAt) {
      throw new ConflictError('Email allaqachon tasdiqlangan');
    }

    if (!user.verificationCode || !user.verificationCodeExpiresAt) {
      throw new UnauthorizedError('Tasdiqlash kodi yuborilmagan');
    }

    if (user.verificationCodeExpiresAt < new Date()) {
      throw new UnauthorizedError('Tasdiqlash kodi muddati o\'tgan');
    }

    if (user.verificationCode !== code) {
      throw new UnauthorizedError('Tasdiqlash kodi noto\'g\'ri');
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerifiedAt: new Date(),
        verificationCode: null,
        verificationCodeExpiresAt: null,
      },
      include: {
        student: true,
        company: true,
      },
    });

    return {
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        role: updatedUser.role,
        isActive: updatedUser.isActive,
        emailVerifiedAt: updatedUser.emailVerifiedAt,
        student: updatedUser.student,
        company: updatedUser.company,
      },
      token: generateToken({
        userId: updatedUser.id,
        email: updatedUser.email,
        role: updatedUser.role,
      }),
    };
  }

  async verifyLoginCode(email: string, code: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        student: true,
        company: true,
      },
    });

    if (!user) {
      throw new NotFoundError('Foydalanuvchi topilmadi');
    }

    if (!user.loginCode || !user.loginCodeExpiresAt) {
      throw new UnauthorizedError('Kirish kodi yuborilmagan');
    }

    if (user.loginCodeExpiresAt < new Date()) {
      throw new UnauthorizedError('Kirish kodi muddati o\'tgan');
    }

    if (user.loginCode !== code) {
      throw new UnauthorizedError('Kirish kodi noto\'g\'ri');
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        loginCode: null,
        loginCodeExpiresAt: null,
      },
      include: {
        student: true,
        company: true,
      },
    });

    return {
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        role: updatedUser.role,
        isActive: updatedUser.isActive,
        emailVerifiedAt: updatedUser.emailVerifiedAt,
        student: updatedUser.student,
        company: updatedUser.company,
      },
      token: generateToken({
        userId: updatedUser.id,
        email: updatedUser.email,
        role: updatedUser.role,
      }),
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
      isActive: user.isActive,
      emailVerifiedAt: user.emailVerifiedAt,
      student: user.student,
      company: user.company,
    };
  }

  async updateProfile(userId: string, data: any, files?: any) {
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

    // Eski fayllarni o'chirish
    if (files?.avatar && user.student?.avatar) {
      deleteOldFile(user.student.avatar);
    }
    if (files?.resume && user.student?.resume) {
      deleteOldFile(user.student.resume);
    }
    if (files?.logo && user.company?.logo) {
      deleteOldFile(user.company.logo);
    }

    // Student ma'lumotlarini yangilash
    if (user.role === UserRole.STUDENT && user.student) {
      const studentData: any = {};
      if (data.firstName) studentData.firstName = data.firstName;
      if (data.lastName) studentData.lastName = data.lastName;
      if (data.phone) studentData.phone = data.phone;
      if (data.university) studentData.university = data.university;
      if (data.major) studentData.major = data.major;
      if (data.gpa) studentData.gpa = data.gpa;
      if (data.about) studentData.about = data.about;
      if (data.skills) studentData.skills = data.skills;
      if (files?.avatar) studentData.avatar = files.avatar[0]?.path;
      if (files?.resume) studentData.resume = files.resume[0]?.path;

      await prisma.student.update({
        where: { id: user.student.id },
        data: studentData,
      });
    }

    // Company ma'lumotlarini yangilash
    if (user.role === UserRole.COMPANY && user.company) {
      const companyData: any = {};
      if (data.companyName) companyData.name = data.companyName;
      if (data.description) companyData.description = data.description;
      if (data.industry) companyData.industry = data.industry;
      if (data.website) companyData.website = data.website;
      if (data.location) companyData.location = data.location;
      if (data.size) companyData.size = data.size;
      if (files?.logo) companyData.logo = files.logo[0]?.path;

      await prisma.company.update({
        where: { id: user.company.id },
        data: companyData,
      });
    }

    // Yangilangan ma'lumotlarni qaytarish
    const updatedUser = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        student: true,
        company: true,
      },
    });

    return {
      id: updatedUser!.id,
      email: updatedUser!.email,
      role: updatedUser!.role,
      isActive: updatedUser!.isActive,
      emailVerifiedAt: updatedUser!.emailVerifiedAt,
      student: updatedUser!.student,
      company: updatedUser!.company,
    };
  }
}

export const authService = new AuthService();
