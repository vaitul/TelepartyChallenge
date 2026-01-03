import React from 'react';
import { useTelepartyContext } from '../hooks/useTelepartyContext';

const TypingIndicator: React.FC = () => {
  const { isAnyoneTyping } = useTelepartyContext();

  if (!isAnyoneTyping) {
    return null;
  }

  return (
    <div className="px-5 py-3 border-t border-white/10 bg-white/5 backdrop-blur-sm">
      <div className="flex items-center gap-2 text-sm text-gray-400 font-medium">
        <span>💬 Someone is typing</span>
        <div className="flex gap-1">
          <span className="animate-bounce animation-delay-0 text-blue-400">.</span>
          <span className="animate-bounce animation-delay-150 text-purple-400">.</span>
          <span className="animate-bounce animation-delay-300 text-pink-400">.</span>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
