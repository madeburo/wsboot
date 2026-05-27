"use client";

export function WindowsLoadingScreen() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-[#0000aa]">
      {/* Windows 95 logo area */}
      <div className="flex flex-col items-center">
        {/* Cloud-like background with logo */}
        <div className="relative mb-4 flex h-[200px] w-[340px] max-w-[90vw] flex-col items-center justify-center rounded-none bg-gradient-to-b from-[#6699cc] via-[#99bbdd] to-[#6699cc]">
          {/* Windows flag logo */}
          <div className="mb-3 grid h-[60px] w-[60px] grid-cols-2 gap-[3px]" style={{ transform: "perspective(200px) rotateY(-10deg)" }}>
            <span className="bg-[#ff0000]" />
            <span className="bg-[#00aa00]" />
            <span className="bg-[#0000ff]" />
            <span className="bg-[#ffff00]" />
          </div>
          {/* Microsoft text */}
          <div className="text-[13px] text-black" style={{ fontFamily: "serif", fontStyle: "italic" }}>Microsoft</div>
          {/* Windows 95 text */}
          <div className="flex items-baseline gap-1">
            <span className="text-[28px] font-bold text-black" style={{ fontFamily: "serif" }}>Windows</span>
            <span className="text-[36px] font-light text-[#404040]" style={{ fontFamily: "sans-serif" }}>95</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-6 h-[18px] w-[220px] overflow-hidden border border-[#808080] bg-[#c0c0c0]" style={{
          boxShadow: "inset -1px -1px #fff, inset 1px 1px #808080, inset -2px -2px #dfdfdf, inset 2px 2px #0a0a0a"
        }}>
          <div className="h-full animate-[progress_1.5s_steps(12)_infinite]" style={{
            background: "repeating-linear-gradient(90deg, #000080 0px, #000080 8px, #c0c0c0 8px, #c0c0c0 10px)"
          }} />
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}
