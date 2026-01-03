import React from "react";
import { useTelepartyContext } from "../hooks/useTelepartyContext";

const MAX_RECONNECT_ATTEMPTS = 3;

const ConnectionStatus: React.FC = () => {
  const { connectionState, roomId, reconnectAttempts, reconnect } =
    useTelepartyContext();

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
        return reconnectAttempts > 0
          ? `Reconnecting (${reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS})...`
          : "Connecting...";
      case "disconnected":
        return "Disconnected";
      default:
        return "Unknown";
    }
  };

  const handleReload = () => {
    window.location.reload();
  };

  const handleReconnect = () => {
    reconnect();
  };

  const showReconnectButton =
    connectionState === "disconnected" &&
    roomId &&
    reconnectAttempts < MAX_RECONNECT_ATTEMPTS;
  const showReloadButton =
    connectionState === "disconnected" &&
    (!roomId || reconnectAttempts >= MAX_RECONNECT_ATTEMPTS);

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
            {connectionState === "disconnected" && roomId && (
              <span className="text-xs text-red-200 ml-2">
                ⚠️{" "}
                {reconnectAttempts >= MAX_RECONNECT_ATTEMPTS
                  ? "Connection lost - All retry attempts failed"
                  : "Connection lost - Attempting to reconnect"}
              </span>
            )}
          </div>

          {showReconnectButton && (
            <button
              onClick={handleReconnect}
              className="btn-primary text-xs py-1 px-3 whitespace-nowrap"
            >
              Reconnect
            </button>
          )}

          {showReloadButton && (
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
