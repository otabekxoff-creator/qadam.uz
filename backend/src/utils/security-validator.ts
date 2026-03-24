import z from 'zod';

// Password complexity validation
export const passwordComplexitySchema = z.string()
  .min(8, 'Parol kamida 8 ta belgidan iborat bo\'lishi kerak')
  .max(128, 'Parol 128 ta belgidan oshmasligi kerak')
  .regex(/[A-Z]/, 'Parolda kamida bitta katta harf bo\'lishi kerak')
  .regex(/[a-z]/, 'Parolda kamida bitta kichik harf bo\'lishi kerak')
  .regex(/\d/, 'Parolda kamida bitta raqam bo\'lishi kerak')
  .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Parolda kamida bitta maxsus belgi (!@#$%^&*()) bo\'lishi kerak')
  .regex(/^(?!.*\s)(?!.*(.).*\1.*\1)/, 'Parolda bo\'sh joylar yoki takroriy belgilar bo\'lmasligi kerak');

// Enhanced email validation
export const emailSchema = z.string()
  .email('Email manzili noto\'g\'ri formatda')
  .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Email manzili noto\'g\'ri formatda')
  .max(254, 'Email manzili juda uzun');

// Phone number validation (Uzbekistan format)
export const phoneSchema = z.string()
  .regex(/^(\+998|998)?\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/, 'Telefon raqami O\'zbekiston formatida bo\'lishi kerak (+998 XX XXX XX XX)')
  .optional();

// Name validation (Cyrillic and Latin)
export const nameSchema = z.string()
  .min(2, 'Ism kamida 2 ta belgidan iborat bo\'lishi kerak')
  .max(50, 'Ism 50 ta belgidan oshmasligi kerak')
  .regex(/^[a-zA-Z\u0400-\u04FF\s'-]+$/, 'Ism faqat harflardan iborat bo\'lishi kerak')
  .transform(val => val.trim());

// URL validation
export const urlSchema = z.string()
  .url('URL manzili noto\'g\'ri formatda')
  .regex(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/, 'URL manzili noto\'g\'ri formatda')
  .optional();

// File upload validation
export const fileUploadSchema = z.object({
  fieldname: z.string(),
  originalname: z.string(),
  encoding: z.string(),
  mimetype: z.enum([
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ], {
    errorMap: () => ({ message: 'Faqat rasm (JPG, PNG, GIF, WebP) yoki PDF, DOC, DOCX fayllar ruxsat etilgan' }),
  }),
  size: z.number().max(5 * 1024 * 1024, 'Fayl hajmi 5MB dan oshmasligi kerak'),
});

// Input sanitization
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // XSS protection
    .replace(/javascript:/gi, '') // JavaScript protocol
    .replace(/on\w+\s*=/gi, '') // Event handlers
    .replace(/[\x00-\x1F\x7F]/g, '') // Control characters
    .trim();
};

// SQL injection prevention
export const sanitizeSQLInput = (input: string): string => {
  // Remove common SQL injection patterns
  const sqlPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT)\b)/gi,
    /(--|;|\/\*|\*\/|xp_|sp_)/gi,
    /(\b(OR|AND)\s+\d+\s*=\s*\d+)/gi,
  ];
  
  let sanitized = input;
  sqlPatterns.forEach(pattern => {
    sanitized = sanitized.replace(pattern, '');
  });
  
  return sanitized.trim();
};

// Rate limiting validation
export const rateLimitValidation = {
  email: { max: 5, windowMs: 15 * 60 * 1000 }, // 5 requests per 15 minutes
  login: { max: 5, windowMs: 15 * 60 * 1000 }, // 5 requests per 15 minutes
  register: { max: 3, windowMs: 60 * 60 * 1000 }, // 3 requests per hour
  upload: { max: 10, windowMs: 60 * 60 * 1000 }, // 10 uploads per hour
  search: { max: 100, windowMs: 15 * 60 * 1000 }, // 100 searches per 15 minutes
};

// Session security validation
export const sessionValidation = {
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
  secure: process.env.NODE_ENV === 'production',
  httpOnly: true,
  sameSite: 'strict' as const,
  domain: process.env.NODE_ENV === 'production' ? '.step-uz.onrender.com' : undefined,
};

// JWT token validation
export const jwtValidation = {
  secret: process.env.JWT_SECRET || 'fallback-secret-change-in-production',
  expiresIn: '7d',
  issuer: 'step-uz',
  audience: 'step-uz-users',
};

// Content Security Policy
export const cspDirectives = {
  'default-src': ["'self'"],
  'script-src': ["'self'", "'unsafe-inline'"],
  'style-src': ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
  'font-src': ["'self'", "https://fonts.gstatic.com"],
  'img-src': ["'self'", "data:", "https:", "https://step-backend.onrender.com"],
  'connect-src': ["'self'", "https://step-backend.onrender.com"],
  'media-src': ["'self'"],
  'object-src': ["'none'"],
  'frame-src': ["'none'"],
  'frame-ancestors': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'"],
};

// Input validation schemas
export const userRegistrationSchema = z.object({
  email: emailSchema,
  password: passwordComplexitySchema,
  firstName: nameSchema,
  lastName: nameSchema,
  role: z.enum(['STUDENT', 'COMPANY']),
  phone: phoneSchema,
});

export const userLoginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Parol kiritilishi shart'),
});

export const jobCreationSchema = z.object({
  title: z.string().min(3, 'Sarlavha kamida 3 ta belgidan iborat bo\'lishi kerak').max(100),
  description: z.string().min(10, 'Tavsif kamida 10 ta belgidan iborat bo\'lishi kerak').max(2000),
  requirements: z.string().max(2000).optional(),
  responsibilities: z.string().max(2000).optional(),
  benefits: z.string().max(1000).optional(),
  salary: z.string().max(50).optional(),
  location: z.string().min(2, 'Joylashuv ko\'rsatilishi shart').max(100),
  type: z.enum(['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP', 'REMOTE', 'HYBRID']),
  level: z.enum(['ENTRY_LEVEL', 'MID_LEVEL', 'SENIOR_LEVEL', 'EXECUTIVE']),
  industry: z.string().min(2, 'Soha ko\'rsatilishi shart').max(50),
  skills: z.array(z.string().max(30)).min(1, 'Kamida bitta ko\'nikma ko\'rsatilishi shart'),
});

export const startupCreationSchema = z.object({
  name: z.string().min(3, 'Nomi kamida 3 ta belgidan iborat bo\'lishi kerak').max(100),
  description: z.string().min(10, 'Tavsif kamida 10 ta belgidan iborat bo\'lishi kerak').max(2000),
  problem: z.string().min(10, 'Muammo kamida 10 ta belgidan iborat bo\'lishi kerak').max(1000),
  solution: z.string().min(10, 'Yechim kamida 10 ta belgidan iborat bo\'lishi kerak').max(1000),
  stage: z.enum(['IDEA', 'VALIDATION', 'MVP', 'GROWTH', 'SCALING']),
  fundingNeeded: z.number().min(0, 'Mablag\' miqdori manfiy bo\'lmasligi kerak').optional(),
  fundingCurrency: z.enum(['UZS', 'USD']).default('USD'),
  industry: z.string().max(50).optional(),
  tags: z.array(z.string().max(20)).max(10).optional(),
});

// Security middleware helpers
export const securityHeaders = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Strict-Transport-Security': process.env.NODE_ENV === 'production' ? 'max-age=31536000; includeSubDomains' : undefined,
};

// Password strength calculator
export const calculatePasswordStrength = (password: string): {
  score: number;
  feedback: string[];
  strength: 'weak' | 'fair' | 'good' | 'strong';
} => {
  const feedback: string[] = [];
  let score = 0;

  // Length check
  if (password.length >= 8) score += 1;
  else feedback.push('Parol kamida 8 ta belgidan iborat bo\'lishi kerak');

  if (password.length >= 12) score += 1;
  else feedback.push('Parolni uzunroq qilish tavsiya etiladi (12+ belgi)');

  // Character variety
  if (/[a-z]/.test(password)) score += 1;
  else feedback.push('Kichik harflar qo\'shing');

  if (/[A-Z]/.test(password)) score += 1;
  else feedback.push('Katta harflar qo\'shing');

  if (/\d/.test(password)) score += 1;
  else feedback.push('Raqamlar qo\'shing');

  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;
  else feedback.push('Maxsus belgilar qo\'shing');

  // Complexity patterns
  if (/(?!.*(.).*\1)/.test(password)) score += 1;
  else feedback.push('Takroriy belgilardan saqlaning');

  let strength: 'weak' | 'fair' | 'good' | 'strong' = 'weak';
  if (score >= 6) strength = 'strong';
  else if (score >= 5) strength = 'good';
  else if (score >= 3) strength = 'fair';

  return { score, feedback, strength };
};

// Security audit helper
export const securityAudit = {
  checkPasswordHash: (password: string, hash: string): boolean => {
    // This would integrate with bcrypt in actual implementation
    return hash.length >= 60; // Basic check for bcrypt hash length
  },
  
  validateSession: (session: any): boolean => {
    return session && 
           session.userId && 
           session.expiresAt && 
           new Date(session.expiresAt) > new Date();
  },
  
  sanitizeFilename: (filename: string): string => {
    return filename
      .replace(/[^a-zA-Z0-9.-]/g, '_')
      .replace(/_{2,}/g, '_')
      .toLowerCase();
  },
  
  validateFileType: (mimetype: string): boolean => {
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    return allowedTypes.includes(mimetype);
  },
};

export default {
  passwordComplexitySchema,
  emailSchema,
  phoneSchema,
  nameSchema,
  urlSchema,
  fileUploadSchema,
  sanitizeInput,
  sanitizeSQLInput,
  rateLimitValidation,
  sessionValidation,
  jwtValidation,
  cspDirectives,
  userRegistrationSchema,
  userLoginSchema,
  jobCreationSchema,
  startupCreationSchema,
  securityHeaders,
  calculatePasswordStrength,
  securityAudit,
};
