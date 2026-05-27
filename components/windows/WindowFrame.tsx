"use client";

import { useRef } from "react";
import { DesktopWindow } from "@/lib/windows";
import { WindowTitleBar } from "./WindowTitleBar";

type Props = {
  window: DesktopWindow;
  active: boolean;
  children: React.ReactNode;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onMove: (x: number, y: number) => void;
};

export function WindowFrame({ window, active, children, onFocus, onClose, onMinimize, onMaximize, onMove }: Props) {
  const drag = useRef<{ dx: number; dy: number } | null>(null);

  const style = window.maximized
    ? { left: 0, top: 0, width: "100vw", height: "calc(100vh - 28px)", zIndex: window.zIndex }
    : { left: window.x, top: window.y, width: window.width, height: window.height, zIndex: window.zIndex };

  return (
    <div
      className={`fixed flex flex-col bg-[#c0c0c0] ${window.minimized ? "hidden" : ""}`}
      style={{
        ...style,
        boxShadow: "inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf",
        padding: "3px",
      }}
      onPointerDown={onFocus}
      role="dialog"
      aria-label={window.title}
    >
      <WindowTitleBar
        window={window}
        active={active}
        onMinimize={onMinimize}
        onMaximize={onMaximize}
        onClose={onClose}
        onPointerDown={(event) => {
          if (window.maximized || globalThis.window.innerWidth < 640) return;
          onFocus();
          drag.current = { dx: event.clientX - window.x, dy: event.clientY - window.y };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
      />
      <div
        className="min-h-0 flex-1 overflow-auto bg-[#c0c0c0] mt-[2px]"
        onPointerMove={(event) => {
          if (!drag.current) return;
          onMove(event.clientX - drag.current.dx, event.clientY - drag.current.dy);
        }}
        onPointerUp={() => {
          drag.current = null;
        }}
      >
        {children}
      </div>
    </div>
  );
}
