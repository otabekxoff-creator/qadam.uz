import nodemailer from 'nodemailer';
import logger from '@/config/logger';

const smtpHost = process.env.SMTP_HOST;
const smtpPort = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587;
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const smtpFrom = process.env.SMTP_FROM || 'no-reply@step.uz';

const hasSmtpConfig = smtpHost && smtpUser && smtpPass;

const transporter = hasSmtpConfig
  ? nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    })
  : null;

export async function sendEmail(to: string, subject: string, html: string) {
  if (!hasSmtpConfig || !transporter) {
    logger.warn(
      `SMTP configuration is missing. Email to ${to} with subject "${subject}" was not actually sent.`
    );
    logger.info(`EMAIL_FALLBACK_CONTENT: ${html}`);
    return;
  }

  await transporter.sendMail({
    from: smtpFrom,
    to,
    subject,
    html,
  });
}

export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

