import { motion } from 'framer-motion';
import { Check, CheckCheck } from 'lucide-react';
import type { Message } from '@/types';

interface MessageProps {
  message: Message;
  isOwn: boolean;
  showTime?: boolean;
}

export default function MessageComponent({ message, isOwn, showTime = true }: MessageProps) {
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('uz-UZ', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const renderMessageContent = () => {
    switch (message.type) {
      case 'TEXT':
        return <p className="text-sm whitespace-pre-wrap">{message.content}</p>;
      
      case 'VOICE':
        return (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-xs text-primary">🎵</span>
            </div>
            <div className="flex-1">
              <div className="h-1 bg-muted rounded-full overflow-hidden">
                <div className="h-full w-1/3 bg-primary rounded-full"></div>
              </div>
            </div>
            <span className="text-xs text-muted-foreground">
              {message.metadata?.duration ? `${message.metadata.duration}s` : '0:00'}
            </span>
          </div>
        );
      
      case 'IMAGE':
        return (
          <div>
            <img 
              src={message.metadata?.url} 
              alt="Rasm" 
              className="rounded-lg max-w-xs cursor-pointer"
              onClick={() => window.open(message.metadata?.url, '_blank')}
            />
          </div>
        );
      
      case 'FILE':
        return (
          <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
            <span className="text-xs">📎</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{message.content}</p>
              <p className="text-xs text-muted-foreground">
                {message.metadata?.size ? `${(message.metadata.size / 1024).toFixed(1)}KB` : ''}
              </p>
            </div>
          </div>
        );
      
      default:
        return <p className="text-sm">{message.content}</p>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-2`}
    >
      <div className={`max-w-xs lg:max-w-md ${
        isOwn ? 'order-2' : 'order-1'
      }`}>
        <div className={`px-4 py-2 rounded-2xl ${
          isOwn 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-muted text-foreground'
        }`}>
          {renderMessageContent()}
          
          {showTime && (
            <div className={`flex items-center justify-end gap-1 mt-1 text-xs ${
              isOwn 
                ? 'text-primary-foreground/70' 
                : 'text-muted-foreground'
            }`}>
              <span>{formatTime(message.createdAt)}</span>
              {isOwn && (
                <span>
                  {message.isRead ? (
                    <CheckCheck className="h-3 w-3" />
                  ) : (
                    <Check className="h-3 w-3" />
                  )}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
