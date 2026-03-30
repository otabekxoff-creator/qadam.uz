import { prisma } from '../lib/prisma';
import { createError } from '../middleware/error.middleware';

export class AuthService {
  static async findUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
      include: {
        student: true,
        company: true,
      },
    });
  }

  static async findUserById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        student: true,
        company: true,
      },
    });
  }

  static async updateLastLogin(userId: string) {
    return prisma.user.update({
      where: { id: userId },
      data: { lastLoginAt: new Date() },
    });
  }
}
