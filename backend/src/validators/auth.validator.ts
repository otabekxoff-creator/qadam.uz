import { z } from 'zod';
import { UserRole } from '@prisma/client';

export const registerSchema = z.object({
  email: z.string().email('Valid email required'),
  password: z.string().min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain uppercase')
    .regex(/[a-z]/, 'Must contain lowercase')
    .regex(/[0-9]/, 'Must contain number'),
  role: z.nativeEnum(UserRole).refine(val => val !== UserRole.ADMIN, {
    message: 'Cannot register as admin'
  }),
  firstName: z.string().min(2).optional(),
  lastName: z.string().min(2).optional(),
  companyName: z.string().min(2).optional(),
  industry: z.string().optional(),
  location: z.string().optional(),
}).refine((data) => {
  if (data.role === UserRole.STUDENT) {
    return data.firstName && data.lastName;
  }
  if (data.role === UserRole.COMPANY) {
    return data.companyName && data.industry && data.location;
  }
  return true;
}, {
  message: 'Missing required fields for role',
  path: ['role']
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password required'),
});

export const verifyCodeSchema = z.object({
  email: z.string().email(),
  code: z.string().length(6, '6 xonali kod talab qilinadi'),
});

// QO'SHILGAN QISM
export const updateProfileSchema = z.object({
  firstName: z.string().min(2).optional(),
  lastName: z.string().min(2).optional(),
  phone: z.string().optional(),
  university: z.string().optional(),
  major: z.string().optional(),
  gpa: z.preprocess((val) => {
    if (typeof val === 'string' && val.trim() === '') return undefined;
    return val;
  }, z.string().transform(val => parseFloat(val)).optional()),
  about: z.string().optional(),
  skills: z.string().optional(),
  
  // Kompaniya uchun
  companyName: z.string().min(2).optional(),
  description: z.string().optional(),
  industry: z.string().optional(),
  website: z.string().optional(),
  location: z.string().optional(),
  size: z.string().optional(),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type VerifyCodeInput = z.infer<typeof verifyCodeSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
