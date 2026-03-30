export interface User {
  id: string;
  email: string;
  role: 'STUDENT' | 'COMPANY' | 'ADMIN';
  isVerified: boolean;
  student?: StudentProfile;
  company?: CompanyProfile;
}

export interface StudentProfile {
  id: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  university?: string;
  faculty?: string;
  major?: string;
  educationLevel?: 'HIGH_SCHOOL' | 'BACHELOR' | 'MASTER' | 'PHD';
  course?: number;
  gpa?: number;
  skills: string[];
  about?: string;
  portfolio?: string;
  resume?: string;
  location?: string;
}

export interface CompanyProfile {
  id: string;
  name: string;
  logo?: string;
  description?: string;
  website?: string;
  email?: string;
  phone?: string;
  industry?: string;
  companySize?: string;
  location?: string;
  isVerified: boolean;
}

export interface Job {
  id: string;
  companyId: string;
  title: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  type: 'FULL_TIME' | 'PART_TIME' | 'INTERNSHIP' | 'CONTRACT' | 'REMOTE';
  location?: string;
  isRemote: boolean;
  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency: string;
  skills: string[];
  experienceLevel?: string;
  isActive: boolean;
  expiresAt?: string;
  viewsCount: number;
  createdAt: string;
  updatedAt: string;
  company?: CompanyProfile;
}

export interface Application {
  id: string;
  jobId: string;
  studentId: string;
  status: 'PENDING' | 'REVIEWING' | 'INTERVIEW' | 'OFFERED' | 'REJECTED' | 'HIRED';
  coverLetter?: string;
  resumeUrl?: string;
  createdAt: string;
  updatedAt: string;
  job?: Job;
  student?: StudentProfile;
}

export interface Chat {
  id: string;
  name?: string;
  isGroup: boolean;
  createdAt: string;
  updatedAt: string;
  members: ChatMember[];
  messages?: Message[];
  lastMessage?: Message;
}

export interface ChatMember {
  id: string;
  chatId: string;
  userId: string;
  joinedAt: string;
  user?: User;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  type: 'TEXT' | 'IMAGE' | 'FILE';
  isRead: boolean;
  createdAt: string;
  sender?: User;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Array<{ field: string; message: string }>;
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
