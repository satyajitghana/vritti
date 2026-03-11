"use client"

import { useState } from "react"
import { InstructionsWidget, type Instruction } from "@/registry/components/inputs/ai-instructions/component"

const defaultInstructions: Instruction[] = [
  {
    id: "concise",
    title: "Be Concise",
    description: "Keep responses short and direct",
    content: "Always provide concise, to-the-point responses. Avoid unnecessary filler words and get straight to the answer.",
  },
  {
    id: "code-focus",
    title: "Code Focus",
    description: "Prioritize code examples over explanations",
    content: "When answering questions, lead with code examples. Keep explanations brief and inline with the code.",
  },
  {
    id: "friendly",
    title: "Friendly Tone",
    description: "Use a warm, approachable communication style",
    content: "Maintain a friendly and encouraging tone. Use casual language when appropriate.",
  },
  {
    id: "step-by-step",
    title: "Step by Step",
    description: "Break down complex tasks into steps",
    content: "When explaining complex topics, always break them down into numbered steps that are easy to follow.",
  },
]

export default function AIInstructionsExample() {
  const [instructions, setInstructions] = useState(defaultInstructions)
  const [activeIds, setActiveIds] = useState<string[]>(["concise"])

  return (
    <div className="flex min-h-[200px] items-center justify-center p-4">
      <InstructionsWidget
        instructions={instructions}
        onInstructionsChange={setInstructions}
        value={activeIds}
        onValueChange={setActiveIds}
      >
        <InstructionsWidget.Trigger />
        <InstructionsWidget.Content>
          <InstructionsWidget.Search />
          <InstructionsWidget.List>
            <InstructionsWidget.Empty />
            <InstructionsWidget.Group heading="Instructions">
              {instructions.map((inst) => (
                <InstructionsWidget.Item key={inst.id} instruction={inst} disablePreview />
              ))}
            </InstructionsWidget.Group>
          </InstructionsWidget.List>
          <InstructionsWidget.Footer>
            <InstructionsWidget.CreateTrigger />
          </InstructionsWidget.Footer>
        </InstructionsWidget.Content>
        <InstructionsWidget.CreateDialog />
      </InstructionsWidget>
    </div>
  )
}
