"use client";

import { PixelatedCanvas } from "./component";

export default function PixelatedCanvasCircleExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <PixelatedCanvas
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=500&fit=crop"
        width={400}
        height={500}
        cellSize={6}
        shape="circle"
        interactive
        distortionMode="repel"
      />
    </div>
  );
}
