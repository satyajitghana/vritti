"use client"

import { FractalDotGrid } from "./component"

export default function FractalDotGridExample() {
  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Fractal Dot Grid</h2>
      <p className="text-sm text-muted-foreground mb-6">
        An animated dot grid background with wave effects on hover.
      </p>
      <div className="relative h-[400px] w-full rounded-lg overflow-hidden border border-border bg-white dark:bg-black">
        <FractalDotGrid
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
          initialPerformance="medium"
        />
      </div>
    </div>
  )
}
