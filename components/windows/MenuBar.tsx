"use client";

export function MenuBar({ onHelp }: { onHelp?: () => void }) {
  return (
    <div className="mb-[2px] flex border-b border-[#808080] bg-[#c0c0c0] text-[11px]">
      {["File", "Edit", "View"].map((item) => (
        <button key={item} className="px-[6px] py-[2px] hover:bg-[#000080] hover:text-white">
          <span className="underline">{item[0]}</span>{item.slice(1)}
        </button>
      ))}
      <button className="px-[6px] py-[2px] hover:bg-[#000080] hover:text-white" onClick={onHelp}>
        <span className="underline">H</span>elp
      </button>
    </div>
  );
}
