"use client"

import { useRef } from "react"
import ScrollSwapText from "./component"

export default function ScrollSwapTextExample() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={containerRef}
      className="h-[400px] overflow-y-auto border rounded-lg"
    >
      <div className="h-[200px]" />
      <div className="flex flex-col items-center gap-4 px-8">
        <ScrollSwapText
          containerRef={containerRef}
          className="text-4xl font-bold h-[1.2em]"
        >
          Scroll to swap
        </ScrollSwapText>
        <ScrollSwapText
          containerRef={containerRef}
          className="text-2xl font-semibold h-[1.2em]"
        >
          This text too
        </ScrollSwapText>
      </div>
      <div className="h-[400px]" />
    </div>
  )
}
