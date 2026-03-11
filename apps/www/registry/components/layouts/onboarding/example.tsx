"use client"

import { Onboarding } from "./component"

export default function OnboardingExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <Onboarding totalSteps={3} onComplete={() => console.log("Onboarding complete!")} className="w-full max-w-md">
        <Onboarding.StepIndicator className="mb-6" />

        <Onboarding.Step step={1}>
          <Onboarding.Header
            title="Welcome to Vritti UI"
            description="427+ animated React components for your next project."
          />
        </Onboarding.Step>

        <Onboarding.Step step={2}>
          <Onboarding.Header
            title="Easy Installation"
            description="Install any component with a single CLI command using shadcn."
          />
        </Onboarding.Step>

        <Onboarding.Step step={3}>
          <Onboarding.Header
            title="Ready to Build"
            description="Start creating beautiful interfaces with dark mode support out of the box."
          />
        </Onboarding.Step>

        <Onboarding.Navigation className="mt-6" />
      </Onboarding>
    </div>
  )
}
