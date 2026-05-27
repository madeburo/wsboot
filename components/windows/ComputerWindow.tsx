"use client";

import { WSBootIcon } from "@/components/desktop/WSBootIcon";
import type { WindowComponentProps } from "@/lib/windows";
import { MenuBar } from "./MenuBar";

const items = [
  { label: "(C:)", icon: "drive", hint: "Local Disk" },
  { label: "(D:)", icon: "cd", hint: "Compact Disc" },
  { label: "Printers", icon: "printer", hint: "System folder" },
  { label: "Control Panel", icon: "settings", hint: "System folder" },
  { label: "Dial-Up Networking", icon: "network", hint: "System folder" },
  { label: "Scheduled Tasks", icon: "tasks", hint: "System folder" },
  { label: "Web Folders", icon: "webfolders", hint: "System folder" },
];

export function ComputerWindow({ notify }: WindowComponentProps) {
  return (
    <div className="flex h-full flex-col bg-[#c0c0c0] text-[11px]">
      <MenuBar onHelp={() => notify("Select an item to view its description.")} />
      <div className="mb-[2px] flex items-center gap-[3px] border-b border-[#808080] pb-[3px]">
        {["Back", "Forward", "Up", "Cut", "Copy", "Paste", "Undo"].map((label) => (
          <button
            key={label}
            className="flex h-[42px] min-w-[54px] flex-col items-center justify-center gap-[1px] bg-[#c0c0c0] px-1 hover:shadow-[inset_1px_1px_#fff,inset_-1px_-1px_#808080]"
            onClick={() => notify(`${label} is not available here.`)}
          >
            <WSBootIcon type={label === "Up" ? "folder" : "app"} size={18} />
            <span>{label}</span>
          </button>
        ))}
      </div>
      <div className="field-border mb-[2px] flex h-[24px] items-center gap-1 bg-white px-1">
        <span>Address</span>
        <span className="flex min-w-0 flex-1 items-center gap-1 border border-[#808080] bg-white px-1">
          <WSBootIcon type="computer" size={16} />
          <span>My Computer</span>
        </span>
      </div>
      <div className="sunken-panel flex min-h-0 flex-1 bg-white">
        <aside className="w-[150px] shrink-0 border-r border-[#dfdfdf] bg-white p-4">
          <WSBootIcon type="computer" size={42} />
          <h2 className="mt-2 border-b border-[#46a6d8] pb-1 text-[22px] font-bold leading-none">Computer</h2>
          <p className="mt-3 leading-[14px]">Select an item to view its description.</p>
        </aside>
        <div className="grid flex-1 auto-rows-[74px] grid-cols-[repeat(auto-fill,minmax(96px,1fr))] content-start gap-x-3 gap-y-1 p-5">
          {items.map((item) => (
            <button
            key={item.label}
              className="computer-icon-button flex flex-col items-center justify-start gap-1 p-1 text-center hover:text-white"
              title={item.hint}
              onDoubleClick={() => notify(`${item.label}: ${item.hint}`)}
            >
              <WSBootIcon type={item.icon} size={32} />
              <span className="leading-[13px]">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="status-bar mt-1">
        <p className="status-bar-field">{items.length} object(s)</p>
        <p className="status-bar-field">My Computer</p>
      </div>
    </div>
  );
}
