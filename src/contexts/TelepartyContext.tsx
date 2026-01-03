import React, {
  createContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { TelepartyClient, SocketMessageTypes } from "teleparty-websocket-lib";
import type {
  ConnectionState,
  ChatMessage,
  SessionChatMessage,
  TypingMessageData,
  SocketEventHandler,
  SetTypingMessageData,
  MessageList,
} from "../types/teleparty.types";
import type { SocketMessage } from "teleparty-websocket-lib/lib/SocketMessage";
import { createUniqueNickname } from "../utils/nickname";

export interface TelepartyContextType {
  connectionState: ConnectionState;
  roomId: string | null;
  nickname: string | null;
  userIcon: string | null;
  messages: SessionChatMessage[];
  isAnyoneTyping: boolean;

  // Actions
  createRoom: (nickname: string, icon?: string) => Promise<string>;
  joinRoom: (nickname: string, roomId: string, icon?: string) => Promise<void>;
  sendMessage: (body: string) => void;
  setTyping: (typing: boolean) => void;
  leaveRoom: () => void;
}

const TelepartyContext = createContext<TelepartyContextType | null>(null);

export { TelepartyContext };

export const TelepartyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const clientRef = useRef<TelepartyClient | null>(null);
  const [connectionState, setConnectionState] =
    useState<ConnectionState>("connecting");
  const [roomId, setRoomId] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string | null>(null);
  const [userIcon, setUserIcon] = useState<string | null>(null);
  const [messages, setMessages] = useState<SessionChatMessage[]>([]);
  const [isAnyoneTyping, setIsAnyoneTyping] = useState(false);
  const currentUserId = useRef<string | undefined>(undefined);

  // Message handler
  const handleMessage = useCallback((message: SocketMessage) => {
    const { data } = message;
    console.log("Received message:", data, currentUserId.current);

    // Capture userId when it appears in messages
    if (data && "userId" in data && data.userId !== currentUserId.current) {
      currentUserId.current = data.userId as string;
      console.log("Captured userId:", currentUserId.current);
    }

    // Check if it's a typing presence message
    if (
      data &&
      typeof data === "object" &&
      "anyoneTyping" in data &&
      data.usersTyping.filter((x: string) => x !== currentUserId.current)
        .length > 0
    ) {
      console.log("Typing presence update:", data, currentUserId.current);
      const typingData = data as TypingMessageData;
      setIsAnyoneTyping(typingData.anyoneTyping);
      return;
    }

    // Check if it's a message list (history) - MessageList type from library
    if (data && typeof data === "object" && "messages" in data) {
      const messageList = data as MessageList;
      const historyMessages: ChatMessage[] = messageList.messages.map(
        (msg: SessionChatMessage, index: number) => ({
          ...msg,
          id: `${msg.permId}-${msg.timestamp}-${index}`,
        })
      );
      setMessages(historyMessages);
      return;
    }

    // Check if it's a chat message
    if (
      data &&
      typeof data === "object" &&
      "body" in data &&
      typeof (data as Record<string, unknown>).body === "string"
    ) {
      const chatMessage = data as SessionChatMessage;
      const newMessage: ChatMessage = {
        ...chatMessage,
        id: `${chatMessage.permId}-${chatMessage.timestamp}-${Date.now()}`,
      };

      setMessages((prev) => [...prev, newMessage]);
      return;
    }
  }, []);

  // Initialize WebSocket client
  useEffect(() => {
    const eventHandler: SocketEventHandler = {
      onConnectionReady: () => {
        console.log("Connection ready");
        setConnectionState("connected");
      },
      onClose: () => {
        console.log("Connection closed");
        setConnectionState("disconnected");
      },
      onMessage: handleMessage,
    };

    try {
      clientRef.current = new TelepartyClient(eventHandler);
    } catch (error) {
      console.error("Failed to initialize TelepartyClient:", error);
      // Use setTimeout to avoid setState in effect
      setTimeout(() => setConnectionState("disconnected"), 0);
    }

    return () => {
      // Cleanup if needed
    };
  }, [handleMessage]);

  const createRoom = useCallback(
    async (nickname: string, icon?: string): Promise<string> => {
      if (!clientRef.current) {
        throw new Error("Client not initialized");
      }
      if (connectionState !== "connected") {
        throw new Error("Not connected to server");
      }

      try {
        // Wait a bit to ensure userId is captured from connection
        await new Promise((resolve) => setTimeout(resolve, 100));

        const userId = currentUserId.current || Date.now().toString();
        const uniqueNickname = createUniqueNickname(nickname, userId);

        const newRoomId = await clientRef.current.createChatRoom(
          uniqueNickname,
          icon
        );
        setRoomId(newRoomId);
        setNickname(uniqueNickname);
        setUserIcon(icon || null);
        setMessages([]);
        return newRoomId;
      } catch (error) {
        console.error("Failed to create room:", error);
        throw error;
      }
    },
    [connectionState]
  );

  const joinRoom = useCallback(
    async (nickname: string, roomId: string, icon?: string) => {
      if (!clientRef.current) {
        throw new Error("Client not initialized");
      }
      if (connectionState !== "connected") {
        throw new Error("Not connected to server");
      }

      try {
        // Wait a bit to ensure userId is captured from connection
        await new Promise((resolve) => setTimeout(resolve, 100));

        const userId = currentUserId.current || Date.now().toString();
        const uniqueNickname = createUniqueNickname(nickname, userId);

        const messageList = await clientRef.current.joinChatRoom(
          uniqueNickname,
          roomId,
          icon
        );
        setRoomId(roomId);
        setNickname(uniqueNickname);
        setUserIcon(icon || null);

        // Load message history from the returned MessageList
        if (messageList && messageList.messages) {
          const historyMessages: ChatMessage[] = messageList.messages.map(
            (msg: SessionChatMessage, index: number) => ({
              ...msg,
              id: `${msg.permId}-${msg.timestamp}-${index}`,
            })
          );
          setMessages(historyMessages);
        } else {
          setMessages([]);
        }
      } catch (error) {
        console.error("Failed to join room:", error);
        throw error;
      }
    },
    [connectionState]
  );

  const sendMessage = useCallback(
    (body: string) => {
      if (!clientRef.current) {
        throw new Error("Client not initialized");
      }
      if (!roomId) {
        throw new Error("Not in a room");
      }

      try {
        clientRef.current.sendMessage(SocketMessageTypes.SEND_MESSAGE, {
          body,
        });
      } catch (error) {
        console.error("Failed to send message:", error);
        throw error;
      }
    },
    [roomId]
  );

  const setTyping = useCallback(
    (typing: boolean) => {
      if (!clientRef.current) return;
      if (!roomId) return;

      try {
        const typingData: SetTypingMessageData = { typing };
        clientRef.current.sendMessage(
          SocketMessageTypes.SET_TYPING_PRESENCE,
          typingData
        );
      } catch (error) {
        console.error("Failed to set typing presence:", error);
      }
    },
    [roomId]
  );

  const leaveRoom = useCallback(() => {
    window.location.reload();
  }, []);

  const value: TelepartyContextType = {
    connectionState,
    roomId,
    nickname,
    userIcon,
    messages,
    isAnyoneTyping,
    createRoom,
    joinRoom,
    sendMessage,
    setTyping,
    leaveRoom,
  };

  return (
    <TelepartyContext.Provider value={value}>
      {children}
    </TelepartyContext.Provider>
  );
};
