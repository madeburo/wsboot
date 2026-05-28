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
        className="flex items-center justify-center w-[48px] h-[48px] cursor-pointer transition-transform hover:scale-110"
        title="Share WSBoot"
        aria-label="Share WSBoot"
      >
        <img
          src="/share.png"
          alt="Share"
          width={40}
          height={40}
          draggable={false}
          style={{ imageRendering: "pixelated" }}
        />
      </button>
      {hovered && (
        <div className="mt-1 px-2 py-0.5 bg-[#ffffe1] border border-[#000] text-[10px] whitespace-nowrap shadow-sm">
          Share WSBoot
        </div>
      )}
    </div>
  );
}
