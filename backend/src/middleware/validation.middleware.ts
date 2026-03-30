import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Validation middleware for creating/updating jobs
export const validateJob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, description, location, type, salaryMin, salaryMax } = req.body;

  const errors: string[] = [];

  if (!title || title.trim().length < 3) {
    errors.push('Title is required and must be at least 3 characters');
  }

  if (!description || description.trim().length < 50) {
    errors.push('Description is required and must be at least 50 characters');
  }

  if (!location || location.trim().length < 2) {
    errors.push('Location is required');
  }

  if (!type || !['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP'].includes(type)) {
    errors.push('Valid job type is required');
  }

  if (salaryMin && salaryMax && parseInt(salaryMin) > parseInt(salaryMax)) {
    errors.push('Minimum salary cannot be greater than maximum salary');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  next();
};

// Validation middleware for applications
export const validateApplication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { jobId, coverLetter } = req.body;

  const errors: string[] = [];

  if (!jobId) {
    errors.push('Job ID is required');
  } else {
    // Check if job exists
    const job = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      errors.push('Job not found');
    } else if (!job.isActive) {
      errors.push('This job is no longer active');
    }
  }

  if (coverLetter && coverLetter.length > 5000) {
    errors.push('Cover letter cannot exceed 5000 characters');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  next();
};

// Validation middleware for user registration
export const validateRegistration = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, role, firstName, lastName, companyName } = req.body;

  const errors: string[] = [];

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push('Valid email is required');
  }

  // Password validation
  if (!password || password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }

  // Role validation
  if (!role || !['STUDENT', 'COMPANY', 'ADMIN'].includes(role)) {
    errors.push('Valid role is required');
  }

  // Student-specific validation
  if (role === 'STUDENT') {
    if (!firstName || firstName.trim().length < 2) {
      errors.push('First name is required for students');
    }
    if (!lastName || lastName.trim().length < 2) {
      errors.push('Last name is required for students');
    }
  }

  // Company-specific validation
  if (role === 'COMPANY') {
    if (!companyName || companyName.trim().length < 2) {
      errors.push('Company name is required');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  next();
};

// Validation middleware for user login
export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  const errors: string[] = [];

  if (!email) {
    errors.push('Email is required');
  }

  if (!password) {
    errors.push('Password is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  next();
};

// Validation middleware for updating user profile
export const validateProfileUpdate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { phone, website, bio } = req.body;

  const errors: string[] = [];

  if (phone) {
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    if (!phoneRegex.test(phone)) {
      errors.push('Invalid phone number format');
    }
  }

  if (website) {
    const urlRegex = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
    if (!urlRegex.test(website)) {
      errors.push('Invalid website URL');
    }
  }

  if (bio && bio.length > 1000) {
    errors.push('Bio cannot exceed 1000 characters');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  next();
};
