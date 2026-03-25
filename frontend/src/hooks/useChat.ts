import { useState, useEffect, useRef, useCallback } from 'react';
import { chatApi } from '@/services/api';
import { useAuthStore } from '@/stores';
import type { Chat, Message } from '@/types';
import { logger } from '@/utils/logger';

interface UseChatOptions {
  chatId?: string;
  enableRealTime?: boolean;
}

export function useChat({ chatId, enableRealTime = true }: UseChatOptions = {}) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const { user } = useAuthStore();
  
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;

  // Fetch chats
  const fetchChats = useCallback(async () => {
    try {
      setLoading(true);
      const response = await chatApi.getChats({ limit: 50 }) as unknown as { data?: Chat[] };
      setChats(response?.data || []);
    } catch (error) {
      const err = error as Error;
      logger.error('Failed to fetch chats', { error: err.message, userId: user?.id }, 'useChat');
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  // Fetch messages for specific chat
  const fetchMessages = useCallback(async (chatId: string) => {
    try {
      setLoading(true);
      const response = await chatApi.getMessages(chatId, { limit: 100 }) as unknown as { data?: Message[] };
      setMessages(response?.data || []);
    } catch (error) {
      const err = error as Error;
      logger.error('Failed to fetch messages', { error: err.message, chatId }, 'useChat');
    } finally {
      setLoading(false);
    }
  }, []);

  // Send message
  const sendMessage = useCallback(async (chatId: string, content: string, type: string = 'TEXT', metadata?: Record<string, unknown>) => {
    try {
      setSending(true);
      const response = await chatApi.createMessage(chatId, {
        content,
        type,
        metadata
      }) as unknown as Message;

      const newMessage: Message = {
        ...response,
        sender: user || undefined
      };

      setMessages(prev => [...prev, newMessage]);
      
      // Update chat list
      setChats(prev => prev.map(chat => 
        chat.id === chatId 
          ? { ...chat, lastMessage: content, lastMessageAt: new Date().toISOString() }
          : chat
      ));

      return newMessage;
    } catch (error) {
      const err = error as Error;
      logger.error('Failed to send message', { error: err.message, chatId, content }, 'useChat');
      throw error;
    } finally {
      setSending(false);
    }
  }, [user]);

  // Fetch unread count
  const fetchUnreadCount = useCallback(async () => {
    try {
      const response = await chatApi.getUnreadCount() as unknown as { data?: { unreadCount: number } };
      setUnreadCount(response?.data?.unreadCount || 0);
    } catch (error) {
      const err = error as Error;
      logger.error('Failed to fetch unread count', { error: err.message }, 'useChat');
    }
  }, []);

  // Mark messages as read
  const markAsRead = useCallback(async (chatId: string) => {
    try {
      await chatApi.markAsRead(chatId);
      
      // Update local state
      setMessages(prev => prev.map(msg => 
        msg.senderId !== user?.id ? { ...msg, isRead: true } : msg
      ));
      
      setChats(prev => prev.map(chat => 
        chat.id === chatId ? { ...chat, unreadCount: 0 } : chat
      ));
      
      fetchUnreadCount();
    } catch (error) {
      const err = error as Error;
      logger.error('Failed to mark as read', { error: err.message, chatId }, 'useChat');
    }
  }, [user?.id, fetchUnreadCount]);

  // Create new chat
  const createChat = useCallback(async (participant2Id: string) => {
    try {
      const response = await chatApi.createChat({ participant2Id }) as unknown as Chat;
      
      setChats(prev => [response, ...prev]);
      return response;
    } catch (error) {
      const err = error as Error;
      logger.error('Failed to create chat', { error: err.message, participant2Id }, 'useChat');
      throw error;
    }
  }, []);

  // WebSocket connection
  const connectWebSocket = useCallback(() => {
    if (!enableRealTime || !user?.id) return;

    const wsUrl = `${process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:5000'}/ws/chat/${user.id}`;
    
    try {
      wsRef.current = new WebSocket(wsUrl);
      
      wsRef.current.onopen = () => {
        logger.info('WebSocket connected', { userId: user?.id }, 'useChat');
        setIsConnected(true);
        reconnectAttempts.current = 0;
      };
      
      wsRef.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data) as Record<string, unknown>;
          
          switch (data.type) {
            case 'NEW_MESSAGE': {
              const msg = data.message as Message;
              if (msg.chatId === chatId) {
                setMessages(prev => [...prev, msg]);
              }
              setChats(prev => prev.map(chat => 
                chat.id === msg.chatId 
                  ? { ...chat, lastMessage: msg.content, lastMessageAt: msg.createdAt }
                  : chat
              ));
              if (msg.senderId !== user?.id) {
                fetchUnreadCount();
              }
              break;
            }
              
            case 'MESSAGE_READ': {
              const messageId = data.messageId as string;
              setMessages(prev => prev.map(msg => 
                msg.id === messageId ? { ...msg, isRead: true } : msg
              ));
              break;
            }
              
            case 'CHAT_CREATED': {
              const chat = data.chat as Chat;
              setChats(prev => [chat, ...prev]);
              break;
            }
              
            case 'TYPING':
              break;
          }
        } catch (error) {
          const err = error as Error;
          logger.error('WebSocket message error', { error: err.message, data: event.data }, 'useChat');
        }
      };
      
      wsRef.current.onclose = () => {
        logger.info('WebSocket disconnected', { userId: user?.id, reconnectAttempts: reconnectAttempts.current }, 'useChat');
        setIsConnected(false);
        
        // Attempt to reconnect
        if (reconnectAttempts.current < maxReconnectAttempts) {
          reconnectTimeoutRef.current = setTimeout(() => {
            reconnectAttempts.current++;
            connectWebSocket();
          }, 1000 * Math.pow(2, reconnectAttempts.current));
        }
      };
      
      wsRef.current.onerror = () => {
        logger.error('WebSocket error', { error: 'WebSocket error occurred', userId: user?.id }, 'useChat');
      };
      
    } catch (error) {
      const err = error as Error;
      logger.error('Failed to connect WebSocket', { error: err.message, wsUrl, userId: user?.id }, 'useChat');
    }
  }, [enableRealTime, user?.id, chatId, fetchUnreadCount]);

  // Disconnect WebSocket
  const disconnectWebSocket = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    
    setIsConnected(false);
  }, []);

  // Initialize
  useEffect(() => {
    fetchChats();
    fetchUnreadCount();
    
    if (chatId) {
      fetchMessages(chatId);
    }
    
    if (enableRealTime) {
      connectWebSocket();
    }
    
    return () => {
      disconnectWebSocket();
    };
  }, [chatId, enableRealTime]);

  // Reconnect when chatId changes
  useEffect(() => {
    if (chatId && enableRealTime) {
      disconnectWebSocket();
      connectWebSocket();
    }
  }, [chatId, enableRealTime]);

  return {
    // Data
    chats,
    messages,
    unreadCount,
    loading,
    sending,
    isConnected,
    
    // Actions
    fetchChats,
    fetchMessages,
    sendMessage,
    markAsRead,
    createChat,
    fetchUnreadCount,
    
    // Real-time
    connectWebSocket,
    disconnectWebSocket,
  };
}
