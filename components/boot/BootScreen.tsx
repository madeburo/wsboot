"use client";

import { useEffect, useState } from "react";
import { BiosScreen } from "./BiosScreen";
import { WindowsLoadingScreen } from "./WindowsLoadingScreen";

export function BootScreen({ onComplete, playSound }: { onComplete: () => void; playSound: (name: string) => void }) {
  const [phase, setPhase] = useState<"bios" | "windows">("bios");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // BIOS text appears gradually
    const tick = window.setInterval(() => setProgress((value) => Math.min(1, value + 0.08)), 180);
    
    // Switch to Windows loading screen after BIOS
    const toWindows = window.setTimeout(() => {
      setPhase("windows");
      setProgress(1);
    }, 2800);
    
    // Boot complete - show desktop
    const done = window.setTimeout(() => {
      playSound("startup");
      onComplete();
    }, 5200);
    
    return () => {
      window.clearInterval(tick);
      window.clearTimeout(toWindows);
      window.clearTimeout(done);
    };
  }, [onComplete, playSound]);

  return phase === "bios" ? <BiosScreen progress={progress} /> : <WindowsLoadingScreen />;
}
