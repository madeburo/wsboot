"use client";

import { useRef, useState, useCallback } from "react";
import type { WindowComponentProps } from "@/lib/windows";

export function MediaPlayerWindow({ window: win, playSound }: WindowComponentProps) {
  const videoFile = win.payload ? "/video/never-gonna-give-you-up.mp4" : null;
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume] = useState(70);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  const play = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    setMuted(false);
    video.play().then(() => {
      setPlaying(true);
    }).catch(() => {
      // If unmuted play fails, try muted
      video.muted = true;
      setMuted(true);
      video.play().then(() => setPlaying(true)).catch(() => {});
    });
  }, []);

  const pause = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    setPlaying(false);
  }, []);

  const stop = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
    setPlaying(false);
    setProgress(0);
    setCurrentTime(0);
  }, []);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    const ct = video.currentTime;
    const dur = video.duration || 0;
    setCurrentTime(ct);
    setDuration(dur);
    setProgress(dur > 0 ? (ct / dur) * 100 : 0);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    video.currentTime = pct * video.duration;
  };

  const handleUnmute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    setMuted(false);
  };

  const handleCanPlay = () => {
    const video = videoRef.current;
    if (!video) return;
    setDuration(video.duration || 0);
    if (!playing) {
      setPlaying(true);
    }
  };

  return (
    <div className="flex flex-col h-full" style={{ background: "#c0c0c0" }}>
      {/* Menu bar */}
      <div className="window-menu-bar">
        <button className="window-menu-item">File</button>
        <button className="window-menu-item">View</button>
        <button className="window-menu-item">Play</button>
        <button className="window-menu-item">Navigate</button>
        <button className="window-menu-item">Favorites</button>
        <button className="window-menu-item">Help</button>
      </div>

      {/* Video/Display area */}
      <div className="flex-1 flex items-center justify-center mx-[3px] mt-[3px] relative overflow-hidden min-h-0" style={{ background: "#000" }}>
        {videoFile ? (
          <>
            <video
              ref={videoRef}
              src={videoFile}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-contain"
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => setPlaying(false)}
              onCanPlay={handleCanPlay}
              onLoadedMetadata={() => {
                if (videoRef.current) setDuration(videoRef.current.duration);
              }}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
            />
            {muted && (
              <button
                className="absolute top-2 right-2 px-3 py-1 text-[11px]"
                onClick={handleUnmute}
                style={{
                  background: "#c0c0c0",
                  border: "none",
                  boxShadow: "inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf",
                }}
              >
                🔊 Click for sound
              </button>
            )}
          </>
        ) : (
          <div className="relative">
            <svg width="120" height="100" viewBox="0 0 120 100" fill="none">
              <g transform="translate(20, 10) rotate(-5)">
                <rect x="0" y="0" width="35" height="35" fill="#ff0000" rx="2" transform="skewY(-5) skewX(-3)" />
                <rect x="40" y="0" width="35" height="35" fill="#00b800" rx="2" transform="skewY(-5) skewX(-3)" />
                <rect x="0" y="40" width="35" height="35" fill="#0000ff" rx="2" transform="skewY(-5) skewX(-3)" />
                <rect x="40" y="40" width="35" height="35" fill="#ffb800" rx="2" transform="skewY(-5) skewX(-3)" />
              </g>
            </svg>
          </div>
        )}
      </div>

      {/* Track info bar */}
      <div
        className="flex items-center h-[20px] mx-[3px] mt-[3px] px-2 text-[10px]"
        style={{ background: "#fff", boxShadow: "inset 1px 1px #808080, inset -1px -1px #dfdfdf" }}
      >
        <span className="text-[11px] mr-1">🎬</span>
        <span className="truncate flex-1" style={{ color: "#000" }}>{win.payload || "Windows Media Player"}</span>
        {videoFile && duration > 0 && (
          <span className="text-[9px] ml-2 shrink-0" style={{ color: "#808080" }}>
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        )}
      </div>

      {/* Transport controls */}
      <div className="flex items-center gap-[2px] mx-[3px] mt-[3px] mb-[2px] px-[2px] h-[26px]">
        <button
          onClick={play}
          className="win-button w-[26px] h-[22px] flex items-center justify-center text-[12px]"
          title="Play"
          style={{ background: "#c0c0c0" }}
        >
          ▶
        </button>
        <button
          onClick={pause}
          className="win-button w-[26px] h-[22px] flex items-center justify-center text-[11px]"
          title="Pause"
          style={{ background: "#c0c0c0" }}
        >
          ⏸
        </button>
        <button
          onClick={stop}
          className="win-button w-[26px] h-[22px] flex items-center justify-center text-[11px]"
          title="Stop"
          style={{ background: "#c0c0c0" }}
        >
          ⏹
        </button>

        {/* Separator */}
        <div className="w-[1px] h-[18px] mx-[2px]" style={{ borderLeft: "1px solid #808080", borderRight: "1px solid #ffffff" }} />

        <button className="win-button w-[26px] h-[22px] flex items-center justify-center text-[10px]" title="Previous" style={{ background: "#c0c0c0" }}>⏮</button>
        <button className="win-button w-[26px] h-[22px] flex items-center justify-center text-[10px]" title="Rewind" style={{ background: "#c0c0c0" }}>⏪</button>
        <button className="win-button w-[26px] h-[22px] flex items-center justify-center text-[10px]" title="Fast Forward" style={{ background: "#c0c0c0" }}>⏩</button>
        <button className="win-button w-[26px] h-[22px] flex items-center justify-center text-[10px]" title="Next" style={{ background: "#c0c0c0" }}>⏭</button>

        {/* Separator */}
        <div className="w-[1px] h-[18px] mx-[2px]" style={{ borderLeft: "1px solid #808080", borderRight: "1px solid #ffffff" }} />

        {/* Volume */}
        <span className="text-[12px] ml-1">🔊</span>
        <div className="w-[60px] h-[6px] ml-1 relative" style={{ border: "1px solid #808080", background: "#fff" }}>
          <div className="h-full" style={{ width: `${volume}%`, background: "#000080" }} />
        </div>
      </div>

      {/* Seek/Progress bar */}
      <div
        className="mx-[3px] mb-[3px] h-[10px] cursor-pointer relative"
        style={{ boxShadow: "inset 1px 1px #808080, inset -1px -1px #dfdfdf", background: "#000" }}
        onClick={handleSeek}
      >
        <div
          className="h-full"
          style={{ width: `${progress}%`, background: "linear-gradient(to right, #000080, #1084d0)", transition: "width 0.1s" }}
        />
      </div>
    </div>
  );
}
