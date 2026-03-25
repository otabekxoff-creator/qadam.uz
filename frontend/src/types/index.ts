// =============================================
// User Types
// =============================================

export type UserRole = 'STUDENT' | 'COMPANY' | 'ADMIN';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

// =============================================
// Student Types
// =============================================

export interface Student {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  avatar?: string;
  phone?: string;
  birthDate?: string;
  gender?: 'MALE' | 'FEMALE';
  city?: string;
  address?: string;
  university?: string;
  faculty?: string;
  specialty?: string;
  major?: string;    // Qo'shildi
  gpa?: number;      // Qo'shildi
  course?: number;
  graduationYear?: number;
  educationLevel?: 'BACHELOR' | 'MASTER' | 'PHD';
  skills?: string[];
  experience?: Experience[];
  education?: Education[];
  languages?: Language[];
  certifications?: Certification[];
  resumeUrl?: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  telegramUrl?: string;
  about?: string;
  jobPreferences?: JobPreferences;
  isLookingForJob: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description?: string;
  skills?: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description?: string;
}

export interface Language {
  name: string;
  level: 'BEGINNER' | 'ELEMENTARY' | 'INTERMEDIATE' | 'UPPER_INTERMEDIATE' | 'ADVANCED' | 'NATIVE';
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
}

export interface JobPreferences {
  jobTypes?: ('FULL_TIME' | 'PART_TIME' | 'INTERNSHIP' | 'REMOTE' | 'CONTRACT')[];
  locations?: string[];
  salaryMin?: number;
  salaryMax?: number;
  currency?: 'UZS' | 'USD';
  industries?: string[];
  isRelocation?: boolean;
}

// =============================================
// Company Types
// =============================================

export interface Company {
  id: string;
  userId: string;
  name: string;
  logo?: string;
  coverImage?: string;
  description?: string;
  website?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  industry?: string;
  companySize?: '1-10' | '11-50' | '51-200' | '201-500' | '501-1000' | '1000+';
  location?: string; // Qo'shildi
  size?: string;     // Qo'shildi
  foundedYear?: number;
  linkedinUrl?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  telegramUrl?: string;
  benefits?: string[];
  technologies?: string[];
  isVerified: boolean;
  employeeCount?: number;
  createdAt: string;
  updatedAt: string;
}

// =============================================
// Job Types
// =============================================

export type JobType = 'FULL_TIME' | 'PART_TIME' | 'INTERNSHIP' | 'REMOTE' | 'CONTRACT';
export type JobStatus = 'DRAFT' | 'ACTIVE' | 'PAUSED' | 'CLOSED' | 'ARCHIVED';
export type ExperienceLevel = 'JUNIOR' | 'MIDDLE' | 'SENIOR' | 'LEAD' | 'EXECUTIVE';

export interface Job {
  id: string;
  companyId: string;
  company?: Company;
  title: string;
  description: string;
  requirements?: string[];
  responsibilities?: string[];
  benefits?: string[];
  skills?: string[];
  jobType: JobType;
  experienceLevel?: ExperienceLevel;
  salaryMin?: number;
  salaryMax?: number;
  currency?: 'UZS' | 'USD';
  isSalaryNegotiable?: boolean;
  location?: string;
  isRemote?: boolean;
  isHybrid?: boolean;
  status: JobStatus;
  applicationsCount?: number;
  viewsCount?: number;
  deadline?: string;
  createdAt: string;
  updatedAt: string;
}

export interface JobFilters {
  search?: string;
  jobType?: JobType[];
  experienceLevel?: ExperienceLevel[];
  location?: string[];
  salaryMin?: number;
  salaryMax?: number;
  skills?: string[];
  isRemote?: boolean;
  page?: number;
  limit?: number;
}

// =============================================
// Application Types
// =============================================

export type ApplicationStatus = 'PENDING' | 'REVIEWING' | 'INTERVIEW' | 'OFFERED' | 'REJECTED' | 'WITHDRAWN';

export interface Application {
  id: string;
  jobId: string;
  job?: Job;
  studentId: string;
  student?: Student;
  status: ApplicationStatus;
  coverLetter?: string;
  resumeUrl?: string;
  answers?: ApplicationAnswer[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApplicationAnswer {
  question: string;
  answer: string;
}

// =============================================
// Startup Types
// =============================================

export type StartupStatus = 'DRAFT' | 'PENDING' | 'APPROVED' | 'REJECTED' | 'FUNDED' | 'COMPLETED';
export type StartupStage = 'IDEA' | 'VALIDATION' | 'MVP' | 'GROWTH' | 'SCALING';

export interface Startup {
  id: string;
  studentId: string;
  student?: Student;
  name: string;
  logo?: string;
  pitchDeck?: string;
  description: string;
  problem: string;
  solution: string;
  marketAnalysis?: string;
  businessModel?: string;
  competitiveAdvantage?: string;
  team?: StartupTeamMember[];
  industry?: string;
  stage: StartupStage;
  fundingNeeded?: number;
  fundingCurrency?: 'UZS' | 'USD';
  fundingRaised?: number;
  equityOffered?: number;
  status: StartupStatus;
  rejectionReason?: string;
  views?: number;
  viewsCount?: number;
  likes?: number;
  likesCount?: number;
  investors?: number;
  tags?: string[];
  // Additional properties for enhanced functionality
  website?: string;
  founderName?: string;
  founderEmail?: string;
  founderUniversity?: string;
  teamSize?: string;
  category?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StartupTeamMember {
  id: string;
  name: string;
  role: string;
  email?: string;
  linkedinUrl?: string;
  bio?: string;
}

// =============================================
// API Response Types
// =============================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// =============================================
// Dashboard Stats Types
// =============================================

export interface StudentDashboardStats {
  applicationsCount: number;
  interviewsCount: number;
  offersCount: number;
  profileViews: number;
  pendingApplications: number;
  savedJobsCount: number;
}

export interface CompanyDashboardStats {
  activeJobsCount: number;
  totalApplicationsCount: number;
  newApplicationsCount: number;
  interviewsScheduled: number;
  profileViews: number;
  hiredCount: number;
}

export interface AdminDashboardStats {
  totalUsers: number;
  totalStudents: number;
  totalCompanies: number;
  totalStartups: number;
  totalJobs: number;
  totalApplications: number;
  activeUsers: number;
  newUsersToday: number;
}

// =============================================
// Chat Types
// =============================================

export interface Chat {
  id: string;
  participant1Id: string;
  participant2Id: string;
  participant1?: User;
  participant2?: User;
  lastMessage?: string;
  lastMessageAt?: string;
  isActive: boolean;
  unreadCount?: number;
  createdAt: string;
  updatedAt: string;
  messages?: Message[];
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  sender?: User;
  content: string;
  type: MessageType;
  isRead: boolean;
  metadata?: any;
  createdAt: string;
  updatedAt: string;
}

export type MessageType = 'TEXT' | 'VOICE' | 'IMAGE' | 'FILE';

// =============================================
// Notification Types
// =============================================

export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  data?: any;
  createdAt: string;
  updatedAt: string;
}
