"use client"

import React, { RefObject, useEffect, useRef, useState } from "react"
import {
  animate,
  motion,
  useAnimationFrame,
  useMotionValue,
  ValueAnimationTransition,
} from "motion/react"

// Inlined useDimensions hook
function useDimensions(ref: RefObject<HTMLElement | SVGElement | null>) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateDimensions = () => {
      if (ref.current) {
        const { width, height } = ref.current.getBoundingClientRect()
        setDimensions({ width, height })
      }
    }
    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [ref])

  return dimensions
}

// Inlined useMousePosition hook
function useMousePosition(
  containerRef?: RefObject<HTMLElement | SVGElement | null>
) {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updatePosition = (x: number, y: number) => {
      if (containerRef && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setPosition({ x: x - rect.left, y: y - rect.top })
      } else {
        setPosition({ x, y })
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

  return position
}

// Inlined useElasticLineEvents hook
function useElasticLineEvents(
  containerRef: React.RefObject<SVGSVGElement | null>,
  isVertical: boolean,
  grabThreshold: number,
  releaseThreshold: number
) {
  const mousePosition = useMousePosition(containerRef)
  const dimensions = useDimensions(containerRef)
  const [isGrabbed, setIsGrabbed] = useState(false)
  const [controlPoint, setControlPoint] = useState({
    x: dimensions.width / 2,
    y: dimensions.height / 2,
  })

  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = dimensions
      const x = mousePosition.x
      const y = mousePosition.y

      const isOutsideBounds = x < 0 || x > width || y < 0 || y > height
      if (isOutsideBounds) {
        setIsGrabbed(false)
        return
      }

      let distance: number
      let newControlPoint: { x: number; y: number }

      if (isVertical) {
        const midX = width / 2
        distance = Math.abs(x - midX)
        newControlPoint = { x: midX + 2.2 * (x - midX), y }
      } else {
        const midY = height / 2
        distance = Math.abs(y - midY)
        newControlPoint = { x, y: midY + 2.2 * (y - midY) }
      }

      setControlPoint(newControlPoint)

      if (!isGrabbed && distance < grabThreshold) {
        setIsGrabbed(true)
      } else if (isGrabbed && distance > releaseThreshold) {
        setIsGrabbed(false)
      }
    }
  }, [mousePosition, isVertical, isGrabbed, grabThreshold, releaseThreshold])

  return { isGrabbed, controlPoint }
}

interface ElasticLineProps {
  isVertical?: boolean
  grabThreshold?: number
  releaseThreshold?: number
  strokeWidth?: number
  transition?: ValueAnimationTransition
  animateInTransition?: ValueAnimationTransition
  className?: string
}

const ElasticLine: React.FC<ElasticLineProps> = ({
  isVertical = false,
  grabThreshold = 5,
  releaseThreshold = 100,
  strokeWidth = 1,
  transition = {
    type: "spring",
    stiffness: 300,
    damping: 5,
  },
  animateInTransition = {
    duration: 0.3,
    ease: "easeInOut",
  },
  className,
}) => {
  const containerRef = useRef<SVGSVGElement>(null)
  const dimensions = useDimensions(containerRef)
  const pathRef = useRef<SVGPathElement>(null)
  const [hasAnimatedIn, setHasAnimatedIn] = useState(false)

  const clampedReleaseThreshold = Math.min(
    releaseThreshold,
    isVertical ? dimensions.width / 2 : dimensions.height / 2
  )

  const { isGrabbed, controlPoint } = useElasticLineEvents(
    containerRef,
    isVertical,
    grabThreshold,
    clampedReleaseThreshold
  )

  const x = useMotionValue(dimensions.width / 2)
  const y = useMotionValue(dimensions.height / 2)
  const pathLength = useMotionValue(0)

  useEffect(() => {
    if (!hasAnimatedIn && dimensions.width > 0 && dimensions.height > 0) {
      animate(pathLength, 1, {
        ...animateInTransition,
        onComplete: () => setHasAnimatedIn(true),
      })
    }
    x.set(dimensions.width / 2)
    y.set(dimensions.height / 2)
  }, [dimensions, hasAnimatedIn])

  useEffect(() => {
    if (!isGrabbed && hasAnimatedIn) {
      animate(x, dimensions.width / 2, transition)
      animate(y, dimensions.height / 2, transition)
    }
  }, [isGrabbed])

  useAnimationFrame(() => {
    if (isGrabbed) {
      x.set(controlPoint.x)
      y.set(controlPoint.y)
    }

    const controlX = hasAnimatedIn ? x.get() : dimensions.width / 2
    const controlY = hasAnimatedIn ? y.get() : dimensions.height / 2

    pathRef.current?.setAttribute(
      "d",
      isVertical
        ? `M${dimensions.width / 2} 0Q${controlX} ${controlY} ${dimensions.width / 2} ${dimensions.height}`
        : `M0 ${dimensions.height / 2}Q${controlX} ${controlY} ${dimensions.width} ${dimensions.height / 2}`
    )
  })

  return (
    <svg
      ref={containerRef}
      className={`w-full h-full ${className || ""}`}
      viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
      preserveAspectRatio="none"
    >
      <motion.path
        ref={pathRef}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        initial={{ pathLength: 0 }}
        style={{ pathLength }}
        fill="none"
      />
    </svg>
  )
}

export default ElasticLine
