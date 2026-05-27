"use client";

import { useState } from "react";
import { commands } from "@/lib/commands";
import type { WindowComponentProps, WindowId } from "@/lib/windows";

export function RunWindow({ window, openWindow, closeWindow, notify, playSound }: WindowComponentProps) {
  const [value, setValue] = useState("");

  const run = () => {
    const command = commands[value.trim().toLowerCase()];
    if (!command) {
      playSound("error");
      notify(`Unknown command: ${value || "(empty)"}`);
      return;
    }
    if (command === "help") {
      notify("Commands: about, projects, contact, games, music, screensaver, help");
      return;
    }
    openWindow(command as WindowId);
    closeWindow(window.instanceId);
  };

  return (
    <form
      className="flex h-full flex-col gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        run();
      }}
    >
      <div className="flex gap-3">
        <div className="text-3xl">▣</div>
        <p>Type the name of a program, folder, document, or internet resource, and WSBoot will open it.</p>
      </div>
      <label className="grid grid-cols-[52px_1fr] items-center gap-2">
        <span>Open:</span>
        <input className="win-bevel-inset bg-white px-2 py-1" value={value} onChange={(event) => setValue(event.target.value)} autoFocus />
      </label>
      <div className="mt-auto flex justify-end gap-2">
        <button type="submit" className="win-button min-w-20">
          OK
        </button>
        <button type="button" className="win-button min-w-20" onClick={() => closeWindow(window.instanceId)}>
          Cancel
        </button>
      </div>
    </form>
  );
}
