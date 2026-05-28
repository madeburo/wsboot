# WSBoot

A fully interactive Windows 98 desktop environment running in the browser. Boot sequence, draggable windows, working applications, games, and system sounds — pixel-perfect retro computing.

> Press any key to boot the web like it's 1998.

![WSBoot](https://img.shields.io/badge/WSBoot-v2.0-008080?style=flat-square)
![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=flat-square&logo=typescript)
![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)

## What is WSBoot?

**WSBoot** = Web System Boot

A complete desktop OS experience recreated in the browser. From BIOS POST to the "It's now safe to turn off your computer" screen — everything is interactive and functional.

## Features

### Desktop Environment
- BIOS POST → boot sequence → desktop
- Draggable desktop icons with grid snapping
- Right-click context menu (Arrange Icons, Line Up, Refresh, Properties)
- Window management — open, close, minimize, maximize, drag, resize, z-order
- Start Menu with program list and Shut Down
- Taskbar with Start button, quick launch, window buttons, system tray clock
- Keyboard shortcuts — Ctrl+Esc, Alt+F4, Enter to open

### Applications
- **Notepad** — text editor with File/Edit/Search/Format menus, word wrap
- **Paint** — full drawing app with pencil, brush, eraser, fill, shapes, color palette, undo
- **Internet Explorer** — loads real 1998 websites via Wayback Machine
- **MS-DOS Prompt** — command-line interface with working commands
- **Calculator** — functional calculator
- **Outlook Express** — email client UI
- **Norton Commander** — dual-pane file manager
- **Windows Media Player** — video playback
- **Winamp** — music player (frameless, authentic skin)
- **Screensavers** — Starfield, Pipes

### Games
- **Doom** — 3D raycasting FPS with enemies, weapons, 3 levels
- **Minesweeper** — classic mine-clearing puzzle
- **Solitaire** — card game
- **Snake** — arcade snake game

### System
- Sound effects via Web Audio API with oscillator fallback
- Screensaver activation after idle timeout
- Service worker for offline support
- Safe Mode boot option
- Shut Down with "It's now safe to turn off your computer" screen
- Share dialog for social sharing

## Tech Stack

- **Next.js 16** — App Router, Turbopack
- **React 19** — latest concurrent features
- **TypeScript 5.9** — strict type safety
- **Tailwind CSS 4** — utility-first styling + custom Win98 CSS
- **Web Audio API** — sound effects
- **Canvas API** — Paint app, Doom renderer
- **HTML5 Video** — Media Player
- **Service Worker** — offline caching

## Getting Started

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                        # Next.js App Router
│   ├── globals.css             # Win98 theme + Winamp styles
│   ├── layout.tsx              # Root layout, metadata, fonts
│   └── page.tsx                # Entry point
├── components/
│   ├── boot/                   # BIOS POST & boot screens
│   ├── desktop/                # Desktop, icons, taskbar, start menu, context menu
│   ├── games/                  # Doom, Minesweeper, Solitaire, Snake
│   ├── screensavers/           # Starfield, Pipes
│   ├── winamp/                 # Winamp player, equalizer, playlist
│   └── windows/                # Window frames & all application windows
├── hooks/                      # Custom React hooks
│   ├── useClock.ts             # System tray clock
│   ├── useDoubleClick.ts       # Desktop icon double-click
│   ├── useScreensaver.ts       # Idle timeout screensaver
│   ├── useServiceWorker.ts     # SW registration
│   ├── useSound.ts             # Audio playback
│   └── useWindowManager.ts     # Window state management
├── lib/                        # Shared data & types
│   ├── commands.ts             # MS-DOS commands
│   ├── projects.ts             # Project data
│   ├── sounds.ts               # Sound file mappings
│   └── windows.ts              # Window definitions & desktop icons
├── public/
│   ├── icons/                  # Desktop & app icons (PNG)
│   ├── sounds/                 # Audio files
│   ├── video/                  # Video files
│   ├── winamp/                 # Winamp audio tracks
│   └── sw.js                   # Service worker
└── next.config.ts              # Next.js configuration
```

## Security

- Iframe sandbox restricts embedded content (IE Browser)
- URL scheme validation blocks `javascript:`, `data:`, `blob:` URIs
- Service worker caches same-origin requests only with size limits
- No server-side code, API keys, or sensitive data
- All external resources loaded over HTTPS
- `crossorigin="anonymous"` on third-party font links

## Browser Support

Works in all modern browsers. Best experienced on desktop at 1024×768 or higher.

## License

MIT
