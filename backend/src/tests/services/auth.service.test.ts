import { AuthService } from '@/services/auth.service';
import { ConflictError, UnauthorizedError, NotFoundError } from '@/utils/errors';
import { UserRole } from '@prisma/client';
import prisma from '@/config/database';

// Mock the database
jest.mock('@/config/database');
const mockPrisma = prisma as jest.Mocked<typeof prisma>;

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register a new student successfully', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'Password123!',
        role: UserRole.STUDENT,
        firstName: 'John',
        lastName: 'Doe',
      };

      mockPrisma.user.findUnique.mockResolvedValue(null);
      mockPrisma.user.create.mockResolvedValue({
        id: '1',
        email: userData.email,
        role: userData.role,
        isActive: true,
        emailVerifiedAt: new Date(),
        student: {
          id: '1',
          firstName: userData.firstName,
          lastName: userData.lastName,
        },
      } as any);

      const result = await authService.register(userData);

      expect(result.user.email).toBe(userData.email);
      expect(result.user.role).toBe(userData.role);
      expect(result.token).toBeDefined();
      expect(mockPrisma.user.create).toHaveBeenCalledTimes(1);
    });

    it('should throw ConflictError if email already exists', async () => {
      const userData = {
        email: 'existing@example.com',
        password: 'Password123!',
        role: UserRole.STUDENT,
        firstName: 'John',
        lastName: 'Doe',
      };

      mockPrisma.user.findUnique.mockResolvedValue({
        id: '1',
        email: userData.email,
      } as any);

      await expect(authService.register(userData)).rejects.toThrow(ConflictError);
    });
  });

  describe('loginDirect', () => {
    it('should login user with valid credentials', async () => {
      const email = 'test@example.com';
      const password = 'Password123!';

      mockPrisma.user.findUnique.mockResolvedValue({
        id: '1',
        email,
        password: '$2a$12$hashedpassword',
        isActive: true,
        role: UserRole.STUDENT,
      } as any);

      // Mock password comparison
      jest.mock('@/utils/helpers', () => ({
        comparePassword: jest.fn().mockResolvedValue(true),
        generateToken: jest.fn().mockReturnValue('mock-token'),
      }));

      const { comparePassword, generateToken } = require('@/utils/helpers');
      (comparePassword as jest.Mock).mockResolvedValue(true);
      (generateToken as jest.Mock).mockReturnValue('mock-token');

      const result = await authService.loginDirect(email, password);

      expect(result.user.email).toBe(email);
      expect(result.token).toBe('mock-token');
    });

    it('should throw UnauthorizedError for invalid credentials', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);

      await expect(authService.loginDirect('test@example.com', 'wrongpassword'))
        .rejects.toThrow(UnauthorizedError);
    });
  });

  describe('getMe', () => {
    it('should return user data for valid userId', async () => {
      const userId = '1';
      const mockUser = {
        id: userId,
        email: 'test@example.com',
        role: UserRole.STUDENT,
        isActive: true,
        student: {
          firstName: 'John',
          lastName: 'Doe',
        },
      };

      mockPrisma.user.findUnique.mockResolvedValue(mockUser as any);

      const result = await authService.getMe(userId);

      expect(result.id).toBe(userId);
      expect(result.email).toBe(mockUser.email);
    });

    it('should throw NotFoundError for invalid userId', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);

      await expect(authService.getMe('invalid-id')).rejects.toThrow(NotFoundError);
    });
  });
});
