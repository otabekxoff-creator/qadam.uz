import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User, Student, Company, UserRole } from '@/types';

// =============================================
// Auth Store Types
// =============================================

interface AuthState {
  user: User | null;
  student: Student | null;
  company: Company | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  setUser: (user: User, student?: Student, company?: Company) => void;
  setToken: (token: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
  updateStudent: (student: Partial<Student>) => void;
  updateCompany: (company: Partial<Company>) => void;
}

// =============================================
// Auth Store
// =============================================

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      student: null,
      company: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      setUser: (user, student, company) => {
        const token = get().token;
        if (token) {
          localStorage.setItem('token', token);
        }

        set({
          user,
          student: student || null,
          company: company || null,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      },

      setToken: (token) => {
        localStorage.setItem('token', token);
        set({ token });
      },

      setLoading: (isLoading) => set({ isLoading }),

      setError: (error) => set({ error, isLoading: false }),

      logout: () => {
        localStorage.removeItem('token');
        set({
          user: null as any,
          student: null,
          company: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      },

      updateStudent: (studentData) => {
        const currentStudent = get().student;
        if (currentStudent) {
          set({ student: { ...currentStudent, ...studentData } as Student });
        }
      },

      updateCompany: (companyData) => {
        const currentCompany = get().company;
        if (currentCompany) {
          set({ company: { ...currentCompany, ...companyData } as Company });
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        student: state.student,
        company: state.company,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// =============================================
// Auth Helpers
// =============================================

export const getUserRole = (): UserRole | null => {
  return useAuthStore.getState().user?.role || null;
};

export const isStudent = (): boolean => {
  return useAuthStore.getState().user?.role === 'STUDENT';
};

export const isCompany = (): boolean => {
  return useAuthStore.getState().user?.role === 'COMPANY';
};

export const isAdmin = (): boolean => {
  return useAuthStore.getState().user?.role === 'ADMIN';
};

export const getUserFullName = (): string => {
  const { student, company } = useAuthStore.getState();
  
  if (student) {
    return `${student.firstName} ${student.lastName}`;
  }
  
  if (company) {
    return company.name;
  }
  
  return 'Foydalanuvchi';
};
