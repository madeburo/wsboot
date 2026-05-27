"use client";

type Props = {
  x: number;
  y: number;
  target?: string;
  onOpen: () => void;
  onClose: () => void;
};

export function ContextMenu({ x, y, target, onOpen, onClose }: Props) {
  return (
    <div
      className="fixed z-[5000] min-w-[160px] bg-[#c0c0c0] py-[2px]"
      style={{
        left: x,
        top: y,
        boxShadow: "inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf"
      }}
      role="menu"
      onClick={(event) => event.stopPropagation()}
    >
      {target && (
        <>
          <button className="menu-command font-bold" onClick={onOpen}>
            Open
          </button>
          <div className="mx-[2px] h-[1px] bg-[#808080] shadow-[0_1px_0_#fff]" />
        </>
      )}
      {!target && (
        <>
          <button className="menu-command" onClick={onClose}>
            Arrange Icons
          </button>
          <button className="menu-command" onClick={onClose}>
            Line up Icons
          </button>
          <div className="mx-[2px] h-[1px] bg-[#808080] shadow-[0_1px_0_#fff]" />
          <button className="menu-command" aria-disabled="true">
            Paste
          </button>
          <button className="menu-command" aria-disabled="true">
            Paste Shortcut
          </button>
          <div className="mx-[2px] h-[1px] bg-[#808080] shadow-[0_1px_0_#fff]" />
          <button className="menu-command" onClick={onClose}>
            New ▸
          </button>
          <div className="mx-[2px] h-[1px] bg-[#808080] shadow-[0_1px_0_#fff]" />
        </>
      )}
      <button className="menu-command" onClick={onClose}>
        Properties
      </button>
    </div>
  );
}
