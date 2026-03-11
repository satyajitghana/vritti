"use client"

import { useState } from "react"
import { Onboarding } from "@/registry/components/layouts/onboarding/component"

export default function OnboardingExample() {
  const [completed, setCompleted] = useState(false)

  if (completed) {
    return (
      <div className="mx-auto flex w-full max-w-md flex-col items-center gap-4 rounded-xl border border-border bg-background p-8 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-foreground">All set!</h2>
        <p className="text-sm text-muted-foreground">You have completed the onboarding flow.</p>
        <button onClick={() => setCompleted(false)} className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90">Restart</button>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <Onboarding totalSteps={3} onComplete={() => setCompleted(true)} className="gap-6">
        <Onboarding.StepIndicator className="mx-auto" />

        <Onboarding.Step step={1}>
          <Onboarding.Header title="Welcome" description="Let us show you around the key features of the platform." />
          <div className="mt-6 flex items-center justify-center rounded-lg bg-muted/50 p-8">
            <svg className="h-16 w-16 text-muted-foreground/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </Onboarding.Step>

        <Onboarding.Step step={2}>
          <Onboarding.Header title="Customize" description="Make it yours by adjusting settings and preferences." />
          <div className="mt-6 flex items-center justify-center rounded-lg bg-muted/50 p-8">
            <svg className="h-16 w-16 text-muted-foreground/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        </Onboarding.Step>

        <Onboarding.Step step={3}>
          <Onboarding.Header title="Ready to Go" description="You are all set to start building amazing things." />
          <div className="mt-6 flex items-center justify-center rounded-lg bg-muted/50 p-8">
            <svg className="h-16 w-16 text-muted-foreground/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </Onboarding.Step>

        <Onboarding.Navigation className="mt-2" />
      </Onboarding>
    </div>
  )
}
