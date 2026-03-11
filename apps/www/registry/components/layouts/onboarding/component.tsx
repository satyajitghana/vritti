"use client"

import type * as React from "react"
import {
  Children,
  createContext,
  useCallback,
  useContext,
  useId,
  useMemo,
  type PropsWithChildren,
} from "react"
import { useControllableState } from "@radix-ui/react-use-controllable-state"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const stepIndicatorVariants = cva("flex items-center justify-center gap-2", {
  variants: {
    variant: { dots: "", pills: "" },
  },
  defaultVariants: { variant: "dots" },
})

const stepDotVariants = cva("rounded-full transition-all duration-200", {
  variants: {
    variant: {
      dots: "size-2 data-[state=active]:size-2.5 data-[state=active]:bg-foreground data-[state=completed]:bg-foreground/60 data-[state=inactive]:bg-muted-foreground/30",
      pills: "h-1 max-w-8 flex-1 rounded-full data-[state=active]:bg-foreground data-[state=completed]:bg-foreground/60 data-[state=inactive]:bg-muted-foreground/30",
    },
  },
  defaultVariants: { variant: "dots" },
})

export interface StepIndicatorProps
  extends React.ComponentPropsWithoutRef<"div">,
    VariantProps<typeof stepIndicatorVariants>,
    VariantProps<typeof stepDotVariants> {
  currentStep: number
  totalSteps: number
  dotClassName?: string
}

export function StepIndicator({
  currentStep,
  totalSteps,
  variant = "dots",
  className,
  dotClassName,
  ...props
}: StepIndicatorProps) {
  return (
    <div
      aria-label={`Step ${currentStep} of ${totalSteps}`}
      aria-valuemax={totalSteps}
      aria-valuemin={1}
      aria-valuenow={currentStep}
      className={cn(stepIndicatorVariants({ variant }), className)}
      role="progressbar"
      {...props}
    >
      {Array.from({ length: totalSteps }, (_, i) => {
        const stepNumber = i + 1
        const isActive = currentStep === stepNumber
        const isCompleted = currentStep > stepNumber
        let stepState: "active" | "completed" | "inactive" = "inactive"
        if (isActive) stepState = "active"
        else if (isCompleted) stepState = "completed"
        return (
          <div
            aria-current={isActive ? "step" : undefined}
            className={cn(stepDotVariants({ variant }), dotClassName)}
            data-state={stepState}
            key={stepNumber}
          />
        )
      })}
    </div>
  )
}

export interface OnboardingContextValue {
  currentStep: number
  totalSteps: number
  stepValue: number
  setStep: (step: number | ((prev: number) => number)) => void
  setStepValue: (value: number | ((prev: number) => number)) => void
  maxStepValue: number
  canGoNext: boolean
  canGoBack: boolean
  handleBack: () => void
  handleNext: () => void
  handleComplete: () => void
  onComplete?: () => void
}

const OnboardingContext = createContext<OnboardingContextValue | null>(null)

function useOnboarding() {
  const ctx = useContext(OnboardingContext)
  if (!ctx) throw new Error("Onboarding components must be used within Onboarding.Root")
  return ctx
}

export interface OnboardingRootProps
  extends PropsWithChildren,
    Omit<React.ComponentPropsWithoutRef<"div">, "children"> {
  value?: number
  defaultValue?: number
  onValueChange?: (step: number) => void
  stepValue?: number
  defaultStepValue?: number
  onStepValueChange?: (value: number) => void
  totalSteps: number
  maxStepValue?: number
  onComplete?: () => void
  canGoNext?: (step: number, stepValue: number) => boolean
}

function OnboardingRoot({
  value: controlledValue,
  defaultValue = 1,
  onValueChange,
  stepValue: controlledStepValue,
  defaultStepValue = 0,
  onStepValueChange,
  totalSteps,
  maxStepValue: controlledMaxStepValue = 0,
  onComplete,
  canGoNext: canGoNextFn,
  children,
  className,
  ...props
}: OnboardingRootProps) {
  const [currentStep, setCurrentStep] = useControllableState({
    prop: controlledValue,
    defaultProp: defaultValue,
    onChange: onValueChange,
  })
  const [stepValue, setStepValueState] = useControllableState({
    prop: controlledStepValue,
    defaultProp: defaultStepValue,
    onChange: onStepValueChange,
  })
  const maxStepValue = controlledMaxStepValue ?? 0
  const canGoNext = canGoNextFn ? canGoNextFn(currentStep, stepValue) : true
  const canGoBack = currentStep > 1 || stepValue > 0

  const handleNext = useCallback(() => {
    if (currentStep === 1 && stepValue < maxStepValue) {
      setStepValueState((prev) => prev + 1)
    } else if (currentStep < totalSteps) {
      setStepValueState(0)
      setCurrentStep((prev) => prev + 1)
    }
  }, [currentStep, stepValue, maxStepValue, totalSteps, setStepValueState, setCurrentStep])

  const handleBack = useCallback(() => {
    if (currentStep === 1 && stepValue > 0) {
      setStepValueState((prev) => prev - 1)
    } else if (currentStep === 2) {
      setCurrentStep(1)
      setStepValueState(maxStepValue)
    } else if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }, [currentStep, stepValue, maxStepValue, setStepValueState, setCurrentStep])

  const handleComplete = useCallback(() => { onComplete?.() }, [onComplete])

  const contextValue = useMemo<OnboardingContextValue>(
    () => ({
      currentStep, totalSteps, stepValue,
      setStep: setCurrentStep, setStepValue: setStepValueState,
      maxStepValue, canGoNext, canGoBack,
      handleBack, handleNext, handleComplete, onComplete,
    }),
    [currentStep, totalSteps, stepValue, setCurrentStep, setStepValueState, maxStepValue, canGoNext, canGoBack, handleBack, handleNext, handleComplete, onComplete]
  )

  return (
    <OnboardingContext.Provider value={contextValue}>
      <div
        className={cn("flex flex-col rounded-xl border bg-background p-6 shadow-sm", className)}
        data-slot="onboarding"
        data-state={`step-${currentStep}`}
        {...props}
      >
        {children}
      </div>
    </OnboardingContext.Provider>
  )
}

export interface OnboardingStepProps extends React.ComponentPropsWithoutRef<"div"> {
  step: number
}

function OnboardingStep({ step, children, className, ...props }: OnboardingStepProps) {
  const { currentStep } = useOnboarding()
  if (currentStep !== step) return null
  return <div className={cn(className)} data-slot="onboarding-step" data-state="active" {...props}>{children}</div>
}

function OnboardingStepIndicator(props: Omit<StepIndicatorProps, "currentStep" | "totalSteps">) {
  const { currentStep, totalSteps } = useOnboarding()
  return <StepIndicator currentStep={currentStep} totalSteps={totalSteps} {...props} />
}

export interface OnboardingHeaderProps extends React.ComponentPropsWithoutRef<"div"> {
  title?: string
  description?: string
  children?: React.ReactNode
}

function OnboardingHeader({ title, description, children, className, ...props }: OnboardingHeaderProps) {
  if (children) return <div className={cn("text-center", className)} data-slot="onboarding-header" {...props}>{children}</div>
  return (
    <div className={cn("flex flex-col gap-1 text-center", className)} data-slot="onboarding-header" {...props}>
      {title && <h2 className="font-semibold text-xl text-foreground" data-slot="onboarding-title">{title}</h2>}
      {description && <p className="text-base text-muted-foreground" data-slot="onboarding-description">{description}</p>}
    </div>
  )
}

export interface OnboardingNavigationProps extends React.ComponentPropsWithoutRef<"fieldset"> {
  backLabel?: string
  nextLabel?: string
  completeLabel?: string
  canGoNext?: boolean
  children?: React.ReactNode
}

function OnboardingNavigation({
  backLabel = "Back",
  nextLabel = "Next",
  completeLabel = "Get Started",
  canGoNext: canGoNextOverride,
  children,
  className,
  ...props
}: OnboardingNavigationProps) {
  const { currentStep, totalSteps, canGoNext: contextCanGoNext, canGoBack, handleBack, handleNext, handleComplete } = useOnboarding()
  const canGoNext = canGoNextOverride ?? contextCanGoNext
  const isLastStep = currentStep === totalSteps

  if (children) return <fieldset className={cn("flex gap-3", className)} data-slot="onboarding-navigation" {...props}>{children}</fieldset>

  return (
    <fieldset className={cn("flex gap-3", className)} data-slot="onboarding-navigation" {...props}>
      <button
        className="flex-1 rounded-xl py-2.5 border border-border bg-background text-foreground hover:bg-muted disabled:opacity-50"
        disabled={!canGoBack}
        onClick={handleBack}
      >
        {backLabel}
      </button>
      {isLastStep ? (
        <button
          className="flex-1 rounded-xl py-2.5 bg-foreground text-background hover:bg-foreground/90"
          onClick={handleComplete}
        >
          {completeLabel}
        </button>
      ) : (
        <button
          className="flex-1 rounded-xl py-2.5 bg-foreground text-background hover:bg-foreground/90 disabled:opacity-50"
          disabled={!canGoNext}
          onClick={handleNext}
        >
          {nextLabel}
        </button>
      )}
    </fieldset>
  )
}

export const Onboarding = Object.assign(OnboardingRoot, {
  Step: OnboardingStep,
  StepIndicator: OnboardingStepIndicator,
  Header: OnboardingHeader,
  Navigation: OnboardingNavigation,
})

export { useOnboarding }
export default Onboarding
