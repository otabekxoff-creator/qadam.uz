import { Router } from 'express';
import { register, login, getMe, refreshToken } from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { authRateLimiter } from '../middleware/rateLimit.middleware';
import { validateRegister, validateLogin } from '../validators/auth.validator';

const router = Router();

router.post('/register', authRateLimiter, validateRegister, register);
router.post('/login', authRateLimiter, validateLogin, login);
router.post('/refresh', refreshToken);
router.get('/me', authMiddleware, getMe);

export default router;
