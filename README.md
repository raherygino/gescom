# OPUS — Opérations Policières Unifiées sur le Système

A modern desktop application built with **Electron**, **React**, **Vite**, and **TypeScript** — featuring a polished UI inspired by VS Code, Obsidian, and Linear.

![Screenshot](/docs/screenshoots/01.png)

## Features

- **Custom Title Bar** — Frameless window with macOS traffic lights and Windows/Linux window controls, full drag regions, and focus-aware styling
- **Dashboard** — Overview with stats cards and recent activity feed
- **Notes** — Sidebar list with note editor, tags, search, and star/filter support
- **Settings** — Theme toggle, editor preferences, keyboard shortcuts reference
- **Command Palette** — `Ctrl/Cmd+P` with fuzzy search and keyboard navigation
- **Dark & Light Themes** — Persistent theme toggle with smooth transitions
- **Global Search** — Integrated search bar in the title bar
- **Resizable Sidebar** — Collapsible navigation panel with recent files and tags
- **Notification System** — Toast notifications for success/error/info/warning
- **Keyboard Shortcuts** — Full keyboard navigation throughout the app
- **Status Bar** — Connection status, git branch, theme indicator

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Desktop Runtime | Electron 33 |
| Frontend | React 18 + TypeScript |
| Build Tool | Vite 6 |
| Styling | Tailwind CSS 3 + shadcn/ui |
| State Management | Zustand |
| Server State | TanStack React Query |
| Routing | React Router 6 |
| Animations | Framer Motion |
| Icons | Lucide React |
| Packaging | Electron Builder |

## Prerequisites

- Node.js 18+
- npm 9+

## Installation

```bash
git clone <repo-url>
cd opus
npm install
```

## Development

Start the app in development mode with hot reload:

```bash
npm run electron:dev
```

This runs the Vite dev server and launches Electron simultaneously. The renderer process hot-reloads on file changes.

Or run just the web version (no Electron):

```bash
npm run dev
```

## Build

Build the renderer and Electron main process:

```bash
npm run build
```

Output: `dist/` (renderer) and `dist-electron/` (main + preload)

## Package for Distribution

```bash
npm run electron:build
```

This produces platform-specific installers in the `release/` directory using Electron Builder.

### Platform Targets

| Platform | Format |
|----------|--------|
| Windows | NSIS installer (`.exe`) |
| macOS | DMG (`.dmg`) |
| Linux | AppImage + deb |

## Code Quality

```bash
npm run typecheck    # TypeScript type checking (--noEmit)
npm run lint         # ESLint across src/
npm run format       # Prettier formatting
```

## Project Structure

```
opus/
├── electron/
│   ├── main.ts              # Main process (window, IPC, menus)
│   ├── preload.ts           # contextBridge API
│   └── electron.d.ts        # Type declarations
├── src/
│   ├── components/
│   │   ├── layout/          # App shell (sidebar, status bar)
│   │   ├── title-bar/       # Custom frameless title bar
│   │   │   ├── custom-title-bar.tsx
│   │   │   ├── window-controls.tsx   # Windows/Linux buttons
│   │   │   └── traffic-lights.tsx    # macOS traffic lights
│   │   └── ui/              # shadcn-style primitives
│   ├── pages/               # Route pages
│   ├── stores/              # Zustand stores
│   ├── hooks/               # Custom React hooks
│   ├── lib/utils.ts         # Utilities (cn, formatDate, etc.)
│   ├── types/               # TypeScript types
│   └── styles/globals.css   # Design tokens + theme
├── vite.config.ts           # Vite + electron plugin config
├── tailwind.config.ts       # Tailwind design system
└── electron-builder.yml     # Packaging config
```

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + P` | Open command palette |
| `Ctrl/Cmd + B` | Toggle sidebar |
| `Ctrl/Cmd + Shift + L` | Toggle theme |
| `G D` | Go to Dashboard |
| `G N` | Go to Notes |
| `G S` | Open Settings |
| `Escape` | Close modal/dialog |

## Architecture

- **Security**: `contextIsolation: true`, `nodeIntegration: false`, CSP enforced, all IPC through `contextBridge`
- **Theming**: CSS custom properties toggled by `dark`/`light` class on `<html>`, persisted via Zustand
- **Code Splitting**: Vite `manualChunks` splits vendor (React, Router) and UI (framer-motion, lucide) bundles
- **Title Bar**: `frame: false` with `titleBarStyle: "hidden"` — fully custom HTML/CSS title bar with platform-specific controls. The `draggable` CSS class enables window dragging; interactive elements use `no-drag`.

## License

MIT
