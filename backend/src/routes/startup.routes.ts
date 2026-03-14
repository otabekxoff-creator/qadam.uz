import { Router } from 'express';
import { authenticate, authorize } from '@/middleware/auth.middleware';
import { validate } from '@/middleware/validation.middleware';
import * as startupController from '@/controllers/startup.controller';
import { 
  createStartupSchema, 
  updateStartupSchema, 
  updateStatusSchema 
} from '@/validators/startup.validator';

const router = Router();

/**
 * @route   GET /api/startups/stats
 * @desc    Startap statistikasini olish
 * @access  Public
 */
router.get('/stats', startupController.getStartupStats);

/**
 * @route   GET /api/startups
 * @desc    Barcha tasdiqlangan startaplarni olish
 * @access  Public
 */
router.get('/', startupController.getApprovedStartups);

/**
 * @route   GET /api/startups/my-startups
 * @desc    Talabaning o'z startaplarini ko'rish
 * @access  Private (Student)
 */
router.get(
  '/my-startups', 
  authenticate, 
  authorize('STUDENT'), 
  startupController.getMyStartups
);

/**
 * @route   GET /api/startups/admin/all
 * @desc    Admin uchun barcha startaplar
 * @access  Private (Admin)
 */
router.get(
  '/admin/all', 
  authenticate, 
  authorize('ADMIN'), 
  startupController.getAllStartupsForAdmin
);

/**
 * @route   POST /api/startups
 * @desc    Yangi startap yaratish
 * @access  Private (Student)
 */
router.post(
  '/', 
  authenticate, 
  authorize('STUDENT'),
  validate(createStartupSchema),
  startupController.createStartup
);

/**
 * @route   GET /api/startups/:id
 * @desc    Bitta startapni ko'rish
 * @access  Public
 */
router.get('/:id', startupController.getStartupById);

/**
 * @route   PUT /api/startups/:id
 * @desc    Startapni yangilash
 * @access  Private (Startap egasi - Student)
 */
router.put(
  '/:id', 
  authenticate, 
  authorize('STUDENT'),
  validate(updateStartupSchema),
  startupController.updateStartup
);

/**
 * @route   DELETE /api/startups/:id
 * @desc    Startapni o'chirish
 * @access  Private (Startap egasi - Student)
 */
router.delete(
  '/:id', 
  authenticate, 
  authorize('STUDENT'), 
  startupController.deleteStartup
);

/**
 * @route   PATCH /api/startups/:id/status
 * @desc    Admin: Startap statusini o'zgartirish
 * @access  Private (Admin)
 */
router.patch(
  '/:id/status', 
  authenticate, 
  authorize('ADMIN'),
  validate(updateStatusSchema),
  startupController.updateStartupStatus
);

export default router;
