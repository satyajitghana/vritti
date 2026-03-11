"use client"

import * as React from "react"
import { AnimatePresence, motion, type PanInfo } from "motion/react"
import useMeasure from "react-use-measure"

import { cn } from "@/lib/utils"

// ============================================================================
// Types
// ============================================================================

export interface IntroDisclosureStep {
  title: string
  shortDescription: string
  fullDescription: string
  icon?: React.ReactNode
  action?: {
    label: string
    onClick?: () => void
    href?: string
  }
}

export interface IntroDisclosureProps {
  steps: IntroDisclosureStep[]
  open: boolean
  onOpenChange: (open: boolean) => void
  onComplete?: () => void
  onSkip?: () => void
  showProgressBar?: boolean
  className?: string
}

// ============================================================================
// Animations
// ============================================================================

const slideInOut = (direction: 1 | -1) => ({
  initial: { opacity: 0, x: 20 * direction },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 * direction },
  transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const },
})

// ============================================================================
// StepTab
// ============================================================================

interface StepTabProps {
  step: IntroDisclosureStep
  isActive: boolean
  onClick: () => void
  isCompleted: boolean
  index: number
}

function StepTab({ step, isActive, onClick, isCompleted, index }: StepTabProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full flex-col items-start rounded-lg px-4 py-3 text-left transition-colors",
        isActive
          ? "border border-border bg-muted"
          : "hover:bg-muted/70",
        "relative"
      )}
      aria-current={isActive ? "step" : undefined}
      aria-label={`${step.title}${isCompleted ? " (completed)" : ""}`}
      type="button"
    >
      <div className="mb-1 text-sm font-medium text-foreground">{step.title}</div>
      <div className="text-xs text-muted-foreground line-clamp-2">
        {step.shortDescription}
      </div>
      {isCompleted && (
        <div className="absolute right-2 top-2">
          <div className="rounded-full bg-primary p-1">
            <svg
              className="h-2 w-2 text-primary-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      )}
    </button>
  )
}

// ============================================================================
// ProgressBar
// ============================================================================

function ProgressBar({ value, className }: { value: number; className?: string }) {
  return (
    <div className={cn("h-1 w-full overflow-hidden rounded-full bg-muted", className)}>
      <div
        className="h-full rounded-full bg-primary transition-all duration-300 ease-out"
        style={{ width: `${value}%` }}
      />
    </div>
  )
}

// ============================================================================
// Main Component
// ============================================================================

export function IntroDisclosure({
  steps,
  open,
  onOpenChange,
  onComplete,
  onSkip,
  showProgressBar = true,
  className,
}: IntroDisclosureProps) {
  const [currentStep, setCurrentStep] = React.useState(0)
  const [completedSteps, setCompletedSteps] = React.useState<number[]>([0])
  const [direction, setDirection] = React.useState<1 | -1>(1)
  const [ref, bounds] = useMeasure()

  if (!open) {
    return null
  }

  const handleNext = () => {
    setDirection(1)
    setCompletedSteps((prev) =>
      prev.includes(currentStep) ? prev : [...prev, currentStep]
    )
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onOpenChange(false)
      onComplete?.()
    }
  }

  const handlePrevious = () => {
    setDirection(-1)
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    onOpenChange(false)
    onSkip?.()
  }

  const handleStepSelect = (index: number) => {
    setDirection(index > currentStep ? 1 : -1)
    setCompletedSteps((prev) => {
      const newCompletedSteps = new Set(prev)
      if (index > currentStep) {
        for (let i = currentStep; i <= index; i++) {
          newCompletedSteps.add(i)
        }
      }
      return Array.from(newCompletedSteps)
    })
    setCurrentStep(index)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => onOpenChange(false)}
      />

      {/* Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={cn(
          "relative z-10 w-full max-w-2xl overflow-hidden rounded-xl border border-border bg-background shadow-lg",
          className
        )}
      >
        {/* Header */}
        <div className="space-y-2 border-b border-border bg-muted p-6">
          <h2 className="text-lg font-semibold text-foreground">Feature Tour</h2>
          {showProgressBar && (
            <ProgressBar value={((currentStep + 1) / steps.length) * 100} />
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Step tabs */}
          <div className="mb-6 flex flex-col gap-2">
            {steps.map((step, index) => (
              <StepTab
                key={index}
                step={step}
                index={index}
                isActive={currentStep === index}
                onClick={() => handleStepSelect(index)}
                isCompleted={completedSteps.includes(index)}
              />
            ))}
          </div>

          {/* Step content */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentStep}
              {...slideInOut(direction)}
              className="space-y-4"
            >
              <div className="rounded-lg border border-border bg-muted/50 p-4">
                {steps[currentStep]?.icon && (
                  <div className="mb-3">{steps[currentStep].icon}</div>
                )}
                <h3 className="text-base font-medium text-foreground">
                  {steps[currentStep]?.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {steps[currentStep]?.fullDescription}
                </p>
              </div>

              {steps[currentStep]?.action && (
                <div>
                  {steps[currentStep].action?.href ? (
                    <a
                      href={steps[currentStep].action?.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-primary underline-offset-4 hover:underline"
                    >
                      {steps[currentStep].action?.label}
                      <svg
                        className="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  ) : (
                    <button
                      onClick={steps[currentStep].action?.onClick}
                      className="rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground hover:bg-primary/90"
                      type="button"
                    >
                      {steps[currentStep].action?.label}
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer navigation */}
        <div className="flex items-center justify-between border-t border-border px-6 py-4">
          <button
            onClick={handleSkip}
            className="text-sm text-muted-foreground hover:text-foreground"
            type="button"
          >
            Skip all
          </button>
          <div className="flex items-center gap-2">
            {currentStep > 0 && (
              <button
                onClick={handlePrevious}
                className="rounded-full px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground"
                type="button"
              >
                Previous
              </button>
            )}
            <button
              onClick={handleNext}
              className="rounded-full bg-primary px-4 py-1.5 text-sm text-primary-foreground hover:bg-primary/90"
              type="button"
            >
              {currentStep === steps.length - 1 ? "Done" : "Next"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default IntroDisclosure
