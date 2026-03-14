import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Avtorizatsiyadan o\'tmagan' }, { status: 401 });
    }

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    
    const response = await fetch(`${API_URL}/auth/me`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: 'Token yaroqsiz' }, { status: 401 });
    }

    return NextResponse.json({ user: data.data });
  } catch (error) {
    console.error('Auth Me xatoligi:', error);
    return NextResponse.json({ error: 'Server xatoligi' }, { status: 500 });
  }
}
