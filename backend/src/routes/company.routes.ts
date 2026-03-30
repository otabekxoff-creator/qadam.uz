import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { getCompanies, getCompanyById, getCompanyStats } from '../controllers/company.controller';

const router = Router();

router.get('/', getCompanies);
router.get('/:id', getCompanyById);
router.get('/stats/my', authMiddleware, getCompanyStats);

export default router;
