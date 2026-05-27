"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { soundFiles, toneMap } from "@/lib/sounds";

export function useSound() {
  const [enabled, setEnabled] = useState(false);
  const [muted, setMuted] = useState(false);
  const audioContext = useRef<AudioContext | null>(null);
  const audioCache = useRef<Record<string, HTMLAudioElement>>({});

  useEffect(() => {
    const enable = () => setEnabled(true);
    window.addEventListener("pointerdown", enable, { once: true });
    window.addEventListener("keydown", enable, { once: true });
    return () => {
      window.removeEventListener("pointerdown", enable);
      window.removeEventListener("keydown", enable);
    };
  }, []);

  const playTone = useCallback((name: string) => {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    audioContext.current ??= new AudioContextClass();
    const context = audioContext.current;
    const [a, b, type] = toneMap[name] ?? toneMap.click;
    const gain = context.createGain();
    gain.gain.setValueAtTime(0.05, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.18);
    gain.connect(context.destination);

    [a, b].filter(Boolean).forEach((frequency, index) => {
      const osc = context.createOscillator();
      osc.type = type;
      osc.frequency.value = frequency;
      osc.connect(gain);
      osc.start(context.currentTime + index * 0.055);
      osc.stop(context.currentTime + 0.18 + index * 0.055);
    });
  }, []);

  const playSound = useCallback(
    (name: string) => {
      if (!enabled || muted) return;
      const src = soundFiles[name];
      if (src) {
        audioCache.current[name] ??= new Audio(src);
        const audio = audioCache.current[name];
        audio.currentTime = 0;
        audio.play().catch(() => playTone(name));
        return;
      }
      playTone(name);
    },
    [enabled, muted, playTone],
  );

  return { playSound, muted, setMuted, enabled };
}

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}
