"use client";

import { useEffect, useState } from "react";
import { Equalizer } from "./Equalizer";
import { Playlist } from "./Playlist";

const tracks = ["boot_sector_dreams.mod", "teal_desktop_radio.xm", "floppy_afterhours.it", "system_ready.wav"];

export function WinampPlayer({ playSound }: { playSound: (name: string) => void }) {
  const [playing, setPlaying] = useState(false);
  const [track, setTrack] = useState(0);
  const [progress, setProgress] = useState(24);
  const [volume, setVolume] = useState(65);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setProgress((value) => (value + 2) % 100), 450);
    return () => window.clearInterval(timer);
  }, [playing]);

  const button = (label: string, action: () => void) => (
    <button
      className="win-button h-7 min-w-8 px-2"
      onClick={() => {
        playSound("music");
        action();
      }}
      aria-label={label}
    >
      {label}
    </button>
  );

  return (
    <div className="win-bevel bg-[#2b2b48] p-2 text-[#3dff54]">
      <div className="mb-2 flex items-center justify-between bg-black p-2 font-mono">
        <div>
          <div className="text-lg">{playing ? "PLAY" : "STOP"}</div>
          <div className="max-w-[260px] truncate">{tracks[track]}</div>
        </div>
        <div className="text-right text-xl">{String(Math.floor(progress / 2)).padStart(2, "0")}:00</div>
      </div>
      <Equalizer playing={playing} />
      <div className="my-2 h-4 bg-black p-1">
        <div className="h-full bg-[#3dff54]" style={{ width: `${progress}%` }} />
      </div>
      <div className="mb-2 flex flex-wrap items-center gap-1">
        {button("⏮", () => setTrack((track + tracks.length - 1) % tracks.length))}
        {button("▶", () => setPlaying(true))}
        {button("⏸", () => setPlaying(false))}
        {button("■", () => {
          setPlaying(false);
          setProgress(0);
        })}
        {button("⏭", () => setTrack((track + 1) % tracks.length))}
        <label className="ml-auto flex items-center gap-2 text-white">
          Vol
          <input className="range-retro" type="range" min="0" max="100" value={volume} onChange={(event) => setVolume(Number(event.target.value))} />
        </label>
      </div>
      <Playlist active={track} onSelect={(index) => {
        playSound("music");
        setTrack(index);
      }} />
    </div>
  );
}
