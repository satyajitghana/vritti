"use client"

import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react"
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  type MotionStyle,
  type MotionValue,
  type Variants,
} from "motion/react"

import { cn } from "@/lib/utils"

// Types
type WrapperStyle = MotionStyle & {
  "--x": MotionValue<string>
  "--y": MotionValue<string>
}

interface CardProps {
  title: string
  description: string
  bgClass?: string
}

interface Step {
  id: string
  name: string
  title: string
  description: string
}

interface FeatureCarouselProps extends CardProps {
  steps: Step[]
  autoPlayInterval?: number
  className?: string
}

// Constants
const ANIMATION_PRESETS = {
  fadeInScale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
      mass: 0.5,
    },
  },
  slideInRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
      mass: 0.5,
    },
  },
  slideInLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
      mass: 0.5,
    },
  },
} as const

/**
 * Custom hook for managing cyclic transitions with auto-play functionality.
 */
function useNumberCycler(
  totalSteps: number = 4,
  interval: number = 3000
) {
  const [currentNumber, setCurrentNumber] = useState(0)
  const [isManualInteraction, setIsManualInteraction] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const setupTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    timerRef.current = setTimeout(() => {
      setCurrentNumber((prev) => (prev + 1) % totalSteps)
      setIsManualInteraction(false)
      setupTimer()
    }, interval)
  }, [interval, totalSteps])

  const increment = useCallback(() => {
    setIsManualInteraction(true)
    setCurrentNumber((prev) => (prev + 1) % totalSteps)
    setupTimer()
  }, [totalSteps, setupTimer])

  useEffect(() => {
    setupTimer()

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [setupTimer])

  return {
    currentNumber,
    increment,
    isManualInteraction,
  }
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const isSmall = window.matchMedia("(max-width: 768px)").matches
    setIsMobile(isSmall)
  }, [])

  return isMobile
}

// Components
function IconCheck({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      className={cn("h-4 w-4", className)}
      {...props}
    >
      <path d="m229.66 77.66-128 128a8 8 0 0 1-11.32 0l-56-56a8 8 0 0 1 11.32-11.32L96 188.69 218.34 66.34a8 8 0 0 1 11.32 11.32Z" />
    </svg>
  )
}

const stepVariants: Variants = {
  inactive: {
    scale: 0.8,
    opacity: 0.5,
  },
  active: {
    scale: 1,
    opacity: 1,
  },
}

/**
 * Main card component that handles mouse tracking for gradient effect.
 */
function FeatureCard({
  bgClass,
  children,
  step,
  steps,
}: CardProps & {
  children: React.ReactNode
  step: number
  steps: Step[]
}) {
  const [mounted, setMounted] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const isMobile = useIsMobile()

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    if (isMobile) return
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <motion.div
      className="animated-cards relative w-full rounded-[16px]"
      onMouseMove={handleMouseMove}
      style={
        {
          "--x": useMotionTemplate`${mouseX}px`,
          "--y": useMotionTemplate`${mouseY}px`,
        } as WrapperStyle
      }
    >
      <div
        className={cn(
          "group relative w-full overflow-hidden rounded-3xl border border-border bg-gradient-to-b from-muted/90 to-muted transition duration-300 dark:from-neutral-950/90 dark:to-neutral-800/90",
          "md:hover:border-transparent",
          bgClass
        )}
      >
        <div className="m-10 min-h-[450px] w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              className="flex w-4/6 flex-col gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                duration: 0.3,
                ease: [0.23, 1, 0.32, 1],
              }}
            >
              <motion.h2
                className="text-xl font-bold tracking-tight text-foreground md:text-2xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.1,
                  duration: 0.3,
                  ease: [0.23, 1, 0.32, 1],
                }}
              >
                {steps[step].title}
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.2,
                  duration: 0.3,
                  ease: [0.23, 1, 0.32, 1],
                }}
              >
                <p className="text-sm leading-5 text-muted-foreground sm:text-base sm:leading-5">
                  {steps[step].description}
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
          {mounted ? children : null}
        </div>
      </div>
    </motion.div>
  )
}

/**
 * Progress indicator component that shows current step and completion status.
 */
function StepIndicators({
  steps,
  current,
  onChange,
}: {
  steps: readonly Step[]
  current: number
  onChange: (index: number) => void
}) {
  return (
    <nav aria-label="Progress" className="flex justify-center px-4">
      <ol
        className="flex w-full flex-wrap items-start justify-start gap-2 sm:justify-center md:w-10/12 md:divide-y-0"
        role="list"
      >
        {steps.map((step, stepIdx) => {
          const isCompleted = current > stepIdx
          const isCurrent = current === stepIdx
          const isFuture = !isCompleted && !isCurrent

          return (
            <motion.li
              key={`${step.name}-${stepIdx}`}
              initial="inactive"
              animate={isCurrent ? "active" : "inactive"}
              variants={stepVariants}
              transition={{ duration: 0.3 }}
              className={cn(
                "relative z-50 rounded-full px-3 py-1 transition-all duration-300 ease-in-out md:flex",
                isCompleted ? "bg-muted-foreground/20" : "bg-muted-foreground/10"
              )}
            >
              <div
                className={cn(
                  "group flex w-full cursor-pointer items-center focus:outline-none focus-visible:ring-2",
                  (isFuture || isCurrent) && "pointer-events-none"
                )}
                onClick={() => onChange(stepIdx)}
              >
                <span className="flex items-center gap-2 text-sm font-medium">
                  <motion.span
                    initial={false}
                    animate={{
                      scale: isCurrent ? 1.2 : 1,
                    }}
                    className={cn(
                      "flex h-4 w-4 shrink-0 items-center justify-center rounded-full duration-300",
                      isCompleted &&
                        "bg-primary text-primary-foreground",
                      isCurrent &&
                        "bg-primary/30 text-muted-foreground",
                      isFuture && "bg-primary/10 dark:bg-muted-foreground/20"
                    )}
                  >
                    {isCompleted ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                      >
                        <IconCheck className="h-3 w-3 stroke-primary-foreground stroke-[3] text-primary-foreground" />
                      </motion.div>
                    ) : (
                      <span
                        className={cn(
                          "text-xs",
                          !isCurrent && "text-primary"
                        )}
                      >
                        {stepIdx + 1}
                      </span>
                    )}
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={cn(
                      "text-sm font-medium duration-300",
                      isCompleted && "text-muted-foreground",
                      isCurrent && "text-primary",
                      isFuture && "text-muted-foreground/60"
                    )}
                  >
                    {step.name}
                  </motion.span>
                </span>
              </div>
            </motion.li>
          )
        })}
      </ol>
    </nav>
  )
}

/**
 * Main component that orchestrates the multi-step animation sequence.
 */
export function FeatureCarousel({
  steps: featureSteps,
  autoPlayInterval = 3000,
  className,
  ...props
}: FeatureCarouselProps) {
  const { currentNumber: step, increment } = useNumberCycler(
    featureSteps.length,
    autoPlayInterval
  )
  const [isAnimating, setIsAnimating] = useState(false)

  const handleIncrement = () => {
    if (isAnimating) return
    setIsAnimating(true)
    increment()
  }

  const handleAnimationComplete = () => {
    setIsAnimating(false)
  }

  const renderStepContent = () => {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          {...ANIMATION_PRESETS.fadeInScale}
          className="w-full h-full absolute"
          onAnimationComplete={handleAnimationComplete}
        >
          <motion.div className="relative w-full h-full flex items-center justify-center">
            <div className="flex flex-col items-center gap-4 p-8 text-center">
              <motion.div
                className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary"
                {...ANIMATION_PRESETS.fadeInScale}
              >
                <span className="text-2xl font-bold">{step + 1}</span>
              </motion.div>
              <motion.p
                className="max-w-sm text-sm text-muted-foreground"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {featureSteps[step].description}
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    )
  }

  return (
    <div className={cn("w-full", className)}>
      <FeatureCard {...props} step={step} steps={featureSteps}>
        {renderStepContent()}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute left-[12rem] top-5 z-50 h-auto w-full cursor-pointer md:left-0"
        >
          <StepIndicators current={step} onChange={() => {}} steps={featureSteps} />
        </motion.div>
        <motion.div
          className="absolute right-0 top-0 z-50 h-full w-full cursor-pointer md:left-0"
          onClick={handleIncrement}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        />
      </FeatureCard>
    </div>
  )
}

export default FeatureCarousel
