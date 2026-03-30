/**
 * Extended auth service with comprehensive authentication functionality
 * Social auth, MFA, session management
 */

import { NextRequest, NextResponse } from 'next/server';
import { API_URL } from '@/config/api';
import { authApi } from '@/services/api';

// ============================================================================
// Social Authentication
// ============================================================================

export const initiateGoogleAuth = () => {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google/callback`;
  const scope = 'email profile';
  
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${clientId}&` +
    `redirect_uri=${redirectUri}&` +
    `response_type=code&` +
    `scope=${encodeURIComponent(scope)}&` +
    `access_type=offline&` +
    `prompt=consent`;
  
  window.location.href = googleAuthUrl;
};

export const initiateLinkedInAuth = () => {
  const clientId = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID;
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/linkedin/callback`;
  const scope = 'r_liteprofile r_emailaddress';
  
  const linkedinAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?` +
    `client_id=${clientId}&` +
    `redirect_uri=${redirectUri}&` +
    `response_type=code&` +
    `scope=${encodeURIComponent(scope)}`;
  
  window.location.href = linkedinAuthUrl;
};

export const handleSocialCallback = async (provider: string, code: string) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/social/${provider}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });

    const data = await response.json();
    
    if (data.success) {
      localStorage.setItem('auth_token', data.data.token);
      localStorage.setItem('refresh_token', data.data.refreshToken);
      return { success: true, data: data.data };
    }
    
    return { success: false, error: data.message };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// ============================================================================
// Multi-Factor Authentication
// ============================================================================

export const setupMFA = async (type: 'authenticator' | 'sms' | 'email') => {
  try {
    const response = await authApi.post('/auth/mfa/setup', { type });
    
    if (response.success) {
      return {
        success: true,
        secret: response.data.secret,
        qrCode: response.data.qrCode,
        backupCodes: response.data.backupCodes,
      };
    }
    
    return { success: false, error: response.message };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const verifyMFA = async (code: string, method: 'authenticator' | 'sms' | 'email') => {
  try {
    const response = await authApi.post('/auth/mfa/verify', { code, method });
    
    if (response.success) {
      localStorage.setItem('auth_token', response.data.token);
      return { success: true, data: response.data };
    }
    
    return { success: false, error: response.message };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const disableMFA = async (password: string) => {
  try {
    const response = await authApi.post('/auth/mfa/disable', { password });
    return { success: response.success, error: response.message };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// ============================================================================
// Session Management
// ============================================================================

export const refreshSession = async () => {
  try {
    const refreshToken = localStorage.getItem('refresh_token');
    
    if (!refreshToken) {
      return { success: false, error: 'No refresh token' };
    }

    const response = await fetch(`${API_URL}/api/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    const data = await response.json();
    
    if (data.success) {
      localStorage.setItem('auth_token', data.data.token);
      localStorage.setItem('refresh_token', data.data.refreshToken);
      return { success: true, data: data.data };
    }
    
    return { success: false, error: data.message };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const validateSession = async () => {
  try {
    const token = localStorage.getItem('auth_token');
    
    if (!token) {
      return { valid: false, error: 'No token' };
    }

    const response = await fetch(`${API_URL}/api/auth/validate`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return { valid: data.success, user: data.data };
  } catch (error: any) {
    return { valid: false, error: error.message };
  }
};

export const getSessionInfo = () => {
  const token = localStorage.getItem('auth_token');
  const refreshToken = localStorage.getItem('refresh_token');
  
  if (!token) return null;
  
  try {
    // Decode JWT payload
    const base64Payload = token.split('.')[1];
    const payload = JSON.parse(atob(base64Payload));
    
    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
      iat: payload.iat,
      exp: payload.exp,
      isExpired: Date.now() >= payload.exp * 1000,
      token,
      refreshToken,
    };
  } catch {
    return null;
  }
};

// ============================================================================
// Password Management
// ============================================================================

export const changePassword = async (currentPassword: string, newPassword: string) => {
  try {
    const response = await authApi.post('/auth/change-password', {
      currentPassword,
      newPassword,
    });
    
    return { success: response.success, error: response.message };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const requestPasswordReset = async (email: string) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    return { success: data.success, message: data.message };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const resetPassword = async (token: string, newPassword: string) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, newPassword }),
    });

    const data = await response.json();
    return { success: data.success, message: data.message };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const checkPasswordStrength = (password: string): {
  score: number;
  strength: 'weak' | 'fair' | 'good' | 'strong';
  feedback: string[];
} => {
  const feedback: string[] = [];
  let score = 0;

  if (password.length >= 8) score++;
  else feedback.push('Kamida 8 ta belgi');

  if (/[A-Z]/.test(password)) score++;
  else feedback.push('Kamida 1 ta katta harf');

  if (/[a-z]/.test(password)) score++;
  else feedback.push('Kamida 1 ta kichik harf');

  if (/[0-9]/.test(password)) score++;
  else feedback.push('Kamida 1 ta raqam');

  if (/[^A-Za-z0-9]/.test(password)) score++;
  else feedback.push('Kamida 1 ta maxsus belgi');

  const strength = score <= 2 ? 'weak' : score <= 3 ? 'fair' : score === 4 ? 'good' : 'strong';

  return { score, strength, feedback };
};

// ============================================================================
// Account Management
// ============================================================================

export const deleteAccount = async (password: string, reason?: string) => {
  try {
    const response = await authApi.post('/auth/delete-account', { password, reason });
    
    if (response.success) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
    }
    
    return { success: response.success, error: response.message };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const exportUserData = async () => {
  try {
    const response = await authApi.get('/auth/export-data');
    
    if (response.success) {
      // Create and download JSON file
      const dataStr = JSON.stringify(response.data, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `stepuz-data-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      return { success: true };
    }
    
    return { success: false, error: response.message };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// ============================================================================
// Device & Security
// ============================================================================

export const getActiveSessions = async () => {
  try {
    const response = await authApi.get('/auth/sessions');
    return { success: response.success, sessions: response.data || [] };
  } catch (error: any) {
    return { success: false, error: error.message, sessions: [] };
  }
};

export const revokeSession = async (sessionId: string) => {
  try {
    const response = await authApi.post('/auth/sessions/revoke', { sessionId });
    return { success: response.success, error: response.message };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const revokeAllSessions = async (exceptCurrent: boolean = true) => {
  try {
    const response = await authApi.post('/auth/sessions/revoke-all', { exceptCurrent });
    return { success: response.success, error: response.message };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// ============================================================================
// Security Events
// ============================================================================

export const getSecurityEvents = async (limit: number = 50) => {
  try {
    const response = await authApi.get(`/auth/security-events?limit=${limit}`);
    return { success: response.success, events: response.data || [] };
  } catch (error: any) {
    return { success: false, error: error.message, events: [] };
  }
};

export const reportSuspiciousActivity = async (description: string) => {
  try {
    const response = await authApi.post('/auth/report', { description });
    return { success: response.success, error: response.message };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// ============================================================================
// reCAPTCHA
// ============================================================================

export const verifyRecaptcha = async (token: string) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/verify-recaptcha`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    const data = await response.json();
    return { success: data.success, score: data.score };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// ============================================================================
// Auth State Helpers
// ============================================================================

export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  const token = localStorage.getItem('auth_token');
  if (!token) return false;
  
  try {
    const base64Payload = token.split('.')[1];
    const payload = JSON.parse(atob(base64Payload));
    return Date.now() < payload.exp * 1000;
  } catch {
    return false;
  }
};

export const getUserRole = (): string | null => {
  if (typeof window === 'undefined') return null;
  const session = getSessionInfo();
  return session?.role || null;
};

export const hasRole = (role: string): boolean => {
  return getUserRole() === role;
};

export const requireAuth = (callback?: () => void) => {
  if (!isAuthenticated()) {
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    return false;
  }
  callback?.();
  return true;
};

export const requireRole = (role: string, callback?: () => void) => {
  if (!isAuthenticated() || !hasRole(role)) {
    if (typeof window !== 'undefined') {
      window.location.href = '/unauthorized';
    }
    return false;
  }
  callback?.();
  return true;
};
