"use client";

import AnimatedGradient from "./component";

export default function AnimatedGradientWithSvgExample() {
  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-lg">
      <AnimatedGradient
        colors={["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#ffeaa7"]}
        speed={5}
        blur="medium"
      />
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        <h2 className="text-4xl font-bold text-white drop-shadow-lg">
          Animated Gradient
        </h2>
      </div>
    </div>
  );
}
