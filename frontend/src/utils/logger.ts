// Professional Logger Utility
// Development va Production uchun mos loglash

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: any;
  source?: string;
}

class Logger {
  private static instance: Logger;
  private logLevel: LogLevel;
  private isDevelopment: boolean;

  private constructor() {
    this.isDevelopment = process.env.NODE_ENV === 'development';
    this.logLevel = this.isDevelopment ? LogLevel.DEBUG : LogLevel.INFO;
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private formatMessage(level: LogLevel, message: string, data?: any): string {
    const timestamp = new Date().toISOString();
    const levelName = LogLevel[level];
    const dataStr = data ? ` | Data: ${JSON.stringify(data)}` : '';
    return `[${timestamp}] [${levelName}] ${message}${dataStr}`;
  }

  private shouldLog(level: LogLevel): boolean {
    return level >= this.logLevel;
  }

  public debug(message: string, data?: any, source?: string): void {
    if (!this.shouldLog(LogLevel.DEBUG)) return;
    
    const formattedMessage = this.formatMessage(LogLevel.DEBUG, message, data);
    if (this.isDevelopment) {
      console.debug(formattedMessage);
    }
    this.logToStorage(LogLevel.DEBUG, message, data, source);
  }

  public info(message: string, data?: any, source?: string): void {
    if (!this.shouldLog(LogLevel.INFO)) return;
    
    const formattedMessage = this.formatMessage(LogLevel.INFO, message, data);
    if (this.isDevelopment) {
      console.info(formattedMessage);
    }
    this.logToStorage(LogLevel.INFO, message, data, source);
  }

  public warn(message: string, data?: any, source?: string): void {
    if (!this.shouldLog(LogLevel.WARN)) return;
    
    const formattedMessage = this.formatMessage(LogLevel.WARN, message, data);
    if (this.isDevelopment) {
      console.warn(formattedMessage);
    }
    this.logToStorage(LogLevel.WARN, message, data, source);
  }

  public error(message: string, error?: any, source?: string): void {
    if (!this.shouldLog(LogLevel.ERROR)) return;
    
    const errorData = error instanceof Error ? {
      name: error.name,
      message: error.message,
      stack: error.stack,
    } : error;
    
    const formattedMessage = this.formatMessage(LogLevel.ERROR, message, errorData);
    if (this.isDevelopment) {
      console.error(formattedMessage);
    }
    this.logToStorage(LogLevel.ERROR, message, errorData, source);
  }

  private logToStorage(level: LogLevel, message: string, data?: any, source?: string): void {
    // Production da loglarni storage ga saqlash
    if (!this.isDevelopment && typeof window !== 'undefined') {
      try {
        const existingLogs = this.getStoredLogs();
        const newLog: LogEntry = {
          timestamp: new Date().toISOString(),
          level,
          message,
          data,
          source,
        };
        
        // Faqat so'nggi 1000 ta logni saqlash
        const updatedLogs = [...existingLogs, newLog].slice(-1000);
        localStorage.setItem('app_logs', JSON.stringify(updatedLogs));
      } catch (error) {
        // Storage to'lgan bo'lishi mumkin
        console.warn('Failed to store log:', error);
      }
    }
  }

  private getStoredLogs(): LogEntry[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const stored = localStorage.getItem('app_logs');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  public getLogs(level?: LogLevel): LogEntry[] {
    const logs = this.getStoredLogs();
    return level ? logs.filter(log => log.level >= level) : logs;
  }

  public clearLogs(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('app_logs');
    }
  }

  // API error logging
  public logApiError(endpoint: string, error: any, requestData?: any): void {
    this.error(`API Error: ${endpoint}`, {
      status: error?.status,
      statusText: error?.statusText,
      data: error?.data,
      requestData,
    }, 'API');
  }

  // User action logging
  public logUserAction(action: string, data?: any): void {
    this.info(`User Action: ${action}`, data, 'USER');
  }

  // Performance logging
  public logPerformance(metric: string, duration: number, data?: any): void {
    this.info(`Performance: ${metric}`, {
      duration: `${duration}ms`,
      ...data,
    }, 'PERFORMANCE');
  }
}

// Global logger instance
export const logger = Logger.getInstance();

// Development uchun qisqa yo'llar
export const log = {
  debug: (message: string, data?: any) => logger.debug(message, data),
  info: (message: string, data?: any) => logger.info(message, data),
  warn: (message: string, data?: any) => logger.warn(message, data),
  error: (message: string, error?: any) => logger.error(message, error),
};

export default logger;
