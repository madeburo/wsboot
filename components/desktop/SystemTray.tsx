"use client";

import { useClock } from "@/hooks/useClock";

export function SystemTray({ muted, onToggleMute }: { muted: boolean; onToggleMute: () => void }) {
  const time = useClock();
  return (
    <div
      className="ml-auto flex h-[22px] items-center gap-[3px] px-[4px] text-[11px]"
      style={{
        border: "1px solid transparent",
        borderColor: "#808080 #ffffff #ffffff #808080",
        boxShadow: "inset 1px 1px #dfdfdf"
      }}
    >
      <span className="relative inline-block h-[14px] w-[14px]" aria-hidden="true">
        <span className="absolute left-[1px] top-[1px] h-[8px] w-[8px] border border-[#000080] bg-white" />
        <span className="absolute bottom-[1px] right-[1px] h-[8px] w-[8px] border border-[#800000] bg-white" />
        <span className="absolute bottom-0 right-0 h-[5px] w-[5px] rounded-full border border-[#800000] bg-[#ff0000]" />
      </span>
      <button
        aria-label={muted ? "Unmute sound" : "Mute sound"}
        onClick={onToggleMute}
        className="desktop-icon-button flex h-[16px] w-[16px] items-center justify-center text-[11px]"
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
      <span className="relative inline-block h-[14px] w-[14px]" aria-hidden="true">
        <span className="absolute left-[1px] top-[2px] h-[10px] w-[11px] border border-black bg-[#0039c7]" />
        <span className="absolute left-[3px] top-[4px] h-[6px] w-[7px] bg-[linear-gradient(135deg,#ff0000_0_24%,#ffff00_24%_48%,#00aa00_48%_72%,#0000ff_72%)]" />
      </span>
      <span className="min-w-[54px] pl-[5px] text-right">{time}</span>
    </div>
  );
}
