"use client";

import { DitherShader } from "./component";

export default function DitherShaderAnimatedExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="h-[400px] w-[400px]">
        <DitherShader
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=400&fit=crop"
          ditherMode="noise"
          colorMode="original"
          gridSize={3}
          animated
          animationSpeed={0.02}
        />
      </div>
    </div>
  );
}
