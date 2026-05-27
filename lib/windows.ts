import type { ReactNode } from "react";

export type WindowId =
  | "about"
  | "projects"
  | "contact"
  | "games"
  | "music"
  | "screensaver"
  | "run"
  | "settings"
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
  startScreensaver: (mode?: "logos" | "pipes" | "stars") => void;
};

export const windowDefinitions: Record<WindowId, WindowDefinition> = {
  about: { id: "about", title: "About Me", icon: "computer", width: 520, height: 430 },
  projects: { id: "projects", title: "Projects", icon: "folder", width: 720, height: 500 },
  contact: { id: "contact", title: "Contact", icon: "mail", width: 500, height: 380 },
  games: { id: "games", title: "Games", icon: "joystick", width: 760, height: 560 },
  music: { id: "music", title: "Music", icon: "music", width: 570, height: 430 },
  screensaver: { id: "screensaver", title: "Screensaver", icon: "monitor", width: 460, height: 330 },
  run: { id: "run", title: "Run", icon: "run", width: 420, height: 210 },
  settings: { id: "settings", title: "Settings", icon: "settings", width: 520, height: 380 },
  "project-details": {
    id: "project-details",
    title: "Project Details",
    icon: "app",
    width: 460,
    height: 330,
  },
};

export type RenderWindow = (props: WindowComponentProps) => ReactNode;

export const desktopIcons: Array<{ id: WindowId | "computer" | "recycle"; label: string; icon: string }> = [
  { id: "computer", label: "My Computer", icon: "computer" },
  { id: "recycle", label: "Recycle Bin", icon: "trash" },
  { id: "about", label: "About Me", icon: "profile" },
  { id: "projects", label: "My Projects", icon: "folder" },
  { id: "contact", label: "Contact", icon: "mail" },
  { id: "games", label: "Games", icon: "joystick" },
  { id: "music", label: "Music", icon: "music" },
  { id: "screensaver", label: "Screen Saver", icon: "monitor" },
];
