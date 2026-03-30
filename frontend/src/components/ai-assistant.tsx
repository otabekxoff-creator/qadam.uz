'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Salom! Men Bek, SINERGIYA platformasining AI yordamchisiman. Sizga qanday yordam bera olaman?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string): string => {
    const lowerMsg = userMessage.toLowerCase();
    
    if (lowerMsg.includes('ish') || lowerMsg.includes('vakansiya') || lowerMsg.includes('job')) {
      return 'Ish qidirish uchun "Ish Qidirish" bo\'limiga o\'ting. U yerda 50,000+ dan ortiq ish o\'rinlarini topishingiz mumkin. Sizga qanday sohadagi ishlar qiziq?';
    }
    if (lowerMsg.includes('rezyume') || lowerMsg.includes('resume') || lowerMsg.includes('cv')) {
      return 'Rezyume yaratish uchun "Resurslar" bo\'limidan bepul rezyume namunalari va vositalaridan foydalanishingiz mumkin. Shuningdek, AI yordamida rezyumengizni optimallashtirish mumkin.';
    }
    if (lowerMsg.includes('kompaniya') || lowerMsg.includes('company')) {
      return 'Kompaniyalar ro\'yxatini ko\'rish uchun "Kompaniyalar" bo\'limiga o\'ting. U yerda 8,500+ dan ortiq kompaniyalar haqida ma\'lumot topasiz.';
    }
    if (lowerMsg.includes('maosh') || lowerMsg.includes('oylik') || lowerMsg.includes('salary')) {
      return 'Maosh hisoblagichidan foydalanib, sizning tajriba va sohangiz bo\'yicha bozor maoshini bilib olishingiz mumkin.';
    }
    if (lowerMsg.includes('ro\'yxat') || lowerMsg.includes('register') || lowerMsg.includes('kirish') || lowerMsg.includes('login')) {
      return 'Ro\'yxatdan o\'tish uchun yuqori o\'ng burchakdagi "Ro\'yxatdan o\'tish" tugmasini bosing. Agar akkauntingiz bo\'lsa, "Kirish" tugmasi orqali tizimga kiring.';
    }
    if (lowerMsg.includes('salom') || lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
      return 'Salom! Sizga qanday yordam bera olaman?';
    }
    if (lowerMsg.includes('rahmat') || lowerMsg.includes('thank')) {
      return 'Arzimaydi! Boshqa savollaringiz bo\'lsa, bemalol so\'rang.';
    }
    if (lowerMsg.includes('startap') || lowerMsg.includes('startup')) {
      return 'Startap loyihangiz bormi? "Startuplar" bo\'limiga o\'ting va o\'z loyihangizni yuboring. Investorlar va kompaniyalar uni ko\'rib chiqishadi.';
    }
    if (lowerMsg.includes('help') || lowerMsg.includes('yordam')) {
      return 'Men sizga ish qidirish, rezyume yaratish, kompaniyalar haqida ma\'lumot olish va boshqa ko\'plab masalalar bo\'yicha yordam bera olaman. Savolingizni ayting!';
    }
    
    return 'Tushundim. Bu haqida batafsil ma\'lumot uchun "Aloqa" bo\'limiga o\'ting yoki qo\'shimcha savollar berishingiz mumkin. Sizga qanday yordam bera olaman?';
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(userMessage.text),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-primary to-primary/80 text-white rounded-full shadow-lg hover:shadow-xl transition-all z-50 flex items-center justify-center"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 w-80 sm:w-96 h-[500px] bg-background rounded-2xl shadow-2xl border z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Bek</h3>
                  <p className="text-xs text-white/80">AI Yordamchi</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-3 flex items-start gap-2 ${
                      message.sender === 'user'
                        ? 'bg-primary text-white rounded-br-md'
                        : 'bg-secondary text-foreground rounded-bl-md'
                    }`}
                  >
                    {message.sender === 'bot' && (
                      <Bot className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    )}
                    <div>
                      <p className="text-sm">{message.text}</p>
                      <span className="text-xs opacity-70 mt-1 block">
                        {message.timestamp.toLocaleTimeString('uz-UZ', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                    {message.sender === 'user' && (
                      <User className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    )}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-secondary rounded-2xl rounded-bl-md p-3 flex items-center gap-2">
                    <Bot className="w-4 h-4" />
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t bg-background">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Savolingizni yozing..."
                  className="flex-1 px-4 py-2 rounded-full border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <Button
                  size="icon"
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isTyping}
                  className="rounded-full w-10 h-10"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center mt-2">
                AI yordamchi demo rejimida ishlamoqda
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
