import { PrismaClient } from '@prisma/client';
import logger from '@/config/logger';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  logger.warn('⚠️ DATABASE_URL environment variable is not set');
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
    logger.warn('⚠️ Skipping database connection - DATABASE_URL not configured');
    logger.info('Running in DEMO mode without database');
    return;
  }

  try {
    await prisma.$connect();
    
    // Test connection
    await prisma.$queryRaw`SELECT 1`;
    
    logger.info('✅ Database connected successfully');
    
  } catch (error) {
    logger.error('❌ Database connection failed:', error);
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
    logger.warn('Continuing without database connection...');
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
