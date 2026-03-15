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
        rejectUnauthorized: false // Render uchun TLS ni o'chirish
      },
      connectionTimeout: 10000, // 10 sekund
      greetingTimeout: 10000,
      socketTimeout: 10000,
    })
  : null;

export async function sendEmail(to: string, subject: string, html: string) {
  // Vaqtincha email yuborish o'chirilgan - faqat logda ko'rsatiladi
  logger.warn(
    `Email service temporarily disabled. Email to ${to} with subject "${subject}" was not actually sent.`
  );
  
  // Development vaqtida kodni ko'rish uchun logga chiqaramiz
  const codeMatch = html.match(/>(\d{6})</);
  if (codeMatch) {
    logger.info(`🔢 Verification code for ${to}: ${codeMatch[1]}`);
  }
  
  return { success: true, message: 'Code logged for testing' };
}

export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

