import React, { useEffect, useRef } from "react";
import { useTelepartyContext } from "../hooks/useTelepartyContext";
import { getDisplayName } from "../utils/nickname";

const MessageList: React.FC = () => {
  const { messages, nickname } = useTelepartyContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatTimestamp = (timestamp: number): string => {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const isOwnMessage = (messageNickname: string): boolean => {
    // Compare with current user's nickname (both are unique with userId prefix)
    return nickname === messageNickname;
  };

  return (
    <div
      ref={containerRef}
      className="h-full overflow-y-auto p-4 space-y-3"
      style={{ maxHeight: "calc(100vh - 24rem)" }}
    >
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-500">
          <p>No messages yet. Start the conversation!</p>
        </div>
      ) : (
        messages.map((message) => {
          if (message.isSystemMessage) {
            // System message
            return (
              <div key={message.userNickname} className="flex justify-center">
                <div className="chat-message-system max-w-md">
                  {message.body}
                  <span className="text-xs text-gray-400 ml-2">
                    {formatTimestamp(message.timestamp)}
                  </span>
                </div>
              </div>
            );
          }

          const isOwn = isOwnMessage(message.userNickname ?? "");

          return (
            <div
              key={message.userNickname}
              className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
            >
              <div
                className={isOwn ? "chat-message-user" : "chat-message-other"}
              >
                {/* User info for other users' messages */}
                {!isOwn && (
                  <div className="flex items-center gap-2 mb-1">
                    {message.userIcon && (
                      <span className="text-lg">{message.userIcon}</span>
                    )}
                    <span className="text-sm font-semibold">
                      {getDisplayName(message.userNickname ?? "Anonymous")}
                    </span>
                  </div>
                )}

                {/* Message body */}
                <div className="break-words">{message.body}</div>

                {/* Timestamp */}
                <div
                  className={`text-xs mt-1 ${
                    isOwn ? "text-blue-200" : "text-gray-400"
                  }`}
                >
                  {formatTimestamp(message.timestamp)}
                </div>
              </div>
            </div>
          );
        })
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
