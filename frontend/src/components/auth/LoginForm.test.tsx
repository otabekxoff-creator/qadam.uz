import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from './LoginForm';
import { useAuthStore } from '@/store/auth.store';

// Mock the auth store
jest.mock('@/store/auth.store');

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock toast notifications
jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
  error: jest.fn(),
  loading: jest.fn(),
  dismiss: jest.fn(),
}));

describe('LoginForm', () => {
  const mockUseAuthStore = useAuthStore as jest.MockedFunction<typeof useAuthStore>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Form rendering', () => {
    it('should render login form elements', () => {
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

      render(<LoginForm />);

      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Parol')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Kirish' })).toBeInTheDocument();
      expect(screen.getByText('Parolni unutdingizmi?')).toBeInTheDocument();
      expect(screen.getByText('Hisobingiz yo\'qmi? Ro\'yxatdan o\'ting')).toBeInTheDocument();
    });

    it('should have correct input types', () => {
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

      render(<LoginForm />);

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Parol');

      expect(emailInput).toHaveAttribute('type', 'email');
      expect(passwordInput).toHaveAttribute('type', 'password');
    });
  });

  describe('Form validation', () => {
    it('should show validation errors for empty fields', async () => {
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

      const user = userEvent.setup();
      render(<LoginForm />);

      const submitButton = screen.getByRole('button', { name: 'Kirish' });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Email kiritilishi shart')).toBeInTheDocument();
        expect(screen.getByText('Parol kiritilishi shart')).toBeInTheDocument();
      });
    });

    it('should show validation error for invalid email', async () => {
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

      const user = userEvent.setup();
      render(<LoginForm />);

      const emailInput = screen.getByLabelText('Email');
      const submitButton = screen.getByRole('button', { name: 'Kirish' });

      await user.type(emailInput, 'invalid-email');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Email manzili noto\'g\'ri formatda')).toBeInTheDocument();
      });
    });

    it('should show validation error for short password', async () => {
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

      const user = userEvent.setup();
      render(<LoginForm />);

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Parol');
      const submitButton = screen.getByRole('button', { name: 'Kirish' });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, '123');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Parol kamida 8 ta belgidan iborat bo\'lishi kerak')).toBeInTheDocument();
      });
    });
  });

  describe('Form submission', () => {
    it('should call login function with correct data', async () => {
      const mockLogin = jest.fn();
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
        login: mockLogin,
      });

      const user = userEvent.setup();
      render(<LoginForm />);

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Parol');
      const submitButton = screen.getByRole('button', { name: 'Kirish' });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      expect(mockLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });

    it('should show loading state during submission', async () => {
      const mockLogin = jest.fn(() => new Promise(resolve => setTimeout(resolve, 1000)));
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
        login: mockLogin,
      });

      const user = userEvent.setup();
      render(<LoginForm />);

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Parol');
      const submitButton = screen.getByRole('button', { name: 'Kirish' });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      expect(screen.getByText('Kirish...')).toBeInTheDocument();
      expect(submitButton).toBeDisabled();
    });

    it('should show error message on login failure', async () => {
      const mockLogin = jest.fn(() => Promise.reject(new Error('Login failed')));
      mockUseAuthStore.mockReturnValue({
        user: null,
        student: null,
        company: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: 'Login failed',
        setUser: jest.fn(),
        setToken: jest.fn(),
        setLoading: jest.fn(),
        setError: jest.fn(),
        logout: jest.fn(),
        updateStudent: jest.fn(),
        updateCompany: jest.fn(),
        login: mockLogin,
      });

      const user = userEvent.setup();
      render(<LoginForm />);

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Parol');
      const submitButton = screen.getByRole('button', { name: 'Kirish' });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'wrongpassword');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Login failed')).toBeInTheDocument();
      });
    });
  });

  describe('Password visibility toggle', () => {
    it('should toggle password visibility', async () => {
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

      const user = userEvent.setup();
      render(<LoginForm />);

      const passwordInput = screen.getByLabelText('Parol');
      const toggleButton = screen.getByRole('button', { name: /ko'rsatish/i });

      // Initially password should be hidden
      expect(passwordInput).toHaveAttribute('type', 'password');

      // Click to show password
      await user.click(toggleButton);
      expect(passwordInput).toHaveAttribute('type', 'text');

      // Click to hide password
      await user.click(toggleButton);
      expect(passwordInput).toHaveAttribute('type', 'password');
    });
  });

  describe('Remember me functionality', () => {
    it('should have remember me checkbox', () => {
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

      render(<LoginForm />);

      expect(screen.getByLabelText('Eslab qolish')).toBeInTheDocument();
    });

    it('should toggle remember me checkbox', async () => {
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

      const user = userEvent.setup();
      render(<LoginForm />);

      const rememberCheckbox = screen.getByLabelText('Eslab qolish');

      expect(rememberCheckbox).not.toBeChecked();

      await user.click(rememberCheckbox);
      expect(rememberCheckbox).toBeChecked();

      await user.click(rememberCheckbox);
      expect(rememberCheckbox).not.toBeChecked();
    });
  });

  describe('Navigation links', () => {
    it('should have forgot password link', () => {
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

      render(<LoginForm />);

      const forgotLink = screen.getByText('Parolni unutdingizmi?');
      expect(forgotLink.closest('a')).toHaveAttribute('href', '/forgot-password');
    });

    it('should have register link', () => {
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

      render(<LoginForm />);

      const registerLink = screen.getByText('Ro\'yxatdan o\'ting');
      expect(registerLink.closest('a')).toHaveAttribute('href', '/register');
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
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

      render(<LoginForm />);

      const form = screen.getByRole('form');
      expect(form).toHaveAttribute('aria-label', 'Kirish formasi');

      const emailInput = screen.getByLabelText('Email');
      expect(emailInput).toHaveAttribute('aria-required', 'true');

      const passwordInput = screen.getByLabelText('Parol');
      expect(passwordInput).toHaveAttribute('aria-required', 'true');
    });

    it('should be keyboard navigable', async () => {
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

      render(<LoginForm />);

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Parol');
      const submitButton = screen.getByRole('button', { name: 'Kirish' });

      emailInput.focus();
      expect(emailInput).toHaveFocus();

      await userEvent.tab();
      expect(passwordInput).toHaveFocus();

      await userEvent.tab();
      expect(submitButton).toHaveFocus();
    });
  });

  describe('Form reset', () => {
    it('should reset form after successful login', async () => {
      const mockLogin = jest.fn(() => Promise.resolve());
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
        login: mockLogin,
      });

      const user = userEvent.setup();
      render(<LoginForm />);

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Parol');
      const submitButton = screen.getByRole('button', { name: 'Kirish' });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      await waitFor(() => {
        expect(emailInput).toHaveValue('');
        expect(passwordInput).toHaveValue('');
      });
    });
  });
});
