'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Search, MoreVertical, Phone, Video, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { chatApi } from '@/services/api';
import { useAuthStore } from '@/stores';
import type { Chat } from '@/types';
import { logger } from '@/utils/logger';
import Link from 'next/link';

export default function ChatPage() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();

  useEffect(() => {
    fetchChats();
    fetchUnreadCount();
  }, []);

  const fetchChats = async () => {
    try {
      setLoading(true);
      const response = await chatApi.getChats({ limit: 50 });
      setChats(response || []);
    } catch (error) {
      logger.error('Failed to fetch chats', { error: error?.message || 'Unknown error' }, 'ChatPage');
    } finally {
      setLoading(false);
    }
  };

  const fetchUnreadCount = async () => {
    try {
      const response = await chatApi.getUnreadCount();
      setUnreadCount(response?.unreadCount || 0);
    } catch (error) {
      logger.error('Failed to fetch unread count', { error: error?.message || 'Unknown error' }, 'ChatPage');
    }
  };

  const filteredChats = chats.filter(chat => {
    const participant = chat.participant1?.id === user?.id ? chat.participant2 : chat.participant1;
    const searchName = participant?.email || '';
    
    return searchName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const getParticipantName = (chat: Chat) => {
    const participant = chat.participant1?.id === user?.id ? chat.participant2 : chat.participant1;
    return participant?.email || 'Unknown';
  };

  const getParticipantAvatar = (chat: Chat) => {
    const participant = chat.participant1?.id === user?.id ? chat.participant2 : chat.participant1;
    return '';
  };

  const formatLastMessage = (message: string) => {
    return message.length > 50 ? `${message.substring(0, 50)}...` : message;
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return `${diffInMinutes} min ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-4">
        {/* Header */}
        <div className="bg-card rounded-xl border border-border p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Xabarlar</h1>
              <p className="text-muted-foreground">Kompaniyalar va talabalar bilan muloqot</p>
            </div>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="px-3 py-1">
                {unreadCount} ta o'qilmagan xabar
              </Badge>
            )}
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="space-y-2">
          {filteredChats.length === 0 ? (
            <div className="bg-card rounded-xl border border-border p-12 text-center">
              <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Xabarlar topilmadi</h3>
              <p className="text-muted-foreground">
                {searchQuery ? 'Qidiruv natijalari bo\'sh' : 'Hali hech kim bilan suhbat qo\'shmadingiz'}
              </p>
            </div>
          ) : (
            filteredChats.map((chat, index) => (
              <Link key={chat.id} href={`/dashboard/chat/${chat.id}`}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-card rounded-xl border border-border p-4 hover:border-primary/50 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={getParticipantAvatar(chat)} alt={getParticipantName(chat)} />
                      <AvatarFallback>
                        {getParticipantName(chat).charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    {/* Chat Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-foreground truncate">
                          {getParticipantName(chat)}
                        </h3>
                        <span className="text-xs text-muted-foreground">
                          {chat.lastMessageAt && formatTime(chat.lastMessageAt)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground truncate">
                          {chat.lastMessage ? formatLastMessage(chat.lastMessage) : 'Hali xabarlar yo\'q'}
                        </p>
                        {chat.unreadCount && chat.unreadCount > 0 && (
                          <Badge variant="destructive" className="ml-2 px-2 py-0.5 text-xs">
                            {chat.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Info className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
