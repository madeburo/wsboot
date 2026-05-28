"use client";

import { useState } from "react";
import type { WindowComponentProps } from "@/lib/windows";

const BOOKMARKS = [
  { title: "WSBoot - Home", url: "www.wsboot.com" },
  { title: "My Projects", url: "www.wsboot.com/projects" },
  { title: "Contact", url: "www.wsboot.com/contact" },
];

const PAGES: Record<string, { title: string; content: React.ReactNode }> = {
  "www.wsboot.com": {
    title: "WSBoot - Home",
    content: (
      <div className="p-4 font-[serif] text-[14px]">
        <h1 className="text-[20px] font-bold text-[#000080] mb-2">Welcome to WSBoot</h1>
        <hr className="border-[#808080] mb-3" />
        <p className="mb-2">A Windows 98-inspired retro web desktop.</p>
        <p className="mb-2">Play Doom, Minesweeper, Solitaire. Use Winamp, Paint, Norton Commander.</p>
        <br />
        <p className="text-[12px] text-[#808080]">Best viewed with Internet Explorer 5.0 at 800x600</p>
      </div>
    ),
  },
  "www.wsboot.com/projects": {
    title: "Projects - WSBoot",
    content: (
      <div className="p-4 font-[serif] text-[14px]">
        <h1 className="text-[20px] font-bold text-[#000080] mb-2">My Projects</h1>
        <hr className="border-[#808080] mb-3" />
        <ul className="list-disc pl-5">
          <li className="mb-1"><span className="text-[#0000ff] underline cursor-pointer">WSBoot</span> - Retro web desktop</li>
          <li className="mb-1"><span className="text-[#0000ff] underline cursor-pointer">More coming soon...</span></li>
        </ul>
      </div>
    ),
  },
  "www.wsboot.com/contact": {
    title: "Contact - WSBoot",
    content: (
      <div className="p-4 font-[serif] text-[14px]">
        <h1 className="text-[20px] font-bold text-[#000080] mb-2">Contact</h1>
        <hr className="border-[#808080] mb-3" />
        <p className="mb-1">📧 Email: hi@wsboot.com</p>
        <p className="mb-1">🌐 Website: www.wsboot.com</p>
        <p className="mb-1">💻 GitHub: github.com/madeburo/wsboot</p>
      </div>
    ),
  },
};

const HOME_URL = "www.wsboot.com";

export function IEBrowserWindow({ playSound }: WindowComponentProps) {
  const [address, setAddress] = useState(HOME_URL);
  const [currentUrl, setCurrentUrl] = useState(HOME_URL);
  const [history, setHistory] = useState<string[]>([HOME_URL]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [statusText, setStatusText] = useState("Done");

  const navigate = (url: string) => {
    setLoading(true);
    setStatusText(`Opening page ${url}...`);
    playSound("click");

    setTimeout(() => {
      setCurrentUrl(url);
      setAddress(url);
      const newHistory = [...history.slice(0, historyIndex + 1), url];
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
      setLoading(false);
      setStatusText("Done");
    }, 400 + Math.random() * 600);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setCurrentUrl(history[newIndex]);
      setAddress(history[newIndex]);
      playSound("click");
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setCurrentUrl(history[newIndex]);
      setAddress(history[newIndex]);
      playSound("click");
    }
  };

  const handleGo = () => {
    const url = address.trim();
    if (url) navigate(url);
  };

  const page = PAGES[currentUrl];

  return (
    <div className="flex flex-col h-full bg-[#c0c0c0] text-[11px]">
      {/* Menu bar */}
      <div className="flex items-center h-[20px] px-1 border-b border-[#808080] bg-[#c0c0c0]">
        <span className="px-2 hover:underline cursor-default">File</span>
        <span className="px-2 hover:underline cursor-default">Edit</span>
        <span className="px-2 hover:underline cursor-default">View</span>
        <span className="px-2 hover:underline cursor-default">Favorites</span>
        <span className="px-2 hover:underline cursor-default">Tools</span>
        <span className="px-2 hover:underline cursor-default">Help</span>
      </div>

      {/* Toolbar */}
      <div className="flex items-center h-[50px] px-2 gap-1 border-b border-[#808080] bg-[#c0c0c0]">
        <button
          onClick={goBack}
          disabled={historyIndex <= 0}
          className="flex flex-col items-center justify-center w-[54px] h-[42px] hover:bg-[#dfdfdf] disabled:opacity-40 cursor-default"
        >
          <span className="text-[16px]">⬅</span>
          <span className="text-[10px]">Back</span>
        </button>
        <button
          onClick={goForward}
          disabled={historyIndex >= history.length - 1}
          className="flex flex-col items-center justify-center w-[54px] h-[42px] hover:bg-[#dfdfdf] disabled:opacity-40 cursor-default"
        >
          <span className="text-[16px]">➡</span>
          <span className="text-[10px]">Forward</span>
        </button>
        <button
          onClick={() => { setLoading(false); setStatusText("Done"); }}
          className="flex flex-col items-center justify-center w-[42px] h-[42px] hover:bg-[#dfdfdf] cursor-default"
        >
          <span className="text-[14px]">✕</span>
          <span className="text-[10px]">Stop</span>
        </button>
        <button
          onClick={() => navigate(currentUrl)}
          className="flex flex-col items-center justify-center w-[50px] h-[42px] hover:bg-[#dfdfdf] cursor-default"
        >
          <span className="text-[14px]">🔄</span>
          <span className="text-[10px]">Refresh</span>
        </button>
        <button
          onClick={() => navigate(HOME_URL)}
          className="flex flex-col items-center justify-center w-[42px] h-[42px] hover:bg-[#dfdfdf] cursor-default"
        >
          <span className="text-[14px]">🏠</span>
          <span className="text-[10px]">Home</span>
        </button>
        <div className="w-px h-[36px] bg-[#808080] mx-1" />
        <button className="flex flex-col items-center justify-center w-[48px] h-[42px] hover:bg-[#dfdfdf] cursor-default">
          <span className="text-[14px]">🔍</span>
          <span className="text-[10px]">Search</span>
        </button>
        <button className="flex flex-col items-center justify-center w-[56px] h-[42px] hover:bg-[#dfdfdf] cursor-default">
          <span className="text-[14px]">⭐</span>
          <span className="text-[10px]">Favorites</span>
        </button>
        <button className="flex flex-col items-center justify-center w-[48px] h-[42px] hover:bg-[#dfdfdf] cursor-default">
          <span className="text-[14px]">📋</span>
          <span className="text-[10px]">History</span>
        </button>
      </div>

      {/* Address bar */}
      <div className="flex items-center h-[24px] px-2 gap-1 border-b border-[#808080] bg-[#c0c0c0]">
        <span className="text-[11px] font-bold mr-1">Address</span>
        <div className="flex-1 flex items-center h-[18px] border border-[#808080] bg-white px-1">
          <span className="text-[12px] mr-1">🌐</span>
          <input
            className="flex-1 h-full bg-transparent outline-none text-[11px]"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleGo(); }}
          />
        </div>
        <button
          onClick={handleGo}
          className="h-[18px] px-2 border border-[#808080] bg-[#c0c0c0] text-[10px] hover:bg-[#dfdfdf] active:border-inset"
        >
          ↗ Go
        </button>
        <span className="text-[10px] ml-1 text-[#808080]">|</span>
        <span className="text-[10px] ml-1">Links »</span>
      </div>

      {/* Content area */}
      <div className="flex-1 bg-white overflow-auto border-t border-[#dfdfdf]">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-[12px] text-[#808080] animate-pulse">Loading...</div>
          </div>
        ) : page ? (
          page.content
        ) : (
          <div className="p-4 font-[serif] text-[14px]">
            <h1 className="text-[16px] font-bold text-[#000080] mb-2">
              The page cannot be displayed
            </h1>
            <hr className="border-[#808080] mb-3" />
            <p className="mb-2">The page you are looking for is currently unavailable.</p>
            <p className="text-[12px] text-[#808080]">Internet Explorer</p>
          </div>
        )}
      </div>

      {/* Status bar */}
      <div className="flex items-center h-[20px] px-2 border-t border-[#808080] bg-[#c0c0c0]">
        <div className="flex items-center gap-1 flex-1">
          <span className="text-[10px]">🌐</span>
          <span className="text-[10px]">{statusText}</span>
        </div>
        <div className="flex items-center gap-1 border-l border-[#808080] pl-2">
          <span className="text-[10px]">🌐</span>
          <span className="text-[10px]">Internet</span>
        </div>
      </div>
    </div>
  );
}
