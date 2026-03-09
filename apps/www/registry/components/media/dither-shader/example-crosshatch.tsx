"use client";

import { DitherShader } from "./component";

export default function DitherShaderCrosshatchExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="h-[400px] w-[400px]">
        <DitherShader
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=400&fit=crop"
          ditherMode="crosshatch"
          colorMode="grayscale"
          gridSize={4}
          invert
        />
      </div>
    </div>
  );
}
