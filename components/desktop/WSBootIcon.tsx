"use client";

import type { ReactNode } from "react";

type Props = {
  type: string;
  size?: number;
};

export function WSBootIcon({ type, size = 32 }: Props) {
  const s = size;
  const common = { shapeRendering: "crispEdges" as const };
  
  const icons: Record<string, ReactNode> = {
    computer: (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" style={common}>
        <rect x="6" y="2" width="20" height="17" fill="#d8d8d8" stroke="#000"/>
        <rect x="8" y="4" width="16" height="11" fill="#008080"/>
        <rect x="9" y="5" width="14" height="9" fill="#79d6d0"/>
        <rect x="11" y="19" width="10" height="3" fill="#bfbfbf" stroke="#000"/>
        <rect x="8" y="22" width="16" height="3" fill="#d8d8d8" stroke="#000"/>
        <rect x="5" y="26" width="22" height="3" fill="#bfbfbf" stroke="#000"/>
        <rect x="22" y="16" width="2" height="1" fill="#00ff00"/>
      </svg>
    ),
    profile: (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
        {/* Notepad */}
        <rect x="6" y="2" width="20" height="26" fill="#ffffe0" stroke="#000" strokeWidth="1"/>
        <rect x="6" y="2" width="20" height="4" fill="#000080"/>
        {/* Lines */}
        <line x1="9" y1="10" x2="23" y2="10" stroke="#808080" strokeWidth="1"/>
        <line x1="9" y1="13" x2="23" y2="13" stroke="#808080" strokeWidth="1"/>
        <line x1="9" y1="16" x2="23" y2="16" stroke="#808080" strokeWidth="1"/>
        <line x1="9" y1="19" x2="20" y2="19" stroke="#808080" strokeWidth="1"/>
        <line x1="9" y1="22" x2="18" y2="22" stroke="#808080" strokeWidth="1"/>
        {/* Person icon in header */}
        <circle cx="16" cy="4" r="1.5" fill="#fff"/>
      </svg>
    ),
    folder: (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" style={common}>
        <path d="M2 9H12L14 12H30V27H2V9Z" fill="#ffe86b" stroke="#000"/>
        <path d="M3 13H29V28H3V13Z" fill="#fff28c" stroke="#8c7b00"/>
        <rect x="4" y="15" width="24" height="1" fill="#fffbd0"/>
      </svg>
    ),
    documents: (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" style={common}>
        <path d="M3 11H13L15 14H29V28H3V11Z" fill="#ffe86b" stroke="#000"/>
        <path d="M7 6L16 3L25 10L16 20L7 12Z" fill="#fff9d4" stroke="#000"/>
        <path d="M9 11H22M10 14H20" stroke="#808080"/>
        <path d="M3 15H29V28H3V15Z" fill="#fff28c" stroke="#8c7b00"/>
      </svg>
    ),
    drive: (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" style={common}>
        <rect x="4" y="11" width="24" height="13" fill="#d8d8d8" stroke="#000"/>
        <rect x="6" y="13" width="20" height="4" fill="#f5f5f5" stroke="#808080"/>
        <rect x="8" y="20" width="12" height="2" fill="#404040"/>
        <rect x="23" y="20" width="3" height="3" fill="#00aa00" stroke="#006000"/>
      </svg>
    ),
    cd: (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" style={common}>
        <circle cx="16" cy="16" r="12" fill="#d8d8d8" stroke="#000"/>
        <path d="M16 4A12 12 0 0 1 28 16H18Z" fill="#b7f0ff"/>
        <path d="M16 28A12 12 0 0 1 4 16H14Z" fill="#ffe78a"/>
        <circle cx="16" cy="16" r="4" fill="#fff" stroke="#808080"/>
        <circle cx="16" cy="16" r="1" fill="#000"/>
      </svg>
    ),
    printer: (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" style={common}>
        <rect x="8" y="4" width="16" height="8" fill="#fff" stroke="#000"/>
        <rect x="5" y="12" width="22" height="12" fill="#c0c0c0" stroke="#000"/>
        <rect x="8" y="20" width="16" height="8" fill="#fff" stroke="#000"/>
        <rect x="9" y="22" width="10" height="1" fill="#808080"/>
        <rect x="9" y="25" width="12" height="1" fill="#808080"/>
        <rect x="22" y="15" width="3" height="2" fill="#00aa00"/>
      </svg>
    ),
    network: (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" style={common}>
        <path d="M4 9H14V18H4V9Z" fill="#d8d8d8" stroke="#000"/>
        <rect x="6" y="11" width="6" height="4" fill="#008080"/>
        <path d="M18 5H28V14H18V5Z" fill="#d8d8d8" stroke="#000"/>
        <rect x="20" y="7" width="6" height="4" fill="#008080"/>
        <path d="M18 20H28V29H18V20Z" fill="#d8d8d8" stroke="#000"/>
        <rect x="20" y="22" width="6" height="4" fill="#008080"/>
        <path d="M14 14H18M23 14V20" stroke="#000"/>
      </svg>
    ),
    tasks: (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" style={common}>
        <rect x="6" y="4" width="20" height="24" fill="#fff8bf" stroke="#000"/>
        <rect x="9" y="8" width="4" height="4" fill="#fff" stroke="#000"/>
        <path d="M10 10L11 11L14 7" stroke="#ff0000"/>
        <rect x="16" y="9" width="7" height="1" fill="#808080"/>
        <rect x="9" y="16" width="4" height="4" fill="#fff" stroke="#000"/>
        <path d="M10 18L11 19L14 15" stroke="#0000ff"/>
        <rect x="16" y="17" width="7" height="1" fill="#808080"/>
      </svg>
    ),
    webfolders: (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" style={common}>
        <path d="M2 12H12L14 15H30V28H2V12Z" fill="#ffe86b" stroke="#000"/>
        <path d="M5 10C7 5 13 4 16 8C20 5 27 8 27 14C27 20 22 23 16 23C9 23 4 19 5 10Z" fill="#1f8fff" stroke="#000"/>
        <path d="M9 14H24M16 8C13 12 13 18 16 22M16 8C20 12 20 18 16 22" stroke="#9fffb5"/>
      </svg>
    ),
    mail: (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
        {/* Envelope */}
        <rect x="3" y="7" width="26" height="18" fill="#fff" stroke="#000" strokeWidth="1"/>
        {/* Flap */}
        <path d="M3 7 L16 17 L29 7" fill="none" stroke="#000" strokeWidth="1"/>
        {/* Bottom lines */}
        <path d="M3 25 L12 17" stroke="#808080" strokeWidth="0.5"/>
        <path d="M29 25 L20 17" stroke="#808080" strokeWidth="0.5"/>
        {/* Stamp */}
        <rect x="22" y="9" width="5" height="4" fill="#ff0000" stroke="#800000" strokeWidth="0.5"/>
      </svg>
    ),
    joystick: (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
        {/* Base */}
        <ellipse cx="16" cy="25" rx="10" ry="4" fill="#c0c0c0" stroke="#000" strokeWidth="1"/>
        {/* Stick */}
        <rect x="14" y="8" width="4" height="16" fill="#404040" stroke="#000" strokeWidth="0.5"/>
        {/* Ball top */}
        <circle cx="16" cy="7" r="4" fill="#ff0000" stroke="#800000" strokeWidth="1"/>
        {/* Highlight */}
        <circle cx="14" cy="5" r="1.5" fill="#ff8080"/>
        {/* Buttons */}
        <circle cx="8" cy="23" r="2" fill="#ff0000" stroke="#800000" strokeWidth="0.5"/>
        <circle cx="24" cy="23" r="2" fill="#0000ff" stroke="#000080" strokeWidth="0.5"/>
      </svg>
    ),
    music: (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" style={common}>
        <circle cx="16" cy="16" r="12" fill="#c0c0c0" stroke="#000" strokeWidth="1"/>
        <circle cx="16" cy="16" r="10" fill="url(#cd-gradient)"/>
        <circle cx="16" cy="16" r="3" fill="#fff" stroke="#808080" strokeWidth="0.5"/>
        <circle cx="16" cy="16" r="1" fill="#000"/>
        {/* Rainbow reflection */}
        <defs>
          <radialGradient id="cd-gradient">
            <stop offset="30%" stopColor="#e0e0e0"/>
            <stop offset="50%" stopColor="#c0c0ff"/>
            <stop offset="70%" stopColor="#c0ffc0"/>
            <stop offset="90%" stopColor="#e0e0e0"/>
          </radialGradient>
        </defs>
      </svg>
    ),
    winamp: (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" style={common}>
        <rect x="4" y="6" width="24" height="20" fill="#1f2340" stroke="#000"/>
        <rect x="6" y="8" width="20" height="3" fill="#c0c0c0"/>
        <rect x="7" y="13" width="10" height="8" fill="#050505" stroke="#5a5a5a"/>
        <rect x="19" y="13" width="6" height="8" fill="#111"/>
        <rect x="20" y="14" width="1" height="5" fill="#2dff22"/>
        <rect x="23" y="15" width="1" height="3" fill="#2dff22"/>
        <rect x="8" y="23" width="4" height="2" fill="#c0c0c0"/>
        <rect x="14" y="23" width="4" height="2" fill="#c0c0c0"/>
        <rect x="20" y="23" width="4" height="2" fill="#c0c0c0"/>
        <path d="M25 20L29 16L27 23L30 22L24 30L26 23L22 25Z" fill="#d79a2b" stroke="#3b2500"/>
      </svg>
    ),
    pipes: (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" style={common}>
        <rect x="6" y="5" width="20" height="16" fill="#101010" stroke="#000"/>
        <path d="M9 17V10H15V13H22" stroke="#00ff55" strokeWidth="2"/>
        <path d="M12 19H24V9" stroke="#ffdd33" strokeWidth="2"/>
        <path d="M18 18V14H25" stroke="#ff33aa" strokeWidth="2"/>
        <rect x="11" y="22" width="10" height="3" fill="#c0c0c0" stroke="#000"/>
        <rect x="8" y="25" width="16" height="2" fill="#d8d8d8" stroke="#000"/>
      </svg>
    ),
    prompt: (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" style={common}>
        <rect x="5" y="6" width="22" height="18" fill="#050505" stroke="#000"/>
        <rect x="7" y="8" width="18" height="14" fill="#101010"/>
        <path d="M9 12L13 15L9 18" stroke="#00ff00" strokeWidth="2"/>
        <rect x="15" y="18" width="7" height="2" fill="#00ff00"/>
        <rect x="11" y="24" width="10" height="3" fill="#c0c0c0" stroke="#000"/>
      </svg>
    ),
    calculator: (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" style={common}>
        <rect x="7" y="4" width="18" height="25" fill="#b8d8d8" stroke="#000"/>
        <rect x="10" y="7" width="12" height="5" fill="#eaffff" stroke="#000"/>
        {Array.from({ length: 12 }, (_, index) => {
          const x = 10 + (index % 3) * 4;
          const y = 15 + Math.floor(index / 3) * 3;
          return <rect key={index} x={x} y={y} width="3" height="2" fill={index % 4 === 0 ? "#fffb98" : "#ffffff"} stroke="#000" strokeWidth="0.4" />;
        })}
      </svg>
    ),
    pinball: (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" style={common}>
        <circle cx="16" cy="16" r="12" fill="#d8d8d8" stroke="#000"/>
        <circle cx="13" cy="12" r="5" fill="#111" stroke="#000"/>
        <circle cx="12" cy="10" r="2" fill="#ffffff"/>
        <path d="M10 24L15 20M22 24L17 20" stroke="#d04040" strokeWidth="2"/>
        <circle cx="22" cy="13" r="2" fill="#0000cc"/>
      </svg>
    ),
    ie: (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" style={common}>
        <path d="M8 18C8 10 14 5 21 7C16 8 12 12 12 18C12 23 16 26 21 25C14 28 8 25 8 18Z" fill="#1d63ff" stroke="#003199"/>
        <path d="M6 20C12 14 21 11 27 13" stroke="#80d0ff" strokeWidth="3"/>
        <path d="M5 23C12 20 21 19 27 22" stroke="#1d63ff" strokeWidth="2"/>
      </svg>
    ),
    paint: (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" style={common}>
        <rect x="6" y="9" width="16" height="14" fill="#fff" stroke="#000"/>
        <rect x="8" y="11" width="3" height="3" fill="#ff0000"/>
        <rect x="12" y="11" width="3" height="3" fill="#00aa00"/>
        <rect x="16" y="11" width="3" height="3" fill="#0000ff"/>
        <path d="M17 25L25 7L28 9L20 27Z" fill="#7a3b16" stroke="#000"/>
        <path d="M25 7L28 4L30 6L28 9Z" fill="#c0c0c0" stroke="#000"/>
      </svg>
    ),
    mine: (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" style={common}>
        <circle cx="16" cy="17" r="8" fill="#555" stroke="#000"/>
        <circle cx="13" cy="14" r="2" fill="#fff"/>
        <path d="M16 5V9M16 25V29M4 17H8M24 17H28M8 9L11 12M24 9L21 12M8 25L11 22M24 25L21 22" stroke="#000" strokeWidth="2"/>
      </svg>
    ),
    recorder: (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" style={common}>
        <path d="M5 13H11L19 7V25L11 19H5V13Z" fill="#fff176" stroke="#000"/>
        <path d="M21 10C24 13 24 19 21 22" stroke="#000" strokeWidth="1.5"/>
        <path d="M24 7C29 12 29 20 24 25" stroke="#000" strokeWidth="1"/>
        <rect x="4" y="20" width="7" height="3" fill="#d8d8d8" stroke="#000"/>
      </svg>
    ),
    cards: (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" style={common}>
        <rect x="9" y="5" width="13" height="18" fill="#fff" stroke="#000" transform="rotate(8 9 5)"/>
        <rect x="7" y="8" width="13" height="18" fill="#fff" stroke="#000"/>
        <path d="M13 13C11 11 8 13 10 16C11 18 13 19 14 21C15 19 17 18 18 16C20 13 16 11 14 13C14 13 14 13 13 13Z" fill="#cc0000"/>
      </svg>
    ),
    notepad: (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" style={common}>
        <rect x="7" y="4" width="18" height="24" fill="#f7fff7" stroke="#000"/>
        <rect x="7" y="4" width="18" height="4" fill="#d8d8d8" stroke="#000"/>
        <path d="M10 12H22M10 16H22M10 20H19" stroke="#808080"/>
        <path d="M23 5L27 9L22 14L20 12L25 7Z" fill="#9fe8ff" stroke="#000"/>
      </svg>
    ),
    norton: (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" style={common}>
        <rect x="3" y="5" width="26" height="21" fill="#0000aa" stroke="#000"/>
        <rect x="5" y="8" width="10" height="15" fill="#00aaaa" stroke="#fff"/>
        <rect x="17" y="8" width="10" height="15" fill="#00aaaa" stroke="#fff"/>
        <rect x="6" y="10" width="8" height="2" fill="#ffff55"/>
        <rect x="18" y="10" width="8" height="2" fill="#ffff55"/>
        <rect x="6" y="14" width="7" height="1" fill="#fff"/>
        <rect x="18" y="14" width="7" height="1" fill="#fff"/>
        <rect x="6" y="17" width="7" height="1" fill="#fff"/>
        <rect x="18" y="17" width="7" height="1" fill="#fff"/>
        <rect x="3" y="26" width="26" height="3" fill="#00aaaa" stroke="#000"/>
      </svg>
    ),
    update: (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" style={common}>
        <rect x="6" y="6" width="20" height="15" fill="#d8d8d8" stroke="#000"/>
        <rect x="8" y="8" width="16" height="10" fill="#e9ffff"/>
        <path d="M7 25C11 18 21 18 25 25" stroke="#008000" strokeWidth="4"/>
        <path d="M20 21H27V14" stroke="#0000ff" strokeWidth="3"/>
        <path d="M12 21H5V14" stroke="#ff0000" strokeWidth="3"/>
        <rect x="13" y="21" width="6" height="3" fill="#c0c0c0" stroke="#000"/>
      </svg>
    ),
    monitor: (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
        {/* Monitor frame */}
        <rect x="3" y="3" width="26" height="20" fill="#c0c0c0" stroke="#000" strokeWidth="1"/>
        {/* Screen */}
        <rect x="5" y="5" width="22" height="16" fill="#000"/>
        {/* Stars on screen */}
        <rect x="8" y="8" width="1" height="1" fill="#fff"/>
        <rect x="15" y="6" width="1" height="1" fill="#fff"/>
        <rect x="22" y="10" width="1" height="1" fill="#fff"/>
        <rect x="12" y="14" width="1" height="1" fill="#fff"/>
        <rect x="20" y="16" width="1" height="1" fill="#fff"/>
        <rect x="10" y="11" width="1" height="1" fill="#ffff00"/>
        {/* Stand */}
        <rect x="13" y="23" width="6" height="2" fill="#c0c0c0" stroke="#000" strokeWidth="0.5"/>
        <rect x="10" y="25" width="12" height="2" fill="#c0c0c0" stroke="#000" strokeWidth="0.5"/>
      </svg>
    ),
    trash: (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" style={common}>
        <path d="M8 11H25L22 28H11L8 11Z" fill="#d8f2e2" stroke="#000"/>
        <rect x="7" y="8" width="18" height="3" fill="#f4fff8" stroke="#000"/>
        <rect x="13" y="5" width="6" height="3" fill="#d8f2e2" stroke="#000"/>
        <path d="M12 13L14 26M17 13V26M22 13L20 26" stroke="#63a57f"/>
        <path d="M12 17L21 23M21 17L13 23" stroke="#2a8f4a"/>
      </svg>
    ),
    settings: (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
        {/* Control panel */}
        <rect x="4" y="4" width="24" height="24" fill="#c0c0c0" stroke="#000" strokeWidth="1"/>
        {/* Sliders */}
        <rect x="7" y="8" width="18" height="3" fill="#fff" stroke="#808080" strokeWidth="0.5"/>
        <rect x="14" y="7" width="4" height="5" fill="#c0c0c0" stroke="#000" strokeWidth="0.5"/>
        <rect x="7" y="15" width="18" height="3" fill="#fff" stroke="#808080" strokeWidth="0.5"/>
        <rect x="10" y="14" width="4" height="5" fill="#c0c0c0" stroke="#000" strokeWidth="0.5"/>
        <rect x="7" y="22" width="18" height="3" fill="#fff" stroke="#808080" strokeWidth="0.5"/>
        <rect x="18" y="21" width="4" height="5" fill="#c0c0c0" stroke="#000" strokeWidth="0.5"/>
      </svg>
    ),
    run: (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
        {/* Window frame */}
        <rect x="4" y="4" width="24" height="20" fill="#c0c0c0" stroke="#000" strokeWidth="1"/>
        {/* Title bar */}
        <rect x="5" y="5" width="22" height="4" fill="#000080"/>
        {/* Content area */}
        <rect x="5" y="9" width="22" height="14" fill="#fff"/>
        {/* Cursor */}
        <rect x="7" y="12" width="1" height="8" fill="#000"/>
        {/* Arrow */}
        <polygon points="20,14 28,18 20,22" fill="#000080"/>
      </svg>
    ),
    app: (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
        {/* Window */}
        <rect x="4" y="4" width="24" height="24" fill="#c0c0c0" stroke="#000" strokeWidth="1"/>
        <rect x="5" y="5" width="22" height="4" fill="#000080"/>
        <rect x="6" y="10" width="20" height="16" fill="#fff"/>
        {/* Content */}
        <rect x="8" y="12" width="12" height="2" fill="#000080"/>
        <rect x="8" y="16" width="16" height="1" fill="#808080"/>
        <rect x="8" y="19" width="14" height="1" fill="#808080"/>
        <rect x="8" y="22" width="10" height="1" fill="#808080"/>
      </svg>
    ),
    windows: (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
        {/* Windows logo - 4 colored squares with perspective */}
        <rect x="3" y="3" width="12" height="12" fill="#ff0000" stroke="#800000" strokeWidth="0.5"/>
        <rect x="17" y="3" width="12" height="12" fill="#00aa00" stroke="#005500" strokeWidth="0.5"/>
        <rect x="3" y="17" width="12" height="12" fill="#0000ff" stroke="#000080" strokeWidth="0.5"/>
        <rect x="17" y="17" width="12" height="12" fill="#ffff00" stroke="#808000" strokeWidth="0.5"/>
      </svg>
    ),
  };

  return (
    <span aria-hidden="true" className="inline-flex items-center justify-center" style={{ width: s, height: s }}>
      {icons[type] || icons.app}
    </span>
  );
}
