/**
 * Company Service
 * Handles company-related API calls
 */

import { api } from './api';
import { ApiResponse } from '@/types';

export interface Company {
  id: string;
  name: string;
  description?: string;
  logo?: string;
  website?: string;
  email: string;
  phone?: string;
  industry?: string;
  size?: string;
  location?: string;
  isVerified: boolean;
}

export const companyApi = {
  // Get all companies
  getCompanies: async (params?: { page?: number; limit?: number; search?: string; industry?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', String(params.page));
    if (params?.limit) queryParams.append('limit', String(params.limit));
    if (params?.search) queryParams.append('search', params.search);
    if (params?.industry) queryParams.append('industry', params.industry);
    
    return api.get(`/companies?${queryParams.toString()}`);
  },

  // Get company by ID
  getCompanyById: async (id: string): Promise<ApiResponse<Company>> => {
    return api.get(`/companies/${id}`);
  },

  // Update company profile
  updateProfile: async (data: Partial<Company>): Promise<ApiResponse<Company>> => {
    return api.patch('/company/profile', data);
  },

  // Upload company logo
  uploadLogo: async (file: File): Promise<ApiResponse<{ logo: string }>> => {
    const formData = new FormData();
    formData.append('logo', file);
    
    return api.post('/company/logo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Get company jobs
  getCompanyJobs: async (companyId: string, params?: { page?: number; limit?: number; isActive?: boolean }) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', String(params.page));
    if (params?.limit) queryParams.append('limit', String(params.limit));
    if (params?.isActive !== undefined) queryParams.append('isActive', String(params.isActive));
    
    return api.get(`/companies/${companyId}/jobs?${queryParams.toString()}`);
  },

  // Get company stats
  getStats: async (): Promise<ApiResponse<any>> => {
    return api.get('/company/stats');
  },

  // Get company applications
  getApplications: async (params?: { page?: number; limit?: number; status?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', String(params.page));
    if (params?.limit) queryParams.append('limit', String(params.limit));
    if (params?.status) queryParams.append('status', params.status);
    
    return api.get(`/company/applications?${queryParams.toString()}`);
  },

  // Follow company
  followCompany: async (companyId: string): Promise<ApiResponse<void>> => {
    return api.post(`/companies/${companyId}/follow`);
  },

  // Unfollow company
  unfollowCompany: async (companyId: string): Promise<ApiResponse<void>> => {
    return api.delete(`/companies/${companyId}/follow`);
  },

  // Get followed companies
  getFollowedCompanies: async (): Promise<ApiResponse<Company[]>> => {
    return api.get('/companies/followed');
  },

  // Get company followers count
  getFollowersCount: async (companyId: string): Promise<ApiResponse<{ count: number }>> => {
    return api.get(`/companies/${companyId}/followers-count`);
  },

  // Get similar companies
  getSimilarCompanies: async (companyId: string): Promise<ApiResponse<Company[]>> => {
    return api.get(`/companies/${companyId}/similar`);
  },

  // Get top companies
  getTopCompanies: async (limit: number = 10): Promise<ApiResponse<Company[]>> => {
    return api.get(`/companies/top?limit=${limit}`);
  },

  // Get industries
  getIndustries: async (): Promise<ApiResponse<string[]>> => {
    return api.get('/companies/industries');
  },
};

export default companyApi;
