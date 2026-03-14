import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// =============================================
// Theme Types
// =============================================

type Theme = 'light' | 'dark' | 'system';

// =============================================
// UI Store Types
// =============================================

interface UIState {
  // Theme
  theme: Theme;
  
  // Sidebar
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  
  // Mobile
  mobileMenuOpen: boolean;
  
  // Modals
  activeModal: string | null;
  modalData: Record<string, unknown> | null;
  
  // Loading
  globalLoading: boolean;
  
  // Actions
  setTheme: (theme: Theme) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebarCollapsed: () => void;
  setMobileMenuOpen: (open: boolean) => void;
  openModal: (modalId: string, data?: Record<string, unknown>) => void;
  closeModal: () => void;
  setGlobalLoading: (loading: boolean) => void;
}

// =============================================
// UI Store
// =============================================

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      // Initial State
      theme: 'system',
      sidebarOpen: true,
      sidebarCollapsed: false,
      mobileMenuOpen: false,
      activeModal: null,
      modalData: null,
      globalLoading: false,

      // Actions
      setTheme: (theme) => {
        set({ theme });
        
        // Apply theme to document
        const root = document.documentElement;
        root.classList.remove('light', 'dark');
        
        if (theme === 'system') {
          const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light';
          root.classList.add(systemTheme);
        } else {
          root.classList.add(theme);
        }
      },

      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

      setSidebarOpen: (open) => set({ sidebarOpen: open }),

      toggleSidebarCollapsed: () => 
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

      setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),

      openModal: (modalId, data) => 
        set({ activeModal: modalId, modalData: data || null }),

      closeModal: () => set({ activeModal: null, modalData: null }),

      setGlobalLoading: (loading) => set({ globalLoading: loading }),
    }),
    {
      name: 'ui-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        theme: state.theme,
        sidebarCollapsed: state.sidebarCollapsed,
      }),
    }
  )
);

// =============================================
// Theme Helper
// =============================================

export const initializeTheme = () => {
  const { theme } = useUIStore.getState();
  const root = document.documentElement;
  
  root.classList.remove('light', 'dark');
  
  if (theme === 'system') {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
    root.classList.add(systemTheme);
  } else {
    root.classList.add(theme);
  }
};
