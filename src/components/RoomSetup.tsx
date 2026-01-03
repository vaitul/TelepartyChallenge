import React, { useState, useEffect } from "react";
import { useTelepartyContext } from "../hooks/useTelepartyContext";
import { ConnectionState } from "../types/teleparty.types";

const RoomSetup: React.FC = () => {
  const { createRoom, joinRoom, connectionState } = useTelepartyContext();

  const [nickname, setNickname] = useState("");
  const [userIcon, setUserIcon] = useState("😊");
  const [roomIdToJoin, setRoomIdToJoin] = useState("");
  const [createdRoomId, setCreatedRoomId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const isConnected = connectionState === ConnectionState.CONNECTED;

  useEffect(() => {
    const savedNickname = localStorage.getItem('teleparty_nickname');
    const savedIcon = localStorage.getItem('teleparty_icon');
    
    if (savedNickname) {
      setNickname(savedNickname);
    }
    if (savedIcon) {
      setUserIcon(savedIcon);
    }
  }, []);

  const handleCreateRoom = async () => {
    if (!nickname.trim()) {
      setError("Please enter a nickname");
      return;
    }

    setError(null);
    setIsCreating(true);

    try {
      localStorage.setItem('teleparty_nickname', nickname.trim());
      localStorage.setItem('teleparty_icon', userIcon);
      
      const roomId = await createRoom(nickname.trim(), userIcon);
      setCreatedRoomId(roomId);
    } catch (err) {
      setError("Failed to create room. Please try again.");
      console.error(err);
    } finally {
      setIsCreating(false);
    }
  };

  const handleJoinRoom = async () => {
    if (!nickname.trim()) {
      setError("Please enter a nickname");
      return;
    }

    if (!roomIdToJoin.trim()) {
      setError("Please enter a room ID");
      return;
    }

    setError(null);
    setIsJoining(true);

    try {
      localStorage.setItem('teleparty_nickname', nickname.trim());
      localStorage.setItem('teleparty_icon', userIcon);
      
      await joinRoom(nickname.trim(), roomIdToJoin.trim(), userIcon);
    } catch (err) {
      setError("Failed to join room. Please check the room ID and try again.");
      console.error(err);
      setIsJoining(false);
    }
  };

  const handleCopyRoomId = () => {
    if (createdRoomId) {
      navigator.clipboard.writeText(createdRoomId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const emojis = [
    "😊",
    "🤠",
    "🤬",
    "😎",
    "🎉",
    "🚀",
    "💡",
    "🎮",
    "🎵",
    "⭐",
    "🔥",
    "👨🏻‍💻",
    "🙍🏻‍♀️",
    "🙎🏼‍♂️",
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="backdrop-blur-xl bg-white/5 rounded-xl md:rounded-2xl shadow-2xl border border-white/10 p-4 sm:p-6 md:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Join or Create a Chat Room
        </h2>

        {error && (
          <div className="mb-4 md:mb-6 p-3 md:p-4 bg-red-500/10 border border-red-500/30 rounded-lg md:rounded-xl text-red-300 text-sm backdrop-blur-sm">
            {error}
          </div>
        )}

        <div className="max-w-md mx-auto">
          <div className="mb-6 md:mb-8">
            <label className="block text-xs sm:text-sm font-semibold mb-2 md:mb-3 text-gray-200">
              Nickname <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Enter your nickname"
              className="w-full px-3 py-2 md:px-4 md:py-3 text-sm md:text-base rounded-lg md:rounded-xl bg-white/5 border border-white/10 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent backdrop-blur-sm transition-all"
              disabled={!isConnected}
              maxLength={20}
            />

            <div className="my-6 md:my-8">
              <label className="block text-xs sm:text-sm font-semibold mb-2 md:mb-3 text-gray-200">
                Choose your icon (optional)
              </label>
              <div className="grid grid-cols-7 gap-1.5 md:gap-2">
                {emojis.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => setUserIcon(emoji)}
                    className={`text-xl md:text-2xl p-2 md:p-3 rounded-lg md:rounded-xl transition-all ${
                      userIcon === emoji
                        ? "bg-gradient-to-br from-blue-500 to-purple-600 scale-110 shadow-lg shadow-blue-500/50"
                        : "bg-white/5 hover:bg-white/10 border border-white/10"
                    }`}
                    disabled={!isConnected}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="py-3 md:py-4">
            <button
              onClick={handleCreateRoom}
              disabled={!isConnected || isCreating || !nickname.trim()}
              className="w-full py-3 md:py-4 text-sm md:text-base rounded-lg md:rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isCreating ? "Creating..." : "🎉 Create New Room"}
            </button>

            {createdRoomId && (
              <div className="mt-4 md:mt-6 p-3 md:p-4 bg-green-500/10 border border-green-500/30 rounded-lg md:rounded-xl backdrop-blur-sm">
                <p className="text-xs sm:text-sm font-semibold text-green-300 mb-2 md:mb-3">🎊 Room Created Successfully!</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 p-2 md:p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-xs md:text-sm font-mono break-all">
                    {createdRoomId}
                  </code>
                  <button
                    onClick={handleCopyRoomId}
                    className="px-4 py-2.5 rounded-lg font-medium bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 transition-all whitespace-nowrap"
                  >
                    {copied ? "✓ Copied" : "📋 Copy"}
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-3">
                  📤 Share this ID with others to invite them to your room
                </p>
              </div>
            )}
          </div>
          
          <div className="flex justify-center items-center my-6 md:my-8">
            <div className="border-t border-white/10 grow"></div>
            <span className="mx-3 md:mx-4 text-gray-500 font-medium text-xs sm:text-sm">OR</span>
            <div className="border-t border-white/10 grow"></div>
          </div>

          <div className="py-2">
            <h3 className="text-lg sm:text-xl text-center font-bold mb-3 md:mb-4 text-gray-200">
              Join Existing Room
            </h3>
            <input
              type="text"
              value={roomIdToJoin}
              onChange={(e) => setRoomIdToJoin(e.target.value)}
              placeholder="Enter Room ID"
              className="w-full px-3 py-2 md:px-4 md:py-3 text-sm md:text-base rounded-lg md:rounded-xl bg-white/5 border border-white/10 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent backdrop-blur-sm transition-all mb-3 md:mb-4"
              disabled={!isConnected}
            />
            <button
              onClick={handleJoinRoom}
              disabled={
                !isConnected ||
                isJoining ||
                !nickname.trim() ||
                !roomIdToJoin.trim()
              }
              className="w-full py-3 md:py-4 text-sm md:text-base rounded-lg md:rounded-xl font-semibold bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-lg shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isJoining ? "Joining..." : "🚪 Join Room"}
            </button>
          </div>
        </div>

        {!isConnected && (
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-yellow-400 text-sm font-medium backdrop-blur-sm">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              Connecting to server...
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomSetup;
