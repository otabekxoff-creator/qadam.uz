import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { getMyChats, getChatById, createChat, sendMessage } from '../controllers/chat.controller';

const router = Router();

router.get('/', authMiddleware, getMyChats);
router.get('/:id', authMiddleware, getChatById);
router.post('/', authMiddleware, createChat);
router.post('/:chatId/messages', authMiddleware, sendMessage);

export default router;
