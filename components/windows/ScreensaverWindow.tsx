"use client";

import type { WindowComponentProps } from "@/lib/windows";

export function ScreensaverWindow({ startScreensaver }: WindowComponentProps) {
  return (
    <div className="space-y-3">
      <div className="win-bevel-inset bg-white p-3">
        Choose a screensaver. Any mouse movement or key exits the show.
      </div>
      <div className="grid gap-2">
        <button className="win-button text-left" onClick={() => startScreensaver("logos")}>
          Flying Windows Logo style
        </button>
        <button className="win-button text-left" onClick={() => startScreensaver("pipes")}>
          Pipes style
        </button>
        <button className="win-button text-left" onClick={() => startScreensaver("stars")}>
          Starfield
        </button>
      </div>
    </div>
  );
}
