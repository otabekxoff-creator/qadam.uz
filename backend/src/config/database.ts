import { PrismaClient } from '@prisma/client';
import logger from '@/config/logger';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  logger.warn('⚠️ DATABASE_URL environment variable is not set');
  logger.info('🎭 Running in DEMO mode - using in-memory mock data');
}

let prisma: PrismaClient | null = null;

if (databaseUrl) {
  prisma = globalForPrisma.prisma ?? new PrismaClient({
    log: process.env.NODE_ENV === 'development' 
      ? [
          { emit: 'stdout', level: 'error' },
          { emit: 'stdout', level: 'info' },
          { emit: 'stdout', level: 'warn' },
        ]
      : [
          { emit: 'stdout', level: 'error' },
        ],
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
    errorFormat: process.env.NODE_ENV === 'development' ? 'pretty' : 'minimal',
  });

  if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
}

export const connectDatabase = async (): Promise<void> => {
  if (!databaseUrl || !prisma) {
    logger.info('🎭 DEMO MODE: Skipping Prisma database connection');
    return;
  }

  try {
    await prisma.$connect();
    
    await prisma.$queryRaw`SELECT 1`;
    
    logger.info('✅ Database connected successfully');
    
  } catch (error) {
    logger.error('❌ Database connection failed:', error);
    logger.warn('⚠️ Falling back to DEMO mode');
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  if (!prisma) return;
  try {
    await prisma.$disconnect();
    logger.info('Database disconnected');
  } catch (error) {
    logger.error('Error disconnecting database:', error);
  }
};

export const checkDatabaseHealth = async (): Promise<boolean> => {
  if (!databaseUrl || !prisma) return false;
  
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    logger.error('Database health check failed:', error);
    return false;
  }
};

export default prisma;
