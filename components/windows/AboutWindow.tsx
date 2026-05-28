"use client";

import { WSBootIcon } from "@/components/desktop/WSBootIcon";
import type { WindowComponentProps } from "@/lib/windows";
import { MenuBar } from "./MenuBar";

export function AboutWindow({ window, closeWindow, notify }: WindowComponentProps) {
  return (
    <div className="flex h-full flex-col">
      <MenuBar onHelp={() => notify("This app has performed exactly as expected.")} />
      <div className="flex min-h-0 flex-1 gap-4 overflow-auto">
        <div className="win-bevel-inset flex h-32 w-32 shrink-0 items-center justify-center bg-[#d8d8d8]">
          <img
            src="/user.png"
            alt="About"
            width={48}
            height={48}
            draggable={false}
            style={{ imageRendering: "pixelated" }}
          />
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <WSBootIcon type="computer" size={28} />
            <div className="font-bold">Welcome to WSBoot — my web desktop.</div>
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
            <p>Specialized in: Python · FastAPI · TypeScript · NestJS · PostgreSQL · ClickHouse · Kafka · AWS · LLM workflows</p>
          </section>
          <section>
            <h3 className="font-bold">Current focus</h3>
            <p>Shipping humane AI workflows and interfaces that invite deep work instead of more tabs.</p>
          </section>
          <section>
            <h3 className="font-bold">Connect</h3>
            <p>
              <a
                href="https://www.linkedin.com/in/mirzabekov/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0000ff] underline hover:text-[#ff0000]"
              >
                LinkedIn — linkedin.com/in/mirzabekov
              </a>
            </p>
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
