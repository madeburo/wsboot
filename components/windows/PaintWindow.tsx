"use client";

const tools = ["✣", "▣", "⌇", "◈", "⌕", "◯", "✎", "♜", "◒", "A", "╲", "〜", "□", "▱", "○", "▭"];
const colors = [
  "#000000",
  "#808080",
  "#800000",
  "#ff0000",
  "#808000",
  "#ffff00",
  "#008000",
  "#00ff00",
  "#008080",
  "#00ffff",
  "#000080",
  "#0000ff",
  "#800080",
  "#ff00ff",
  "#808040",
  "#ffffff",
  "#c0c0c0",
  "#404040",
  "#804000",
  "#ff8040",
  "#408000",
  "#80ff00",
  "#004080",
  "#4080ff",
  "#400080",
  "#8040ff",
  "#ff8080",
  "#ffd0a0",
  "#80ffff",
  "#d0d0ff",
];

export function PaintWindow() {
  return (
    <div className="flex h-full flex-col bg-[#c0c0c0] text-[12px]">
      <div className="window-menu-bar">
        {["File", "Edit", "View", "Image", "Colors", "Help", "Extras"].map((item) => (
          <button key={item} className="window-menu-item" style={{ marginRight: 10 }}>
            <span className="underline">{item[0]}</span>{item.slice(1)}
          </button>
        ))}
      </div>
      <div className="flex min-h-0 flex-1">
        <aside className="w-[54px] shrink-0 border-r border-[#808080] bg-[#c0c0c0] p-[4px]">
          <div className="grid grid-cols-2 gap-[1px]">
            {tools.map((tool, index) => (
              <button
                key={`${tool}-${index}`}
                className={`flex h-[24px] w-[22px] items-center justify-center text-[14px] ${
                  index === 6 ? "win-button active p-0" : "win-button p-0"
                }`}
                title={`Tool ${index + 1}`}
              >
                {tool}
              </button>
            ))}
          </div>
          <div className="mt-[6px] h-[82px] border border-[#ffffff] bg-[#bcbcbc] shadow-[inset_1px_1px_#808080]" />
        </aside>
        <main className="min-w-0 flex-1 overflow-auto bg-[#808080] p-[2px]">
          <div className="relative h-[330px] w-[520px] bg-white shadow-[0_0_0_1px_#000]">
            <span className="absolute -left-[3px] -top-[3px] h-[5px] w-[5px] bg-[#000080]" />
            <span className="absolute -right-[3px] -top-[3px] h-[5px] w-[5px] bg-[#000080]" />
            <span className="absolute -bottom-[3px] left-1/2 h-[5px] w-[5px] bg-[#000080]" />
            <span className="absolute -bottom-[3px] -left-[3px] h-[5px] w-[5px] bg-[#000080]" />
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 520 330" aria-hidden="true">
              <path d="M92 245C135 184 204 196 245 238C286 281 354 286 400 218" fill="none" stroke="#008080" strokeWidth="5" strokeLinecap="square" />
              <path d="M116 282L188 220L242 294L320 250" fill="none" stroke="#ff0000" strokeWidth="3" />
              <rect x="450" y="82" width="110" height="72" fill="#ffff80" stroke="#000080" strokeWidth="3" />
              <circle cx="504" cy="246" r="45" fill="none" stroke="#0000ff" strokeWidth="4" />
            </svg>
          </div>
        </main>
      </div>
      <div className="flex h-[46px] items-center border-t border-[#ffffff] bg-[#c0c0c0] px-[6px]">
        <div className="mr-[8px] grid h-[32px] w-[32px] grid-cols-2 grid-rows-2 border border-[#808080] bg-white">
          <span className="col-span-1 row-span-1 bg-black" />
          <span className="col-span-1 row-span-1 bg-white" />
          <span className="col-span-2 row-span-1 bg-[#c0c0c0]" />
        </div>
        <div className="grid grid-cols-[repeat(15,18px)] gap-[1px]">
          {colors.map((color) => (
            <button key={color} className="h-[16px] w-[18px] border border-[#808080]" style={{ background: color }} aria-label={color} />
          ))}
        </div>
      </div>
      <div className="status-bar">
        <p className="status-bar-field">For Help, click Help Topics on the Help Menu.</p>
        <p className="status-bar-field max-w-[150px]" />
        <p className="status-bar-field max-w-[150px]" />
      </div>
    </div>
  );
}
