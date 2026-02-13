"use client";

import { Lens } from "./component";

export default function LensExample() {
  return (
    <div className="relative max-w-md rounded-lg border p-4">
      <Lens zoomFactor={2} lensSize={150} isStatic={false} ariaLabel="Zoom Area">
        <img
          src="https://images.unsplash.com/photo-1736606355698-5efdb410fe93?q=80&w=500&auto=format"
          alt="Example image"
          width={500}
          height={300}
        />
      </Lens>
      <p className="mt-4 text-sm text-muted-foreground">Hover over the image to zoom in.</p>
    </div>
  );
}
