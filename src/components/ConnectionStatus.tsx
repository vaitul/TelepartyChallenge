import React from "react";
import { useTelepartyContext } from "../hooks/useTelepartyContext";
import { ConnectionState } from "../types/teleparty.types";

const ConnectionStatus: React.FC = () => {
  const { connectionState, roomId, reconnect } = useTelepartyContext();

  const getStatusColor = () => {
    switch (connectionState) {
      case ConnectionState.CONNECTED:
        return "bg-green-500";
      case ConnectionState.CONNECTING:
        return "bg-yellow-500";
      case ConnectionState.DISCONNECTED:
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = () => {
    switch (connectionState) {
      case ConnectionState.CONNECTED:
        return "Connected";
      case ConnectionState.CONNECTING:
        return "Connecting...";
      case ConnectionState.DISCONNECTED:
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
    connectionState === ConnectionState.DISCONNECTED && roomId;
  const showReloadButton =
    connectionState === ConnectionState.DISCONNECTED && !roomId;

  const getStatusBarColor = () => {
    switch (connectionState) {
      case ConnectionState.CONNECTED:
        return "bg-green-900 border-green-700";
      case ConnectionState.CONNECTING:
        return "bg-yellow-900 border-yellow-700";
      case ConnectionState.DISCONNECTED:
        return "bg-red-900 border-red-700";
      default:
        return "bg-gray-800 border-gray-700";
    }
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 border-t z-50 ${getStatusBarColor()}`}
    >
      <div className="px-4 py-2 max-w-full">
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${getStatusColor()}`}></div>
            <span className="text-sm text-gray-300">{getStatusText()}</span>
            {connectionState === ConnectionState.DISCONNECTED && roomId && (
              <span className="text-xs text-red-200 ml-2">
                ⚠️ Connection lost
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
