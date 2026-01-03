import React from 'react';
import { useTelepartyContext } from '../hooks/useTelepartyContext';

const TypingIndicator: React.FC = () => {
  const { isAnyoneTyping } = useTelepartyContext();

  if (!isAnyoneTyping) {
    return null;
  }

  return (
    <div className="px-4 py-2 border-t border-gray-700 bg-gray-800 bg-opacity-50">
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <span>Someone is typing</span>
        <div className="flex gap-1">
          <span className="animate-bounce animation-delay-0">.</span>
          <span className="animate-bounce animation-delay-150">.</span>
          <span className="animate-bounce animation-delay-300">.</span>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
