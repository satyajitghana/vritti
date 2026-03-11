"use client"

import {
  PromptLibraryWidget,
  type Prompt,
} from "@/registry/components/inputs/prompt-library/component"

const samplePrompts: Prompt[] = [
  {
    id: "code-review",
    title: "Code Review",
    description: "Review code for best practices and potential issues",
    prompt:
      "Please review this code for best practices, potential bugs, performance issues, and security concerns. Provide specific suggestions for improvement.",
    category: "Development",
  },
  {
    id: "explain-code",
    title: "Explain Code",
    description: "Get a detailed explanation of how code works",
    prompt:
      "Please explain this code in detail. Break down each section, describe what it does, and explain why it was written this way. Include any important patterns or concepts used.",
    category: "Development",
  },
  {
    id: "write-tests",
    title: "Write Tests",
    description: "Generate unit tests for the provided code",
    prompt:
      "Write comprehensive unit tests for this code. Cover edge cases, error handling, and expected behavior. Use the testing framework already in use in the project.",
    category: "Development",
  },
  {
    id: "summarize",
    title: "Summarize",
    description: "Create a concise summary of the content",
    prompt:
      "Please provide a concise summary of the following content. Highlight the key points, main arguments, and any actionable takeaways.",
    category: "Writing",
  },
  {
    id: "improve-writing",
    title: "Improve Writing",
    description: "Enhance clarity and style of written content",
    prompt:
      "Please improve this text for clarity, conciseness, and readability. Maintain the original meaning and tone while enhancing the overall quality of the writing.",
    category: "Writing",
  },
]

export default function PromptLibraryExample() {
  const devPrompts = samplePrompts.filter((p) => p.category === "Development")
  const writingPrompts = samplePrompts.filter((p) => p.category === "Writing")

  return (
    <div className="flex min-h-[200px] items-end justify-center p-4">
      <PromptLibraryWidget
        prompts={samplePrompts}
        onSelect={(prompt) => console.log("Selected:", prompt.title)}
      >
        <PromptLibraryWidget.Trigger />
        <PromptLibraryWidget.Content>
          <PromptLibraryWidget.Search />
          <PromptLibraryWidget.List>
            <PromptLibraryWidget.Empty />
            <PromptLibraryWidget.Group heading="Development">
              {devPrompts.map((prompt) => (
                <PromptLibraryWidget.Item key={prompt.id} prompt={prompt} />
              ))}
            </PromptLibraryWidget.Group>
            <PromptLibraryWidget.Separator />
            <PromptLibraryWidget.Group heading="Writing">
              {writingPrompts.map((prompt) => (
                <PromptLibraryWidget.Item key={prompt.id} prompt={prompt} />
              ))}
            </PromptLibraryWidget.Group>
          </PromptLibraryWidget.List>
          <PromptLibraryWidget.Footer>
            <PromptLibraryWidget.CreateTrigger />
          </PromptLibraryWidget.Footer>
        </PromptLibraryWidget.Content>
        <PromptLibraryWidget.CreateDialog />
      </PromptLibraryWidget>
    </div>
  )
}
