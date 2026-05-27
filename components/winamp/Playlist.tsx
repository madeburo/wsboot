"use client";

const tracks = ["boot_sector_dreams.mod", "teal_desktop_radio.xm", "floppy_afterhours.it", "system_ready.wav"];

export function Playlist({ active, onSelect }: { active: number; onSelect: (index: number) => void }) {
  return (
    <div className="win-bevel-inset h-28 overflow-auto bg-[#101010] p-1 font-mono text-[#3dff54]">
      {tracks.map((track, index) => (
        <button
          key={track}
          className={`block w-full px-1 text-left ${active === index ? "bg-[#003b00] text-white" : ""}`}
          onClick={() => onSelect(index)}
        >
          {String(index + 1).padStart(2, "0")}. {track}
        </button>
      ))}
    </div>
  );
}
