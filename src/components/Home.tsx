import { useTelepartyContext } from "../hooks/useTelepartyContext";
import ChatRoom from "./ChatRoom";
import ConnectionStatus from "./ConnectionStatus";
import RoomSetup from "./RoomSetup";

const Home: React.FC = () => {
  const { roomId } = useTelepartyContext();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 pb-16">
      <div className="container-custom py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Teleparty Chat
          </h1>
          <p className="text-gray-400 text-sm md:text-base">Connect and chat in real-time</p>
        </div>

        {roomId ? <ChatRoom /> : <RoomSetup />}
      </div>
      
      <ConnectionStatus />
    </div>
  );
};

export default Home;