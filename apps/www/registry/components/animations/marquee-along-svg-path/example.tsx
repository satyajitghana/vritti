"use client";

import MarqueeAlongSvgPath from "./component";

export default function MarqueeAlongSvgPathExample() {
  const path = "M 10,50 C 30,10 70,10 90,50 C 70,90 30,90 10,50 Z";

  return (
    <div className="w-full h-[400px] flex items-center justify-center">
      <MarqueeAlongSvgPath
        path={path}
        viewBox="0 0 100 100"
        showPath
        baseVelocity={3}
        repeat={5}
        className="w-full max-w-md h-80"
      >
        <div className="w-8 h-8 rounded-full bg-blue-500 -translate-x-1/2 -translate-y-1/2" />
      </MarqueeAlongSvgPath>
    </div>
  );
}
