/**
 * Backend Utilities
 * Common utility functions for backend
 */

import bcrypt from 'bcryptjs';
import crypto from 'crypto';

// ============================================================================
// Password Utilities
// ============================================================================

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
};

export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export const generateRandomPassword = (length: number = 12): string => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
};

// ============================================================================
// Token Utilities
// ============================================================================

export const generateRandomToken = (length: number = 32): string => {
  return crypto.randomBytes(length).toString('hex');
};

export const generateOTP = (length: number = 6): string => {
  return Math.floor(Math.random() * Math.pow(10, length)).toString().padStart(length, '0');
};

// ============================================================================
// String Utilities
// ============================================================================

export const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};

export const generateUniqueId = (): string => {
  return crypto.randomUUID();
};

export const truncate = (text: string, maxLength: number, suffix: string = '...'): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - suffix.length) + suffix;
};

export const sanitizeHtml = (html: string): string => {
  return html
    .replace(/<script[^>]*>.*?<\/script>/gi, '')
    .replace(/<style[^>]*>.*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, '');
};

// ============================================================================
// Date Utilities
// ============================================================================

export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const addHours = (date: Date, hours: number): Date => {
  const result = new Date(date);
  result.setHours(result.getHours() + hours);
  return result;
};

export const isExpired = (date: Date): boolean => {
  return new Date() > date;
};

export const formatDate = (date: Date, format: string = 'YYYY-MM-DD'): string => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');

  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes);
};

export const getRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'hozir';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} daqiqa oldin`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} soat oldin`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} kun oldin`;
  return formatDate(date);
};

// ============================================================================
// Number Utilities
// ============================================================================

export const formatNumber = (num: number, decimals: number = 0): string => {
  return num.toLocaleString('uz-UZ', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

export const formatCurrency = (amount: number, currency: string = 'UZS'): string => {
  return new Intl.NumberFormat('uz-UZ', {
    style: 'currency',
    currency,
  }).format(amount);
};

export const clamp = (num: number, min: number, max: number): number => {
  return Math.min(Math.max(num, min), max);
};

export const roundTo = (num: number, decimals: number): number => {
  const factor = Math.pow(10, decimals);
  return Math.round(num * factor) / factor;
};

// ============================================================================
// Array Utilities
// ============================================================================

export const shuffleArray = <T>(array: T[]): T[] => {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

export const chunkArray = <T>(array: T[], size: number): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

export const uniqueArray = <T>(array: T[]): T[] => {
  return [...new Set(array)];
};

// ============================================================================
// Object Utilities
// ============================================================================

export const pick = <T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> => {
  const result = {} as Pick<T, K>;
  keys.forEach((key) => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
};

export const omit = <T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> => {
  const result = { ...obj };
  keys.forEach((key) => {
    delete (result as any)[key];
  });
  return result;
};

export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T;
  if (Array.isArray(obj)) return obj.map(deepClone) as unknown as T;
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, deepClone(value)])
  ) as T;
};

// ============================================================================
// Validation Utilities
// ============================================================================

export const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const isValidPhone = (phone: string): boolean => {
  const regex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
  return regex.test(phone);
};

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const isStrongPassword = (password: string): boolean => {
  return password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9]/.test(password);
};

// ============================================================================
// File Utilities
// ============================================================================

export const generateFileName = (originalName: string): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  const extension = originalName.split('.').pop();
  return `${timestamp}-${random}.${extension}`;
};

export const getFileExtension = (filename: string): string => {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

// ============================================================================
// API Utilities
// ============================================================================

export const createSuccessResponse = <T>(data: T, message?: string) => ({
  success: true,
  data,
  message,
});

export const createErrorResponse = (message: string, statusCode: number = 400) => ({
  success: false,
  error: message,
  statusCode,
});

export const createPaginatedResponse = <T>(
  data: T[],
  total: number,
  page: number,
  limit: number
) => ({
  success: true,
  data,
  meta: {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    hasNext: page < Math.ceil(total / limit),
    hasPrev: page > 1,
  },
});

// ============================================================================
// Logger Utility
// ============================================================================

export const logger = {
  info: (message: string, meta?: any) => {
    console.log(`[INFO] ${new Date().toISOString()} - ${message}`, meta || '');
  },
  error: (message: string, error?: any) => {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, error || '');
  },
  warn: (message: string, meta?: any) => {
    console.warn(`[WARN] ${new Date().toISOString()} - ${message}`, meta || '');
  },
  debug: (message: string, meta?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[DEBUG] ${new Date().toISOString()} - ${message}`, meta || '');
    }
  },
};

// ============================================================================
// Export All
// ============================================================================

export default {
  hashPassword,
  verifyPassword,
  generateRandomPassword,
  generateRandomToken,
  generateOTP,
  slugify,
  generateUniqueId,
  truncate,
  sanitizeHtml,
  addDays,
  addHours,
  isExpired,
  formatDate,
  getRelativeTime,
  formatNumber,
  formatCurrency,
  clamp,
  roundTo,
  shuffleArray,
  chunkArray,
  uniqueArray,
  pick,
  omit,
  deepClone,
  isValidEmail,
  isValidPhone,
  isValidUrl,
  isStrongPassword,
  generateFileName,
  getFileExtension,
  formatFileSize,
  createSuccessResponse,
  createErrorResponse,
  createPaginatedResponse,
  logger,
};
