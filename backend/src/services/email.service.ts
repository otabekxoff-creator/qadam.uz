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
      tls: {
        rejectUnauthorized: process.env.NODE_ENV === 'production' // Production'da TLS majburiy
      },
      connectionTimeout: 15000, // 15 sekund
      greetingTimeout: 15000,
      socketTimeout: 15000,
    })
  : null;

export async function sendEmail(to: string, subject: string, html: string) {
  if (!hasSmtpConfig || !transporter) {
    logger.warn(
      `SMTP configuration is missing. Email to ${to} with subject "${subject}" was not actually sent.`
    );
    // Development vaqtida kodni ko'rish uchun logga chiqaramiz
    const codeMatch = html.match(/>(\d{6})</);
    if (codeMatch) {
      logger.info(`🔢 Verification code for ${to}: ${codeMatch[1]}`);
    }
    return;
  }

  try {
    await transporter.sendMail({
      from: smtpFrom,
      to,
      subject,
      html,
    });
    logger.info(`✅ Email sent via SMTP to ${to}`);
  } catch (error) {
    logger.error(`SMTP failed: ${error}`);
    
    // Fallback: logda kod ko'rsatish
    const codeMatch = html.match(/>(\d{6})</);
    if (codeMatch) {
      logger.info(`🔢 Verification code for ${to}: ${codeMatch[1]}`);
    }
  }
}

export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

