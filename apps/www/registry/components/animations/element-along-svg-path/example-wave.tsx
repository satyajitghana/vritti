"use client";

import ElementAlongPath, { ElementAlongPathItem } from "./component";

export default function ElementAlongSvgPathWave() {
  const wavePath =
    "M 10,50 Q 30,10 50,50 Q 70,90 90,50 Q 110,10 130,50 Q 150,90 170,50 Q 190,10 210,50";

  return (
    <div className="w-full h-[400px] flex items-center justify-center">
      <ElementAlongPath
        path={wavePath}
        viewBox="0 0 220 100"
        showPath
        duration={6}
        className="w-full max-w-lg h-48"
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      >
        <ElementAlongPathItem startOffset={0}>
          <div className="w-5 h-5 rounded-full bg-violet-500 shadow-lg" />
        </ElementAlongPathItem>
        <ElementAlongPathItem startOffset={20}>
          <div className="w-4 h-4 rounded-full bg-indigo-500 shadow-lg" />
        </ElementAlongPathItem>
        <ElementAlongPathItem startOffset={40}>
          <div className="w-5 h-5 rounded-full bg-cyan-500 shadow-lg" />
        </ElementAlongPathItem>
        <ElementAlongPathItem startOffset={60}>
          <div className="w-4 h-4 rounded-full bg-emerald-500 shadow-lg" />
        </ElementAlongPathItem>
        <ElementAlongPathItem startOffset={80}>
          <div className="w-5 h-5 rounded-full bg-amber-500 shadow-lg" />
        </ElementAlongPathItem>
      </ElementAlongPath>
    </div>
  );
}
