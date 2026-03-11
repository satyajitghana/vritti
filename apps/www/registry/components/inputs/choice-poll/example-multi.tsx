"use client"

import { useState } from "react"
import { ChoicePoll } from "@/registry/components/inputs/choice-poll/component"

const options = [
  { value: "typescript", label: "TypeScript" },
  { value: "tailwind", label: "Tailwind CSS" },
  { value: "nextjs", label: "Next.js" },
  { value: "prisma", label: "Prisma" },
  { value: "trpc", label: "tRPC" },
]

export default function ChoicePollMultiExample() {
  const [selected, setSelected] = useState<string[]>([])
  const [hasVoted, setHasVoted] = useState(false)
  const [votes, setVotes] = useState<Record<string, number>>({
    typescript: 210,
    tailwind: 185,
    nextjs: 167,
    prisma: 98,
    trpc: 76,
  })

  const handleVote = () => {
    if (selected.length > 0) {
      setVotes((prev) => {
        const next = { ...prev }
        selected.forEach((s) => {
          next[s] = (next[s] ?? 0) + 1
        })
        return next
      })
      setHasVoted(true)
    }
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-4">
      <ChoicePoll.Root
        multiple
        value={selected}
        onValueChange={(v) => setSelected(v as string[])}
        showResults
        votes={votes}
        hasVoted={hasVoted}
      >
        <ChoicePoll.Header>
          <ChoicePoll.Title>Which tools do you use daily?</ChoicePoll.Title>
          <ChoicePoll.Description>
            Select all that apply.
          </ChoicePoll.Description>
        </ChoicePoll.Header>

        <ChoicePoll.Options>
          {options.map((opt) => (
            <ChoicePoll.Option key={opt.value} value={opt.value}>
              <ChoicePoll.Indicator />
              <ChoicePoll.Label>{opt.label}</ChoicePoll.Label>
              <ChoicePoll.Progress />
              <ChoicePoll.Percentage />
            </ChoicePoll.Option>
          ))}
        </ChoicePoll.Options>

        <ChoicePoll.Footer />
      </ChoicePoll.Root>

      {!hasVoted && (
        <button
          onClick={handleVote}
          disabled={selected.length === 0}
          className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          Submit Votes ({selected.length} selected)
        </button>
      )}
    </div>
  )
}
