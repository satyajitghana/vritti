"use client"

import { GradientAnimation } from "./component"

export default function GradientAnimationExample() {
  const gradients = [
    {
      stops: [
        { color: "#3498DB", position: 0 },
        { color: "#2980B9", position: 25 },
        { color: "#1ABC9C", position: 50 },
        { color: "transparent", position: 75 },
      ],
      centerX: 30,
      centerY: 70,
    },
    {
      stops: [
        { color: "#16A085", position: 0 },
        { color: "#2980B9", position: 25 },
        { color: "#3498DB", position: 50 },
        { color: "transparent", position: 75 },
      ],
      centerX: 70,
      centerY: 30,
    },
  ]

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Animated Gradient</h2>
      <p className="text-sm text-muted-foreground mb-6">
        A smoothly animated radial gradient background.
      </p>
      <div className="relative h-[400px] w-full rounded-lg overflow-hidden border border-border">
        <GradientAnimation gradients={gradients} animationDuration={5} />
      </div>
    </div>
  )
}
