import { Response } from 'express';
import { applicationService } from '@/services/application.service';
import { AuthenticatedRequest } from '@/types';
import asyncHandler from '@/utils/asyncHandler';
import { ApplicationStatus } from '@prisma/client';
import prisma from '@/config/database';
import { NotFoundError } from '@/utils/errors';

export const applyForJob = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.userId;
  const { jobId } = req.params;
  const { coverLetter } = req.body;
  
  const student = await prisma.student.findUnique({
    where: { userId },
  });
  
  if (!student) {
    throw new NotFoundError('Student profile not found');
  }
  
  const application = await applicationService.create(student.id, jobId, coverLetter);
  res.status(201).json({
    success: true,
    data: application,
    message: 'Application submitted successfully',
  });
});

export const getMyApplications = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.userId;
  const applications = await applicationService.getStudentApplications(userId);
  res.json({
    success: true,
    data: applications,
  });
});

export const getJobApplications = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.userId;
  const { jobId } = req.params;
  
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  
  const result = await applicationService.getJobApplications(jobId, userId, page, limit);
  
  res.json({
    success: true,
    data: result.applications,
    meta: result.meta,
  });
});

export const updateApplicationStatus = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.userId;
  const { applicationId } = req.params;
  const { status } = req.body;
  
  const application = await applicationService.updateStatus(
    applicationId, 
    userId, 
    status as ApplicationStatus
  );
  res.json({
    success: true,
    data: application,
    message: 'Status updated successfully',
  });
});
