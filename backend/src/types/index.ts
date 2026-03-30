export interface User {
  id: string;
  email: string;
  password: string;
  role: 'STUDENT' | 'COMPANY' | 'ADMIN';
  isVerified: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
  student?: Student;
  company?: Company;
}

export interface Student {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  phone?: string;
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
  birthDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Company {
  id: string;
  userId: string;
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
  createdAt: Date;
  updatedAt: Date;
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
  expiresAt?: Date;
  viewsCount: number;
  createdAt: Date;
  updatedAt: Date;
  company?: Company;
}

export interface Application {
  id: string;
  jobId: string;
  studentId: string;
  status: 'PENDING' | 'REVIEWING' | 'INTERVIEW' | 'OFFERED' | 'REJECTED' | 'HIRED';
  coverLetter?: string;
  resumeUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  job?: Job;
  student?: Student;
}

export interface Chat {
  id: string;
  name?: string;
  isGroup: boolean;
  createdAt: Date;
  updatedAt: Date;
  members: ChatMember[];
  messages?: Message[];
}

export interface ChatMember {
  id: string;
  chatId: string;
  userId: string;
  joinedAt: Date;
  user?: User;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  type: string;
  isRead: boolean;
  createdAt: Date;
  sender?: User;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: Date;
}
