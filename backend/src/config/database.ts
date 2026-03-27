import { PrismaClient } from '@prisma/client';
import logger from '@/config/logger';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Enforce real database in production. DATABASE_URL must be provided.
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  logger.error('⛔ DATABASE_URL environment variable is not set. Please configure it for production.');
  // In production we should not run without a DB. Exit startup to surface missing config.
  if (process.env.NODE_ENV === 'production') {
    process.exit(1);
  }
}

const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development'
    ? [
        { emit: 'stdout', level: 'error' },
        { emit: 'stdout', level: 'info' },
        { emit: 'stdout', level: 'warn' },
      ]
    : [
        { emit: 'stdout', level: 'error' },
      ],
  datasources: databaseUrl ? {
    db: {
      url: databaseUrl,
    },
  } : undefined,
  errorFormat: process.env.NODE_ENV === 'development' ? 'pretty' : 'minimal',
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export const connectDatabase = async (): Promise<void> => {
  if (!databaseUrl) {
    // Already warned above; keep function minimal for compatibility
    return;
  }
  try {
    await prisma.$connect();
    // Test connection
    await prisma.$queryRaw`SELECT 1`;
  } catch (error) {
    // Do not swallow critical startup errors in production
    logger.error('❌ Database connection failed:', error);
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  try {
    await prisma.$disconnect();
    logger.info('Database disconnected');
  } catch (error) {
    logger.error('Error disconnecting database:', error);
  }
};

// Health check function
export const checkDatabaseHealth = async (): Promise<boolean> => {
  if (!databaseUrl) return false;
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    logger.error('Database health check failed:', error);
    return false;
  }
};

export default prisma;
