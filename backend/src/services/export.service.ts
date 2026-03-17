import { createObjectCsvWriter } from 'csv-writer';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import logger from './logger';
import queueService from './queue.service';
import storageService from './storage.service';

const prisma = new PrismaClient();

/**
 * Export Service - Generate CSV, PDF, Excel exports
 */
export class ExportService {
  private tempDir: string;

  constructor() {
    this.tempDir = path.join(process.cwd(), 'temp', 'exports');
    if (!fs.existsSync(this.tempDir)) {
      fs.mkdirSync(this.tempDir, { recursive: true });
    }
  }

  /**
   * Export data to CSV
   */
  async exportToCSV(
    entityType: string,
    filters: Record<string, any>,
    columns: Array<{ key: string; header: string }>,
    userId: string
  ): Promise<string> {
    const timestamp = Date.now();
    const filename = `${entityType}_export_${timestamp}.csv`;
    const filepath = path.join(this.tempDir, filename);

    // Fetch data
    const data = await this.fetchData(entityType, filters);

    // Create CSV writer
    const csvWriter = createObjectCsvWriter({
      path: filepath,
      header: columns,
    });

    // Transform data
    const records = data.map((item: any) => {
      const record: Record<string, any> = {};
      columns.forEach((col) => {
        record[col.key] = this.getNestedValue(item, col.key);
      });
      return record;
    });

    // Write CSV
    await csvWriter.writeRecords(records);

    // Upload to storage
    const buffer = fs.readFileSync(filepath);
    const key = storageService.generateKey(userId, filename, 'exports');
    const result = await storageService.uploadFile(key, buffer, 'text/csv');

    // Cleanup temp file
    fs.unlinkSync(filepath);

    logger.info(`CSV export generated: ${result.url}`);
    return result.url;
  }

  /**
   * Export data to PDF
   */
  async exportToPDF(
    entityType: string,
    entityId: string,
    template: string,
    userId: string
  ): Promise<string> {
    const timestamp = Date.now();
    const filename = `${entityType}_${entityId}_${timestamp}.pdf`;
    const filepath = path.join(this.tempDir, filename);

    // Fetch data
    const data = await this.fetchSingleEntity(entityType, entityId);

    // Create PDF
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(filepath);
    doc.pipe(stream);

    // Add content based on template
    this.applyTemplate(doc, template, data);

    doc.end();

    // Wait for stream to finish
    await new Promise((resolve, reject) => {
      stream.on('finish', resolve);
      stream.on('error', reject);
    });

    // Upload to storage
    const buffer = fs.readFileSync(filepath);
    const key = storageService.generateKey(userId, filename, 'exports');
    const result = await storageService.uploadFile(key, buffer, 'application/pdf');

    // Cleanup
    fs.unlinkSync(filepath);

    logger.info(`PDF export generated: ${result.url}`);
    return result.url;
  }

  /**
   * Queue export job
   */
  async queueExport(
    userId: string,
    entityType: string,
    format: 'csv' | 'pdf' | 'excel',
    filters: Record<string, any>
  ): Promise<string> {
    const job = await queueService.addJob('exports', {
      userId,
      entityType,
      format,
      filters,
    });

    logger.info(`Export job queued: ${job.id}`);
    return job.id as string;
  }

  /**
   * Fetch data based on entity type
   */
  private async fetchData(
    entityType: string,
    filters: Record<string, any>
  ): Promise<any[]> {
    switch (entityType) {
      case 'jobs':
        return await prisma.job.findMany({
          where: filters,
          include: { company: true },
        });
      case 'applications':
        return await prisma.application.findMany({
          where: filters,
          include: { job: true, student: true },
        });
      case 'students':
        return await prisma.student.findMany({
          where: filters,
        });
      case 'companies':
        return await prisma.company.findMany({
          where: filters,
        });
      case 'startups':
        return await prisma.startup.findMany({
          where: filters,
          include: { student: true },
        });
      default:
        throw new Error(`Unknown entity type: ${entityType}`);
    }
  }

  /**
   * Fetch single entity
   */
  private async fetchSingleEntity(
    entityType: string,
    entityId: string
  ): Promise<any> {
    switch (entityType) {
      case 'job':
        return await prisma.job.findUnique({
          where: { id: entityId },
          include: { company: true },
        });
      case 'application':
        return await prisma.application.findUnique({
          where: { id: entityId },
          include: { job: true, student: true },
        });
      case 'student':
        return await prisma.student.findUnique({
          where: { id: entityId },
        });
      case 'company':
        return await prisma.company.findUnique({
          where: { id: entityId },
        });
      case 'startup':
        return await prisma.startup.findUnique({
          where: { id: entityId },
          include: { student: true },
        });
      default:
        throw new Error(`Unknown entity type: ${entityType}`);
    }
  }

  /**
   * Get nested value from object
   */
  private getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }

  /**
   * Apply PDF template
   */
  private applyTemplate(doc: PDFKit.PDFDocument, template: string, data: any): void {
    // Header
    doc.fontSize(25).text('Step.uz', 50, 50);
    doc.fontSize(12).text(`Export Date: ${new Date().toLocaleString()}`, 50, 80);
    doc.moveDown();

    // Content based on template
    switch (template) {
      case 'resume':
        this.renderResumeTemplate(doc, data);
        break;
      case 'job':
        this.renderJobTemplate(doc, data);
        break;
      case 'company':
        this.renderCompanyTemplate(doc, data);
        break;
      case 'startup':
        this.renderStartupTemplate(doc, data);
        break;
      default:
        this.renderGenericTemplate(doc, data);
    }

    // Footer
    doc.fontSize(10).text(
      'Generated by Step.uz',
      50,
      doc.page.height - 50,
      { align: 'center' }
    );
  }

  /**
   * Resume template
   */
  private renderResumeTemplate(doc: PDFKit.PDFDocument, student: any): void {
    doc.fontSize(20).text(`${student.firstName} ${student.lastName}`, 50, 120);
    doc.fontSize(12).text(`Email: ${student.email || 'N/A'}`, 50, 150);
    doc.text(`Phone: ${student.phone || 'N/A'}`, 50, 170);
    doc.text(`University: ${student.university || 'N/A'}`, 50, 190);
    doc.text(`Major: ${student.major || 'N/A'}`, 50, 210);

    if (student.skills?.length > 0) {
      doc.moveDown();
      doc.fontSize(16).text('Skills', 50, 250);
      doc.fontSize(12).text(student.skills.join(', '), 50, 270);
    }

    if (student.experience?.length > 0) {
      doc.moveDown();
      doc.fontSize(16).text('Experience', 50, 310);
      student.experience.forEach((exp: any, index: number) => {
        const y = 340 + index * 60;
        doc.fontSize(12).text(`${exp.position} at ${exp.company}`, 50, y);
        doc.fontSize(10).text(
          `${exp.startDate} - ${exp.endDate || 'Present'}`,
          50,
          y + 15
        );
        if (exp.description) {
          doc.text(exp.description, 50, y + 30, { width: 500 });
        }
      });
    }
  }

  /**
   * Job template
   */
  private renderJobTemplate(doc: PDFKit.PDFDocument, job: any): void {
    doc.fontSize(20).text(job.title, 50, 120);
    doc.fontSize(14).text(job.company?.name || 'Unknown Company', 50, 150);
    doc.fontSize(12).text(`Location: ${job.location || 'Remote'}`, 50, 180);
    doc.text(`Type: ${job.jobType}`, 50, 200);
    doc.text(
      `Salary: ${job.salaryMin && job.salaryMax
        ? `$${job.salaryMin} - $${job.salaryMax}`
        : 'Negotiable'}`,
      50,
      220
    );

    doc.moveDown();
    doc.fontSize(16).text('Description', 50, 260);
    doc.fontSize(12).text(job.description, 50, 290, { width: 500 });

    if (job.requirements?.length > 0) {
      doc.moveDown();
      doc.fontSize(16).text('Requirements', 50, 400);
      job.requirements.forEach((req: string, index: number) => {
        doc.fontSize(12).text(`• ${req}`, 50, 430 + index * 20);
      });
    }
  }

  /**
   * Company template
   */
  private renderCompanyTemplate(doc: PDFKit.PDFDocument, company: any): void {
    doc.fontSize(20).text(company.name, 50, 120);
    doc.fontSize(12).text(`Industry: ${company.industry || 'N/A'}`, 50, 160);
    doc.text(`Size: ${company.companySize || 'N/A'}`, 50, 180);
    doc.text(`Location: ${company.location || 'N/A'}`, 50, 200);
    doc.text(`Website: ${company.website || 'N/A'}`, 50, 220);

    if (company.description) {
      doc.moveDown();
      doc.fontSize(16).text('About', 50, 260);
      doc.fontSize(12).text(company.description, 50, 290, { width: 500 });
    }
  }

  /**
   * Startup template
   */
  private renderStartupTemplate(doc: PDFKit.PDFDocument, startup: any): void {
    doc.fontSize(20).text(startup.name, 50, 120);
    doc.fontSize(14).text(`Stage: ${startup.stage}`, 50, 160);
    doc.fontSize(12).text(`Industry: ${startup.industry || 'N/A'}`, 50, 190);
    doc.text(`Funding Needed: $${startup.fundingNeeded || 0}`, 50, 210);
    doc.text(`Funding Raised: $${startup.fundingRaised || 0}`, 50, 230);

    if (startup.description) {
      doc.moveDown();
      doc.fontSize(16).text('Description', 50, 270);
      doc.fontSize(12).text(startup.description, 50, 300, { width: 500 });
    }

    if (startup.problem) {
      doc.moveDown();
      doc.fontSize(16).text('Problem', 50, 400);
      doc.fontSize(12).text(startup.problem, 50, 430, { width: 500 });
    }

    if (startup.solution) {
      doc.moveDown();
      doc.fontSize(16).text('Solution', 50, 500);
      doc.fontSize(12).text(startup.solution, 50, 530, { width: 500 });
    }
  }

  /**
   * Generic template
   */
  private renderGenericTemplate(doc: PDFKit.PDFDocument, data: any): void {
    doc.fontSize(16).text('Data Export', 50, 120);
    doc.fontSize(12);
    let y = 160;
    for (const [key, value] of Object.entries(data)) {
      if (typeof value !== 'object' && value !== null) {
        doc.text(`${key}: ${value}`, 50, y);
        y += 20;
      }
    }
  }

  /**
   * Cleanup old exports
   */
  async cleanupOldExports(days: number = 7): Promise<number> {
    const files = fs.readdirSync(this.tempDir);
    const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;

    let deleted = 0;
    for (const file of files) {
      const filepath = path.join(this.tempDir, file);
      const stats = fs.statSync(filepath);
      if (stats.mtimeMs < cutoff) {
        fs.unlinkSync(filepath);
        deleted++;
      }
    }

    logger.info(`Cleaned up ${deleted} old export files`);
    return deleted;
  }
}

export default new ExportService();
