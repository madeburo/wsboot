"use client";

import { useRef, useState } from "react";

type Props = {
  onShare: () => void;
};

export function CornerWidget({ onShare }: Props) {
  const [selected, setSelected] = useState(false);
  const lastClick = useRef(0);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const now = Date.now();
    if (now - lastClick.current < 400) {
      onShare();
      setSelected(false);
    } else {
      setSelected(true);
    }
    lastClick.current = now;
  };

  return (
    <button
      className="fixed top-2 right-2 z-3500 flex h-[68px] w-[75px] flex-col items-center justify-start gap-[2px] p-[2px] text-white focus:outline-none cursor-default"
      onClick={handleClick}
      onBlur={() => setSelected(false)}
      title="Share WSBoot"
      aria-label="Share WSBoot"
    >
      <span
        className="flex items-center justify-center p-[2px]"
        style={selected ? { background: "rgba(0, 0, 128, 0.4)" } : undefined}
      >
        <img
          src="/share.png"
          alt=""
          width={32}
          height={32}
          draggable={false}
          style={{ imageRendering: "pixelated" }}
        />
      </span>
      <span
        className={`max-w-[72px] break-words text-center text-[11px] leading-[13px] px-[2px] py-[1px] ${
          selected
            ? "bg-[#000080] text-white outline outline-1 outline-dotted outline-white"
            : "text-white"
        }`}
        style={{ textShadow: selected ? "none" : "1px 1px 1px rgba(0,0,0,0.8)" }}
      >
        Share
      </span>
    </button>
  );
}
