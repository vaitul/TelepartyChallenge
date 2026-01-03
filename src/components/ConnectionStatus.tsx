import React from "react";
import { useTelepartyContext } from "../hooks/useTelepartyContext";

const ConnectionStatus: React.FC = () => {
  const { connectionState } = useTelepartyContext();

  const getStatusColor = () => {
    switch (connectionState) {
      case "connected":
        return "bg-green-500";
      case "connecting":
        return "bg-yellow-500";
      case "disconnected":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = () => {
    switch (connectionState) {
      case "connected":
        return "Connected";
      case "connecting":
        return "Connecting...";
      case "disconnected":
        return "Disconnected";
      default:
        return "Unknown";
    }
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 border-t z-50 ${
        connectionState === "disconnected"
          ? "bg-red-900 border-red-700"
          : "bg-gray-800 border-gray-700"
      }`}
    >
      <div className="px-4 py-2 max-w-full">
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${getStatusColor()}`}></div>
            <span className="text-sm text-gray-300">{getStatusText()}</span>
            {connectionState === "disconnected" && (
              <span className="text-xs text-red-200 ml-2">
                ⚠️ Connection lost - Please reload to reconnect
              </span>
            )}
          </div>

          {connectionState === "disconnected" && (
            <button
              onClick={handleReload}
              className="btn-danger text-xs py-1 px-3 whitespace-nowrap"
            >
              Reload
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConnectionStatus;
