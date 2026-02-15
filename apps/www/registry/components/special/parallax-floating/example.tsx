"use client";

import Floating, { FloatingElement } from "./component";

export default function ParallaxFloatingExample() {
  return (
    <div className="w-full h-[400px] relative overflow-hidden rounded-lg border bg-gradient-to-b from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-950">
      <Floating sensitivity={1.5} easingFactor={0.08}>
        <FloatingElement depth={0.5} className="top-[10%] left-[10%]">
          <div className="w-16 h-16 rounded-full bg-blue-400/50" />
        </FloatingElement>
        <FloatingElement depth={1} className="top-[30%] left-[60%]">
          <div className="w-24 h-24 rounded-lg bg-purple-400/50" />
        </FloatingElement>
        <FloatingElement depth={2} className="top-[60%] left-[30%]">
          <div className="w-20 h-20 rounded-full bg-pink-400/50" />
        </FloatingElement>
        <FloatingElement depth={3} className="top-[20%] left-[80%]">
          <div className="w-12 h-12 rounded-lg bg-green-400/50" />
        </FloatingElement>
        <FloatingElement depth={1.5} className="top-[70%] left-[70%]">
          <div className="w-14 h-14 rounded-full bg-yellow-400/50" />
        </FloatingElement>
      </Floating>
    </div>
  );
}
