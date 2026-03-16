import { render, screen, fireEvent } from '@testing-library/react';
import { Navbar } from './Navbar';
import { useAuthStore } from '@/store/auth.store';

// Mock the auth store
jest.mock('@/store/auth.store');

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/',
  }),
  usePathname: () => '/',
}));

// Mock Next.js Link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

describe('Navbar', () => {
  const mockUseAuthStore = useAuthStore as jest.MockedFunction<typeof useAuthStore>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('When user is not authenticated', () => {
    beforeEach(() => {
      mockUseAuthStore.mockReturnValue({
        user: null,
        student: null,
        company: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        setUser: jest.fn(),
        setToken: jest.fn(),
        setLoading: jest.fn(),
        setError: jest.fn(),
        logout: jest.fn(),
        updateStudent: jest.fn(),
        updateCompany: jest.fn(),
      });
    });

    it('should render login and register buttons', () => {
      render(<Navbar />);
      
      expect(screen.getByText('Kirish')).toBeInTheDocument();
      expect(screen.getByText('Ro\'yxatdan o\'tish')).toBeInTheDocument();
    });

    it('should not show dashboard link', () => {
      render(<Navbar />);
      
      expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
    });

    it('should show Step.uz branding', () => {
      render(<Navbar />);
      
      expect(screen.getByText('Step.uz')).toBeInTheDocument();
      expect(screen.getByText('O\'zbekiston yoshlari uchun karyera platformasi')).toBeInTheDocument();
    });

    it('should toggle mobile menu', () => {
      render(<Navbar />);
      
      const menuButton = screen.getByRole('button', { name: /menu/i });
      expect(menuButton).toBeInTheDocument();
      
      fireEvent.click(menuButton);
      
      // Check if mobile menu items appear
      expect(screen.getByText('Kirish')).toBeInTheDocument();
      expect(screen.getByText('Ro\'yxatdan o\'tish')).toBeInTheDocument();
    });
  });

  describe('When user is authenticated as student', () => {
    beforeEach(() => {
      mockUseAuthStore.mockReturnValue({
        user: {
          id: '1',
          email: 'student@example.com',
          role: 'STUDENT',
          isActive: true,
          emailVerifiedAt: new Date(),
          createdAt: new Date(),
        },
        student: {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          avatar: 'avatar.jpg',
        },
        company: null,
        token: 'mock-token',
        isAuthenticated: true,
        isLoading: false,
        error: null,
        setUser: jest.fn(),
        setToken: jest.fn(),
        setLoading: jest.fn(),
        setError: jest.fn(),
        logout: jest.fn(),
        updateStudent: jest.fn(),
        updateCompany: jest.fn(),
      });
    });

    it('should show user avatar and name', () => {
      render(<Navbar />);
      
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByAltText('John Doe')).toBeInTheDocument();
    });

    it('should show dashboard link', () => {
      render(<Navbar />);
      
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });

    it('should show logout button', () => {
      render(<Navbar />);
      
      expect(screen.getByText('Chiqish')).toBeInTheDocument();
    });

    it('should call logout when logout is clicked', () => {
      const mockLogout = jest.fn();
      mockUseAuthStore.mockReturnValue({
        user: {
          id: '1',
          email: 'student@example.com',
          role: 'STUDENT',
          isActive: true,
          emailVerifiedAt: new Date(),
          createdAt: new Date(),
        },
        student: {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          avatar: 'avatar.jpg',
        },
        company: null,
        token: 'mock-token',
        isAuthenticated: true,
        isLoading: false,
        error: null,
        setUser: jest.fn(),
        setToken: jest.fn(),
        setLoading: jest.fn(),
        setError: jest.fn(),
        logout: mockLogout,
        updateStudent: jest.fn(),
        updateCompany: jest.fn(),
      });

      render(<Navbar />);
      
      fireEvent.click(screen.getByText('Chiqish'));
      expect(mockLogout).toHaveBeenCalledTimes(1);
    });

    it('should show student-specific navigation', () => {
      render(<Navbar />);
      
      expect(screen.getByText('Ishlar')).toBeInTheDocument();
      expect(screen.getByText('Startaplar')).toBeInTheDocument();
      expect(screen.getByText('Arizalarim')).toBeInTheDocument();
    });
  });

  describe('When user is authenticated as company', () => {
    beforeEach(() => {
      mockUseAuthStore.mockReturnValue({
        user: {
          id: '1',
          email: 'company@example.com',
          role: 'COMPANY',
          isActive: true,
          emailVerifiedAt: new Date(),
          createdAt: new Date(),
        },
        student: null,
        company: {
          id: '1',
          name: 'Tech Corp',
          logo: 'logo.jpg',
        },
        token: 'mock-token',
        isAuthenticated: true,
        isLoading: false,
        error: null,
        setUser: jest.fn(),
        setToken: jest.fn(),
        setLoading: jest.fn(),
        setError: jest.fn(),
        logout: jest.fn(),
        updateStudent: jest.fn(),
        updateCompany: jest.fn(),
      });
    });

    it('should show company name and logo', () => {
      render(<Navbar />);
      
      expect(screen.getByText('Tech Corp')).toBeInTheDocument();
      expect(screen.getByAltText('Tech Corp')).toBeInTheDocument();
    });

    it('should show company-specific navigation', () => {
      render(<Navbar />);
      
      expect(screen.getByText('Ish e\'lonlari')).toBeInTheDocument();
      expect(screen.getByText('Arizalar')).toBeInTheDocument();
      expect(screen.getByText('Profil')).toBeInTheDocument();
    });
  });

  describe('When user is authenticated as admin', () => {
    beforeEach(() => {
      mockUseAuthStore.mockReturnValue({
        user: {
          id: '1',
          email: 'admin@example.com',
          role: 'ADMIN',
          isActive: true,
          emailVerifiedAt: new Date(),
          createdAt: new Date(),
        },
        student: null,
        company: null,
        token: 'mock-token',
        isAuthenticated: true,
        isLoading: false,
        error: null,
        setUser: jest.fn(),
        setToken: jest.fn(),
        setLoading: jest.fn(),
        setError: jest.fn(),
        logout: jest.fn(),
        updateStudent: jest.fn(),
        updateCompany: jest.fn(),
      });
    });

    it('should show admin-specific navigation', () => => {
      render(<Navbar />);
      
      expect(screen.getByText('Admin Panel')).toBeInTheDocument();
      expect(screen.getByText('Foydalanuvchilar')).toBeInTheDocument();
      expect(screen.getByText('Tizim')).toBeInTheDocument();
    });
  });

  describe('Loading state', () => {
    beforeEach(() => {
      mockUseAuthStore.mockReturnValue({
        user: null,
        student: null,
        company: null,
        token: null,
        isAuthenticated: false,
        isLoading: true,
        error: null,
        setUser: jest.fn(),
        setToken: jest.fn(),
        setLoading: jest.fn(),
        setError: jest.fn(),
        logout: jest.fn(),
        updateStudent: jest.fn(),
        updateCompany: jest.fn(),
      });
    });

    it('should show loading spinner', () => {
      render(<Navbar />);
      
      expect(screen.getByTestId('navbar-loading')).toBeInTheDocument();
    });

    it('should not show auth buttons while loading', () => {
      render(<Navbar />);
      
      expect(screen.queryByText('Kirish')).not.toBeInTheDocument();
      expect(screen.queryByText('Ro\'yxatdan o\'tish')).not.toBeInTheDocument();
    });
  });

  describe('Responsive behavior', () => {
    beforeEach(() => {
      mockUseAuthStore.mockReturnValue({
        user: {
          id: '1',
          email: 'student@example.com',
          role: 'STUDENT',
          isActive: true,
          emailVerifiedAt: new Date(),
          createdAt: new Date(),
        },
        student: {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          avatar: 'avatar.jpg',
        },
        company: null,
        token: 'mock-token',
        isAuthenticated: true,
        isLoading: false,
        error: null,
        setUser: jest.fn(),
        setToken: jest.fn(),
        setLoading: jest.fn(),
        setError: jest.fn(),
        logout: jest.fn(),
        updateStudent: jest.fn(),
        updateCompany: jest.fn(),
      });
    });

    it('should show mobile menu button on small screens', () => {
      // Mock window.innerWidth
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768,
      });

      render(<Navbar />);
      
      const menuButton = screen.getByRole('button', { name: /menu/i });
      expect(menuButton).toBeInTheDocument();
    });

    it('should hide mobile menu button on large screens', () => {
      // Mock window.innerWidth
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });

      render(<Navbar />);
      
      const menuButton = screen.queryByRole('button', { name: /menu/i });
      expect(menuButton).not.toBeInTheDocument();
    });
  });

  describe('Navigation links', () => {
    beforeEach(() => {
      mockUseAuthStore.mockReturnValue({
        user: {
          id: '1',
          email: 'student@example.com',
          role: 'STUDENT',
          isActive: true,
          emailVerifiedAt: new Date(),
          createdAt: new Date(),
        },
        student: {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          avatar: 'avatar.jpg',
        },
        company: null,
        token: 'mock-token',
        isAuthenticated: true,
        isLoading: false,
        error: null,
        setUser: jest.fn(),
        setToken: jest.fn(),
        setLoading: jest.fn(),
        setError: jest.fn(),
        logout: jest.fn(),
        updateStudent: jest.fn(),
        updateCompany: jest.fn(),
      });
    });

    it('should have correct href attributes', () => {
      render(<Navbar />);
      
      const homeLink = screen.getByText('Asosiy');
      expect(homeLink.closest('a')).toHaveAttribute('href', '/');
      
      const jobsLink = screen.getByText('Ishlar');
      expect(jobsLink.closest('a')).toHaveAttribute('href', '/jobs');
      
      const startupsLink = screen.getByText('Startaplar');
      expect(startupsLink.closest('a')).toHaveAttribute('href', '/startups');
      
      const dashboardLink = screen.getByText('Dashboard');
      expect(dashboardLink.closest('a')).toHaveAttribute('href', '/dashboard');
    });
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      mockUseAuthStore.mockReturnValue({
        user: null,
        student: null,
        company: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        setUser: jest.fn(),
        setToken: jest.fn(),
        setLoading: jest.fn(),
        setError: jest.fn(),
        logout: jest.fn(),
        updateStudent: jest.fn(),
        updateCompany: jest.fn(),
      });
    });

    it('should have proper ARIA labels', () => {
      render(<Navbar />);
      
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveAttribute('aria-label', 'Main navigation');
      
      const menuButton = screen.getByRole('button', { name: /menu/i });
      expect(menuButton).toHaveAttribute('aria-label', 'Toggle navigation menu');
    });

    it('should be keyboard navigable', () => {
      render(<Navbar />);
      
      const loginButton = screen.getByText('Kirish');
      expect(loginButton.closest('button')).toHaveAttribute('type', 'button');
      
      loginButton.focus();
      expect(loginButton).toHaveFocus();
    });
  });
});
