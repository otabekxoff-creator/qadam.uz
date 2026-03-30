// Application status constants
export const APPLICATION_STATUS = {
  PENDING: 'PENDING',
  REVIEWING: 'REVIEWING',
  INTERVIEW: 'INTERVIEW',
  OFFERED: 'OFFERED',
  HIRED: 'HIRED',
  REJECTED: 'REJECTED',
} as const;

export const APPLICATION_STATUS_LABELS: Record<string, string> = {
  PENDING: 'Kutilmoqda',
  REVIEWING: 'Ko\'rib chiqilmoqda',
  INTERVIEW: 'Intervyu',
  OFFERED: 'Taklif',
  HIRED: 'Ishga olingan',
  REJECTED: 'Rad etilgan',
};

export const APPLICATION_STATUS_COLORS: Record<string, string> = {
  PENDING: 'bg-yellow-500',
  REVIEWING: 'bg-blue-500',
  INTERVIEW: 'bg-purple-500',
  OFFERED: 'bg-green-500',
  HIRED: 'bg-green-600',
  REJECTED: 'bg-red-500',
};

// Job type constants
export const JOB_TYPES = {
  FULL_TIME: 'FULL_TIME',
  PART_TIME: 'PART_TIME',
  INTERNSHIP: 'INTERNSHIP',
  CONTRACT: 'CONTRACT',
  REMOTE: 'REMOTE',
} as const;

export const JOB_TYPE_LABELS: Record<string, string> = {
  FULL_TIME: 'To\'liq stavka',
  PART_TIME: 'Yarim stavka',
  INTERNSHIP: 'Amaliyot',
  CONTRACT: 'Shartnoma',
  REMOTE: 'Masofadan',
};

// User role constants
export const USER_ROLES = {
  STUDENT: 'STUDENT',
  COMPANY: 'COMPANY',
  ADMIN: 'ADMIN',
} as const;

// Education levels
export const EDUCATION_LEVELS = {
  HIGH_SCHOOL: 'HIGH_SCHOOL',
  BACHELOR: 'BACHELOR',
  MASTER: 'MASTER',
  PHD: 'PHD',
} as const;

export const EDUCATION_LEVEL_LABELS: Record<string, string> = {
  HIGH_SCHOOL: 'O\'rta maxsus',
  BACHELOR: 'Bakalavr',
  MASTER: 'Magistr',
  PHD: 'PhD',
};

// Experience levels
export const EXPERIENCE_LEVELS = {
  ENTRY: 'ENTRY',
  JUNIOR: 'JUNIOR',
  MID: 'MID',
  SENIOR: 'SENIOR',
  LEAD: 'LEAD',
} as const;

export const EXPERIENCE_LEVEL_LABELS: Record<string, string> = {
  ENTRY: 'Boshlang\'ich',
  JUNIOR: 'Junior (1-2 yil)',
  MID: 'Middle (3-5 yil)',
  SENIOR: 'Senior (5+ yil)',
  LEAD: 'Lead/Principal',
};

// Company sizes
export const COMPANY_SIZES = {
  SMALL: 'SMALL',
  MEDIUM: 'MEDIUM',
  LARGE: 'LARGE',
  ENTERPRISE: 'ENTERPRISE',
} as const;

export const COMPANY_SIZE_LABELS: Record<string, string> = {
  SMALL: '1-50 xodim',
  MEDIUM: '51-200 xodim',
  LARGE: '201-1000 xodim',
  ENTERPRISE: '1000+ xodim',
};

// Industries
export const INDUSTRIES = [
  'Information Technology',
  'Finance',
  'Healthcare',
  'Education',
  'Marketing',
  'Design',
  'Engineering',
  'Sales',
  'Customer Service',
  'Human Resources',
  'Operations',
  'Legal',
  'Consulting',
  'Media',
  'Retail',
  'Manufacturing',
  'Transportation',
  'Hospitality',
  'Construction',
  'Telecommunications',
] as const;

// Skills categories
export const SKILL_CATEGORIES = {
  TECHNICAL: 'TECHNICAL',
  SOFT: 'SOFT',
  LANGUAGE: 'LANGUAGE',
  TOOLS: 'TOOLS',
} as const;

export const POPULAR_SKILLS = {
  technical: [
    'JavaScript',
    'TypeScript',
    'React',
    'Node.js',
    'Python',
    'Java',
    'C#',
    'Go',
    'Rust',
    'SQL',
    'MongoDB',
    'PostgreSQL',
    'AWS',
    'Docker',
    'Kubernetes',
    'Git',
    'GraphQL',
    'REST API',
    'Machine Learning',
    'Data Science',
  ],
  soft: [
    'Communication',
    'Teamwork',
    'Leadership',
    'Problem Solving',
    'Critical Thinking',
    'Time Management',
    'Adaptability',
    'Creativity',
    'Emotional Intelligence',
    'Conflict Resolution',
  ],
  languages: [
    'Uzbek',
    'English',
    'Russian',
    'Kazakh',
    'Turkish',
    'German',
    'French',
    'Spanish',
    'Chinese',
    'Japanese',
  ],
  tools: [
    'Figma',
    'Adobe Creative Suite',
    'Sketch',
    'Jira',
    'Trello',
    'Slack',
    'Microsoft Office',
    'Google Workspace',
    'Notion',
    'VS Code',
  ],
};

// Pagination defaults
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const;

// File upload limits
export const FILE_LIMITS = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  MAX_FILES_PER_UPLOAD: 5,
} as const;

// Date formats
export const DATE_FORMATS = {
  DISPLAY: 'dd MMMM yyyy',
  DISPLAY_SHORT: 'dd MMM yyyy',
  INPUT: 'yyyy-MM-dd',
  DATETIME: 'dd MMMM yyyy HH:mm',
  ISO: 'yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'',
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'stepuz_auth_token',
  REFRESH_TOKEN: 'stepuz_refresh_token',
  USER_DATA: 'stepuz_user_data',
  THEME: 'stepuz_theme',
  LANGUAGE: 'stepuz_language',
  ONBOARDING_COMPLETED: 'stepuz_onboarding_completed',
} as const;

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  USERS: {
    PROFILE: '/users/profile',
    SETTINGS: '/users/settings',
    SKILLS: '/users/skills',
    EXPERIENCE: '/users/experience',
    EDUCATION: '/users/education',
  },
  JOBS: {
    LIST: '/jobs',
    DETAIL: '/jobs/:id',
    CREATE: '/jobs',
    UPDATE: '/jobs/:id',
    DELETE: '/jobs/:id',
    APPLY: '/jobs/:id/apply',
    SAVE: '/jobs/:id/save',
  },
  APPLICATIONS: {
    LIST: '/applications',
    DETAIL: '/applications/:id',
    UPDATE_STATUS: '/applications/:id/status',
  },
  COMPANIES: {
    LIST: '/companies',
    DETAIL: '/companies/:id',
    JOBS: '/companies/:id/jobs',
  },
  NOTIFICATIONS: {
    LIST: '/notifications',
    MARK_READ: '/notifications/:id/read',
    MARK_ALL_READ: '/notifications/read-all',
  },
  CHATS: {
    LIST: '/chats',
    DETAIL: '/chats/:id',
    MESSAGES: '/chats/:id/messages',
  },
  AI: {
    ASK: '/ai/ask',
    HISTORY: '/ai/history',
    ANALYZE_SKILLS: '/ai/skills-analysis',
    JOB_RECOMMENDATIONS: '/ai/job-recommendations',
  },
} as const;

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  JOBS: '/dashboard/jobs',
  APPLICATIONS: '/dashboard/applications',
  COMPANIES: '/dashboard/companies',
  MESSAGES: '/dashboard/messages',
  NOTIFICATIONS: '/dashboard/notifications',
  SETTINGS: '/dashboard/settings',
  PROFILE: '/dashboard/profile',
  ANALYTICS: '/dashboard/analytics',
  RESOURCES: '/dashboard/resources',
  EVENTS: '/dashboard/events',
  MENTORSHIP: '/dashboard/mentorship',
  BLOG: '/blog',
  ABOUT: '/about',
  CONTACT: '/contact',
  FAQ: '/faq',
  PRICING: '/pricing',
  PRIVACY: '/privacy',
  TERMS: '/terms',
} as const;

// Theme options
export const THEME_OPTIONS = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const;

// Languages
export const LANGUAGES = {
  UZ: { code: 'uz', name: 'O\'zbek', flag: '🇺🇿' },
  RU: { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  EN: { code: 'en', name: 'English', flag: '🇬🇧' },
} as const;
