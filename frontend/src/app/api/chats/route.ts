import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

// GET /api/chats - Get user chats
export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 });
    }

    const chats = await prisma.chat.findMany({
      where: {
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
          orderBy: { createdAt: 'desc' },
          take: 1,
          select: {
            id: true,
            content: true,
            createdAt: true,
            senderId: true,
            isRead: true,
          },
        },
        _count: {
          select: {
            messages: {
              where: {
                isRead: false,
                senderId: {
                  not: payload.userId,
                },
              },
            },
          },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      data: chats,
    });
  } catch (error) {
    console.error('Get chats error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch chats' },
      { status: 500 }
    );
  }
}

// POST /api/chats - Create new chat
export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 });
    }

    const { userId, name, isGroup } = await req.json();

    // Check if chat already exists between these users
    const existingChat = await prisma.chat.findFirst({
      where: {
        isGroup: false,
        AND: [
          {
            members: {
              some: {
                userId: payload.userId,
              },
            },
          },
          {
            members: {
              some: {
                userId: userId,
              },
            },
          },
        ],
      },
    });

    if (existingChat) {
      return NextResponse.json({
        success: true,
        data: existingChat,
        message: 'Chat already exists',
      });
    }

    const chat = await prisma.chat.create({
      data: {
        name: name || null,
        isGroup: isGroup || false,
        members: {
          create: [
            { userId: payload.userId, role: 'ADMIN' },
            { userId: userId, role: 'MEMBER' },
          ],
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
      },
    });

    return NextResponse.json({
      success: true,
      data: chat,
      message: 'Chat created successfully',
    }, { status: 201 });
  } catch (error) {
    console.error('Create chat error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create chat' },
      { status: 500 }
    );
  }
}
