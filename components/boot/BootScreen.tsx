"use client";

import { BiosScreen } from "./BiosScreen";

export type BootMode = "normal" | "logged" | "safe" | "command";

export function BootScreen({
  onComplete,
  playSound,
}: {
  onComplete: (mode: BootMode) => void;
  playSound: (name: string) => void;
}) {
  const handleComplete = (mode: BootMode) => {
    playSound("startup");
    onComplete(mode);
  };

  return <BiosScreen onComplete={handleComplete} />;
}
