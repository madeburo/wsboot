"use client";

import { useClock } from "@/hooks/useClock";

export function SystemTray({ muted, onToggleMute }: { muted: boolean; onToggleMute: () => void }) {
  const time = useClock();
  return (
    <div
      className="ml-auto flex h-[22px] items-center gap-[6px] px-[8px] text-[11px]"
      style={{
        boxShadow: "inset -1px -1px #ffffff, inset 1px 1px #808080"
      }}
    >
      <button
        aria-label={muted ? "Unmute sound" : "Mute sound"}
        onClick={onToggleMute}
        className="desktop-icon-button flex items-center"
        title={muted ? "Sound: Off" : "Sound: On"}
      >
        {muted ? (
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M2 5h3l4-3v12l-4-3H2V5z" fill="#808080"/>
            <line x1="11" y1="5" x2="15" y2="11" stroke="#ff0000" strokeWidth="1.5"/>
            <line x1="15" y1="5" x2="11" y2="11" stroke="#ff0000" strokeWidth="1.5"/>
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M2 5h3l4-3v12l-4-3H2V5z" fill="#000"/>
            <path d="M11 5c1 1 1.5 2 1.5 3s-.5 2-1.5 3" stroke="#000" strokeWidth="1" fill="none"/>
            <path d="M13 3c2 2 2.5 4 2.5 5s-.5 3-2.5 5" stroke="#808080" strokeWidth="1" fill="none"/>
          </svg>
        )}
      </button>
      <span className="min-w-[52px] text-center tabular-nums">{time}</span>
    </div>
  );
}
