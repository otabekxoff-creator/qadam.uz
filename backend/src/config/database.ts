import { PrismaClient } from '@prisma/client';
import logger from '@/config/logger';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: [
    { emit: 'stdout', level: 'error' },
    { emit: 'stdout', level: 'info' },
    { emit: 'stdout', level: 'warn' },
  ],
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  errorFormat: 'pretty',
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export const connectDatabase = async (): Promise<void> => {
  try {
    await prisma.$connect();
    
    // Test connection
    await prisma.$queryRaw`SELECT 1`;
    
    logger.info('✅ Database connected successfully');
    
  } catch (error) {
    logger.error('❌ Database connection failed:', error);
    process.exit(1);
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
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    logger.error('Database health check failed:', error);
    return false;
  }
};

export default prisma;
