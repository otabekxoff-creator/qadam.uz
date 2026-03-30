/**
 * Chat Service
 * Handles chat and messaging API calls
 */

import { api } from './api';
import { Chat, Message, ApiResponse } from '@/types';

export const chatService = {
  // Get all chats for current user
  getChats: async (): Promise<ApiResponse<Chat[]>> => {
    return api.get('/chats');
  },

  // Get chat by ID
  getChatById: async (chatId: string): Promise<ApiResponse<Chat>> => {
    return api.get(`/chats/${chatId}`);
  },

  // Create new chat
  createChat: async (userIds: string[], name?: string): Promise<ApiResponse<Chat>> => {
    return api.post('/chats', { userIds, name });
  },

  // Get chat messages
  getMessages: async (chatId: string, page: number = 1, limit: number = 50): Promise<ApiResponse<{ messages: Message[]; total: number }>> => {
    return api.get(`/chats/${chatId}/messages?page=${page}&limit=${limit}`);
  },

  // Send message
  sendMessage: async (chatId: string, content: string, type: 'TEXT' | 'FILE' | 'IMAGE' = 'TEXT'): Promise<ApiResponse<Message>> => {
    return api.post(`/chats/${chatId}/messages`, { content, type });
  },

  // Mark messages as read
  markAsRead: async (chatId: string): Promise<ApiResponse<void>> => {
    return api.patch(`/chats/${chatId}/read`);
  },

  // Delete chat
  deleteChat: async (chatId: string): Promise<ApiResponse<void>> => {
    return api.delete(`/chats/${chatId}`);
  },

  // Get unread message count
  getUnreadCount: async (): Promise<ApiResponse<{ count: number }>> => {
    return api.get('/chats/unread-count');
  },

  // Archive chat
  archiveChat: async (chatId: string): Promise<ApiResponse<void>> => {
    return api.patch(`/chats/${chatId}/archive`);
  },

  // Unarchive chat
  unarchiveChat: async (chatId: string): Promise<ApiResponse<void>> => {
    return api.patch(`/chats/${chatId}/unarchive`);
  },

  // Block user
  blockUser: async (userId: string): Promise<ApiResponse<void>> => {
    return api.post(`/users/${userId}/block`);
  },

  // Unblock user
  unblockUser: async (userId: string): Promise<ApiResponse<void>> => {
    return api.delete(`/users/${userId}/block`);
  },

  // Get blocked users
  getBlockedUsers: async (): Promise<ApiResponse<any[]>> => {
    return api.get('/users/blocked');
  },
};

export default chatService;
