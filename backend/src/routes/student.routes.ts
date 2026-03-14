import { Router } from 'express';
import { authenticate, authorize } from '@/middleware/auth.middleware';
import { validate } from '@/middleware/validation.middleware';
import * as studentController from '@/controllers/student.controller';
import { updateStudentProfileSchema } from '@/validators/student.validator';

const router = Router();

/**
 * @route   GET /api/students/dashboard
 * @desc    Talaba dashboard statistikasi
 * @access  Private (Student)
 */
router.get(
  '/dashboard',
  authenticate,
  authorize('STUDENT'),
  studentController.getStudentDashboard
);

/**
 * @route   GET /api/students/profile
 * @desc    Talaba profilini olish
 * @access  Private (Student)
 */
router.get(
  '/profile',
  authenticate,
  authorize('STUDENT'),
  studentController.getStudentProfile
);

/**
 * @route   PUT /api/students/profile
 * @desc    Talaba profilini yangilash
 * @access  Private (Student)
 */
router.put(
  '/profile',
  authenticate,
  authorize('STUDENT'),
  validate(updateStudentProfileSchema),
  studentController.updateStudentProfile
);

/**
 * @route   GET /api/students/applications
 * @desc    Talaba arizalarini olish
 * @access  Private (Student)
 */
router.get(
  '/applications',
  authenticate,
  authorize('STUDENT'),
  studentController.getStudentApplications
);

/**
 * @route   GET /api/students/:id
 * @desc    Boshqa talaba profilini ko'rish
 * @access  Public
 */
router.get('/:id', studentController.getStudentById);

export default router;
