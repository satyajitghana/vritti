"use client"

import { useState } from "react"
import { IntroDisclosure, type IntroDisclosureStep } from "@/registry/components/special/intro-disclosure/component"

const steps: IntroDisclosureStep[] = [
  {
    title: "Dashboard Overview",
    shortDescription: "Get familiar with the main dashboard layout",
    fullDescription:
      "The dashboard gives you a bird's-eye view of all your projects, recent activity, and quick actions. Everything you need is just one click away.",
    icon: (
      <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    title: "Collaboration Tools",
    shortDescription: "Work together with your team in real-time",
    fullDescription:
      "Invite team members, assign tasks, and collaborate in real-time. Comments, mentions, and notifications keep everyone on the same page.",
  },
  {
    title: "Keyboard Shortcuts",
    shortDescription: "Speed up your workflow with shortcuts",
    fullDescription:
      "Press Cmd+K to open the command palette. Use arrow keys to navigate, and Enter to select. Master these shortcuts to fly through your work.",
    action: {
      label: "View all shortcuts",
      onClick: () => console.log("View shortcuts clicked"),
    },
  },
]

export default function IntroDisclosureExample() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex min-h-[200px] items-center justify-center">
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        Start Feature Tour
      </button>

      <IntroDisclosure
        steps={steps}
        open={open}
        onOpenChange={setOpen}
        onComplete={() => console.log("Tour completed")}
        onSkip={() => console.log("Tour skipped")}
      />
    </div>
  )
}
