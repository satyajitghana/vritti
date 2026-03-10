"use client"

import { MorphSurface } from "./component"

export default function MorphSurfaceCustomDimensionsExample() {
  return (
    <div className="flex justify-center items-center min-h-[300px] p-8">
      <MorphSurface
        collapsedWidth="auto"
        collapsedHeight={48}
        expandedWidth={400}
        expandedHeight={250}
        triggerLabel="Custom Size"
        placeholder="This surface is larger..."
      />
    </div>
  )
}
