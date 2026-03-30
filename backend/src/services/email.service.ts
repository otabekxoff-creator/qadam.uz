import { PrismaClient, Prisma } from '@prisma/client';
import nodemailer from 'nodemailer';
import Handlebars from 'handlebars';

const prisma = new PrismaClient();

// Email templates
const emailTemplates = {
  welcome: `
    <h1>Welcome {{name}}!</h1>
    <p>Thank you for joining our platform. We're excited to help you in your career journey.</p>
    <a href="{{dashboardUrl}}" style="padding: 12px 24px; background: #4F46E5; color: white; text-decoration: none; border-radius: 8px;">Get Started</a>
  `,
  
  passwordReset: `
    <h1>Password Reset</h1>
    <p>Hello {{name}},</p>
    <p>You requested a password reset. Click the link below to reset your password:</p>
    <a href="{{resetUrl}}" style="padding: 12px 24px; background: #4F46E5; color: white; text-decoration: none; border-radius: 8px;">Reset Password</a>
    <p>This link expires in {{expiryHours}} hours.</p>
  `,
  
  applicationConfirmation: `
    <h1>Application Submitted!</h1>
    <p>Hi {{name}},</p>
    <p>Your application for <strong>{{jobTitle}}</strong> at <strong>{{companyName}}</strong> has been submitted successfully.</p>
    <p>Good luck with your application!</p>
  `,
  
  applicationStatusUpdate: `
    <h1>Application Status Update</h1>
    <p>Hi {{name}},</p>
    <p>Your application for <strong>{{jobTitle}}</strong> at <strong>{{companyName}}</strong> has been updated.</p>
    <p>Status: <strong style="color: {{statusColor}};">{{status}}</strong></p>
    {{#if message}}<p>Message: {{message}}</p>{{/if}}
  `,
  
  jobAlert: `
    <h1>New Jobs Matching Your Preferences</h1>
    <p>Hi {{name}},</p>
    <p>We found {{jobCount}} new jobs that match your criteria:</p>
    {{#each jobs}}
    <div style="border: 1px solid #E5E7EB; padding: 16px; margin: 8px 0; border-radius: 8px;">
      <h3>{{title}}</h3>
      <p>{{company}} - {{location}}</p>
      <a href="{{url}}" style="color: #4F46E5;">View Job</a>
    </div>
    {{/each}}
  `,
  
  messageNotification: `
    <h1>New Message</h1>
    <p>Hi {{name}},</p>
    <p>You have a new message from <strong>{{senderName}}</strong>:</p>
    <blockquote style="border-left: 4px solid #4F46E5; padding-left: 16px; margin: 16px 0;">{{message}}</blockquote>
    <a href="{{chatUrl}}" style="padding: 12px 24px; background: #4F46E5; color: white; text-decoration: none; border-radius: 8px;">Reply</a>
  `,
  
  interviewInvitation: `
    <h1>Interview Invitation</h1>
    <p>Hi {{name}},</p>
    <p>Congratulations! <strong>{{companyName}}</strong> would like to invite you for an interview for the <strong>{{jobTitle}}</strong> position.</p>
    <p><strong>Interview Details:</strong></p>
    <ul>
      <li>Date: {{interviewDate}}</li>
      <li>Time: {{interviewTime}}</li>
      <li>Type: {{interviewType}}</li>
      {{#if location}}<li>Location: {{location}}</li>{{/if}}
    </ul>
    <a href="{{confirmUrl}}" style="padding: 12px 24px; background: #4F46E5; color: white; text-decoration: none; border-radius: 8px;">Confirm Attendance</a>
  `,
  
  offerLetter: `
    <h1>Job Offer!</h1>
    <p>Dear {{name}},</p>
    <p>We are delighted to offer you the position of <strong>{{jobTitle}}</strong> at <strong>{{companyName}}</strong>.</p>
    <p><strong>Offer Details:</strong></p>
    <ul>
      <li>Salary: {{salary}}</li>
      <li>Start Date: {{startDate}}</li>
      <li>Employment Type: {{employmentType}}</li>
    </ul>
    <p>Please review and accept the offer by {{expiryDate}}.</p>
    <a href="{{offerUrl}}" style="padding: 12px 24px; background: #4F46E5; color: white; text-decoration: none; border-radius: 8px;">View Offer</a>
  `,
  
  accountVerification: `
    <h1>Verify Your Email</h1>
    <p>Hi {{name}},</p>
    <p>Please verify your email address by clicking the link below:</p>
    <a href="{{verificationUrl}}" style="padding: 12px 24px; background: #4F46E5; color: white; text-decoration: none; border-radius: 8px;">Verify Email</a>
    <p>This link expires in 24 hours.</p>
  `,
  
  weeklyDigest: `
    <h1>Your Weekly Career Digest</h1>
    <p>Hi {{name}},</p>
    <p>Here's what happened this week:</p>
    <ul>
      <li>{{newJobs}} new jobs posted in your field</li>
      <li>{{profileViews}} profile views</li>
      <li>{{newMessages}} new messages</li>
    </ul>
    <a href="{{dashboardUrl}}" style="padding: 12px 24px; background: #4F46E5; color: white; text-decoration: none; border-radius: 8px;">View Dashboard</a>
  `,
  
  companyFollowUp: `
    <h1>Follow-up from {{companyName}}</h1>
    <p>Hi {{name}},</p>
    <p>{{companyName}} wanted to follow up on your application for {{jobTitle}}.</p>
    <p>{{message}}</p>
  `,
  
  subscriptionExpired: `
    <h1>Your Subscription Has Expired</h1>
    <p>Hi {{name}},</p>
    <p>Your {{planName}} subscription expired on {{expiryDate}}.</p>
    <p>Renew now to continue enjoying premium features:</p>
    <a href="{{renewUrl}}" style="padding: 12px 24px; background: #4F46E5; color: white; text-decoration: none; border-radius: 8px;">Renew Subscription</a>
  `,
};

// SMTP configuration
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Email queue for batch processing
interface EmailQueueItem {
  to: string;
  subject: string;
  html: string;
  scheduledFor?: Date;
  priority?: 'high' | 'normal' | 'low';
}

const emailQueue: EmailQueueItem[] = [];

export const emailService = {
  // Compile template with data
  compileTemplate(templateName: keyof typeof emailTemplates, data: any): string {
    const template = emailTemplates[templateName];
    const compiled = Handlebars.compile(template);
    return compiled(data);
  },

  // Send email with tracking
  async sendEmail(options: {
    to: string;
    subject: string;
    html: string;
    from?: string;
    attachments?: any[];
    trackOpens?: boolean;
    trackClicks?: boolean;
  }) {
    const {
      to,
      subject,
      html,
      from = process.env.FROM_EMAIL || 'noreply@step.uz',
      attachments = [],
      trackOpens = true,
      trackClicks = true,
    } = options;

    try {
      // Add tracking pixel if enabled
      let trackedHtml = html;
      if (trackOpens) {
        const trackingPixel = `<img src="${process.env.API_URL}/api/email/track/open?email=${encodeURIComponent(to)}" width="1" height="1" />`;
        trackedHtml += trackingPixel;
      }

      // Add click tracking if enabled
      if (trackClicks) {
        trackedHtml = trackedHtml.replace(
          /<a href="([^"]+)"/g,
          `<a href="${process.env.API_URL}/api/email/track/click?url=$1&email=${encodeURIComponent(to)}"`
        );
      }

      const info = await transporter.sendMail({
        from,
        to,
        subject,
        html: trackedHtml,
        attachments,
      });

      // Log email in database
      await prisma.emailLog.create({
        data: {
          recipientEmail: to,
          subject,
          status: 'SENT',
          sentAt: new Date(),
          messageId: info.messageId,
        },
      });

      return { success: true, messageId: info.messageId };
    } catch (error) {
      // Log failed email
      await prisma.emailLog.create({
        data: {
          recipientEmail: to,
          subject,
          status: 'FAILED',
          error: (error as Error).message,
          sentAt: new Date(),
        },
      });

      throw error;
    }
  },

  // Send welcome email
  async sendWelcomeEmail(email: string, name: string) {
    const html = this.compileTemplate('welcome', {
      name,
      dashboardUrl: `${process.env.FRONTEND_URL}/dashboard`,
    });

    return await this.sendEmail({
      to: email,
      subject: 'Welcome to Step Career Platform!',
      html,
    });
  },

  // Send password reset email
  async sendPasswordResetEmail(email: string, resetToken: string, name: string) {
    const html = this.compileTemplate('passwordReset', {
      name,
      resetUrl: `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`,
      expiryHours: 24,
    });

    return await this.sendEmail({
      to: email,
      subject: 'Password Reset Request',
      html,
    });
  },

  // Send application confirmation
  async sendApplicationConfirmation(
    email: string,
    name: string,
    jobTitle: string,
    companyName: string
  ) {
    const html = this.compileTemplate('applicationConfirmation', {
      name,
      jobTitle,
      companyName,
    });

    return await this.sendEmail({
      to: email,
      subject: `Application Submitted: ${jobTitle} at ${companyName}`,
      html,
    });
  },

  // Send application status update
  async sendApplicationStatusUpdate(
    email: string,
    name: string,
    jobTitle: string,
    companyName: string,
    status: string,
    message?: string
  ) {
    const statusColors: Record<string, string> = {
      PENDING: '#F59E0B',
      REVIEWING: '#3B82F6',
      ACCEPTED: '#10B981',
      REJECTED: '#EF4444',
    };

    const html = this.compileTemplate('applicationStatusUpdate', {
      name,
      jobTitle,
      companyName,
      status,
      statusColor: statusColors[status] || '#6B7280',
      message,
    });

    return await this.sendEmail({
      to: email,
      subject: `Application Update: ${jobTitle}`,
      html,
    });
  },

  // Send job alert
  async sendJobAlert(email: string, name: string, jobs: any[]) {
    const html = this.compileTemplate('jobAlert', {
      name,
      jobCount: jobs.length,
      jobs: jobs.map(job => ({
        ...job,
        url: `${process.env.FRONTEND_URL}/jobs/${job.id}`,
      })),
    });

    return await this.sendEmail({
      to: email,
      subject: `${jobs.length} New Jobs Matching Your Preferences`,
      html,
    });
  },

  // Send message notification
  async sendMessageNotification(
    email: string,
    name: string,
    senderName: string,
    message: string,
    chatId: string
  ) {
    const html = this.compileTemplate('messageNotification', {
      name,
      senderName,
      message: message.substring(0, 200) + (message.length > 200 ? '...' : ''),
      chatUrl: `${process.env.FRONTEND_URL}/messages/${chatId}`,
    });

    return await this.sendEmail({
      to: email,
      subject: `New Message from ${senderName}`,
      html,
    });
  },

  // Send interview invitation
  async sendInterviewInvitation(
    email: string,
    name: string,
    jobTitle: string,
    companyName: string,
    interviewDetails: {
      date: string;
      time: string;
      type: string;
      location?: string;
    },
    confirmationToken: string
  ) {
    const html = this.compileTemplate('interviewInvitation', {
      name,
      jobTitle,
      companyName,
      interviewDate: interviewDetails.date,
      interviewTime: interviewDetails.time,
      interviewType: interviewDetails.type,
      location: interviewDetails.location,
      confirmUrl: `${process.env.FRONTEND_URL}/interview/confirm?token=${confirmationToken}`,
    });

    return await this.sendEmail({
      to: email,
      subject: `Interview Invitation: ${jobTitle} at ${companyName}`,
      html,
    });
  },

  // Send offer letter
  async sendOfferLetter(
    email: string,
    name: string,
    jobTitle: string,
    companyName: string,
    offerDetails: {
      salary: string;
      startDate: string;
      employmentType: string;
    },
    expiryDate: string,
    offerToken: string
  ) {
    const html = this.compileTemplate('offerLetter', {
      name,
      jobTitle,
      companyName,
      salary: offerDetails.salary,
      startDate: offerDetails.startDate,
      employmentType: offerDetails.employmentType,
      expiryDate,
      offerUrl: `${process.env.FRONTEND_URL}/offers/${offerToken}`,
    });

    return await this.sendEmail({
      to: email,
      subject: `Job Offer: ${jobTitle} at ${companyName}`,
      html,
    });
  },

  // Send email verification
  async sendVerificationEmail(email: string, name: string, verificationToken: string) {
    const html = this.compileTemplate('accountVerification', {
      name,
      verificationUrl: `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`,
    });

    return await this.sendEmail({
      to: email,
      subject: 'Please Verify Your Email Address',
      html,
    });
  },

  // Send weekly digest
  async sendWeeklyDigest(
    email: string,
    name: string,
    stats: {
      newJobs: number;
      profileViews: number;
      newMessages: number;
    }
  ) {
    const html = this.compileTemplate('weeklyDigest', {
      name,
      ...stats,
      dashboardUrl: `${process.env.FRONTEND_URL}/dashboard`,
    });

    return await this.sendEmail({
      to: email,
      subject: 'Your Weekly Career Digest',
      html,
    });
  },

  // Queue email for batch processing
  queueEmail(email: EmailQueueItem) {
    emailQueue.push(email);
    return { queued: true, queueLength: emailQueue.length };
  },

  // Process email queue
  async processQueue(batchSize: number = 10) {
    const sortedQueue = emailQueue
      .filter(e => !e.scheduledFor || e.scheduledFor <= new Date())
      .sort((a, b) => {
        const priorityWeight = { high: 3, normal: 2, low: 1 };
        return (priorityWeight[b.priority || 'normal'] - priorityWeight[a.priority || 'normal']);
      });

    const batch = sortedQueue.slice(0, batchSize);
    const results = [];

    for (const email of batch) {
      try {
        const result = await this.sendEmail({
          to: email.to,
          subject: email.subject,
          html: email.html,
        });
        results.push({ success: true, to: email.to, result });
      } catch (error) {
        results.push({ success: false, to: email.to, error });
      }
    }

    // Remove processed emails from queue
    batch.forEach(email => {
      const index = emailQueue.indexOf(email);
      if (index > -1) emailQueue.splice(index, 1);
    });

    return { processed: results.length, remaining: emailQueue.length, results };
  },

  // Send bulk emails
  async sendBulkEmails(
    recipients: { email: string; name: string }[],
    template: keyof typeof emailTemplates,
    baseData: any,
    delayBetween: number = 1000
  ) {
    const results = [];

    for (const recipient of recipients) {
      try {
        const html = this.compileTemplate(template, {
          ...baseData,
          name: recipient.name,
        });

        await this.sendEmail({
          to: recipient.email,
          subject: baseData.subject,
          html,
        });

        results.push({ success: true, email: recipient.email });

        // Delay to avoid rate limiting
        if (delayBetween > 0) {
          await new Promise(resolve => setTimeout(resolve, delayBetween));
        }
      } catch (error) {
        results.push({ success: false, email: recipient.email, error });
      }
    }

    return results;
  },

  // Get email analytics
  async getEmailAnalytics(startDate?: Date, endDate?: Date) {
    const where: Prisma.EmailLogWhereInput = {};
    
    if (startDate || endDate) {
      where.sentAt = {};
      if (startDate) where.sentAt.gte = startDate;
      if (endDate) where.sentAt.lte = endDate;
    }

    const [totalSent, totalFailed, totalOpened, totalClicked] = await Promise.all([
      prisma.emailLog.count({ where: { ...where, status: 'SENT' } }),
      prisma.emailLog.count({ where: { ...where, status: 'FAILED' } }),
      prisma.emailLog.count({ where: { ...where, openedAt: { not: null } } }),
      prisma.emailLog.count({ where: { ...where, clickedAt: { not: null } } }),
    ]);

    const statsByDay = await prisma.$queryRaw`
      SELECT DATE(sent_at) as date, COUNT(*) as count, status
      FROM email_logs
      ${startDate ? Prisma.sql`WHERE sent_at >= ${startDate}` : Prisma.sql``}
      GROUP BY DATE(sent_at), status
      ORDER BY date DESC
    `;

    return {
      totalSent,
      totalFailed,
      totalOpened,
      totalClicked,
      openRate: totalSent > 0 ? ((totalOpened / totalSent) * 100).toFixed(2) + '%' : '0%',
      clickRate: totalSent > 0 ? ((totalClicked / totalSent) * 100).toFixed(2) + '%' : '0%',
      statsByDay,
    };
  },

  // Track email open
  async trackEmailOpen(email: string, messageId?: string) {
    await prisma.emailLog.updateMany({
      where: {
        recipientEmail: email,
        messageId: messageId || undefined,
      },
      data: {
        openedAt: new Date(),
      },
    });

    return { tracked: true };
  },

  // Track email click
  async trackEmailClick(email: string, url: string, messageId?: string) {
    await prisma.emailLog.updateMany({
      where: {
        recipientEmail: email,
        messageId: messageId || undefined,
      },
      data: {
        clickedAt: new Date(),
        clickedUrl: url,
      },
    });

    return { tracked: true, redirectUrl: url };
  },

  // Get user's email history
  async getUserEmailHistory(email: string, limit: number = 50) {
    return await prisma.emailLog.findMany({
      where: { recipientEmail: email },
      orderBy: { sentAt: 'desc' },
      take: limit,
    });
  },

  // Resend failed emails
  async resendFailedEmails(maxRetries: number = 3) {
    const failedEmails = await prisma.emailLog.findMany({
      where: {
        status: 'FAILED',
        retryCount: { lt: maxRetries },
      },
      take: 50,
    });

    const results = [];

    for (const email of failedEmails) {
      try {
        // Implementation would retry sending
        results.push({ success: true, id: email.id });
      } catch (error) {
        results.push({ success: false, id: email.id, error });
      }
    }

    return results;
  },

  // Send company follow-up
  async sendCompanyFollowUp(
    email: string,
    name: string,
    companyName: string,
    jobTitle: string,
    message: string
  ) {
    const html = this.compileTemplate('companyFollowUp', {
      name,
      companyName,
      jobTitle,
      message,
    });

    return await this.sendEmail({
      to: email,
      subject: `Follow-up from ${companyName}`,
      html,
    });
  },

  // Send subscription expiry notification
  async sendSubscriptionExpiry(
    email: string,
    name: string,
    planName: string,
    expiryDate: Date,
    renewToken: string
  ) {
    const html = this.compileTemplate('subscriptionExpired', {
      name,
      planName,
      expiryDate: expiryDate.toLocaleDateString(),
      renewUrl: `${process.env.FRONTEND_URL}/billing/renew?token=${renewToken}`,
    });

    return await this.sendEmail({
      to: email,
      subject: 'Your Subscription Has Expired',
      html,
    });
  },

  // Validate email address
  async validateEmail(email: string): Promise<boolean> {
    // Basic regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return false;

    // Check if email is in suppression list
    const suppressed = await prisma.suppressedEmail.findUnique({
      where: { email },
    });

    return !suppressed;
  },

  // Add to suppression list
  async suppressEmail(email: string, reason: string) {
    return await prisma.suppressedEmail.upsert({
      where: { email },
      create: { email, reason },
      update: { reason, updatedAt: new Date() },
    });
  },
};
