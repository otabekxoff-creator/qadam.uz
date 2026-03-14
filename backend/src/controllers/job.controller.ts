import { Response } from 'express';
import { jobService } from '@/services/job.service';
import { AuthenticatedRequest } from '@/types';
import asyncHandler from '@/utils/asyncHandler';
import { JobQueryInput } from '@/validators/job.validator';

export const createJob = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.userId;
  const job = await jobService.create(userId, req.body);
  res.status(201).json({
    success: true,
    data: job,
    message: 'Job created successfully',
  });
});

export const getJobs = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const query = req.query as unknown as JobQueryInput;
  const result = await jobService.findAll(query);
  res.json({
    success: true,
    data: result.jobs,
    meta: result.meta,
  });
});

export const getJobById = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const job = await jobService.findById(id);
  res.json({
    success: true,
    data: job,
  });
});

export const updateJob = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.user!.userId;
  const job = await jobService.update(id, userId, req.body);
  res.json({
    success: true,
    data: job,
    message: 'Job updated successfully',
  });
});

export const deleteJob = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.user!.userId;
  await jobService.delete(id, userId);
  res.json({
    success: true,
    message: 'Job deleted successfully',
  });
});

export const getMyJobs = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.userId;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const result = await jobService.getCompanyJobs(userId, page, limit);
  res.json({
    success: true,
    data: result.jobs,
    meta: result.meta,
  });
});
