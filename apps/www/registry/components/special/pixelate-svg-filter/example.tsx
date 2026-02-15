"use client";

import PixelateSvgFilter from "./component";

export default function PixelateSvgFilterExample() {
  return (
    <div className="w-full h-[400px] flex items-center justify-center relative">
      <div className="relative w-64 h-64 overflow-hidden rounded-lg">
        <PixelateSvgFilter id="demo-pixelate" size={12} />
        <img
          src="https://picsum.photos/seed/pixel/300/300"
          alt="Pixelated"
          className="w-full h-full object-cover"
          style={{ filter: "url(#demo-pixelate)" }}
        />
      </div>
    </div>
  );
}
