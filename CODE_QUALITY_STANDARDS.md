# Step.uz Code Quality Standards

## Backend Standards

### TypeScript Configuration
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitOverride": true
  }
}
```

### Code Structure
```
src/
├── controllers/     # Request handlers
├── services/        # Business logic
├── repositories/    # Data access layer
├── middleware/     # Express middleware
├── validators/     # Input validation
├── utils/          # Helper functions
├── types/          # TypeScript types
├── config/         # Configuration
└── routes/         # Route definitions
```

### Error Handling Standards
```typescript
// Custom error classes
export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public code: string
  ) {
    super(message);
    this.name = 'AppError';
  }
}

// Service layer error handling
export class UserService {
  async getUser(id: string): Promise<User> {
    try {
      const user = await this.userRepository.findById(id);
      if (!user) {
        throw new NotFoundError('User not found', 'USER_NOT_FOUND');
      }
      return user;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new InternalServerError('Failed to get user', 'GET_USER_ERROR');
    }
  }
}
```

### Validation Standards
```typescript
// Zod schemas for validation
export const createUserSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  role: z.enum(['STUDENT', 'COMPANY'])
});

// Controller validation
export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = createUserSchema.parse(req.body);
  const user = await userService.create(validatedData);
  res.status(201).json({ success: true, data: user });
});
```

### Database Standards
```typescript
// Repository pattern
export class UserRepository {
  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
      include: {
        student: true,
        company: true
      }
    });
  }

  async create(data: CreateUserDto): Promise<User> {
    return prisma.user.create({
      data,
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true
      }
    });
  }
}
```

## Frontend Standards

### Component Structure
```typescript
// Component template
interface ComponentProps {
  // Define props here
}

export const Component: React.FC<ComponentProps> = ({ 
  prop1, 
  prop2 
}) => {
  // Hooks at the top
  const [state, setState] = useState();
  const { data } = useQuery();
  
  // Event handlers
  const handleClick = useCallback(() => {
    // Handle event
  }, []);
  
  // Render
  return (
    <div className="component">
      {/* JSX content */}
    </div>
  );
};
```

### State Management
```typescript
// Zustand store structure
interface AuthStore {
  // State
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  
  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  
  login: async (credentials) => {
    set({ loading: true });
    try {
      const response = await authAPI.login(credentials);
      set({ user: response.user, isAuthenticated: true, loading: false });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },
  
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
  
  updateUser: (data) => {
    const currentUser = get().user;
    if (currentUser) {
      set({ user: { ...currentUser, ...data } });
    }
  }
}));
```

### API Client Standards
```typescript
// API client with error handling
class APIClient {
  private baseURL: string;
  
  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }
  
  async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new APIError(error.message, response.status);
      }
      
      return response.json();
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      throw new APIError('Network error', 0);
    }
  }
  
  // Typed methods
  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }
  
  async post<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}
```

### Form Handling
```typescript
// React Hook Form with Zod validation
const userFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email'),
});

type UserFormData = z.infer<typeof userFormSchema>;

export const UserForm: React.FC = () => {
  const form = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
  });
  
  const onSubmit = async (data: UserFormData) => {
    try {
      await userAPI.create(data);
      toast.success('User created successfully');
    } catch (error) {
      toast.error('Failed to create user');
    }
  };
  
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  );
};
```

## Testing Standards

### Backend Testing
```typescript
// Unit test example
describe('UserService', () => {
  let userService: UserService;
  let mockUserRepository: jest.Mocked<UserRepository>;
  
  beforeEach(() => {
    mockUserRepository = {
      findById: jest.fn(),
      create: jest.fn(),
    } as any;
    
    userService = new UserService(mockUserRepository);
  });
  
  describe('getUser', () => {
    it('should return user when found', async () => {
      const mockUser = { id: '1', email: 'test@example.com' };
      mockUserRepository.findById.mockResolvedValue(mockUser);
      
      const result = await userService.getUser('1');
      
      expect(result).toEqual(mockUser);
      expect(mockUserRepository.findById).toHaveBeenCalledWith('1');
    });
    
    it('should throw NotFoundError when user not found', async () => {
      mockUserRepository.findById.mockResolvedValue(null);
      
      await expect(userService.getUser('1')).rejects.toThrow(NotFoundError);
    });
  });
});
```

### Frontend Testing
```typescript
// Component test example
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('should render with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
  
  it('should call onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## Performance Standards

### Backend Performance
```typescript
// Caching example
export class UserService {
  async getUser(id: string): Promise<User> {
    const cacheKey = `user:${id}`;
    
    // Try cache first
    const cached = await redis.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }
    
    // Fetch from database
    const user = await this.userRepository.findById(id);
    
    // Cache for 5 minutes
    await redis.setex(cacheKey, 300, JSON.stringify(user));
    
    return user;
  }
}
```

### Frontend Performance
```typescript
// Memoization example
export const ExpensiveComponent: React.FC<Props> = React.memo(({ data }) => {
  const processedData = useMemo(() => {
    return data.map(item => expensiveCalculation(item));
  }, [data]);
  
  return (
    <div>
      {processedData.map(item => (
        <Item key={item.id} data={item} />
      ))}
    </div>
  );
});

// Lazy loading
const LazyComponent = React.lazy(() => import('./LazyComponent'));

export const App: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
};
```

## Security Standards

### Backend Security
```typescript
// Input sanitization
export class SecurityMiddleware {
  static sanitizeInput(req: Request, res: Response, next: NextFunction) {
    // Sanitize body
    if (req.body) {
      req.body = sanitize(req.body);
    }
    
    // Sanitize query params
    if (req.query) {
      req.query = sanitize(req.query);
    }
    
    next();
  }
  
  static validateJWT(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  }
}
```

### Frontend Security
```typescript
// XSS prevention
export const sanitizeHTML = (html: string): string => {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
};

// Secure storage
export const secureStorage = {
  set: (key: string, value: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, btoa(value));
    }
  },
  
  get: (key: string): string | null => {
    if (typeof window !== 'undefined') {
      const value = localStorage.getItem(key);
      return value ? atob(value) : null;
    }
    return null;
  }
};
```

## Git Standards

### Commit Messages
```
feat: add user authentication
fix: resolve login issue
docs: update API documentation
style: format code with prettier
refactor: optimize database queries
test: add unit tests for user service
chore: update dependencies
```

### Branch Naming
```
feature/user-authentication
bugfix/login-validation
hotfix/security-patch
refactor/database-optimization
```

## Code Review Checklist

### Backend Review
- [ ] Input validation implemented
- [ ] Error handling proper
- [ ] Database queries optimized
- [ ] Security measures in place
- [ ] Tests written
- [ ] Documentation updated

### Frontend Review
- [ ] Components reusable
- [ ] Performance optimized
- [ ] Accessibility considered
- [ ] Responsive design
- [ ] Error boundaries in place
- [ ] Tests written

## Linting and Formatting

### ESLint Configuration
```json
{
  "extends": [
    "@typescript-eslint/recommended",
    "prettier"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "prefer-const": "error",
    "no-var": "error"
  }
}
```

### Prettier Configuration
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}
```

## Documentation Standards

### Code Comments
```typescript
/**
 * Calculates the total price including tax
 * @param price - Base price
 * @param taxRate - Tax rate as decimal (0.1 for 10%)
 * @returns Total price including tax
 * @example
 * calculateTotalPrice(100, 0.1) // Returns 110
 */
export const calculateTotalPrice = (price: number, taxRate: number): number => {
  return price * (1 + taxRate);
};
```

### API Documentation
```typescript
/**
 * @api {post} /api/users Create a new user
 * @apiName CreateUser
 * @apiGroup Users
 * @apiParam {String} email User email
 * @apiParam {String} password User password
 * @apiSuccess {Object} user Created user object
 * @apiError {String} error Error message
 */
```

This comprehensive code quality guide ensures maintainable, secure, and performant code across the entire Step.uz application.
