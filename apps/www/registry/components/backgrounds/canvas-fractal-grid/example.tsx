"use client"

import { CanvasFractalGrid } from "./component"

export default function CanvasFractalGridExample() {
  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Canvas Fractal Grid</h2>
      <p className="text-sm text-muted-foreground mb-6">
        An animated canvas-based fractal dot grid with gradient background and
        mouse interaction effects.
      </p>
      <div className="relative h-[400px] w-full rounded-lg overflow-hidden border border-border">
        <CanvasFractalGrid
          dotSize={5.5}
          dotSpacing={13}
          dotOpacity={0.7}
          waveIntensity={99}
          waveRadius={200}
          dotColor="rgba(100, 100, 255, 1)"
          glowColor="rgba(100, 100, 255, 1)"
          enableNoise={false}
          noiseOpacity={0.03}
          enableMouseGlow={false}
          enableGradient={true}
          initialPerformance="medium"
        />
      </div>
    </div>
  )
}
