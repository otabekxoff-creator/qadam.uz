import winston from 'winston';
import path from 'path';

// Log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Log colors
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

winston.addColors(colors);

// Log format
const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}${
      info.stack || (info.splat && Array.isArray(info.splat) && info.splat.length > 0)
        ? ' ' + JSON.stringify(info.splat)
        : ''
    }`
  ),
);

// File format (no colors for files)
const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.errors({ stack: true }),
  winston.format.json(),
);

// Transports
const transports = [
  // Console transport
  new winston.transports.Console({
    format,
    level: process.env.LOG_LEVEL || 'info',
  }),
  
  // Error file transport
  new winston.transports.File({
    filename: path.join('logs', 'error.log'),
    level: 'error',
    format: fileFormat,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
  }),
  
  // Combined file transport
  new winston.transports.File({
    filename: path.join('logs', 'combined.log'),
    format: fileFormat,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
  }),
];

// Define the Logger interface with our custom methods
export interface Logger extends winston.Logger {
  performance: (message: string, meta?: any, context?: string) => void;
  security: (message: string, meta?: any, context?: string) => void;
  api: (method: string, url: string, statusCode: number, responseTime: number, meta?: any, context?: string) => void;
  trackError: (error: Error, context?: any) => void;
  cache: (message: string, meta?: any, context?: string) => void;
}

// Create logger instance and cast to our Logger interface
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  levels,
  format: fileFormat,
  transports,
  exitOnError: false,
}) as Logger;

// Performance monitoring
logger.performance = (message: string, meta?: any, context?: string) => {
  logger.info(`[PERFORMANCE] ${message}`, {
    ...meta,
    type: 'performance',
    timestamp: new Date().toISOString(),
    context,
  });
};

// Security logging
logger.security = (message: string, meta?: any, context?: string) => {
  logger.warn(`[SECURITY] ${message}`, {
    ...meta,
    type: 'security',
    timestamp: new Date().toISOString(),
    context,
  });
};

// API logging
logger.api = (method: string, url: string, statusCode: number, responseTime: number, meta?: any, context?: string) => {
  const level = statusCode >= 400 ? 'warn' : 'http';
  logger[level](`[API] ${method} ${url} - ${statusCode} - ${responseTime}ms`, {
    method,
    url,
    statusCode,
    responseTime,
    ...meta,
    type: 'api',
    timestamp: new Date().toISOString(),
    context,
  });
};

// Error tracking with context
logger.trackError = (error: Error, context?: any) => {
  logger.error(`[ERROR] ${error.message}`, {
    message: error.message,
    stack: error.stack,
    name: error.name,
    ...context,
    type: 'error',
    timestamp: new Date().toISOString(),
  });
};

// Cache logging
logger.cache = (message: string, meta?: any, context?: string) => {
  logger.info(`[CACHE] ${message}`, {
    ...meta,
    type: 'cache',
    timestamp: new Date().toISOString(),
    context,
  });
};

// Request logging middleware
export const requestLogger = (req: any, res: any, next: any) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const logData = {
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      duration,
      userAgent: req.get('User-Agent'),
      ip: req.ip || req.connection.remoteAddress,
      userId: req.user?.userId,
    };
    
    logger.api(req.method, req.originalUrl, res.statusCode, duration, logData);
  });
  
  next();
};

export default logger;