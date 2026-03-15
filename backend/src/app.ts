import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';

import { connectDatabase } from '@/config/database';
import logger from '@/config/logger';
import { errorHandler, notFoundHandler } from '@/middleware/error.middleware';

import authRoutes from '@/routes/auth.routes';
import jobRoutes from '@/routes/job.routes';
import applicationRoutes from '@/routes/application.routes';
import startupRoutes from '@/routes/startup.routes';
import adminRoutes from '@/routes/admin.routes';
import studentRoutes from '@/routes/student.routes';
import companyRoutes from '@/routes/company.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Render proxy uchun sozlash
app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);

app.use(helmet());
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'https://stepuz-frontend.onrender.com',
  'http://localhost:5173',
  'http://localhost:3000'
].filter(Boolean) as string[];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later',
});
app.use('/api/', limiter);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(compression());

app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Barcha API marshrutlari
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/startups', startupRoutes); 
app.use('/api/admin', adminRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/companies', companyRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
