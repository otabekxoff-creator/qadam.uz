import { useState, useRef, useEffect } from 'react';
import { Send, Mic, Paperclip, Smile, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { logger } from '@/utils/logger';

interface MessageInputProps {
  onSendMessage: (content: string, type: string, metadata?: any) => void;
  disabled?: boolean;
  placeholder?: string;
}

export default function MessageInput({ 
  onSendMessage, 
  disabled = false, 
  placeholder = "Xabar yozing..." 
}: MessageInputProps) {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const recordingInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    return () => {
      if (recordingInterval.current) {
        clearInterval(recordingInterval.current);
      }
    };
  }, []);

  const handleSend = () => {
    if (!message.trim() || disabled) return;
    
    onSendMessage(message.trim(), 'TEXT');
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    
    recordingInterval.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    
    if (recordingInterval.current) {
      clearInterval(recordingInterval.current);
      recordingInterval.current = null;
    }
    
    // TODO: Implement voice recording logic
    logger.info(`Recording stopped after ${recordingTime} seconds`);
    setRecordingTime(0);
  };

  const handleFileUpload = () => {
    // TODO: Implement file upload
    logger.info('File upload clicked');
  };

  const formatRecordingTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-card border-t border-border p-4">
      <div className="max-w-4xl mx-auto">
        {/* Recording Indicator */}
        {isRecording && (
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center gap-2 bg-red-500/10 text-red-500 px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Yozib olinmoqda...</span>
              <span className="text-sm">{formatRecordingTime(recordingTime)}</span>
              <Button size="sm" variant="ghost" onClick={stopRecording} className="h-6 w-6 p-0">
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          {/* Attach File */}
          <Button 
            size="sm" 
            variant="ghost" 
            className="h-8 w-8 p-0"
            onClick={handleFileUpload}
            disabled={disabled}
          >
            <Paperclip className="h-4 w-4" />
          </Button>

          {/* Emoji */}
          <Button 
            size="sm" 
            variant="ghost" 
            className="h-8 w-8 p-0"
            disabled={disabled}
          >
            <Smile className="h-4 w-4" />
          </Button>

          {/* Message Input */}
          <Input
            ref={inputRef}
            placeholder={placeholder}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={disabled}
            className="flex-1"
          />

          {/* Voice Recording / Send */}
          {message.trim() ? (
            <Button 
              size="sm" 
              onClick={handleSend}
              disabled={disabled}
              className="h-8 px-3"
            >
              <Send className="h-4 w-4" />
            </Button>
          ) : (
            <Button 
              size="sm" 
              variant="ghost" 
              className={`h-8 w-8 p-0 ${isRecording ? 'text-red-500' : ''}`}
              onClick={isRecording ? stopRecording : startRecording}
              disabled={disabled}
            >
              <Mic className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Character Count */}
        {message.length > 200 && (
          <div className="mt-2 text-xs text-muted-foreground text-right">
            {message.length}/2000
          </div>
        )}
      </div>
    </div>
  );
}
