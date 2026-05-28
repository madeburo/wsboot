import type { WindowId } from "./windows";

export const commands: Record<string, WindowId | "help"> = {
  about: "about",
  projects: "projects",
  games: "games",
  music: "music",
  screensaver: "screensaver",
  defrag: "defrag",
  calculator: "calculator",
  calc: "calculator",
  msdos: "msdos",
  cmd: "msdos",
  paint: "paint",
  help: "help",
};
