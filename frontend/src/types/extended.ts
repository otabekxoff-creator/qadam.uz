/**
 * Extended types and interfaces for Step.uz platform
 * Comprehensive type definitions for frontend and backend
 */

// ============================================================================
// User Types
// ============================================================================

export interface User {
  id: string;
  email: string;
  role: 'STUDENT' | 'COMPANY' | 'ADMIN';
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  profile?: StudentProfile | CompanyProfile;
}

export interface StudentProfile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  phone?: string;
  bio?: string;
  major?: string;
  university?: string;
  course?: number;
  educationLevel: 'HIGH_SCHOOL' | 'ASSOCIATE' | 'BACHELOR' | 'MASTER' | 'PHD' | 'OTHER';
  skills: string[];
  experience: Experience[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  resume?: string;
  portfolio?: string;
  github?: string;
  linkedin?: string;
  location?: string;
  dateOfBirth?: string;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  expectedSalary?: number;
  preferredJobTypes: string[];
  preferredLocations: string[];
  isOpenToWork: boolean;
  isLookingForInternship: boolean;
}

export interface CompanyProfile {
  id: string;
  userId: string;
  name: string;
  description?: string;
  logo?: string;
  website?: string;
  email: string;
  phone?: string;
  industry?: string;
  size?: 'STARTUP' | 'SMALL' | 'MEDIUM' | 'LARGE' | 'ENTERPRISE';
  location?: string;
  foundedYear?: number;
  isVerified: boolean;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  benefits: string[];
  culture?: string;
  mission?: string;
  vision?: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description?: string;
  skills: string[];
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  url?: string;
  githubUrl?: string;
  technologies: string[];
  startDate?: string;
  endDate?: string;
  isOngoing: boolean;
  images?: string[];
}

export interface Certification {
  id: string;
  name: string;
  organization: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  image?: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'FLUENT' | 'NATIVE';
}

// ============================================================================
// Job Types
// ============================================================================

export interface Job {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  skills: string[];
  type: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERNSHIP' | 'FREELANCE' | 'REMOTE';
  experienceLevel: 'ENTRY' | 'JUNIOR' | 'MID' | 'SENIOR' | 'LEAD' | 'EXECUTIVE';
  location?: string;
  isRemote: boolean;
  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency: string;
  benefits: string[];
  companyId: string;
  company?: CompanyProfile;
  isActive: boolean;
  viewsCount: number;
  applicationsCount: number;
  createdAt: string;
  updatedAt: string;
  expiresAt?: string;
  department?: string;
  category?: string;
  tags: string[];
}

export interface JobFilter {
  search?: string;
  type?: string;
  experienceLevel?: string;
  location?: string;
  isRemote?: boolean;
  salaryMin?: number;
  salaryMax?: number;
  skills?: string[];
  companyId?: string;
  category?: string;
  sortBy?: 'relevance' | 'newest' | 'salary' | 'views';
  page?: number;
  limit?: number;
}

// ============================================================================
// Application Types
// ============================================================================

export interface Application {
  id: string;
  jobId: string;
  job?: Job;
  studentId: string;
  student?: StudentProfile;
  status: 'PENDING' | 'REVIEWING' | 'INTERVIEW' | 'OFFERED' | 'HIRED' | 'REJECTED' | 'WITHDRAWN';
  coverLetter?: string;
  resume?: string;
  portfolio?: string;
  expectedSalary?: number;
  availableFrom?: string;
  answers?: Record<string, string>;
  notes?: string;
  rating?: number;
  createdAt: string;
  updatedAt: string;
  interviews: Interview[];
  timeline: ApplicationTimeline[];
}

export interface Interview {
  id: string;
  applicationId: string;
  type: 'PHONE' | 'VIDEO' | 'IN_PERSON' | 'TECHNICAL' | 'HR';
  scheduledAt: string;
  duration?: number;
  location?: string;
  meetingUrl?: string;
  notes?: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';
  feedback?: string;
  rating?: number;
  interviewer?: string;
}

export interface ApplicationTimeline {
  id: string;
  status: string;
  notes?: string;
  createdAt: string;
  createdBy?: string;
}

// ============================================================================
// Chat Types
// ============================================================================

export interface Chat {
  id: string;
  name?: string;
  isGroup: boolean;
  members: ChatMember[];
  messages: Message[];
  lastMessage?: Message;
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
  avatar?: string;
}

export interface ChatMember {
  id: string;
  chatId: string;
  userId: string;
  user?: User;
  role: 'ADMIN' | 'MEMBER';
  joinedAt: string;
  lastReadAt?: string;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  sender?: User;
  content: string;
  type: 'TEXT' | 'IMAGE' | 'FILE' | 'SYSTEM';
  attachments?: Attachment[];
  isRead: boolean;
  isEdited: boolean;
  replyTo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
}

// ============================================================================
// Notification Types
// ============================================================================

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, any>;
  isRead: boolean;
  createdAt: string;
  readAt?: string;
  link?: string;
  image?: string;
}

export type NotificationType =
  | 'JOB_APPLICATION'
  | 'APPLICATION_STATUS'
  | 'INTERVIEW_SCHEDULED'
  | 'MESSAGE'
  | 'JOB_ALERT'
  | 'SYSTEM'
  | 'PROFILE_VIEW'
  | 'NEW_JOB_POSTED'
  | 'SAVED_JOB_EXPIRING'
  | 'MENTION';

export interface NotificationPreferences {
  email: {
    jobApplications: boolean;
    applicationStatus: boolean;
    interviewScheduled: boolean;
    messages: boolean;
    jobAlerts: boolean;
    systemUpdates: boolean;
  };
  push: {
    jobApplications: boolean;
    applicationStatus: boolean;
    interviewScheduled: boolean;
    messages: boolean;
    jobAlerts: boolean;
    systemUpdates: boolean;
  };
}

// ============================================================================
// AI Types
// ============================================================================

export interface AIConversation {
  id: string;
  userId: string;
  question: string;
  answer: string;
  context?: string;
  createdAt: string;
}

export interface AISkillAnalysis {
  currentSkills: string[];
  missingSkills: string[];
  recommendations: SkillRecommendation[];
  careerPath: string;
  learningResources: LearningResource[];
}

export interface SkillRecommendation {
  skill: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  reason: string;
  courses: LearningResource[];
}

export interface LearningResource {
  title: string;
  url: string;
  type: 'COURSE' | 'TUTORIAL' | 'DOCUMENTATION' | 'PRACTICE';
  provider: string;
  duration?: string;
  isFree: boolean;
}

export interface JobRecommendation {
  job: Job;
  matchScore: number;
  matchReasons: string[];
  skillGaps: string[];
}

// ============================================================================
// Analytics Types
// ============================================================================

export interface StudentAnalytics {
  totalApplications: number;
  applicationsByStatus: Record<string, number>;
  successRate: number;
  monthlyTrend: MonthlyStat[];
  skillsDemand: SkillDemand[];
  recentActivity: ActivityItem[];
}

export interface CompanyAnalytics {
  totalJobs: number;
  activeJobs: number;
  totalApplications: number;
  totalViews: number;
  conversionRate: number;
  jobsPerformance: JobPerformance[];
  applicationsByStatus: Record<string, number>;
  topApplicantsBySkills: SkillCount[];
  recentApplications: Application[];
}

export interface MonthlyStat {
  month: string;
  count: number;
}

export interface SkillDemand {
  skill: string;
  count: number;
}

export interface SkillCount {
  skill: string;
  uniqueApplicants: number;
}

export interface JobPerformance {
  jobId: string;
  title: string;
  totalApplications: number;
  viewsCount: number;
  conversionRate: number;
}

export interface ActivityItem {
  id: string;
  jobTitle: string;
  status: string;
  date: string;
}

// ============================================================================
// API Response Types
// ============================================================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    totalPages?: number;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// ============================================================================
// Form Types
// ============================================================================

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  role: 'STUDENT' | 'COMPANY';
  firstName?: string;
  lastName?: string;
  companyName?: string;
  agreeToTerms: boolean;
}

export interface JobFormData {
  title: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  skills: string[];
  type: string;
  experienceLevel: string;
  location?: string;
  isRemote: boolean;
  salaryMin?: number;
  salaryMax?: number;
  benefits: string[];
  department?: string;
  category?: string;
  tags: string[];
  expiresAt?: string;
}

export interface ProfileFormData {
  firstName?: string;
  lastName?: string;
  phone?: string;
  bio?: string;
  major?: string;
  university?: string;
  course?: number;
  educationLevel?: string;
  skills?: string[];
  location?: string;
  expectedSalary?: number;
  preferredJobTypes?: string[];
  preferredLocations?: string[];
  isOpenToWork?: boolean;
  isLookingForInternship?: boolean;
}

// ============================================================================
// UI Types
// ============================================================================

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

export interface Modal {
  id: string;
  isOpen: boolean;
  title?: string;
  content?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

export interface SortOption {
  value: string;
  label: string;
}

export interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: number;
}

// ============================================================================
// Search Types
// ============================================================================

export interface SearchFilters {
  query?: string;
  type?: 'jobs' | 'companies' | 'people';
  location?: string;
  skills?: string[];
  experience?: string;
  salary?: {
    min?: number;
    max?: number;
  };
  remote?: boolean;
  datePosted?: '24h' | 'week' | 'month' | 'any';
}

export interface SearchSuggestion {
  id: string;
  type: 'job' | 'company' | 'skill' | 'location';
  title: string;
  subtitle?: string;
  icon?: string;
}

// ============================================================================
// Export all
// ============================================================================

export default {
  User,
  StudentProfile,
  CompanyProfile,
  Job,
  Application,
  Chat,
  Message,
  Notification,
  AIConversation,
  StudentAnalytics,
  CompanyAnalytics,
  ApiResponse,
};
