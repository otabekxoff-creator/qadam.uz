'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Mic, Paperclip, Smile, MoreVertical, Phone, Video, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { chatApi } from '@/services/api';
import { useAuthStore } from '@/stores';
import type { Chat, Message } from '@/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ChatWindowPage({ params }: { params: { id: string } }) {
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (params.id) {
      fetchChat();
      fetchMessages();
    }
  }, [params.id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchChat = async () => {
    try {
      setLoading(true);
      const response = await chatApi.getChatById(params.id);
      setChat(response);
    } catch (error) {
      console.error('Failed to fetch chat:', error);
      router.push('/dashboard/chat');
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await chatApi.getMessages(params.id, { limit: 100 });
      setMessages(response || []);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || sending) return;

    try {
      setSending(true);
      const response = await chatApi.createMessage(params.id, {
        content: newMessage.trim(),
        type: 'TEXT'
      });

      const newMsg: Message = {
        ...response,
        sender: user
      };

      setMessages(prev => [...prev, newMsg]);
      setNewMessage('');

      // Update chat last message
      if (chat) {
        setChat({
          ...chat,
          lastMessage: newMessage.trim(),
          lastMessageAt: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setSending(false);
    }
  };

  const markAsRead = async () => {
    try {
      await chatApi.markAsRead(params.id);
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  const getParticipantName = () => {
    if (!chat) return '';
    const participant = chat.participant1?.id === user?.userId ? chat.participant2 : chat.participant1;
    return participant?.student 
      ? `${participant.student.firstName} ${participant.student.lastName}`
      : participant?.company?.name || 'Unknown';
  };

  const getParticipantAvatar = () => {
    if (!chat) return '';
    const participant = chat.participant1?.id === user?.userId ? chat.participant2 : chat.participant1;
    return participant?.student?.avatar || participant?.company?.logo || '';
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('uz-UZ', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Bugun';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Kecha';
    } else {
      return date.toLocaleDateString('uz-UZ', { 
        day: 'numeric', 
        month: 'long' 
      });
    }
  };

  const groupMessagesByDate = (messages: Message[]) => {
    const groups: { [date: string]: Message[] } = {};
    
    messages.forEach(message => {
      const date = new Date(message.createdAt).toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });

    return groups;
  };

  const isOwnMessage = (message: Message) => {
    return message.senderId === user?.userId;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!chat) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-foreground mb-2">Chat topilmadi</h2>
          <Link href="/dashboard/chat">
            <Button>Orqaga qaytish</Button>
          </Link>
        </div>
      </div>
    );
  }

  const messageGroups = groupMessagesByDate(messages);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <Link href="/dashboard/chat">
              <Button size="sm" variant="ghost" className="lg:hidden">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            
            <Avatar className="h-10 w-10">
              <AvatarImage src={getParticipantAvatar()} alt={getParticipantName()} />
              <AvatarFallback>
                {getParticipantName().charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div>
              <h2 className="font-semibold text-foreground">{getParticipantName()}</h2>
              <p className="text-xs text-muted-foreground">Online</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
              <Phone className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
              <Video className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
              <Info className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {Object.entries(messageGroups).map(([date, dateMessages]) => (
            <div key={date}>
              {/* Date Separator */}
              <div className="flex items-center justify-center my-4">
                <div className="bg-muted px-3 py-1 rounded-full text-xs text-muted-foreground">
                  {formatDate(dateMessages[0].createdAt)}
                </div>
              </div>

              {/* Messages for this date */}
              {dateMessages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex ${isOwnMessage(message) ? 'justify-end' : 'justify-start'} mb-2`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    isOwnMessage(message) 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-foreground'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      isOwnMessage(message) 
                        ? 'text-primary-foreground/70' 
                        : 'text-muted-foreground'
                    }`}>
                      {formatTime(message.createdAt)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          ))}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-card border-t border-border p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
              <Paperclip className="h-4 w-4" />
            </Button>
            
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
              <Smile className="h-4 w-4" />
            </Button>

            <Input
              placeholder="Xabar yozing..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              className="flex-1"
            />

            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
              <Mic className="h-4 w-4" />
            </Button>

            <Button 
              size="sm" 
              onClick={sendMessage}
              disabled={!newMessage.trim() || sending}
              className="h-8 px-3"
            >
              {sending ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
