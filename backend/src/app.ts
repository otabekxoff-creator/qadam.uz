import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';

import { connectDatabase } from '@/config/database';
import logger from '@/config/logger';
import { errorHandler, notFoundHandler } from '@/middleware/error.middleware';
import { 
  strictRateLimit, 
  authRateLimit, 
  uploadRateLimit, 
  apiRateLimit,
  securityHeaders,
  sanitizeInput,
  validateRequest,
  sessionSecurity
} from '@/middleware/security.middleware';

import authRoutes from '@/routes/auth.routes';
import jobRoutes from '@/routes/job.routes';
import applicationRoutes from '@/routes/application.routes';
import startupRoutes from '@/routes/startup.routes';
import adminRoutes from '@/routes/admin.routes';
import studentRoutes from '@/routes/student.routes';
import companyRoutes from '@/routes/company.routes';
import notificationRoutes from '@/routes/notification.routes';
import chatRoutes from '@/routes/chat.routes';
import audioRoutes from '@/routes/audio.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Render proxy uchun sozlash
app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);

// 🔒 KUCHLI SECURITY HEADERS
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https:"],
      fontSrc: ["'self'", "data:"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));

// 🔒 CUSTOM SECURITY HEADERS
app.use(securityHeaders);

// 🔒 INPUT SANITIZATION
app.use(sanitizeInput);

// 🔒 REQUEST VALIDATION
app.use(validateRequest);

// 🔒 SESSION SECURITY
app.use(sessionSecurity);

// 🚨 RATE LIMITING - Global
app.use(strictRateLimit);

// 📝 Logging
app.use(morgan('combined', {
  stream: {
    write: (message: string) => logger.info(message.trim())
  }
}));

// 🗜️ Compression
app.use(compression());

// 🍪 Cookie Parser
app.use(cookieParser());

// 🌐 CORS - Enhanced Security
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'https://stepuz-frontend.onrender.com',
  'http://localhost:5173',
  'http://localhost:3000'
].filter(Boolean) as string[];

app.use(cors({
  origin: (origin: any, callback: any) => {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      logger.warn(`CORS violation: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['X-Total-Count', 'X-Page-Count'],
  maxAge: 86400, // 24 hours
}));

// 📦 Body Parser with limits
app.use(express.json({ 
  limit: '10mb',
  verify: (req: any, res: any, buf: Buffer) => {
    try {
      JSON.parse(buf.toString());
    } catch (e) {
      res.status(400).json({
        success: false,
        message: 'Invalid JSON',
        errorCode: 'INVALID_JSON'
      });
      return;
    }
  }
}));

app.use(express.urlencoded({ 
  extended: true, 
  limit: '10mb' 
}));

// 📁 Static files with security
app.use('/uploads', express.static('uploads', {
  maxAge: '1d',
  etag: true,
  lastModified: true,
  setHeaders: (res: any, path: any, stat: any) => {
    // Security headers for static files
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
  }
}));

// 🔒 API RATE LIMITING
app.use('/api', apiRateLimit);

// 🔒 AUTH RATE LIMITING
app.use('/api/auth', authRateLimit);

// 🔒 UPLOAD RATE LIMITING
app.use('/api/audio/upload', uploadRateLimit);

// 🏥 Health Check (barcha security'dan oldin)
app.get('/health', (req: any, res: any) => {
  res.status(200).json({
    success: true,
    message: 'Server is healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    version: process.env.npm_package_version || '1.0.0'
  });
});

// 🛡️ API Routes with security
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/startups', startupRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/audio', audioRoutes);

// 🚨 Error Handling
app.use(errorHandler);
app.use(notFoundHandler);

// 🔒 SERVER START
const startServer = async () => {
  try {
    await connectDatabase();
    
    app.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT}`);
      logger.info(`🌍 Environment: ${process.env.NODE_ENV}`);
      logger.info(`🔒 Security: Enhanced with multiple layers`);
      logger.info(`📊 Rate Limiting: Active`);
      logger.info(`🛡️ CORS: Configured`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
