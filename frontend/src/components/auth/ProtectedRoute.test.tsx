import { render, screen } from '@testing-library/react'
import { ProtectedRoute } from './ProtectedRoute'
import { useAuthStore } from '@/store/auth.store'

// Mock the auth store
jest.mock('@/store/auth.store')

describe('ProtectedRoute', () => {
  const mockUseAuthStore = useAuthStore as jest.MockedFunction<typeof useAuthStore>

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render children when user is authenticated', () => {
    mockUseAuthStore.mockReturnValue({
      isAuthenticated: true,
      user: { id: '1', email: 'test@example.com', role: 'STUDENT' },
      isLoading: false,
    } as any)

    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    )

    expect(screen.getByText('Protected Content')).toBeInTheDocument()
  })

  it('should show loading spinner when loading', () => {
    mockUseAuthStore.mockReturnValue({
      isAuthenticated: false,
      user: null,
      isLoading: true,
    } as any)

    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    )

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('should redirect to login when not authenticated', () => {
    mockUseAuthStore.mockReturnValue({
      isAuthenticated: false,
      user: null,
      isLoading: false,
    } as any)

    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    )

    expect(screen.getByText('Please login to access this page')).toBeInTheDocument()
  })
})
