import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { createError } from '../middleware/error.middleware';

export const getMyChats = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;

    const chats = await prisma.chat.findMany({
      where: {
        members: {
          some: { userId },
        },
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                student: { select: { firstName: true, lastName: true, avatar: true } },
                company: { select: { name: true, logo: true } },
              },
            },
          },
        },
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
      orderBy: { updatedAt: 'desc' },
    });

    res.json({
      success: true,
      data: chats,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch chats',
    });
  }
};

export const getChatById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user?.id;
    const chatId = Array.isArray(id) ? id[0] : id;

    const chat = await prisma.chat.findFirst({
      where: {
        id: chatId,
        members: { some: { userId } },
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                student: { select: { firstName: true, lastName: true, avatar: true } },
                company: { select: { name: true, logo: true } },
              },
            },
          },
        },
        messages: {
          orderBy: { createdAt: 'asc' },
          include: {
            sender: {
              select: {
                id: true,
                student: { select: { firstName: true, lastName: true } },
                company: { select: { name: true } },
              },
            },
          },
        },
      },
    });

    if (!chat) {
      throw createError('Chat not found', 404);
    }

    // Mark messages as read
    await prisma.message.updateMany({
      where: {
        chatId: chatId,
        senderId: { not: userId },
        isRead: false,
      },
      data: { isRead: true },
    });

    res.json({
      success: true,
      data: chat,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to fetch chat',
    });
  }
};

export const createChat = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const { userIds, name } = req.body;

    // Ensure all userIds include current user
    const allUserIds = [...new Set([userId, ...userIds])];

    // Check if chat already exists (for 1-on-1)
    if (allUserIds.length === 2) {
      const existingChat = await prisma.chat.findFirst({
        where: {
          isGroup: false,
          AND: [
            { members: { some: { userId: allUserIds[0] } } },
            { members: { some: { userId: allUserIds[1] } } },
          ],
        },
        include: {
          members: {
            include: {
              user: {
                select: {
                  id: true,
                  student: { select: { firstName: true, lastName: true } },
                  company: { select: { name: true } },
                },
              },
            },
          },
        },
      });

      if (existingChat) {
        return res.json({
          success: true,
          data: existingChat,
        });
      }
    }

    const chat = await prisma.chat.create({
      data: {
        name: name || null,
        isGroup: allUserIds.length > 2,
        members: {
          create: allUserIds.map((uid) => ({ userId: uid })),
        },
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                student: { select: { firstName: true, lastName: true } },
                company: { select: { name: true } },
              },
            },
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      data: chat,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create chat',
    });
  }
};

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const { chatId } = req.params;
    const { content, type = 'TEXT' } = req.body;
    const chatIdStr = Array.isArray(chatId) ? chatId[0] : chatId;

    // Verify user is member of chat
    const membership = await prisma.chatMember.findFirst({
      where: { chatId: chatIdStr, userId },
    });

    if (!membership) {
      throw createError('Not authorized to send message in this chat', 403);
    }

    const message = await prisma.message.create({
      data: {
        chatId: chatIdStr,
        senderId: userId,
        content,
        type,
      },
      include: {
        sender: {
          select: {
            id: true,
            student: { select: { firstName: true, lastName: true } },
            company: { select: { name: true } },
          },
        },
      },
    });

    // Update chat updatedAt
    await prisma.chat.update({
      where: { id: chatIdStr },
      data: { updatedAt: new Date() },
    });

    res.status(201).json({
      success: true,
      data: message,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to send message',
    });
  }
};
