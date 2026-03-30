import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

// GET /api/user/profile - Get current user profile
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

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      include: {
        student: {
          include: {
            skills: true,
            experience: true,
            projects: true,
            certifications: true,
            languages: true,
          },
        },
        company: {
          include: {
            jobs: {
              where: { isActive: true },
              orderBy: { createdAt: 'desc' },
              take: 5,
            },
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // Remove sensitive data
    const { password, ...userWithoutPassword } = user;

    return NextResponse.json({
      success: true,
      data: userWithoutPassword,
    });
  } catch (error) {
    console.error('Get profile error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

// PATCH /api/user/profile - Update user profile
export async function PATCH(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 });
    }

    const data = await req.json();

    // Update user data
    const updatedUser = await prisma.user.update({
      where: { id: payload.userId },
      data: {
        email: data.email,
      },
    });

    // Update role-specific data
    if (payload.role === 'STUDENT' && data.student) {
      await prisma.student.update({
        where: { userId: payload.userId },
        data: {
          firstName: data.student.firstName,
          lastName: data.student.lastName,
          phone: data.student.phone,
          bio: data.student.bio,
          major: data.student.major,
          university: data.student.university,
          course: data.student.course,
          educationLevel: data.student.educationLevel,
          location: data.student.location,
          expectedSalary: data.student.expectedSalary,
          preferredJobTypes: data.student.preferredJobTypes,
          preferredLocations: data.student.preferredLocations,
          isOpenToWork: data.student.isOpenToWork,
          isLookingForInternship: data.student.isLookingForInternship,
          linkedin: data.student.linkedin,
          github: data.student.github,
          portfolio: data.student.portfolio,
        },
      });
    }

    if (payload.role === 'COMPANY' && data.company) {
      await prisma.company.update({
        where: { userId: payload.userId },
        data: {
          name: data.company.name,
          description: data.company.description,
          website: data.company.website,
          phone: data.company.phone,
          industry: data.company.industry,
          size: data.company.size,
          location: data.company.location,
          benefits: data.company.benefits,
          culture: data.company.culture,
          mission: data.company.mission,
          vision: data.company.vision,
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: updatedUser,
      message: 'Profile updated successfully',
    });
  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update profile' },
      { status: 500 }
    );
  }
}

// DELETE /api/user/profile - Delete user account
export async function DELETE(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 });
    }

    const { password } = await req.json();

    // Verify password
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // In a real app, you would verify the password here
    // For now, we'll just delete the user

    await prisma.user.delete({
      where: { id: payload.userId },
    });

    return NextResponse.json({
      success: true,
      message: 'Account deleted successfully',
    });
  } catch (error) {
    console.error('Delete account error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete account' },
      { status: 500 }
    );
  }
}
