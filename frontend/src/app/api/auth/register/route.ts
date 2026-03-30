import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { EducationLevel, CompanySize } from '@prisma/client';

// POST /api/auth/register - User registration
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, role, firstName, lastName, companyName, industry, size } = body;

    if (!email || !password || !role) {
      return NextResponse.json(
        { success: false, message: 'Email, password, and role are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'User already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user with role-specific data
    let userData: any = {
      email,
      password: hashedPassword,
      role,
    };

    if (role === 'STUDENT') {
      if (!firstName || !lastName) {
        return NextResponse.json(
          { success: false, message: 'First name and last name are required for students' },
          { status: 400 }
        );
      }

      userData.student = {
        create: {
          firstName,
          lastName,
          educationLevel: EducationLevel.BACHELOR,
        },
      };
    } else if (role === 'COMPANY') {
      if (!companyName) {
        return NextResponse.json(
          { success: false, message: 'Company name is required' },
          { status: 400 }
        );
      }

      userData.company = {
        create: {
          name: companyName,
          email,
          industry: industry || 'Technology',
          size: size || CompanySize.SMALL,
        },
      };
    }

    const user = await prisma.user.create({
      data: userData,
      include: {
        student: true,
        company: true,
      },
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      success: true,
      data: userWithoutPassword,
      message: 'Registration successful',
    }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, message: 'Registration failed' },
      { status: 500 }
    );
  }
}
