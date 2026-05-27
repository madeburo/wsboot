"use client";

import { Win95Icon } from "@/components/desktop/Win95Icon";
import type { WindowComponentProps } from "@/lib/windows";
import { MenuBar } from "./MenuBar";

export function AboutWindow({ window, closeWindow, notify }: WindowComponentProps) {
  return (
    <div className="flex h-full flex-col">
      <MenuBar onHelp={() => notify("This app has performed exactly as expected.")} />
      <div className="flex min-h-0 flex-1 gap-4 overflow-auto">
        <div className="win-bevel-inset flex h-32 w-32 shrink-0 items-center justify-center bg-[#d8d8d8]">
          <div className="grid h-24 w-24 grid-cols-4 gap-1">
            {Array.from({ length: 16 }).map((_, index) => (
              <span key={index} className={index % 3 === 0 ? "bg-[#000080]" : index % 2 ? "bg-[#ffe0bd]" : "bg-[#c0c0c0]"} />
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Win95Icon type="computer" size={28} />
            <div className="font-bold">Welcome to my personal operating system.</div>
          </div>
          <section>
            <h3 className="font-bold">Who am I</h3>
            <p>I build technical products with a taste for fast interfaces, thoughtful systems, and tiny delightful details.</p>
          </section>
          <section>
            <h3 className="font-bold">What I build</h3>
            <p>Developer tools, AI interfaces, knowledge systems, and products that make complex work feel crisp.</p>
          </section>
          <section>
            <h3 className="font-bold">Tech stack</h3>
            <p>TypeScript, React, Next.js, Postgres, Node, LLM APIs, design systems, and a suspicious amount of debugging.</p>
          </section>
          <section>
            <h3 className="font-bold">Current focus</h3>
            <p>Shipping humane AI workflows and interfaces that invite deep work instead of more tabs.</p>
          </section>
        </div>
      </div>
      <div className="mt-2 flex justify-end">
        <button className="win-button min-w-20" onClick={() => closeWindow(window.instanceId)}>
          OK
        </button>
      </div>
    </div>
  );
}
