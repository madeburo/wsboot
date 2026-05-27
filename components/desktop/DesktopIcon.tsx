"use client";

import { Win95Icon } from "./Win95Icon";

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
      className="group flex h-[70px] w-[70px] flex-col items-center justify-start gap-[2px] p-1 text-white focus:outline-none"
      title={label}
      onClick={onClick}
      onContextMenu={onContextMenu}
      aria-label={label}
    >
      <span className={`flex items-center justify-center ${selected ? "brightness-75 contrast-150" : ""}`} style={selected ? { filter: "brightness(0.7) saturate(2) hue-rotate(180deg)" } : {}}>
        <Win95Icon type={icon} size={32} />
      </span>
      <span
        className={`desktop-icon-label max-w-[64px] break-words text-center text-[11px] leading-[13px] px-[2px] ${
          selected ? "bg-[#000080] text-white" : "text-white"
        }`}
      >
        {label}
      </span>
    </button>
  );
}
