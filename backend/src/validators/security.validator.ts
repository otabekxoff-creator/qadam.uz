import { z } from 'zod';
import { ValidationError } from '@/utils/errors';

// 🔒 VALIDATION SCHEMAS
export const schemas = {
  // Auth schemas
  register: z.object({
    email: z.string()
      .email('Noto\'g\'ri email format')
      .min(5, 'Email kamida 5 ta belgidan iborat bo\'lishi kerak')
      .max(100, 'Email 100 ta belgidan oshmasligi kerak')
      .toLowerCase(),
    password: z.string()
      .min(8, 'Parol kamida 8 ta belgidan iborat bo\'lishi kerak')
      .max(100, 'Parol 100 ta belgidan oshmasligi kerak')
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
        'Parolda kamida 1 ta kichik harf, 1 ta katta harf, 1 ta raqam va 1 ta maxsus belgi bo\'lishi kerak'),
    role: z.enum(['STUDENT', 'COMPANY'], {
      errorMap: () => ({ message: 'Faqat STUDENT yoki COMPANY rollari ruxsat etiladi' })
    }),
    firstName: z.string()
      .min(2, 'Ism kamida 2 ta belgidan iborat bo\'lishi kerak')
      .max(50, 'Ism 50 ta belgidan oshmasligi kerak')
      .regex(/^[a-zA-Z'\u0400-\u04FF\s-]+$/, 'Ism faqat harflardan iborat bo\'lishi kerak'),
    lastName: z.string()
      .min(2, 'Familiya kamida 2 ta belgidan iborat bo\'lishi kerak')
      .max(50, 'Familiya 50 ta belgidan oshmasligi kerak')
      .regex(/^[a-zA-Z'\u0400-\u04FF\s-]+$/, 'Familiya faqat harflardan iborat bo\'lishi kerak'),
  }),

  login: z.object({
    email: z.string()
      .email('Noto\'g\'ri email format')
      .toLowerCase(),
    password: z.string()
      .min(1, 'Parol talab qilinadi'),
  }),

  // Job schemas
  createJob: z.object({
    title: z.string()
      .min(3, 'Lavozim nomi kamida 3 ta belgidan iborat bo\'lishi kerak')
      .max(100, 'Lavozim nomi 100 ta belgidan oshmasligi kerak'),
    description: z.string()
      .min(10, 'Tavsif kamida 10 ta belgidan iborat bo\'lishi kerak')
      .max(2000, 'Tavsif 2000 ta belgidan oshmasligi kerak'),
    jobType: z.enum(['FULL_TIME', 'PART_TIME', 'INTERNSHIP', 'REMOTE'], {
      errorMap: () => ({ message: 'Noto\'g\'ri ish turi' })
    }),
    location: z.string()
      .min(2, 'Joylashuv kamida 2 ta belgidan iborat bo\'lishi kerak')
      .max(100, 'Joylashuv 100 ta belgidan oshmasligi kerak'),
    salaryMin: z.number()
      .min(0, 'Minimal maosh 0 dan katta bo\'lishi kerak')
      .max(100000000, 'Juda katta maosh'),
    salaryMax: z.number()
      .min(0, 'Maksimal maosh 0 dan katta bo\'lishi kerak')
      .max(100000000, 'Juda katta maosh'),
    currency: z.enum(['UZS', 'USD'], {
      errorMap: () => ({ message: 'Faqat UZS yoki USD valyutasi ruxsat etiladi' })
    }),
    skills: z.array(z.string()
      .min(2, 'Skill kamida 2 ta belgidan iborat bo\'lishi kerak')
      .max(30, 'Skill 30 ta belgidan oshmasligi kerak'))
      .min(1, 'Kamida 1 ta skill talab qilinadi')
      .max(10, '10 ta gina skill kiritish mumkin'),
    isRemote: z.boolean().default(false),
  }),

  // Application schemas
  createApplication: z.object({
    jobId: z.string()
      .uuid('Noto\'g\'ri job ID format'),
    coverLetter: z.string()
      .min(10, 'Cover letter kamida 10 ta belgidan iborat bo\'lishi kerak')
      .max(1000, 'Cover letter 1000 ta belgidan oshmasligi kerak'),
    resumeUrl: z.string()
      .url('Noto\'g\'ri resume URL format')
      .optional(),
  }),

  // Chat schemas
  createMessage: z.object({
    content: z.string()
      .min(1, 'Xabar bo\'sh bo\'lishi mumkin emas')
      .max(2000, 'Xabar 2000 ta belgidan oshmasligi kerak'),
    type: z.enum(['TEXT', 'VOICE', 'IMAGE', 'FILE'], {
      errorMap: () => ({ message: 'Noto\'g\'ri xabar turi' })
    }).default('TEXT'),
    metadata: z.object({}).optional(),
  }),

  // Startup schemas
  createStartup: z.object({
    title: z.string()
      .min(3, 'Startap nomi kamida 3 ta belgidan iborat bo\'lishi kerak')
      .max(100, 'Startap nomi 100 ta belgidan oshmasligi kerak'),
    description: z.string()
      .min(50, 'Tavsif kamida 50 ta belgidan iborat bo\'lishi kerak')
      .max(2000, 'Tavsif 2000 ta belgidan oshmasligi kerak'),
    stage: z.enum(['IDEA', 'MVP', 'SEED', 'SERIES_A'], {
      errorMap: () => ({ message: 'Noto\'g\'ri startap bosqichi' })
    }),
    fundingGoal: z.string()
      .regex(/^\$[\d,]+$/, 'Noto\'g\'ri funding format (masalan: $50,000)'),
    teamSize: z.enum(['1-2', '3-5', '6-10', '11-20', '20+'], {
      errorMap: () => ({ message: 'Noto\'g\'ri jamoa hajmi' })
    }),
    website: z.string()
      .url('Noto\'g\'ri website URL')
      .optional(),
  }),
};

// 🔒 SANITIZATION FUNCTIONS
export const sanitize = {
  string: (input: string): string => {
    return input
      .trim()
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // XSS protection
      .replace(/javascript:/gi, '') // JavaScript protocol
      .replace(/on\w+\s*=/gi, '') // Event handlers
      .replace(/["'<>]/g, '') // HTML entities
      .slice(0, 1000); // Max length
  },

  email: (email: string): string => {
    return email
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9@._-]/g, ''); // Faqat email uchun belgilar
  },

  phone: (phone: string): string => {
    return phone
      .replace(/[^\d+]/g, '') // Faqat raqamlar va +
      .slice(0, 20); // Max length
  },

  url: (url: string): string => {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    return url.slice(0, 500);
  },
};

// 🔒 VALIDATION MIDDLEWARE
export const validate = (schema: any, property: 'body' | 'query' | 'params' = 'body') => {
  return (req: any, res: any, next: any) => {
    try {
      const data = req[property];
      
      // Sanitization
      if (property === 'body' && typeof data === 'object') {
        Object.keys(data).forEach(key => {
          if (typeof data[key] === 'string') {
            data[key] = sanitize.string(data[key]);
          }
        });
      }

      const result = schema.safeParse(data);
      
      if (!result.success) {
        const errors: Record<string, string[]> = {};
        result.error.errors.forEach((error: any) => {
          const path = error.path.join('.');
          if (!errors[path]) errors[path] = [];
          errors[path].push(error.message);
        });

        throw new ValidationError('Validatsiya xatosi', errors);
      }

      req[property] = result.data;
      next();
    } catch (error) {
      next(error);
    }
  };
};

// 🔒 SECURITY VALIDATORS
export const securityValidators = {
  // SQL Injection prevention
  preventSQLInjection: (input: string): boolean => {
    const sqlPatterns = [
      /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT)\b)/i,
      /(\/\*.*\*\/|--)/i,
      /(\bOR\b|\bAND\b)\s+\d+\s*=\s*\d+/i,
      /(\bWHERE\b\s+\d+\s*=\s*\d+)/i,
    ];

    return !sqlPatterns.some(pattern => pattern.test(input));
  },

  // XSS prevention
  preventXSS: (input: string): boolean => {
    const xssPatterns = [
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      /javascript:/gi,
      /on\w+\s*=/gi,
      /<iframe\b[^>]*>/gi,
      /<object\b[^>]*>/gi,
      /<embed\b[^>]*>/gi,
    ];

    return !xssPatterns.some(pattern => pattern.test(input));
  },

  // File upload security
  validateFileUpload: (file: any) => {
    const allowedMimeTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'application/pdf',
      'text/plain',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new ValidationError('Fayl turi ruxsat etilmagan');
    }

    if (file.size > maxSize) {
      throw new ValidationError('Fayl hajmi juda katta (maksimal: 5MB)');
    }

    // Malicious filename check
    const maliciousPatterns = [
      /\.exe$/i,
      /\.bat$/i,
      /\.cmd$/i,
      /\.scr$/i,
      /\.pif$/i,
      /\.com$/i,
    ];

    if (maliciousPatterns.some(pattern => pattern.test(file.originalname))) {
      throw new ValidationError('Xavfli fayl nomi');
    }

    return true;
  },
};

// 🔒 RATE LIMITING VALIDATION
export const rateLimitValidation = {
  // Check if user is rate limited
  isRateLimited: (userIdentifier: string, action: string): boolean => {
    // This would typically use Redis or database
    // For now, return false (no rate limiting)
    return false;
  },

  // Record action for rate limiting
  recordAction: (userIdentifier: string, action: string): void => {
    // This would typically use Redis or database
    console.log(`Recorded action: ${action} by ${userIdentifier}`);
  },
};
