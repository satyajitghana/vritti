"use client";

import ElementAlongPath, { ElementAlongPathItem } from "./component";

export default function ElementAlongSvgPathExample() {
  const path = "M 10,80 C 40,10 65,10 95,80 S 150,150 180,80";

  return (
    <div className="w-full h-[400px] flex items-center justify-center">
      <ElementAlongPath
        path={path}
        viewBox="0 0 200 160"
        showPath
        duration={4}
        className="w-full max-w-md h-64"
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      >
        <ElementAlongPathItem startOffset={0}>
          <div className="w-6 h-6 rounded-full bg-blue-500 -translate-x-1/2 -translate-y-1/2" />
        </ElementAlongPathItem>
        <ElementAlongPathItem startOffset={33}>
          <div className="w-6 h-6 rounded-full bg-green-500 -translate-x-1/2 -translate-y-1/2" />
        </ElementAlongPathItem>
        <ElementAlongPathItem startOffset={66}>
          <div className="w-6 h-6 rounded-full bg-red-500 -translate-x-1/2 -translate-y-1/2" />
        </ElementAlongPathItem>
      </ElementAlongPath>
    </div>
  );
}
