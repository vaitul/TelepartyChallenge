import React, { useState } from "react";
import { useTelepartyContext } from "../hooks/useTelepartyContext";

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

  const isConnected = connectionState === "connected";

  const handleCreateRoom = async () => {
    if (!nickname.trim()) {
      setError("Please enter a nickname");
      return;
    }

    setError(null);
    setIsCreating(true);

    try {
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
    <div className="max-w-lg mx-auto">
      <div className="card mb-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-400">
          Join or Create a Chat Room
        </h2>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-900 border border-red-700 rounded-md text-red-100">
            {error}
          </div>
        )}

        <div className="max-w-xs mx-auto">
          {/* Nickname and Icon Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Nickname <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Enter your nickname"
              className="input"
              disabled={!isConnected}
              maxLength={20}
            />

            <div className="my-8">
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Choose your icon (optional)
              </label>
              <div className="flex flex-wrap gap-2">
                {emojis.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => setUserIcon(emoji)}
                    className={`text-2xl p-1 rounded-md transition-all ${
                      userIcon === emoji
                        ? "bg-blue-600 scale-110"
                        : "bg-gray-700 hover:bg-gray-600"
                    }`}
                    disabled={!isConnected}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Create Room Section */}
          <div className="py-2">
            <button
              onClick={handleCreateRoom}
              disabled={!isConnected || isCreating || !nickname.trim()}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCreating ? "Creating..." : "Create New Room"}
            </button>

            {createdRoomId && (
              <div className="mt-4 p-3 bg-gray-700 rounded-md">
                <p className="text-sm text-gray-300 mb-2">Room ID:</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 p-2 bg-gray-800 rounded text-green-400 text-sm font-mono break-all">
                    {createdRoomId}
                  </code>
                  <button
                    onClick={handleCopyRoomId}
                    className="btn-secondary px-3 py-2 text-sm whitespace-nowrap"
                  >
                    {copied ? "✓ Copied" : "Copy"}
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Share this ID with others to invite them to your room
                </p>
              </div>
            )}
          </div>
          <div className="flex justify-center items-center">
            <div className="border-t border-gray-600 my-4 grow max-w-[25%]"></div>
            <span className="mx-2 text-gray-400">OR</span>
            <div className="border-t border-gray-600 my-4 grow max-w-[25%]"></div>
          </div>

          {/* Join Room Section */}
          <div className="py-2">
            <h3 className="text-lg text-center font-semibold mb-3 text-blue-400">
              Join Existing Room
            </h3>
            <input
              type="text"
              value={roomIdToJoin}
              onChange={(e) => setRoomIdToJoin(e.target.value)}
              placeholder="Enter Room ID"
              className="input mb-3"
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
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isJoining ? "Joining..." : "Join Room"}
            </button>
          </div>
        </div>

        {!isConnected && (
          <div className="mt-4 text-center text-yellow-500 text-sm">
            Waiting for connection...
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomSetup;
