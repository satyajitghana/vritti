"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"
import {
  AnimatePresence,
  motion,
  MotionProps,
  useAnimation,
  Variants,
} from "motion/react"

import { cn } from "@/lib/utils"

interface Tip {
  text: string
  icon?: React.ReactNode
  url?: string
}

interface LoadingCarouselProps {
  tips?: Tip[]
  className?: string
  autoplayInterval?: number
  showIndicators?: boolean
  showProgress?: boolean
  textPosition?: "top" | "bottom"
  onTipChange?: (index: number) => void
  shuffleTips?: boolean
  animateText?: boolean
}

const defaultTips: Tip[] = [
  {
    text: "Components are designed to be composable and customizable.",
  },
  {
    text: "Use the CLI to quickly scaffold new components in your project.",
  },
  {
    text: "All components support dark mode out of the box.",
  },
  {
    text: "Motion animations provide smooth, spring-based transitions.",
  },
  {
    text: "Keyboard navigation and screen reader support are built in.",
  },
]

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const textVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.1, duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
}

// Credit -> https://motion-primitives.com/docs/text-scramble
type TextScrambleProps = {
  children: string
  duration?: number
  speed?: number
  characterSet?: string
  as?: React.ElementType
  className?: string
  trigger?: boolean
  onScrambleComplete?: () => void
} & MotionProps

const defaultChars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

function TextScramble({
  children,
  duration = 0.8,
  speed = 0.04,
  characterSet = defaultChars,
  className,
  as: Component = "p",
  trigger = true,
  onScrambleComplete,
  ...props
}: TextScrambleProps) {
  const MotionComponent = motion.create(
    Component as keyof React.JSX.IntrinsicElements
  )
  const [displayText, setDisplayText] = useState(children)
  const [isAnimating, setIsAnimating] = useState(false)
  const text = children

  const scramble = useCallback(async () => {
    if (isAnimating) return
    setIsAnimating(true)

    const steps = duration / speed
    let step = 0

    const interval = setInterval(() => {
      let scrambled = ""
      const progress = step / steps

      for (let i = 0; i < text.length; i++) {
        if (text[i] === " ") {
          scrambled += " "
          continue
        }

        if (progress * text.length > i) {
          scrambled += text[i]
        } else {
          scrambled +=
            characterSet[Math.floor(Math.random() * characterSet.length)]
        }
      }

      setDisplayText(scrambled)
      step++

      if (step > steps) {
        clearInterval(interval)
        setDisplayText(text)
        setIsAnimating(false)
        onScrambleComplete?.()
      }
    }, speed * 1000)
  }, [isAnimating, duration, speed, text, characterSet, onScrambleComplete])

  useEffect(() => {
    if (!trigger) return
    scramble()
  }, [trigger, scramble])

  return (
    <MotionComponent className={className} {...props}>
      {displayText}
    </MotionComponent>
  )
}

export function LoadingCarousel({
  onTipChange,
  className,
  tips = defaultTips,
  showProgress = true,
  showIndicators = true,
  textPosition = "bottom",
  autoplayInterval = 4500,
  shuffleTips = false,
  animateText = true,
}: LoadingCarouselProps) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const controls = useAnimation()
  const [progress, setProgress] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const [displayTips] = useState(() =>
    shuffleTips ? shuffleArray(tips) : tips
  )

  // Auto-advance carousel
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setDirection(1)
      setCurrent((prev) => {
        const next = (prev + 1) % displayTips.length
        onTipChange?.(next)
        return next
      })
    }, autoplayInterval)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [autoplayInterval, displayTips.length, onTipChange])

  // Progress bar
  useEffect(() => {
    if (!showProgress) return

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0
        }
        const diff = 2
        return Math.min(oldProgress + diff, 100)
      })
    }, autoplayInterval / 50)

    return () => {
      clearInterval(timer)
    }
  }, [showProgress, autoplayInterval])

  useEffect(() => {
    if (progress === 100) {
      controls.start({ scaleX: 0 }).then(() => {
        setProgress(0)
        controls.set({ scaleX: 1 })
      })
    } else {
      controls.start({ scaleX: progress / 100 })
    }
  }, [progress, controls])

  // Reset progress on tip change
  useEffect(() => {
    setProgress(0)
  }, [current])

  const handleSelect = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1)
      setCurrent(index)
      onTipChange?.(index)
      setProgress(0)
      // Reset auto-advance timer
      if (timerRef.current) clearInterval(timerRef.current)
      timerRef.current = setInterval(() => {
        setDirection(1)
        setCurrent((prev) => {
          const next = (prev + 1) % displayTips.length
          onTipChange?.(next)
          return next
        })
      }, autoplayInterval)
    },
    [current, autoplayInterval, displayTips.length, onTipChange]
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        "w-full max-w-6xl mx-auto rounded-lg bg-card border border-border shadow-sm",
        className
      )}
    >
      <div className="w-full overflow-hidden rounded-lg">
        {/* Carousel content area */}
        <div className="relative w-full aspect-video overflow-hidden bg-muted">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction < 0 ? 100 : -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="flex flex-col items-center justify-center gap-6 p-8">
                {/* Animated loading indicator */}
                <div className="flex items-center gap-2">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="h-3 w-3 rounded-full bg-primary"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>

                {/* Skeleton lines for visual interest */}
                <div className="w-full max-w-md space-y-3">
                  <motion.div
                    className="h-4 rounded-full bg-muted-foreground/10"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div
                    className="h-4 w-3/4 rounded-full bg-muted-foreground/10"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                  />
                  <motion.div
                    className="h-4 w-1/2 rounded-full bg-muted-foreground/10"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom section with indicators and text */}
        <div
          className={cn(
            "bg-card p-4",
            showIndicators ? "lg:py-3 lg:px-4" : ""
          )}
        >
          <div
            className={cn(
              "flex flex-col items-start gap-3",
              showIndicators ? "sm:flex-col space-y-2" : ""
            )}
          >
            {showIndicators && (
              <div className="flex space-x-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
                {displayTips.map((_, index) => (
                  <motion.button
                    key={index}
                    className="h-1 w-8 flex-shrink-0 rounded-full"
                    initial={false}
                    animate={{
                      backgroundColor:
                        index === current
                          ? "hsl(var(--foreground))"
                          : "hsl(var(--muted-foreground) / 0.2)",
                    }}
                    transition={{ duration: 0.5 }}
                    onClick={() => handleSelect(index)}
                    aria-label={`Go to tip ${index + 1}`}
                  />
                ))}
              </div>
            )}
            <div className="flex items-center space-x-2 text-foreground whitespace-nowrap">
              <div className="flex flex-col">
                <span className="text-base lg:text-2xl xl:font-semibold tracking-tight font-medium text-foreground">
                  {animateText ? (
                    <TextScramble
                      key={displayTips[current]?.text}
                      duration={1.2}
                      characterSet=". "
                    >
                      {displayTips[current]?.text ?? ""}
                    </TextScramble>
                  ) : (
                    displayTips[current]?.text
                  )}
                </span>
              </div>
            </div>
          </div>
          {showProgress && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={controls}
              transition={{ duration: 0.5, ease: "linear" }}
              className="h-1 bg-primary/20 origin-left mt-3 rounded-full"
            />
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default LoadingCarousel
