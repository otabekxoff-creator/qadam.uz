import { z } from 'zod';
import { StartupStatus } from '@prisma/client';

/**
 * Yangi startap yaratish uchun validatsiya
 */
export const createStartupSchema = z.object({
  title: z.string({
    required_error: 'Sarlavha kiritilishi shart',
    invalid_type_error: 'Sarlavha matn bo\'lishi kerak',
  })
    .min(5, 'Sarlavha kamida 5 ta belgidan iborat bo\'lishi kerak')
    .max(100, 'Sarlavha 100 ta belgidan oshmasligi kerak')
    .trim(),

  description: z.string({
    required_error: 'Tavsif kiritilishi shart',
    invalid_type_error: 'Tavsif matn bo\'lishi kerak',
  })
    .min(20, 'Tavsif kamida 20 ta belgidan iborat bo\'lishi kerak')
    .max(5000, 'Tavsif 5000 ta belgidan oshmasligi kerak')
    .trim(),

  goalAmount: z.union([
    z.string().transform((val) => parseFloat(val)),
    z.number(),
  ]).refine((val) => !isNaN(val) && val > 0, {
    message: 'Maqsad miqdori musbat son bo\'lishi kerak',
  }).refine((val) => val <= 300000000, {
    message: 'Maqsad miqdori 300 million so\'mdan oshmasligi kerak',
  }),
});

/**
 * Startapni yangilash uchun validatsiya
 */
export const updateStartupSchema = z.object({
  title: z.string()
    .min(5, 'Sarlavha kamida 5 ta belgidan iborat bo\'lishi kerak')
    .max(100, 'Sarlavha 100 ta belgidan oshmasligi kerak')
    .trim()
    .optional(),

  description: z.string()
    .min(20, 'Tavsif kamida 20 ta belgidan iborat bo\'lishi kerak')
    .max(5000, 'Tavsif 5000 ta belgidan oshmasligi kerak')
    .trim()
    .optional(),

  goalAmount: z.union([
    z.string().transform((val) => parseFloat(val)),
    z.number(),
  ]).refine((val) => !isNaN(val) && val > 0, {
    message: 'Maqsad miqdori musbat son bo\'lishi kerak',
  }).refine((val) => val <= 300000000, {
    message: 'Maqsad miqdori 300 million so\'mdan oshmasligi kerak',
  }).optional(),
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
