"use client";

import { useState } from "react";
import GooeySvgFilter from "./component";

export default function GooeySvgFilterExample() {
  const [pos, setPos] = useState({ x: 50, y: 50 });

  return (
    <div className="w-full h-[400px] flex items-center justify-center relative">
      <GooeySvgFilter id="demo-gooey" strength={12} />
      <div
        className="relative w-64 h-64"
        style={{ filter: "url(#demo-gooey)" }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setPos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          });
        }}
      >
        <div className="absolute w-24 h-24 rounded-full bg-blue-500 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div
          className="absolute w-16 h-16 rounded-full bg-blue-500 transition-all duration-100"
          style={{
            left: pos.x - 32,
            top: pos.y - 32,
          }}
        />
      </div>
    </div>
  );
}
