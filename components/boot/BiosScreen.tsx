"use client";

const lines = [
  "Award Modular BIOS v4.51PG, An Energy Star Ally",
  "Copyright (C) 1984-95, Award Software, Inc.",
  "",
  "ASUS P/I-P55T2P4 BIOS REV. 2.2",
  "Intel Pentium-S CPU at 166MHz",
  "Memory Test :   65536K OK",
  "",
  "Award Plug and Play BIOS Extension v1.0A",
  "Detecting HDD Primary Master ... WDC AC21600H",
  "Detecting HDD Primary Slave  ... None",
  "Detecting HDD Secondary Master... ATAPI CD-ROM",
  "",
  "Starting Windows 95...",
];

export function BiosScreen({ progress }: { progress: number }) {
  const visible = Math.min(lines.length, Math.floor(progress * lines.length) + 1);
  return (
    <div className="flex h-screen w-screen items-start bg-black p-4 font-mono text-[14px] leading-[20px] text-[#aaaaaa]">
      <div className="w-full">
        {lines.slice(0, visible).map((line, index) => (
          <div key={`${line}-${index}`} className={index === 0 ? "text-white font-bold" : ""}>
            {line || "\u00a0"}
          </div>
        ))}
        {visible < lines.length && (
          <span className="inline-block w-[8px] h-[14px] bg-[#aaaaaa] animate-pulse" />
        )}
      </div>
    </div>
  );
}
