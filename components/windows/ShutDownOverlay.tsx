"use client";

import { useState } from "react";

export function ShutDownOverlay({ safe, onRestart, onShutdown, onCancel }: { safe: boolean; onRestart: () => void; onShutdown: () => void; onCancel: () => void }) {
  const [selected, setSelected] = useState<"shutdown" | "restart">("shutdown");

  if (safe) {
    return (
      <div className="fixed inset-0 z-[8000] flex items-center justify-center">
        {/* Clouds background with dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/clouds.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.25)",
          }}
        />
        <div className="relative text-center">
          <div className="text-[28px] text-[#ffb000] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" style={{ fontFamily: "serif" }}>
            It&apos;s now safe to turn off<br/>your computer.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[7000] flex items-center justify-center">
      {/* Clouds background with dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/clouds.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.3)",
        }}
      />

      {/* Dialog */}
      <div
        className="relative w-[340px] bg-[#c0c0c0] p-[3px]"
        style={{
          boxShadow: "inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf"
        }}
      >
        {/* Title bar */}
        <div className="flex h-[18px] items-center bg-gradient-to-r from-[#000080] to-[#1084d0] px-[4px]">
          <span className="text-[11px] font-bold text-white">Shut Down Windows</span>
        </div>

        {/* Body */}
        <div className="p-[12px]">
          <div className="flex gap-[12px] mb-[16px]">
            {/* Warning icon */}
            <div className="flex-shrink-0">
              <svg width="32" height="32" viewBox="0 0 32 32">
                <circle cx="16" cy="16" r="14" fill="#c0c0c0" stroke="#000" strokeWidth="1"/>
                <text x="16" y="22" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#000">?</text>
              </svg>
            </div>
            <div className="text-[11px]">
              <p className="mb-[8px]">What do you want the computer to do?</p>
              <div className="flex flex-col gap-[4px]">
                <label className="flex items-center gap-[4px] cursor-pointer">
                  <input
                    type="radio"
                    name="shutdown"
                    checked={selected === "shutdown"}
                    onChange={() => setSelected("shutdown")}
                    className="accent-[#000080]"
                  />
                  <span>Shut down</span>
                </label>
                <label className="flex items-center gap-[4px] cursor-pointer">
                  <input
                    type="radio"
                    name="shutdown"
                    checked={selected === "restart"}
                    onChange={() => setSelected("restart")}
                    className="accent-[#000080]"
                  />
                  <span>Restart</span>
                </label>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-[6px]">
            <button
              className="win-button min-w-[70px]"
              onClick={() => {
                if (selected === "restart") {
                  onRestart();
                } else {
                  onShutdown();
                }
              }}
            >
              OK
            </button>
            <button className="win-button min-w-[70px]" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
