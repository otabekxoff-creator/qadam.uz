import { Request, Response } from 'express';
import { emailService } from '../services/email.service';
import { createError } from '../middleware/error.middleware';

// Send welcome email
export const sendWelcomeEmail = async (req: Request, res: Response) => {
  try {
    const { email, name } = req.body;

    if (!email || !name) {
      throw createError('Email and name are required', 400);
    }

    const result = await emailService.sendWelcomeEmail(email, name);

    res.json({
      success: true,
      message: 'Welcome email sent successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to send welcome email',
    });
  }
};

// Send password reset email
export const sendPasswordReset = async (req: Request, res: Response) => {
  try {
    const { email, resetToken, name } = req.body;

    if (!email || !resetToken) {
      throw createError('Email and reset token are required', 400);
    }

    const result = await emailService.sendPasswordResetEmail(email, resetToken, name || 'User');

    res.json({
      success: true,
      message: 'Password reset email sent successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to send password reset email',
    });
  }
};

// Send application confirmation
export const sendApplicationConfirmation = async (req: Request, res: Response) => {
  try {
    const { email, name, jobTitle, companyName } = req.body;

    if (!email || !jobTitle || !companyName) {
      throw createError('Email, job title, and company name are required', 400);
    }

    const result = await emailService.sendApplicationConfirmation(email, name || 'Applicant', jobTitle, companyName);

    res.json({
      success: true,
      message: 'Application confirmation sent successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to send application confirmation',
    });
  }
};

// Send application status update
export const sendStatusUpdate = async (req: Request, res: Response) => {
  try {
    const { email, name, jobTitle, companyName, status, message } = req.body;

    if (!email || !jobTitle || !status) {
      throw createError('Email, job title, and status are required', 400);
    }

    const result = await emailService.sendApplicationStatusUpdate(
      email,
      name || 'Applicant',
      jobTitle,
      companyName || 'Company',
      status,
      message
    );

    res.json({
      success: true,
      message: 'Status update email sent successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to send status update',
    });
  }
};

// Send job alert
export const sendJobAlert = async (req: Request, res: Response) => {
  try {
    const { email, name, jobs } = req.body;

    if (!email || !jobs || !Array.isArray(jobs)) {
      throw createError('Email and jobs array are required', 400);
    }

    const result = await emailService.sendJobAlert(email, name || 'Job Seeker', jobs);

    res.json({
      success: true,
      message: 'Job alert sent successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to send job alert',
    });
  }
};

// Send message notification
export const sendMessageNotification = async (req: Request, res: Response) => {
  try {
    const { email, name, senderName, message, chatId } = req.body;

    if (!email || !senderName || !message || !chatId) {
      throw createError('Email, sender name, message, and chat ID are required', 400);
    }

    const result = await emailService.sendMessageNotification(email, name || 'User', senderName, message, chatId);

    res.json({
      success: true,
      message: 'Message notification sent successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to send message notification',
    });
  }
};

// Send interview invitation
export const sendInterviewInvitation = async (req: Request, res: Response) => {
  try {
    const { email, name, jobTitle, companyName, interviewDetails, confirmationToken } = req.body;

    if (!email || !jobTitle || !companyName || !interviewDetails || !confirmationToken) {
      throw createError('Required fields missing', 400);
    }

    const result = await emailService.sendInterviewInvitation(
      email,
      name || 'Candidate',
      jobTitle,
      companyName,
      interviewDetails,
      confirmationToken
    );

    res.json({
      success: true,
      message: 'Interview invitation sent successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to send interview invitation',
    });
  }
};

// Send offer letter
export const sendOfferLetter = async (req: Request, res: Response) => {
  try {
    const { email, name, jobTitle, companyName, offerDetails, expiryDate, offerToken } = req.body;

    if (!email || !jobTitle || !companyName || !offerDetails || !expiryDate || !offerToken) {
      throw createError('Required fields missing', 400);
    }

    const result = await emailService.sendOfferLetter(
      email,
      name || 'Candidate',
      jobTitle,
      companyName,
      offerDetails,
      expiryDate,
      offerToken
    );

    res.json({
      success: true,
      message: 'Offer letter sent successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to send offer letter',
    });
  }
};

// Send verification email
export const sendVerificationEmail = async (req: Request, res: Response) => {
  try {
    const { email, name, verificationToken } = req.body;

    if (!email || !verificationToken) {
      throw createError('Email and verification token are required', 400);
    }

    const result = await emailService.sendVerificationEmail(email, name || 'User', verificationToken);

    res.json({
      success: true,
      message: 'Verification email sent successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to send verification email',
    });
  }
};

// Send weekly digest
export const sendWeeklyDigest = async (req: Request, res: Response) => {
  try {
    const { email, name, stats } = req.body;

    if (!email || !stats) {
      throw createError('Email and stats are required', 400);
    }

    const result = await emailService.sendWeeklyDigest(email, name || 'User', stats);

    res.json({
      success: true,
      message: 'Weekly digest sent successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to send weekly digest',
    });
  }
};

// Send bulk emails
export const sendBulkEmails = async (req: Request, res: Response) => {
  try {
    const { recipients, template, data, delayBetween } = req.body;

    if (!recipients || !Array.isArray(recipients) || !template || !data) {
      throw createError('Recipients, template, and data are required', 400);
    }

    const result = await emailService.sendBulkEmails(recipients, template, data, delayBetween || 1000);

    res.json({
      success: true,
      message: 'Bulk emails processed',
      data: result,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to send bulk emails',
    });
  }
};

// Get email analytics
export const getEmailAnalytics = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;

    const stats = await emailService.getEmailAnalytics(
      startDate ? new Date(startDate as string) : undefined,
      endDate ? new Date(endDate as string) : undefined
    );

    res.json({
      success: true,
      data: stats,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to get email analytics',
    });
  }
};

// Get user's email history
export const getUserEmailHistory = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const { limit } = req.query;

    if (!email) {
      throw createError('Email is required', 400);
    }

    const history = await emailService.getUserEmailHistory(email, parseInt(limit as string) || 50);

    res.json({
      success: true,
      data: history,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to get email history',
    });
  }
};

// Resend failed emails
export const resendFailedEmails = async (req: Request, res: Response) => {
  try {
    const { maxRetries } = req.body;

    const result = await emailService.resendFailedEmails(maxRetries || 3);

    res.json({
      success: true,
      message: 'Failed emails resend processed',
      data: result,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to resend emails',
    });
  }
};

// Track email open
export const trackEmailOpen = async (req: Request, res: Response) => {
  try {
    const { email, messageId } = req.query;

    if (!email) {
      throw createError('Email is required', 400);
    }

    await emailService.trackEmailOpen(email as string, messageId as string);

    // Return 1x1 transparent pixel
    res.setHeader('Content-Type', 'image/gif');
    res.send(Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64'));
  } catch (error: any) {
    // Still return pixel on error
    res.setHeader('Content-Type', 'image/gif');
    res.send(Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64'));
  }
};

// Track email click
export const trackEmailClick = async (req: Request, res: Response) => {
  try {
    const { email, url, messageId } = req.query;

    if (!email || !url) {
      throw createError('Email and URL are required', 400);
    }

    const result = await emailService.trackEmailClick(email as string, url as string, messageId as string);

    // Redirect to original URL
    res.redirect(result.redirectUrl);
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to track click',
    });
  }
};

// Validate email
export const validateEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw createError('Email is required', 400);
    }

    const isValid = await emailService.validateEmail(email);

    res.json({
      success: true,
      data: { isValid },
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to validate email',
    });
  }
};

// Suppress email
export const suppressEmail = async (req: Request, res: Response) => {
  try {
    const { email, reason } = req.body;

    if (!email || !reason) {
      throw createError('Email and reason are required', 400);
    }

    const result = await emailService.suppressEmail(email, reason);

    res.json({
      success: true,
      message: 'Email suppressed successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to suppress email',
    });
  }
};

// Process email queue
export const processEmailQueue = async (req: Request, res: Response) => {
  try {
    const { batchSize } = req.body;

    const result = await emailService.processQueue(batchSize || 10);

    res.json({
      success: true,
      message: 'Email queue processed',
      data: result,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to process email queue',
    });
  }
};
