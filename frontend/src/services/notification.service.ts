/**
 * Notification Service
 * Handles notification-related API calls
 */

import { api } from './api';
import { Notification, ApiResponse } from '@/types';

export const notificationService = {
  // Get all notifications
  getNotifications: async (page: number = 1, limit: number = 20): Promise<ApiResponse<{ notifications: Notification[]; total: number; unreadCount: number }>> => {
    return api.get(`/notifications?page=${page}&limit=${limit}`);
  },

  // Get unread notifications count
  getUnreadCount: async (): Promise<ApiResponse<{ count: number }>> => {
    return api.get('/notifications/unread-count');
  },

  // Mark notification as read
  markAsRead: async (notificationId: string): Promise<ApiResponse<void>> => {
    return api.patch(`/notifications/${notificationId}/read`);
  },

  // Mark all notifications as read
  markAllAsRead: async (): Promise<ApiResponse<void>> => {
    return api.patch('/notifications/read-all');
  },

  // Delete notification
  deleteNotification: async (notificationId: string): Promise<ApiResponse<void>> => {
    return api.delete(`/notifications/${notificationId}`);
  },

  // Get notification preferences
  getPreferences: async (): Promise<ApiResponse<any>> => {
    return api.get('/notifications/preferences');
  },

  // Update notification preferences
  updatePreferences: async (preferences: any): Promise<ApiResponse<any>> => {
    return api.patch('/notifications/preferences', preferences);
  },

  // Subscribe to push notifications
  subscribePush: async (subscription: PushSubscription): Promise<ApiResponse<void>> => {
    return api.post('/notifications/subscribe', { subscription });
  },

  // Unsubscribe from push notifications
  unsubscribePush: async (): Promise<ApiResponse<void>> => {
    return api.post('/notifications/unsubscribe');
  },
};

export default notificationService;
