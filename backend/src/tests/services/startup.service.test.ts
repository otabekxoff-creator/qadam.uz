import { StartupService } from '@/services/startup.service';
import { NotFoundError } from '@/utils/errors';
import { StartupStage, StartupStatus } from '@prisma/client';
import prisma from '@/config/database';

// Mock the database
jest.mock('@/config/database');
const mockPrisma = prisma as jest.Mocked<typeof prisma>;

describe('StartupService', () => {
  let startupService: StartupService;

  beforeEach(() => {
    startupService = new StartupService();
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new startup successfully', async () => {
      const userId = '1';
      const startupData = {
        name: 'EduTech',
        description: 'Educational technology platform',
        problem: 'Students need better learning tools',
        solution: 'AI-powered learning platform',
        stage: StartupStage.IDEA,
        fundingNeeded: 50000,
        fundingCurrency: 'USD',
        industry: 'Education',
        tags: ['AI', 'Education', 'Tech'],
      };

      const mockStudent = { id: '1', firstName: 'John', lastName: 'Doe' };
      const mockStartup = {
        id: '1',
        ...startupData,
        studentId: '1',
        status: StartupStatus.DRAFT,
        createdAt: new Date(),
        student: mockStudent,
      };

      mockPrisma.student.findUnique.mockResolvedValue(mockStudent as any);
      mockPrisma.startup.create.mockResolvedValue(mockStartup as any);

      const result = await startupService.create(userId, startupData);

      expect(result.name).toBe(startupData.name);
      expect(result.studentId).toBe('1');
      expect(result.status).toBe(StartupStatus.DRAFT);
      expect(mockPrisma.student.findUnique).toHaveBeenCalledWith({
        where: { userId },
      });
      expect(mockPrisma.startup.create).toHaveBeenCalledWith({
        data: {
          ...startupData,
          studentId: '1',
        },
        include: expect.any(Object),
      });
    });

    it('should throw NotFoundError if student not found', async () => {
      const userId = 'nonexistent';
      const startupData = {
        name: 'EduTech',
        description: 'Educational platform',
        problem: 'Learning issues',
        solution: 'AI solution',
        stage: StartupStage.IDEA,
        fundingNeeded: 50000,
        fundingCurrency: 'USD',
      };

      mockPrisma.student.findUnique.mockResolvedValue(null);

      await expect(startupService.create(userId, startupData)).rejects.toThrow(NotFoundError);
    });
  });

  describe('findAll', () => {
    it('should return paginated startups', async () => {
      const query = {
        page: 1,
        limit: 10,
        search: 'Tech',
        stage: StartupStage.MVP,
        tags: ['AI'],
      };

      const mockStartups = [
        {
          id: '1',
          name: 'Tech Startup',
          description: 'AI technology platform',
          stage: StartupStage.MVP,
          status: StartupStatus.APPROVED,
          student: { firstName: 'John', lastName: 'Doe' },
        },
      ];

      mockPrisma.startup.findMany.mockResolvedValue(mockStartups as any);
      mockPrisma.startup.count.mockResolvedValue(1);

      const result = await startupService.findAll(query);

      expect(result.startups).toHaveLength(1);
      expect(result.meta.total).toBe(1);
      expect(result.meta.page).toBe(1);
      expect(mockPrisma.startup.findMany).toHaveBeenCalledWith({
        where: expect.objectContaining({
          status: StartupStatus.APPROVED,
          OR: expect.any(Array),
          stage: StartupStage.MVP,
          tags: { hasSome: ['AI'] },
        }),
        include: expect.any(Object),
        orderBy: { createdAt: 'desc' },
        skip: 0,
        take: 10,
      });
    });

    it('should return empty array when no startups found', async () => {
      const query = { page: 1, limit: 10 };
      
      mockPrisma.startup.findMany.mockResolvedValue([]);
      mockPrisma.startup.count.mockResolvedValue(0);

      const result = await startupService.findAll(query);

      expect(result.startups).toHaveLength(0);
      expect(result.meta.total).toBe(0);
    });
  });

  describe('findById', () => {
    it('should return startup by ID', async () => {
      const startupId = '1';
      const mockStartup = {
        id: startupId,
        name: 'Tech Startup',
        description: 'AI platform',
        stage: StartupStage.MVP,
        status: StartupStatus.APPROVED,
        student: { firstName: 'John', lastName: 'Doe' },
      };

      mockPrisma.startup.findUnique.mockResolvedValue(mockStartup as any);

      const result = await startupService.findById(startupId);

      expect(result.id).toBe(startupId);
      expect(result.name).toBe('Tech Startup');
      expect(mockPrisma.startup.findUnique).toHaveBeenCalledWith({
        where: { id: startupId },
        include: expect.any(Object),
      });
    });

    it('should throw NotFoundError if startup not found', async () => {
      mockPrisma.startup.findUnique.mockResolvedValue(null);

      await expect(startupService.findById('invalid-id')).rejects.toThrow(NotFoundError);
    });
  });

  describe('update', () => {
    it('should update startup successfully', async () => {
      const startupId = '1';
      const updateData = {
        name: 'Updated Startup',
        fundingNeeded: 75000,
      };

      const existingStartup = {
        id: startupId,
        name: 'Tech Startup',
        studentId: '1',
        status: StartupStatus.DRAFT,
      };

      const updatedStartup = {
        ...existingStartup,
        ...updateData,
        updatedAt: new Date(),
      };

      mockPrisma.startup.findUnique.mockResolvedValue(existingStartup as any);
      mockPrisma.startup.update.mockResolvedValue(updatedStartup as any);

      const result = await startupService.update(startupId, updateData, '1');

      expect(result.name).toBe('Updated Startup');
      expect(result.fundingNeeded).toBe(75000);
      expect(mockPrisma.startup.update).toHaveBeenCalledWith({
        where: { id: startupId },
        data: updateData,
        include: expect.any(Object),
      });
    });

    it('should throw NotFoundError if startup not found', async () => {
      mockPrisma.startup.findUnique.mockResolvedValue(null);

      await expect(startupService.update('invalid-id', {}, '1')).rejects.toThrow(NotFoundError);
    });
  });

  describe('delete', () => {
    it('should delete startup successfully', async () => {
      const startupId = '1';
      const existingStartup = {
        id: startupId,
        name: 'Tech Startup',
        studentId: '1',
        status: StartupStatus.DRAFT,
      };

      mockPrisma.startup.findUnique.mockResolvedValue(existingStartup as any);
      mockPrisma.startup.delete.mockResolvedValue(existingStartup as any);

      const result = await startupService.delete(startupId, '1');

      expect(result.id).toBe(startupId);
      expect(mockPrisma.startup.delete).toHaveBeenCalledWith({
        where: { id: startupId },
      });
    });

    it('should throw NotFoundError if startup not found', async () => {
      mockPrisma.startup.findUnique.mockResolvedValue(null);

      await expect(startupService.delete('invalid-id', '1')).rejects.toThrow(NotFoundError);
    });
  });

  describe('search', () => {
    it('should search startups by query', async () => {
      const query = 'Technology';
      const mockStartups = [
        {
          id: '1',
          name: 'Tech Startup',
          description: 'Technology platform',
          status: StartupStatus.APPROVED,
          student: { firstName: 'John', lastName: 'Doe' },
        },
      ];

      mockPrisma.startup.findMany.mockResolvedValue(mockStartups as any);

      const result = await startupService.search(query);

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Tech Startup');
      expect(mockPrisma.startup.findMany).toHaveBeenCalledWith({
        where: {
          status: StartupStatus.APPROVED,
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
            { problem: { contains: query, mode: 'insensitive' } },
            { solution: { contains: query, mode: 'insensitive' } },
            { tags: { hasSome: [query] } },
          ],
        },
        include: expect.any(Object),
        take: 20,
      });
    });

    it('should return empty array for no results', async () => {
      mockPrisma.startup.findMany.mockResolvedValue([]);

      const result = await startupService.search('nonexistent');

      expect(result).toHaveLength(0);
    });
  });

  describe('findByStudent', () => {
    it('should return all startups for a student', async () => {
      const studentId = '1';
      const mockStartups = [
        {
          id: '1',
          name: 'First Startup',
          studentId,
          status: StartupStatus.APPROVED,
        },
        {
          id: '2',
          name: 'Second Startup',
          studentId,
          status: StartupStatus.DRAFT,
        },
      ];

      mockPrisma.startup.findMany.mockResolvedValue(mockStartups as any);

      const result = await startupService.findByStudent(studentId);

      expect(result).toHaveLength(2);
      expect(result[0].studentId).toBe(studentId);
      expect(mockPrisma.startup.findMany).toHaveBeenCalledWith({
        where: { studentId },
        include: expect.any(Object),
        orderBy: { createdAt: 'desc' },
      });
    });

    it('should return empty array for student with no startups', async () => {
      mockPrisma.startup.findMany.mockResolvedValue([]);

      const result = await startupService.findByStudent('no-startups-student');

      expect(result).toHaveLength(0);
    });
  });

  describe('updateStatus', () => {
    it('should update startup status successfully', async () => {
      const startupId = '1';
      const newStatus = StartupStatus.APPROVED;
      const adminId = 'admin-1';

      const existingStartup = {
        id: startupId,
        name: 'Tech Startup',
        status: StartupStatus.PENDING,
      };

      const updatedStartup = {
        ...existingStartup,
        status: newStatus,
        updatedAt: new Date(),
      };

      mockPrisma.startup.findUnique.mockResolvedValue(existingStartup as any);
      mockPrisma.startup.update.mockResolvedValue(updatedStartup as any);

      const result = await startupService.updateStatus(startupId, newStatus, adminId);

      expect(result.status).toBe(newStatus);
      expect(mockPrisma.startup.update).toHaveBeenCalledWith({
        where: { id: startupId },
        data: { status: newStatus },
        include: expect.any(Object),
      });
    });

    it('should throw NotFoundError if startup not found', async () => {
      mockPrisma.startup.findUnique.mockResolvedValue(null);

      await expect(startupService.updateStatus('invalid-id', StartupStatus.APPROVED, 'admin-1')).rejects.toThrow(NotFoundError);
    });
  });

  describe('getPopularStartups', () => {
    it('should return popular startups', async () => {
      const mockStartups = [
        {
          id: '1',
          name: 'Popular Startup',
          likesCount: 100,
          viewsCount: 500,
          status: StartupStatus.APPROVED,
          student: { firstName: 'John', lastName: 'Doe' },
        },
        {
          id: '2',
          name: 'Another Startup',
          likesCount: 80,
          viewsCount: 300,
          status: StartupStatus.APPROVED,
          student: { firstName: 'Jane', lastName: 'Smith' },
        },
      ];

      mockPrisma.startup.findMany.mockResolvedValue(mockStartups as any);

      const result = await startupService.getPopularStartups();

      expect(result).toHaveLength(2);
      expect(result[0].likesCount).toBe(100);
      expect(mockPrisma.startup.findMany).toHaveBeenCalledWith({
        where: { status: StartupStatus.APPROVED },
        include: expect.any(Object),
        orderBy: { likesCount: 'desc' },
        take: 10,
      });
    });

    it('should return empty array when no popular startups', async () => {
      mockPrisma.startup.findMany.mockResolvedValue([]);

      const result = await startupService.getPopularStartups();

      expect(result).toHaveLength(0);
    });
  });
});
