/**
 * Base Application Error Class
 * Barcha custom error'lar uchun asosiy sinf
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly errorCode?: string;

  constructor(
    message: string, 
    statusCode: number = 500, 
    isOperational: boolean = true,
    errorCode?: string
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errorCode = errorCode;
    
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * 400 - Bad Request / Validation Error
 */
export class ValidationError extends AppError {
  public readonly errors?: Record<string, string[]>;

  constructor(message: string = 'Validatsiya xatosi', errors?: Record<string, string[]>) {
    super(message, 400, true, 'VALIDATION_ERROR');
    this.errors = errors;
  }
}

/**
 * 401 - Unauthorized
 */
export class UnauthorizedError extends AppError {
  constructor(message: string = 'Avtorizatsiya talab qilinadi') {
    super(message, 401, true, 'UNAUTHORIZED');
  }
}

/**
 * 403 - Forbidden
 */
export class ForbiddenError extends AppError {
  constructor(message: string = 'Bu amalni bajarishga ruxsatingiz yo\'q') {
    super(message, 403, true, 'FORBIDDEN');
  }
}

/**
 * 404 - Not Found
 */
export class NotFoundError extends AppError {
  constructor(message: string = 'Resurs topilmadi') {
    super(message, 404, true, 'NOT_FOUND');
  }
}

/**
 * 409 - Conflict
 */
export class ConflictError extends AppError {
  constructor(message: string = 'Resurs allaqachon mavjud') {
    super(message, 409, true, 'CONFLICT');
  }
}

/**
 * 422 - Unprocessable Entity
 */
export class UnprocessableEntityError extends AppError {
  constructor(message: string = 'Ma\'lumotlarni qayta ishlab bo\'lmadi') {
    super(message, 422, true, 'UNPROCESSABLE_ENTITY');
  }
}

/**
 * 429 - Too Many Requests
 */
export class RateLimitError extends AppError {
  constructor(message: string = 'Juda ko\'p so\'rov yuborildi') {
    super(message, 429, true, 'RATE_LIMIT_EXCEEDED');
  }
}

/**
 * 500 - Internal Server Error
 */
export class InternalServerError extends AppError {
  constructor(message: string = 'Server ichki xatosi') {
    super(message, 500, false, 'INTERNAL_SERVER_ERROR');
  }
}

/**
 * Database Error
 */
export class DatabaseError extends AppError {
  constructor(message: string = 'Ma\'lumotlar bazasi xatosi') {
    super(message, 500, false, 'DATABASE_ERROR');
  }
}

/**
 * JWT Token Error
 */
export class TokenError extends AppError {
  constructor(message: string = 'Token yaroqsiz') {
    super(message, 401, true, 'TOKEN_ERROR');
  }
}

/**
 * Token Expired Error
 */
export class TokenExpiredError extends AppError {
  constructor(message: string = 'Token muddati tugagan') {
    super(message, 401, true, 'TOKEN_EXPIRED');
  }
}

/**
 * File Upload Error
 */
export class FileUploadError extends AppError {
  constructor(message: string = 'Fayl yuklashda xatolik') {
    super(message, 400, true, 'FILE_UPLOAD_ERROR');
  }
}

/**
 * Helper: Prisma error'ni custom error'ga aylantirish
 */
export function handlePrismaError(error: any): AppError {
  const prismaErrorCodes: Record<string, { message: string; statusCode: number }> = {
    P2002: { message: 'Bu ma\'lumot allaqachon mavjud', statusCode: 409 },
    P2025: { message: 'Ma\'lumot topilmadi', statusCode: 404 },
    P2003: { message: 'Bog\'liq ma\'lumot topilmadi', statusCode: 400 },
    P2014: { message: 'Noto\'g\'ri bog\'lanish', statusCode: 400 },
  };

  const errorCode = error.code as string;
  const errorInfo = prismaErrorCodes[errorCode];

  if (errorInfo) {
    return new AppError(errorInfo.message, errorInfo.statusCode, true, `PRISMA_${errorCode}`);
  }

  return new DatabaseError('Ma\'lumotlar bazasida xatolik');
}

/**
 * Helper: Zod error'ni formatlash
 */
export function formatZodError(error: any): ValidationError {
  const errors: Record<string, string[]> = {};
  
  if (error.errors) {
    error.errors.forEach((err: any) => {
      const path = err.path.join('.');
      if (!errors[path]) errors[path] = [];
      errors[path].push(err.message);
    });
  }

  return new ValidationError('Validatsiya xatosi', errors);
}

export function isAppError(error: any): error is AppError {
  return error instanceof AppError;
}
