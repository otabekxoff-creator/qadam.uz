import rateLimit from 'express-rate-limit';
import { Request, Response } from 'express';
import { AppError } from '@/utils/errors';

// 🔒 KUCHLI RATE LIMITING - DDoS ATTACK PREVENTION
export const strictRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 daqiqa
  max: 100, // IP uchun 100 ta so'rov
  message: {
    success: false,
    message: 'Juda ko\'p so\'rov. Iltimos, keyinroq urinib ko\'ring.',
    errorCode: 'RATE_LIMIT_EXCEEDED'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req: Request) => {
    // Health check lar uchun limit qo'llanilmasin
    return req.path === '/health' || req.path === '/api/health';
  }
});

// 🔐 AUTH RATE LIMITING - Login/Register uchun
export const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 daqiqa
  max: 5, // Faqat 5 ta urinish
  message: {
    success: false,
    message: 'Login urinishlari cheklangan. 15 daqiqadan so\'ng urinib ko\'ring.',
    errorCode: 'AUTH_RATE_LIMIT'
  },
  skipSuccessfulRequests: true,
});

// 📁 FILE UPLOAD RATE LIMITING
export const uploadRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 soat
  max: 10, // 10 ta fayl yuklash
  message: {
    success: false,
    message: 'Fayl yuklash cheklangan. Keyinroq urinib ko\'ring.',
    errorCode: 'UPLOAD_RATE_LIMIT'
  }
});

// 🚨 API RATE LIMITING - Umumiy API uchun
export const apiRateLimit = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 daqiqa
  max: 60, // 60 ta so'rov
  message: {
    success: false,
    message: 'API so\'rovlari cheklangan.',
    errorCode: 'API_RATE_LIMIT'
  }
});

// 🔍 IP WHITELISTING (Production uchun)
export const ipWhitelist = (req: Request, res: Response, next: Function) => {
  const allowedIPs = process.env.ALLOWED_IPS?.split(',') || [];
  const clientIP = req.ip || req.connection.remoteAddress;
  
  if (process.env.NODE_ENV === 'production' && allowedIPs.length > 0) {
    if (!allowedIPs.includes(clientIP as string)) {
      return res.status(403).json({
        success: false,
        message: 'Ruxsat etilmagan IP manzil',
        errorCode: 'IP_BLOCKED'
      });
    }
  }
  
  next();
};

// 🔒 SECURITY HEADERS
export const securityHeaders = (req: Request, res: Response, next: Function) => {
  // CSP (Content Security Policy)
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:; media-src 'self' https:; object-src 'none'; frame-src 'none';"
  );
  
  // X-Frame-Options
  res.setHeader('X-Frame-Options', 'DENY');
  
  // X-Content-Type-Options
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // Referrer Policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Permissions Policy
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  next();
};

// 🔐 INPUT SANITIZATION
export const sanitizeInput = (req: Request, res: Response, next: Function) => {
  const sanitizeString = (str: string): string => {
    return str
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // XSS protection
      .replace(/javascript:/gi, '') // JavaScript protocol
      .replace(/on\w+\s*=/gi, '') // Event handlers
      .trim();
  };

  const sanitizeObject = (obj: any): any => {
    if (typeof obj === 'string') {
      return sanitizeString(obj);
    } else if (Array.isArray(obj)) {
      return obj.map(sanitizeObject);
    } else if (obj && typeof obj === 'object') {
      const sanitized: any = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          sanitized[key] = sanitizeObject(obj[key]);
        }
      }
      return sanitized;
    }
    return obj;
  };

  // Request body ni sanitize qilish
  if (req.body) {
    req.body = sanitizeObject(req.body);
  }

  // Query params ni sanitize qilish
  if (req.query) {
    req.query = sanitizeObject(req.query);
  }

  next();
};

// 🚨 REQUEST VALIDATION
export const validateRequest = (req: Request, res: Response, next: Function) => {
  // Content-Length tekshirish
  const contentLength = parseInt(req.headers['content-length'] || '0');
  const maxContentSize = 10 * 1024 * 1024; // 10MB
  
  if (contentLength > maxContentSize) {
    return res.status(413).json({
      success: false,
      message: 'Request body judasi katta',
      errorCode: 'PAYLOAD_TOO_LARGE'
    });
  }

  // User-Agent tekshirish
  const userAgent = req.headers['user-agent'];
  if (!userAgent) {
    return res.status(400).json({
      success: false,
      message: 'User-Agent header talab qilinadi',
      errorCode: 'MISSING_USER_AGENT'
    });
  }

  // Suspicious patterns tekshirish
  const suspiciousPatterns = [
    /sqlmap/i,
    /nikto/i,
    /nmap/i,
    /burp/i,
    /metasploit/i
  ];

  if (suspiciousPatterns.some(pattern => pattern.test(userAgent))) {
    return res.status(403).json({
      success: false,
      message: 'Suspicious request detected',
      errorCode: 'SUSPICIOUS_REQUEST'
    });
  }

  next();
};

// 🔒 SESSION SECURITY
export const sessionSecurity = (req: Request, res: Response, next: Function) => {
  // Secure session settings
  res.setHeader('Set-Cookie', [
    'HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=3600'
  ].join('; '));

  next();
};
