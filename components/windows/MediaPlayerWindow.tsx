"use client";

import { useEffect, useRef, useState } from "react";
import type { WindowComponentProps } from "@/lib/windows";

export function MediaPlayerWindow({ playSound }: WindowComponentProps) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/sounds/windows-98-startup-sound.mp3");
    return () => {
      audioRef.current?.pause();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const play = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().catch(() => playSound("startup"));
    setPlaying(true);
    setProgress(0);

    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (audio.duration) {
        const pct = (audio.currentTime / audio.duration) * 100;
        setProgress(pct);
        if (audio.ended) {
          setPlaying(false);
          setProgress(0);
          clearInterval(intervalRef.current!);
        }
      }
    }, 100);
  };

  const pause = () => {
    audioRef.current?.pause();
    setPlaying(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const stop = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setPlaying(false);
    setProgress(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  return (
    <div className="flex flex-col h-full bg-[#c0c0c0]">
      {/* Menu bar */}
      <div className="flex items-center h-[20px] px-1 border-b border-[#808080] text-[11px]">
        <span className="px-2 hover:underline cursor-default">File</span>
        <span className="px-2 hover:underline cursor-default">View</span>
        <span className="px-2 hover:underline cursor-default">Play</span>
        <span className="px-2 hover:underline cursor-default">Navigate</span>
        <span className="px-2 hover:underline cursor-default">Favorites</span>
        <span className="px-2 hover:underline cursor-default">Help</span>
      </div>

      {/* Video area — Windows logo animation */}
      <div className="flex-1 bg-black flex items-center justify-center mx-1 mt-1">
        <div className="relative">
          {/* Windows flag logo */}
          <svg width="120" height="100" viewBox="0 0 120 100" fill="none">
            <g transform="translate(20, 10) rotate(-5)">
              {/* Red */}
              <rect x="0" y="0" width="35" height="35" fill="#ff0000" rx="2" transform="skewY(-5) skewX(-3)" />
              {/* Green */}
              <rect x="40" y="0" width="35" height="35" fill="#00b800" rx="2" transform="skewY(-5) skewX(-3)" />
              {/* Blue */}
              <rect x="0" y="40" width="35" height="35" fill="#0000ff" rx="2" transform="skewY(-5) skewX(-3)" />
              {/* Yellow */}
              <rect x="40" y="40" width="35" height="35" fill="#ffb800" rx="2" transform="skewY(-5) skewX(-3)" />
            </g>
          </svg>
          {playing && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-ping" />
            </div>
          )}
        </div>
      </div>

      {/* Track info */}
      <div className="flex items-center h-[22px] mx-1 mt-1 px-2 border-2 bg-white text-[10px]" style={{ borderColor: "#808080 #dfdfdf #dfdfdf #808080" }}>
        <span className="text-[10px]">🔊</span>
        <span className="ml-1">The Microsoft Sound.wav</span>
      </div>

      {/* Transport controls */}
      <div className="flex items-center gap-1 mx-1 mt-1 mb-1 px-1">
        <button onClick={play} className="win-button w-[24px] h-[22px] flex items-center justify-center text-[12px]" title="Play">▶</button>
        <button onClick={pause} className="win-button w-[24px] h-[22px] flex items-center justify-center text-[10px]" title="Pause">⏸</button>
        <button onClick={stop} className="win-button w-[24px] h-[22px] flex items-center justify-center text-[10px]" title="Stop">⏹</button>
        <button className="win-button w-[24px] h-[22px] flex items-center justify-center text-[10px]" title="Previous">⏮</button>
        <button className="win-button w-[24px] h-[22px] flex items-center justify-center text-[10px]" title="Rewind">⏪</button>
        <button className="win-button w-[24px] h-[22px] flex items-center justify-center text-[10px]" title="Fast Forward">⏩</button>
        <button className="win-button w-[24px] h-[22px] flex items-center justify-center text-[10px]" title="Next">⏭</button>
        <div className="flex-1" />
        <span className="text-[10px]">🔊</span>
        <div className="w-[60px] h-[8px] border border-[#808080] bg-white ml-1">
          <div className="h-full bg-[#000080]" style={{ width: "70%" }} />
        </div>
      </div>

      {/* Progress bar */}
      <div className="mx-1 mb-1 h-[12px] border-2 bg-[#000]" style={{ borderColor: "#808080 #dfdfdf #dfdfdf #808080" }}>
        <div
          className="h-full bg-[#00c800] transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
