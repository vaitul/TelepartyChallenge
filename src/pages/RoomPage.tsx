import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTelepartyContext } from '../hooks/useTelepartyContext';
import ChatRoom from '../components/ChatRoom';
import ConnectionStatus from '../components/ConnectionStatus';
import { ConnectionState } from '../types/teleparty.types';

const RoomPage: React.FC = () => {
  const { roomId: urlRoomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const { roomId, connectionState, joinRoom } = useTelepartyContext();
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!urlRoomId) {
      navigate('/', { replace: true });
      return;
    }

    if (roomId === urlRoomId) {
      return;
    }

    const autoJoinRoom = async () => {
      if (connectionState === ConnectionState.CONNECTED && !isJoining && !roomId) {
        setIsJoining(true);
        setError(null);

        try {
          const savedNickname = localStorage.getItem('teleparty_nickname');
          const savedIcon = localStorage.getItem('teleparty_icon');
          
          if (!savedNickname) {
            navigate('/', { replace: true });
            return;
          }

          await joinRoom(savedNickname, urlRoomId, savedIcon || '😊');
        } catch (err) {
          console.error('Failed to auto-join room:', err);
          setError('Failed to join room. Redirecting to home...');
          setTimeout(() => navigate('/', { replace: true }), 2000);
        } finally {
          setIsJoining(false);
        }
      }
    };

    autoJoinRoom();
  }, [urlRoomId, roomId, connectionState, isJoining, joinRoom, navigate]);

  if (!roomId || roomId !== urlRoomId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 pb-12 md:pb-16">
        <div className="container-custom py-4 md:py-8">
          <div className="text-center mb-6 md:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-3 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Teleparty Chat
            </h1>
            <p className="text-gray-400 text-sm md:text-base">Connect and chat in real-time</p>
          </div>

          <div className="max-w-lg mx-auto">
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl shadow-2xl border border-white/10 p-8 text-center">
              {error ? (
                <div className="text-red-400">
                  <p className="text-xl mb-2">⚠️</p>
                  <p>{error}</p>
                </div>
              ) : connectionState === ConnectionState.CONNECTING ? (
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-yellow-400 text-sm font-medium backdrop-blur-sm mb-4">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                    Connecting to server...
                  </div>
                </div>
              ) : (
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium backdrop-blur-sm mb-4">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    Joining room...
                  </div>
                  <p className="text-gray-400 text-sm mt-4">Room ID: {urlRoomId}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <ConnectionStatus />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 pb-16">
      <div className="container-custom py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Teleparty Chat
          </h1>
          <p className="text-gray-400 text-sm md:text-base">Connect and chat in real-time</p>
        </div>

        <ChatRoom />
      </div>
      <ConnectionStatus />
    </div>
  );
};

export default RoomPage;
