# 🚀 Step.uz Render Deployment Guide

## 📋 Deployment Checklist

### ✅ Pre-deployment Requirements

1. **Environment Variables**
   - [ ] All sensitive data removed from .env files
   - [ ] Production environment variables configured
   - [ ] JWT secrets generated (64+ characters)
   - [ ] Database connection string verified

2. **Database Setup**
   - [ ] PostgreSQL database created on Render
   - [ ] Prisma migrations ready
   - [ ] Seed data prepared (optional)

3. **Security**
   - [ ] HTTPS enforced
   - [ ] CORS configured for production URLs
   - [ ] Rate limiting enabled
   - [ ] Security headers configured

---

## 🛠️ Backend Deployment

### 1. Environment Variables (Render)
```bash
NODE_ENV=production
PORT=10000
DATABASE_URL=postgresql://user:pass@host:5432/db
JWT_SECRET=your_64_character_secret_here
JWT_EXPIRES_IN=7d
FRONTEND_URL=https://your-frontend.onrender.com
BACKEND_URL=https://your-backend.onrender.com
LOG_LEVEL=warn
MAX_FILE_SIZE=5242880
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 2. Build Configuration
```yaml
# render.yaml
buildCommand: npm install && npx prisma generate && npm run build
startCommand: npm start
healthCheckPath: /health
```

### 3. Database Migration
```bash
# Automatic on build
npx prisma migrate deploy
npx prisma generate
```

---

## 🎨 Frontend Deployment

### 1. Environment Variables
```bash
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api
NEXT_PUBLIC_APP_NAME=Step.uz
NEXT_PUBLIC_ENABLE_CHAT=true
NEXT_PUBLIC_ENABLE_NOTIFICATIONS=true
```

### 2. Build Configuration
```yaml
# render.yaml
buildCommand: npm install && npm run build
startCommand: npm run start
healthCheckPath: /
```

---

## 🔧 Production Optimizations

### Backend Optimizations
1. **Caching Strategy**
   - Redis for session storage
   - Database query caching
   - API response caching

2. **Performance Monitoring**
   - Winston logger with structured logs
   - Request/response time tracking
   - Error reporting

3. **Security Hardening**
   - Helmet.js security headers
   - Rate limiting per endpoint
   - Input sanitization
   - JWT token rotation

### Frontend Optimizations
1. **Bundle Optimization**
   - Code splitting
   - Lazy loading
   - Image optimization
   - Font optimization

2. **Performance**
   - Service Worker
   - Cache strategies
   - Preloading critical resources

---

## 📊 Monitoring & Logging

### Application Monitoring
```typescript
// Performance monitoring
logger.performance('Database query executed', { 
  duration: 150, 
  query: 'getUserById' 
});

// Security events
logger.security('Failed login attempt', { 
  ip: '192.168.1.1', 
  email: 'user@example.com' 
});

// API requests
logger.api('GET', '/api/users', 200, 45);
```

### Health Checks
- `/health` - Basic health status
- `/api/health` - Detailed health with dependencies
- Database connectivity check
- Redis connectivity check

---

## 🔄 CI/CD Pipeline

### GitHub Actions (Optional)
```yaml
name: Deploy to Render
on:
  push:
    branches: [production]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Render
        uses: johnbeynon/render-deploy-action@v0.0.8
        with:
          service-id: ${{ secrets.RENDER_SERVICE_ID }}
          api-key: ${{ secrets.RENDER_API_KEY }}
```

---

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies installed
   - Ensure Prisma client generated

2. **Database Connection**
   - Verify connection string format
   - Check database is accessible
   - Ensure migrations run successfully

3. **CORS Issues**
   - Verify frontend URL in CORS config
   - Check API endpoints are properly prefixed
   - Ensure credentials flag is set

4. **Memory Issues**
   - Monitor memory usage
   - Implement proper cleanup
   - Consider adding swap space

### Debug Commands
```bash
# Check logs
render logs step-backend

# Check service status
render ps

# Restart service
render restart step-backend
```

---

## 📈 Performance Metrics

### Target Metrics
- **Response Time**: < 200ms (95th percentile)
- **Uptime**: > 99.9%
- **Error Rate**: < 1%
- **Memory Usage**: < 512MB

### Monitoring Tools
- Render Dashboard
- Winston Logs
- Custom Health Checks
- Performance Monitoring

---

## 🔐 Security Checklist

### Production Security
- [ ] Environment variables secured
- [ ] HTTPS enforced
- [ ] Security headers configured
- [ ] Rate limiting enabled
- [ ] Input validation active
- [ ] Database queries parameterized
- [ ] File upload restrictions
- [ ] CORS properly configured
- [ ] Logging enabled (without sensitive data)

### Post-Deployment
- [ ] Security audit completed
- [ ] Penetration testing done
- [ ] Dependencies scanned for vulnerabilities
- [ ] Backup strategy implemented
- [ ] Disaster recovery plan ready

---

## 📞 Support

### Render Support
- Dashboard: https://dashboard.render.com
- Documentation: https://render.com/docs
- Status Page: https://status.render.com

### Application Support
- Error logs available in dashboard
- Health checks for monitoring
- Email alerts for critical issues

---

## 🎉 Deployment Success

After successful deployment:

1. **Verify Services**
   - Frontend loads correctly
   - Backend API responds
   - Database connected
   - All features working

2. **Monitor Performance**
   - Check response times
   - Monitor error rates
   - Review logs regularly

3. **User Testing**
   - Test authentication flow
   - Verify all features
   - Check mobile responsiveness

4. **Documentation Update**
   - Update API documentation
   - Record deployment details
   - Update team on changes

---

**🚀 Your Step.uz application is now ready for production!**
