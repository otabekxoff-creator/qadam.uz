# Step.uz - Render Deployment Guide

## 🚀 Quick Deploy to Render

### 1. Create Render Account
- Go to [render.com](https://render.com) and sign up
- Connect your GitHub/GitLab repository

### 2. Deploy Backend (API)

#### Option A: Using render.yaml (Recommended)
1. Push the `render.yaml` file to your repository root
2. In Render Dashboard, click "New" → "Blueprint"
3. Connect your repository
4. Render will automatically detect and deploy all services

#### Option B: Manual Setup
1. Click "New" → "Web Service"
2. Select your repository
3. Configure:
   - **Name**: `sinergiya-backend`
   - **Runtime**: `Node`
   - **Build Command**: `cd backend && npm install && npm run build`
   - **Start Command**: `cd backend && npm start`
   - **Health Check Path**: `/health`

4. Add Environment Variables:
   ```
   NODE_ENV=production
   PORT=10000
   DATABASE_URL=<your-postgres-url>
   JWT_SECRET=<your-secret-key>
   JWT_EXPIRES_IN=7d
   FRONTEND_URL=https://sinergiya-frontend.onrender.com
   API_URL=https://sinergiya-backend.onrender.com/api
   ```

### 3. Deploy Frontend

1. Click "New" → "Static Site"
2. Select your repository
3. Configure:
   - **Name**: `sinergiya-frontend`
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/dist`

4. Add Environment Variables:
   ```
   NEXT_PUBLIC_API_URL=https://sinergiya-backend.onrender.com/api
   NEXT_PUBLIC_WS_URL=wss://sinergiya-backend.onrender.com
   NEXT_PUBLIC_APP_URL=https://sinergiya-frontend.onrender.com
   ```

### 4. Database Setup

1. Click "New" → "PostgreSQL"
2. Name: `sinergiya-db`
3. Plan: `Free`
4. Copy the Internal Database URL to backend environment variables

### 5. Run Migrations

After deployment, run database migrations:
```bash
# In Render Shell for backend service
cd backend
npx prisma migrate deploy
npx prisma generate
```

## 📋 Required Environment Variables

### Backend (.env)
```env
# Database
DATABASE_URL=postgresql://...

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# URLs
FRONTEND_URL=https://sinergiya-frontend.onrender.com
API_URL=https://sinergiya-backend.onrender.com/api

# Email (Optional - for email notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL=noreply@step.uz

# Push Notifications (Optional)
VAPID_PUBLIC_KEY=your-vapid-public-key
VAPID_PRIVATE_KEY=your-vapid-private-key

# AI (Optional)
OPENAI_API_KEY=your-openai-api-key
```

### Frontend (.env)
```env
NEXT_PUBLIC_API_URL=https://sinergiya-backend.onrender.com/api
NEXT_PUBLIC_WS_URL=wss://sinergiya-backend.onrender.com
NEXT_PUBLIC_APP_URL=https://sinergiya-frontend.onrender.com
```

## 🔍 Health Check Endpoints

- `/health` - Full health check with database
- `/ready` - Readiness probe
- `/live` - Liveness probe
- `/metrics` - System metrics

## 📊 Monitoring

- View logs in Render Dashboard
- Health checks run every 10 seconds
- Automatic deployments on git push (if enabled)

## 🔄 Updates

To update:
1. Push changes to repository
2. Render automatically deploys (auto-deploy enabled)
3. Or manually deploy from Dashboard

## 🛠 Troubleshooting

### Build Failures
- Check Node.js version compatibility
- Verify all dependencies are in package.json
- Check build logs in Render Dashboard

### Database Connection Issues
- Verify DATABASE_URL format
- Check if database is in same region as backend
- Ensure migrations have been run

### CORS Errors
- Verify FRONTEND_URL matches actual frontend URL
- Check allowedOrigins in server.ts

## 📞 Support

For issues:
1. Check Render Dashboard logs
2. Verify environment variables
3. Check `/health` endpoint
4. Review application logs

## 📝 Notes

- Free tier has limitations (sleep after inactivity)
- Database URL is automatically set if using Render PostgreSQL
- Static sites are served via CDN
- WebSocket connections use same domain as API
