import { Request, Response } from 'express';
import { chatService } from '@/services/chat.service';
import { AuthenticatedRequest } from '@/types';
import asyncHandler from '@/utils/asyncHandler';

export const createChat = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;
  const { participant2Id } = req.body;

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: 'User not authenticated',
    });
  }

  const chat = await chatService.createChat({
    participant1Id: userId,
    participant2Id,
  });

  res.status(201).json({
    success: true,
    data: chat,
    message: 'Chat muvaffaqiyatli yaratildi',
  });
});

export const getChats = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;
  const limit = parseInt(req.query.limit as string) || 20;
  const offset = parseInt(req.query.offset as string) || 0;

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: 'User not authenticated',
    });
  }

  const chats = await chatService.getUserChats(userId, limit, offset);

  res.json({
    success: true,
    data: chats,
    message: 'Chatlar muvaffaqiyatli olindi',
  });
});

export const getChatById = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;
  const { chatId } = req.params;

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: 'User not authenticated',
    });
  }

  const chat = await chatService.getChatById(chatId, userId);

  if (!chat) {
    return res.status(404).json({
      success: false,
      message: 'Chat topilmadi yoki kirishga ruxsat berilmagan',
    });
  }

  res.json({
    success: true,
    data: chat,
    message: 'Chat muvaffaqiyatli olindi',
  });
});

export const createMessage = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;
  const { chatId, content, type, metadata } = req.body;

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: 'User not authenticated',
    });
  }

  const message = await chatService.createMessage({
    chatId,
    senderId: userId,
    content,
    type,
    metadata,
  });

  res.status(201).json({
    success: true,
    data: message,
    message: 'Xabar muvaffaqiyatli yuborildi',
  });
});

export const getMessages = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;
  const { chatId } = req.params;
  const limit = parseInt(req.query.limit as string) || 50;
  const offset = parseInt(req.query.offset as string) || 0;

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: 'User not authenticated',
    });
  }

  const messages = await chatService.getMessages(chatId, userId, limit, offset);

  res.json({
    success: true,
    data: messages,
    message: 'Xabarlar muvaffaqiyatli olindi',
  });
});

export const markMessagesAsRead = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;
  const { chatId } = req.params;

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: 'User not authenticated',
    });
  }

  await chatService.markMessagesAsRead(chatId, userId);

  res.json({
    success: true,
    message: 'Xabarlar o\'qilgan deb belgilandi',
  });
});

export const getUnreadCount = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: 'User not authenticated',
    });
  }

  const result = await chatService.getUnreadMessageCount(userId);

  res.json({
    success: true,
    data: result,
    message: 'O\'qilmagan xabarlar soni',
  });
});

export const deleteChat = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;
  const { chatId } = req.params;

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: 'User not authenticated',
    });
  }

  await chatService.deleteChat(chatId, userId);

  res.json({
    success: true,
    message: 'Chat o\'chirildi',
  });
});
