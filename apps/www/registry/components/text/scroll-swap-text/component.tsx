"use client"

import React, { ElementType, useMemo, useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "motion/react"
import { cn } from "@/lib/utils"

const extractTextFromChildren = (children: React.ReactNode): string | undefined => {
  if (children == null) return ""
  if (typeof children === "string") return children
  if (typeof children === "number") return String(children)
  if (Array.isArray(children)) {
    return children.map(extractTextFromChildren).join("")
  }
  if (React.isValidElement(children)) {
    const props = (children as React.ReactElement).props
    const childText = (props as any).children as React.ReactNode
    if (childText != null) return extractTextFromChildren(childText)
    return ""
  }
}

interface ScrollSwapTextProps {
  children: React.ReactNode
  as?: ElementType
  containerRef: React.RefObject<HTMLElement | null>
  offset?: [string, string]
  className?: string
  springConfig?: {
    stiffness?: number
    damping?: number
    mass?: number
  }
}

const ScrollSwapText = ({
  children,
  as = "span",
  offset = ["0 0", "0 1"],
  className,
  containerRef,
  springConfig = { stiffness: 200, damping: 30 },
  ...props
}: ScrollSwapTextProps) => {
  const ref = useRef<HTMLElement>(null)

  const text = useMemo(() => {
    try { return extractTextFromChildren(children) }
    catch { return "" }
  }, [children])

  const { scrollYProgress } = useScroll({
    container: containerRef,
    target: ref,
    offset: offset as any,
  })

  const springScrollYProgress = useSpring(scrollYProgress, springConfig)
  const top = useTransform(springScrollYProgress, [0, 1], ["0%", "-100%"])
  const bottom = useTransform(springScrollYProgress, [0, 1], ["100%", "0%"])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ElementTag = as as any

  return (
    <ElementTag
      className={cn(
        "flex overflow-hidden relative items-center justify-center p-0",
        className
      )}
      ref={ref}
      {...props}
    >
      <span className="relative text-transparent" aria-hidden="true">
        {text}
      </span>
      <motion.span className="absolute" style={{ top: top }}>
        {text}
      </motion.span>
      <motion.span
        className="absolute"
        style={{ top: bottom }}
        aria-hidden="true"
      >
        {text}
      </motion.span>
    </ElementTag>
  )
}

ScrollSwapText.displayName = "ScrollSwapText"
export default ScrollSwapText
