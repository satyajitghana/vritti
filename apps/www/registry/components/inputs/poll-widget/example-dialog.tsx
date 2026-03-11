"use client"

import { useState } from "react"
import { PollWidget } from "@/registry/components/inputs/poll-widget/component"

const options = [
  { id: "ts", label: "TypeScript" },
  { id: "js", label: "JavaScript" },
  { id: "py", label: "Python" },
]

export default function PollWidgetDialogExample() {
  const [votes, setVotes] = useState<Record<string, number>>({ ts: 30, js: 20, py: 25 })
  const [hasVoted, setHasVoted] = useState(false)

  return (
    <div className="flex min-h-[200px] items-center justify-center p-4">
      <PollWidget
        question="Favorite language?"
        options={options}
        votes={votes}
        hasVoted={hasVoted}
        onVote={(ids) => {
          setVotes((prev) => {
            const next = { ...prev }
            for (const id of ids) next[id] = (next[id] ?? 0) + 1
            return next
          })
          setHasVoted(true)
        }}
        mode="dialog"
      >
        <PollWidget.Trigger />
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
  )
}
