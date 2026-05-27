"use client";

export function Doom({ playSound }: { playSound: (name: string) => void }) {
  return (
    <div className="mx-auto flex max-w-[640px] flex-col bg-black p-2 font-mono text-[11px] text-[#d7d7d7]">
      <div className="relative aspect-[4/3] overflow-hidden border-2 border-[#555] bg-[#3b2c24]">
        <div className="absolute inset-x-0 top-0 h-[42%] bg-[#5b5f69]" />
        <div className="absolute inset-x-0 bottom-0 h-[58%] bg-[repeating-linear-gradient(90deg,#4d372d_0_12px,#3b2c24_12px_24px)]" />
        <div className="absolute left-[15%] top-[18%] h-[52%] w-[18%] bg-[#282828] shadow-[inset_4px_0_#7b5a45,inset_-4px_0_#181818]" />
        <div className="absolute right-[12%] top-[20%] h-[48%] w-[20%] bg-[#2b2b2b] shadow-[inset_4px_0_#7b5a45,inset_-4px_0_#171717]" />
        <div className="absolute left-1/2 top-[33%] h-[50px] w-[42px] -translate-x-1/2 bg-[#6a3c33]">
          <div className="mx-auto mt-2 h-4 w-6 bg-[#2b2b2b]" />
          <div className="mx-auto mt-1 h-2 w-8 bg-[#9a6a35]" />
        </div>
        <div className="absolute bottom-0 left-1/2 h-[92px] w-[120px] -translate-x-1/2 bg-[#777] [clip-path:polygon(35%_0,65%_0,100%_100%,0_100%)]">
          <div className="mx-auto mt-5 h-[60px] w-[34px] bg-[#333]" />
        </div>
      </div>
      <div className="grid grid-cols-[1fr_90px_1fr] bg-[#7a7a7a] text-black">
        <div className="flex items-center justify-around border-2 border-[#2a2a2a] p-2">
          <b>AMMO 50</b>
          <b>HEALTH 100%</b>
        </div>
        <button
          className="border-2 border-[#2a2a2a] bg-[#b0b0b0] font-bold"
          onClick={() => playSound("click")}
        >
          DOOM
        </button>
        <div className="flex items-center justify-around border-2 border-[#2a2a2a] p-2">
          <b>ARMOR 0%</b>
          <b>ARMS 2</b>
        </div>
      </div>
    </div>
  );
}
