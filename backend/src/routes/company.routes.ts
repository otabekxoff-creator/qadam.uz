import { Router } from 'express';
import { authenticate, authorize } from '@/middleware/auth.middleware';
import * as companyController from '@/controllers/company.controller';

const router = Router();

// Kompaniyalar ro'yxati (ochiq)
router.get('/', companyController.getCompanies);

// Dashboard statistikasi
router.get(
  '/dashboard',
  authenticate,
  authorize('COMPANY'),
  companyController.getCompanyDashboard
);

// Profilni olish
router.get(
  '/profile',
  authenticate,
  authorize('COMPANY'),
  companyController.getCompanyProfile
);

// Profilni yangilash
router.put(
  '/profile',
  authenticate,
  authorize('COMPANY'),
  companyController.updateCompanyProfile
);

// Kompaniya vakansiyalari
router.get(
  '/jobs',
  authenticate,
  authorize('COMPANY'),
  companyController.getCompanyJobs
);

// Vakansiya arizalari
router.get(
  '/jobs/:jobId/applications',
  authenticate,
  authorize('COMPANY'),
  companyController.getJobApplications
);

// Ariza holatini o'zgartirish
router.patch(
  '/applications/:id/status',
  authenticate,
  authorize('COMPANY'),
  companyController.updateApplicationStatus
);

// Bitta kompaniyani ko'rish (ochiq)
router.get('/:id', companyController.getCompanyById);

export default router;
