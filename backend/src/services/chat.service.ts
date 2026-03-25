import prisma from '@/config/database';
import { MessageType } from '@prisma/client';
import { notificationService } from './notification.service';

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
      },
    });

    if (existingChat) {
      return existingChat;
    }

    // Get participant info for notifications
    const participants = await prisma.user.findMany({
      where: {
        id: { in: [chatData.participant1Id, chatData.participant2Id] },
      },
      include: {
        student: true,
        company: true,
      },
    });

    const participant1 = participants.find(p => p.id === chatData.participant1Id);
    const participant2 = participants.find(p => p.id === chatData.participant2Id);

    // Create new chat
    const chat = await prisma.chat.create({
      data: {
        participant1Id: chatData.participant1Id,
        participant2Id: chatData.participant2Id,
      },
      include: {
        participant1: {
          include: { student: true, company: true },
        },
        participant2: {
          include: { student: true, company: true },
        },
        messages: true,
      },
    });

    // Send notifications to both participants
    if (participant1 && participant2) {
      const participant1Name = participant1.student 
        ? `${participant1.student.firstName} ${participant1.student.lastName}`
        : participant1.company?.name || 'Foydalanuvchi';

      const participant2Name = participant2.student 
        ? `${participant2.student.firstName} ${participant2.student.lastName}`
        : participant2.company?.name || 'Foydalanuvchi';

      // Notify participant1
      await notificationService.create({
        userId: chatData.participant1Id,
        type: 'CHAT_CREATED',
        title: 'Yangi chat',
        message: `${participant2Name} bilan chat ochildi`,
        data: {
          chatId: chat.id,
          otherParticipantId: chatData.participant2Id,
          otherParticipantName: participant2Name,
        },
      });

      // Notify participant2
      await notificationService.create({
        userId: chatData.participant2Id,
        type: 'CHAT_CREATED',
        title: 'Yangi chat',
        message: `${participant1Name} bilan chat ochildi`,
        data: {
          chatId: chat.id,
          otherParticipantId: chatData.participant1Id,
          otherParticipantName: participant1Name,
        },
      });
    }

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

     // Update chat's last message time
     await prisma.chat.update({
       where: { id: messageData.chatId },
       data: {
         lastMessageAt: new Date(),
       },
     });

    // Get chat info to determine recipient
    const chat = await prisma.chat.findUnique({
      where: { id: messageData.chatId },
      select: { participant1Id: true, participant2Id: true },
    });

    if (chat) {
      const recipientId = chat.participant1Id === messageData.senderId 
        ? chat.participant2Id 
        : chat.participant1Id;

      // Get sender name for notification
      const senderName = message.sender.student 
        ? `${message.sender.student.firstName} ${message.sender.student.lastName}`
        : message.sender.company?.name || 'Foydalanuvchi';

      // Send notification to recipient
      await notificationService.create({
        userId: recipientId,
        type: 'NEW_MESSAGE',
        title: 'Yangi xabar',
        message: `${senderName}: ${messageData.content.substring(0, 50)}${messageData.content.length > 50 ? '...' : ''}`,
        data: {
          chatId: messageData.chatId,
          messageId: message.id,
          senderId: messageData.senderId,
          messageType: message.type,
        },
      });
    }

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
    // Get unread messages before marking as read
    const unreadMessages = await prisma.message.findMany({
      where: {
        chatId,
        senderId: { not: userId },
        isRead: false,
      },
      include: {
        sender: {
          include: { student: true, company: true },
        },
      },
    });

    // Mark messages as read
    await prisma.message.updateMany({
      where: {
        chatId,
        senderId: { not: userId },
        isRead: false,
      },
      data: { isRead: true },
    });

    // Send read receipt notification to message sender(s)
    if (unreadMessages.length > 0) {
      const uniqueSenders = [...new Set(unreadMessages.map(msg => msg.senderId))];
      
      for (const senderId of uniqueSenders) {
        const sender = unreadMessages.find(msg => msg.senderId === senderId)?.sender;
        const senderName = sender?.student 
          ? `${sender.student.firstName} ${sender.student.lastName}`
          : sender?.company?.name || 'Foydalanuvchi';

        // Get current user name
        const chat = await prisma.chat.findUnique({
          where: { id: chatId },
          include: {
            participant1: { include: { student: true, company: true } },
            participant2: { include: { student: true, company: true } },
          },
        });

        if (chat) {
          const currentUser = chat.participant1Id === userId ? chat.participant1 : chat.participant2;
          const currentUserName = currentUser.student 
            ? `${currentUser.student.firstName} ${currentUser.student.lastName}`
            : currentUser.company?.name || 'Foydalanuvchi';

          await notificationService.create({
            userId: senderId,
            type: 'MESSAGE_READ',
            title: 'Xabar o\'qildi',
            message: `${currentUserName} xabarlaringizni o'qidi (${unreadMessages.length} ta)`,
            data: {
              chatId,
              readerId: userId,
              messageCount: unreadMessages.length,
            },
          });
        }
      }
    }

    return { success: true, readCount: unreadMessages.length };
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
