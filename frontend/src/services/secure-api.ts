// =============================================
// 🔒 Enhanced API Client with Security
// =============================================

import { logger } from '@/utils/logger';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// 🔒 Security Configuration
const SECURITY_CONFIG = {
  maxRetries: 3,
  retryDelay: 1000,
  timeout: 30000,
  rateLimitDelay: 1000,
  maxConcurrentRequests: 10,
};

// 🔒 Request Queue for Rate Limiting
class RequestQueue {
  private queue: Array<() => Promise<any>> = [];
  private running: number = 0;
  private maxConcurrent: number;

  constructor(maxConcurrent: number = SECURITY_CONFIG.maxConcurrentRequests) {
    this.maxConcurrent = maxConcurrent;
  }

  async add<T>(request: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await request();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
      this.process();
    });
  }

  private async process() {
    if (this.running >= this.maxConcurrent || this.queue.length === 0) {
      return;
    }

    this.running++;
    const request = this.queue.shift();
    if (request) {
      try {
        await request();
      } finally {
        this.running--;
        this.process();
      }
    }
  }
}

// 🔒 Enhanced API Client
class ApiClient {
  private baseUrl: string;
  private token: string | null = null;
  private requestQueue: RequestQueue;
  private lastRequestTime: number = 0;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.requestQueue = new RequestQueue();
    if (typeof window !== 'undefined') {
      this.token = this.getSecureToken();
    }
  }

  // 🔒 Secure Token Storage
  private getSecureToken(): string | null {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const token = localStorage.getItem('token');
        if (token) {
          // Token validation
          if (this.isValidToken(token)) {
            return token;
          } else {
            this.removeToken();
            return null;
          }
        }
      }
    } catch (error) {
      logger.warn('Token retrieval failed', { error: error?.message || 'Unknown error' }, 'SecureAPI');
    }
    return null;
  }

  private isValidToken(token: string): boolean {
    try {
      // Basic JWT structure validation
      const parts = token.split('.');
      if (parts.length !== 3) return false;

      // Decode payload (without verification)
      const payload = JSON.parse(atob(parts[1]));
      const now = Date.now() / 1000;

      // Check expiration
      if (payload.exp && payload.exp < now) {
        return false;
      }

      return true;
    } catch (error) {
      return false;
    }
  }

  private setSecureToken(token: string | null) {
    this.token = token;
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        if (token) {
          localStorage.setItem('token', token);
          // Set secure cookie as backup
          document.cookie = `auth_token=${token}; path=/; max-age=3600; SameSite=Strict; ${window.location.protocol === 'https:' ? 'Secure;' : ''}`;
        } else {
          this.removeToken();
        }
      } catch (error) {
        logger.warn('Token storage failed', { error: error?.message || 'Unknown error' }, 'SecureAPI');
      }
    }
  }

  private removeToken() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem('token');
      }
      // Remove backup cookie
      document.cookie = 'auth_token=; path=/; max-age=0; SameSite=Strict;';
    } catch (error) {
      logger.warn('Token removal failed', { error: error?.message || 'Unknown error' }, 'SecureAPI');
    }
  }

  // 🔒 Rate Limiting
  private async checkRateLimit(): Promise<void> {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    
    if (timeSinceLastRequest < SECURITY_CONFIG.rateLimitDelay) {
      const delay = SECURITY_CONFIG.rateLimitDelay - timeSinceLastRequest;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    
    this.lastRequestTime = Date.now();
  }

  // 🔒 Input Sanitization
  private sanitizeInput(data: any): any {
    if (typeof data === 'string') {
      return data
        .trim()
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // XSS protection
        .replace(/javascript:/gi, '') // JavaScript protocol
        .replace(/on\w+\s*=/gi, '') // Event handlers
        .slice(0, 1000); // Max length
    } else if (Array.isArray(data)) {
      return data.map(item => this.sanitizeInput(item));
    } else if (data && typeof data === 'object') {
      const sanitized: any = {};
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          sanitized[key] = this.sanitizeInput(data[key]);
        }
      }
      return sanitized;
    }
    return data;
  }

  // 🔒 Secure Headers
  private getSecureHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    // Add security headers
    headers['X-Content-Type-Options'] = 'nosniff';
    headers['X-Frame-Options'] = 'DENY';

    return headers;
  }

  // 🔒 Enhanced Request with Security
  private async secureRequest<T>(
    endpoint: string,
    options: RequestInit = {},
    customConfig: { skipQueue?: boolean; skipRateLimit?: boolean } = {}
  ): Promise<T> {
    const { skipQueue = false, skipRateLimit = false } = customConfig;

    const makeRequest = async (): Promise<T> => {
      try {
        // Rate limiting
        if (!skipRateLimit) {
          await this.checkRateLimit();
        }

        // Sanitize input data
        if (options.body && typeof options.body === 'string') {
          try {
            const data = JSON.parse(options.body);
            const sanitizedData = this.sanitizeInput(data);
            options.body = JSON.stringify(sanitizedData);
          } catch (error) {
            // Not JSON, skip sanitization
          }
        }

        // Enhanced fetch with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), SECURITY_CONFIG.timeout);

        const response = await fetch(`${this.baseUrl}${endpoint}`, {
          ...options,
          headers: {
            ...this.getSecureHeaders(),
            ...options.headers,
          },
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        // Security checks
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          
          // Handle security-related errors
          if (response.status === 401) {
            this.setSecureToken(null);
            window.location.href = '/login';
            throw new Error('Authentication required');
          }
          
          if (response.status === 403) {
            throw new Error('Access forbidden');
          }
          
          if (response.status === 429) {
            throw new Error('Too many requests');
          }

          throw new Error(errorData.message || `HTTP ${response.status}`);
        }

        // Validate response
        const data = await response.json();
        
        // Basic response validation
        if (typeof data === 'object' && data !== null) {
          // Check for potential XSS in response
          const jsonString = JSON.stringify(data);
          if (/<script|javascript:|on\w+=/i.test(jsonString)) {
            logger.warn('Potential XSS detected in response', { response: jsonString.substring(0, 100) }, 'SecureAPI');
          }
        }

        return data;
      } catch (error) {
        // Handle network errors
        if (error instanceof Error) {
          if (error.name === 'AbortError') {
            throw new Error('Request timeout');
          }
          
          if (error.message.includes('Failed to fetch')) {
            throw new Error('Network error');
          }
        }
        
        throw error;
      }
    };

    // Use request queue or direct request
    if (skipQueue) {
      return makeRequest();
    } else {
      return this.requestQueue.add(makeRequest);
    }
  }

  // 🔒 Public API Methods with Security
  async get<T>(endpoint: string, params?: Record<string, any>, customConfig?: any): Promise<T> {
    let url = endpoint;
    if (params) {
      const sanitizedParams = this.sanitizeInput(params);
      const searchParams = new URLSearchParams();
      Object.entries(sanitizedParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
      url += `?${searchParams.toString()}`;
    }

    return this.secureRequest<T>(url, { method: 'GET' }, customConfig);
  }

  async post<T>(endpoint: string, data?: any, customConfig?: any): Promise<T> {
    const sanitizedData = data ? this.sanitizeInput(data) : undefined;
    
    return this.secureRequest<T>(endpoint, {
      method: 'POST',
      body: sanitizedData ? JSON.stringify(sanitizedData) : undefined,
    }, customConfig);
  }

  async put<T>(endpoint: string, data?: any, customConfig?: any): Promise<T> {
    const sanitizedData = data ? this.sanitizeInput(data) : undefined;
    
    return this.secureRequest<T>(endpoint, {
      method: 'PUT',
      body: sanitizedData ? JSON.stringify(sanitizedData) : undefined,
    }, customConfig);
  }

  async delete<T>(endpoint: string, customConfig?: any): Promise<T> {
    return this.secureRequest<T>(endpoint, { method: 'DELETE' }, customConfig);
  }

  // 🔒 File Upload with Security
  async uploadFile<T>(endpoint: string, file: File, additionalData?: Record<string, any>): Promise<T> {
    // File validation
    this.validateFile(file);

    const formData = new FormData();
    formData.append('file', file);

    if (additionalData) {
      const sanitizedData = this.sanitizeInput(additionalData);
      Object.entries(sanitizedData).forEach(([key, value]) => {
        formData.append(key, String(value));
      });
    }

    return this.secureRequest<T>(endpoint, {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set Content-Type for FormData
    }, { skipQueue: false });
  }

  // 🔒 File Validation
  private validateFile(file: File): void {
    // File size validation (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new Error('File size exceeds 5MB limit');
    }

    // File type validation
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'application/pdf',
      'text/plain',
    ];

    if (!allowedTypes.includes(file.type)) {
      throw new Error('File type not allowed');
    }

    // Filename validation
    const maliciousPatterns = [
      /\.exe$/i,
      /\.bat$/i,
      /\.cmd$/i,
      /\.scr$/i,
      /\.pif$/i,
      /\.com$/i,
    ];

    if (maliciousPatterns.some(pattern => pattern.test(file.name))) {
      throw new Error('Suspicious file name');
    }
  }

  // 🔒 Public Methods
  setToken(token: string | null) {
    this.setSecureToken(token);
  }

  getToken(): string | null {
    return this.token;
  }

  isAuthenticated(): boolean {
    return this.token !== null && this.isValidToken(this.token);
  }

  // 🔒 Logout with Security
  logout() {
    this.setSecureToken(null);
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  }
}

// 🔒 API Client Instance
export const api = new ApiClient(API_BASE_URL);

// 🔒 Export for backward compatibility
export default api;
