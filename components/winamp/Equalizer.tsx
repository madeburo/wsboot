"use client";

export function Equalizer({ playing }: { playing: boolean }) {
  return (
    <div className="mb-[3px] border border-[#000] bg-[#282b46] p-[5px]">
      <div className="mb-[4px] flex items-center justify-between text-[9px] text-white">
        <span>ON</span>
        <span>WINAMP EQUALIZER</span>
        <span>PRESETS</span>
      </div>
      <div className="flex h-[74px] items-end gap-[6px] bg-[#20233b] px-[8px] py-[6px]">
        {Array.from({ length: 10 }, (_, index) => (
          <span
            key={index}
            className="w-[4px] bg-[#f0d93e] shadow-[1px_0_#5c5200]"
            style={{
              height: playing ? `${24 + ((index * 13) % 36)}px` : `${20 + (index % 3) * 6}px`,
              animation: playing ? `eq ${0.45 + (index % 4) * 0.08}s steps(3) infinite alternate` : "none",
            }}
          />
        ))}
      </div>
      <style jsx>{`
        @keyframes eq {
          from {
            transform: scaleY(0.45);
          }
          to {
            transform: scaleY(1);
          }
        }
      `}</style>
    </div>
  );
}
