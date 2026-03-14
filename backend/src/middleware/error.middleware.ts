import { Request, Response, NextFunction } from 'express';
import { 
  AppError, 
  ValidationError, 
  isAppError,
  handlePrismaError,
  formatZodError 
} from '@/utils/errors';
import logger from '@/config/logger';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

interface ErrorResponse {
  success: false;
  message: string;
  errorCode?: string;
  errors?: Record<string, string[]>;
  stack?: string;
  timestamp: string;
  path: string;
}

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  let statusCode = 500;
  let message = 'Server ichki xatosi';
  let errorCode = 'INTERNAL_SERVER_ERROR';
  let errors: Record<string, string[]> | undefined = undefined;

  logger.error('Error occurred:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    user: (req as any).user?.userId || 'anonymous',
    ip: req.ip,
  });

  // AppError
  if (isAppError(err)) {
    statusCode = err.statusCode;
    message = err.message;
    errorCode = err.errorCode || 'APP_ERROR';
    if (err instanceof ValidationError && err.errors) {
      errors = err.errors;
    }
  }
  // Prisma Error
  else if (err instanceof PrismaClientKnownRequestError) {
    const prismaError = handlePrismaError(err);
    statusCode = prismaError.statusCode;
    message = prismaError.message;
    errorCode = prismaError.errorCode || 'PRISMA_ERROR';
  }
  // Zod Error
  else if (err.name === 'ZodError') {
    const zodError = formatZodError(err);
    statusCode = zodError.statusCode;
    message = zodError.message;
    errorCode = zodError.errorCode || 'VALIDATION_ERROR';
    errors = zodError.errors;
  }
  // JWT Error
  else if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Token yaroqsiz';
    errorCode = 'INVALID_TOKEN';
  }
  else if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token muddati tugagan';
    errorCode = 'TOKEN_EXPIRED';
  }
  // Multer Error
  else if (err.name === 'MulterError') {
    statusCode = 400;
    errorCode = 'FILE_UPLOAD_ERROR';
    message = 'Fayl yuklashda xatolik';
  }

  const response: ErrorResponse = {
    success: false,
    message,
    errorCode,
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
  };

  if (errors) response.errors = errors;
  if (process.env.NODE_ENV === 'development') response.stack = err.stack;

  res.status(statusCode).json(response);
};

export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} topilmadi`,
    errorCode: 'ROUTE_NOT_FOUND',
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
  });
};

export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
