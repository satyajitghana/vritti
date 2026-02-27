"use client";

import { useRef } from "react";
import Crosshair from "./component";

export default function CrosshairExample() {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={containerRef} className="relative w-full h-[400px] bg-neutral-900">
      <Crosshair containerRef={containerRef} />
    </div>
  );
}
