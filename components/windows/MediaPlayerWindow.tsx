"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { WindowComponentProps } from "@/lib/windows";

export function MediaPlayerWindow({ window: win, playSound }: WindowComponentProps) {
  const videoFile = win.payload ? "/video/never-gonna-give-you-up.mp4" : null;
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);
  const [muted, setMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hasTriedAutoplay = useRef(false);

  useEffect(() => {
    if (!videoFile) {
      audioRef.current = new Audio("/sounds/windows-98-startup-sound.mp3");
    }
    return () => {
      audioRef.current?.pause();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [videoFile]);

  // Auto-play video - try with sound first, fallback to muted
  useEffect(() => {
    if (!videoFile || !videoRef.current || hasTriedAutoplay.current) return;
    hasTriedAutoplay.current = true;
    const video = videoRef.current;
    video.volume = volume / 100;
    video.muted = false;

    video.play().then(() => {
      setPlaying(true);
    }).catch(() => {
      // Browser blocked autoplay with sound, try muted
      video.muted = true;
      setMuted(true);
      video.play().then(() => {
        setPlaying(true);
      }).catch(() => {
        // Even muted failed, user needs to click
      });
    });
  }, [videoFile, volume]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  const play = useCallback(() => {
    if (videoFile && videoRef.current) {
      videoRef.current.muted = false;
      setMuted(false);
      videoRef.current.play().catch(() => {});
      setPlaying(true);
      return;
    }
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().catch(() => playSound("startup"));
    setPlaying(true);
    setProgress(0);

    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (audio.duration) {
        const pct = (audio.currentTime / audio.duration) * 100;
        setProgress(pct);
        if (audio.ended) {
          setPlaying(false);
          setProgress(0);
          clearInterval(intervalRef.current!);
        }
      }
    }, 100);
  }, [videoFile, playSound]);

  const pause = useCallback(() => {
    if (videoFile && videoRef.current) {
      videoRef.current.pause();
      setPlaying(false);
      return;
    }
    audioRef.current?.pause();
    setPlaying(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, [videoFile]);

  const stop = useCallback(() => {
    if (videoFile && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setPlaying(false);
      setProgress(0);
      setCurrentTime(0);
      return;
    }
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setPlaying(false);
    setProgress(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, [videoFile]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const ct = videoRef.current.currentTime;
      const dur = videoRef.current.duration || 0;
      setCurrentTime(ct);
      setDuration(dur);
      setProgress(dur > 0 ? (ct / dur) * 100 : 0);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    if (videoFile && videoRef.current && videoRef.current.duration) {
      videoRef.current.currentTime = pct * videoRef.current.duration;
    }
  };

  const handleUnmute = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      setMuted(false);
      if (!playing) {
        videoRef.current.play().catch(() => {});
        setPlaying(true);
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#c0c0c0]">
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
      <div className="flex-1 bg-black flex items-center justify-center mx-[3px] mt-[3px] relative overflow-hidden min-h-0">
        {videoFile ? (
          <>
            <video
              ref={videoRef}
              src={videoFile}
              className="w-full h-full object-contain"
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => setPlaying(false)}
              onLoadedMetadata={() => {
                if (videoRef.current) setDuration(videoRef.current.duration);
              }}
              playsInline
            />
            {muted && (
              <button
                className="absolute top-2 right-2 bg-[#c0c0c0] border border-[#808080] px-2 py-1 text-[10px] hover:bg-[#dfdfdf]"
                onClick={handleUnmute}
                style={{ boxShadow: "inset -1px -1px #0a0a0a, inset 1px 1px #ffffff" }}
              >
                🔊 Click to unmute
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
            {playing && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-ping" />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Track info bar */}
      <div
        className="flex items-center h-[20px] mx-[3px] mt-[3px] px-2 bg-white text-[10px]"
        style={{ boxShadow: "inset 1px 1px #808080, inset -1px -1px #dfdfdf" }}
      >
        <span className="text-[11px] mr-1">🎬</span>
        <span className="truncate flex-1">{win.payload || "Windows Media Player"}</span>
        {videoFile && duration > 0 && (
          <span className="text-[9px] text-[#808080] ml-2 shrink-0">
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
        <div className="w-[60px] h-[6px] border border-[#808080] bg-white ml-1 relative">
          <div className="h-full bg-[#000080]" style={{ width: `${volume}%` }} />
        </div>
      </div>

      {/* Seek/Progress bar */}
      <div
        className="mx-[3px] mb-[3px] h-[10px] cursor-pointer relative"
        style={{ boxShadow: "inset 1px 1px #808080, inset -1px -1px #dfdfdf", background: "#000" }}
        onClick={handleSeek}
      >
        <div
          className="h-full transition-all duration-75"
          style={{ width: `${progress}%`, background: "linear-gradient(to right, #000080, #1084d0)" }}
        />
      </div>
    </div>
  );
}
