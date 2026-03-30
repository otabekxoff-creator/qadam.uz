import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

// GET /api/chats/[id] - Get chat by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 });
    }

    const chat = await prisma.chat.findFirst({
      where: {
        id: params.id,
        members: {
          some: {
            userId: payload.userId,
          },
        },
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                student: {
                  select: {
                    firstName: true,
                    lastName: true,
                    avatar: true,
                  },
                },
                company: {
                  select: {
                    name: true,
                    logo: true,
                  },
                },
              },
            },
          },
        },
        messages: {
          orderBy: { createdAt: 'asc' },
          select: {
            id: true,
            content: true,
            type: true,
            isRead: true,
            createdAt: true,
            sender: {
              select: {
                id: true,
                student: {
                  select: {
                    firstName: true,
                    lastName: true,
                    avatar: true,
                  },
                },
                company: {
                  select: {
                    name: true,
                    logo: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!chat) {
      return NextResponse.json(
        { success: false, message: 'Chat not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: chat,
    });
  } catch (error) {
    console.error('Get chat error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch chat' },
      { status: 500 }
    );
  }
}

// POST /api/chats/[id]/messages - Send message
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 });
    }

    // Check if user is member of chat
    const membership = await prisma.chatMember.findFirst({
      where: {
        chatId: params.id,
        userId: payload.userId,
      },
    });

    if (!membership) {
      return NextResponse.json(
        { success: false, message: 'Not authorized to send messages in this chat' },
        { status: 403 }
      );
    }

    const { content, type = 'TEXT' } = await req.json();

    const message = await prisma.message.create({
      data: {
        chatId: params.id,
        senderId: payload.userId,
        content,
        type,
        isRead: false,
      },
      include: {
        sender: {
          select: {
            id: true,
            student: {
              select: {
                firstName: true,
                lastName: true,
                avatar: true,
              },
            },
            company: {
              select: {
                name: true,
                logo: true,
              },
            },
          },
        },
      },
    });

    // Update chat's updatedAt
    await prisma.chat.update({
      where: { id: params.id },
      data: { updatedAt: new Date() },
    });

    // Create notifications for other members
    const otherMembers = await prisma.chatMember.findMany({
      where: {
        chatId: params.id,
        userId: {
          not: payload.userId,
        },
      },
    });

    for (const member of otherMembers) {
      await prisma.notification.create({
        data: {
          userId: member.userId,
          type: 'MESSAGE',
          title: 'New Message',
          message: `You have a new message`,
          data: {
            chatId: params.id,
            messageId: message.id,
          },
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: message,
      message: 'Message sent successfully',
    }, { status: 201 });
  } catch (error) {
    console.error('Send message error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send message' },
      { status: 500 }
    );
  }
}
