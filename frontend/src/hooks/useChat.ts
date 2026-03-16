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
      const response = await chatApi.getChats({ limit: 50 });
      setChats(response.data || []);
    } catch (error) {
      logger.error('Failed to fetch chats', { error: error.message, userId: user?.userId }, 'useChat');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch messages for specific chat
  const fetchMessages = useCallback(async (chatId: string) => {
    try {
      setLoading(true);
      const response = await chatApi.getMessages(chatId, { limit: 100 });
      setMessages(response.data || []);
    } catch (error) {
      logger.error('Failed to fetch messages', { error: error.message, chatId }, 'useChat');
    } finally {
      setLoading(false);
    }
  }, []);

  // Send message
  const sendMessage = useCallback(async (chatId: string, content: string, type: string = 'TEXT', metadata?: any) => {
    try {
      setSending(true);
      const response = await chatApi.createMessage(chatId, {
        content,
        type,
        metadata
      });

      const newMessage: Message = {
        ...response.data,
        sender: user
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
      logger.error('Failed to send message', { error: error.message, chatId, content }, 'useChat');
      throw error;
    } finally {
      setSending(false);
    }
  }, [user]);

  // Mark messages as read
  const markAsRead = useCallback(async (chatId: string) => {
    try {
      await chatApi.markAsRead(chatId);
      
      // Update local state
      setMessages(prev => prev.map(msg => 
        msg.senderId !== user?.userId ? { ...msg, isRead: true } : msg
      ));
      
      setChats(prev => prev.map(chat => 
        chat.id === chatId ? { ...chat, unreadCount: 0 } : chat
      ));
      
      fetchUnreadCount();
    } catch (error) {
      logger.error('Failed to mark as read', { error: error.message, chatId }, 'useChat');
    }
  }, [user]);

  // Fetch unread count
  const fetchUnreadCount = useCallback(async () => {
    try {
      const response = await chatApi.getUnreadCount();
      setUnreadCount(response.data?.unreadCount || 0);
    } catch (error) {
      logger.error('Failed to fetch unread count', { error: error.message }, 'useChat');
    }
  }, []);

  // Create new chat
  const createChat = useCallback(async (participant2Id: string) => {
    try {
      const response = await chatApi.createChat({ participant2Id });
      const newChat = response.data;
      
      setChats(prev => [newChat, ...prev]);
      return newChat;
    } catch (error) {
      logger.error('Failed to create chat', { error: error.message, participant2Id }, 'useChat');
      throw error;
    }
  }, []);

  // WebSocket connection
  const connectWebSocket = useCallback(() => {
    if (!enableRealTime || !user?.userId) return;

    const wsUrl = `${process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:5000'}/ws/chat/${user.userId}`;
    
    try {
      wsRef.current = new WebSocket(wsUrl);
      
      wsRef.current.onopen = () => {
        logger.info('WebSocket connected', { userId: user?.userId }, 'useChat');
        setIsConnected(true);
        reconnectAttempts.current = 0;
      };
      
      wsRef.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          switch (data.type) {
            case 'NEW_MESSAGE':
              if (data.message.chatId === chatId) {
                setMessages(prev => [...prev, data.message]);
              }
              setChats(prev => prev.map(chat => 
                chat.id === data.message.chatId 
                  ? { ...chat, lastMessage: data.message.content, lastMessageAt: data.message.createdAt }
                  : chat
              ));
              if (data.message.senderId !== user?.userId) {
                fetchUnreadCount();
              }
              break;
              
            case 'MESSAGE_READ':
              setMessages(prev => prev.map(msg => 
                msg.id === data.messageId ? { ...msg, isRead: true } : msg
              ));
              break;
              
            case 'CHAT_CREATED':
              setChats(prev => [data.chat, ...prev]);
              break;
              
            case 'TYPING':
              // Handle typing indicator
              break;
          }
        } catch (error) {
          logger.error('WebSocket message error', { error: error.message, data: event.data }, 'useChat');
        }
      };
      
      wsRef.current.onclose = () => {
        logger.info('WebSocket disconnected', { userId: user?.userId, reconnectAttempts: reconnectAttempts.current }, 'useChat');
        setIsConnected(false);
        
        // Attempt to reconnect
        if (reconnectAttempts.current < maxReconnectAttempts) {
          reconnectTimeoutRef.current = setTimeout(() => {
            reconnectAttempts.current++;
            connectWebSocket();
          }, 1000 * Math.pow(2, reconnectAttempts.current));
        }
      };
      
      wsRef.current.onerror = (error) => {
        logger.error('WebSocket error', { error: error?.message || 'Unknown WebSocket error', userId: user?.userId }, 'useChat');
      };
      
    } catch (error) {
      logger.error('Failed to connect WebSocket', { error: error.message, wsUrl, userId: user?.userId }, 'useChat');
    }
  }, [enableRealTime, user?.userId, chatId, fetchUnreadCount]);

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
