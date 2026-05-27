export const soundFiles: Record<string, string> = {
  startup: "/sounds/startup.mp3",
  click: "/sounds/click.mp3",
  open: "/sounds/open.mp3",
  close: "/sounds/close.mp3",
  error: "/sounds/error.mp3",
  notification: "/sounds/notification.mp3",
  music: "/sounds/music-click.mp3",
};

export const toneMap: Record<string, [number, number, OscillatorType]> = {
  startup: [523, 880, "sine"],
  click: [650, 0, "square"],
  open: [440, 660, "triangle"],
  close: [330, 220, "triangle"],
  error: [160, 110, "sawtooth"],
  notification: [784, 988, "sine"],
  music: [330, 392, "square"],
};
