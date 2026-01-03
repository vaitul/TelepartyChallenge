import { useTelepartyContext } from "../hooks/useTelepartyContext";
import ChatRoom from "./ChatRoom";
import ConnectionStatus from "./ConnectionStatus";
import RoomSetup from "./RoomSetup";

const Home: React.FC = () => {
  const { roomId } = useTelepartyContext();

  return (
    <div className="min-h-screen bg-gray-900 pb-16">
      <div className="container-custom py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-500">
          Teleparty Chat
        </h1>

        {roomId ? <ChatRoom /> : <RoomSetup />}
      </div>
      
      <ConnectionStatus />
    </div>
  );
};

export default Home;