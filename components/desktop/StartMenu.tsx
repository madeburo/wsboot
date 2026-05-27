"use client";

import type { WindowId } from "@/lib/windows";
import { WSBootIcon } from "./WSBootIcon";

type Props = {
  onOpen: (id: WindowId) => void;
  onScreensaver: () => void;
  onShutdown: () => void;
};

export function StartMenu({ onOpen, onScreensaver, onShutdown }: Props) {
  const programs: Array<[WindowId, string, string]> = [
    ["about", "About Me", "profile"],
    ["projects", "My Projects", "folder"],
    ["contact", "Contact", "mail"],
    ["games", "Games", "joystick"],
    ["music", "Winamp", "winamp"],
    ["norton", "Norton Commander", "norton"],
    ["paint", "Paint", "paint"],
  ];

  return (
    <div
      className="fixed bottom-[28px] left-0 z-[4500] flex w-[220px] bg-[#c0c0c0]"
      style={{
        boxShadow: "inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf"
      }}
      onClick={(event) => event.stopPropagation()}
    >
      {/* Side banner */}
      <div className="flex w-[26px] items-end justify-center bg-[#000080]" style={{ paddingBottom: "8px" }}>
        <div className="-rotate-90 whitespace-nowrap text-[12px] font-bold tracking-wider">
          <span className="text-[#b0b0b0]">WS</span><span className="text-white">Boot</span>
        </div>
      </div>

      {/* Menu items */}
      <div className="flex-1 py-[3px]">
        {/* Programs */}
        <div className="px-[4px] py-[1px] text-[11px] font-bold text-[#808080]">Programs</div>
        <div className="mx-[3px] my-[2px] h-[1px] bg-[#808080] shadow-[0_1px_0_#fff]" />
        
        {programs.map(([id, label, icon]) => (
          <button
            key={id}
            className="menu-command flex items-center gap-[8px] py-[3px]"
            onClick={() => onOpen(id)}
          >
            <WSBootIcon type={icon} size={16} />
            <span>{label}</span>
          </button>
        ))}

        <div className="mx-[3px] my-[2px] h-[1px] bg-[#808080] shadow-[0_1px_0_#fff]" />

        {/* Settings & utilities */}
        <button className="menu-command flex items-center gap-[8px] py-[3px]" onClick={() => onOpen("settings")}>
          <WSBootIcon type="settings" size={16} />
          <span>Settings</span>
        </button>
        <button className="menu-command flex items-center gap-[8px] py-[3px]" onClick={onScreensaver}>
          <WSBootIcon type="monitor" size={16} />
          <span>Screensaver</span>
        </button>
        <button className="menu-command flex items-center gap-[8px] py-[3px]" onClick={() => onOpen("run")}>
          <WSBootIcon type="run" size={16} />
          <span>Run...</span>
        </button>

        <div className="mx-[3px] my-[2px] h-[1px] bg-[#808080] shadow-[0_1px_0_#fff]" />

        {/* Shut Down */}
        <button className="menu-command flex items-center gap-[8px] py-[3px]" onClick={onShutdown}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="2" width="12" height="12" fill="#c0c0c0" stroke="#808080"/>
            <rect x="4" y="4" width="8" height="8" fill="#ff0000"/>
            <rect x="6" y="3" width="4" height="3" fill="#c0c0c0"/>
            <rect x="7" y="2" width="2" height="5" fill="#000"/>
          </svg>
          <span>Shut Down...</span>
        </button>
      </div>
    </div>
  );
}
