"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Send, Sparkles, Bot, User, X, Minimize, Maximize, Loader2, Lightbulb, BookOpen, Briefcase, TrendingUp } from "lucide-react";
import { aiApi } from "@/services/api";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  relatedTopics?: string[];
}

interface BekAssistantProps {
  isOpen?: boolean;
  onClose?: () => void;
  context?: string;
}

export default function BekAssistant({ isOpen: controlledIsOpen, onClose, context = 'general' }: BekAssistantProps) {
  const [isOpen, setIsOpen] = useState(controlledIsOpen || false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      type: 'ai',
      content: `Salom! Men Bek, sizning karyera maslahatchingiz. \n\nQuyidagi mavzularda yordam bera olaman:\n• Rezyume tayyorlash\n• Intervyu tayyorgarlik\n• Ko'nikmalarni rivojlantirish\n• Ish topish strategiyasi\n• Karyera rejalashtirish\n\nSizni qiziqtirgan savolni yozing! 😊`,
      timestamp: new Date(),
      suggestions: [
        'Rezyume qanday yozish kerak?',
        'Intervyuga qanday tayyorlanish kerak?',
        'Qanday ko\'nikmalar o\'rganish kerak?',
      ],
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await aiApi.ask({
        question: userMessage.content,
        context,
      });

      if (response.success) {
        setIsTyping(true);
        
        // Simulate typing effect
        setTimeout(() => {
          const aiMessage: Message = {
            id: (Date.now() + 1).toString(),
            type: 'ai',
            content: response.data.answer,
            timestamp: new Date(),
            suggestions: response.data.suggestions,
            relatedTopics: response.data.relatedTopics,
          };
          setMessages((prev) => [...prev, aiMessage]);
          setIsTyping(false);
        }, 1000);
      }
    } catch (error) {
      console.error('Failed to get AI response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'Kechirasiz, texnik nosozlik yuz berdi. Iltimos, keyinroq qayta urinib ko\'ring.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickActions = [
    { icon: Lightbulb, label: 'Maslahat', color: 'bg-yellow-500' },
    { icon: BookOpen, label: 'O\'qish', color: 'bg-blue-500' },
    { icon: Briefcase, label: 'Ishlar', color: 'bg-green-500' },
    { icon: TrendingUp, label: 'O\'sish', color: 'bg-purple-500' },
  ];

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Button
            size="lg"
            className="h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
            onClick={() => setIsOpen(true)}
          >
            <Sparkles className="w-6 h-6" />
          </Button>
        </motion.div>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? '80px' : '600px',
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[400px] shadow-2xl"
          >
            <Card className="h-full flex flex-col overflow-hidden border-2 border-primary/20">
              {/* Header */}
              <CardHeader className="flex flex-row items-center justify-between py-3 px-4 bg-gradient-to-r from-primary/10 to-primary/5 border-b">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10 border-2 border-primary">
                      <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                        BK
                      </AvatarFallback>
                    </Avatar>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"
                    />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-bold">Bek - AI Yordamchi</CardTitle>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full" />
                      Online
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setIsMinimized(!isMinimized)}
                  >
                    {isMinimized ? <Maximize className="w-4 h-4" /> : <Minimize className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => {
                      setIsOpen(false);
                      onClose?.();
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>

              {!isMinimized && (
                <>
                  {/* Quick Actions */}
                  <div className="px-4 py-2 border-b bg-muted/30">
                    <div className="flex gap-2">
                      {quickActions.map((action) => (
                        <motion.button
                          key={action.label}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs text-white ${action.color} hover:opacity-90 transition-opacity`}
                          onClick={() => handleSuggestionClick(`${action.label} haqida maslahat bering`)}
                        >
                          <action.icon className="w-3 h-3" />
                          {action.label}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Messages */}
                  <CardContent className="flex-1 p-0">
                    <ScrollArea className="h-[380px] px-4 py-2" ref={scrollRef}>
                      <div className="space-y-4">
                        {messages.map((message, index) => (
                          <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className={`flex gap-2 max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                              <Avatar className="h-8 w-8 mt-1">
                                <AvatarFallback className={message.type === 'user' ? 'bg-muted' : 'bg-primary text-primary-foreground'}>
                                  {message.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                                </AvatarFallback>
                              </Avatar>
                              <div className={`space-y-2 ${message.type === 'user' ? 'items-end' : 'items-start'}`}>
                                <div
                                  className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                                    message.type === 'user'
                                      ? 'bg-primary text-primary-foreground rounded-br-md'
                                      : 'bg-muted rounded-bl-md'
                                  }`}
                                >
                                  {message.content.split('\n').map((line, i) => (
                                    <p key={i} className={line.startsWith('•') ? 'ml-2' : ''}>
                                      {line}
                                    </p>
                                  ))}
                                </div>
                                
                                {/* Suggestions */}
                                {message.suggestions && message.suggestions.length > 0 && (
                                  <div className="flex flex-wrap gap-1.5 mt-2">
                                    {message.suggestions.map((suggestion) => (
                                      <Badge
                                        key={suggestion}
                                        variant="secondary"
                                        className="cursor-pointer hover:bg-primary/20 transition-colors text-xs"
                                        onClick={() => handleSuggestionClick(suggestion)}
                                      >
                                        {suggestion}
                                      </Badge>
                                    ))}
                                  </div>
                                )}

                                {/* Related Topics */}
                                {message.relatedTopics && message.relatedTopics.length > 0 && (
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    <span className="text-xs text-muted-foreground">Mavzular:</span>
                                    {message.relatedTopics.map((topic) => (
                                      <span key={topic} className="text-xs text-primary hover:underline cursor-pointer">
                                        #{topic}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ))}

                        {/* Typing Indicator */}
                        {isTyping && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex justify-start"
                          >
                            <div className="flex gap-2 max-w-[85%]">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-primary text-primary-foreground">
                                  <Bot className="w-4 h-4" />
                                </AvatarFallback>
                              </Avatar>
                              <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1">
                                <motion.span
                                  animate={{ y: [0, -4, 0] }}
                                  transition={{ repeat: Infinity, duration: 0.5 }}
                                  className="w-2 h-2 bg-primary rounded-full"
                                />
                                <motion.span
                                  animate={{ y: [0, -4, 0] }}
                                  transition={{ repeat: Infinity, duration: 0.5, delay: 0.1 }}
                                  className="w-2 h-2 bg-primary rounded-full"
                                />
                                <motion.span
                                  animate={{ y: [0, -4, 0] }}
                                  transition={{ repeat: Infinity, duration: 0.5, delay: 0.2 }}
                                  className="w-2 h-2 bg-primary rounded-full"
                                />
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </ScrollArea>
                  </CardContent>

                  {/* Input */}
                  <CardContent className="p-3 border-t bg-muted/30">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Savolingizni yozing..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 bg-background"
                        disabled={isLoading}
                      />
                      <Button
                        size="icon"
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading}
                        className="shrink-0"
                      >
                        {isLoading ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Send className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
