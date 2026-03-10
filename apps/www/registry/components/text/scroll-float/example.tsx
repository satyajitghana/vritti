"use client";

import { useRef } from "react";
import ScrollFloat from "./component";

export default function ScrollFloatExample() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="w-full h-[400px] overflow-y-auto relative"
    >
      <div className="h-[300px]" />
      <div className="flex items-center justify-center p-8">
        <ScrollFloat
          scrollContainerRef={containerRef as unknown as React.RefObject<HTMLElement>}
          scrollStart="top bottom"
          scrollEnd="bottom center"
        >
          Hello World
        </ScrollFloat>
      </div>
      <div className="h-[300px]" />
    </div>
  );
}
