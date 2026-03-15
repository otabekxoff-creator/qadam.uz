// =============================================
// API Configuration
// =============================================

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// =============================================
// API Client
// =============================================

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('token');
    }
  }

  setToken(token: string | null) {
    this.token = token;
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('token', token);
      } else {
        localStorage.removeItem('token');
      }
    }
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return headers;
  }

  private async request<T>(method: string, endpoint: string, data?: unknown, params?: Record<string, string | number | boolean | undefined>): Promise<T> {
    let url = `${this.baseUrl}${endpoint}`;
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
      const queryString = searchParams.toString();
      if (queryString) url += `?${queryString}`;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 soniya timeout

    try {
      const response = await fetch(url, {
        method,
        headers: this.getHeaders(),
        body: data ? JSON.stringify(data) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Serverda xatolik yuz berdi' }));
        throw new Error(error.message || 'Xatolik yuz berdi');
      }

      const jsonResponse = await response.json();
      
      // Agar backend data wrapper qaytarsa, uni ochamiz
      if (jsonResponse && typeof jsonResponse === 'object' && 'data' in jsonResponse) {
        return jsonResponse.data;
      }
      
      return jsonResponse;
    } catch (error: any) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw new Error('So\'rov vaqti tugadi (Timeout). Internet aloqasini tekshiring.');
      }
      throw error;
    }
  }

  async get<T>(endpoint: string, params?: Record<string, string | number | boolean | undefined>): Promise<T> {
    return this.request<T>('GET', endpoint, undefined, params);
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>('POST', endpoint, data);
  }

  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>('PUT', endpoint, data);
  }

  async patch<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>('PATCH', endpoint, data);
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>('DELETE', endpoint);
  }
}

// =============================================
// API Instance
// =============================================

export const api = new ApiClient(API_BASE_URL);

// =============================================
// Auth API
// =============================================

export const authApi = {
  login: (email: string, password: string) =>
    api.post<{ token: string; user: import('@/types').User; student?: import('@/types').Student; company?: import('@/types').Company }>('/auth/login', { email, password }),

  register: (data: { email: string; password: string; role: import('@/types').UserRole; firstName?: string; lastName?: string; name?: string }) =>
    api.post<{ email: string }>('/auth/register', data),

  verifyRegister: (email: string, code: string) =>
    api.post<{ token: string; user: import('@/types').User; student?: import('@/types').Student; company?: import('@/types').Company }>('/auth/register/verify', { email, code }),

  verifyLogin: (email: string, code: string) =>
    api.post<{ token: string; user: import('@/types').User; student?: import('@/types').Student; company?: import('@/types').Company }>('/auth/login/verify', { email, code }),

  logout: () =>
    api.post('/auth/logout'),

  me: () =>
    api.get<{ user: import('@/types').User; student?: import('@/types').Student; company?: import('@/types').Company }>('/auth/me'),

  forgotPassword: (email: string) =>
    api.post('/auth/forgot-password', { email }),

  resetPassword: (token: string, password: string) =>
    api.post('/auth/reset-password', { token, password }),

  verifyEmail: (token: string) =>
    api.post('/auth/verify-email', { token }),
};

// =============================================
// Jobs API
// =============================================

export const jobsApi = {
  getAll: (params?: import('@/types').JobFilters) =>
    api.get<import('@/types').PaginatedResponse<import('@/types').Job>>('/jobs', params as Record<string, string | number | boolean | undefined>),

  getById: (id: string) =>
    api.get<import('@/types').Job>(`/jobs/${id}`),

  create: (data: Partial<import('@/types').Job>) =>
    api.post<import('@/types').Job>('/jobs', data),

  update: (id: string, data: Partial<import('@/types').Job>) =>
    api.put<import('@/types').Job>(`/jobs/${id}`, data),

  delete: (id: string) =>
    api.delete(`/jobs/${id}`),

  getMyJobs: (params?: { page?: number; limit?: number; status?: string }) =>
    api.get<import('@/types').PaginatedResponse<import('@/types').Job>>('/jobs/my', params as Record<string, string | number | boolean | undefined>),

  getApplications: (jobId: string) =>
    api.get<import('@/types').Application[]>(`/jobs/${jobId}/applications`),
};

// =============================================
// Applications API
// =============================================

export const applicationsApi = {
  apply: (jobId: string, data: { coverLetter?: string; resumeUrl?: string }) =>
    api.post<import('@/types').Application>(`/jobs/${jobId}/apply`, data),

  getMyApplications: (params?: { page?: number; limit?: number; status?: string }) =>
    api.get<import('@/types').PaginatedResponse<import('@/types').Application>>('/applications/my', params as Record<string, string | number | boolean | undefined>),

  updateStatus: (applicationId: string, status: import('@/types').ApplicationStatus) =>
    api.patch<import('@/types').Application>(`/applications/${applicationId}/status`, { status }),

  withdraw: (applicationId: string) =>
    api.post(`/applications/${applicationId}/withdraw`),
};

// =============================================
// Startups API
// =============================================

export const startupsApi = {
  getAll: (params?: { page?: number; limit?: number; status?: string; stage?: string }) =>
    api.get<import('@/types').PaginatedResponse<import('@/types').Startup>>('/startups', params as Record<string, string | number | boolean | undefined>),

  getById: (id: string) =>
    api.get<import('@/types').Startup>(`/startups/${id}`),

  create: (data: Partial<import('@/types').Startup>) =>
    api.post<import('@/types').Startup>('/startups', data),

  update: (id: string, data: Partial<import('@/types').Startup>) =>
    api.put<import('@/types').Startup>(`/startups/${id}`, data),

  delete: (id: string) =>
    api.delete(`/startups/${id}`),

  getMyStartups: (params?: { page?: number; limit?: number }) =>
    api.get<import('@/types').PaginatedResponse<import('@/types').Startup>>('/startups/my', params as Record<string, string | number | boolean | undefined>),

  submitForReview: (id: string) =>
    api.post<import('@/types').Startup>(`/startups/${id}/submit`),
};

// =============================================
// Companies API
// =============================================

export const companiesApi = {
  getAll: (params?: { page?: number; limit?: number; industry?: string }) =>
    api.get<import('@/types').PaginatedResponse<import('@/types').Company>>('/companies', params as Record<string, string | number | boolean | undefined>),

  getById: (id: string) =>
    api.get<import('@/types').Company>(`/companies/${id}`),

  getProfile: () =>
    api.get<import('@/types').Company>('/companies/profile'),

  updateProfile: (data: Partial<import('@/types').Company>) =>
    api.put<import('@/types').Company>('/companies/profile', data),

  getJobs: (companyId: string) =>
    api.get<import('@/types').Job[]>(`/companies/${companyId}/jobs`),

  getDashboard: () =>
    api.get<import('@/types').CompanyDashboardStats>('/companies/dashboard'),
};

// =============================================
// Students API
// =============================================

export const studentsApi = {
  getProfile: () =>
    api.get<import('@/types').Student>('/students/profile'),

  updateProfile: (data: Partial<import('@/types').Student>) =>
    api.put<import('@/types').Student>('/students/profile', data),

  getDashboard: () =>
    api.get<import('@/types').StudentDashboardStats>('/students/dashboard'),

  getApplications: (params?: { page?: number; limit?: number; status?: string }) =>
    api.get<import('@/types').PaginatedResponse<import('@/types').Application>>('/students/applications', params as Record<string, string | number | boolean | undefined>),
};
