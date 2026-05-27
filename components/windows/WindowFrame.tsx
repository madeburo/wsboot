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
  onResize: (width: number, height: number) => void;
};

export function WindowFrame({ window, active, children, onFocus, onClose, onMinimize, onMaximize, onMove, onResize }: Props) {
  const drag = useRef<{ dx: number; dy: number } | null>(null);
  const resize = useRef<{ x: number; y: number; width: number; height: number } | null>(null);

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
      onPointerMove={(event) => {
        if (drag.current) {
          onMove(event.clientX - drag.current.dx, event.clientY - drag.current.dy);
          return;
        }
        if (resize.current) {
          onResize(
            resize.current.width + event.clientX - resize.current.x,
            resize.current.height + event.clientY - resize.current.y,
          );
        }
      }}
      onPointerUp={() => {
        drag.current = null;
        resize.current = null;
      }}
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
      >
        {children}
      </div>
      {!window.maximized && (
        <button
          className="absolute bottom-[3px] right-[3px] h-[14px] w-[14px] cursor-se-resize"
          style={{
            background:
              "repeating-linear-gradient(135deg, transparent 0 3px, #808080 3px 4px, #ffffff 4px 5px)",
          }}
          aria-label="Resize window"
          onPointerDown={(event) => {
            event.stopPropagation();
            onFocus();
            resize.current = { x: event.clientX, y: event.clientY, width: window.width, height: window.height };
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
        />
      )}
    </div>
  );
}
