import { Router } from 'express';
import {
  applyForJob,
  getMyApplications,
  getJobApplications,
  updateApplicationStatus,
} from '@/controllers/application.controller';
import { authenticate, authorize } from '@/middleware/auth.middleware';
import { UserRole } from '@prisma/client';

const router = Router();

router.post(
  '/jobs/:jobId/apply',
  authenticate,
  authorize(UserRole.STUDENT),
  applyForJob
);

router.get(
  '/my-applications',
  authenticate,
  authorize(UserRole.STUDENT),
  getMyApplications
);

router.get(
  '/jobs/:jobId/applications',
  authenticate,
  authorize(UserRole.COMPANY),
  getJobApplications
);

router.put(
  '/:applicationId/status',
  authenticate,
  authorize(UserRole.COMPANY),
  updateApplicationStatus
);

export default router;
