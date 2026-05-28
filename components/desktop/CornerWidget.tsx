"use client";

import { useState } from "react";

type Props = {
  onShare: () => void;
};

export function CornerWidget({ onShare }: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed top-2 right-2 z-[3500] flex flex-col items-center">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onShare();
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="flex flex-col items-center justify-center w-[56px] h-[56px] rounded-full border-2 transition-all cursor-pointer"
        style={{
          background: hovered
            ? "radial-gradient(circle, #4080ff 0%, #002080 100%)"
            : "radial-gradient(circle, #2060d0 0%, #001050 100%)",
          borderColor: hovered ? "#80b0ff" : "#4080c0",
          boxShadow: hovered
            ? "0 0 12px rgba(64,128,255,0.6)"
            : "0 2px 6px rgba(0,0,0,0.4)",
        }}
        title="Share WSBoot"
        aria-label="Share WSBoot"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="15" cy="4" r="3" fill="#fff" />
          <circle cx="15" cy="16" r="3" fill="#fff" />
          <circle cx="5" cy="10" r="3" fill="#fff" />
          <line x1="7.5" y1="8.5" x2="12.5" y2="5.5" stroke="#fff" strokeWidth="1.5" />
          <line x1="7.5" y1="11.5" x2="12.5" y2="14.5" stroke="#fff" strokeWidth="1.5" />
        </svg>
        <span className="text-[8px] text-white font-bold mt-0.5">share</span>
      </button>
      {hovered && (
        <div className="mt-1 px-2 py-0.5 bg-[#ffffe1] border border-[#000] text-[10px] whitespace-nowrap shadow-sm">
          Share WSBoot
        </div>
      )}
    </div>
  );
}
