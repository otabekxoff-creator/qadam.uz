# Step.uz Deployment Guide

## Production Deployment Checklist

### Backend Deployment

#### Environment Variables
```bash
# Server Configuration
NODE_ENV=production
PORT=10000

# Database (Render PostgreSQL)
DATABASE_URL="postgresql://user:password@host:port/database"

# JWT Security
JWT_SECRET=your_64_character_secret_here
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your_64_character_refresh_secret_here
JWT_REFRESH_EXPIRES_IN=30d

# CORS
FRONTEND_URL=https://stepuz-frontend.onrender.com
BACKEND_URL=https://step-uz.onrender.com

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM="Step.uz <no-reply@step.uz>"

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_DIR=uploads

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

#### Security Headers
```typescript
// Production security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));
```

### Frontend Deployment

#### Build Optimization
```typescript
// next.config.ts production optimizations
const nextConfig: NextConfig = {
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};
```

#### Environment Variables
```bash
# Frontend
NEXT_PUBLIC_API_URL=https://step-uz.onrender.com/api
NEXT_PUBLIC_APP_URL=https://step.uz
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
```

### Database Optimization

#### Connection Pooling
```typescript
// Prisma production config
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  // Connection pool settings
  __internal: {
    engine: {
      // Connection pool size
      connectionLimit: 10,
      // Query timeout
      queryTimeout: 10000,
    },
  },
});
```

#### Database Indexes
```sql
-- Performance indexes
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_job_status ON jobs(status);
CREATE INDEX idx_application_student_id ON applications(student_id);
CREATE INDEX idx_application_job_id ON applications(job_id);
CREATE INDEX idx_job_created_at ON jobs(created_at DESC);
```

### Monitoring & Logging

#### Health Checks
```typescript
// Enhanced health endpoint
app.get('/health', async (req, res) => {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    database: await checkDatabaseHealth(),
    memory: process.memoryUsage(),
    version: process.env.npm_package_version,
  };
  res.json(health);
});
```

#### Error Tracking
```typescript
// Production error handling
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error('Production error:', {
    error: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
  });
  
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    code: 'INTERNAL_ERROR'
  });
});
```

### Performance Optimization

#### Caching Strategy
```typescript
// Redis caching (optional)
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

// Cache middleware
const cache = (duration: number) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const key = `cache:${req.originalUrl}`;
    const cached = await redis.get(key);
    
    if (cached) {
      return res.json(JSON.parse(cached));
    }
    
    next();
  };
};
```

#### CDN Configuration
```typescript
// Static assets CDN
app.use('/uploads', express.static('uploads', {
  maxAge: '1y',
  etag: true,
  lastModified: true,
}));
```

### Security Checklist

#### ✅ Must-have
- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] Rate limiting active
- [ ] Input validation
- [ ] SQL injection protection
- [ ] XSS protection
- [ ] CSRF protection
- [ ] Environment variables secured
- [ ] Database connections encrypted
- [ ] File upload validation

#### ✅ Recommended
- [ ] Content Security Policy
- [ ] HSTS enabled
- [ ] IP whitelisting for admin
- [ ] Audit logging
- [ ] Backup strategy
- [ ] Monitoring alerts
- [ ] Performance monitoring
- [ ] Error tracking (Sentry)

### CI/CD Pipeline

#### GitHub Actions
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test
      - run: npm run lint

  deploy-backend:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Render
        uses: johnbeynon/render-deploy-action@v0.0.8
        with:
          service-id: ${{ secrets.RENDER_BACKEND_SERVICE_ID }}
          api-key: ${{ secrets.RENDER_API_KEY }}

  deploy-frontend:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Render
        uses: johnbeynon/render-deploy-action@v0.0.8
        with:
          service-id: ${{ secrets.RENDER_FRONTEND_SERVICE_ID }}
          api-key: ${{ secrets.RENDER_API_KEY }}
```

### Scaling Considerations

#### Horizontal Scaling
- Load balancer configuration
- Multiple app instances
- Database read replicas
- CDN for static assets
- Session state management

#### Vertical Scaling
- Memory optimization
- CPU monitoring
- Database connection pooling
- Query optimization

### Backup Strategy

#### Database Backups
```bash
# Automated daily backups
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql

# Backup retention (30 days)
find /backups -name "*.sql" -mtime +30 -delete
```

#### File Backups
```bash
# Upload directory backup
tar -czf uploads_backup_$(date +%Y%m%d).tar.gz uploads/

# Sync to cloud storage
aws s3 sync uploads/ s3://step-uz-backups/uploads/
```

### Troubleshooting

#### Common Issues
1. **Memory leaks**: Monitor with `pm2 monit`
2. **Database timeouts**: Check connection pool settings
3. **Rate limiting**: Adjust limits for production traffic
4. **CORS issues**: Verify allowed origins
5. **File upload errors**: Check disk space and permissions

#### Performance Monitoring
```bash
# Monitor application performance
pm2 start ecosystem.config.js --env production

# Monitor system resources
htop
iostat -x 1
netstat -tuln
```

### Post-Deployment Checklist

#### ✅ Verification
- [ ] Health endpoint responding
- [ ] Database connectivity
- [ ] API endpoints working
- [ ] Frontend loading correctly
- [ ] SSL certificate valid
- [ ] Security headers present
- [ ] Rate limiting active
- [ ] Error logging working
- [ ] Performance metrics collected
- [ ] Backup system working

#### ✅ Monitoring Setup
- [ ] Uptime monitoring
- [ ] Error alerts configured
- [ ] Performance dashboards
- [ ] Log aggregation
- [ ] Security scanning
- [ ] Dependency updates

## Support & Maintenance

### Regular Tasks
- Weekly dependency updates
- Monthly security patches
- Quarterly performance reviews
- Annual security audits

### Emergency Procedures
- Incident response plan
- Rollback procedures
- Communication protocols
- Recovery strategies
