import { z } from 'zod';
import { JobStatus } from '@prisma/client';

export const createJobSchema = z.object({
  title: z.string().min(5, 'Title too short').max(100),
  description: z.string().min(50, 'Description too short'),
  requirements: z.array(z.string()).min(1, 'At least one requirement required'),
  responsibilities: z.array(z.string()).optional(),
  location: z.string().min(2),
  type: z.enum(['FULL_TIME', 'PART_TIME', 'INTERNSHIP', 'FREELANCE', 'REMOTE', 'HYBRID']),
  salaryMin: z.union([z.string(), z.number()]).optional().transform((val) => {
    if (val === undefined) return undefined;
    return typeof val === 'number' ? val.toString() : val;
  }),
  salaryMax: z.union([z.string(), z.number()]).optional().transform((val) => {
    if (val === undefined) return undefined;
    return typeof val === 'number' ? val.toString() : val;
  }),
  currency: z.string().default('UZS'),
  skills: z.array(z.string()).min(1, 'At least one skill required'),
  deadline: z.string().datetime().optional(),
});

export const updateJobSchema = createJobSchema.partial().extend({
  status: z.nativeEnum(JobStatus).optional(),
});

export const jobQuerySchema = z.object({
  page: z.string().transform(Number).default('1'),
  limit: z.string().transform(Number).default('10'),
  search: z.string().optional(),
  location: z.string().optional(),
  type: z.string().optional(),
  skills: z.string().optional(),
  minSalary: z.string().transform(Number).optional(),
  maxSalary: z.string().transform(Number).optional(),
});

export type CreateJobInput = z.infer<typeof createJobSchema>;
export type UpdateJobInput = z.infer<typeof updateJobSchema>;
export type JobQueryInput = z.infer<typeof jobQuerySchema>;
