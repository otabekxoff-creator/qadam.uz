/**
 * Backend Controllers Index
 * Central export point for all controllers
 */

// Core Controllers
export * from './auth.controller';
export * from './user.controller';

// Job & Application Controllers  
export * from './job.controller';
export * from './application.controller';
export * from './company.controller';

// Communication Controllers
export * from './chat.controller';
export * from './notification.controller';

// Feature Controllers  
export * from './ai.controller';

import { Router } from 'express';

/**
 * Controller Registry
 * Centralized controller management system
 */
export class ControllerRegistry {
  private static controllers: Map<string, any> = new Map();
  private static middleware: Map<string, any[]> = new Map();

  /**
   * Register a controller
   * @param name - Controller identifier
   * @param controller - Controller instance or class
   */
  static register(name: string, controller: any): void {
    this.controllers.set(name, controller);
  }

  /**
   * Get registered controller
   * @param name - Controller name
   * @returns Controller instance
   */
  static get(name: string): any {
    return this.controllers.get(name);
  }

  /**
   * Check if controller exists
   * @param name - Controller name
   * @returns Boolean indicating existence
   */
  static has(name: string): boolean {
    return this.controllers.has(name);
  }

  /**
   * Get all registered controllers
   * @returns Array of controller entries
   */
  static getAll(): [string, any][] {
    return Array.from(this.controllers.entries());
  }

  /**
   * Register middleware for controller
   * @param controllerName - Target controller
   * @param middleware - Middleware functions
   */
  static registerMiddleware(controllerName: string, ...middleware: any[]): void {
    const existing = this.middleware.get(controllerName) || [];
    this.middleware.set(controllerName, [...existing, ...middleware]);
  }

  /**
   * Get middleware for controller
   * @param controllerName - Controller name
   * @returns Array of middleware functions
   */
  static getMiddleware(controllerName: string): any[] {
    return this.middleware.get(controllerName) || [];
  }
}

/**
 * Controller Factory
 * Factory pattern for controller instantiation
 */
export class ControllerFactory {
  private static instances: Map<string, any> = new Map();

  /**
   * Create or get controller instance
   * @param ControllerClass - Controller class
   * @param name - Instance identifier
   * @returns Controller instance
   */
  static getInstance<T>(ControllerClass: new (...args: any[]) => T, name: string, ...args: any[]): T {
    if (!this.instances.has(name)) {
      const instance = new ControllerClass(...args);
      this.instances.set(name, instance);
    }
    return this.instances.get(name);
  }

  /**
   * Clear all instances
   * Useful for testing
   */
  static clearAll(): void {
    this.instances.clear();
  }
}

/**
 * Route Builder Utility
 * Helper for building Express routes with controllers
 */
export class RouteBuilder {
  private router: Router;
  private basePath: string;

  constructor(basePath: string = '') {
    this.router = Router();
    this.basePath = basePath;
  }

  /**
   * Add GET route
   */
  get(path: string, handler: any, ...middleware: any[]): RouteBuilder {
    this.router.get(path, ...middleware, handler);
    return this;
  }

  /**
   * Add POST route
   */
  post(path: string, handler: any, ...middleware: any[]): RouteBuilder {
    this.router.post(path, ...middleware, handler);
    return this;
  }

  /**
   * Add PUT route
   */
  put(path: string, handler: any, ...middleware: any[]): RouteBuilder {
    this.router.put(path, ...middleware, handler);
    return this;
  }

  /**
   * Add PATCH route
   */
  patch(path: string, handler: any, ...middleware: any[]): RouteBuilder {
    this.router.patch(path, ...middleware, handler);
    return this;
  }

  /**
   * Add DELETE route
   */
  delete(path: string, handler: any, ...middleware: any[]): RouteBuilder {
    this.router.delete(path, ...middleware, handler);
    return this;
  }

  /**
   * Build and return router
   */
  build(): Router {
    return this.router;
  }
}

/**
 * Controller Response Helper
 * Standardized response formatting
 */
export class ControllerResponse {
  /**
   * Success response
   */
  static success<T>(data: T, message: string = 'Success', meta?: any) {
    return {
      success: true,
      data,
      message,
      meta,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Error response
   */
  static error(message: string, errors?: any[], statusCode: number = 400) {
    return {
      success: false,
      message,
      errors,
      statusCode,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Paginated response
   */
  static paginated<T>(data: T[], page: number, limit: number, total: number) {
    return {
      success: true,
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page * limit < total,
        hasPrevPage: page > 1,
      },
      timestamp: new Date().toISOString(),
    };
  }
}

// ============================================================================
// Controller Decorators (placeholders)
// ============================================================================

export function RateLimit(maxRequests: number, windowMs: number) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    return descriptor;
  };
}

export function Cache(ttlSeconds: number) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    return descriptor;
  };
}

export function Validate(schema: any) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    return descriptor;
  };
}

/**
 * Log decorator
 * Method logging decorator
 */
export function Log(level: 'debug' | 'info' | 'warn' | 'error' = 'info') {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      console.log(`[${level}] ${target.constructor.name}.${propertyKey}`);
      return originalMethod.apply(this, args);
    };
    return descriptor;
  };
}

// ============================================================================
// Controller Configuration
// ============================================================================

/**
 * Controller configuration interface
 */
export interface ControllerConfig {
  /** Controller base path */
  basePath: string;
  /** Middleware to apply */
  middleware?: any[];
  /** Rate limiting options */
  rateLimit?: {
    maxRequests: number;
    windowMs: number;
  };
  /** Caching options */
  cache?: {
    enabled: boolean;
    ttlSeconds: number;
  };
  /** Authentication required */
  requireAuth?: boolean;
  /** Required roles */
  requiredRoles?: string[];
}

/**
 * Global controller configuration
 */
export const DEFAULT_CONTROLLER_CONFIG: ControllerConfig = {
  basePath: '/api',
  middleware: [],
  rateLimit: {
    maxRequests: 100,
    windowMs: 15 * 60 * 1000, // 15 minutes
  },
  cache: {
    enabled: false,
    ttlSeconds: 300, // 5 minutes
  },
  requireAuth: false,
  requiredRoles: [],
};

// ============================================================================
// Export Types and Interfaces
// ============================================================================

export interface ControllerMetadata {
  name: string;
  version: string;
  description: string;
  author?: string;
  tags?: string[];
}

export interface ControllerHealth {
  status: 'healthy' | 'degraded' | 'unhealthy';
  uptime: number;
  lastError?: string;
  requestCount: number;
  errorCount: number;
}

export type ControllerMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS' | 'HEAD';

export interface RouteDefinition {
  method: ControllerMethod;
  path: string;
  handler: string;
  middleware?: string[];
  description?: string;
  deprecated?: boolean;
}

// ============================================================================
// Version Information
// ============================================================================

export const CONTROLLER_VERSION = '1.0.0';
export const CONTROLLER_BUILD_DATE = new Date().toISOString();

/**
 * Get controller system information
 */
export function getControllerSystemInfo() {
  return {
    version: CONTROLLER_VERSION,
    buildDate: CONTROLLER_BUILD_DATE,
    registeredControllers: ControllerRegistry.getAll().length,
    nodeVersion: process.version,
    platform: process.platform,
  };
}

// ============================================================================
// Default Export
// ============================================================================

export default {
  ControllerRegistry,
  ControllerFactory,
  RouteBuilder,
  ControllerResponse,
  DEFAULT_CONTROLLER_CONFIG,
  getControllerSystemInfo,
};
