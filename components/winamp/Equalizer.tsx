"use client";

export function Equalizer({ playing }: { playing: boolean }) {
  return (
    <div className="flex h-16 items-end gap-1 bg-black p-2">
      {Array.from({ length: 14 }, (_, index) => (
        <span
          key={index}
          className="w-2 bg-[#3dff54]"
          style={{
            height: playing ? `${18 + ((index * 17) % 38)}px` : "8px",
            animation: playing ? `eq ${0.45 + (index % 4) * 0.08}s steps(3) infinite alternate` : "none",
          }}
        />
      ))}
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
