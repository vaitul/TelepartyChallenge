import React, { useState, useRef, useEffect } from 'react';
import { useTelepartyContext } from '../hooks/useTelepartyContext';

const MessageInput: React.FC = () => {
  const { sendMessage, setTyping, connectionState, roomId } = useTelepartyContext();
  const [message, setMessage] = useState('');
  const typingTimeoutRef = useRef<number | null>(null);
  const isTypingRef = useRef(false);

  const isDisabled = connectionState !== 'connected' || !roomId;

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      if (isTypingRef.current) {
        setTyping(false);
      }
    };
  }, [setTyping]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);

    if (!isTypingRef.current && e.target.value.length > 0) {
      isTypingRef.current = true;
      setTyping(true);
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    if (e.target.value.length > 0) {
      typingTimeoutRef.current = setTimeout(() => {
        if (isTypingRef.current) {
          isTypingRef.current = false;
          setTyping(false);
        }
      }, 3000);
    } else {
      if (isTypingRef.current) {
        isTypingRef.current = false;
        setTyping(false);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || isDisabled) {
      return;
    }

    try {
      sendMessage(message.trim());
      setMessage('');
      
      if (isTypingRef.current) {
        isTypingRef.current = false;
        setTyping(false);
      }
      
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleBlur = () => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    if (isTypingRef.current) {
      isTypingRef.current = false;
      setTyping(false);
    }
  };

  return (
    <div className="border-t border-white/10 p-5 bg-white/5 backdrop-blur-sm rounded-b-2xl">
      <form onSubmit={handleSubmit} className="flex gap-3">
        <textarea
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          placeholder={isDisabled ? 'Not connected...' : 'Type a message... (Enter to send, Shift+Enter for new line)'}
          className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent backdrop-blur-sm resize-none transition-all"
          rows={1}
          disabled={isDisabled}
          maxLength={500}
        />
        <button
          type="submit"
          disabled={isDisabled || !message.trim()}
          className="px-8 py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98] self-end"
        >
          Send
        </button>
      </form>
      {message.length > 0 && (
        <div className="text-xs text-gray-500 mt-2 text-right font-medium">
          {message.length}/500
        </div>
      )}
    </div>
  );
};

export default MessageInput;
