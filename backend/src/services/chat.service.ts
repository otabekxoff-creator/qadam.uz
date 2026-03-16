import prisma from '@/config/database';
import { MessageType } from '@prisma/client';

export interface CreateChatData {
  participant1Id: string;
  participant2Id: string;
}

export interface CreateMessageData {
  chatId: string;
  senderId: string;
  content: string;
  type?: MessageType;
  metadata?: any;
}

export class ChatService {
  async createChat(chatData: CreateChatData) {
    // Check if chat already exists between these participants
    const existingChat = await prisma.chat.findFirst({
      where: {
        OR: [
          {
            participant1Id: chatData.participant1Id,
            participant2Id: chatData.participant2Id,
          },
          {
            participant1Id: chatData.participant2Id,
            participant2Id: chatData.participant1Id,
          },
        ],
        isActive: true,
      },
      include: {
        participant1: true,
        participant2: true,
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });

    if (existingChat) {
      return existingChat;
    }

    // Create new chat
    const chat = await prisma.chat.create({
      data: {
        participant1Id: chatData.participant1Id,
        participant2Id: chatData.participant2Id,
      },
      include: {
        participant1: true,
        participant2: true,
        messages: true,
      },
    });

    return chat;
  }

  async getUserChats(userId: string, limit: number = 20, offset: number = 0) {
    const chats = await prisma.chat.findMany({
      where: {
        OR: [
          { participant1Id: userId },
          { participant2Id: userId },
        ],
        isActive: true,
      },
      include: {
        participant1: {
          include: { student: true, company: true },
        },
        participant2: {
          include: { student: true, company: true },
        },
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
        _count: {
          select: {
            messages: {
              where: {
                isRead: false,
                senderId: { not: userId },
              },
            },
          },
        },
      },
      orderBy: { lastMessageAt: 'desc' },
      take: limit,
      skip: offset,
    });

    return chats;
  }

  async getChatById(chatId: string, userId: string) {
    const chat = await prisma.chat.findFirst({
      where: {
        id: chatId,
        OR: [
          { participant1Id: userId },
          { participant2Id: userId },
        ],
        isActive: true,
      },
      include: {
        participant1: {
          include: { student: true, company: true },
        },
        participant2: {
          include: { student: true, company: true },
        },
        messages: {
          orderBy: { createdAt: 'asc' },
          include: {
            sender: {
              include: { student: true, company: true },
            },
          },
        },
      },
    });

    return chat;
  }

  async createMessage(messageData: CreateMessageData) {
    const message = await prisma.message.create({
      data: {
        chatId: messageData.chatId,
        senderId: messageData.senderId,
        content: messageData.content,
        type: messageData.type || MessageType.TEXT,
        metadata: messageData.metadata || {},
      },
      include: {
        sender: {
          include: { student: true, company: true },
        },
      },
    });

    // Update chat's last message
    await prisma.chat.update({
      where: { id: messageData.chatId },
      data: {
        lastMessage: messageData.content,
        lastMessageAt: new Date(),
      },
    });

    return message;
  }

  async getMessages(chatId: string, userId: string, limit: number = 50, offset: number = 0) {
    // Verify user is participant in chat
    const chat = await prisma.chat.findFirst({
      where: {
        id: chatId,
        OR: [
          { participant1Id: userId },
          { participant2Id: userId },
        ],
        isActive: true,
      },
    });

    if (!chat) {
      throw new Error('Chat not found or access denied');
    }

    const messages = await prisma.message.findMany({
      where: { chatId },
      include: {
        sender: {
          include: { student: true, company: true },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    });

    return messages.reverse(); // Return in chronological order
  }

  async markMessagesAsRead(chatId: string, userId: string) {
    await prisma.message.updateMany({
      where: {
        chatId,
        senderId: { not: userId },
        isRead: false,
      },
      data: { isRead: true },
    });

    return { success: true };
  }

  async deleteChat(chatId: string, userId: string) {
    // Soft delete - mark as inactive
    const result = await prisma.chat.updateMany({
      where: {
        id: chatId,
        OR: [
          { participant1Id: userId },
          { participant2Id: userId },
        ],
      },
      data: { isActive: false },
    });

    return result;
  }

  async getUnreadMessageCount(userId: string) {
    const unreadCount = await prisma.message.count({
      where: {
        chat: {
          OR: [
            { participant1Id: userId },
            { participant2Id: userId },
          ],
          isActive: true,
        },
        senderId: { not: userId },
        isRead: false,
      },
    });

    return { unreadCount };
  }

  // Get the other participant in a chat
  getOtherParticipant(chat: any, currentUserId: string) {
    return chat.participant1Id === currentUserId 
      ? chat.participant2 
      : chat.participant1;
  }

  // Check if two users can chat (e.g., student applied to company's job)
  async canChat(userId1: string, userId2: string) {
    // For now, allow any two users to chat
    // Later we can add business logic (e.g., only if student applied to company's job)
    return true;
  }
}

export const chatService = new ChatService();
