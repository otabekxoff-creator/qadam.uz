import { z } from 'zod';
import { StartupStatus } from '@prisma/client';

/**
 * Yangi startap yaratish uchun validatsiya
 */
export const createStartupSchema = z.object({
  name: z.string({
    required_error: 'Startup nomi kiritilishi shart',
    invalid_type_error: 'Startup nomi matn bo\'lishi kerak',
  })
    .min(3, 'Startup nomi kamida 3 ta belgidan iborat bo\'lishi kerak')
    .max(100, 'Startup nomi 100 ta belgidan oshmasligi kerak')
    .trim(),

  description: z.string({
    required_error: 'Tavsif kiritilishi shart',
    invalid_type_error: 'Tavsif matn bo\'lishi kerak',
  })
    .min(20, 'Tavsif kamida 20 ta belgidan iborat bo\'lishi kerak')
    .max(5000, 'Tavsif 5000 ta belgidan oshmasligi kerak')
    .trim(),

  stage: z.string()
    .min(1, 'Stage kamida 1 ta belgidan iborat bo\'lishi kerak')
    .max(50, 'Stage 50 ta belgidan oshmasligi kerak')
    .optional(),

  fundingGoal: z.string()
    .refine((val) => !val || !isNaN(Number(val)), {
      message: 'Finansiying maqdori raqam bo\'lishi kerak',
    })
    .refine((val) => !val || Number(val) > 0, {
      message: 'Finansiying maqdori musbat son bo\'lishi kerak',
    })
    .optional(),

  teamSize: z.number()
    .int()
    .positive()
    .optional(),

  website: z.string()
    .url({
      message: 'Website noto\'g\'ri URL formatda',
    })
    .optional(),

  pitch: z.string()
    .max(500, 'Pitch 500 ta belgidan oshmasligi kerak')
    .optional(),

  lookingFor: z.string()
    .max(200, 'Looking for 200 ta belgidan oshmasligi kerak')
    .optional(),

  timeline: z.string()
    .max(200, 'Timeline 200 ta belgidan oshmasligi kerak')
    .optional(),

  founderName: z.string()
    .max(100, 'Founder nomi 100 ta belgidan oshmasligi kerak')
    .optional(),

  founderEmail: z.string()
    .email({
      message: 'Noto\'g\'ri email format',
    })
    .optional(),

  founderUniversity: z.string()
    .max(100, 'Founder universiteti 100 ta belgidan oshmasligi kerak')
    .optional(),

  logo: z.string()
    .url({
      message: 'Logo noto\'g\'ri URL formatda',
    })
    .optional(),

  studentId: z.string({
    required_error: 'Talaba ID kiritilishi shart',
    invalid_type_error: 'Talaba ID matn bo\'lishi kerak',
  }),
});

/**
 * Startapni yangilash uchun validatsiya
 */
export const updateStartupSchema = z.object({
  name: z.string()
    .min(3, 'Startup nomi kamida 3 ta belgidan iborat bo\'lishi kerak')
    .max(100, 'Startup nomi 100 ta belgidan oshmasligi kerak')
    .trim()
    .optional(),

  description: z.string()
    .min(20, 'Tavsif kamida 20 ta belgidan iborat bo\'lishi kerak')
    .max(5000, 'Tavsif 5000 ta belgidan oshmasligi kerak')
    .trim()
    .optional(),

  stage: z.string()
    .min(1, 'Stage kamida 1 ta belgidan iborat bo\'lishi kerak')
    .max(50, 'Stage 50 ta belgidan oshmasligi kerak')
    .optional(),

  fundingGoal: z.string()
    .refine((val) => !val || !isNaN(Number(val)), {
      message: 'Finansiying maqdori raqam bo\'lishi kerak',
    })
    .refine((val) => !val || Number(val) > 0, {
      message: 'Finansiying maqdori musbat son bo\'lishi kerak',
    })
    .optional(),

  teamSize: z.number()
    .int()
    .positive()
    .optional(),

  website: z.string()
    .url({
      message: 'Website noto\'g\'ri URL formatda',
    })
    .optional(),

  pitch: z.string()
    .max(500, 'Pitch 500 ta belgidan oshmasligi kerak')
    .optional(),

  lookingFor: z.string()
    .max(200, 'Looking for 200 ta belgidan oshmasligi kerak')
    .optional(),

  timeline: z.string()
    .max(200, 'Timeline 200 ta belgidan oshmasligi kerak')
    .optional(),

  founderName: z.string()
    .max(100, 'Founder nomi 100 ta belgidan oshmasligi kerak')
    .optional(),

  founderEmail: z.string()
    .email({
      message: 'Noto\'g\'ri email format',
    })
    .optional(),

  founderUniversity: z.string()
    .max(100, 'Founder universiteti 100 ta belgidan oshmasligi kerak')
    .optional(),

  logo: z.string()
    .url({
      message: 'Logo noto\'g\'ri URL formatda',
    })
    .optional(),
});

/**
 * Status o'zgartirish uchun validatsiya
 */
export const updateStatusSchema = z.object({
  status: z.enum(['APPROVED', 'REJECTED'], {
    required_error: 'Status kiritilishi shart',
    invalid_type_error: 'Status APPROVED yoki REJECTED bo\'lishi kerak',
  }),

  rejectionReason: z.string()
    .min(10, 'Rad etish sababi kamida 10 ta belgidan iborat bo\'lishi kerak')
    .max(500, 'Rad etish sababi 500 ta belgidan oshmasligi kerak')
    .optional(),
}).refine((data) => {
  // Agar status REJECTED bo'lsa, rejectionReason bo'lishi shart
  if (data.status === 'REJECTED' && !data.rejectionReason) {
    return false;
  }
  return true;
}, {
  message: 'Rad etish sababi ko\'rsatilishi shart',
  path: ['rejectionReason'],
});

/**
 * Pagination query validatsiyasi
 */
export const paginationSchema = z.object({
  page: z.string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => val > 0, { message: 'Page musbat son bo\'lishi kerak' })
    .optional()
    .default('1'),

  limit: z.string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => val > 0 && val <= 100, { 
      message: 'Limit 1 dan 100 gacha bo\'lishi kerak' 
    })
    .optional()
    .default('10'),

  search: z.string().max(100).optional(),

  status: z.enum(['PENDING', 'APPROVED', 'REJECTED']).optional(),
});

export type CreateStartupInput = z.infer<typeof createStartupSchema>;
export type UpdateStartupInput = z.infer<typeof updateStartupSchema>;
export type UpdateStatusInput = z.infer<typeof updateStatusSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;