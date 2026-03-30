import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { roleMiddleware } from '../middleware/auth.middleware';
import { getJobs, getJobById, createJob, updateJob, deleteJob } from '../controllers/job.controller';

const router = Router();

router.get('/', getJobs);
router.get('/:id', getJobById);
router.post('/', authMiddleware, roleMiddleware(['COMPANY']), createJob);
router.put('/:id', authMiddleware, roleMiddleware(['COMPANY']), updateJob);
router.delete('/:id', authMiddleware, roleMiddleware(['COMPANY']), deleteJob);

export default router;
