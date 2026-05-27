"use client";

import { WSBootIcon } from "./WSBootIcon";

type Props = {
  id: string;
  label: string;
  icon: string;
  selected: boolean;
  onClick: () => void;
  onContextMenu: (event: React.MouseEvent) => void;
};

export function DesktopIcon({ label, icon, selected, onClick, onContextMenu }: Props) {
  return (
    <button
      className="desktop-icon-button group flex h-[64px] w-[82px] flex-col items-center justify-start gap-[1px] p-0 text-white focus:outline-none"
      title={label}
      onClick={onClick}
      onContextMenu={onContextMenu}
      aria-label={label}
    >
      <span className={`flex items-center justify-center ${selected ? "brightness-75 contrast-150" : ""}`} style={selected ? { filter: "brightness(0.7) saturate(2) hue-rotate(180deg)" } : {}}>
        <WSBootIcon type={icon} size={30} />
      </span>
      <span
        className={`desktop-icon-label max-w-[82px] break-words text-center text-[11px] leading-[12px] px-[3px] ${
          selected ? "bg-[#000080] text-white" : "bg-[#2c8379] text-white"
        }`}
      >
        {label}
      </span>
    </button>
  );
}
