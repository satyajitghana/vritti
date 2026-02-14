"use client"

import { useRef } from "react"
import TextCursorProximity from "./component"

export default function TextCursorProximityExample() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center p-16 min-h-[200px]"
    >
      <TextCursorProximity
        containerRef={containerRef}
        className="text-4xl font-bold"
        radius={100}
        falloff="gaussian"
        styles={{
          opacity: { from: 0.3, to: 1 },
          scale: { from: 1, to: 1.3 },
        }}
      >
        Move your cursor here
      </TextCursorProximity>
    </div>
  )
}
