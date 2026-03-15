# 🚀 Step.uz - Career Platform for Uzbekistan Youth

<div align="center">

![Step.uz Logo](https://img.shields.io/badge/Step.uz-Career%20Platform-blue?style=for-the-badge&logo=next.js)
![Version](https://img.shields.io/badge/version-1.0.0-green?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-purple?style=for-the-badge)
![Node.js](https://img.shields.io/badge/node.js-18%2B-brightgreen?style=for-the-badge&logo=node.js)
![TypeScript](https://img.shields.io/badge/typescript-5%2B-blue?style=for-the-badge&logo=typescript)

**Connecting Uzbekistan's talented youth with opportunities**

[🌐 Live Demo](https://step.uz) • [📖 Documentation](#documentation) • [🐛 Report Bug](issues) • [💡 Request Feature](issues)

</div>

## 📋 Table of Contents

- [🌟 About](#-about)
- [✨ Features](#-features)
- [🏗️ Architecture](#️-architecture)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Quick Start](#-quick-start)
- [⚙️ Configuration](#️-configuration)
- [📁 Project Structure](#-project-structure)
- [🔧 Development](#-development)
- [🐳 Docker Deployment](#-docker-deployment)
- [📚 API Documentation](#-api-documentation)
- [🧪 Testing](#-testing)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## 🌟 About

**Step.uz** is a comprehensive career platform designed specifically for Uzbekistan's youth, bridging the gap between talented students, innovative startups, and forward-thinking companies. Our platform empowers young professionals to discover opportunities, showcase their skills, and take their first steps towards successful careers.

### 🎯 Mission

To democratize career opportunities in Uzbekistan by providing a unified platform where:
- Students can find internships, jobs, and startup opportunities
- Companies can discover and recruit top talent
- Startups can connect with investors and skilled team members
- Educational institutions can track graduate employment outcomes

## ✨ Features

### 👥 For Students
- **📝 Smart Profile Creation** - AI-powered resume builder and portfolio showcase
- **💼 Job Discovery** - Personalized job recommendations based on skills and preferences
- **🚀 Startup Hub** - Connect with startups and explore entrepreneurial opportunities
- **📊 Skill Assessment** - Automated skill gap analysis and learning recommendations
- **🎓 Career Path Guidance** - AI-driven career trajectory planning

### 🏢 For Companies
- **🔍 Talent Discovery** - Advanced filtering and matching algorithms
- **📈 Analytics Dashboard** - Real-time recruitment metrics and insights
- **🤝 Collaboration Tools** - Streamlined interview scheduling and communication
- **📱 Mobile-First Design** - Seamless experience across all devices

### 🚀 For Startups
- **💡 Pitch Platform** - Showcase your startup to potential investors
- **👥 Team Building** - Find co-founders and skilled team members
- **📊 Funding Tracking** - Manage investment rounds and investor relations
- **🌐 Community Hub** - Connect with mentors and fellow entrepreneurs

### 🛡️ Security & Performance
- **🔐 Enterprise Security** - End-to-end encryption and GDPR compliance
- **⚡ Lightning Fast** - Optimized performance with 99.9% uptime
- **🌍 Multilingual Support** - Uzbek, Russian, and English interfaces
- **📱 Responsive Design** - Perfect experience on any device

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │   Database      │
│   (Next.js)     │◄──►│   (Express)     │◄──►│  (PostgreSQL)   │
│                 │    │                 │    │                 │
│ • React 19      │    │ • REST API      │    │ • Prisma ORM    │
│ • TypeScript    │    │ • JWT Auth      │    │ • Redis Cache   │
│ • Tailwind      │    │ • Rate Limiting │    │ • Backups       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   External     │
                    │   Services     │
                    │                 │
                    │ • Email (SMTP) │
                    │ • Cloud Storage│
                    │ • Analytics    │
                    └─────────────────┘
```

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 16](https://nextjs.org/) - React framework with SSR/SSG
- **Language**: [TypeScript 5](https://www.typescriptlang.org/) - Type-safe development
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS framework
- **UI Components**: [Radix UI](https://www.radix-ui.com/) - Accessible component library
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) - Lightweight state management
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) - Form validation
- **Animations**: [Framer Motion](https://www.framer.com/motion/) - Smooth animations
- **Data Fetching**: [TanStack Query](https://tanstack.com/query) - Server state management

### Backend
- **Runtime**: [Node.js 18+](https://nodejs.org/) - JavaScript runtime
- **Framework**: [Express.js](https://expressjs.com/) - Web application framework
- **Language**: [TypeScript 5](https://www.typescriptlang.org/) - Type-safe development
- **Database**: [PostgreSQL 15](https://www.postgresql.org/) - Relational database
- **ORM**: [Prisma](https://www.prisma.io/) - Type-safe database toolkit
- **Authentication**: [JWT](https://jwt.io/) - Secure token-based authentication
- **Security**: [Helmet](https://helmetjs.github.io/) + [bcrypt](https://www.npmjs.com/package/bcryptjs)
- **Validation**: [Zod](https://zod.dev/) - Schema validation

### DevOps & Infrastructure
- **Containerization**: [Docker](https://www.docker.com/) + [Docker Compose](https://docs.docker.com/compose/)
- **Database Management**: [Prisma Studio](https://www.prisma.io/studio)
- **Code Quality**: [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/)
- **Version Control**: [Git](https://git-scm.com/) + [GitHub](https://github.com/)

## 🚀 Quick Start

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)
- [Git](https://git-scm.com/)

### One-Click Setup (Recommended)

```bash
# Clone the repository
git clone https://github.com/otabekxoff-creator/step.uz.git
cd step.uz

# Start all services with Docker
docker-compose up -d

# Access the application
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
# Database: localhost:5432
```

### Manual Setup

#### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/otabekxoff-creator/step.uz.git
cd step.uz

# Install dependencies
cd frontend && npm install
cd ../backend && npm install
```

#### 2. Database Setup

```bash
# Start PostgreSQL (using Docker)
docker run --name step_db -e POSTGRES_PASSWORD=password -e POSTGRES_DB=step_uz -p 5432:5432 -d postgres:15-alpine

# Run database migrations
cd backend
npx prisma migrate dev
npx prisma generate
```

#### 3. Environment Configuration

Create environment files:

```bash
# Backend environment
cd backend
cp .env.example .env
# Edit .env with your configuration

# Frontend environment  
cd ../frontend
cp .env.example .env.local
# Edit .env.local with your configuration
```

#### 4. Start Development Servers

```bash
# Start backend (terminal 1)
cd backend
npm run dev

# Start frontend (terminal 2)
cd frontend
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## ⚙️ Configuration

### Backend Environment Variables

```env
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/step_uz"

# Authentication
JWT_SECRET="your_super_secret_key_change_this_in_production"
JWT_EXPIRES_IN="7d"

# Server
NODE_ENV="development"
PORT="5000"
FRONTEND_URL="http://localhost:3000"

# Email (optional)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# File Upload
UPLOAD_DIR="./uploads"
MAX_FILE_SIZE="10485760" # 10MB
```

### Frontend Environment Variables

```env
NEXT_PUBLIC_API_URL="http://localhost:5000/api"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## 📁 Project Structure

```
step.uz/
├── 📂 frontend/                 # Next.js frontend application
│   ├── 📂 src/
│   │   ├── 📂 app/             # App Router pages
│   │   ├── 📂 components/      # Reusable UI components
│   │   ├── 📂 hooks/           # Custom React hooks
│   │   ├── 📂 lib/             # Utility functions
│   │   ├── 📂 stores/          # Zustand state management
│   │   ├── 📂 types/           # TypeScript type definitions
│   │   └── 📂 config/          # Configuration files
│   ├── 📂 public/              # Static assets
│   ├── 📄 package.json
│   └── 📄 Dockerfile
├── 📂 backend/                  # Express.js backend API
│   ├── 📂 src/
│   │   ├── 📂 controllers/     # Route controllers
│   │   ├── 📂 middleware/      # Express middleware
│   │   ├── 📂 routes/          # API routes
│   │   ├── 📂 services/        # Business logic
│   │   ├── 📂 utils/           # Utility functions
│   │   └── 📄 app.ts           # Application entry point
│   ├── 📂 prisma/              # Database schema and migrations
│   ├── 📄 package.json
│   └── 📄 Dockerfile
├── 📄 docker-compose.yml        # Docker development environment
├── 📄 README.md                 # This file
└── 📄 .gitignore               # Git ignore rules
```

## 🔧 Development

### Available Scripts

#### Frontend

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:push      # Push database schema
npm run db:generate  # Generate Prisma client
npm run db:migrate   # Run database migrations
```

#### Backend

```bash
npm run dev          # Start development server with hot reload
npm run build        # Build TypeScript to JavaScript
npm run start        # Start production server
npm run db:push      # Push database schema
npm run db:generate  # Generate Prisma client
npm run db:migrate   # Run database migrations
npm run db:studio    # Open Prisma Studio
```

### Code Quality

We maintain high code quality standards:

- **TypeScript**: Strict type checking enabled
- **ESLint**: Custom rules for consistent code style
- **Prettier**: Automatic code formatting
- **Husky**: Pre-commit hooks for quality assurance
- **Conventional Commits**: Standardized commit messages

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/amazing-feature

# Make changes and commit
git add .
git commit -m "feat: add amazing feature"

# Push and create pull request
git push origin feature/amazing-feature
```

## 🐳 Docker Deployment

### Development Environment

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Production Deployment

```bash
# Build and deploy
docker-compose -f docker-compose.prod.yml up -d --build
```

### Docker Commands

```bash
# Access backend container
docker exec -it step_backend bash

# Access database
docker exec -it step_db psql -U postgres -d step_uz

# View container status
docker ps
```

## 📚 API Documentation

### Authentication Endpoints

```http
POST /api/auth/register     # User registration
POST /api/auth/login        # User login
POST /api/auth/logout       # User logout
GET  /api/auth/me           # Get current user
```

### User Management

```http
GET    /api/users           # Get all users (admin)
GET    /api/users/:id       # Get user by ID
PUT    /api/users/:id       # Update user profile
DELETE /api/users/:id       # Delete user (admin)
```

### Jobs & Applications

```http
GET    /api/jobs            # Get all jobs
POST   /api/jobs            # Create job (company)
GET    /api/jobs/:id        # Get job details
PUT    /api/jobs/:id        # Update job (company)
DELETE /api/jobs/:id        # Delete job (company)

POST   /api/jobs/:id/apply  # Apply for job
GET    /api/applications     # Get user applications
```

### Startups

```http
GET    /api/startups        # Get all startups
POST   /api/startups        # Create startup
GET    /api/startups/:id    # Get startup details
PUT    /api/startups/:id    # Update startup
DELETE /api/startups/:id    # Delete startup
```

For detailed API documentation, visit `/api/docs` in development mode.

## 🧪 Testing

### Running Tests

```bash
# Frontend tests
cd frontend
npm test                    # Run all tests
npm run test:watch         # Watch mode
npm run test:coverage      # Coverage report

# Backend tests
cd backend
npm test                   # Run all tests
npm run test:watch        # Watch mode
npm run test:e2e          # End-to-end tests
```

### Test Structure

```
tests/
├── 📂 unit/               # Unit tests
├── 📂 integration/        # Integration tests
├── 📂 e2e/               # End-to-end tests
└── 📂 fixtures/           # Test data
```

### Coverage Goals

- **Unit Tests**: 80%+ coverage
- **Integration Tests**: 70%+ coverage
- **E2E Tests**: Critical user flows

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Getting Started

1. **Fork** the repository
2. **Clone** your fork locally
3. **Create** a feature branch
4. **Make** your changes
5. **Test** thoroughly
6. **Submit** a pull request

### Contribution Guidelines

- Follow the [Code of Conduct](CODE_OF_CONDUCT.md)
- Write clear, descriptive commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

### Development Areas

We're looking for help in:

- 🎨 **UI/UX Improvements** - Design and user experience enhancements
- 🔧 **Backend Features** - API development and business logic
- 📱 **Mobile App** - React Native mobile application
- 🤖 **AI Features** - Smart recommendations and automation
- 🌍 **Internationalization** - Language support and localization
- 📊 **Analytics** - Data insights and reporting

### Reporting Issues

When reporting bugs, please include:

- **Clear description** of the issue
- **Steps to reproduce** the problem
- **Expected vs actual** behavior
- **Environment details** (OS, browser, version)
- **Screenshots** if applicable

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Step.uz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

## 🙏 Acknowledgments

Special thanks to:

- **Uzbekistan's IT Community** for inspiration and support
- **Contributors** who have helped build this platform
- **Educational Institutions** for their valuable feedback
- **Early Adopters** for testing and improvements

## 📞 Contact

- **Website**: [step.uz](https://step.uz)
- **Email**: [info@step.uz](mailto:info@step.uz)
- **GitHub**: [@otabekxoff-creator](https://github.com/otabekxoff-creator)
- **LinkedIn**: [Step.uz](https://linkedin.com/company/step-uz)

---

<div align="center">

**⭐ Star this repository if it helped you!**

Made with ❤️ in Uzbekistan

[🔝 Back to top](#-step-uz---career-platform-for-uzbekistan-youth)

</div>
