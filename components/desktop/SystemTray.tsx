"use client";

import { useClock } from "@/hooks/useClock";

export function SystemTray({ muted, onToggleMute }: { muted: boolean; onToggleMute: () => void }) {
  const time = useClock();
  return (
    <div
      className="ml-auto flex h-[22px] items-center gap-[6px] px-[6px] text-[11px]"
      style={{
        boxShadow: "inset -1px -1px #ffffff, inset 1px 1px #808080, inset -2px -2px #dfdfdf, inset 2px 2px #0a0a0a"
      }}
    >
      <button
        aria-label={muted ? "Unmute sound" : "Mute sound"}
        onClick={onToggleMute}
        className="flex items-center text-[11px]"
      >
        {muted ? (
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M2 5h3l4-3v12l-4-3H2V5z" fill="#000"/>
            <line x1="12" y1="4" x2="12" y2="12" stroke="#ff0000" strokeWidth="2"/>
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M2 5h3l4-3v12l-4-3H2V5z" fill="#000"/>
            <path d="M11 4c1 1 1.5 2.5 1.5 4s-.5 3-1.5 4" stroke="#000" strokeWidth="1" fill="none"/>
            <path d="M13 2c2 2 3 4.5 3 6s-1 4-3 6" stroke="#000" strokeWidth="1" fill="none"/>
          </svg>
        )}
      </button>
      <span className="min-w-[50px] text-right">{time}</span>
    </div>
  );
}
