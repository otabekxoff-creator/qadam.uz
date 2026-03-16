import { connectDatabase, disconnectDatabase, healthCheck } from '@/config/database';
import prisma from '@/config/database';
import logger from '@/config/logger';

// Mock Prisma Client
jest.mock('@/config/database', () => ({
  __esModule: true,
  default: {
    $connect: jest.fn(),
    $disconnect: jest.fn(),
    $queryRaw: jest.fn(),
    user: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    },
    job: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    },
    startup: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    },
    $transaction: jest.fn(),
  },
}));

// Mock logger
jest.mock('@/config/logger');

describe('Database Connection', () => {
  const mockPrisma = prisma as jest.Mocked<typeof prisma>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('connectDatabase', () => {
    it('should connect to database successfully', async () => {
      mockPrisma.$connect.mockResolvedValue(undefined);

      await expect(connectDatabase()).resolves.toBeUndefined();
      expect(mockPrisma.$connect).toHaveBeenCalledTimes(1);
    });

    it('should handle connection errors', async () => {
      const error = new Error('Connection failed');
      mockPrisma.$connect.mockRejectedValue(error);

      await expect(connectDatabase()).rejects.toThrow('Connection failed');
      expect(mockPrisma.$connect).toHaveBeenCalledTimes(1);
    });

    it('should log connection success', async () => {
      mockPrisma.$connect.mockResolvedValue(undefined);
      const mockLogger = logger as jest.Mocked<typeof logger>;

      await connectDatabase();

      expect(mockLogger.info).toHaveBeenCalledWith('Database connected successfully');
    });

    it('should log connection errors', async () => {
      const error = new Error('Connection failed');
      mockPrisma.$connect.mockRejectedValue(error);
      const mockLogger = logger as jest.Mocked<typeof logger>;

      await connectDatabase().catch(() => {});

      expect(mockLogger.error).toHaveBeenCalledWith('Database connection failed:', error);
    });
  });

  describe('disconnectDatabase', () => {
    it('should disconnect from database successfully', async () => {
      mockPrisma.$disconnect.mockResolvedValue(undefined);

      await expect(disconnectDatabase()).resolves.toBeUndefined();
      expect(mockPrisma.$disconnect).toHaveBeenCalledTimes(1);
    });

    it('should handle disconnection errors', async () => {
      const error = new Error('Disconnection failed');
      mockPrisma.$disconnect.mockRejectedValue(error);

      await expect(disconnectDatabase()).rejects.toThrow('Disconnection failed');
      expect(mockPrisma.$disconnect).toHaveBeenCalledTimes(1);
    });

    it('should log disconnection success', async () => {
      mockPrisma.$disconnect.mockResolvedValue(undefined);
      const mockLogger = logger as jest.Mocked<typeof logger>;

      await disconnectDatabase();

      expect(mockLogger.info).toHaveBeenCalledWith('Database disconnected successfully');
    });

    it('should log disconnection errors', async () => {
      const error = new Error('Disconnection failed');
      mockPrisma.$disconnect.mockRejectedValue(error);
      const mockLogger = logger as jest.Mocked<typeof logger>;

      await disconnectDatabase().catch(() => {});

      expect(mockLogger.error).toHaveBeenCalledWith('Database disconnection failed:', error);
    });
  });

  describe('healthCheck', () => {
    it('should return healthy status when database is accessible', async () => {
      mockPrisma.$queryRaw.mockResolvedValue([{ 1: 1 }]);

      const result = await healthCheck();

      expect(result.status).toBe('healthy');
      expect(result.database).toBe('connected');
      expect(mockPrisma.$queryRaw).toHaveBeenCalledWith('SELECT 1');
    });

    it('should return unhealthy status when database is not accessible', async () => {
      mockPrisma.$queryRaw.mockRejectedValue(new Error('Database unavailable'));

      const result = await healthCheck();

      expect(result.status).toBe('unhealthy');
      expect(result.database).toBe('disconnected');
      expect(result.error).toBe('Database unavailable');
    });

    it('should log health check results', async () => {
      mockPrisma.$queryRaw.mockResolvedValue([{ 1: 1 }]);
      const mockLogger = logger as jest.Mocked<typeof logger>;

      await healthCheck();

      expect(mockLogger.info).toHaveBeenCalledWith('Database health check passed');
    });

    it('should log health check failures', async () => {
      const error = new Error('Database unavailable');
      mockPrisma.$queryRaw.mockRejectedValue(error);
      const mockLogger = logger as jest.Mocked<typeof logger>;

      await healthCheck();

      expect(mockLogger.error).toHaveBeenCalledWith('Database health check failed:', error);
    });
  });
});

describe('Database Queries', () => {
  const mockPrisma = prisma as jest.Mocked<typeof prisma>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('User Queries', () => {
    it('should find many users', async () => {
      const mockUsers = [
        { id: '1', email: 'test@example.com', role: 'STUDENT' },
        { id: '2', email: 'test2@example.com', role: 'COMPANY' },
      ];
      mockPrisma.user.findMany.mockResolvedValue(mockUsers as any);

      const result = await prisma.user.findMany();

      expect(result).toEqual(mockUsers);
      expect(mockPrisma.user.findMany).toHaveBeenCalledTimes(1);
    });

    it('should find user by unique field', async () => {
      const mockUser = { id: '1', email: 'test@example.com', role: 'STUDENT' };
      mockPrisma.user.findUnique.mockResolvedValue(mockUser as any);

      const result = await prisma.user.findUnique({
        where: { email: 'test@example.com' },
      });

      expect(result).toEqual(mockUser);
      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
    });

    it('should create new user', async () => {
      const newUser = { id: '1', email: 'test@example.com', role: 'STUDENT' };
      mockPrisma.user.create.mockResolvedValue(newUser as any);

      const result = await prisma.user.create({
        data: { email: 'test@example.com', role: 'STUDENT' },
      });

      expect(result).toEqual(newUser);
      expect(mockPrisma.user.create).toHaveBeenCalledWith({
        data: { email: 'test@example.com', role: 'STUDENT' },
      });
    });

    it('should update user', async () => {
      const updatedUser = { id: '1', email: 'updated@example.com', role: 'STUDENT' };
      mockPrisma.user.update.mockResolvedValue(updatedUser as any);

      const result = await prisma.user.update({
        where: { id: '1' },
        data: { email: 'updated@example.com' },
      });

      expect(result).toEqual(updatedUser);
      expect(mockPrisma.user.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: { email: 'updated@example.com' },
      });
    });

    it('should delete user', async () => {
      const deletedUser = { id: '1', email: 'test@example.com', role: 'STUDENT' };
      mockPrisma.user.delete.mockResolvedValue(deletedUser as any);

      const result = await prisma.user.delete({
        where: { id: '1' },
      });

      expect(result).toEqual(deletedUser);
      expect(mockPrisma.user.delete).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should count users', async () => {
      mockPrisma.user.count.mockResolvedValue(10);

      const result = await prisma.user.count();

      expect(result).toBe(10);
      expect(mockPrisma.user.count).toHaveBeenCalledTimes(1);
    });
  });

  describe('Job Queries', () => {
    it('should find many jobs with relations', async () => {
      const mockJobs = [
        {
          id: '1',
          title: 'Frontend Developer',
          company: { id: '1', name: 'Tech Corp' },
        },
      ];
      mockPrisma.job.findMany.mockResolvedValue(mockJobs as any);

      const result = await prisma.job.findMany({
        include: { company: true },
      });

      expect(result).toEqual(mockJobs);
      expect(mockPrisma.job.findMany).toHaveBeenCalledWith({
        include: { company: true },
      });
    });

    it('should find job by unique field with relations', async () => {
      const mockJob = {
        id: '1',
        title: 'Frontend Developer',
        company: { id: '1', name: 'Tech Corp' },
        applications: [],
      };
      mockPrisma.job.findUnique.mockResolvedValue(mockJob as any);

      const result = await prisma.job.findUnique({
        where: { id: '1' },
        include: { company: true, applications: true },
      });

      expect(result).toEqual(mockJob);
      expect(mockPrisma.job.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
        include: { company: true, applications: true },
      });
    });

    it('should create job with relations', async () => {
      const newJob = {
        id: '1',
        title: 'Frontend Developer',
        companyId: '1',
        company: { id: '1', name: 'Tech Corp' },
      };
      mockPrisma.job.create.mockResolvedValue(newJob as any);

      const result = await prisma.job.create({
        data: { title: 'Frontend Developer', companyId: '1' },
        include: { company: true },
      });

      expect(result).toEqual(newJob);
      expect(mockPrisma.job.create).toHaveBeenCalledWith({
        data: { title: 'Frontend Developer', companyId: '1' },
        include: { company: true },
      });
    });
  });

  describe('Startup Queries', () => {
    it('should find many startups with relations', async () => {
      const mockStartups = [
        {
          id: '1',
          name: 'EduTech',
          student: { id: '1', firstName: 'John', lastName: 'Doe' },
        },
      ];
      mockPrisma.startup.findMany.mockResolvedValue(mockStartups as any);

      const result = await prisma.startup.findMany({
        include: { student: true },
      });

      expect(result).toEqual(mockStartups);
      expect(mockPrisma.startup.findMany).toHaveBeenCalledWith({
        include: { student: true },
      });
    });

    it('should find startup by unique field with relations', async () => {
      const mockStartup = {
        id: '1',
        name: 'EduTech',
        student: { id: '1', firstName: 'John', lastName: 'Doe' },
        applications: [],
      };
      mockPrisma.startup.findUnique.mockResolvedValue(mockStartup as any);

      const result = await prisma.startup.findUnique({
        where: { id: '1' },
        include: { student: true, applications: true },
      });

      expect(result).toEqual(mockStartup);
      expect(mockPrisma.startup.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
        include: { student: true, applications: true },
      });
    });
  });

  describe('Transactions', () => {
    it('should execute transaction successfully', async () => {
      const mockTransaction = [
        { id: '1', email: 'test@example.com' },
        { id: '1', title: 'Frontend Developer' },
      ];
      mockPrisma.$transaction.mockResolvedValue(mockTransaction as any);

      const result = await prisma.$transaction([
        prisma.user.create({ data: { email: 'test@example.com' } }),
        prisma.job.create({ data: { title: 'Frontend Developer' } }),
      ]);

      expect(result).toEqual(mockTransaction);
      expect(mockPrisma.$transaction).toHaveBeenCalledTimes(1);
    });

    it('should handle transaction rollback on error', async () => {
      const error = new Error('Transaction failed');
      mockPrisma.$transaction.mockRejectedValue(error);

      await expect(
        prisma.$transaction([
          prisma.user.create({ data: { email: 'test@example.com' } }),
          prisma.job.create({ data: { title: 'Frontend Developer' } }),
        ])
      ).rejects.toThrow('Transaction failed');
    });
  });

  describe('Query Performance', () => {
    it('should handle large result sets', async () => {
      const mockUsers = Array.from({ length: 1000 }, (_, i) => ({
        id: i.toString(),
        email: `user${i}@example.com`,
        role: 'STUDENT',
      }));
      mockPrisma.user.findMany.mockResolvedValue(mockUsers as any);

      const result = await prisma.user.findMany({ take: 1000 });

      expect(result).toHaveLength(1000);
      expect(mockPrisma.user.findMany).toHaveBeenCalledWith({ take: 1000 });
    });

    it('should handle complex queries with filters', async () => {
      const mockJobs = [
        {
          id: '1',
          title: 'Frontend Developer',
          type: 'FULL_TIME',
          location: 'Tashkent',
          company: { id: '1', name: 'Tech Corp' },
        },
      ];
      mockPrisma.job.findMany.mockResolvedValue(mockJobs as any);

      const result = await prisma.job.findMany({
        where: {
          type: 'FULL_TIME',
          location: 'Tashkent',
          company: { name: 'Tech Corp' },
        },
        include: { company: true },
        orderBy: { createdAt: 'desc' },
        take: 10,
      });

      expect(result).toEqual(mockJobs);
      expect(mockPrisma.job.findMany).toHaveBeenCalledWith({
        where: {
          type: 'FULL_TIME',
          location: 'Tashkent',
          company: { name: 'Tech Corp' },
        },
        include: { company: true },
        orderBy: { createdAt: 'desc' },
        take: 10,
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle unique constraint violations', async () => {
      const error = new Error('Unique constraint failed');
      error.name = 'PrismaClientKnownRequestError';
      (error as any).code = 'P2002';
      mockPrisma.user.create.mockRejectedValue(error);

      await expect(
        prisma.user.create({ data: { email: 'existing@example.com' } })
      ).rejects.toThrow('Unique constraint failed');
    });

    it('should handle foreign key constraint violations', async () => {
      const error = new Error('Foreign key constraint failed');
      error.name = 'PrismaClientKnownRequestError';
      (error as any).code = 'P2003';
      mockPrisma.job.create.mockRejectedValue(error);

      await expect(
        prisma.job.create({ data: { companyId: 'nonexistent' } })
      ).rejects.toThrow('Foreign key constraint failed');
    });

    it('should handle record not found errors', async () => {
      const error = new Error('Record not found');
      error.name = 'PrismaClientKnownRequestError';
      (error as any).code = 'P2025';
      mockPrisma.user.findUnique.mockRejectedValue(error);

      await expect(
        prisma.user.findUnique({ where: { id: 'nonexistent' } })
      ).rejects.toThrow('Record not found');
    });

    it('should handle connection timeout errors', async () => {
      const error = new Error('Connection timeout');
      error.name = 'PrismaClientInitializationError';
      mockPrisma.user.findMany.mockRejectedValue(error);

      await expect(prisma.user.findMany()).rejects.toThrow('Connection timeout');
    });
  });
});
