"use client";

export function FlyingLogoScreensaver() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      {Array.from({ length: 9 }, (_, index) => (
        <div
          key={index}
          className="absolute grid h-12 w-12 grid-cols-2 gap-1"
          style={{
            left: `${(index * 13) % 80}%`,
            top: `${(index * 23) % 70}%`,
            animation: `fly-${index % 3} ${6 + index}s linear infinite alternate`,
          }}
        >
          <span className="bg-[#ff3b30]" />
          <span className="bg-[#00a2ff]" />
          <span className="bg-[#00b050]" />
          <span className="bg-[#ffd500]" />
        </div>
      ))}
      <style jsx>{`
        @keyframes fly-0 {
          to {
            transform: translate(22vw, 34vh) rotate(20deg);
          }
        }
        @keyframes fly-1 {
          to {
            transform: translate(-18vw, 28vh) rotate(-15deg);
          }
        }
        @keyframes fly-2 {
          to {
            transform: translate(30vw, -24vh) rotate(12deg);
          }
        }
      `}</style>
    </div>
  );
}
