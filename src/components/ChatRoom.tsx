import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTelepartyContext } from "../hooks/useTelepartyContext";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import TypingIndicator from "./TypingIndicator";
import { getDisplayName } from "../utils/nickname";

const ChatRoom: React.FC = () => {
  const { roomId, nickname, leaveRoom } = useTelepartyContext();
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const handleCopyRoomId = () => {
    if (roomId) {
      navigator.clipboard.writeText(roomId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShareRoom = () => {
    if (roomId) {
      const url = `${window.location.origin}/room/${roomId}`;
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleLeaveRoom = () => {
    if (confirm("Are you sure you want to leave this room?")) {
      leaveRoom();
      navigate('/', { replace: true });
    }
  };

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-8rem)]">
      <div className="backdrop-blur-xl bg-white/5 rounded-2xl shadow-xl border border-white/10 mb-6 p-5">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex-1">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
              {getDisplayName(nickname || "")}'s Chat Room
            </h2>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm text-gray-400 font-medium">Room ID:</span>
              <code className="text-sm font-mono text-green-400 bg-green-500/10 px-3 py-1.5 rounded-lg border border-green-500/20">
                {roomId}
              </code>
              <button
                onClick={handleCopyRoomId}
                className="text-xs px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-300 transition-all font-medium"
              >
                {copied ? "✓ Copied ID" : "📋 Copy ID"}
              </button>
              <button
                onClick={handleShareRoom}
                className="text-xs px-3 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-300 transition-all font-medium"
              >
                {copied ? "✓ Copied Link" : "🔗 Share Link"}
              </button>
            </div>
          </div>
          <button onClick={handleLeaveRoom} className="px-5 py-2.5 rounded-xl font-semibold bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white shadow-lg shadow-red-500/30 transition-all transform hover:scale-[1.02] active:scale-[0.98]">
            Leave Room
          </button>
        </div>
      </div>

      <div className="backdrop-blur-xl bg-white/5 rounded-2xl shadow-2xl border border-white/10 p-0 flex flex-col h-[calc(100%-10rem)]">
        <div className="flex-1 overflow-hidden">
          <MessageList />
        </div>

        <TypingIndicator />
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatRoom;
