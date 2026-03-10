"use client"

import { MorphSurface } from "./component"

export default function MorphSurfaceSlowAnimationExample() {
  return (
    <div className="flex justify-center items-center min-h-[300px] p-8">
      <MorphSurface
        animationSpeed={2}
        triggerLabel="Slow Animation"
        placeholder="Animations are slower..."
      />
    </div>
  )
}
