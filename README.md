# WSBoot

A retro web desktop environment inspired by the Windows 95/98 era.

Boot sequence, draggable windows, Start menu, taskbar, mini-games, Winamp-style music player, screensavers, and system sounds — all running in the browser.

> Press any key to boot the web like it's 1998.

![Windows 98](https://img.shields.io/badge/Windows-98-008080?style=flat-square)
![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=flat-square&logo=typescript)

## What is WSBoot?

**WSBoot** = Web System Boot

A fully interactive desktop environment that runs in your browser. Everything from the BIOS POST screen to the shutdown dialog is recreated with pixel-perfect attention to the Windows 95 aesthetic.

## Features

- **Boot sequence** — BIOS POST → Windows 95 loading screen with progress bar
- **Desktop** — draggable icons, right-click context menu, teal wallpaper
- **Window management** — open, close, minimize, maximize, drag, z-order stacking
- **Start Menu** — classic side banner, program list, Shut Down
- **Taskbar** — Start button with Windows logo, window buttons, system tray clock
- **Applications:**
  - About Me
  - My Projects (file explorer style)
  - Contact (network neighborhood)
  - Games — Minesweeper, Solitaire, Snake
  - Music Player (Winamp-inspired)
  - Screensavers — Flying logos, Pipes, Starfield
  - Settings — display & sound
  - Run dialog
- **Shut Down** — "It's now safe to turn off your computer"
- **Sound effects** — Web Audio API with oscillator fallback
- **Keyboard shortcuts** — Ctrl+Esc, Alt+F4, Escape
- **Responsive** — works on mobile

## Tech Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19**, TypeScript
- **Tailwind CSS 4** + [98.css](https://jdan.github.io/98.css/)
- **Custom SVG icons** in Windows 95 style
- **Web Audio API**

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3033](http://localhost:3033)

```bash
# Production build
npm run build
npm start
```

## Project Structure

```
├── app/                    # Next.js app router
│   ├── globals.css         # Win95 theme
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Entry point
├── components/
│   ├── boot/               # BIOS & loading screens
│   ├── desktop/            # Desktop, icons, taskbar, start menu
│   ├── games/              # Minesweeper, Solitaire, Snake
│   ├── screensavers/       # Flying logos, Pipes, Starfield
│   ├── winamp/             # Music player
│   └── windows/            # Window frames & app content
├── hooks/                  # React hooks
├── lib/                    # Data & types
└── public/sounds/          # Audio files
```

## License

MIT
