"use client";

import { SmoothCursor } from "./component";

export default function SmoothCursorExample() {
  return (
    <div className="relative w-full h-[400px] flex items-center justify-center">
      <SmoothCursor />
      <span className="text-muted-foreground text-sm pointer-events-none select-none">Move your mouse around to see the smooth cursor.</span>
    </div>
  );
}
