import { PrismaClient, Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Types
interface UpdateProfileData {
  name?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  bio?: string;
  location?: string;
  website?: string;
  socialLinks?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
}

interface StudentProfileData {
  fullName?: string;
  headline?: string;
  summary?: string;
  location?: string;
  phone?: string;
  dateOfBirth?: Date;
  gender?: string;
  lookingFor?: string[];
  expectedSalary?: number;
  currency?: string;
  preferredLocation?: string[];
  isPublic?: boolean;
}

interface CompanyProfileData {
  name?: string;
  description?: string;
  logo?: string;
  website?: string;
  industry?: string;
  companySize?: string;
  location?: string;
  foundedYear?: number;
  email?: string;
  phone?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
}

interface ExperienceData {
  id?: string;
  title: string;
  company: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
  isCurrent?: boolean;
  description?: string;
}

interface EducationData {
  id?: string;
  institution: string;
  degree: string;
  field?: string;
  startDate: Date;
  endDate?: Date;
  isCurrent?: boolean;
  description?: string;
}

interface ProjectData {
  id?: string;
  title: string;
  description?: string;
  url?: string;
  technologies?: string[];
  startDate?: Date;
  endDate?: Date;
}

export const userService = {
  // Get user profile with full details
  async getUserProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        student: {
          include: {
            skills: true,
            experience: {
              orderBy: { startDate: 'desc' },
            },
            projects: {
              orderBy: { createdAt: 'desc' },
            },
            education: {
              orderBy: { startDate: 'desc' },
            },
            _count: {
              select: {
                applications: true,
                skills: true,
              },
            },
          },
        },
        company: {
          include: {
            jobs: {
              where: { isActive: true },
              take: 5,
              orderBy: { createdAt: 'desc' },
              include: {
                _count: {
                  select: { applications: true },
                },
              },
            },
            _count: {
              select: {
                jobs: true,
                followers: true,
              },
            },
          },
        },
        _count: {
          select: {
            applications: true,
            notifications: {
              where: { isRead: false },
            },
          },
        },
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return {
      ...user,
      stats: {
        totalApplications: user._count.applications,
        unreadNotifications: user._count.notifications,
        ...(user.student && {
          totalSkills: user.student._count.skills,
        }),
        ...(user.company && {
          totalJobs: user.company._count.jobs,
          totalFollowers: user.company._count.followers,
        }),
      },
    };
  },

  // Get public user profile (for other users viewing)
  async getPublicUserProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        student: {
          include: {
            skills: true,
            experience: {
              orderBy: { startDate: 'desc' },
            },
            projects: {
              select: {
                id: true,
                title: true,
                description: true,
                url: true,
                technologies: true,
              },
              orderBy: { createdAt: 'desc' },
              take: 5,
            },
            education: {
              orderBy: { startDate: 'desc' },
              take: 5,
            },
          },
        },
        company: {
          select: {
            id: true,
            name: true,
            logo: true,
            description: true,
            website: true,
            industry: true,
            companySize: true,
            location: true,
            isVerified: true,
            _count: {
              select: { jobs: true },
            },
          },
        },
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Hide sensitive information
    const { password, email, ...publicUser } = user as any;

    return publicUser;
  },

  // Update user profile
  async updateUserProfile(userId: string, data: UpdateProfileData) {
    const { student, company, ...userData } = data as any;

    const updateData: any = { ...userData };

    if (student) {
      updateData.student = {
        upsert: {
          create: student,
          update: student,
        },
      };
    }

    if (company) {
      updateData.company = {
        upsert: {
          create: company,
          update: company,
        },
      };
    }

    return await prisma.user.update({
      where: { id: userId },
      data: updateData,
      include: {
        student: true,
        company: true,
      },
    });
  },

  // Update student profile
  async updateStudentProfile(userId: string, data: StudentProfileData) {
    const student = await prisma.student.findUnique({
      where: { userId },
    });

    if (!student) {
      // Create new student profile
      return await prisma.student.create({
        data: {
          ...data,
          userId,
        },
      });
    }

    return await prisma.student.update({
      where: { userId },
      data,
    });
  },

  // Update company profile
  async updateCompanyProfile(userId: string, data: CompanyProfileData) {
    const company = await prisma.company.findUnique({
      where: { userId },
    });

    if (!company) {
      // Create new company profile
      return await prisma.company.create({
        data: {
          ...data,
          userId,
        },
      });
    }

    return await prisma.company.update({
      where: { userId },
      data,
    });
  },

  // Update student skills
  async updateStudentSkills(userId: string, skills: string[]) {
    const student = await prisma.student.findUnique({
      where: { userId },
    });

    if (!student) {
      throw new Error('Student profile not found');
    }

    // Delete existing skills
    await prisma.skill.deleteMany({
      where: { studentId: student.id },
    });

    // Create new skills
    const createdSkills = await Promise.all(
      skills.map((skill) =>
        prisma.skill.create({
          data: {
            name: skill,
            studentId: student.id,
          },
        })
      )
    );

    return createdSkills;
  },

  // Add or update experience
  async updateExperience(userId: string, data: ExperienceData) {
    const student = await prisma.student.findUnique({
      where: { userId },
    });

    if (!student) {
      throw new Error('Student profile not found');
    }

    if (data.id) {
      // Update existing
      return await prisma.experience.update({
        where: { id: data.id },
        data: {
          ...data,
          studentId: student.id,
        },
      });
    } else {
      // Create new
      return await prisma.experience.create({
        data: {
          ...data,
          studentId: student.id,
        },
      });
    }
  },

  // Delete experience
  async deleteExperience(userId: string, experienceId: string) {
    const student = await prisma.student.findUnique({
      where: { userId },
    });

    if (!student) {
      throw new Error('Student profile not found');
    }

    const experience = await prisma.experience.findFirst({
      where: {
        id: experienceId,
        studentId: student.id,
      },
    });

    if (!experience) {
      throw new Error('Experience not found');
    }

    return await prisma.experience.delete({
      where: { id: experienceId },
    });
  },

  // Add or update education
  async updateEducation(userId: string, data: EducationData) {
    const student = await prisma.student.findUnique({
      where: { userId },
    });

    if (!student) {
      throw new Error('Student profile not found');
    }

    if (data.id) {
      return await prisma.education.update({
        where: { id: data.id },
        data: {
          ...data,
          studentId: student.id,
        },
      });
    } else {
      return await prisma.education.create({
        data: {
          ...data,
          studentId: student.id,
        },
      });
    }
  },

  // Delete education
  async deleteEducation(userId: string, educationId: string) {
    const student = await prisma.student.findUnique({
      where: { userId },
    });

    if (!student) {
      throw new Error('Student profile not found');
    }

    const education = await prisma.education.findFirst({
      where: {
        id: educationId,
        studentId: student.id,
      },
    });

    if (!education) {
      throw new Error('Education not found');
    }

    return await prisma.education.delete({
      where: { id: educationId },
    });
  },

  // Add or update project
  async updateProject(userId: string, data: ProjectData) {
    const student = await prisma.student.findUnique({
      where: { userId },
    });

    if (!student) {
      throw new Error('Student profile not found');
    }

    if (data.id) {
      return await prisma.project.update({
        where: { id: data.id },
        data: {
          ...data,
          studentId: student.id,
        },
      });
    } else {
      return await prisma.project.create({
        data: {
          ...data,
          studentId: student.id,
        },
      });
    }
  },

  // Delete project
  async deleteProject(userId: string, projectId: string) {
    const student = await prisma.student.findUnique({
      where: { userId },
    });

    if (!student) {
      throw new Error('Student profile not found');
    }

    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        studentId: student.id,
      },
    });

    if (!project) {
      throw new Error('Project not found');
    }

    return await prisma.project.delete({
      where: { id: projectId },
    });
  },

  // Change password
  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        password: true,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Verify current password
    const isValid = await bcrypt.compare(currentPassword, user.password);
    if (!isValid) {
      throw new Error('Current password is incorrect');
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    return await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });
  },

  // Get all users (admin only)
  async getAllUsers(options: any = {}) {
    const { page = 1, limit = 10, role, isVerified, search } = options;
    const skip = (page - 1) * limit;

    const where: Prisma.UserWhereInput = {};
    
    if (role) where.role = role;
    if (isVerified !== undefined) where.isVerified = isVerified;
    if (search) {
      where.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        { student: { fullName: { contains: search, mode: 'insensitive' } } },
        { company: { name: { contains: search, mode: 'insensitive' } } },
      ];
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        include: {
          student: {
            select: {
              fullName: true,
              headline: true,
              location: true,
              _count: {
                select: {
                  skills: true,
                  applications: true,
                },
              },
            },
          },
          company: {
            select: {
              name: true,
              logo: true,
              industry: true,
              isVerified: true,
              _count: {
                select: {
                  jobs: true,
                },
              },
            },
          },
          _count: {
            select: {
              applications: true,
            },
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count({ where }),
    ]);

    return { 
      users, 
      total, 
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      }
    };
  },

  // Get user statistics (for admin dashboard)
  async getUserStats() {
    const [
      totalUsers,
      totalStudents,
      totalCompanies,
      verifiedUsers,
      unverifiedUsers,
      newUsersToday,
      newUsersThisWeek,
      newUsersThisMonth,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: 'STUDENT' } }),
      prisma.user.count({ where: { role: 'COMPANY' } }),
      prisma.user.count({ where: { isVerified: true } }),
      prisma.user.count({ where: { isVerified: false } }),
      prisma.user.count({
        where: {
          createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
        },
      }),
      prisma.user.count({
        where: {
          createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
        },
      }),
      prisma.user.count({
        where: {
          createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        },
      }),
    ]);

    return {
      totalUsers,
      totalStudents,
      totalCompanies,
      verifiedUsers,
      unverifiedUsers,
      newUsers: {
        today: newUsersToday,
        thisWeek: newUsersThisWeek,
        thisMonth: newUsersThisMonth,
      },
      verificationRate: totalUsers > 0 
        ? ((verifiedUsers / totalUsers) * 100).toFixed(2) + '%'
        : '0%',
    };
  },

  // Search users
  async searchUsers(query: string, role?: string, limit: number = 20) {
    const where: Prisma.UserWhereInput = {
      OR: [
        { email: { contains: query, mode: 'insensitive' } },
        { student: { fullName: { contains: query, mode: 'insensitive' } } },
        { company: { name: { contains: query, mode: 'insensitive' } } },
      ],
    };

    if (role) {
      where.role = role;
    }

    return await prisma.user.findMany({
      where,
      include: {
        student: {
          select: {
            fullName: true,
            headline: true,
            avatar: true,
            location: true,
          },
        },
        company: {
          select: {
            name: true,
            logo: true,
            industry: true,
            location: true,
            isVerified: true,
          },
        },
      },
      take: limit,
      orderBy: { createdAt: 'desc' },
    });
  },

  // Delete user
  async deleteUser(userId: string) {
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        _count: {
          select: {
            applications: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Delete user (cascade will handle related records)
    return await prisma.user.delete({
      where: { id: userId },
    });
  },

  // Verify user email
  async verifyUserEmail(userId: string) {
    return await prisma.user.update({
      where: { id: userId },
      data: { isVerified: true },
    });
  },

  // Ban/Unban user (admin only)
  async toggleUserBan(userId: string, isBanned: boolean) {
    return await prisma.user.update({
      where: { id: userId },
      data: { 
        isActive: !isBanned,
        bannedAt: isBanned ? new Date() : null,
      },
    });
  },

  // Get user activity log
  async getUserActivity(userId: string, options: any = {}) {
    const { page = 1, limit = 20 } = options;
    const skip = (page - 1) * limit;

    // This would typically come from an activity log table
    // For now, return recent applications and other activity
    const [applications, recentJobs] = await Promise.all([
      prisma.application.findMany({
        where: { student: { userId } },
        include: {
          job: {
            select: {
              id: true,
              title: true,
              company: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip,
      }),
      prisma.job.findMany({
        where: { company: { userId } },
        orderBy: { createdAt: 'desc' },
        take: limit,
      }),
    ]);

    return {
      applications,
      postedJobs: recentJobs,
    };
  },

  // Update notification preferences
  async updateNotificationPreferences(userId: string, preferences: any) {
    return await prisma.user.update({
      where: { id: userId },
      data: {
        notificationPreferences: preferences,
      },
    });
  },

  // Get notification preferences
  async getNotificationPreferences(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        notificationPreferences: true,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user.notificationPreferences || {
      email: true,
      push: true,
      sms: false,
      jobAlerts: true,
      applicationUpdates: true,
      messages: true,
      marketing: false,
    };
  },

  // Get top students (for admin/companies)
  async getTopStudents(limit: number = 10) {
    return await prisma.student.findMany({
      where: {
        isPublic: true,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            createdAt: true,
          },
        },
        skills: true,
        _count: {
          select: {
            applications: true,
            skills: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    });
  },

  // Export user data (GDPR compliance)
  async exportUserData(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        student: {
          include: {
            skills: true,
            experience: true,
            education: true,
            projects: true,
            applications: {
              include: {
                job: {
                  select: {
                    title: true,
                    company: {
                      select: {
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        company: {
          include: {
            jobs: true,
          },
        },
        notifications: true,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Remove sensitive data like password
    const { password, ...exportData } = user as any;

    return exportData;
  },
};
