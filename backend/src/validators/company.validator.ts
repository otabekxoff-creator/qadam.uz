import { z } from 'zod';

/**
 * Kompaniya hajmi optionlari
 */
const COMPANY_SIZES = ['1-10', '11-50', '51-200', '201-500', '500+'] as const;

/**
 * Kompaniya profilini yangilash uchun validatsiya
 */
export const updateCompanyProfileSchema = z.object({
  name: z.string()
    .min(2, 'Kompaniya nomi kamida 2 ta belgidan iborat bo\'lishi kerak')
    .max(100, 'Kompaniya nomi 100 ta belgidan oshmasligi kerak')
    .trim()
    .optional(),

  description: z.string()
    .min(20, 'Tavsif kamida 20 ta belgidan iborat bo\'lishi kerak')
    .max(2000, 'Tavsif 2000 ta belgidan oshmasligi kerak')
    .trim()
    .optional(),

  industry: z.string()
    .min(2, 'Sanoat turi kamida 2 ta belgidan iborat bo\'lishi kerak')
    .max(50, 'Sanoat turi 50 ta belgidan oshmasligi kerak')
    .trim()
    .optional(),

  website: z.string()
    .url('Website URL noto\'g\'ri formatda')
    .max(200, 'Website URL 200 ta belgidan oshmasligi kerak')
    .optional()
    .or(z.literal('')),

  location: z.string()
    .min(2, 'Manzil kamida 2 ta belgidan iborat bo\'lishi kerak')
    .max(100, 'Manzil 100 ta belgidan oshmasligi kerak')
    .trim()
    .optional(),

  size: z.enum(COMPANY_SIZES, {
    errorMap: () => ({ message: `Kompaniya hajmi quyidagilardan biri bo'lishi kerak: ${COMPANY_SIZES.join(', ')}` })
  }).optional(),
});

/**
 * Ariza holatini o'zgartirish validatsiyasi
 */
export const updateApplicationStatusSchema = z.object({
  status: z.enum(['REVIEWING', 'ACCEPTED', 'REJECTED'], {
    required_error: 'Status kiritilishi shart',
    invalid_type_error: 'Status noto\'g\'ri',
  }),

  feedback: z.string()
    .max(500, 'Feedback 500 ta belgidan oshmasligi kerak')
    .optional(),
});

/**
 * Kompaniya query validatsiyasi
 */
export const companyQuerySchema = z.object({
  page: z.string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => val > 0, { message: 'Page musbat son bo\'lishi kerak' })
    .optional()
    .default('1'),

  limit: z.string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => val > 0 && val <= 50, { 
      message: 'Limit 1 dan 50 gacha bo\'lishi kerak' 
    })
    .optional()
    .default('10'),

  industry: z.string().max(50).optional(),
  
  search: z.string().max(100).optional(),
});

export type UpdateCompanyProfileInput = z.infer<typeof updateCompanyProfileSchema>;
export type UpdateApplicationStatusInput = z.infer<typeof updateApplicationStatusSchema>;
export type CompanyQueryInput = z.infer<typeof companyQuerySchema>;
