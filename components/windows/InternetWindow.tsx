"use client";

import { useEffect, useRef, useState } from "react";
import type { WindowComponentProps } from "@/lib/windows";

type ConnectionPhase = "idle" | "dialing" | "verifying" | "connected";

const DIALUP_SOUNDS = ["dialup-01", "dialup-02", "dialup-03"] as const;

export function InternetWindow({ window: win, closeWindow, openWindow, notify, playSound, fadeOutSound }: WindowComponentProps) {
  const [phase, setPhase] = useState<ConnectionPhase>("idle");
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Ready to connect");
  const audioRef = useRef<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startConnection = () => {
    // Pick a random dialup sound
    const sound = DIALUP_SOUNDS[Math.floor(Math.random() * DIALUP_SOUNDS.length)];
    audioRef.current = sound;
    playSound(sound);

    setPhase("dialing");
    setProgress(0);
    setStatusText("Dialing 613-520-1135...");

    timerRef.current = setTimeout(() => {
      setPhase("verifying");
      setStatusText("Verifying username and password...");
      setProgress(60);

      timerRef.current = setTimeout(() => {
        setPhase("connected");
        setStatusText("Connected at 33,600 bps");
        setProgress(100);

        // Fade out dialup sound
        if (audioRef.current && fadeOutSound) {
          fadeOutSound(audioRef.current, 1000);
        }

        timerRef.current = setTimeout(() => {
          notify("Connected to WSBoot Net!");
          closeWindow(win.instanceId);
          openWindow("ie-browser");
        }, 1200);
      }, 2000);
    }, 3500);
  };

  // Progress animation during dialing
  useEffect(() => {
    if (phase !== "dialing") return;
    const interval = setInterval(() => {
      setProgress((p) => Math.min(55, p + 3));
    }, 200);
    return () => clearInterval(interval);
  }, [phase]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col h-full bg-[#c0c0c0] p-3 text-[12px] font-[system-ui,sans-serif]">
      {/* Tabs */}
      <div className="flex border-b border-[#808080] mb-3">
        <div className="px-3 py-1 bg-[#c0c0c0] border border-[#808080] border-b-[#c0c0c0] -mb-px text-[11px] font-bold">
          General
        </div>
        <div className="px-3 py-1 bg-[#dfdfdf] border border-[#808080] text-[11px] ml-1">
          Server Types
        </div>
        <div className="px-3 py-1 bg-[#dfdfdf] border border-[#808080] text-[11px] ml-1">
          Scripting
        </div>
        <div className="px-3 py-1 bg-[#dfdfdf] border border-[#808080] text-[11px] ml-1">
          Multilink
        </div>
      </div>

      {/* Connection icon + name */}
      <div className="flex items-center gap-2 mb-4 px-2">
        <div className="text-[24px]">🖧</div>
        <span className="text-[12px] font-bold text-[#000080] bg-[#b0c4de] px-1">WSBoot Net</span>
      </div>

      {/* Phone number fieldset */}
      <fieldset className="border border-[#808080] px-3 py-2 mb-3">
        <legend className="text-[11px] px-1">Phone number:</legend>
        <div className="flex items-center gap-2 mb-2">
          <div>
            <div className="text-[11px] text-[#808080] mb-0.5">Area code:</div>
            <div className="flex items-center">
              <input
                readOnly
                className="w-[50px] h-[20px] border border-[#808080] bg-white px-1 text-[11px]"
                value=""
              />
              <span className="text-[11px] mx-1">▼</span>
            </div>
          </div>
          <span className="mt-3">·</span>
          <div>
            <div className="text-[11px] mb-0.5">Telephone number:</div>
            <input
              readOnly
              className="w-[140px] h-[20px] border border-[#808080] bg-white px-1 text-[11px]"
              value="613-520-1135"
            />
          </div>
        </div>
        <div className="mb-2">
          <div className="text-[11px] text-[#808080] mb-0.5">Country code:</div>
          <div className="flex items-center">
            <input
              readOnly
              className="flex-1 h-[20px] border border-[#808080] bg-[#dfdfdf] px-1 text-[11px]"
              value="Canada (1)"
            />
            <span className="text-[11px] ml-1">▼</span>
          </div>
        </div>
        <label className="flex items-center gap-1 text-[11px]">
          <input type="checkbox" disabled className="w-3 h-3" />
          Use area code and Dialing Properties
        </label>
      </fieldset>

      {/* Connect using fieldset */}
      <fieldset className="border border-[#808080] px-3 py-2 mb-3">
        <legend className="text-[11px] px-1">Connect using:</legend>
        <div className="flex items-center gap-2">
          <div className="text-[18px]">🔌</div>
          <input
            readOnly
            className="flex-1 h-[20px] border border-[#808080] bg-white px-1 text-[11px]"
            value="U.S. Robotics 56K Fax PCI"
          />
          <span className="text-[11px]">▼</span>
        </div>
        <div className="flex justify-end mt-2">
          <button className="px-3 py-0.5 border border-[#808080] bg-[#c0c0c0] text-[11px] active:border-inset shadow-[1px_1px_0_#000,-1px_-1px_0_#fff_inset]">
            Configure...
          </button>
        </div>
      </fieldset>

      {/* Status / Progress */}
      {phase !== "idle" && (
        <div className="mb-2 px-1">
          <div className="text-[11px] mb-1">{statusText}</div>
          <div className="w-full h-[14px] border border-[#808080] bg-white">
            <div
              className="h-full bg-[#000080] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex justify-end gap-2 mt-auto pt-2 border-t border-[#808080]">
        {phase === "idle" ? (
          <>
            <button
              onClick={startConnection}
              className="px-4 py-1 border-2 border-[#808080] bg-[#c0c0c0] text-[11px] font-bold shadow-[1px_1px_0_#000] active:shadow-none active:translate-x-px active:translate-y-px"
            >
              Connect
            </button>
            <button
              onClick={() => closeWindow(win.instanceId)}
              className="px-4 py-1 border-2 border-[#808080] bg-[#c0c0c0] text-[11px] shadow-[1px_1px_0_#000] active:shadow-none active:translate-x-px active:translate-y-px"
            >
              Cancel
            </button>
          </>
        ) : phase === "connected" ? (
          <button
            onClick={() => {
              if (audioRef.current && fadeOutSound) fadeOutSound(audioRef.current, 500);
              closeWindow(win.instanceId);
              openWindow("ie-browser");
            }}
            className="px-4 py-1 border-2 border-[#808080] bg-[#c0c0c0] text-[11px] font-bold shadow-[1px_1px_0_#000] active:shadow-none active:translate-x-px active:translate-y-px"
          >
            OK
          </button>
        ) : (
          <button
            onClick={() => {
              if (timerRef.current) clearTimeout(timerRef.current);
              if (audioRef.current && fadeOutSound) fadeOutSound(audioRef.current, 300);
              setPhase("idle");
              setProgress(0);
              setStatusText("Ready to connect");
            }}
            className="px-4 py-1 border-2 border-[#808080] bg-[#c0c0c0] text-[11px] shadow-[1px_1px_0_#000] active:shadow-none active:translate-x-px active:translate-y-px"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
