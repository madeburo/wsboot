"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { BootScreen } from "@/components/boot/BootScreen";
import { ContextMenu } from "./ContextMenu";
import { DesktopIcon } from "./DesktopIcon";
import { NotificationBalloon } from "./NotificationBalloon";
import { StartMenu } from "./StartMenu";
import { Taskbar } from "./Taskbar";
import { WindowFrame } from "@/components/windows/WindowFrame";
import { AboutWindow } from "@/components/windows/AboutWindow";
import { ContactWindow } from "@/components/windows/ContactWindow";
import { GamesWindow } from "@/components/windows/GamesWindow";
import { MusicWindow } from "@/components/windows/MusicWindow";
import { ProjectDetailsWindow } from "@/components/windows/ProjectDetailsWindow";
import { ProjectsWindow } from "@/components/windows/ProjectsWindow";
import { RunWindow } from "@/components/windows/RunWindow";
import { ScreensaverWindow } from "@/components/windows/ScreensaverWindow";
import { SettingsWindow } from "@/components/windows/SettingsWindow";
import { ShutDownOverlay } from "@/components/windows/ShutDownOverlay";
import { ScreensaverOverlay } from "@/components/screensavers/ScreensaverOverlay";
import { useDoubleClick } from "@/hooks/useDoubleClick";
import { useScreensaver } from "@/hooks/useScreensaver";
import { useSound } from "@/hooks/useSound";
import { useWindowManager } from "@/hooks/useWindowManager";
import { desktopIcons, WindowComponentProps, WindowId } from "@/lib/windows";

type MenuState = { x: number; y: number; target?: string } | null;

export default function Desktop() {
  const [booted, setBooted] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<MenuState>(null);
  const [startOpen, setStartOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [shutdownOpen, setShutdownOpen] = useState(false);
  const [safeToTurnOff, setSafeToTurnOff] = useState(false);
  const wm = useWindowManager();
  const { playSound, muted, setMuted } = useSound();
  const screensaver = useScreensaver(60000);

  const notify = useCallback(
    (message: string) => {
      setNotification(message);
      playSound("notification");
      window.setTimeout(() => setNotification(null), 2800);
    },
    [playSound],
  );

  const openWindow = useCallback(
    (id: WindowId, payload?: string) => {
      wm.openWindow(id, payload);
      setStartOpen(false);
      setContextMenu(null);
      playSound("open");
    },
    [playSound, wm],
  );

  const iconClick = useDoubleClick<string>(
    (id) => {
      setSelectedIcon(id);
      playSound("click");
    },
    (id) => {
      setSelectedIcon(id);
      if (id === "computer") {
        notify("C: drive reports 640K of excellent vibes.");
      } else if (id === "recycle") {
        notify("Recycle Bin is empty. Very responsible.");
      } else {
        openWindow(id as WindowId);
      }
    },
  );

  const renderWindow = (props: WindowComponentProps) => {
    switch (props.window.id) {
      case "about":
        return <AboutWindow {...props} />;
      case "projects":
        return <ProjectsWindow {...props} />;
      case "project-details":
        return <ProjectDetailsWindow {...props} />;
      case "contact":
        return <ContactWindow {...props} />;
      case "games":
        return <GamesWindow {...props} />;
      case "music":
        return <MusicWindow {...props} />;
      case "run":
        return <RunWindow {...props} />;
      case "settings":
        return <SettingsWindow {...props} />;
      case "screensaver":
        return <ScreensaverWindow {...props} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setContextMenu(null);
        setStartOpen(false);
      }
      if (event.ctrlKey && event.key === "Escape") {
        event.preventDefault();
        setStartOpen((value) => !value);
      }
      if (event.altKey && event.key === "F4" && wm.activeWindow) {
        event.preventDefault();
        wm.closeWindow(wm.activeWindow.instanceId);
        playSound("close");
      }
      if (event.key === "Enter" && selectedIcon) {
        if (selectedIcon !== "computer" && selectedIcon !== "recycle") openWindow(selectedIcon as WindowId);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [openWindow, playSound, selectedIcon, wm]);

  const commonProps = useMemo(
    () => ({
      openWindow,
      closeWindow: (instanceId: string) => {
        wm.closeWindow(instanceId);
        playSound("close");
      },
      notify,
      playSound,
      startScreensaver: screensaver.start,
    }),
    [notify, openWindow, playSound, screensaver.start, wm],
  );

  if (!booted) {
    return <BootScreen onComplete={() => setBooted(true)} playSound={playSound} />;
  }

  return (
    <main
      className="h-screen w-screen overflow-hidden bg-[#008080] pb-[28px]"
      onClick={() => {
        setContextMenu(null);
        setStartOpen(false);
        setSelectedIcon(null);
      }}
      onContextMenu={(event) => {
        event.preventDefault();
        setContextMenu({ x: event.clientX, y: event.clientY });
      }}
    >
      {/* Desktop icons grid - vertical columns like Win95 */}
      <div className="flex h-[calc(100vh-28px)] w-fit flex-col flex-wrap content-start gap-[2px] p-[4px]">
        {desktopIcons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            id={icon.id}
            label={icon.label}
            icon={icon.icon}
            selected={selectedIcon === icon.id}
            onClick={() => iconClick(icon.id)}
            onContextMenu={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setSelectedIcon(icon.id);
              setContextMenu({ x: event.clientX, y: event.clientY, target: icon.id });
            }}
          />
        ))}
      </div>

      {wm.windows.map((item) => (
        <WindowFrame
          key={item.instanceId}
          window={item}
          active={wm.activeWindow?.instanceId === item.instanceId}
          onFocus={() => wm.focusWindow(item.instanceId)}
          onClose={() => {
            wm.closeWindow(item.instanceId);
            playSound("close");
          }}
          onMinimize={() => wm.minimizeWindow(item.instanceId)}
          onMaximize={() => wm.maximizeWindow(item.instanceId)}
          onMove={(x, y) => wm.moveWindow(item.instanceId, x, y)}
        >
          {renderWindow({ window: item, ...commonProps })}
        </WindowFrame>
      ))}

      {startOpen && (
        <StartMenu
          onOpen={openWindow}
          onScreensaver={() => {
            setStartOpen(false);
            screensaver.start("logos");
          }}
          onShutdown={() => {
            setStartOpen(false);
            setShutdownOpen(true);
          }}
        />
      )}

      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          target={contextMenu.target}
          onOpen={() => {
            if (contextMenu.target && contextMenu.target !== "computer" && contextMenu.target !== "recycle") {
              openWindow(contextMenu.target as WindowId);
            } else {
              notify("Desktop properties are feeling nostalgic.");
            }
          }}
          onClose={() => setContextMenu(null)}
        />
      )}

      {notification && <NotificationBalloon message={notification} />}

      <Taskbar
        windows={wm.windows}
        activeId={wm.activeWindow?.instanceId}
        startOpen={startOpen}
        muted={muted}
        onStart={() => {
          setStartOpen((value) => !value);
          playSound("click");
        }}
        onTask={(instanceId) => wm.focusWindow(instanceId)}
        onToggleMute={() => setMuted((value) => !value)}
      />

      {shutdownOpen && (
        <ShutDownOverlay
          safe={safeToTurnOff}
          onRestart={() => {
            setShutdownOpen(false);
            setBooted(false);
            setSafeToTurnOff(false);
          }}
          onShutdown={() => setSafeToTurnOff(true)}
          onCancel={() => setShutdownOpen(false)}
        />
      )}

      {screensaver.active && <ScreensaverOverlay mode={screensaver.mode} onExit={screensaver.stop} />}
    </main>
  );
}
