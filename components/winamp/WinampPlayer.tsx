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
      className="h-[18px] min-w-[24px] border border-[#000] bg-[#c6ccd8] px-1 text-[10px] font-bold text-[#1c2438] shadow-[inset_1px_1px_#fff,inset_-1px_-1px_#5a6270]"
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
    <div className="mx-auto w-[286px] bg-[#20233b] p-[3px] text-[#39ff14] shadow-[inset_1px_1px_#8289a0,inset_-1px_-1px_#000]">
      <div className="mb-[3px] flex h-[110px] flex-col border border-[#000] bg-[#282b46] p-[5px]">
        <div className="mb-[5px] flex items-center justify-between border-b border-[#777d98] pb-[2px] text-[10px] font-bold text-white">
          <span>WINAMP</span>
          <span className="text-[#d3d7e5]">- o x</span>
        </div>
        <div className="flex min-h-0 flex-1 gap-[6px]">
          <div className="w-[92px] border border-[#000] bg-[#060606] p-[4px] font-mono text-[8px]">
            <div className="mb-1 text-[#4eff2f]">{playing ? "PLAY" : "STOP"}</div>
            <div className="grid grid-cols-9 gap-[2px]">
              {Array.from({ length: 27 }, (_, index) => (
                <span key={index} className="h-[2px] w-[2px] bg-[#1d7f1d]" />
              ))}
            </div>
          </div>
          <div className="min-w-0 flex-1 font-mono">
            <div className="truncate bg-black px-1 py-[2px] text-[10px]">{tracks[track]}</div>
            <div className="mt-[4px] flex items-center justify-between text-[10px]">
              <span>128 kbps</span>
              <span>{String(Math.floor(progress / 2)).padStart(2, "0")}:00</span>
            </div>
            <div className="mt-[4px] h-[6px] border border-[#000] bg-[#111]">
              <div className="h-full bg-[#c79a32]" style={{ width: `${progress}%` }} />
            </div>
            <div className="mt-[6px] flex gap-[2px]">
              {button("|<", () => setTrack((track + tracks.length - 1) % tracks.length))}
              {button(">", () => setPlaying(true))}
              {button("||", () => setPlaying(false))}
              {button("[]", () => {
                setPlaying(false);
                setProgress(0);
              })}
              {button(">|", () => setTrack((track + 1) % tracks.length))}
            </div>
          </div>
        </div>
      </div>
      <Equalizer playing={playing} />
      <div className="my-[3px] border border-[#000] bg-[#282b46] p-[5px]">
        <label className="flex items-center gap-2 text-[10px] text-white">
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
