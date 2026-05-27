"use client";

const tracks = ["boot_sector_dreams.mod", "teal_desktop_radio.xm", "floppy_afterhours.it", "system_ready.wav"];

export function Playlist({ active, onSelect }: { active: number; onSelect: (index: number) => void }) {
  return (
    <div className="h-[132px] overflow-auto border border-[#000] bg-[#050505] p-[5px] font-mono text-[10px] text-[#39ff14]">
      <div className="mb-[4px] border-b border-[#3a3a3a] pb-[2px] text-center text-[9px] text-white">WINAMP PLAYLIST</div>
      {tracks.map((track, index) => (
        <button
          key={track}
          className={`block w-full px-1 text-left leading-[17px] ${active === index ? "bg-[#000080] text-white" : ""}`}
          onClick={() => onSelect(index)}
        >
          {String(index + 1).padStart(2, "0")}. {track} <span className="float-right">0:05</span>
        </button>
      ))}
    </div>
  );
}
