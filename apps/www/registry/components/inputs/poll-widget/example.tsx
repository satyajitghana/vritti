"use client"

import { useState } from "react"
import { PollWidget } from "@/registry/components/inputs/poll-widget/component"

const options = [
  { id: "react", label: "React", description: "A JavaScript library for building UIs" },
  { id: "vue", label: "Vue", description: "The progressive JavaScript framework" },
  { id: "svelte", label: "Svelte", description: "Cybernetically enhanced web apps" },
  { id: "angular", label: "Angular", description: "The modern web developer's platform" },
]

export default function PollWidgetExample() {
  const [votes, setVotes] = useState<Record<string, number>>({
    react: 42,
    vue: 28,
    svelte: 15,
    angular: 10,
  })
  const [hasVoted, setHasVoted] = useState(false)

  const handleVote = (selectedIds: string[]) => {
    setVotes((prev) => {
      const next = { ...prev }
      for (const id of selectedIds) {
        next[id] = (next[id] ?? 0) + 1
      }
      return next
    })
    setHasVoted(true)
  }

  return (
    <div className="flex min-h-[300px] items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <PollWidget
          question="What's your favorite framework?"
          description="Pick the one you use most"
          options={options}
          votes={votes}
          hasVoted={hasVoted}
          onVote={handleVote}
          mode="inline"
        >
          <PollWidget.Content>
            <PollWidget.Question />
            <PollWidget.Options>
              {options.map((opt) => (
                <PollWidget.Option key={opt.id} value={opt.id} />
              ))}
            </PollWidget.Options>
            <PollWidget.Results />
            <PollWidget.Submit />
          </PollWidget.Content>
        </PollWidget>
      </div>
    </div>
  )
}
