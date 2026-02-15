"use client"

import { ArrowRight, Bot, Check, ChevronDown, Paperclip } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useCallback, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

const AI_MODELS = [
  "Claude 4.5 Sonnet",
  "GPT-5-mini",
  "Gemini 3",
  "GPT-5-1 Mini",
  "GPT-5-1",
]

interface AIPromptProps {
  placeholder?: string
  models?: string[]
  defaultModel?: string
  onSubmit?: (value: string, model: string) => void
}

export default function AIPrompt({
  placeholder = "What can I do for you?",
  models = AI_MODELS,
  defaultModel = "Claude 4.5 Sonnet",
  onSubmit,
}: AIPromptProps) {
  const [value, setValue] = useState("")
  const [selectedModel, setSelectedModel] = useState(defaultModel)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const adjustHeight = useCallback((reset?: boolean) => {
    const textarea = textareaRef.current
    if (!textarea) return
    if (reset) {
      textarea.style.height = "72px"
      return
    }
    textarea.style.height = "72px"
    textarea.style.height = `${Math.min(textarea.scrollHeight, 300)}px`
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      onSubmit?.(value, selectedModel)
      setValue("")
      adjustHeight(true)
    }
  }

  return (
    <div className="w-full max-w-lg py-4">
      <div className="rounded-2xl bg-black/5 p-1.5 pt-4 dark:bg-white/5">
        <div className="mx-2 mb-2.5 flex items-center gap-2">
          <div className="flex flex-1 items-center gap-2">
            <Bot className="h-3.5 w-3.5 text-black dark:text-white" />
            <h3 className="text-black text-xs tracking-tighter dark:text-white/90">
              AI Assistant
            </h3>
          </div>
        </div>
        <div className="relative">
          <div className="relative flex flex-col">
            <div className="overflow-y-auto" style={{ maxHeight: "400px" }}>
              <textarea
                className={cn(
                  "w-full resize-none rounded-xl rounded-b-none border-none bg-black/5 px-4 py-3 placeholder:text-black/70 focus:outline-none focus:ring-0 dark:bg-white/5 dark:text-white dark:placeholder:text-white/70",
                  "min-h-[72px]"
                )}
                onChange={(e) => {
                  setValue(e.target.value)
                  adjustHeight()
                }}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                ref={textareaRef}
                value={value}
              />
            </div>

            <div className="flex h-14 items-center rounded-b-xl bg-black/5 dark:bg-white/5">
              <div className="absolute right-3 bottom-3 left-3 flex w-[calc(100%-24px)] items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="relative" ref={dropdownRef}>
                    <button
                      className="flex h-8 items-center gap-1 rounded-md px-2 text-xs hover:bg-black/10 dark:text-white dark:hover:bg-white/10"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      type="button"
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-1"
                          exit={{ opacity: 0, y: 5 }}
                          initial={{ opacity: 0, y: -5 }}
                          key={selectedModel}
                          transition={{ duration: 0.15 }}
                        >
                          <Bot className="h-3 w-3 opacity-50" />
                          {selectedModel}
                          <ChevronDown className="h-3 w-3 opacity-50" />
                        </motion.div>
                      </AnimatePresence>
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute bottom-full left-0 mb-1 min-w-[10rem] rounded-md border border-black/10 bg-white p-1 shadow-lg dark:border-white/10 dark:bg-neutral-900">
                        {models.map((model) => (
                          <button
                            className="flex w-full items-center justify-between gap-2 rounded-sm px-2 py-1.5 text-left text-sm hover:bg-gray-100 dark:hover:bg-zinc-800"
                            key={model}
                            onClick={() => {
                              setSelectedModel(model)
                              setIsDropdownOpen(false)
                            }}
                            type="button"
                          >
                            <div className="flex items-center gap-2">
                              <Bot className="h-4 w-4 opacity-50" />
                              <span>{model}</span>
                            </div>
                            {selectedModel === model && (
                              <Check className="h-4 w-4 text-blue-500" />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="mx-0.5 h-4 w-px bg-black/10 dark:bg-white/10" />
                  <label
                    aria-label="Attach file"
                    className={cn(
                      "cursor-pointer rounded-lg bg-black/5 p-2 dark:bg-white/5",
                      "hover:bg-black/10 dark:hover:bg-white/10",
                      "text-black/40 hover:text-black dark:text-white/40 dark:hover:text-white"
                    )}
                  >
                    <input className="hidden" type="file" />
                    <Paperclip className="h-4 w-4 transition-colors" />
                  </label>
                </div>
                <button
                  aria-label="Send message"
                  className={cn(
                    "rounded-lg bg-black/5 p-2 dark:bg-white/5",
                    "hover:bg-black/10 dark:hover:bg-white/10"
                  )}
                  disabled={!value.trim()}
                  type="button"
                  onClick={() => {
                    onSubmit?.(value, selectedModel)
                    setValue("")
                    adjustHeight(true)
                  }}
                >
                  <ArrowRight
                    className={cn(
                      "h-4 w-4 transition-opacity duration-200 dark:text-white",
                      value.trim() ? "opacity-100" : "opacity-30"
                    )}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
