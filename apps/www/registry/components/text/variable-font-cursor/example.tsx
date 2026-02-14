"use client"

import { useRef } from "react"
import VariableFontCursor from "./component"

export default function VariableFontCursorExample() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center p-16 min-h-[200px]"
    >
      <VariableFontCursor
        containerRef={containerRef}
        className="text-5xl"
        fontVariationMapping={{
          x: { name: "wght", min: 100, max: 900 },
          y: { name: "slnt", min: -10, max: 0 },
        }}
      >
        Move your cursor
      </VariableFontCursor>
    </div>
  )
}
