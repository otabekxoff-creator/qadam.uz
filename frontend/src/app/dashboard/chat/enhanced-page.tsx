'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Send, Mic, Paperclip, Smile, Phone, Video, Info, MoreVertical,
  Search, UserPlus, Settings, Archive, Trash2, Check, CheckCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { chatApi } from '@/services/api';
import { useAuthStore } from '@/stores';
import type { Chat, Message } from '@/types';

export default function EnhancedChatPage() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuthStore();

  useEffect(() => {
    fetchChats();
    fetchUnreadCount();
    
    // Mock online users
    const mockOnlineUsers = ['2', '5', '8', '12'];
    setOnlineUsers(mockOnlineUsers);
  }, []);

  useEffect(() => {
    if (selectedChat) {
      fetchMessages(selectedChat.id);
    }
  }, [selectedChat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchChats = async () => {
    try {
      setLoading(true);
      const response = await chatApi.getChats({ limit: 50 });
      setChats(response || []);
    } catch (error) {
      console.error('Failed to fetch chats:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (chatId: string) => {
    try {
      const response = await chatApi.getMessages(chatId, { limit: 100 });
      setMessages(response || []);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  const fetchUnreadCount = async () => {
    try {
      const response = await chatApi.getUnreadCount();
      setUnreadCount(response?.unreadCount || 0);
    } catch (error) {
      console.error('Failed to fetch unread count:', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || sending || !selectedChat) return;

    try {
      setSending(true);
      const response = await chatApi.createMessage(selectedChat.id, {
        content: newMessage.trim(),
        type: 'TEXT'
      });

      const newMsg: Message = {
        ...response,
        sender: user || undefined
      };

      setMessages(prev => [...prev, newMsg]);
      setNewMessage('');

      // Update chat last message
      setChats(prev => prev.map(chat => 
        chat.id === selectedChat.id 
          ? { ...chat, lastMessage: newMessage.trim(), lastMessageAt: new Date().toISOString() }
          : chat
      ));
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setSending(false);
    }
  };

  const markAsRead = async (chatId: string) => {
    try {
      await chatApi.markAsRead(chatId);
      
      setMessages(prev => prev.map(msg => 
        msg.senderId !== user?.userId ? { ...msg, isRead: true } : msg
      ));
      
      setChats(prev => prev.map(chat => 
        chat.id === chatId ? { ...chat, unreadCount: 0 } : chat
      ));
      
      fetchUnreadCount();
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  const getParticipantName = (chat: Chat) => {
    const participant = chat.participant1?.id === user?.id ? chat.participant2 : chat.participant1;
    return participant?.email || 'Unknown';
  };

  const getParticipantAvatar = (chat: Chat) => {
    const participant = chat.participant1?.id === user?.id ? chat.participant2 : chat.participant1;
    return '';
  };

  const isOnline = (chat: Chat) => {
    const participant = chat.participant1?.id === user?.id ? chat.participant2 : chat.participant1;
    return onlineUsers.includes(participant?.id || '');
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
      return date.toLocaleDateString('uz-UZ', { 
        day: 'numeric', 
        month: 'short' 
      });
    }
  };

  const filteredChats = chats.filter(chat => {
    const participant = chat.participant1?.id === user?.userId ? chat.participant2 : chat.participant1;
    const searchName = participant?.student 
      ? `${participant.student.firstName} ${participant.student.lastName}`
      : participant?.company?.name || '';
    
    return searchName.toLowerCase().includes(searchQuery.toLowerCase());
  });

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
    return message.senderId === user?.id;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        {/* Chat List */}
        <div className="w-80 border-r border-border bg-card">
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-foreground">Xabarlar</h2>
              {unreadCount > 0 && (
                <Badge variant="destructive" className="px-2 py-1">
                  {unreadCount}
                </Badge>
              )}
            </div>
            
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

          <div className="overflow-y-auto h-[calc(100vh-120px)]">
            {loading ? (
              <div className="p-4 space-y-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="p-3 border border-border rounded-lg animate-pulse">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-muted rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-muted rounded w-24 mb-2"></div>
                        <div className="h-3 bg-muted rounded w-32"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredChats.length === 0 ? (
              <div className="p-8 text-center">
                <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Xabarlar yo'q</h3>
                <p className="text-muted-foreground text-sm">
                  {searchQuery ? 'Qidiruv natijalari bo\'sh' : 'Hali hech kim bilan suhbat qo\'shmadingiz'}
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                {filteredChats.map((chat, index) => (
                  <motion.div
                    key={chat.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      setSelectedChat(chat);
                      markAsRead(chat.id);
                    }}
                    className={`p-3 hover:bg-muted/50 cursor-pointer transition-colors ${
                      selectedChat?.id === chat.id ? 'bg-muted' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={getParticipantAvatar(chat)} alt={getParticipantName(chat)} />
                          <AvatarFallback>
                            {getParticipantName(chat).charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        {isOnline(chat) && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card"></div>
                        )}
                      </div>

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
                            {chat.lastMessage ? chat.lastMessage.substring(0, 30) + '...' : 'Hali xabarlar yo\'q'}
                          </p>
                          {chat.unreadCount && chat.unreadCount > 0 && (
                            <Badge variant="destructive" className="ml-2 px-2 py-0.5 text-xs">
                              {chat.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Chat Window */}
        {selectedChat ? (
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-border bg-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={getParticipantAvatar(selectedChat)} alt={getParticipantName(selectedChat)} />
                    <AvatarFallback>
                      {getParticipantName(selectedChat).charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-foreground">{getParticipantName(selectedChat)}</h3>
                    <p className="text-xs text-muted-foreground">
                      {isOnline(selectedChat) ? 'Online' : 'Offline'}
                    </p>
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
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Search className="h-4 w-4 mr-2" />
                        Xabarlarni qidirish
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Archive className="h-4 w-4 mr-2" />
                        Arxivlash
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        O'chirish
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="max-w-4xl mx-auto space-y-4">
                {Object.entries(groupMessagesByDate(messages)).map(([date, dateMessages]) => (
                  <div key={date}>
                    <div className="flex items-center justify-center my-4">
                      <div className="bg-muted px-3 py-1 rounded-full text-xs text-muted-foreground">
                        {new Date(dateMessages[0].createdAt).toLocaleDateString('uz-UZ', { 
                          day: 'numeric', 
                          month: 'long' 
                        })}
                      </div>
                    </div>

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
                          <div className={`flex items-center justify-end gap-1 mt-1 text-xs ${
                            isOwnMessage(message) 
                              ? 'text-primary-foreground/70' 
                              : 'text-muted-foreground'
                          }`}>
                            <span>{new Date(message.createdAt).toLocaleTimeString('uz-UZ', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}</span>
                            {isOwnMessage(message) && (
                              <span>
                                {message.isRead ? (
                                  <CheckCheck className="h-3 w-3" />
                                ) : (
                                  <Check className="h-3 w-3" />
                                )}
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ))}
                
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start mb-2"
                  >
                    <div className="bg-muted text-foreground max-w-xs lg:max-w-md px-4 py-2 rounded-2xl">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-border bg-card">
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
        ) : (
          <div className="flex-1 flex items-center justify-center bg-muted/50">
            <div className="text-center">
              <MessageCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Xabar tanlang</h3>
              <p className="text-muted-foreground">
                Suhbat boshlash uchun xabarni tanlang
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
