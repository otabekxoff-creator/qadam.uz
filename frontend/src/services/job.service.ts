/**
 * Job Service
 * Extended job-related API functions
 */

import { api } from './api';
import { Job, JobFilter, Application, ApiResponse } from '@/types';

export const jobService = {
  // Get all jobs with filtering
  getJobs: async (filters?: JobFilter): Promise<ApiResponse<{ jobs: Job[]; total: number }>> => {
    const queryParams = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, String(value));
        }
      });
    }
    
    return api.get(`/jobs?${queryParams.toString()}`);
  },

  // Get job by ID
  getJobById: async (id: string): Promise<ApiResponse<Job>> => {
    return api.get(`/jobs/${id}`);
  },

  // Create new job (company only)
  createJob: async (data: Partial<Job>): Promise<ApiResponse<Job>> => {
    return api.post('/jobs', data);
  },

  // Update job
  updateJob: async (id: string, data: Partial<Job>): Promise<ApiResponse<Job>> => {
    return api.patch(`/jobs/${id}`, data);
  },

  // Delete job
  deleteJob: async (id: string): Promise<ApiResponse<void>> => {
    return api.delete(`/jobs/${id}`);
  },

  // Apply for job
  applyForJob: async (jobId: string, data: Partial<Application>): Promise<ApiResponse<Application>> => {
    return api.post(`/jobs/${jobId}/apply`, data);
  },

  // Save/Bookmark job
  saveJob: async (jobId: string): Promise<ApiResponse<void>> => {
    return api.post(`/jobs/${jobId}/save`);
  },

  // Unsave job
  unsaveJob: async (jobId: string): Promise<ApiResponse<void>> => {
    return api.delete(`/jobs/${jobId}/save`);
  },

  // Get saved jobs
  getSavedJobs: async (): Promise<ApiResponse<Job[]>> => {
    return api.get('/jobs/saved');
  },

  // Get recommended jobs
  getRecommendedJobs: async (): Promise<ApiResponse<Job[]>> => {
    return api.get('/jobs/recommended');
  },

  // Get similar jobs
  getSimilarJobs: async (jobId: string): Promise<ApiResponse<Job[]>> => {
    return api.get(`/jobs/${jobId}/similar`);
  },

  // Search jobs
  searchJobs: async (query: string, filters?: JobFilter): Promise<ApiResponse<{ jobs: Job[]; total: number }>> => {
    const queryParams = new URLSearchParams({ q: query });
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, String(value));
        }
      });
    }
    
    return api.get(`/jobs/search?${queryParams.toString()}`);
  },

  // Get job categories
  getCategories: async (): Promise<ApiResponse<string[]>> => {
    return api.get('/jobs/categories');
  },

  // Get job locations
  getLocations: async (): Promise<ApiResponse<string[]>> => {
    return api.get('/jobs/locations');
  },

  // Get job skills
  getPopularSkills: async (): Promise<ApiResponse<string[]>> => {
    return api.get('/jobs/skills/popular');
  },

  // Get job statistics
  getJobStats: async (jobId: string): Promise<ApiResponse<any>> => {
    return api.get(`/jobs/${jobId}/stats`);
  },

  // Get company jobs
  getCompanyJobs: async (companyId: string): Promise<ApiResponse<Job[]>> => {
    return api.get(`/companies/${companyId}/jobs`);
  },

  // Toggle job active status
  toggleJobStatus: async (jobId: string, isActive: boolean): Promise<ApiResponse<Job>> => {
    return api.patch(`/jobs/${jobId}`, { isActive });
  },

  // Get job applicants (company only)
  getJobApplicants: async (jobId: string): Promise<ApiResponse<Application[]>> => {
    return api.get(`/jobs/${jobId}/applicants`);
  },

  // Get recent jobs
  getRecentJobs: async (limit: number = 10): Promise<ApiResponse<Job[]>> => {
    return api.get(`/jobs/recent?limit=${limit}`);
  },

  // Get featured jobs
  getFeaturedJobs: async (): Promise<ApiResponse<Job[]>> => {
    return api.get('/jobs/featured');
  },

  // Get urgent jobs
  getUrgentJobs: async (): Promise<ApiResponse<Job[]>> => {
    return api.get('/jobs/urgent');
  },
};

export default jobService;
