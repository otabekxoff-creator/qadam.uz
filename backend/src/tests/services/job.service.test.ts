import { JobService } from '@/services/job.service';
import { NotFoundError } from '@/utils/errors';
import { JobStatus } from '@prisma/client';
import prisma from '@/config/database';

// Mock the database
jest.mock('@/config/database');
const mockPrisma = prisma as jest.Mocked<typeof prisma>;

describe('JobService', () => {
  let jobService: JobService;

  beforeEach(() => {
    jobService = new JobService();
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new job successfully', async () => {
      const userId = '1';
      const jobData = {
        title: 'Frontend Developer',
        description: 'React developer needed',
        requirements: '3+ years experience',
        location: 'Tashkent',
        type: 'FULL_TIME',
        industry: 'IT',
        skills: ['React', 'TypeScript'],
      };

      const mockCompany = { id: '1', name: 'Tech Corp' };
      const mockJob = {
        id: '1',
        ...jobData,
        companyId: '1',
        status: JobStatus.ACTIVE,
        createdAt: new Date(),
        company: mockCompany,
      };

      mockPrisma.company.findUnique.mockResolvedValue(mockCompany as any);
      mockPrisma.job.create.mockResolvedValue(mockJob as any);

      const result = await jobService.create(userId, jobData);

      expect(result.title).toBe(jobData.title);
      expect(result.companyId).toBe('1');
      expect(mockPrisma.company.findUnique).toHaveBeenCalledWith({
        where: { userId },
      });
      expect(mockPrisma.job.create).toHaveBeenCalledWith({
        data: {
          ...jobData,
          companyId: '1',
          deadline: undefined,
        },
        include: expect.any(Object),
      });
    });

    it('should throw NotFoundError if company not found', async () => {
      const userId = 'nonexistent';
      const jobData = {
        title: 'Frontend Developer',
        description: 'React developer needed',
        requirements: '3+ years experience',
        location: 'Tashkent',
        type: 'FULL_TIME',
        industry: 'IT',
        skills: ['React'],
      };

      mockPrisma.company.findUnique.mockResolvedValue(null);

      await expect(jobService.create(userId, jobData)).rejects.toThrow(NotFoundError);
      expect(mockPrisma.company.findUnique).toHaveBeenCalledWith({
        where: { userId },
      });
    });
  });

  describe('findAll', () => {
    it('should return paginated jobs', async () => {
      const query = {
        page: 1,
        limit: 10,
        search: 'React',
        location: 'Tashkent',
        type: 'FULL_TIME',
        skills: ['React'],
      };

      const mockJobs = [
        {
          id: '1',
          title: 'React Developer',
          description: 'React expert needed',
          location: 'Tashkent',
          type: 'FULL_TIME',
          status: JobStatus.ACTIVE,
          company: { name: 'Tech Corp', logo: 'logo.png' },
        },
      ];

      mockPrisma.job.findMany.mockResolvedValue(mockJobs as any);
      mockPrisma.job.count.mockResolvedValue(1);

      const result = await jobService.findAll(query);

      expect(result.jobs).toHaveLength(1);
      expect(result.meta.total).toBe(1);
      expect(result.meta.page).toBe(1);
      expect(mockPrisma.job.findMany).toHaveBeenCalledWith({
        where: expect.objectContaining({
          status: JobStatus.ACTIVE,
          OR: expect.any(Array),
          location: 'Tashkent',
          type: 'FULL_TIME',
          skills: { hasSome: ['React'] },
        }),
        include: expect.any(Object),
        orderBy: { createdAt: 'desc' },
        skip: 0,
        take: 10,
      });
    });

    it('should return empty array when no jobs found', async () => {
      const query = { page: 1, limit: 10 };
      
      mockPrisma.job.findMany.mockResolvedValue([]);
      mockPrisma.job.count.mockResolvedValue(0);

      const result = await jobService.findAll(query);

      expect(result.jobs).toHaveLength(0);
      expect(result.meta.total).toBe(0);
    });

    it('should handle search query correctly', async () => {
      const query = { page: 1, limit: 10, search: 'React' };
      
      mockPrisma.job.findMany.mockResolvedValue([]);
      mockPrisma.job.count.mockResolvedValue(0);

      await jobService.findAll(query);

      expect(mockPrisma.job.findMany).toHaveBeenCalledWith({
        where: expect.objectContaining({
          OR: [
            { title: { contains: 'React', mode: 'insensitive' } },
            { description: { contains: 'React', mode: 'insensitive' } },
          ],
        }),
        include: expect.any(Object),
        orderBy: { createdAt: 'desc' },
        skip: 0,
        take: 10,
      });
    });
  });

  describe('findById', () => {
    it('should return job by ID', async () => {
      const jobId = '1';
      const mockJob = {
        id: jobId,
        title: 'Frontend Developer',
        description: 'React developer needed',
        status: JobStatus.ACTIVE,
        company: { name: 'Tech Corp', logo: 'logo.png' },
      };

      mockPrisma.job.findUnique.mockResolvedValue(mockJob as any);

      const result = await jobService.findById(jobId);

      expect(result.id).toBe(jobId);
      expect(result.title).toBe('Frontend Developer');
      expect(mockPrisma.job.findUnique).toHaveBeenCalledWith({
        where: { id: jobId },
        include: expect.any(Object),
      });
    });

    it('should throw NotFoundError if job not found', async () => {
      mockPrisma.job.findUnique.mockResolvedValue(null);

      await expect(jobService.findById('invalid-id')).rejects.toThrow(NotFoundError);
    });
  });

  describe('update', () => {
    it('should update job successfully', async () => {
      const jobId = '1';
      const updateData = {
        title: 'Senior Frontend Developer',
        salary: '$2000-3000',
      };

      const existingJob = {
        id: jobId,
        title: 'Frontend Developer',
        companyId: '1',
        status: JobStatus.ACTIVE,
      };

      const updatedJob = {
        ...existingJob,
        ...updateData,
        updatedAt: new Date(),
      };

      mockPrisma.job.findUnique.mockResolvedValue(existingJob as any);
      mockPrisma.job.update.mockResolvedValue(updatedJob as any);

      const result = await jobService.update(jobId, updateData);

      expect(result.title).toBe('Senior Frontend Developer');
      expect(result.salary).toBe('$2000-3000');
      expect(mockPrisma.job.update).toHaveBeenCalledWith({
        where: { id: jobId },
        data: updateData,
        include: expect.any(Object),
      });
    });

    it('should throw NotFoundError if job not found', async () => {
      mockPrisma.job.findUnique.mockResolvedValue(null);

      await expect(jobService.update('invalid-id', {})).rejects.toThrow(NotFoundError);
    });
  });

  describe('delete', () => {
    it('should delete job successfully', async () => {
      const jobId = '1';
      const existingJob = {
        id: jobId,
        title: 'Frontend Developer',
        status: JobStatus.ACTIVE,
      };

      mockPrisma.job.findUnique.mockResolvedValue(existingJob as any);
      mockPrisma.job.delete.mockResolvedValue(existingJob as any);

      const result = await jobService.delete(jobId);

      expect(result.id).toBe(jobId);
      expect(mockPrisma.job.delete).toHaveBeenCalledWith({
        where: { id: jobId },
      });
    });

    it('should throw NotFoundError if job not found', async () => {
      mockPrisma.job.findUnique.mockResolvedValue(null);

      await expect(jobService.delete('invalid-id')).rejects.toThrow(NotFoundError);
    });
  });

  describe('search', () => {
    it('should search jobs by query', async () => {
      const query = 'React';
      const mockJobs = [
        {
          id: '1',
          title: 'React Developer',
          description: 'React expert needed',
          status: JobStatus.ACTIVE,
          company: { name: 'Tech Corp' },
        },
      ];

      mockPrisma.job.findMany.mockResolvedValue(mockJobs as any);

      const result = await jobService.search(query);

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('React Developer');
      expect(mockPrisma.job.findMany).toHaveBeenCalledWith({
        where: {
          status: JobStatus.ACTIVE,
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
          ],
        },
        include: expect.any(Object),
        take: 20,
      });
    });

    it('should return empty array for no results', async () => {
      mockPrisma.job.findMany.mockResolvedValue([]);

      const result = await jobService.search('nonexistent');

      expect(result).toHaveLength(0);
    });
  });

  describe('findByCompany', () => {
    it('should return all jobs for a company', async () => {
      const companyId = '1';
      const mockJobs = [
        {
          id: '1',
          title: 'Frontend Developer',
          companyId,
          status: JobStatus.ACTIVE,
        },
        {
          id: '2',
          title: 'Backend Developer',
          companyId,
          status: JobStatus.ACTIVE,
        },
      ];

      mockPrisma.job.findMany.mockResolvedValue(mockJobs as any);

      const result = await jobService.findByCompany(companyId);

      expect(result).toHaveLength(2);
      expect(result[0].companyId).toBe(companyId);
      expect(mockPrisma.job.findMany).toHaveBeenCalledWith({
        where: { companyId },
        include: expect.any(Object),
        orderBy: { createdAt: 'desc' },
      });
    });

    it('should return empty array for company with no jobs', async () => {
      mockPrisma.job.findMany.mockResolvedValue([]);

      const result = await jobService.findByCompany('no-jobs-company');

      expect(result).toHaveLength(0);
    });
  });

  describe('getApplications', () => {
    it('should return all applications for a job', async () => {
      const jobId = '1';
      const mockApplications = [
        {
          id: '1',
          status: 'PENDING',
          coverLetter: 'Experienced developer',
          student: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
          },
        },
      ];

      mockPrisma.application.findMany.mockResolvedValue(mockApplications as any);

      const result = await jobService.getApplications(jobId);

      expect(result).toHaveLength(1);
      expect(result[0].status).toBe('PENDING');
      expect(mockPrisma.application.findMany).toHaveBeenCalledWith({
        where: { jobId },
        include: expect.any(Object),
        orderBy: { createdAt: 'desc' },
      });
    });

    it('should return empty array for job with no applications', async () => {
      mockPrisma.application.findMany.mockResolvedValue([]);

      const result = await jobService.getApplications('no-applications-job');

      expect(result).toHaveLength(0);
    });
  });
});
