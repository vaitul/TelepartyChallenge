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
        return "bg-gradient-to-r from-green-900/90 to-emerald-900/90 border-green-700/50";
      case ConnectionState.CONNECTING:
        return "bg-gradient-to-r from-yellow-900/90 to-amber-900/90 border-yellow-700/50";
      case ConnectionState.DISCONNECTED:
        return "bg-gradient-to-r from-red-900/90 to-rose-900/90 border-red-700/50";
      default:
        return "bg-gray-800/90 border-gray-700/50";
    }
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 border-t z-50 backdrop-blur-xl ${getStatusBarColor()}`}
    >
      <div className="px-6 py-3 max-w-full">
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-2.5 h-2.5 rounded-full ${getStatusColor()} shadow-lg`}></div>
            <span className="text-sm font-medium text-gray-200">{getStatusText()}</span>
            {connectionState === ConnectionState.DISCONNECTED && roomId && (
              <span className="text-xs text-red-200 ml-2 px-2 py-1 bg-red-500/20 rounded-full backdrop-blur-sm">
                ⚠️ Connection lost
              </span>
            )}
          </div>

          {showReconnectButton && (
            <button
              onClick={handleReconnect}
              className="px-4 py-2 rounded-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-sm shadow-lg shadow-blue-500/30 transition-all transform hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
            >
              🔄 Reconnect
            </button>
          )}

          {showReloadButton && (
            <button
              onClick={handleReload}
              className="px-4 py-2 rounded-lg font-semibold bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white text-sm shadow-lg shadow-red-500/30 transition-all transform hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
            >
              ↻ Reload
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConnectionStatus;
