import type { ReactNode } from "react";

export type WindowId =
  | "about"
  | "calculator"
  | "computer"
  | "defrag"
  | "internet"
  | "ie-browser"
  | "msdos"
  | "projects"
  | "contact"
  | "games"
  | "music"
  | "norton"
  | "paint"
  | "screensaver"
  | "run"
  | "settings"
  | "share"
  | "project-details";

export type DesktopWindow = {
  instanceId: string;
  id: WindowId;
  title: string;
  icon: string;
  x: number;
  y: number;
  width: number;
  height: number;
  minimized: boolean;
  maximized: boolean;
  zIndex: number;
  payload?: string;
};

export type WindowDefinition = {
  id: WindowId;
  title: string;
  icon: string;
  width: number;
  height: number;
  minWidth?: number;
  minHeight?: number;
};

export type WindowComponentProps = {
  window: DesktopWindow;
  openWindow: (id: WindowId, payload?: string) => void;
  closeWindow: (instanceId: string) => void;
  notify: (message: string) => void;
  playSound: (sound: string) => void;
  startScreensaver: (mode?: "pipes" | "stars") => void;
};

export const windowDefinitions: Record<WindowId, WindowDefinition> = {
  about: { id: "about", title: "About Me", icon: "computer", width: 520, height: 430 },
  calculator: { id: "calculator", title: "Calculator", icon: "calculator", width: 260, height: 320 },
  computer: { id: "computer", title: "My Computer", icon: "computer", width: 660, height: 450 },
  defrag: { id: "defrag", title: "Defragmenting Drive C", icon: "computer", width: 580, height: 420 },
  internet: { id: "internet", title: "Connecting to WSBoot Net...", icon: "ie", width: 380, height: 340 },
  "ie-browser": { id: "ie-browser", title: "Microsoft Internet Explorer", icon: "ie", width: 760, height: 520 },
  msdos: { id: "msdos", title: "MS-DOS Prompt", icon: "prompt", width: 640, height: 400 },
  projects: { id: "projects", title: "Projects", icon: "folder", width: 720, height: 500 },
  contact: { id: "contact", title: "Contact", icon: "mail", width: 500, height: 380 },
  games: { id: "games", title: "Games", icon: "joystick", width: 760, height: 560 },
  music: { id: "music", title: "Winamp", icon: "winamp", width: 310, height: 470 },
  norton: { id: "norton", title: "Norton Commander", icon: "norton", width: 760, height: 500 },
  paint: { id: "paint", title: "untitled - Paint", icon: "paint", width: 760, height: 500 },
  screensaver: { id: "screensaver", title: "Screensaver", icon: "monitor", width: 460, height: 330 },
  run: { id: "run", title: "Run", icon: "run", width: 420, height: 210 },
  settings: { id: "settings", title: "Settings", icon: "settings", width: 520, height: 380 },
  share: { id: "share", title: "Send to a Friend", icon: "mail", width: 380, height: 460 },
  "project-details": {
    id: "project-details",
    title: "Project Details",
    icon: "app",
    width: 460,
    height: 330,
  },
};

export type RenderWindow = (props: WindowComponentProps) => ReactNode;

export type DesktopIconDefinition = {
  id: string;
  label: string;
  icon: string;
  windowId?: WindowId;
  message?: string;
};

export const desktopIcons: DesktopIconDefinition[] = [
  { id: "computer", label: "My Computer", icon: "computer", windowId: "computer" },
  { id: "internet", label: "Internet Explorer", icon: "ie", windowId: "internet" },
  { id: "documents", label: "My Documents", icon: "documents", windowId: "projects" },
  { id: "winamp", label: "Winamp", icon: "winamp", windowId: "music" },
  { id: "recycle", label: "Recycle Bin", icon: "trash", message: "Recycle Bin is empty. Very responsible." },
  { id: "prompt", label: "MS-DOS Prompt", icon: "prompt", windowId: "msdos" },
  { id: "paint", label: "Paint", icon: "paint", windowId: "paint" },
  { id: "doom", label: "Doom", icon: "doom", windowId: "games" },
  { id: "calculator", label: "Calculator", icon: "calculator", windowId: "calculator" },
  { id: "pictures", label: "My Pictures", icon: "folder", windowId: "projects" },
  { id: "themes", label: "Themes", icon: "folder", windowId: "settings" },
  { id: "pinball", label: "Pinball", icon: "pinball", windowId: "games" },
  { id: "credits", label: "CREDITS.txt", icon: "notepad", windowId: "about" },
  { id: "minesweeper", label: "Minesweeper", icon: "mine", windowId: "games" },
  { id: "solitaire", label: "Solitaire", icon: "cards", windowId: "games" },
  { id: "notepad", label: "Notepad", icon: "notepad", windowId: "about" },
  { id: "share", label: "Share", icon: "share", windowId: "share" },
];
