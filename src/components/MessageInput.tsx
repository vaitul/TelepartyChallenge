import React, { useState, useRef, useEffect } from 'react';
import { useTelepartyContext } from '../hooks/useTelepartyContext';

const MessageInput: React.FC = () => {
  const { sendMessage, setTyping, connectionState, roomId } = useTelepartyContext();
  const [message, setMessage] = useState('');
  const typingTimeoutRef = useRef<number | null>(null);
  const isTypingRef = useRef(false);

  const isDisabled = connectionState !== 'connected' || !roomId;

  // Cleanup timeout on unmount
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

    // Send typing indicator
    if (!isTypingRef.current && e.target.value.length > 0) {
      isTypingRef.current = true;
      setTyping(true);
    }

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout to stop typing after 3 seconds of inactivity
    if (e.target.value.length > 0) {
      typingTimeoutRef.current = setTimeout(() => {
        if (isTypingRef.current) {
          isTypingRef.current = false;
          setTyping(false);
        }
      }, 3000);
    } else {
      // If input is empty, stop typing immediately
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
      
      // Stop typing indicator
      if (isTypingRef.current) {
        isTypingRef.current = false;
        setTyping(false);
      }
      
      // Clear timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Send message on Enter (without Shift)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleBlur = () => {
    // Stop typing indicator when input loses focus
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    if (isTypingRef.current) {
      isTypingRef.current = false;
      setTyping(false);
    }
  };

  return (
    <div className="border-t border-gray-700 p-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <textarea
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          placeholder={isDisabled ? 'Not connected...' : 'Type a message... (Enter to send, Shift+Enter for new line)'}
          className="input resize-none"
          rows={2}
          disabled={isDisabled}
          maxLength={500}
        />
        <button
          type="submit"
          disabled={isDisabled || !message.trim()}
          className="btn-primary px-6 self-end disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </form>
      {message.length > 0 && (
        <div className="text-xs text-gray-400 mt-1 text-right">
          {message.length}/500
        </div>
      )}
    </div>
  );
};

export default MessageInput;
