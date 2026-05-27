import type { WindowId } from "./windows";

export const commands: Record<string, WindowId | "help"> = {
  about: "about",
  projects: "projects",
  contact: "contact",
  games: "games",
  music: "music",
  screensaver: "screensaver",
  help: "help",
};
