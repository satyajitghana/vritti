"use client"

import AIPrompt from "./component"

export default function AIPromptExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <AIPrompt
        placeholder="What can I do for you?"
        onSubmit={(value, model) =>
          console.log(`Sent "${value}" to ${model}`)
        }
      />
    </div>
  )
}
