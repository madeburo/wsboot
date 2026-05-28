"use client";

import { useEffect, useRef, useState } from "react";
import type { WindowComponentProps } from "@/lib/windows";

type ConnectionPhase = "idle" | "dialing" | "verifying" | "connected";

const DIALUP_SOUNDS = ["dialup-01", "dialup-02", "dialup-03"] as const;

type InternetWindowProps = WindowComponentProps & {
  onConnected?: () => void;
};

export function InternetWindow({
  window: win,
  closeWindow,
  openWindow,
  notify,
  playSound,
  fadeOutSound,
  onConnected,
}: InternetWindowProps) {
  const [phase, setPhase] = useState<ConnectionPhase>("idle");
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Ready to connect");
  const audioRef = useRef<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startConnection = () => {
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

        if (audioRef.current && fadeOutSound) {
          fadeOutSound(audioRef.current, 1000);
        }

        timerRef.current = setTimeout(() => {
          onConnected?.();
          notify("Connected to WSBoot Net!");
          closeWindow(win.instanceId);
          openWindow("ie-browser");
        }, 1200);
      }, 2000);
    }, 3500);
  };

  const cancelConnection = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (audioRef.current && fadeOutSound) fadeOutSound(audioRef.current, 300);
    setPhase("idle");
    setProgress(0);
    setStatusText("Ready to connect");
  };

  useEffect(() => {
    if (phase !== "dialing") return;
    const interval = setInterval(() => {
      setProgress((p) => Math.min(55, p + 3));
    }, 200);
    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col h-full bg-[#c0c0c0] text-[11px] select-none">
      {/* Tab bar */}
      <div className="flex items-end px-2 pt-1.5">
        <div
          className="relative px-3 py-[3px] bg-[#c0c0c0] border-t border-l border-r border-t-[#ffffff] border-l-[#ffffff] border-r-[#808080] -mb-px z-10 font-bold"
        >
          General
        </div>
        <div className="px-3 py-[3px] bg-[#c0c0c0] border border-t-[#ffffff] border-l-[#ffffff] border-r-[#404040] border-b-[#404040] ml-[2px]">
          Server Types
        </div>
        <div className="px-3 py-[3px] bg-[#c0c0c0] border border-t-[#ffffff] border-l-[#ffffff] border-r-[#404040] border-b-[#404040] ml-[2px]">
          Scripting
        </div>
        <div className="px-3 py-[3px] bg-[#c0c0c0] border border-t-[#ffffff] border-l-[#ffffff] border-r-[#404040] border-b-[#404040] ml-[2px]">
          Multilink
        </div>
      </div>

      {/* Tab content panel */}
      <div className="flex-1 mx-2 mb-2 border border-t-[#ffffff] border-l-[#ffffff] border-r-[#404040] border-b-[#404040] bg-[#c0c0c0] p-3 flex flex-col">
        {/* Connection icon + name */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-[32px] h-[32px] flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect x="2" y="4" width="10" height="8" fill="#008080" stroke="#000" strokeWidth="1"/>
              <rect x="16" y="4" width="10" height="8" fill="#008080" stroke="#000" strokeWidth="1"/>
              <rect x="4" y="6" width="2" height="2" fill="#00ff00"/>
              <rect x="7" y="6" width="2" height="2" fill="#00ff00"/>
              <rect x="18" y="6" width="2" height="2" fill="#00ff00"/>
              <rect x="21" y="6" width="2" height="2" fill="#00ff00"/>
              <path d="M12 8 L16 8" stroke="#000" strokeWidth="1"/>
              <path d="M8 12 L8 16 L20 16 L20 12" stroke="#ffff00" strokeWidth="1.5" fill="none"/>
              <rect x="6" y="18" width="16" height="6" fill="#c0c0c0" stroke="#000" strokeWidth="1"/>
              <rect x="8" y="20" width="3" height="2" fill="#808080"/>
              <rect x="12" y="20" width="3" height="2" fill="#808080"/>
              <rect x="16" y="20" width="3" height="2" fill="#808080"/>
            </svg>
          </div>
          <span className="text-[12px] font-bold text-white bg-[#0000ff] px-1">
            Dial-up Internet access
          </span>
        </div>

        {/* Phone number fieldset */}
        <fieldset className="border-2 border-t-[#808080] border-l-[#808080] border-r-[#ffffff] border-b-[#ffffff] px-3 pt-1 pb-2 mb-3">
          <legend className="text-[11px] px-1">Phone number:</legend>
          <div className="flex items-end gap-1 mb-2">
            <div>
              <div className="text-[11px] text-[#808080] mb-0.5">Area code:</div>
              <div className="flex items-center">
                <div className="relative">
                  <input
                    readOnly
                    className="w-[60px] h-[21px] border-2 border-t-[#808080] border-l-[#808080] border-r-[#ffffff] border-b-[#ffffff] bg-white px-1 text-[11px] pr-[16px]"
                    value=""
                  />
                  <div className="absolute right-0 top-0 w-[16px] h-[21px] bg-[#c0c0c0] border-2 border-t-[#ffffff] border-l-[#ffffff] border-r-[#808080] border-b-[#808080] flex items-center justify-center text-[8px] active:border-t-[#808080] active:border-l-[#808080] active:border-r-[#ffffff] active:border-b-[#ffffff]">
                    ▼
                  </div>
                </div>
              </div>
            </div>
            <span className="text-[14px] font-bold mb-0.5 mx-1">·</span>
            <div className="flex-1">
              <div className="text-[11px] mb-0.5">Telephone number:</div>
              <input
                readOnly
                className="w-full h-[21px] border-2 border-t-[#808080] border-l-[#808080] border-r-[#ffffff] border-b-[#ffffff] bg-white px-1 text-[11px]"
                value="613-520-1135"
              />
            </div>
          </div>
          <div className="mb-2">
            <div className="text-[11px] text-[#808080] mb-0.5">Country code:</div>
            <div className="relative">
              <input
                readOnly
                className="w-full h-[21px] border-2 border-t-[#808080] border-l-[#808080] border-r-[#ffffff] border-b-[#ffffff] bg-[#c0c0c0] px-1 text-[11px] text-[#808080] pr-[16px]"
                value="Canada (1)"
              />
              <div className="absolute right-0 top-0 w-[16px] h-[21px] bg-[#c0c0c0] border-2 border-t-[#ffffff] border-l-[#ffffff] border-r-[#808080] border-b-[#808080] flex items-center justify-center text-[8px]">
                ▼
              </div>
            </div>
          </div>
          <label className="flex items-center gap-1.5 text-[11px] cursor-default">
            <div className="w-[13px] h-[13px] border-2 border-t-[#808080] border-l-[#808080] border-r-[#ffffff] border-b-[#ffffff] bg-white flex items-center justify-center">
            </div>
            Use area code and Dialing Properties
          </label>
        </fieldset>

        {/* Connect using fieldset */}
        <fieldset className="border-2 border-t-[#808080] border-l-[#808080] border-r-[#ffffff] border-b-[#ffffff] px-3 pt-1 pb-2 mb-3">
          <legend className="text-[11px] px-1">Connect using:</legend>
          <div className="flex items-center gap-2">
            <div className="w-[32px] h-[32px] flex items-center justify-center">
              <svg width="28" height="24" viewBox="0 0 28 24" fill="none">
                <rect x="2" y="4" width="24" height="16" rx="2" fill="#008000" stroke="#000" strokeWidth="1"/>
                <rect x="4" y="6" width="4" height="3" fill="#00ff00"/>
                <rect x="9" y="6" width="4" height="3" fill="#ffff00"/>
                <rect x="14" y="6" width="4" height="3" fill="#00ff00"/>
                <rect x="4" y="11" width="20" height="2" fill="#c0c0c0"/>
                <rect x="4" y="15" width="20" height="2" fill="#808080"/>
                <rect x="20" y="6" width="4" height="3" fill="#ff0000"/>
              </svg>
            </div>
            <div className="flex-1 relative">
              <input
                readOnly
                className="w-full h-[21px] border-2 border-t-[#808080] border-l-[#808080] border-r-[#ffffff] border-b-[#ffffff] bg-white px-1 text-[11px] pr-[16px]"
                value="U.S. Robotics 56K Fax PCI"
              />
              <div className="absolute right-0 top-0 w-[16px] h-[21px] bg-[#c0c0c0] border-2 border-t-[#ffffff] border-l-[#ffffff] border-r-[#808080] border-b-[#808080] flex items-center justify-center text-[8px]">
                ▼
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-2">
            <button className="h-[21px] px-3 bg-[#c0c0c0] border-2 border-t-[#ffffff] border-l-[#ffffff] border-r-[#808080] border-b-[#808080] text-[11px] active:border-t-[#808080] active:border-l-[#808080] active:border-r-[#ffffff] active:border-b-[#ffffff]">
              Configure...
            </button>
          </div>
        </fieldset>

        {/* Status / Progress */}
        {phase !== "idle" && (
          <div className="mb-2 px-1">
            <div className="text-[11px] mb-1">{statusText}</div>
            <div className="w-full h-[16px] border-2 border-t-[#808080] border-l-[#808080] border-r-[#ffffff] border-b-[#ffffff] bg-white">
              <div
                className="h-full bg-[#000080] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Bottom buttons */}
      <div className="flex justify-center gap-2 px-3 pb-2">
        {phase === "idle" ? (
          <>
            <button
              onClick={startConnection}
              className="h-[23px] w-[75px] bg-[#c0c0c0] border-2 border-t-[#ffffff] border-l-[#ffffff] border-r-[#808080] border-b-[#808080] text-[11px] font-bold active:border-t-[#808080] active:border-l-[#808080] active:border-r-[#ffffff] active:border-b-[#ffffff] ring-1 ring-black ring-inset"
            >
              OK
            </button>
            <button
              onClick={() => closeWindow(win.instanceId)}
              className="h-[23px] w-[75px] bg-[#c0c0c0] border-2 border-t-[#ffffff] border-l-[#ffffff] border-r-[#808080] border-b-[#808080] text-[11px] active:border-t-[#808080] active:border-l-[#808080] active:border-r-[#ffffff] active:border-b-[#ffffff]"
            >
              Cancel
            </button>
          </>
        ) : phase === "connected" ? (
          <button
            onClick={() => {
              if (audioRef.current && fadeOutSound) fadeOutSound(audioRef.current, 500);
              onConnected?.();
              closeWindow(win.instanceId);
              openWindow("ie-browser");
            }}
            className="h-[23px] w-[75px] bg-[#c0c0c0] border-2 border-t-[#ffffff] border-l-[#ffffff] border-r-[#808080] border-b-[#808080] text-[11px] font-bold active:border-t-[#808080] active:border-l-[#808080] active:border-r-[#ffffff] active:border-b-[#ffffff]"
          >
            OK
          </button>
        ) : (
          <button
            onClick={() => {
              cancelConnection();
              closeWindow(win.instanceId);
            }}
            className="h-[23px] w-[75px] bg-[#c0c0c0] border-2 border-t-[#ffffff] border-l-[#ffffff] border-r-[#808080] border-b-[#808080] text-[11px] active:border-t-[#808080] active:border-l-[#808080] active:border-r-[#ffffff] active:border-b-[#ffffff]"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
