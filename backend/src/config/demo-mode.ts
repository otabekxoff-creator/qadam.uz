import crypto from 'crypto';
import logger from '@/config/logger';

export interface DemoUser {
  id: string;
  email: string;
  password: string;
  role: 'STUDENT' | 'COMPANY' | 'ADMIN';
  isActive: boolean;
  emailVerifiedAt: Date | null;
  verificationCode: string | null;
  verificationCodeExpiresAt: Date | null;
  loginCode: string | null;
  loginCodeExpiresAt: Date | null;
  student: DemoStudent | null;
  company: DemoCompany | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface DemoStudent {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: Date;
  educationLevel: string;
  phone?: string;
  university?: string;
  major?: string;
  gpa?: string;
  about?: string;
  skills?: string;
  avatar?: string;
  resume?: string;
}

export interface DemoCompany {
  id: string;
  name: string;
  email: string;
  industry: string;
  location: string;
  size: string;
  description?: string;
  website?: string;
  logo?: string;
}

class DemoDataStore {
  private users: Map<string, DemoUser> = new Map();
  private emailIndex: Map<string, string> = new Map();
  private initialized: boolean = false;

  constructor() {
    if (!this.initialized) {
      this.initialize();
    }
  }

  private initialize() {
    logger.info('🎭 Initializing demo data store...');
    
    const demoUsers: DemoUser[] = [
      {
        id: 'demo-student-1',
        email: 'student@demo.com',
        password: '$2b$10$rQZ8K.WqGHVVJJJJJJJJJOqYJJJJJJJJJJJJJJJJJJJJJJOJJJJJJJ', // password: demo123
        role: 'STUDENT',
        isActive: true,
        emailVerifiedAt: new Date(),
        verificationCode: null,
        verificationCodeExpiresAt: null,
        loginCode: null,
        loginCodeExpiresAt: null,
        student: {
          id: 'demo-student-profile-1',
          firstName: 'Ali',
          lastName: 'Valiyev',
          email: 'student@demo.com',
          birthDate: new Date('2000-01-01'),
          educationLevel: 'BACHELOR',
        },
        company: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'demo-company-1',
        email: 'company@demo.com',
        password: '$2b$10$rQZ8K.WqGHVVJJJJJJJJJOqYJJJJJJJJJJJJJJJJJJJJJJOJJJJJJJ', // password: demo123
        role: 'COMPANY',
        isActive: true,
        emailVerifiedAt: new Date(),
        verificationCode: null,
        verificationCodeExpiresAt: null,
        loginCode: null,
        loginCodeExpiresAt: null,
        student: null,
        company: {
          id: 'demo-company-profile-1',
          name: 'Demo Company',
          email: 'company@demo.com',
          industry: 'Technology',
          location: 'Tashkent',
          size: 'SMALL',
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    for (const user of demoUsers) {
      this.users.set(user.id, user);
      this.emailIndex.set(user.email.toLowerCase(), user.id);
    }

    this.initialized = true;
    logger.info('🎭 Demo data store initialized with 2 demo users');
    logger.info('   - student@demo.com (password: demo123)');
    logger.info('   - company@demo.com (password: demo123)');
  }

  async findUserByEmail(email: string): Promise<DemoUser | null> {
    const userId = this.emailIndex.get(email.toLowerCase());
    if (!userId) return null;
    return this.users.get(userId) || null;
  }

  async findUserById(id: string): Promise<DemoUser | null> {
    return this.users.get(id) || null;
  }

  async createUser(userData: Partial<DemoUser>): Promise<DemoUser> {
    const id = `demo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const user: DemoUser = {
      id,
      email: userData.email!,
      password: userData.password!,
      role: userData.role!,
      isActive: true,
      emailVerifiedAt: null,
      verificationCode: userData.verificationCode || null,
      verificationCodeExpiresAt: userData.verificationCodeExpiresAt || null,
      loginCode: null,
      loginCodeExpiresAt: null,
      student: userData.student || null,
      company: userData.company || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    this.users.set(id, user);
    this.emailIndex.set(user.email.toLowerCase(), id);
    
    return user;
  }

  async updateUser(id: string, data: Partial<DemoUser>): Promise<DemoUser | null> {
    const user = this.users.get(id);
    if (!user) return null;
    
    const updated: DemoUser = {
      ...user,
      ...data,
      updatedAt: new Date(),
    };
    
    this.users.set(id, updated);
    return updated;
  }

  async deleteUser(id: string): Promise<boolean> {
    const user = this.users.get(id);
    if (!user) return false;
    
    this.emailIndex.delete(user.email.toLowerCase());
    return this.users.delete(id);
  }
}

export const demoDataStore = new DemoDataStore();
export const isDemoMode = !process.env.DATABASE_URL;
