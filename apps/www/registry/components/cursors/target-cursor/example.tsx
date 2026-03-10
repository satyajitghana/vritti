"use client";

import { useRef } from "react";
import TargetCursor from "./component";

export default function TargetCursorExample() {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={containerRef} className="relative w-full h-[400px] bg-neutral-900 rounded-lg flex items-center justify-center">
      <TargetCursor containerRef={containerRef} />
      <p className="text-white/60 text-sm pointer-events-none select-none cursor-target">Move your cursor here</p>
    </div>
  );
}
