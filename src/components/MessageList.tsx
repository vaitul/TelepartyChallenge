import React, { useEffect, useRef } from "react";
import { useTelepartyContext } from "../hooks/useTelepartyContext";
import { getDisplayName } from "../utils/nickname";

const MessageList: React.FC = () => {
  const { messages, nickname } = useTelepartyContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
    return nickname === messageNickname;
  };

  return (
    <div
      ref={containerRef}
      className="h-full overflow-y-auto p-2 md:p-4 space-y-2 md:space-y-3"
      style={{ maxHeight: "calc(100vh - 20rem)" }}
    >
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-500">
          <p>No messages yet. Start the conversation!</p>
        </div>
      ) : (
        messages.map((message) => {
          if (message.isSystemMessage) {
            return (
              <div key={message.userNickname} className="flex justify-center my-2 md:my-4">
                <div className="px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-gray-300 text-xs md:text-sm italic max-w-md text-center">
                  {getDisplayName(message.userNickname ?? "System")}{" "}
                  {message.body}
                  <span className="text-xs text-gray-500 ml-2">
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
              className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-2 md:mb-4`}
            >
              <div
                className={`max-w-[85%] md:max-w-[75%] px-3 py-2 md:px-4 md:py-3 rounded-xl md:rounded-2xl backdrop-blur-sm text-sm md:text-base ${
                  isOwn
                    ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/20"
                    : "bg-white/10 text-gray-100 border border-white/10"
                }`}
              >
                {!isOwn && (
                  <div className="flex items-center gap-1.5 md:gap-2 mb-1.5 md:mb-2">
                    {message.userIcon && (
                      <span className="text-base md:text-lg">{message.userIcon}</span>
                    )}
                    <span className="text-xs md:text-sm font-bold text-purple-300">
                      {getDisplayName(message.userNickname ?? "Anonymous")}
                    </span>
                  </div>
                )}

                <div className="break-words leading-relaxed">{message.body}</div>

                <div
                  className={`text-xs mt-1 md:mt-2 ${
                    isOwn ? "text-blue-100" : "text-gray-400"
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
