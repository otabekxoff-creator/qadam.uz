import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

// Types
interface CreateGroupChatData {
  name: string;
  description?: string;
  creatorId: string;
  memberIds: string[];
  avatar?: string;
}

interface MessageReaction {
  emoji: string;
  userId: string;
}

interface TypingIndicator {
  userId: string;
  chatId: string;
  isTyping: boolean;
}

// In-memory store for typing indicators (would use Redis in production)
const typingIndicators = new Map<string, TypingIndicator>();

export const chatService = {
  // ========== BASIC CHAT OPERATIONS ==========

  // Create or get chat between users
  async getOrCreateChat(userId1: string, userId2: string) {
    // Check if chat exists
    const existingChat = await prisma.chat.findFirst({
      where: {
        isGroup: false,
        AND: [
          { members: { some: { userId: userId1 } } },
          { members: { some: { userId: userId2 } } },
        ],
      },
      include: {
        members: {
          include: {
            user: {
              include: { student: true, company: true },
            },
          },
        },
      },
    });

    if (existingChat) return existingChat;

    // Create new chat
    return await prisma.chat.create({
      data: {
        isGroup: false,
        members: {
          create: [
            { userId: userId1, role: 'MEMBER' },
            { userId: userId2, role: 'MEMBER' },
          ],
        },
      },
      include: {
        members: {
          include: {
            user: { include: { student: true, company: true } },
          },
        },
      },
    });
  },

  // Get user's chats
  async getUserChats(userId: string) {
    return await prisma.chat.findMany({
      where: { members: { some: { userId } } },
      include: {
        members: {
          include: {
            user: { include: { student: true, company: true } },
          },
        },
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
          include: { sender: { select: { id: true, email: true } } },
        },
        _count: {
          select: {
            messages: { where: { isRead: false, senderId: { not: userId } } },
          },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });
  },

  // Get chat messages with pagination
  async getChatMessages(chatId: string, userId: string, page: number = 1, limit: number = 50) {
    const membership = await prisma.chatMember.findFirst({
      where: { chatId, userId },
    });

    if (!membership) throw new Error('Not authorized to view this chat');

    const skip = (page - 1) * limit;

    const [messages, total] = await Promise.all([
      prisma.message.findMany({
        where: { chatId },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          sender: { include: { student: true, company: true } },
          reactions: true,
          attachments: true,
          replyTo: {
            include: { sender: { select: { id: true, email: true } } },
          },
        },
      }),
      prisma.message.count({ where: { chatId } }),
    ]);

    // Mark messages as read
    await prisma.message.updateMany({
      where: { chatId, senderId: { not: userId }, isRead: false },
      data: { isRead: true },
    });

    return { messages: messages.reverse(), total, totalPages: Math.ceil(total / limit) };
  },

  // Send message
  async sendMessage(chatId: string, senderId: string, content: string, type: string = 'TEXT', options?: {
    replyToId?: string;
    attachments?: { url: string; type: string; name: string; size: number }[];
  }) {
    const membership = await prisma.chatMember.findFirst({
      where: { chatId, userId: senderId },
    });

    if (!membership) throw new Error('Not authorized to send messages in this chat');

    // Check if user is muted
    if (membership.isMuted) throw new Error('You are muted in this chat');

    // Create message with optional reply and attachments
    const messageData: Prisma.MessageCreateInput = {
      chat: { connect: { id: chatId } },
      sender: { connect: { id: senderId } },
      content,
      type,
      isRead: false,
    };

    if (options?.replyToId) {
      messageData.replyTo = { connect: { id: options.replyToId } };
    }

    const message = await prisma.message.create({
      data: messageData,
      include: {
        sender: { include: { student: true, company: true } },
        reactions: true,
        attachments: true,
        replyTo: { include: { sender: { select: { id: true, email: true } } } },
      },
    });

    // Create attachments if provided
    if (options?.attachments && options.attachments.length > 0) {
      await prisma.messageAttachment.createMany({
        data: options.attachments.map(att => ({
          messageId: message.id,
          ...att,
        })),
      });
    }

    // Update chat updatedAt
    await prisma.chat.update({
      where: { id: chatId },
      data: { updatedAt: new Date() },
    });

    // Update last message preview
    await prisma.chat.update({
      where: { id: chatId },
      data: { lastMessagePreview: content.substring(0, 100) },
    });

    return message;
  },

  // ========== GROUP CHAT OPERATIONS ==========

  // Create group chat
  async createGroupChat(data: CreateGroupChatData) {
    const { name, description, creatorId, memberIds, avatar } = data;

    // Ensure creator is in members
    const allMemberIds = [...new Set([creatorId, ...memberIds])];

    return await prisma.chat.create({
      data: {
        name,
        description,
        isGroup: true,
        avatar,
        createdBy: creatorId,
        members: {
          create: allMemberIds.map(id => ({
            userId: id,
            role: id === creatorId ? 'ADMIN' : 'MEMBER',
          })),
        },
      },
      include: {
        members: {
          include: {
            user: { include: { student: true, company: true } },
          },
        },
      },
    });
  },

  // Add member to group
  async addGroupMember(chatId: string, adminId: string, newMemberId: string) {
    // Verify admin
    const adminMembership = await prisma.chatMember.findFirst({
      where: { chatId, userId: adminId, role: { in: ['ADMIN', 'MODERATOR'] } },
    });

    if (!adminMembership) throw new Error('Only admins can add members');

    // Check if already member
    const existing = await prisma.chatMember.findFirst({
      where: { chatId, userId: newMemberId },
    });

    if (existing) throw new Error('User is already a member');

    return await prisma.chatMember.create({
      data: {
        chatId,
        userId: newMemberId,
        role: 'MEMBER',
      },
      include: {
        user: { include: { student: true, company: true } },
      },
    });
  },

  // Remove member from group
  async removeGroupMember(chatId: string, adminId: string, memberId: string) {
    // Verify admin
    const adminMembership = await prisma.chatMember.findFirst({
      where: { chatId, userId: adminId, role: { in: ['ADMIN', 'MODERATOR'] } },
    });

    if (!adminMembership) throw new Error('Only admins can remove members');

    // Cannot remove self if admin
    if (adminId === memberId) throw new Error('Cannot remove yourself as admin');

    await prisma.chatMember.deleteMany({
      where: { chatId, userId: memberId },
    });

    return { removed: true };
  },

  // Change member role
  async changeMemberRole(chatId: string, adminId: string, memberId: string, newRole: 'ADMIN' | 'MODERATOR' | 'MEMBER') {
    // Verify admin
    const adminMembership = await prisma.chatMember.findFirst({
      where: { chatId, userId: adminId, role: 'ADMIN' },
    });

    if (!adminMembership) throw new Error('Only admins can change roles');

    return await prisma.chatMember.updateMany({
      where: { chatId, userId: memberId },
      data: { role: newRole },
    });
  },

  // Leave group
  async leaveGroup(chatId: string, userId: string) {
    const membership = await prisma.chatMember.findFirst({
      where: { chatId, userId },
    });

    if (!membership) throw new Error('Not a member of this group');

    // If admin, check if there are other admins
    if (membership.role === 'ADMIN') {
      const otherAdmins = await prisma.chatMember.count({
        where: { chatId, role: 'ADMIN', userId: { not: userId } },
      });

      if (otherAdmins === 0) {
        // Assign admin role to oldest member
        const oldestMember = await prisma.chatMember.findFirst({
          where: { chatId, userId: { not: userId } },
          orderBy: { joinedAt: 'asc' },
        });

        if (oldestMember) {
          await prisma.chatMember.update({
            where: { id: oldestMember.id },
            data: { role: 'ADMIN' },
          });
        }
      }
    }

    await prisma.chatMember.deleteMany({
      where: { chatId, userId },
    });

    return { left: true };
  },

  // Update group info
  async updateGroupInfo(chatId: string, userId: string, data: { name?: string; description?: string; avatar?: string }) {
    // Verify admin
    const membership = await prisma.chatMember.findFirst({
      where: { chatId, userId, role: { in: ['ADMIN', 'MODERATOR'] } },
    });

    if (!membership) throw new Error('Only admins can update group info');

    return await prisma.chat.update({
      where: { id: chatId },
      data,
      include: {
        members: {
          include: {
            user: { include: { student: true, company: true } },
          },
        },
      },
    });
  },

  // ========== MESSAGE OPERATIONS ==========

  // Edit message
  async editMessage(messageId: string, userId: string, newContent: string) {
    const message = await prisma.message.findUnique({
      where: { id: messageId },
    });

    if (!message) throw new Error('Message not found');
    if (message.senderId !== userId) throw new Error('Can only edit your own messages');
    if (message.type !== 'TEXT') throw new Error('Can only edit text messages');

    // Check if message is too old to edit (e.g., 24 hours)
    const hoursSinceSent = (Date.now() - message.createdAt.getTime()) / (1000 * 60 * 60);
    if (hoursSinceSent > 24) throw new Error('Message too old to edit');

    return await prisma.message.update({
      where: { id: messageId },
      data: {
        content: newContent,
        isEdited: true,
        editedAt: new Date(),
      },
      include: {
        sender: { include: { student: true, company: true } },
        reactions: true,
      },
    });
  },

  // Delete message
  async deleteMessage(messageId: string, userId: string, isAdmin: boolean = false) {
    const message = await prisma.message.findUnique({
      where: { id: messageId },
      include: { chat: { include: { members: { where: { userId } } } } },
    });

    if (!message) throw new Error('Message not found');

    const canDelete = message.senderId === userId || isAdmin || 
      (message.chat.members[0]?.role === 'ADMIN' || message.chat.members[0]?.role === 'MODERATOR');

    if (!canDelete) throw new Error('Not authorized to delete this message');

    // Soft delete - mark as deleted
    return await prisma.message.update({
      where: { id: messageId },
      data: {
        isDeleted: true,
        content: '[Message deleted]',
        deletedAt: new Date(),
      },
    });
  },

  // Add reaction to message
  async addReaction(messageId: string, userId: string, emoji: string) {
    const message = await prisma.message.findUnique({
      where: { id: messageId },
      include: { chat: { include: { members: { where: { userId } } } } },
    });

    if (!message) throw new Error('Message not found');
    if (message.chat.members.length === 0) throw new Error('Not a member of this chat');

    // Check if reaction already exists
    const existing = await prisma.messageReaction.findFirst({
      where: { messageId, userId, emoji },
    });

    if (existing) {
      // Remove reaction (toggle)
      await prisma.messageReaction.delete({ where: { id: existing.id } });
      return { added: false };
    }

    await prisma.messageReaction.create({
      data: { messageId, userId, emoji },
    });

    return { added: true };
  },

  // Get message reactions
  async getMessageReactions(messageId: string) {
    const reactions = await prisma.messageReaction.findMany({
      where: { messageId },
      include: {
        user: { select: { id: true, email: true, student: true, company: true } },
      },
    });

    // Group by emoji
    const grouped = reactions.reduce((acc, reaction) => {
      if (!acc[reaction.emoji]) {
        acc[reaction.emoji] = { count: 0, users: [] };
      }
      acc[reaction.emoji].count++;
      acc[reaction.emoji].users.push(reaction.user);
      return acc;
    }, {} as Record<string, { count: number; users: any[] }>);

    return grouped;
  },

  // Forward message
  async forwardMessage(messageId: string, userId: string, targetChatId: string) {
    const originalMessage = await prisma.message.findUnique({
      where: { id: messageId },
    });

    if (!originalMessage) throw new Error('Message not found');

    // Verify user is member of target chat
    const membership = await prisma.chatMember.findFirst({
      where: { chatId: targetChatId, userId },
    });

    if (!membership) throw new Error('Not authorized to send messages in target chat');

    return await this.sendMessage(targetChatId, userId, originalMessage.content, originalMessage.type, {
      attachments: originalMessage.attachments?.map(a => ({
        url: a.url,
        type: a.type,
        name: a.name,
        size: a.size,
      })),
    });
  },

  // Search messages in chat
  async searchMessages(chatId: string, userId: string, query: string, page: number = 1, limit: number = 20) {
    const membership = await prisma.chatMember.findFirst({
      where: { chatId, userId },
    });

    if (!membership) throw new Error('Not authorized to search this chat');

    const skip = (page - 1) * limit;

    const [messages, total] = await Promise.all([
      prisma.message.findMany({
        where: {
          chatId,
          content: { contains: query, mode: 'insensitive' },
          isDeleted: false,
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          sender: { include: { student: true, company: true } },
        },
      }),
      prisma.message.count({
        where: {
          chatId,
          content: { contains: query, mode: 'insensitive' },
          isDeleted: false,
        },
      }),
    ]);

    return { messages, total, totalPages: Math.ceil(total / limit) };
  },

  // ========== CHAT MODERATION ==========

  // Mute member
  async muteMember(chatId: string, adminId: string, memberId: string, duration?: number) {
    const adminMembership = await prisma.chatMember.findFirst({
      where: { chatId, userId: adminId, role: { in: ['ADMIN', 'MODERATOR'] } },
    });

    if (!adminMembership) throw new Error('Only admins can mute members');

    const mutedUntil = duration ? new Date(Date.now() + duration * 60 * 1000) : null;

    return await prisma.chatMember.updateMany({
      where: { chatId, userId: memberId },
      data: { isMuted: true, mutedUntil },
    });
  },

  // Unmute member
  async unmuteMember(chatId: string, adminId: string, memberId: string) {
    const adminMembership = await prisma.chatMember.findFirst({
      where: { chatId, userId: adminId, role: { in: ['ADMIN', 'MODERATOR'] } },
    });

    if (!adminMembership) throw new Error('Only admins can unmute members');

    return await prisma.chatMember.updateMany({
      where: { chatId, userId: memberId },
      data: { isMuted: false, mutedUntil: null },
    });
  },

  // Pin message
  async pinMessage(chatId: string, adminId: string, messageId: string) {
    const adminMembership = await prisma.chatMember.findFirst({
      where: { chatId, userId: adminId, role: { in: ['ADMIN', 'MODERATOR'] } },
    });

    if (!adminMembership) throw new Error('Only admins can pin messages');

    // Unpin previous message
    await prisma.message.updateMany({
      where: { chatId, isPinned: true },
      data: { isPinned: false },
    });

    return await prisma.message.update({
      where: { id: messageId },
      data: { isPinned: true, pinnedAt: new Date() },
    });
  },

  // Unpin message
  async unpinMessage(chatId: string, adminId: string, messageId: string) {
    const adminMembership = await prisma.chatMember.findFirst({
      where: { chatId, userId: adminId, role: { in: ['ADMIN', 'MODERATOR'] } },
    });

    if (!adminMembership) throw new Error('Only admins can unpin messages');

    return await prisma.message.update({
      where: { id: messageId },
      data: { isPinned: false, pinnedAt: null },
    });
  },

  // ========== TYPING INDICATORS ==========

  // Set typing status
  setTypingStatus(chatId: string, userId: string, isTyping: boolean) {
    const key = `${chatId}:${userId}`;
    typingIndicators.set(key, { userId, chatId, isTyping });

    // Auto-clear after 5 seconds
    if (isTyping) {
      setTimeout(() => {
        const current = typingIndicators.get(key);
        if (current && current.isTyping) {
          typingIndicators.set(key, { ...current, isTyping: false });
        }
      }, 5000);
    }
  },

  // Get typing users in chat
  getTypingUsers(chatId: string, excludeUserId: string): string[] {
    const typing: string[] = [];
    typingIndicators.forEach((value, key) => {
      if (value.chatId === chatId && value.userId !== excludeUserId && value.isTyping) {
        typing.push(value.userId);
      }
    });
    return typing;
  },

  // ========== UNREAD & NOTIFICATIONS ==========

  // Get unread count
  async getUnreadCount(userId: string) {
    return await prisma.message.count({
      where: {
        chat: { members: { some: { userId } } },
        senderId: { not: userId },
        isRead: false,
      },
    });
  },

  // Get unread count by chat
  async getUnreadCountByChat(userId: string) {
    const chats = await prisma.chat.findMany({
      where: { members: { some: { userId } } },
      include: {
        messages: {
          where: {
            senderId: { not: userId },
            isRead: false,
          },
          select: { id: true },
        },
      },
    });

    return chats.map(chat => ({
      chatId: chat.id,
      unreadCount: chat.messages.length,
    }));
  },

  // Mark chat as read
  async markChatAsRead(chatId: string, userId: string) {
    await prisma.message.updateMany({
      where: {
        chatId,
        senderId: { not: userId },
        isRead: false,
      },
      data: { isRead: true },
    });

    return { marked: true };
  },

  // ========== CHAT ARCHIVE & BLOCK ==========

  // Archive chat for user
  async archiveChat(chatId: string, userId: string) {
    await prisma.chatMember.updateMany({
      where: { chatId, userId },
      data: { isArchived: true },
    });

    return { archived: true };
  },

  // Unarchive chat
  async unarchiveChat(chatId: string, userId: string) {
    await prisma.chatMember.updateMany({
      where: { chatId, userId },
      data: { isArchived: false },
    });

    return { unarchived: true };
  },

  // Get archived chats
  async getArchivedChats(userId: string) {
    return await prisma.chat.findMany({
      where: {
        members: {
          some: { userId, isArchived: true },
        },
      },
      include: {
        members: {
          include: {
            user: { include: { student: true, company: true } },
          },
        },
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
      orderBy: { updatedAt: 'desc' },
    });
  },

  // Block user
  async blockUser(userId: string, blockedUserId: string) {
    await prisma.blockedUser.create({
      data: { userId, blockedUserId },
    });

    return { blocked: true };
  },

  // Unblock user
  async unblockUser(userId: string, blockedUserId: string) {
    await prisma.blockedUser.deleteMany({
      where: { userId, blockedUserId },
    });

    return { unblocked: true };
  },

  // Get blocked users
  async getBlockedUsers(userId: string) {
    return await prisma.blockedUser.findMany({
      where: { userId },
      include: {
        blocked: { include: { student: true, company: true } },
      },
    });
  },

  // ========== CHAT ANALYTICS ==========

  // Get chat statistics
  async getChatStats(chatId: string, userId: string) {
    const membership = await prisma.chatMember.findFirst({
      where: { chatId, userId },
    });

    if (!membership) throw new Error('Not a member of this chat');

    const [totalMessages, totalFiles, memberStats] = await Promise.all([
      prisma.message.count({ where: { chatId } }),
      prisma.messageAttachment.count({ where: { message: { chatId } } }),
      prisma.message.groupBy({
        by: ['senderId'],
        where: { chatId },
        _count: { senderId: true },
      }),
    ]);

    return {
      totalMessages,
      totalFiles,
      memberStats,
    };
  },

  // Get chat activity (messages per day)
  async getChatActivity(chatId: string, userId: string, days: number = 30) {
    const membership = await prisma.chatMember.findFirst({
      where: { chatId, userId },
    });

    if (!membership) throw new Error('Not a member of this chat');

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const activity = await prisma.$queryRaw`
      SELECT DATE(created_at) as date, COUNT(*) as count
      FROM messages
      WHERE chat_id = ${chatId} AND created_at >= ${startDate}
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    `;

    return activity;
  },
};
