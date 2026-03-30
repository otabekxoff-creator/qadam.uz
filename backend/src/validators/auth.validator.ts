import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['STUDENT', 'COMPANY']),
  firstName: z.string().min(2, 'First name is required').optional(),
  lastName: z.string().min(2, 'Last name is required').optional(),
  companyName: z.string().min(2, 'Company name is required').optional(),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = registerSchema.safeParse(req.body);
    
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: result.error.issues.map((e: any) => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      });
    }
    
    next();
  } catch (error) {
    next(error);
  }
};

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = loginSchema.safeParse(req.body);
    
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: result.error.issues.map((e: any) => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      });
    }
    
    next();
  } catch (error) {
    next(error);
  }
};
