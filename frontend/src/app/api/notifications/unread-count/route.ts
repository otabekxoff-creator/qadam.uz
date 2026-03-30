import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

// GET /api/notifications/unread-count - Get unread notifications count
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

    const count = await prisma.notification.count({
      where: {
        userId: payload.userId,
        isRead: false,
      },
    });

    return NextResponse.json({
      success: true,
      data: { count },
    });
  } catch (error) {
    console.error('Get unread count error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch unread count' },
      { status: 500 }
    );
  }
}
