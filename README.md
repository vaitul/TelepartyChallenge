# Teleparty Chat Application

A real-time chat application built with React, TypeScript, and the Teleparty WebSocket library.

## Features

- ✅ Create and join chat rooms
- ✅ Real-time messaging
- ✅ Set custom nickname and emoji icon
- ✅ View message history when joining
- ✅ Typing indicators
- ✅ System messages for room events
- ✅ Dark theme UI with Tailwind CSS
- ✅ Responsive design

## Tech Stack

- **React** 19.2.0
- **TypeScript** 5.9.3
- **Vite** 7.2.4
- **Tailwind CSS** 4.1.18
- **teleparty-websocket-lib** (WebSocket client)

## Installation

\`\`\`bash
npm install
\`\`\`

## Development

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:5173](http://localhost:5173) to view the app.

## Build

\`\`\`bash
npm run build
\`\`\`

## Project Structure

\`\`\`
src/
├── components/          # React components
│   ├── ChatRoom.tsx    # Main chat interface
│   ├── ConnectionStatus.tsx  # Connection indicator
│   ├── MessageInput.tsx     # Message input with typing
│   ├── MessageList.tsx      # Message display
│   ├── RoomSetup.tsx        # Create/join room interface
│   └── TypingIndicator.tsx  # Typing indicator
├── contexts/            # React Context
│   └── TelepartyContext.tsx # WebSocket state management
├── hooks/               # Custom hooks
│   └── useTelepartyContext.ts
├── types/               # TypeScript types
│   └── teleparty.types.ts
├── App.tsx             # Main app component
└── index.css           # Tailwind styles
\`\`\`

## Usage

1. **Enter your nickname** and optionally choose an emoji icon
2. **Create a new room** or **join an existing room** with a Room ID
3. **Start chatting!** Messages sync in real-time across all participants
4. See **typing indicators** when someone is composing a message
5. **System messages** notify when users join or leave

## Key Components

### TelepartyContext
Manages WebSocket connection, room state, and message handling.

### RoomSetup
Initial screen for creating or joining a room with nickname and icon selection.

### ChatRoom
Main chat interface displaying messages, typing indicators, and input.

### MessageList
Displays chat history with proper styling for system messages, own messages, and others' messages.

### MessageInput
Text input with automatic typing presence and message sending.

## License

MIT
