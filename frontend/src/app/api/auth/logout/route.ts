import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// POST /api/auth/logout - User logout
export async function POST(req: NextRequest) {
  try {
    // Clear auth cookies
    const cookieStore = cookies();
    cookieStore.delete('token');
    cookieStore.delete('refreshToken');

    return NextResponse.json({
      success: true,
      message: 'Logout successful',
    });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { success: false, message: 'Logout failed' },
      { status: 500 }
    );
  }
}
