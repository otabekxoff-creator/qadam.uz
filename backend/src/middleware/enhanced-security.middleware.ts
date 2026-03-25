import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';
import logger from '@/config/logger';
import type { Logger } from '@/config/logger';
import { 
  passwordComplexitySchema, 
  emailSchema, 
  sanitizeInput, 
  sanitizeSQLInput,
  securityHeaders,
  sessionValidation,
  calculatePasswordStrength
} from '@/utils/security-validator';

// Enhanced rate limiting with different tiers
export const createRateLimit = (options: {
  windowMs: number;
  max: number;
  message: string;
  skipSuccessfulRequests?: boolean;
}) => {
  return rateLimit({
    windowMs: options.windowMs,
    max: options.max,
    message: {
      success: false,
      message: options.message,
      errorCode: 'RATE_LIMIT_EXCEEDED',
    },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: options.skipSuccessfulRequests || false,
    handler: (req: Request, res: Response) => {
       (logger as Logger).security('Rate limit exceeded', {
         ip: req.ip,
         userAgent: req.get('User-Agent'),
         path: req.path,
         method: req.method,
       });
      res.status(429).json({
        success: false,
        message: options.message,
        errorCode: 'RATE_LIMIT_EXCEEDED',
      });
    },
  });
};

// Tiered rate limiting
export const strictRateLimit = createRateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Juda ko\'p so\'rov. Iltimos, 15 daqiqadan so\'ng urinib ko\'ring.',
});

export const authRateLimit = createRateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: 'Login urinishlari cheklangan. 15 daqiqadan so\'ng urinib ko\'ring.',
  skipSuccessfulRequests: true,
});

export const uploadRateLimit = createRateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  message: 'Fayl yuklash cheklangan. 1 soatdan so\'ng urinib ko\'ring.',
});

export const searchRateLimit = createRateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 30,
  message: 'Qidiruv so\'rovlari cheklangan. Bir ozdan so\'ng urinib ko\'ring.',
});

// Enhanced security headers
export const enhancedSecurityHeaders = (req: Request, res: Response, next: NextFunction) => {
  // Apply all security headers
  Object.entries(securityHeaders).forEach(([key, value]) => {
    if (value) {
      res.setHeader(key, value);
    }
  });

  // Content Security Policy
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https: https://step-backend.onrender.com",
    "connect-src 'self' https://step-backend.onrender.com",
    "media-src 'self'",
    "object-src 'none'",
    "frame-src 'none'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; ');

  res.setHeader('Content-Security-Policy', csp);

  // Remove server information
  res.removeHeader('X-Powered-By');
  
  next();
};

// Input sanitization and validation middleware
export const enhancedInputValidation = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Sanitize request body
    if (req.body) {
      req.body = sanitizeRequestBody(req.body);
    }

    // Sanitize query parameters
    if (req.query) {
      req.query = sanitizeQueryParams(req.query);
    }

    // Validate request size
    const contentLength = parseInt(req.headers['content-length'] || '0');
    const maxContentSize = 10 * 1024 * 1024; // 10MB

    if (contentLength > maxContentSize) {
       (logger as Logger).security('Request size exceeded', {
         ip: req.ip,
         contentLength,
         path: req.path,
       });
      
      return res.status(413).json({
        success: false,
        message: 'Request body judasi katta',
        errorCode: 'PAYLOAD_TOO_LARGE',
      });
    }

    // Validate User-Agent
    const userAgent = req.headers['user-agent'];
    if (!userAgent) {
       (logger as Logger).security('Missing User-Agent', {
         ip: req.ip,
         path: req.path,
       });
      
      return res.status(400).json({
        success: false,
        message: 'User-Agent header talab qilinadi',
        errorCode: 'MISSING_USER_AGENT',
      });
    }

    // Check for suspicious patterns
    const suspiciousPatterns = [
      /sqlmap/i,
      /nikto/i,
      /nmap/i,
      /burp/i,
      /metasploit/i,
      /shellshock/i,
      /apache-struts/i,
    ];

    if (suspiciousPatterns.some(pattern => pattern.test(userAgent))) {
       (logger as Logger).security('Suspicious User-Agent detected', {
         ip: req.ip,
         userAgent,
         path: req.path,
       });
      
      return res.status(403).json({
        success: false,
        message: 'Suspicious request detected',
        errorCode: 'SUSPICIOUS_REQUEST',
      });
    }

    next();
  } catch (error) {
    (logger as Logger).trackError(error as Error, { context: 'enhancedInputValidation' });
    next();
  }
};

// Password strength validation middleware
export const passwordStrengthValidation = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.body && req.body.password) {
      const password = req.body.password;
      
      // Validate password complexity
      const passwordValidation = passwordComplexitySchema.safeParse(password);
      if (!passwordValidation.success) {
        const strength = calculatePasswordStrength(password);
        
       (logger as Logger).security('Weak password attempt', {
         ip: req.ip,
         email: req.body.email,
         strength: strength.strength,
         path: req.path,
       });
        
        return res.status(400).json({
          success: false,
          message: 'Parol xavfsizlik talablariga mos kelmaydi',
          errorCode: 'WEAK_PASSWORD',
          details: {
            strength: strength.strength,
            feedback: strength.feedback,
          },
        });
      }
    }
    
    next();
  } catch (error) {
    (logger as Logger).trackError(error as Error, { context: 'passwordStrengthValidation' });
    next();
  }
};

// Email validation middleware
export const emailValidation = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.body && req.body.email) {
      const emailValidation = emailSchema.safeParse(req.body.email);
      if (!emailValidation.success) {
       (logger as Logger).security('Invalid email attempt', {
         ip: req.ip,
         email: req.body.email,
         path: req.path,
       });
        
        return res.status(400).json({
          success: false,
          message: 'Email manzili noto\'g\'ri formatda',
          errorCode: 'INVALID_EMAIL',
        });
      }
    }
    
    next();
  } catch (error) {
    (logger as Logger).trackError(error as Error, { context: 'emailValidation' });
    next();
  }
};

// Session security middleware
export const sessionSecurity = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Set secure session cookie settings
    const cookieOptions = {
      maxAge: sessionValidation.maxAge,
      httpOnly: sessionValidation.httpOnly,
      secure: sessionValidation.secure,
      sameSite: sessionValidation.sameSite,
      domain: sessionValidation.domain,
      path: '/',
    };

     // Apply session security headers
     res.setHeader('Set-Cookie', [
       `session=${(req as any).session?.id || ''}; ${Object.entries(cookieOptions)
         .map(([key, value]) => `${key}=${value}`)
         .join('; ')}`
     ]);

    next();
  } catch (error) {
    (logger as Logger).trackError(error as Error, { context: 'sessionSecurity' });
    next();
  }
};

// IP whitelist/blacklist middleware
export const ipFilter = (req: Request, res: Response, next: NextFunction) => {
  try {
    const clientIP = req.ip || req.connection.remoteAddress || 'unknown';
    
    // Whitelist for admin routes
    const adminRoutes = ['/api/admin'];
    const isAdminRoute = adminRoutes.some(route => req.path.startsWith(route));
    
    if (isAdminRoute) {
      const allowedIPs = process.env.ADMIN_ALLOWED_IPS?.split(',') || [];
      
      if (allowedIPs.length > 0 && !allowedIPs.includes(clientIP as string)) {
       (logger as Logger).security('Unauthorized admin access attempt', {
         ip: clientIP,
         path: req.path,
         userAgent: req.get('User-Agent'),
       });
        
        return res.status(403).json({
          success: false,
          message: 'Ruxsat etilmagan IP manzil',
          errorCode: 'IP_BLOCKED',
        });
      }
    }

    // Blacklist for known malicious IPs
    const blacklistedIPs = process.env.BLACKLISTED_IPS?.split(',') || [];
    
    if (blacklistedIPs.includes(clientIP as string)) {
       (logger as Logger).security('Blacklisted IP access attempt', {
         ip: clientIP,
         path: req.path,
         userAgent: req.get('User-Agent'),
       });
      
      return res.status(403).json({
        success: false,
        message: 'Kirish taqiqlangan',
        errorCode: 'IP_BLACKLISTED',
      });
    }

    next();
  } catch (error) {
    (logger as Logger).trackError(error as Error, { context: 'ipFilter' });
    next();
  }
};

// Request timeout middleware
export const requestTimeout = (timeoutMs: number = 30000) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const timeout = setTimeout(() => {
      if (!res.headersSent) {
       (logger as Logger).security('Request timeout', {
         ip: req.ip,
         path: req.path,
         method: req.method,
         timeout: timeoutMs,
       });
        
        res.status(408).json({
          success: false,
          message: 'Request timeout',
          errorCode: 'REQUEST_TIMEOUT',
        });
      }
    }, timeoutMs);

    res.on('finish', () => clearTimeout(timeout));
    res.on('close', () => clearTimeout(timeout));
    
    next();
  };
};

// Helper functions
function sanitizeRequestBody(body: any): any {
  if (typeof body === 'string') {
    return sanitizeInput(sanitizeSQLInput(body));
  }
  
  if (Array.isArray(body)) {
    return body.map(item => sanitizeRequestBody(item));
  }
  
  if (body && typeof body === 'object') {
    const sanitized: any = {};
    for (const [key, value] of Object.entries(body)) {
      if (typeof value === 'string') {
        sanitized[key] = sanitizeInput(sanitizeSQLInput(value));
      } else if (Array.isArray(value) || (value && typeof value === 'object')) {
        sanitized[key] = sanitizeRequestBody(value);
      } else {
        sanitized[key] = value;
      }
    }
    return sanitized;
  }
  
  return body;
}

function sanitizeQueryParams(query: any): any {
  const sanitized: any = {};
  for (const [key, value] of Object.entries(query)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeInput(sanitizeSQLInput(value));
    } else {
      sanitized[key] = value;
    }
  }
  return sanitized;
}

// Security audit middleware
export const securityAudit = (req: Request, res: Response, next: NextFunction) => {
  // Log security-relevant events
  const securityEvents = [
    { path: '/api/auth/login', event: 'LOGIN_ATTEMPT' },
    { path: '/api/auth/register', event: 'REGISTRATION_ATTEMPT' },
    { path: '/api/auth/forgot-password', event: 'PASSWORD_RESET_REQUEST' },
    { path: '/api/upload', event: 'FILE_UPLOAD' },
  ];

  const securityEvent = securityEvents.find(se => req.path.startsWith(se.path));
  
  if (securityEvent) {
    logger.security(securityEvent.event, {
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      path: req.path,
      method: req.method,
      timestamp: new Date().toISOString(),
    });
  }

  next();
};

export default {
  strictRateLimit,
  authRateLimit,
  uploadRateLimit,
  searchRateLimit,
  enhancedSecurityHeaders,
  enhancedInputValidation,
  passwordStrengthValidation,
  emailValidation,
  sessionSecurity,
  ipFilter,
  requestTimeout,
  securityAudit,
  createRateLimit,
};
