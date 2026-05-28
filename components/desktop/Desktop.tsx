"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BootScreen, BootMode } from "@/components/boot/BootScreen";
import { ContextMenu } from "./ContextMenu";
import { DesktopIcon } from "./DesktopIcon";
import { NotificationBalloon } from "./NotificationBalloon";
import { StartMenu } from "./StartMenu";
import { Taskbar } from "./Taskbar";
import { WindowFrame } from "@/components/windows/WindowFrame";
import { AboutWindow } from "@/components/windows/AboutWindow";
import { CalculatorWindow } from "@/components/windows/CalculatorWindow";
import { ComputerWindow } from "@/components/windows/ComputerWindow";
import { DoomWindow } from "@/components/windows/DoomWindow";
import { GamesWindow } from "@/components/windows/GamesWindow";
import { InternetWindow } from "@/components/windows/InternetWindow";
import { IEBrowserWindow } from "@/components/windows/IEBrowserWindow";
import { MsDosWindow } from "@/components/windows/MsDosWindow";
import { MediaPlayerWindow } from "@/components/windows/MediaPlayerWindow";
import { MusicWindow } from "@/components/windows/MusicWindow";
import { NortonCommanderWindow } from "@/components/windows/NortonCommanderWindow";
import { NotepadWindow } from "@/components/windows/NotepadWindow";
import { OutlookWindow } from "@/components/windows/OutlookWindow";
import { PaintWindow } from "@/components/windows/PaintWindow";
import { ProjectDetailsWindow } from "@/components/windows/ProjectDetailsWindow";
import { ProjectsWindow } from "@/components/windows/ProjectsWindow";
import { RunWindow } from "@/components/windows/RunWindow";
import { ScreensaverWindow } from "@/components/windows/ScreensaverWindow";
import { SettingsWindow } from "@/components/windows/SettingsWindow";
import { ShareWindow } from "@/components/windows/ShareWindow";
import { DefragWindow } from "@/components/windows/DefragWindow";
import { ShutDownOverlay } from "@/components/windows/ShutDownOverlay";
import { ScreensaverOverlay } from "@/components/screensavers/ScreensaverOverlay";
import { useDoubleClick } from "@/hooks/useDoubleClick";
import { useScreensaver } from "@/hooks/useScreensaver";
import { useSound } from "@/hooks/useSound";
import { useWindowManager } from "@/hooks/useWindowManager";
import { useServiceWorker } from "@/hooks/useServiceWorker";
import { desktopIcons, WindowComponentProps, WindowId } from "@/lib/windows";

type MenuState = { x: number; y: number; target?: string } | null;
type IconPosition = { x: number; y: number };
type IconDrag = {
  id: string;
  startX: number;
  startY: number;
  originX: number;
  originY: number;
  moved: boolean;
} | null;

const ICON_WIDTH = 75;
const ICON_HEIGHT = 68;
const ICON_COLUMN_GAP = 4;
const ICON_ROW_GAP = 4;
const ICON_STEP_X = ICON_WIDTH + ICON_COLUMN_GAP;
const ICON_STEP_Y = ICON_HEIGHT + ICON_ROW_GAP;
const DESKTOP_PADDING = 6;
const TASKBAR_HEIGHT = 28;

function initialIconPositions() {
  return iconGridPositions(desktopIcons.map((icon) => icon.id));
}

function iconGridPositions(ids: string[]) {
  const availableHeight = typeof window === "undefined" ? 740 : window.innerHeight - TASKBAR_HEIGHT - DESKTOP_PADDING * 2;
  const availableWidth = typeof window === "undefined" ? 1024 : window.innerWidth - DESKTOP_PADDING * 2;
  const rows = Math.max(1, Math.floor(availableHeight / ICON_STEP_Y));
  const maxCols = Math.max(1, Math.floor(availableWidth / ICON_STEP_X));
  return Object.fromEntries(
    ids.map((id, index) => {
      // Place "share" icon at bottom-right
      if (id === "share") {
        return [
          id,
          {
            x: DESKTOP_PADDING + (maxCols - 1) * ICON_STEP_X,
            y: DESKTOP_PADDING + (rows - 1) * ICON_STEP_Y,
          },
        ];
      }
      const column = Math.floor(index / rows);
      const row = index % rows;
      return [
        id,
        {
          x: DESKTOP_PADDING + column * ICON_STEP_X,
          y: DESKTOP_PADDING + row * ICON_STEP_Y,
        },
      ];
    }),
  ) as Record<string, IconPosition>;
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function cellKey(column: number, row: number) {
  return `${column}:${row}`;
}

function nearestFreeGridPosition(id: string, x: number, y: number, positions: Record<string, IconPosition>) {
  const maxRows = Math.max(1, Math.floor((window.innerHeight - TASKBAR_HEIGHT - DESKTOP_PADDING * 2) / ICON_STEP_Y));
  const maxColumns = Math.max(1, Math.floor((window.innerWidth - DESKTOP_PADDING * 2) / ICON_STEP_X));
  const targetColumn = clamp(Math.round((x - DESKTOP_PADDING) / ICON_STEP_X), 0, maxColumns - 1);
  const targetRow = clamp(Math.round((y - DESKTOP_PADDING) / ICON_STEP_Y), 0, maxRows - 1);
  const occupied = new Set<string>();

  Object.entries(positions).forEach(([otherId, position]) => {
    if (otherId === id) return;
    const column = clamp(Math.round((position.x - DESKTOP_PADDING) / ICON_STEP_X), 0, maxColumns - 1);
    const row = clamp(Math.round((position.y - DESKTOP_PADDING) / ICON_STEP_Y), 0, maxRows - 1);
    occupied.add(cellKey(column, row));
  });

  for (let radius = 0; radius <= Math.max(maxRows, maxColumns); radius += 1) {
    for (let column = targetColumn - radius; column <= targetColumn + radius; column += 1) {
      for (let row = targetRow - radius; row <= targetRow + radius; row += 1) {
        if (column < 0 || row < 0 || column >= maxColumns || row >= maxRows) continue;
        if (Math.max(Math.abs(column - targetColumn), Math.abs(row - targetRow)) !== radius) continue;
        if (!occupied.has(cellKey(column, row))) {
          return {
            x: DESKTOP_PADDING + column * ICON_STEP_X,
            y: DESKTOP_PADDING + row * ICON_STEP_Y,
          };
        }
      }
    }
  }

  return {
    x: DESKTOP_PADDING + targetColumn * ICON_STEP_X,
    y: DESKTOP_PADDING + targetRow * ICON_STEP_Y,
  };
}

export default function Desktop() {
  const [booted, setBooted] = useState(false);
  const [bootMode, setBootMode] = useState<BootMode>("normal");
  const [dialupDone, setDialupDone] = useState(false);
  const [pendingStartup, setPendingStartup] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<MenuState>(null);
  const [startOpen, setStartOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [shutdownOpen, setShutdownOpen] = useState(false);
  const [safeToTurnOff, setSafeToTurnOff] = useState(false);
  const [iconPositions, setIconPositions] = useState<Record<string, IconPosition>>(() => initialIconPositions());
  const iconDrag = useRef<IconDrag>(null);
  const wm = useWindowManager();
  const { playSound, fadeOutSound, muted, setMuted } = useSound();
  const screensaver = useScreensaver(60000);
  useServiceWorker();

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

  const openInternet = useCallback(() => {
    if (dialupDone) {
      openWindow("ie-browser");
    } else {
      openWindow("internet");
    }
  }, [dialupDone, openWindow]);

  const handleDialupConnected = useCallback(() => {
    setDialupDone(true);
  }, []);

  const handleQuickLaunch = useCallback(
    (id: string) => {
      if (id === "internet") {
        openInternet();
      } else {
        openWindow(id as WindowId);
      }
    },
    [openInternet, openWindow],
  );

  const iconClick = useDoubleClick<string>(
    (id) => {
      setSelectedIcon(id);
      playSound("click");
    },
    (id) => {
      setSelectedIcon(id);
      const icon = desktopIcons.find((item) => item.id === id);
      if (icon?.windowId) {
        if (icon.windowId === "internet") {
          openInternet();
        } else {
          openWindow(icon.windowId);
        }
      } else {
        if (id === "recycle") playSound("recycle");
        notify(icon?.message ?? "Shortcut is resting on the desktop.");
      }
    },
  );

  const moveIcon = useCallback((event: React.PointerEvent<HTMLButtonElement>) => {
    const drag = iconDrag.current;
    if (!drag) return;
    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    if (!drag.moved && Math.hypot(dx, dy) > 4) {
      drag.moved = true;
    }
    if (!drag.moved) return;
    setIconPositions((positions) => ({
      ...positions,
      [drag.id]: {
        x: clamp(drag.originX + dx, 0, window.innerWidth - ICON_WIDTH),
        y: clamp(drag.originY + dy, 0, window.innerHeight - TASKBAR_HEIGHT - ICON_HEIGHT),
      },
    }));
  }, []);

  const releaseIcon = useCallback(
    (event: React.PointerEvent<HTMLButtonElement>) => {
      const drag = iconDrag.current;
      if (!drag) return;
      event.currentTarget.releasePointerCapture(event.pointerId);
      iconDrag.current = null;
      if (!drag.moved) {
        iconClick(drag.id);
      } else {
        setIconPositions((positions) => ({
          ...positions,
          [drag.id]: nearestFreeGridPosition(drag.id, positions[drag.id]?.x ?? drag.originX, positions[drag.id]?.y ?? drag.originY, positions),
        }));
        playSound("click");
      }
    },
    [iconClick, playSound],
  );

  const arrangeIcons = useCallback(() => {
    setIconPositions(initialIconPositions());
    setContextMenu(null);
    playSound("click");
  }, [playSound]);

  const lineUpIcons = useCallback(() => {
    const orderedIds = desktopIcons
      .map((icon) => icon.id)
      .sort((a, b) => {
        const aPosition = iconPositions[a] ?? { x: 0, y: 0 };
        const bPosition = iconPositions[b] ?? { x: 0, y: 0 };
        return aPosition.x - bPosition.x || aPosition.y - bPosition.y;
      });
    setIconPositions(iconGridPositions(orderedIds));
    setContextMenu(null);
    playSound("click");
  }, [iconPositions, playSound]);

  const refreshDesktop = useCallback(() => {
    setContextMenu(null);
    setSelectedIcon(null);
    notify("Desktop refreshed.");
  }, [notify]);

  const showProperties = useCallback(() => {
    if (contextMenu?.target) {
      const icon = desktopIcons.find((item) => item.id === contextMenu.target);
      notify(`${icon?.label ?? "Shortcut"} properties are not installed.`);
    } else {
      openWindow("settings");
    }
    setContextMenu(null);
  }, [contextMenu, notify, openWindow]);

  const renderWindow = (props: WindowComponentProps) => {
    switch (props.window.id) {
      case "about":
        return <AboutWindow {...props} />;
      case "calculator":
        return <CalculatorWindow {...props} />;
      case "computer":
        return <ComputerWindow {...props} />;
      case "projects":
        return <ProjectsWindow {...props} />;
      case "project-details":
        return <ProjectDetailsWindow {...props} />;
      case "internet":
        return <InternetWindow {...props} onConnected={handleDialupConnected} />;
      case "ie-browser":
        return <IEBrowserWindow {...props} />;
      case "msdos":
        return <MsDosWindow {...props} />;
      case "mediaplayer":
        return <MediaPlayerWindow {...props} />;
      case "games":
        return <GamesWindow {...props} />;
      case "doom":
        return <DoomWindow {...props} />;
      case "music":
        return <MusicWindow {...props} />;
      case "norton":
        return <NortonCommanderWindow {...props} />;
      case "notepad":
        return <NotepadWindow {...props} />;
      case "outlook":
        return <OutlookWindow {...props} />;
      case "paint":
        return <PaintWindow />;
      case "run":
        return <RunWindow {...props} />;
      case "settings":
        return <SettingsWindow {...props} />;
      case "share":
        return <ShareWindow {...props} />;
      case "defrag":
        return <DefragWindow {...props} />;
      case "screensaver":
        return <ScreensaverWindow {...props} />;
      default:
        return null;
    }
  };

  // Play pending startup sound on first user interaction with desktop
  useEffect(() => {
    if (!pendingStartup) return;
    const play = () => {
      playSound("startup");
      setPendingStartup(false);
    };
    window.addEventListener("pointerdown", play, { once: true });
    window.addEventListener("keydown", play, { once: true });
    return () => {
      window.removeEventListener("pointerdown", play);
      window.removeEventListener("keydown", play);
    };
  }, [pendingStartup, playSound]);

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
        const icon = desktopIcons.find((item) => item.id === selectedIcon);
        if (icon?.windowId) openWindow(icon.windowId);
        else if (icon?.message) notify(icon.message);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [notify, openWindow, playSound, selectedIcon, wm]);

  const commonProps = useMemo(
    () => ({
      openWindow,
      closeWindow: (instanceId: string) => {
        wm.closeWindow(instanceId);
        playSound("close");
      },
      notify,
      playSound,
      fadeOutSound,
      startScreensaver: screensaver.start,
    }),
    [notify, openWindow, playSound, fadeOutSound, screensaver.start, wm],
  );

  if (!booted) {
    return (
      <BootScreen
        onComplete={(mode) => {
          setBootMode(mode);
          setBooted(true);
          setPendingStartup(true);
        }}
        playSound={playSound}
      />
    );
  }

  const isSafeMode = bootMode === "safe";

  return (
    <main
      className={`h-screen w-screen overflow-hidden pb-[28px] ${isSafeMode ? "bg-[#008080]" : "wsboot-wallpaper"}`}
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
      <div className="relative h-[calc(100vh-28px)]">
        {desktopIcons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            id={icon.id}
            label={icon.label}
            icon={icon.icon}
            selected={selectedIcon === icon.id}
            x={iconPositions[icon.id]?.x ?? DESKTOP_PADDING}
            y={iconPositions[icon.id]?.y ?? DESKTOP_PADDING}
            onPointerDown={(event) => {
              if (event.button !== 0) return;
              event.preventDefault();
              event.stopPropagation();
              setContextMenu(null);
              setStartOpen(false);
              setSelectedIcon(icon.id);
              const position = iconPositions[icon.id] ?? { x: DESKTOP_PADDING, y: DESKTOP_PADDING };
              iconDrag.current = {
                id: icon.id,
                startX: event.clientX,
                startY: event.clientY,
                originX: position.x,
                originY: position.y,
                moved: false,
              };
              event.currentTarget.setPointerCapture(event.pointerId);
            }}
            onPointerMove={moveIcon}
            onPointerUp={releaseIcon}
            onContextMenu={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setSelectedIcon(icon.id);
              setContextMenu({ x: event.clientX, y: event.clientY, target: icon.id });
            }}
          />
        ))}
      </div>

      {wm.windows.map((item) => {
        // Winamp renders without standard Windows frame
        if (item.id === "music") {
          return (
            <div
              key={item.instanceId}
              className={`fixed ${item.minimized ? "hidden" : ""}`}
              style={{
                left: item.maximized ? 0 : item.x,
                top: item.maximized ? 0 : item.y,
                zIndex: item.zIndex,
              }}
              onPointerDown={() => wm.focusWindow(item.instanceId)}
            >
              <div className="relative">
                {/* Close button */}
                <button
                  className="absolute top-[3px] right-[3px] z-10 winamp-tiny-btn"
                  onClick={() => {
                    wm.closeWindow(item.instanceId);
                    playSound("close");
                  }}
                  aria-label="Close Winamp"
                  title="Close"
                >
                  ×
                </button>
                {renderWindow({ window: item, ...commonProps })}
              </div>
            </div>
          );
        }

        return (
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
            onResize={(width, height) => wm.resizeWindow(item.instanceId, width, height)}
          >
            {renderWindow({ window: item, ...commonProps })}
          </WindowFrame>
        );
      })}

      {startOpen && (
        <StartMenu
          onOpen={openWindow}
          onScreensaver={() => {
            setStartOpen(false);
            screensaver.start("stars");
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
            const icon = desktopIcons.find((item) => item.id === contextMenu.target);
            if (icon?.windowId) {
              openWindow(icon.windowId);
            } else {
              notify(icon?.message ?? "Desktop properties are feeling nostalgic.");
            }
          }}
          onArrangeIcons={arrangeIcons}
          onLineUpIcons={lineUpIcons}
          onRefresh={refreshDesktop}
          onProperties={showProperties}
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
        onQuickLaunch={handleQuickLaunch}
      />

      {shutdownOpen && (
        <ShutDownOverlay
          safe={safeToTurnOff}
          onRestart={() => {
            playSound("shutdown");
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          }}
          onShutdown={() => {
            playSound("shutdown");
            setSafeToTurnOff(true);
          }}
          onCancel={() => setShutdownOpen(false)}
        />
      )}

      {screensaver.active && <ScreensaverOverlay mode={screensaver.mode} onExit={screensaver.stop} />}

      {isSafeMode && (
        <>
          <div className="fixed top-1 left-2 text-[#ffff00] font-bold text-[12px] font-mono pointer-events-none z-9999">Safe Mode</div>
          <div className="fixed top-1 right-2 text-[#ffff00] font-bold text-[12px] font-mono pointer-events-none z-9999">Safe Mode</div>
          <div className="fixed bottom-[30px] left-2 text-[#ffff00] font-bold text-[12px] font-mono pointer-events-none z-9999">Safe Mode</div>
          <div className="fixed bottom-[30px] right-2 text-[#ffff00] font-bold text-[12px] font-mono pointer-events-none z-9999">Safe Mode</div>
        </>
      )}
    </main>
  );
}
