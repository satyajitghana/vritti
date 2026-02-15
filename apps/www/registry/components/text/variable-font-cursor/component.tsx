"use client"

import React, { ElementType, RefObject, useCallback, useEffect, useRef } from "react"
import { motion, useAnimationFrame } from "motion/react"
import { cn } from "@/lib/utils"

// Inlined hook from fancy
function useMousePositionRef(
  containerRef?: RefObject<HTMLElement | SVGElement | null>
) {
  const positionRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const updatePosition = (x: number, y: number) => {
      if (containerRef && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        positionRef.current = { x: x - rect.left, y: y - rect.top }
      } else {
        positionRef.current = { x, y }
      }
    }

    const handleMouseMove = (ev: MouseEvent) => updatePosition(ev.clientX, ev.clientY)
    const handleTouchMove = (ev: TouchEvent) => {
      const touch = ev.touches[0]
      updatePosition(touch.clientX, touch.clientY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("touchmove", handleTouchMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
    }
  }, [containerRef])

  return positionRef
}

interface FontVariationAxis {
  name: string
  min: number
  max: number
}

interface FontVariationMapping {
  x: FontVariationAxis
  y: FontVariationAxis
}

interface VariableFontCursorProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  as?: ElementType
  fontVariationMapping: FontVariationMapping
  containerRef: React.RefObject<HTMLDivElement | null>
}

const VariableFontCursor = ({
  children,
  as = "span",
  fontVariationMapping,
  className,
  containerRef,
  ...props
}: VariableFontCursorProps) => {
  const mousePositionRef = useMousePositionRef(containerRef)
  const spanRef = useRef<HTMLSpanElement>(null)

  const interpolateFontVariationSettings = useCallback(
    (xPosition: number, yPosition: number) => {
      const container = containerRef.current
      if (!container) return "0 0"

      const containerWidth = container.clientWidth
      const containerHeight = container.clientHeight

      const xProgress = Math.min(Math.max(xPosition / containerWidth, 0), 1)
      const yProgress = Math.min(Math.max(yPosition / containerHeight, 0), 1)

      const xValue =
        fontVariationMapping.x.min +
        (fontVariationMapping.x.max - fontVariationMapping.x.min) * xProgress
      const yValue =
        fontVariationMapping.y.min +
        (fontVariationMapping.y.max - fontVariationMapping.y.min) * yProgress

      return `'${fontVariationMapping.x.name}' ${xValue}, '${fontVariationMapping.y.name}' ${yValue}`
    },
    [fontVariationMapping, containerRef]
  )

  useAnimationFrame(() => {
    const settings = interpolateFontVariationSettings(
      mousePositionRef.current.x,
      mousePositionRef.current.y
    )
    if (spanRef.current) {
      spanRef.current.style.fontVariationSettings = settings
    }
  })

  const MotionComponent = motion.create(as)

  return (
    <MotionComponent
      className={cn(className)}
      data-text={children}
      ref={spanRef}
      {...props}
    >
      <span className="inline-block">{children}</span>
    </MotionComponent>
  )
}

export default VariableFontCursor
