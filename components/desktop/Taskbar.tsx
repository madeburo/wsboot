"use client";

import { DesktopWindow } from "@/lib/windows";
import { WSBootIcon } from "./WSBootIcon";
import { SystemTray } from "./SystemTray";

type Props = {
  windows: DesktopWindow[];
  activeId?: string;
  startOpen: boolean;
  muted: boolean;
  onStart: () => void;
  onTask: (instanceId: string) => void;
  onToggleMute: () => void;
};

export function Taskbar({ windows, activeId, startOpen, muted, onStart, onTask, onToggleMute }: Props) {
  return (
    <div
      className="fixed bottom-0 left-0 z-[4000] flex h-[28px] w-screen items-center gap-[3px] bg-[#c0c0c0] px-[2px]"
      style={{
        borderTop: "1px solid #ffffff",
        boxShadow: "inset 0 1px 0 #dfdfdf"
      }}
      onClick={(event) => event.stopPropagation()}
    >
      {/* Start Button */}
      <button
        className={`win-button taskbar-button flex h-[22px] items-center gap-[3px] px-[4px] font-bold text-[11px] ${startOpen ? "active" : ""}`}
        onClick={onStart}
        aria-label="Start"
        aria-pressed={startOpen}
      >
        <span className="start-logo">
          <span /><span /><span /><span />
        </span>
        <span>Start</span>
      </button>

      {/* Divider */}
      <div className="mx-[1px] h-[22px] w-[4px]" style={{ borderLeft: "1px solid #808080", borderRight: "1px solid #ffffff" }} />

      {/* Window buttons */}
      <div className="flex min-w-0 flex-1 gap-[2px] overflow-hidden">
        {windows.map((window) => (
          <button
            key={window.instanceId}
            className={`win-button taskbar-button flex h-[22px] min-w-[120px] max-w-[180px] items-center gap-[4px] truncate px-[4px] text-left text-[11px] ${
              activeId === window.instanceId && !window.minimized ? "active" : ""
            }`}
            onClick={() => onTask(window.instanceId)}
            aria-label={`Focus ${window.title}`}
          >
            <WSBootIcon type={window.icon} size={16} />
            <span className="truncate">{window.title}</span>
          </button>
        ))}
      </div>

      {/* System Tray */}
      <SystemTray muted={muted} onToggleMute={onToggleMute} />
    </div>
  );
}
