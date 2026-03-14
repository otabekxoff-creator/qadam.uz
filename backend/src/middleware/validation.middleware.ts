import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { ValidationError } from '@/utils/errors';

/**
 * Request body validatsiyasi
 */
export const validateBody = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors: Record<string, string[]> = {};
        error.errors.forEach((err) => {
          const path = err.path.join('.');
          if (!errors[path]) {
            errors[path] = [];
          }
          errors[path].push(err.message);
        });
        next(new ValidationError('Validatsiya xatosi', errors));
        return;
      }
      next(error);
    }
  };
};

/**
 * Query params validatsiyasi
 */
export const validateQuery = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.query = schema.parse(req.query) as any;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors: Record<string, string[]> = {};
        error.errors.forEach((err) => {
          const path = err.path.join('.');
          if (!errors[path]) {
            errors[path] = [];
          }
          errors[path].push(err.message);
        });
        next(new ValidationError('Query validatsiya xatosi', errors));
        return;
      }
      next(error);
    }
  };
};

/**
 * Route params validatsiyasi
 */
export const validateParams = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.params = schema.parse(req.params) as any;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors: Record<string, string[]> = {};
        error.errors.forEach((err) => {
          const path = err.path.join('.');
          if (!errors[path]) {
            errors[path] = [];
          }
          errors[path].push(err.message);
        });
        next(new ValidationError('Params validatsiya xatosi', errors));
        return;
      }
      next(error);
    }
  };
};

/**
 * Universal validate middleware
 * Body, query va params ni bir vaqtning o'zida validatsiya qilish
 */
export const validate = (schema: ZodSchema, source: 'body' | 'query' | 'params' = 'body') => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      let data: any;
      
      switch (source) {
        case 'body':
          data = schema.parse(req.body);
          req.body = data;
          break;
        case 'query':
          data = schema.parse(req.query);
          req.query = data;
          break;
        case 'params':
          data = schema.parse(req.params);
          req.params = data;
          break;
      }
      
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors: Record<string, string[]> = {};
        error.errors.forEach((err) => {
          const path = err.path.join('.');
          if (!errors[path]) {
            errors[path] = [];
          }
          errors[path].push(err.message);
        });
        
        const sourceName = {
          body: 'Body',
          query: 'Query',
          params: 'Params',
        }[source];
        
        next(new ValidationError(`${sourceName} validatsiya xatosi`, errors));
        return;
      }
      next(error);
    }
  };
};

/**
 * Combined validator
 * Body, query va params ni birga validatsiya qilish
 */
export const validateAll = (schemas: {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
}) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const errors: Record<string, string[]> = {};

      if (schemas.body) {
        try {
          req.body = schemas.body.parse(req.body);
        } catch (error) {
          if (error instanceof ZodError) {
            error.errors.forEach((err) => {
              const path = `body.${err.path.join('.')}`;
              if (!errors[path]) errors[path] = [];
              errors[path].push(err.message);
            });
          }
        }
      }

      if (schemas.query) {
        try {
          req.query = schemas.query.parse(req.query) as any;
        } catch (error) {
          if (error instanceof ZodError) {
            error.errors.forEach((err) => {
              const path = `query.${err.path.join('.')}`;
              if (!errors[path]) errors[path] = [];
              errors[path].push(err.message);
            });
          }
        }
      }

      if (schemas.params) {
        try {
          req.params = schemas.params.parse(req.params) as any;
        } catch (error) {
          if (error instanceof ZodError) {
            error.errors.forEach((err) => {
              const path = `params.${err.path.join('.')}`;
              if (!errors[path]) errors[path] = [];
              errors[path].push(err.message);
            });
          }
        }
      }

      if (Object.keys(errors).length > 0) {
        next(new ValidationError('Validatsiya xatosi', errors));
        return;
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
