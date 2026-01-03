# 🎉 Teleparty Chat Application

A modern real-time chat application built with React, TypeScript, and the Teleparty WebSocket library. Features a beautiful glassmorphism UI with persistent room routing and real-time messaging capabilities.

## ✨ Features

- 🚀 **Real-time Messaging** - Instant message delivery across all participants
- 🏠 **Persistent Rooms** - Room URLs persist through page refreshes
- 👤 **Custom Profiles** - Set nickname and emoji icon with localStorage persistence
- 📜 **Message History** - View full chat history when joining existing rooms
- ⌨️ **Typing Indicators** - See when others are composing messages
- 🔔 **System Notifications** - Room events (join/leave) displayed as system messages
- 🎨 **Modern UI** - Glassmorphism design with gradient effects and backdrop blur
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- 🔗 **Share Links** - Copy room ID or full shareable URL with one click
- 🔄 **Manual Reconnection** - Reconnect button for handling connection issues
- 🎯 **Direct Room Access** - Join rooms directly via URL (`/room/:roomId`)

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.2.0 | UI framework with modern hooks |
| **TypeScript** | 5.9.3 | Type-safe development |
| **Vite** | 7.2.4 | Fast build tool and dev server |
| **React Router** | 7.11.0 | Client-side routing |
| **Tailwind CSS** | 4.1.18 | Utility-first styling |
| **teleparty-websocket-lib** | Latest | WebSocket communication |

## 🚀 Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/TelepartyChallenge.git
cd TelepartyChallenge

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app in your browser.

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

### Deploy to GitHub Pages

```bash
# Deploy to gh-pages branch
npm run deploy
```

The app will be available at: `https://YOUR_USERNAME.github.io/TelepartyChallenge`

## 📁 Project Structure

```
TelepartyChallenge/
├── .github/
│   └── workflows/
│       └── deploy.yml           # Auto-deploy workflow
├── public/
│   └── 404.html                # GitHub Pages SPA routing
├── src/
│   ├── components/
│   │   ├── ChatRoom.tsx        # Main chat interface
│   │   ├── ConnectionStatus.tsx # Fixed bottom status bar
│   │   ├── Home.tsx            # Landing page
│   │   ├── MessageInput.tsx    # Message composition
│   │   ├── MessageList.tsx     # Message display with styling
│   │   ├── RoomSetup.tsx       # Create/join room form
│   │   └── TypingIndicator.tsx # Typing status display
│   ├── contexts/
│   │   └── TelepartyContext.tsx # WebSocket state management
│   ├── hooks/
│   │   └── useTelepartyContext.ts # Context consumer hook
│   ├── pages/
│   │   └── RoomPage.tsx        # Room route handler
│   ├── types/
│   │   └── teleparty.types.ts  # TypeScript definitions
│   ├── utils/
│   │   └── nickname.ts         # Unique nickname generator
│   ├── App.tsx                 # Root component with routing
│   ├── main.tsx                # App entry point
│   └── index.css               # Global styles + Tailwind
├── index.html                  # HTML template with SPA redirect
├── package.json                # Dependencies and scripts
├── tailwind.config.js          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── vite.config.ts              # Vite configuration with basename
```

## 💡 Usage Guide

### Creating a Room

1. **Enter your nickname** (required)
2. **Choose an emoji icon** (optional)
3. Click **"Create New Room"**
4. Share the generated Room ID or use **"Share Link"** button

### Joining a Room

**Option 1: Via Home Page**
1. Enter your nickname and icon
2. Paste the Room ID in "Join Existing Room"
3. Click **"Join Room"**

**Option 2: Via Direct URL**
- Navigate to: `https://YOUR_SITE.com/room/ROOM_ID`
- If you have a saved nickname, you'll auto-join
- Otherwise, you'll be redirected to set up your profile

### Chatting

- **Send messages**: Type and press Enter (Shift+Enter for new line)
- **See typing indicators**: Watch for "..." when others type
- **View status**: Check bottom bar for connection state
- **Reconnect**: Use reconnect button if disconnected
- **Leave room**: Click "Leave Room" to return home

## 🎨 Key Features Explained

### Persistent Routing
- Room URLs like `/room/abc123` remain valid after refresh
- localStorage saves nickname and icon preferences
- Auto-reconnect to room on page reload

### Connection States
- 🟢 **Green**: Connected to WebSocket
- 🟡 **Yellow**: Connecting/Reconnecting
- 🔴 **Red**: Disconnected

### Message Types
- **Regular Messages**: Blue gradient (own) / Purple gradient (others)
- **System Messages**: Gray with italic text (join/leave events)

### Mobile Optimization
- Compact spacing and smaller text on mobile devices
- Touch-friendly buttons and inputs
- Responsive emoji grid (7 columns)
- Optimized message bubbles (85% width on mobile)

## 📦 Dependencies

### Production
- `react` & `react-dom` - UI framework
- `react-router-dom` - Client-side routing
- `teleparty-websocket-lib` - WebSocket client

### Development
- `@vitejs/plugin-react` - React plugin for Vite
- `typescript` - Type checking
- `tailwindcss` - Styling framework
- `gh-pages` - GitHub Pages deployment

## 🙏 Acknowledgments

- [Teleparty](https://www.teleparty.com/) for the WebSocket library
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
- [Vite](https://vitejs.dev/) for the blazing fast build tool
