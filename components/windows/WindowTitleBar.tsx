"use client";

import { DesktopWindow } from "@/lib/windows";
import { Win95Icon } from "@/components/desktop/Win95Icon";

type Props = {
  window: DesktopWindow;
  active: boolean;
  onMinimize: () => void;
  onMaximize: () => void;
  onClose: () => void;
  onPointerDown: (event: React.PointerEvent<HTMLDivElement>) => void;
};

export function WindowTitleBar({ window, active, onMinimize, onMaximize, onClose, onPointerDown }: Props) {
  return (
    <div
      className={`flex h-[18px] items-center px-[2px] cursor-move select-none ${
        active
          ? "bg-gradient-to-r from-[#000080] to-[#1084d0]"
          : "bg-gradient-to-r from-[#808080] to-[#b5b5b5]"
      }`}
      onPointerDown={onPointerDown}
    >
      {/* Icon + Title */}
      <div className="flex flex-1 items-center gap-[3px] min-w-0">
        <Win95Icon type={window.icon} size={14} />
        <span className="truncate text-[11px] font-bold text-white">{window.title}</span>
      </div>

      {/* Window controls */}
      <div className="flex gap-[2px]">
        {/* Minimize */}
        <button
          onClick={onMinimize}
          className="flex h-[14px] w-[16px] items-end justify-center bg-[#c0c0c0] pb-[1px]"
          style={{
            boxShadow: "inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf"
          }}
          aria-label="Minimize"
        >
          <span className="block h-[2px] w-[6px] bg-black" />
        </button>
        {/* Maximize */}
        <button
          onClick={onMaximize}
          className="flex h-[14px] w-[16px] items-center justify-center bg-[#c0c0c0]"
          style={{
            boxShadow: "inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf"
          }}
          aria-label={window.maximized ? "Restore" : "Maximize"}
        >
          {window.maximized ? (
            <span className="relative">
              <span className="absolute -top-[1px] left-[1px] block h-[7px] w-[7px] border-[1px] border-black border-t-[2px]" />
              <span className="relative block h-[7px] w-[7px] border-[1px] border-black border-t-[2px] bg-[#c0c0c0]" />
            </span>
          ) : (
            <span className="block h-[8px] w-[9px] border-[1px] border-black border-t-[2px]" />
          )}
        </button>
        {/* Close */}
        <button
          onClick={onClose}
          className="flex h-[14px] w-[16px] items-center justify-center bg-[#c0c0c0]"
          style={{
            boxShadow: "inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf"
          }}
          aria-label="Close"
        >
          <svg width="8" height="7" viewBox="0 0 8 7" fill="none">
            <path d="M0 0L3 3.5L0 7H1L4 3.5L7 7H8L5 3.5L8 0H7L4 3.5L1 0H0Z" fill="#000"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
