import { Router } from 'express';
import {
  createChat,
  getChats,
  getChatById,
  createMessage,
  getMessages,
  markMessagesAsRead,
  getUnreadCount,
  deleteChat,
} from '@/controllers/chat.controller';
import { authenticate } from '@/middleware/auth.middleware';

const router = Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// POST /api/chats - Create new chat
router.post('/', createChat);

// GET /api/chats - Get user's chats
router.get('/', getChats);

// GET /api/chats/unread-count - Get unread message count
router.get('/unread-count', getUnreadCount);

// GET /api/chats/:chatId - Get specific chat
router.get('/:chatId', getChatById);

// POST /api/chats/:chatId/messages - Send message
router.post('/:chatId/messages', createMessage);

// GET /api/chats/:chatId/messages - Get chat messages
router.get('/:chatId/messages', getMessages);

// PUT /api/chats/:chatId/read - Mark messages as read
router.put('/:chatId/read', markMessagesAsRead);

// DELETE /api/chats/:chatId - Delete chat
router.delete('/:chatId', deleteChat);

export default router;
