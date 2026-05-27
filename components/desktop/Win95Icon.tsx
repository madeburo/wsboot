"use client";

import type { ReactNode } from "react";

type Props = {
  type: string;
  size?: number;
};

export function Win95Icon({ type, size = 32 }: Props) {
  const s = size;
  
  const icons: Record<string, ReactNode> = {
    computer: (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
        {/* Monitor */}
        <rect x="4" y="3" width="24" height="18" fill="#c0c0c0" stroke="#000" strokeWidth="1"/>
        <rect x="6" y="5" width="20" height="14" fill="#000080"/>
        <rect x="7" y="6" width="18" height="12" fill="#008080"/>
        {/* Stand */}
        <rect x="12" y="21" width="8" height="3" fill="#c0c0c0" stroke="#000" strokeWidth="1"/>
        <rect x="9" y="24" width="14" height="2" fill="#c0c0c0" stroke="#000" strokeWidth="1"/>
        {/* Power light */}
        <rect x="15" y="19" width="2" height="1" fill="#00ff00"/>
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
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
        {/* Folder tab */}
        <path d="M3 8 L3 6 L12 6 L14 8 Z" fill="#ffff00" stroke="#808000" strokeWidth="0.5"/>
        {/* Folder body */}
        <rect x="3" y="8" width="26" height="18" fill="#ffff00" stroke="#808000" strokeWidth="1"/>
        {/* Folder front face */}
        <rect x="3" y="12" width="26" height="14" fill="#ffff80" stroke="#808000" strokeWidth="1"/>
        {/* Shadow line */}
        <line x1="4" y1="9" x2="28" y2="9" stroke="#808000" strokeWidth="0.5"/>
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
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
        {/* CD */}
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
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
        {/* Bin body */}
        <path d="M8 10 L10 28 L22 28 L24 10 Z" fill="#c0c0c0" stroke="#000" strokeWidth="1"/>
        {/* Lid */}
        <rect x="7" y="7" width="18" height="3" fill="#c0c0c0" stroke="#000" strokeWidth="1"/>
        {/* Handle */}
        <rect x="13" y="5" width="6" height="2" fill="#c0c0c0" stroke="#000" strokeWidth="1"/>
        {/* Lines on bin */}
        <line x1="12" y1="13" x2="12" y2="25" stroke="#808080" strokeWidth="1"/>
        <line x1="16" y1="13" x2="16" y2="25" stroke="#808080" strokeWidth="1"/>
        <line x1="20" y1="13" x2="20" y2="25" stroke="#808080" strokeWidth="1"/>
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
