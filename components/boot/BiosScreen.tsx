"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type BootMode = "normal" | "logged" | "safe" | "command";

interface BiosScreenProps {
  onComplete: (mode: BootMode) => void;
}

const BIOS_LINES = [
  { text: "Award Modular BIOS v4.51PG, An Energy Star Ally", bold: true },
  { text: "Copyright (C) 1984-98, WSBoot, Inc." },
  { text: "" },
  { text: "ASUS P/I-P55T2P4 BIOS REV. 2.2" },
  { text: "Intel Celeron CPU at 300A MHz", highlight: true },
  { text: "Memory Test : 65536K OK" },
  { text: "" },
  { text: "Press DEL to enter SETUP", dim: true },
  { text: "Press F8 or ESC for boot menu", dim: true },
  { text: "" },
  { text: "Award Plug and Play BIOS Extension v1.0A" },
  { text: "Detecting IDE Primary Master   ... WDC AC21600H" },
  { text: "Detecting IDE Primary Slave    ... None" },
  { text: "Detecting IDE Secondary Master ... ATAPI CD-ROM" },
  { text: "Detecting IDE Secondary Slave  ... None" },
  { text: "" },
  { text: "Keyboard detected" },
  { text: "Mouse initialized" },
  { text: "" },
  { text: "Starting WSBoot 98..." },
];

const MENU_ITEMS = [
  "1. Normal",
  "2. Logged (\\BOOTLOG.TXT)",
  "3. Safe Mode",
  "4. Command prompt only",
];

const BOOTLOG_LINES = [
  "[BOOTLOG]",
  "BIOS initialized",
  "Memory test passed: 65536K",
  "Primary Master: WDC AC21600H",
  "CD-ROM detected",
  "Keyboard initialized",
  "Mouse initialized",
  "WSBoot shell loaded",
  "Desktop initialized",
];

export function BiosScreen({ onComplete }: BiosScreenProps) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [phase, setPhase] = useState<"bios" | "menu" | "bootlog" | "command" | "booting">("bios");
  const [menuChoice, setMenuChoice] = useState("");
  const [bootlogVisible, setBootlogVisible] = useState(0);
  const [f8Pressed, setF8Pressed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const completedRef = useRef(false);

  const complete = useCallback(
    (mode: BootMode) => {
      if (completedRef.current) return;
      completedRef.current = true;
      onComplete(mode);
    },
    [onComplete],
  );

  // BIOS text animation — fast reveal
  useEffect(() => {
    if (phase !== "bios") return;
    const interval = setInterval(() => {
      setVisibleLines((v) => {
        const next = v + 1;
        if (next >= BIOS_LINES.length) {
          clearInterval(interval);
          // If F8 was pressed, menu will show via separate effect
          // Otherwise wait for user click/keypress to boot (ensures audio works)
        }
        return Math.min(next, BIOS_LINES.length);
      });
    }, 80);
    return () => clearInterval(interval);
  }, [phase, f8Pressed, complete]);

  // Listen for F8 or Escape during BIOS phase
  useEffect(() => {
    if (phase !== "bios") return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "F8" || e.key === "Escape") {
        e.preventDefault();
        setF8Pressed(true);
      } else if (visibleLines >= BIOS_LINES.length && !f8Pressed) {
        // Any other key after BIOS done = boot
        setPhase("booting");
        setTimeout(() => complete("normal"), 300);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [phase, visibleLines, f8Pressed, complete]);

  // When BIOS finishes and F8 was pressed, show menu
  useEffect(() => {
    if (phase === "bios" && f8Pressed && visibleLines >= BIOS_LINES.length) {
      setPhase("menu");
    }
  }, [phase, f8Pressed, visibleLines]);

  // Menu key handler
  useEffect(() => {
    if (phase !== "menu") return;
    const handler = (e: KeyboardEvent) => {
      if (["1", "2", "3", "4"].includes(e.key)) {
        setMenuChoice(e.key);
        const modes: Record<string, BootMode> = { "1": "normal", "2": "logged", "3": "safe", "4": "command" };
        const mode = modes[e.key];
        setTimeout(() => {
          if (mode === "logged") {
            setPhase("bootlog");
          } else if (mode === "command") {
            setPhase("command");
          } else {
            setPhase("booting");
            setTimeout(() => complete(mode), 400);
          }
        }, 300);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [phase, complete]);

  // Bootlog animation
  useEffect(() => {
    if (phase !== "bootlog") return;
    const interval = setInterval(() => {
      setBootlogVisible((v) => {
        const next = v + 1;
        if (next >= BOOTLOG_LINES.length) {
          clearInterval(interval);
          setTimeout(() => complete("normal"), 600);
          return BOOTLOG_LINES.length;
        }
        return next;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [phase, complete]);

  // Command prompt — press Enter to boot
  useEffect(() => {
    if (phase !== "command") return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        complete("normal");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [phase, complete]);

  // Auto-scroll
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  });

  return (
    <div
      ref={containerRef}
      onClick={() => {
        // User interaction enables audio autoplay in browser
        if (phase === "bios" && visibleLines >= BIOS_LINES.length && !f8Pressed) {
          setPhase("booting");
          setTimeout(() => complete("normal"), 300);
        }
      }}
      className="flex h-screen w-screen flex-col items-start overflow-hidden bg-black p-4 font-mono text-[14px] leading-[20px] text-[#aaaaaa] cursor-default"
    >
      {/* BIOS lines */}
      {BIOS_LINES.slice(0, visibleLines).map((line, i) => (
        <div
          key={i}
          className={[
            line.bold ? "text-white font-bold" : "",
            line.highlight ? "text-[#55ff55]" : "",
            line.dim ? "text-[#666666]" : "",
          ].join(" ")}
        >
          {line.text || "\u00a0"}
        </div>
      ))}

      {/* Cursor during BIOS */}
      {phase === "bios" && visibleLines < BIOS_LINES.length && (
        <span className="inline-block w-[8px] h-[14px] bg-[#aaaaaa] animate-pulse" />
      )}

      {/* Waiting for user interaction to boot */}
      {phase === "bios" && visibleLines >= BIOS_LINES.length && !f8Pressed && (
        <div className="mt-4 text-[#666666] animate-pulse">
          Click or press any key to continue...
        </div>
      )}

      {/* F8 Boot Menu */}
      {phase === "menu" && (
        <div className="mt-4">
          <div className="text-white font-bold mb-2">WSBoot 98 Startup Menu</div>
          <div className="mb-2" />
          {MENU_ITEMS.map((item, i) => (
            <div key={i} className={menuChoice === String(i + 1) ? "text-[#55ff55] font-bold" : ""}>
              {item}
            </div>
          ))}
          <div className="mt-2" />
          <div>
            Enter a choice: <span className="text-white">{menuChoice}</span>
            {!menuChoice && <span className="inline-block w-[8px] h-[14px] bg-[#aaaaaa] animate-pulse ml-1 align-middle" />}
          </div>
          {!menuChoice && (
            <div className="mt-2 text-[#666666]">Use number keys to select an option.</div>
          )}
        </div>
      )}

      {/* Bootlog output */}
      {phase === "bootlog" && (
        <div className="mt-2">
          {BOOTLOG_LINES.slice(0, bootlogVisible).map((line, i) => (
            <div key={i} className={i === 0 ? "text-white font-bold" : "text-[#55ff55]"}>
              {line}
            </div>
          ))}
        </div>
      )}

      {/* Command prompt */}
      {phase === "command" && (
        <div className="mt-4">
          <div className="text-white">Microsoft(R) WS-DOS</div>
          <div className="text-white">Copyright (C) 1984-98 WSBoot, Inc.</div>
          <div className="mt-2" />
          <div className="text-[#aaaaaa]">
            C:\&gt;<span className="inline-block w-[8px] h-[14px] bg-[#aaaaaa] animate-pulse ml-1 align-middle" />
          </div>
          <div className="mt-2 text-[#666666]">Press Enter to continue to desktop.</div>
        </div>
      )}

      {/* Booting message */}
      {phase === "booting" && (
        <div className="mt-2 text-white animate-pulse">Loading WSBoot 98...</div>
      )}
    </div>
  );
}
