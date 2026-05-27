"use client";

import { useEffect, useState } from "react";
import { BiosScreen } from "./BiosScreen";

export function BootScreen({ onComplete, playSound }: { onComplete: () => void; playSound: (name: string) => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tick = window.setInterval(() => setProgress((value) => Math.min(1, value + 0.08)), 180);

    const done = window.setTimeout(() => {
      playSound("startup");
      onComplete();
    }, 3000);
    
    return () => {
      window.clearInterval(tick);
      window.clearTimeout(done);
    };
  }, [onComplete, playSound]);

  return <BiosScreen progress={progress} />;
}
