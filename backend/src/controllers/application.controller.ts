import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { createError } from '../middleware/error.middleware';

export const getMyApplications = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const userRole = (req as any).user?.role;

    let applications;

    if (userRole === 'STUDENT') {
      const student = await prisma.student.findUnique({ where: { userId } });
      if (!student) throw createError('Student profile not found', 404);

      applications = await prisma.application.findMany({
        where: { studentId: student.id },
        include: {
          job: {
            include: {
              company: { select: { id: true, name: true, logo: true } },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      });
    } else if (userRole === 'COMPANY') {
      const company = await prisma.company.findUnique({ where: { userId } });
      if (!company) throw createError('Company profile not found', 404);

      applications = await prisma.application.findMany({
        where: {
          job: { companyId: company.id },
        },
        include: {
          student: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              avatar: true,
              university: true,
              major: true,
            },
          },
          job: { select: { id: true, title: true } },
        },
        orderBy: { createdAt: 'desc' },
      });
    }

    res.json({
      success: true,
      data: applications,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to fetch applications',
    });
  }
};

export const createApplication = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const { jobId, coverLetter, resumeUrl } = req.body;

    const student = await prisma.student.findUnique({ where: { userId } });
    if (!student) throw createError('Student profile not found', 404);

    const job = await prisma.job.findUnique({ where: { id: jobId } });
    if (!job) throw createError('Job not found', 404);
    if (!job.isActive) throw createError('This job is no longer active', 400);

    const existingApplication = await prisma.application.findFirst({
      where: {
        jobId,
        studentId: student.id,
      },
    });

    if (existingApplication) {
      throw createError('You have already applied for this job', 400);
    }

    const application = await prisma.application.create({
      data: {
        jobId,
        studentId: student.id,
        coverLetter,
        resumeUrl,
      },
      include: {
        job: {
          include: {
            company: { select: { id: true, name: true } },
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: application,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to submit application',
    });
  }
};

export const updateApplicationStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = (req as any).user?.id;
    const applicationId = Array.isArray(id) ? id[0] : id;

    const company = await prisma.company.findUnique({ where: { userId } });
    if (!company) throw createError('Company profile not found', 404);

    const application = await prisma.application.findFirst({
      where: {
        id: applicationId,
        job: { companyId: company.id },
      },
    });

    if (!application) {
      throw createError('Application not found or not authorized', 404);
    }

    const updated = await prisma.application.update({
      where: { id: applicationId },
      data: { status },
      include: {
        student: {
          select: { id: true, firstName: true, lastName: true, userId: true },
        },
        job: { select: { id: true, title: true } },
      },
    });

    res.json({
      success: true,
      message: 'Application status updated',
      data: updated,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to update application',
    });
  }
};
