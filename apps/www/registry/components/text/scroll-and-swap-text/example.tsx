"use client";

import { useRef } from "react";
import ScrollAndSwapText from "./component";

export default function ScrollAndSwapTextExample() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="w-full h-[400px] overflow-y-auto relative"
    >
      <div className="h-[200px]" />
      <div className="flex flex-col items-center gap-4 text-4xl font-bold">
        <ScrollAndSwapText containerRef={containerRef} as="h2">
          Scroll
        </ScrollAndSwapText>
        <ScrollAndSwapText containerRef={containerRef} as="h2">
          And
        </ScrollAndSwapText>
        <ScrollAndSwapText containerRef={containerRef} as="h2">
          Swap
        </ScrollAndSwapText>
      </div>
      <div className="h-[400px]" />
    </div>
  );
}
