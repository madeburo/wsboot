"use client";

import { BiosScreen } from "./BiosScreen";
import { soundFiles } from "@/lib/sounds";

export type BootMode = "normal" | "logged" | "safe" | "command";

export function BootScreen({
  onComplete,
  playSound,
}: {
  onComplete: (mode: BootMode) => void;
  playSound: (name: string) => void;
}) {
  const handleComplete = (mode: BootMode) => {
    // Try playing startup sound directly (bypasses enabled check)
    // This works because user has already interacted during BIOS (key press or click)
    const src = soundFiles.startup;
    if (src) {
      const audio = new Audio(src);
      audio.play().catch(() => {
        // If autoplay blocked, fall back to hook (will play on next interaction)
        playSound("startup");
      });
    } else {
      playSound("startup");
    }
    onComplete(mode);
  };

  return <BiosScreen onComplete={handleComplete} />;
}
