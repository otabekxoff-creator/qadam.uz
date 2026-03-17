import { PrismaClient } from '@prisma/client';
import logger from './logger';
import queueService from './queue.service';

const prisma = new PrismaClient();

/**
 * Webhook Service - Event-driven integrations
 */
export class WebhookService {
  /**
   * Register a new webhook
   */
  async registerWebhook(
    userId: string,
    url: string,
    events: string[],
    secret?: string,
    options?: {
      retryCount?: number;
      timeout?: number;
      headers?: Record<string, string>;
    }
  ): Promise<string> {
    const webhook = await prisma.webhook.create({
      data: {
        userId,
        url,
        events: JSON.stringify(events),
        secret,
        retryCount: options?.retryCount || 3,
        timeout: options?.timeout || 30000,
        headers: options?.headers ? JSON.stringify(options.headers) : null,
        isActive: true,
        createdAt: new Date(),
      },
    });

    logger.info(`Webhook registered: ${webhook.id} for user ${userId}`);
    return webhook.id;
  }

  /**
   * Dispatch webhook event
   */
  async dispatchEvent(event: string, payload: any): Promise<void> {
    // Find all webhooks subscribed to this event
    const webhooks = await prisma.webhook.findMany({
      where: {
        isActive: true,
      },
    });

    // Filter webhooks that subscribe to this event
    const subscribedWebhooks = webhooks.filter((w) => {
      const events = JSON.parse(w.events);
      return events.includes(event) || events.includes('*');
    });

    // Queue webhook dispatches
    for (const webhook of subscribedWebhooks) {
      await queueService.addJob('webhooks', {
        webhookId: webhook.id,
        event,
        payload,
        timestamp: new Date().toISOString(),
      });
    }
  }

  /**
   * Deliver webhook
   */
  async deliverWebhook(
    webhookId: string,
    event: string,
    payload: any
  ): Promise<boolean> {
    const webhook = await prisma.webhook.findUnique({
      where: { id: webhookId },
    });

    if (!webhook || !webhook.isActive) {
      return false;
    }

    try {
      // Create delivery record
      const delivery = await prisma.webhookDelivery.create({
        data: {
          webhookId,
          event,
          payload: JSON.stringify(payload),
          status: 'PENDING',
          createdAt: new Date(),
        },
      });

      // Sign payload if secret exists
      const signature = webhook.secret
        ? this.signPayload(payload, webhook.secret)
        : undefined;

      // Prepare headers
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'X-Webhook-Event': event,
        'X-Webhook-ID': webhookId,
        'X-Delivery-ID': delivery.id,
        ...JSON.parse(webhook.headers || '{}'),
      };

      if (signature) {
        headers['X-Webhook-Signature'] = signature;
      }

      // Send request
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), webhook.timeout);

      const response = await fetch(webhook.url, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          event,
          data: payload,
          timestamp: new Date().toISOString(),
        }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      // Update delivery record
      await prisma.webhookDelivery.update({
        where: { id: delivery.id },
        data: {
          status: response.ok ? 'SUCCESS' : 'FAILED',
          httpStatus: response.status,
          responseBody: await response.text(),
          deliveredAt: new Date(),
        },
      });

      return response.ok;
    } catch (error) {
      logger.error(`Webhook delivery failed: ${webhookId}`, error);
      
      // Retry logic
      await this.scheduleRetry(webhookId, event, payload);
      
      return false;
    }
  }

  /**
   * Schedule retry
   */
  private async scheduleRetry(
    webhookId: string,
    event: string,
    payload: any,
    attempt: number = 1
  ): Promise<void> {
    const webhook = await prisma.webhook.findUnique({
      where: { id: webhookId },
    });

    if (!webhook || attempt >= webhook.retryCount) {
      return;
    }

    // Exponential backoff
    const delay = Math.pow(2, attempt) * 1000;

    await queueService.addJob(
      'webhooks',
      { webhookId, event, payload, attempt },
      { delay }
    );
  }

  /**
   * Sign payload with HMAC
   */
  private signPayload(payload: any, secret: string): string {
    // Implementation would use crypto.createHmac
    return 'signature';
  }

  /**
   * Get webhook delivery history
   */
  async getDeliveryHistory(
    webhookId: string,
    options?: {
      limit?: number;
      offset?: number;
    }
  ): Promise<Array<{
    id: string;
    event: string;
    status: string;
    httpStatus: number | null;
    deliveredAt: Date | null;
    createdAt: Date;
  }>> {
    return await prisma.webhookDelivery.findMany({
      where: { webhookId },
      orderBy: { createdAt: 'desc' },
      take: options?.limit || 50,
      skip: options?.offset || 0,
      select: {
        id: true,
        event: true,
        status: true,
        httpStatus: true,
        deliveredAt: true,
        createdAt: true,
      },
    });
  }

  /**
   * Deactivate webhook
   */
  async deactivateWebhook(webhookId: string): Promise<void> {
    await prisma.webhook.update({
      where: { id: webhookId },
      data: { isActive: false },
    });
  }

  /**
   * Test webhook
   */
  async testWebhook(webhookId: string): Promise<boolean> {
    return await this.deliverWebhook(webhookId, 'test', {
      message: 'This is a test event',
      timestamp: new Date().toISOString(),
    });
  }
}

export default new WebhookService();
