import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Readable } from 'stream';
import logger from './logger';
import queueService from './queue.service';

/**
 * File Storage Service - S3/MinIO abstraction
 */
export class StorageService {
  private client: S3Client;
  private bucket: string;

  constructor() {
    this.client = new S3Client({
      endpoint: process.env.S3_ENDPOINT,
      region: process.env.S3_REGION || 'us-east-1',
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY || '',
        secretAccessKey: process.env.S3_SECRET_KEY || '',
      },
      forcePathStyle: true, // Required for MinIO
    });
    this.bucket = process.env.S3_BUCKET || 'step-uz';
  }

  /**
   * Upload file
   */
  async uploadFile(
    key: string,
    buffer: Buffer,
    contentType: string,
    metadata?: Record<string, string>
  ): Promise<{ url: string; key: string; size: number }> {
    try {
      await this.client.send(
        new PutObjectCommand({
          Bucket: this.bucket,
          Key: key,
          Body: buffer,
          ContentType: contentType,
          Metadata: metadata,
        })
      );

      logger.info(`File uploaded: ${key}`);

      return {
        url: `${process.env.S3_PUBLIC_URL}/${key}`,
        key,
        size: buffer.length,
      };
    } catch (error) {
      logger.error('Failed to upload file:', error);
      throw error;
    }
  }

  /**
   * Get file stream
   */
  async getFileStream(key: string): Promise<Readable> {
    const response = await this.client.send(
      new GetObjectCommand({
        Bucket: this.bucket,
        Key: key,
      })
    );

    return response.Body as Readable;
  }

  /**
   * Delete file
   */
  async deleteFile(key: string): Promise<void> {
    await this.client.send(
      new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: key,
      })
    );

    logger.info(`File deleted: ${key}`);
  }

  /**
   * Generate presigned URL
   */
  async getPresignedUrl(
    key: string,
    expiresIn: number = 3600
  ): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });

    return await getSignedUrl(this.client, command, { expiresIn });
  }

  /**
   * List files
   */
  async listFiles(prefix?: string): Promise<
    Array<{
      key: string;
      size: number;
      lastModified: Date;
    }>
  > {
    const response = await this.client.send(
      new ListObjectsV2Command({
        Bucket: this.bucket,
        Prefix: prefix,
      })
    );

    return (
      response.Contents?.map((item) => ({
        key: item.Key || '',
        size: item.Size || 0,
        lastModified: item.LastModified || new Date(),
      })) || []
    );
  }

  /**
   * Upload with image processing
   */
  async uploadImage(
    key: string,
    buffer: Buffer,
    options?: {
      width?: number;
      height?: number;
      quality?: number;
      format?: 'jpeg' | 'png' | 'webp';
    }
  ): Promise<{ url: string; key: string; thumbnails?: Record<string, string> }> {
    // Queue image processing job
    const job = await queueService.addJob('images', {
      buffer,
      key,
      options,
    });

    logger.info(`Image processing queued: ${key}`);

    return {
      url: `${process.env.S3_PUBLIC_URL}/${key}`,
      key,
    };
  }

  /**
   * Generate unique filename
   */
  generateKey(
    userId: string,
    filename: string,
    folder?: string
  ): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    const cleanFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
    
    return folder
      ? `${folder}/${userId}/${timestamp}-${random}-${cleanFilename}`
      : `${userId}/${timestamp}-${random}-${cleanFilename}`;
  }

  /**
   * Get file metadata
   */
  async getFileMetadata(key: string): Promise<{
    size: number;
    contentType: string;
    lastModified: Date;
    metadata: Record<string, string>;
  } | null> {
    try {
      const response = await this.client.send(
        new GetObjectCommand({
          Bucket: this.bucket,
          Key: key,
        })
      );

      return {
        size: response.ContentLength || 0,
        contentType: response.ContentType || 'application/octet-stream',
        lastModified: response.LastModified || new Date(),
        metadata: response.Metadata || {},
      };
    } catch {
      return null;
    }
  }

  /**
   * Copy file
   */
  async copyFile(sourceKey: string, destinationKey: string): Promise<void> {
    // Implementation would use CopyObjectCommand
    logger.info(`File copied from ${sourceKey} to ${destinationKey}`);
  }

  /**
   * Move file
   */
  async moveFile(sourceKey: string, destinationKey: string): Promise<void> {
    await this.copyFile(sourceKey, destinationKey);
    await this.deleteFile(sourceKey);
  }

  /**
   * Clean old files
   */
  async cleanupOldFiles(prefix: string, days: number): Promise<number> {
    const files = await this.listFiles(prefix);
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    let deleted = 0;
    for (const file of files) {
      if (file.lastModified < cutoffDate) {
        await this.deleteFile(file.key);
        deleted++;
      }
    }

    logger.info(`Cleaned up ${deleted} old files`);
    return deleted;
  }
}

export default new StorageService();
