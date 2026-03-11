"use client"

import { DistortedGlass } from "./component"

export default function DistortedGlassExample() {
  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Distorted Glass</h2>
      <p className="text-sm text-muted-foreground mb-6">
        A glass morphism effect using SVG filters with fractal noise distortion.
      </p>
      <div className="relative w-full rounded-2xl overflow-hidden border border-border">
        <div className="bg-gradient-to-b from-blue-500/20 via-purple-500/20 to-pink-500/20 dark:from-blue-500/30 dark:via-purple-500/30 dark:to-pink-500/30 p-8">
          <div className="space-y-4 text-center">
            <h3 className="text-2xl font-bold text-foreground">
              Content Above the Glass
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              The distorted glass effect creates a visual transition at the
              bottom of this section using SVG fractal noise filters.
            </p>
            <div className="flex justify-center gap-4 pt-2">
              <div className="h-16 w-16 rounded-lg bg-primary/20 border border-primary/30" />
              <div className="h-16 w-16 rounded-lg bg-primary/30 border border-primary/40" />
              <div className="h-16 w-16 rounded-lg bg-primary/20 border border-primary/30" />
            </div>
          </div>
        </div>
        <DistortedGlass />
      </div>
    </div>
  )
}
