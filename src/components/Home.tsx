import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTelepartyContext } from "../hooks/useTelepartyContext";
import ConnectionStatus from "./ConnectionStatus";
import RoomSetup from "./RoomSetup";

const Home: React.FC = () => {
  const { roomId } = useTelepartyContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (roomId) {
      navigate(`/room/${roomId}`, { replace: true });
    }
  }, [roomId, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 pb-12 md:pb-16">
      <div className="container-custom py-4 md:py-8">
        <div className="text-center mb-6 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-3 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Teleparty Chat
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm md:text-base">Connect and chat in real-time</p>
        </div>

        <RoomSetup />
      </div>
      
      <ConnectionStatus />
    </div>
  );
};

export default Home;