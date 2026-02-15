"use client";

import { useRef } from "react";
import Screensaver from "./component";

export default function ScreensaverExample() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="w-full h-[400px] relative overflow-hidden rounded-lg border bg-black"
    >
      <Screensaver
        containerRef={containerRef}
        speed={2}
        startPosition={{ x: 10, y: 10 }}
        startAngle={35}
      >
        <div className="text-2xl font-bold text-white px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
          DVD
        </div>
      </Screensaver>
    </div>
  );
}
