"use client"

import { useState } from "react"
import { ChoicePoll } from "@/registry/components/inputs/choice-poll/component"

const options = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
  { value: "angular", label: "Angular" },
]

const initialVotes: Record<string, number> = {
  react: 142,
  vue: 89,
  svelte: 67,
  angular: 45,
}

export default function ChoicePollExample() {
  const [selected, setSelected] = useState<string>("")
  const [hasVoted, setHasVoted] = useState(false)
  const [votes, setVotes] = useState(initialVotes)

  const handleVote = () => {
    if (selected) {
      setVotes((prev) => ({
        ...prev,
        [selected]: (prev[selected] ?? 0) + 1,
      }))
      setHasVoted(true)
    }
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-4">
      <ChoicePoll.Root
        value={selected}
        onValueChange={(v) => setSelected(v as string)}
        showResults
        votes={votes}
        hasVoted={hasVoted}
      >
        <ChoicePoll.Header>
          <ChoicePoll.Title>What is your favorite framework?</ChoicePoll.Title>
          <ChoicePoll.Description>
            Pick the one you enjoy working with the most.
          </ChoicePoll.Description>
        </ChoicePoll.Header>

        <ChoicePoll.Options>
          {options.map((opt) => (
            <ChoicePoll.Option key={opt.value} value={opt.value}>
              <ChoicePoll.Indicator />
              <ChoicePoll.Label>{opt.label}</ChoicePoll.Label>
              <ChoicePoll.Percentage />
            </ChoicePoll.Option>
          ))}
        </ChoicePoll.Options>

        <ChoicePoll.Footer />
      </ChoicePoll.Root>

      {!hasVoted && (
        <button
          onClick={handleVote}
          disabled={!selected}
          className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          Submit Vote
        </button>
      )}
    </div>
  )
}
