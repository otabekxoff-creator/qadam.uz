import { Router } from 'express';
import {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
  getMyJobs,
} from '@/controllers/job.controller';
import { authenticate, authorize } from '@/middleware/auth.middleware';
import { validateBody } from '@/middleware/validation.middleware';
import { createJobSchema, updateJobSchema } from '@/validators/job.validator';
import { UserRole } from '@prisma/client';

const router = Router();

router.get('/', getJobs);
router.get('/:id', getJobById);

router.post(
  '/',
  authenticate,
  authorize(UserRole.COMPANY),
  validateBody(createJobSchema),
  createJob
);

router.get(
  '/my/jobs',
  authenticate,
  authorize(UserRole.COMPANY),
  getMyJobs
);

router.put(
  '/:id',
  authenticate,
  authorize(UserRole.COMPANY),
  validateBody(updateJobSchema),
  updateJob
);

router.delete(
  '/:id',
  authenticate,
  authorize(UserRole.COMPANY),
  deleteJob
);

export default router;
