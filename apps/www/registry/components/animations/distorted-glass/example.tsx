"use client"

import { DistortedGlass } from "./component"

export default function DistortedGlassDemo() {
  return (
    <div className="relative h-[400px] w-full overflow-hidden rounded-2xl">
      {/* Colorful background content */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500 via-pink-500 to-orange-400">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-white">
          <h2 className="text-4xl font-bold tracking-tight">Distorted Glass</h2>
          <p className="text-lg text-white/80 text-center max-w-md">
            An SVG filter-based glass morphism effect using fractal noise displacement
          </p>
          <div className="flex gap-3 mt-4">
            <div className="h-16 w-16 rounded-xl bg-white/20 backdrop-blur-sm" />
            <div className="h-16 w-16 rounded-xl bg-white/20 backdrop-blur-sm" />
            <div className="h-16 w-16 rounded-xl bg-white/20 backdrop-blur-sm" />
          </div>
        </div>
      </div>

      {/* Distorted glass overlay at the top */}
      <div className="absolute top-0 left-0 right-0 z-10">
        <DistortedGlass className="h-48 w-full" />
      </div>
    </div>
  )
}
