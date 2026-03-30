/**
 * Application Service
 * Handles job application-related API calls
 */

import { api } from './api';
import { ApiResponse } from '@/types';

export interface Application {
  id: string;
  jobId: string;
  studentId: string;
  status: 'PENDING' | 'REVIEWING' | 'INTERVIEW' | 'OFFERED' | 'HIRED' | 'REJECTED' | 'WITHDRAWN';
  coverLetter?: string;
  resume?: string;
  expectedSalary?: number;
  availableFrom?: string;
  createdAt: string;
  updatedAt: string;
  job?: {
    id: string;
    title: string;
    company: {
      id: string;
      name: string;
      logo?: string;
    };
  };
}

export const applicationApi = {
  // Get my applications (student)
  getMyApplications: async (params?: { page?: number; limit?: number; status?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', String(params.page));
    if (params?.limit) queryParams.append('limit', String(params.limit));
    if (params?.status) queryParams.append('status', params.status);
    
    return api.get(`/applications/my?${queryParams.toString()}`);
  },

  // Get application by ID
  getApplicationById: async (id: string): Promise<ApiResponse<Application>> => {
    return api.get(`/applications/${id}`);
  },

  // Apply for job
  applyForJob: async (jobId: string, data: Partial<Application>): Promise<ApiResponse<Application>> => {
    return api.post(`/jobs/${jobId}/apply`, data);
  },

  // Withdraw application
  withdrawApplication: async (applicationId: string): Promise<ApiResponse<void>> => {
    return api.patch(`/applications/${applicationId}/withdraw`);
  },

  // Update application status (company)
  updateStatus: async (applicationId: string, status: string, notes?: string): Promise<ApiResponse<Application>> => {
    return api.patch(`/applications/${applicationId}/status`, { status, notes });
  },

  // Schedule interview
  scheduleInterview: async (applicationId: string, data: {
    type: string;
    scheduledAt: string;
    duration?: number;
    location?: string;
    meetingUrl?: string;
    notes?: string;
  }): Promise<ApiResponse<any>> => {
    return api.post(`/applications/${applicationId}/interviews`, data);
  },

  // Get application statistics
  getStats: async (): Promise<ApiResponse<any>> => {
    return api.get('/applications/stats');
  },

  // Get recent applications (company)
  getRecentApplications: async (limit: number = 10): Promise<ApiResponse<Application[]>> => {
    return api.get(`/applications/recent?limit=${limit}`);
  },

  // Get applications by job (company)
  getApplicationsByJob: async (jobId: string, params?: { page?: number; limit?: number; status?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', String(params.page));
    if (params?.limit) queryParams.append('limit', String(params.limit));
    if (params?.status) queryParams.append('status', params.status);
    
    return api.get(`/jobs/${jobId}/applications?${queryParams.toString()}`);
  },

  // Download application resume
  downloadResume: async (applicationId: string): Promise<Blob> => {
    const response = await fetch(`/api/applications/${applicationId}/resume`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
      },
    });
    return response.blob();
  },
};

export default applicationApi;
