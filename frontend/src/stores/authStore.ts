import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  role: 'STUDENT' | 'COMPANY' | 'ADMIN';
  isVerified: boolean;
  student?: {
    id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    university?: string;
    major?: string;
  };
  company?: {
    id: string;
    name: string;
    logo?: string;
    isVerified: boolean;
  };
}

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  setUser: (user: User | null) => void;
  setTokens: (token: string, refreshToken: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: true,
      
      setUser: (user) => set({ 
        user, 
        isAuthenticated: !!user 
      }),
      
      setTokens: (token, refreshToken) => set({ 
        token, 
        refreshToken 
      }),
      
      logout: () => set({ 
        user: null, 
        token: null, 
        refreshToken: null, 
        isAuthenticated: false 
      }),
      
      setLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token, 
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);
