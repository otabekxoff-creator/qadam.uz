/**
 * Analytics Service
 * Handles analytics and reporting API calls
 */

import { api } from './api';

export const analyticsService = {
  // Get student analytics
  getStudentAnalytics: async () => {
    return api.get('/analytics/student');
  },

  // Get company analytics
  getCompanyAnalytics: async () => {
    return api.get('/analytics/company');
  },

  // Get platform analytics (admin only)
  getPlatformAnalytics: async () => {
    return api.get('/analytics/platform');
  },

  // Get job view statistics
  getJobStats: async (jobId: string) => {
    return api.get(`/analytics/jobs/${jobId}`);
  },

  // Get application statistics
  getApplicationStats: async () => {
    return api.get('/analytics/applications');
  },

  // Export analytics data
  exportData: async (format: 'csv' | 'json' | 'pdf' = 'csv') => {
    return api.get(`/analytics/export?format=${format}`);
  },

  // Get skill demand analytics
  getSkillDemand: async () => {
    return api.get('/analytics/skills/demand');
  },

  // Get salary trends
  getSalaryTrends: async (filters?: { jobType?: string; location?: string; period?: string }) => {
    const queryParams = new URLSearchParams();
    if (filters?.jobType) queryParams.append('jobType', filters.jobType);
    if (filters?.location) queryParams.append('location', filters.location);
    if (filters?.period) queryParams.append('period', filters.period);
    
    return api.get(`/analytics/salary-trends?${queryParams.toString()}`);
  },

  // Get geographic distribution
  getGeographicDistribution: async () => {
    return api.get('/analytics/geographic');
  },

  // Get monthly trends
  getMonthlyTrends: async (metric: 'applications' | 'jobs' | 'users' = 'applications') => {
    return api.get(`/analytics/trends?metric=${metric}`);
  },

  // Report activity
  reportActivity: async (data: { type: string; metadata?: Record<string, any> }) => {
    return api.post('/analytics/activity', data);
  },
};

export default analyticsService;
