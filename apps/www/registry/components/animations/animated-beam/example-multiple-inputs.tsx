"use client"

import React, { forwardRef, useRef } from "react"

import { cn } from "@/lib/utils"
import { AnimatedBeam } from "./component"

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className,
      )}
    >
      {children}
    </div>
  )
})
Circle.displayName = "Circle"

export default function AnimatedBeamMultipleInputsExample() {
  const containerRef = useRef<HTMLDivElement>(null)
  const input1Ref = useRef<HTMLDivElement>(null)
  const input2Ref = useRef<HTMLDivElement>(null)
  const input3Ref = useRef<HTMLDivElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className="relative flex w-full max-w-[500px] items-center justify-center overflow-hidden rounded-lg border bg-background p-10 md:shadow-xl"
      ref={containerRef}
    >
      <div className="flex size-full flex-row items-stretch justify-between gap-10">
        <div className="flex flex-col justify-center gap-4">
          <Circle ref={input1Ref}>
            <span className="text-xs">1</span>
          </Circle>
          <Circle ref={input2Ref}>
            <span className="text-xs">2</span>
          </Circle>
          <Circle ref={input3Ref}>
            <span className="text-xs">3</span>
          </Circle>
        </div>
        <div className="flex flex-col justify-center">
          <Circle ref={outputRef} className="size-16">
            <span className="text-sm font-bold">Out</span>
          </Circle>
        </div>
      </div>

      <AnimatedBeam containerRef={containerRef} fromRef={input1Ref} toRef={outputRef} curvature={-40} />
      <AnimatedBeam containerRef={containerRef} fromRef={input2Ref} toRef={outputRef} />
      <AnimatedBeam containerRef={containerRef} fromRef={input3Ref} toRef={outputRef} curvature={40} />
    </div>
  )
}
