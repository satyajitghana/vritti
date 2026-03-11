"use client"

import { useState } from "react"
import { VoteTally } from "@/registry/components/inputs/vote-tally/component"

const items = [
  { id: "dark-mode", title: "Dark Mode Support", description: "Add dark mode toggle to the dashboard" },
  { id: "keyboard-shortcuts", title: "Keyboard Shortcuts", description: "Quick actions via keyboard" },
  { id: "api-v2", title: "API v2", description: "New REST API with better pagination" },
  { id: "mobile-app", title: "Mobile App", description: "Native iOS and Android apps" },
]

export default function VoteTallyExample() {
  const [votes, setVotes] = useState<Record<string, number>>({
    "dark-mode": 24,
    "keyboard-shortcuts": 18,
    "api-v2": 12,
    "mobile-app": 31,
  })

  return (
    <div className="mx-auto w-full max-w-md">
      <h3 className="mb-1 text-lg font-semibold text-foreground">Feature Requests</h3>
      <p className="mb-4 text-sm text-muted-foreground">
        Upvote the features you want to see next.
      </p>

      <VoteTally.Root
        defaultValue={votes}
        onValueChange={setVotes}
        className="gap-3"
      >
        <VoteTally.Group sortBy="votes-desc">
          {items.map((item) => (
            <VoteTally.Item
              key={item.id}
              value={item.id}
              className="flex items-center gap-3 rounded-lg border border-border bg-background p-3 transition-colors hover:bg-muted/50"
            >
              <VoteTally.Trigger className="flex flex-col items-center gap-0.5 rounded-md border border-border px-2 py-1.5 text-muted-foreground transition-colors hover:border-primary hover:text-primary data-[state=voted]:border-primary data-[state=voted]:bg-primary/10 data-[state=voted]:text-primary">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                </svg>
                <VoteTally.Count className="text-xs font-semibold tabular-nums" />
              </VoteTally.Trigger>
              <div className="min-w-0 flex-1">
                <VoteTally.Title className="block text-sm font-medium text-foreground">
                  {item.title}
                </VoteTally.Title>
                <VoteTally.Description className="block text-xs text-muted-foreground">
                  {item.description}
                </VoteTally.Description>
              </div>
            </VoteTally.Item>
          ))}
        </VoteTally.Group>
      </VoteTally.Root>
    </div>
  )
}
