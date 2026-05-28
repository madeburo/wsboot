"use client";

import { useState, useRef, useCallback } from "react";
import type { WindowComponentProps } from "@/lib/windows";

export function NotepadWindow({ window: win, closeWindow, notify, playSound }: WindowComponentProps) {
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState("Untitled");
  const [wordWrap, setWordWrap] = useState(true);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleNew = useCallback(() => {
    if (text && !globalThis.window.confirm("Do you want to save changes?")) return;
    setText("");
    setFileName("Untitled");
    playSound("click");
  }, [text, playSound]);

  const handleSelectAll = useCallback(() => {
    textareaRef.current?.select();
    playSound("click");
  }, [playSound]);

  const handleCopy = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const selected = text.substring(textarea.selectionStart, textarea.selectionEnd);
    if (selected) {
      navigator.clipboard.writeText(selected).catch(() => {});
      notify("Copied to clipboard.");
    }
    playSound("click");
  }, [text, notify, playSound]);

  const handlePaste = useCallback(async () => {
    try {
      const clipText = await navigator.clipboard.readText();
      const textarea = textareaRef.current;
      if (!textarea) return;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newText = text.substring(0, start) + clipText + text.substring(end);
      setText(newText);
      playSound("click");
    } catch {
      notify("Cannot paste from clipboard.");
    }
  }, [text, notify, playSound]);

  const handleCut = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const selected = text.substring(textarea.selectionStart, textarea.selectionEnd);
    if (selected) {
      navigator.clipboard.writeText(selected).catch(() => {});
      const newText = text.substring(0, textarea.selectionStart) + text.substring(textarea.selectionEnd);
      setText(newText);
    }
    playSound("click");
  }, [text, playSound]);

  const handleTimeDate = useCallback(() => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString() + " " + now.toLocaleDateString();
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const newText = text.substring(0, start) + timeStr + text.substring(start);
    setText(newText);
    playSound("click");
  }, [text, playSound]);

  const menuItems: Record<string, { label: string; action: () => void; disabled?: boolean }[]> = {
    File: [
      { label: "New", action: handleNew },
      { label: "Save", action: () => { notify("Save is not available in browser."); playSound("error"); } },
      { label: "Exit", action: () => closeWindow(win.instanceId) },
    ],
    Edit: [
      { label: "Undo", action: () => { playSound("error"); }, disabled: true },
      { label: "Cut", action: handleCut },
      { label: "Copy", action: handleCopy },
      { label: "Paste", action: handlePaste },
      { label: "Select All", action: handleSelectAll },
      { label: "Time/Date", action: handleTimeDate },
    ],
    Search: [
      { label: "Find...", action: () => { notify("Find is not implemented yet."); playSound("error"); } },
    ],
    Help: [
      { label: "About Notepad", action: () => { notify("Notepad for WSBoot. A simple text editor."); playSound("click"); } },
    ],
  };

  return (
    <div className="flex h-full flex-col" onClick={() => setOpenMenu(null)}>
      {/* Menu bar */}
      <div className="window-menu-bar">
        {Object.keys(menuItems).map((menu) => (
          <div key={menu} className="relative">
            <button
              className="window-menu-item"
              onClick={(e) => {
                e.stopPropagation();
                setOpenMenu(openMenu === menu ? null : menu);
              }}
              onMouseEnter={() => {
                if (openMenu) setOpenMenu(menu);
              }}
            >
              {menu}
            </button>
            {openMenu === menu && (
              <div
                className="absolute left-0 top-full z-50 min-w-[160px] border border-[#808080] bg-[#c0c0c0] py-[2px] shadow-md"
                onClick={(e) => e.stopPropagation()}
              >
                {menuItems[menu].map((item, i) => (
                  <button
                    key={i}
                    className="menu-command"
                    disabled={item.disabled}
                    aria-disabled={item.disabled}
                    onClick={() => {
                      item.action();
                      setOpenMenu(null);
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Word Wrap toggle in Format-like position */}
        <div className="relative">
          <button
            className="window-menu-item"
            onClick={(e) => {
              e.stopPropagation();
              setOpenMenu(openMenu === "Format" ? null : "Format");
            }}
            onMouseEnter={() => {
              if (openMenu) setOpenMenu("Format");
            }}
          >
            Format
          </button>
          {openMenu === "Format" && (
            <div
              className="absolute left-0 top-full z-50 min-w-[160px] border border-[#808080] bg-[#c0c0c0] py-[2px] shadow-md"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="menu-command"
                onClick={() => {
                  setWordWrap(!wordWrap);
                  setOpenMenu(null);
                  playSound("click");
                }}
              >
                {wordWrap ? "✓ " : "  "}Word Wrap
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Text area */}
      <div className="min-h-0 flex-1 p-0">
        <textarea
          ref={textareaRef}
          className="h-full w-full resize-none border-0 bg-white p-1 text-[13px] text-black outline-none"
          style={{
            fontFamily: "\"Fixedsys\", \"Courier New\", monospace",
            whiteSpace: wordWrap ? "pre-wrap" : "pre",
            overflowWrap: wordWrap ? "break-word" : "normal",
            overflowX: wordWrap ? "hidden" : "auto",
          }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          spellCheck={false}
          aria-label="Text editor"
        />
      </div>
    </div>
  );
}
