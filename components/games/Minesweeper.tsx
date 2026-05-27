"use client";

import { useEffect, useMemo, useState } from "react";

const size = 8;
const mines = new Set([5, 12, 18, 28, 34, 41, 49, 57]);

function neighbors(index: number) {
  const x = index % size;
  const y = Math.floor(index / size);
  const result: number[] = [];
  for (let yy = y - 1; yy <= y + 1; yy += 1) {
    for (let xx = x - 1; xx <= x + 1; xx += 1) {
      if (xx === x && yy === y) continue;
      if (xx >= 0 && xx < size && yy >= 0 && yy < size) result.push(yy * size + xx);
    }
  }
  return result;
}

export function Minesweeper({ playSound }: { playSound: (name: string) => void }) {
  const [open, setOpen] = useState<Set<number>>(new Set());
  const [lost, setLost] = useState(false);
  const [startedAt, setStartedAt] = useState(() => Date.now());
  const [now, setNow] = useState(() => Date.now());
  const counts = useMemo(() => Array.from({ length: size * size }, (_, index) => neighbors(index).filter((n) => mines.has(n)).length), []);
  const elapsed = Math.min(999, Math.floor((now - startedAt) / 1000));

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const reset = () => {
    setOpen(new Set());
    setLost(false);
    const nextNow = Date.now();
    setStartedAt(nextNow);
    setNow(nextNow);
    playSound("click");
  };

  return (
    <div className="win-bevel inline-block bg-[#c0c0c0] p-2">
      <div className="win-bevel-inset mb-2 flex items-center justify-between bg-[#c0c0c0] p-1">
        <span className="bg-black px-2 font-mono text-red-500">{String(mines.size).padStart(3, "0")}</span>
        <button className="win-button h-8 w-8 p-0 text-lg" onClick={reset} aria-label="Reset minesweeper">
          {lost ? "☹" : "☺"}
        </button>
        <span className="bg-black px-2 font-mono text-red-500">{String(elapsed).padStart(3, "0")}</span>
      </div>
      <div className="grid" style={{ gridTemplateColumns: `repeat(${size}, 24px)` }}>
        {Array.from({ length: size * size }, (_, index) => {
          const revealed = open.has(index) || lost;
          const mine = mines.has(index);
          return (
            <button
              key={index}
              className={revealed ? "win-bevel-inset h-6 w-6 bg-[#d0d0d0] text-center font-bold" : "win-button h-6 w-6 p-0"}
              onClick={() => {
                if (lost || revealed) return;
                if (mine) {
                  setLost(true);
                  playSound("error");
                } else {
                  setOpen((current) => new Set(current).add(index));
                  playSound("click");
                }
              }}
              aria-label={`Cell ${index}`}
            >
              {revealed && mine ? "✹" : revealed && counts[index] ? counts[index] : ""}
            </button>
          );
        })}
      </div>
    </div>
  );
}
