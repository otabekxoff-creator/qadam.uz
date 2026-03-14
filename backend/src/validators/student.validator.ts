import { z } from 'zod';

/**
 * Talaba profilini yangilash uchun validatsiya
 */
export const updateStudentProfileSchema = z.object({
  firstName: z.string()
    .min(2, 'Ism kamida 2 ta belgidan iborat bo\'lishi kerak')
    .max(50, 'Ism 50 ta belgidan oshmasligi kerak')
    .trim()
    .optional(),

  lastName: z.string()
    .min(2, 'Familiya kamida 2 ta belgidan iborat bo\'lishi kerak')
    .max(50, 'Familiya 50 ta belgidan oshmasligi kerak')
    .trim()
    .optional(),

  phone: z.string()
    .regex(/^\+?998\d{9}$/, 'Telefon raqam noto\'g\'ri formatda (+998XXXXXXXXX)')
    .optional()
    .or(z.literal('')),

  university: z.string()
    .min(2, 'Universitet nomi kamida 2 ta belgidan iborat bo\'lishi kerak')
    .max(100, 'Universitet nomi 100 ta belgidan oshmasligi kerak')
    .trim()
    .optional(),

  major: z.string()
    .min(2, 'Mutaxassislik kamida 2 ta belgidan iborat bo\'lishi kerak')
    .max(100, 'Mutaxassislik 100 ta belgidan oshmasligi kerak')
    .trim()
    .optional(),

  gpa: z.union([
    z.string().transform((val) => parseFloat(val)),
    z.number(),
  ]).refine((val) => !isNaN(val) && val >= 0 && val <= 5, {
    message: 'GPA 0 dan 5 gacha bo\'lishi kerak',
  }).optional(),

  about: z.string()
    .max(1000, 'O\'zim haqimda 1000 ta belgidan oshmasligi kerak')
    .trim()
    .optional(),

  skills: z.array(z.string().min(1).max(50)).optional(),
});

/**
 * Ariza holati query validatsiyasi
 */
export const applicationQuerySchema = z.object({
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

  status: z.enum(['PENDING', 'REVIEWING', 'ACCEPTED', 'REJECTED']).optional(),
});

export type UpdateStudentProfileInput = z.infer<typeof updateStudentProfileSchema>;
export type ApplicationQueryInput = z.infer<typeof applicationQuerySchema>;
