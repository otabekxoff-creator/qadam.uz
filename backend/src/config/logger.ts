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

// Create logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  levels,
  format: fileFormat,
  transports,
  exitOnError: false,
});

// Add console transport in development
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format,
  }));
}

// Performance monitoring
(logger as any).performance = (message: string, meta?: any) => {
  logger.info(`[PERFORMANCE] ${message}`, {
    ...meta,
    type: 'performance',
    timestamp: new Date().toISOString(),
  });
};

// Security logging
(logger as any).security = (message: string, meta?: any) => {
  logger.warn(`[SECURITY] ${message}`, {
    ...meta,
    type: 'security',
    timestamp: new Date().toISOString(),
  });
};

// API logging
(logger as any).api = (method: string, url: string, statusCode: number, responseTime: number, meta?: any) => {
  const level = statusCode >= 400 ? 'warn' : 'http';
  logger[level](`[API] ${method} ${url} - ${statusCode} - ${responseTime}ms`, {
    method,
    url,
    statusCode,
    responseTime,
    ...meta,
    type: 'api',
    timestamp: new Date().toISOString(),
  });
};

// Error tracking with context
(logger as any).trackError = (error: Error, context?: any) => {
  logger.error(`[ERROR] ${error.message}`, {
    message: error.message,
    stack: error.stack,
    name: error.name,
    ...context,
    type: 'error',
    timestamp: new Date().toISOString(),
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
    
    (logger as any).api(req.method, req.originalUrl, res.statusCode, duration, logData);
  });
  
  next();
};

export default logger;
