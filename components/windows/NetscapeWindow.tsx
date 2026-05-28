"use client";

import { useState } from "react";
import type { WindowComponentProps } from "@/lib/windows";

const WAYBACK_PREFIX = "https://web.archive.org/web/1998/";
const HOME_URL = "https://www.yahoo.com/";

function toWaybackUrl(url: string): string {
  if (url.startsWith("https://web.archive.org/")) return url;
  let cleanUrl = url.trim();
  const lower = cleanUrl.toLowerCase();
  if (lower.startsWith("javascript:") || lower.startsWith("data:") || lower.startsWith("blob:") || lower.startsWith("vbscript:")) {
    return WAYBACK_PREFIX + "https://www.yahoo.com/";
  }
  if (!cleanUrl.startsWith("http://") && !cleanUrl.startsWith("https://")) {
    cleanUrl = "https://" + cleanUrl;
  }
  return WAYBACK_PREFIX + cleanUrl;
}

function getDisplayUrl(url: string): string {
  if (url.startsWith(WAYBACK_PREFIX)) {
    return url.slice(WAYBACK_PREFIX.length);
  }
  return url;
}

export function NetscapeWindow({ playSound }: WindowComponentProps) {
  const [address, setAddress] = useState(HOME_URL);
  const [currentUrl, setCurrentUrl] = useState(toWaybackUrl(HOME_URL));
  const [history, setHistory] = useState<string[]>([toWaybackUrl(HOME_URL)]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [statusText, setStatusText] = useState("Document: Loading...");

  const navigate = (url: string) => {
    const waybackUrl = toWaybackUrl(url);
    setLoading(true);
    setStatusText(`Document: Loading ${url}...`);
    setCurrentUrl(waybackUrl);
    setAddress(getDisplayUrl(waybackUrl));
    const newHistory = [...history.slice(0, historyIndex + 1), waybackUrl];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    playSound("click");
  };

  const goBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setCurrentUrl(history[newIndex]);
      setAddress(getDisplayUrl(history[newIndex]));
      setLoading(true);
      setStatusText("Document: Loading...");
      playSound("click");
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setCurrentUrl(history[newIndex]);
      setAddress(getDisplayUrl(history[newIndex]));
      setLoading(true);
      setStatusText("Document: Loading...");
      playSound("click");
    }
  };

  const handleGo = () => {
    const url = address.trim();
    if (url) navigate(url);
  };

  return (
    <div className="flex flex-col h-full bg-[#c0c0c0] text-[11px]">
      {/* Menu bar */}
      <div className="flex items-center h-[20px] px-1 border-b border-[#808080] bg-[#c0c0c0]">
        <span className="px-2 hover:underline cursor-default">File</span>
        <span className="px-2 hover:underline cursor-default">Edit</span>
        <span className="px-2 hover:underline cursor-default">View</span>
        <span className="px-2 hover:underline cursor-default">Go</span>
        <span className="px-2 hover:underline cursor-default">Window</span>
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
          onClick={() => navigate(getDisplayUrl(currentUrl))}
          className="flex flex-col items-center justify-center w-[50px] h-[42px] hover:bg-[#dfdfdf] cursor-default"
        >
          <span className="text-[14px]">🔄</span>
          <span className="text-[10px]">Reload</span>
        </button>
        <button
          onClick={() => navigate(HOME_URL)}
          className="flex flex-col items-center justify-center w-[42px] h-[42px] hover:bg-[#dfdfdf] cursor-default"
        >
          <span className="text-[14px]">🏠</span>
          <span className="text-[10px]">Home</span>
        </button>
        <button className="flex flex-col items-center justify-center w-[48px] h-[42px] hover:bg-[#dfdfdf] cursor-default">
          <span className="text-[14px]">🔍</span>
          <span className="text-[10px]">Search</span>
        </button>
        <button className="flex flex-col items-center justify-center w-[48px] h-[42px] hover:bg-[#dfdfdf] cursor-default">
          <span className="text-[14px]">📖</span>
          <span className="text-[10px]">Guide</span>
        </button>
        <button className="flex flex-col items-center justify-center w-[48px] h-[42px] hover:bg-[#dfdfdf] cursor-default">
          <span className="text-[14px]">🖨️</span>
          <span className="text-[10px]">Print</span>
        </button>
        <button className="flex flex-col items-center justify-center w-[54px] h-[42px] hover:bg-[#dfdfdf] cursor-default">
          <span className="text-[14px]">🔒</span>
          <span className="text-[10px]">Security</span>
        </button>
        <button
          onClick={() => { setLoading(false); setStatusText("Document: Done"); }}
          className="flex flex-col items-center justify-center w-[42px] h-[42px] hover:bg-[#dfdfdf] cursor-default"
        >
          <span className="text-[14px]">✕</span>
          <span className="text-[10px]">Stop</span>
        </button>

        {/* Netscape N logo */}
        <div className="ml-auto flex items-center justify-center w-[40px] h-[40px]">
          <img
            src="/icons/netscape.png"
            alt="Netscape"
            width={32}
            height={32}
            style={{ imageRendering: "pixelated" }}
            draggable={false}
          />
        </div>
      </div>

      {/* Bookmarks / Location bar */}
      <div className="flex items-center h-[24px] px-2 gap-1 border-b border-[#808080] bg-[#c0c0c0]">
        <span className="text-[11px] mr-1">📑 Bookmarks</span>
        <span className="text-[11px] font-bold mr-1">Location:</span>
        <div className="flex-1 flex items-center h-[18px] border border-[#808080] bg-white px-1">
          <input
            className="flex-1 h-full bg-transparent outline-none text-[11px]"
            style={{ color: "#000" }}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleGo(); }}
          />
        </div>
      </div>

      {/* Quick links bar */}
      <div className="flex items-center h-[20px] px-2 gap-3 border-b border-[#808080] bg-[#c0c0c0] text-[10px]">
        <button className="hover:underline cursor-default" onClick={() => navigate("https://www.yahoo.com/")}>Internet</button>
        <button className="hover:underline cursor-default" onClick={() => navigate("https://www.altavista.com/")}>Lookup</button>
        <button className="hover:underline cursor-default" onClick={() => navigate("https://www.geocities.com/")}>New&amp;Cool</button>
      </div>

      {/* Content area - iframe */}
      <div className="flex-1 bg-white overflow-hidden relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
            <div className="text-[12px] text-[#808080] animate-pulse">Loading...</div>
          </div>
        )}
        <iframe
          src={currentUrl}
          className="w-full h-full border-0"
          sandbox="allow-scripts allow-forms"
          onLoad={() => {
            setLoading(false);
            setStatusText("Document: Done");
          }}
          title="Netscape Navigator"
        />
      </div>

      {/* Status bar */}
      <div className="flex items-center h-[20px] px-2 border-t border-[#808080] bg-[#c0c0c0]">
        <span className="text-[10px]">{statusText}</span>
      </div>
    </div>
  );
}
