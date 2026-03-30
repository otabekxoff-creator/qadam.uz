/**
 * API Configuration
 * Centralized API settings and configuration
 */

// API Base URL
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://step-uz.onrender.com/api';

// API Timeout (in milliseconds)
export const API_TIMEOUT = 30000;

// API Version
export const API_VERSION = 'v1';

// Request Headers
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

// Pagination Defaults
export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 10;
export const MAX_LIMIT = 100;

// Cache Configuration
export const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Retry Configuration
export const MAX_RETRIES = 3;
export const RETRY_DELAY = 1000;

// Feature Flags
export const FEATURES = {
  ENABLE_CACHE: true,
  ENABLE_RETRY: true,
  ENABLE_OFFLINE_SUPPORT: false,
};
