import { Router } from 'express';
import { register, login, getMe, updateProfile, verifyRegisterCode, loginVerifyCode } from '@/controllers/auth.controller';
import { validateBody } from '@/middleware/validation.middleware';
import { registerSchema, loginSchema, updateProfileSchema, verifyCodeSchema } from '@/validators/auth.validator';
import { authenticate } from '@/middleware/auth.middleware';
import { upload } from '@/middleware/upload.middleware';

const router = Router();

router.post('/register', validateBody(registerSchema), register);
router.post('/login', validateBody(loginSchema), login);
router.post('/register/verify', validateBody(verifyCodeSchema), verifyRegisterCode);
router.post('/login/verify', validateBody(verifyCodeSchema), loginVerifyCode);
router.get('/me', authenticate, getMe);

// TO'G'RILANGAN QISM: Validatsiya tiklandi
router.put(
  '/profile',
  authenticate,
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'resume', maxCount: 1 },
    { name: 'logo', maxCount: 1 }
  ]),
  // Zod validatsiyasi endi to'g'ri ishlaydi, chunki schema.ts da gpa string dan parse qilinadi
  validateBody(updateProfileSchema), 
  updateProfile
);

export default router;
