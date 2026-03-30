import { useAuthStore } from '@/stores/authStore';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://sinergiya-backend.onrender.com/api';

interface ApiResponse<T = any> {
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

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const token = useAuthStore.getState().token;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }

    return data;
  }

  get<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  post<T>(endpoint: string, body: any) {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  put<T>(endpoint: string, body: any) {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  patch<T>(endpoint: string, body: any) {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  }

  delete<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const api = new ApiClient(API_URL);

// Auth API
export const authApi = {
  register: (data: { email: string; password: string; role: string; firstName?: string; lastName?: string; companyName?: string }) =>
    api.post('/auth/register', data),
  
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
  
  getMe: () => api.get('/auth/me'),
  
  refreshToken: (refreshToken: string) =>
    api.post('/auth/refresh', { refreshToken }),
};

// Jobs API
export const jobsApi = {
  getAll: (params?: { page?: number; limit?: number; search?: string; type?: string; location?: string }) =>
    api.get(`/jobs?${new URLSearchParams(params as any).toString()}`),
  
  getById: (id: string) => api.get(`/jobs/${id}`),
  
  create: (data: any) => api.post('/jobs', data),
  
  update: (id: string, data: any) => api.put(`/jobs/${id}`, data),
  
  delete: (id: string) => api.delete(`/jobs/${id}`),
};

// Applications API
export const applicationsApi = {
  getMy: () => api.get('/applications/my'),
  
  create: (data: { jobId: string; coverLetter?: string; resumeUrl?: string }) =>
    api.post('/applications', data),
  
  updateStatus: (id: string, status: string) =>
    api.patch(`/applications/${id}/status`, { status }),
};

// User API
export const userApi = {
  getProfile: () => api.get('/users/profile'),
  
  updateProfile: (data: any) => api.put('/users/profile', data),
};

// Notifications API
export const notificationsApi = {
  getMy: () => api.get('/notifications'),
  
  markAsRead: (id: string) => api.patch(`/notifications/${id}/read`, {}),
  
  markAllAsRead: () => api.patch('/notifications/read-all', {}),
  
  delete: (id: string) => api.delete(`/notifications/${id}`),
};

// AI Assistant API
export const aiApi = {
  ask: (data: { question: string; context?: string }) => api.post('/ai/ask', data),
  
  getHistory: () => api.get('/ai/history'),
  
  analyzeSkills: () => api.get('/ai/skills-analysis'),
  
  getJobRecommendations: () => api.get('/ai/job-recommendations'),
};
