import React, { useState } from "react";
import { useTelepartyContext } from "../hooks/useTelepartyContext";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import TypingIndicator from "./TypingIndicator";
import { getDisplayName } from "../utils/nickname";

const ChatRoom: React.FC = () => {
  const { roomId, nickname, leaveRoom } = useTelepartyContext();
  const [copied, setCopied] = useState(false);

  const handleCopyRoomId = () => {
    if (roomId) {
      navigator.clipboard.writeText(roomId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleLeaveRoom = () => {
    if (confirm("Are you sure you want to leave this room?")) {
      leaveRoom();
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)]">
      {/* Room Header */}
      <div className="card mb-4 p-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-blue-400 mb-1">
              {getDisplayName(nickname || "")}'s Chat Room
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Room ID:</span>
              <code className="text-sm font-mono text-green-400 bg-gray-800 px-2 py-1 rounded">
                {roomId}
              </code>
              <button
                onClick={handleCopyRoomId}
                className="text-xs px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-gray-300 transition-colors"
              >
                {copied ? "✓" : "Copy"}
              </button>
            </div>
          </div>
          <button onClick={handleLeaveRoom} className="btn-danger">
            Leave Room
          </button>
        </div>
      </div>

      {/* Chat Container */}
      <div className="card p-0 flex flex-col h-[calc(100%-8rem)]">
        {/* Messages Area */}
        <div className="flex-1 overflow-hidden">
          <MessageList />
        </div>

        {/* Typing Indicator */}
        <TypingIndicator />

        {/* Message Input */}
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatRoom;
