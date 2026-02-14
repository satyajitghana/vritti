"use client"

import { useState, useEffect, useMemo, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  Search,
  Send,
  BarChart2,
  Video,
  PlaneTakeoff,
  AudioLines,
  LayoutGrid,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Action {
  id: string
  label: string
  icon: React.ReactNode
  description?: string
  short?: string
  end?: string
}

interface SearchResult {
  actions: Action[]
}

const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0, height: 0 },
    show: {
      opacity: 1,
      height: "auto",
      transition: {
        height: { duration: 0.4 },
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        height: { duration: 0.3 },
        opacity: { duration: 0.2 },
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 },
    },
  },
} as const

const defaultActions: Action[] = [
  {
    id: "1",
    label: "Book tickets",
    icon: <PlaneTakeoff className="h-4 w-4 text-blue-500" />,
    description: "Operator",
    short: "Cmd+K",
    end: "Agent",
  },
  {
    id: "2",
    label: "Summarize",
    icon: <BarChart2 className="h-4 w-4 text-orange-500" />,
    description: "GPT-5",
    short: "Cmd+P",
    end: "Command",
  },
  {
    id: "3",
    label: "Screen Studio",
    icon: <Video className="h-4 w-4 text-purple-500" />,
    description: "Claude 4.1",
    end: "Application",
  },
  {
    id: "4",
    label: "Talk to Jarvis",
    icon: <AudioLines className="h-4 w-4 text-green-500" />,
    description: "GPT-5 voice",
    end: "Active",
  },
  {
    id: "5",
    label: "Component Library",
    icon: <LayoutGrid className="h-4 w-4 text-blue-500" />,
    description: "Components",
    end: "Link",
  },
]

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])
  return debouncedValue
}

interface ActionSearchBarProps {
  actions?: Action[]
  defaultOpen?: boolean
}

export default function ActionSearchBar({
  actions = defaultActions,
  defaultOpen = false,
}: ActionSearchBarProps) {
  const [query, setQuery] = useState("")
  const [result, setResult] = useState<SearchResult | null>(null)
  const [isFocused, setIsFocused] = useState(defaultOpen)
  const [selectedAction, setSelectedAction] = useState<Action | null>(null)
  const [activeIndex, setActiveIndex] = useState(-1)
  const debouncedQuery = useDebounce(query, 200)

  const filteredActions = useMemo(() => {
    if (!debouncedQuery) return actions
    const normalizedQuery = debouncedQuery.toLowerCase().trim()
    return actions.filter((action) => {
      const searchableText =
        `${action.label} ${action.description || ""}`.toLowerCase()
      return searchableText.includes(normalizedQuery)
    })
  }, [debouncedQuery, actions])

  useEffect(() => {
    if (!isFocused) {
      setResult(null)
      setActiveIndex(-1)
      return
    }
    setResult({ actions: filteredActions })
    setActiveIndex(-1)
  }, [filteredActions, isFocused])

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value)
      setActiveIndex(-1)
    },
    []
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!result?.actions.length) return
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault()
          setActiveIndex((prev) =>
            prev < result.actions.length - 1 ? prev + 1 : 0
          )
          break
        case "ArrowUp":
          e.preventDefault()
          setActiveIndex((prev) =>
            prev > 0 ? prev - 1 : result.actions.length - 1
          )
          break
        case "Enter":
          e.preventDefault()
          if (activeIndex >= 0 && result.actions[activeIndex]) {
            setSelectedAction(result.actions[activeIndex])
          }
          break
        case "Escape":
          setIsFocused(false)
          setActiveIndex(-1)
          break
      }
    },
    [result?.actions, activeIndex]
  )

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="relative flex flex-col justify-start items-center min-h-[300px]">
        <div className="w-full max-w-sm sticky top-0 bg-background z-10 pt-4 pb-1">
          <label
            className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 block"
            htmlFor="action-search"
          >
            Search Commands
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="What's up?"
              value={query}
              onChange={handleInputChange}
              onFocus={() => {
                setSelectedAction(null)
                setIsFocused(true)
                setActiveIndex(-1)
              }}
              onBlur={() => {
                setTimeout(() => {
                  setIsFocused(false)
                  setActiveIndex(-1)
                }, 200)
              }}
              onKeyDown={handleKeyDown}
              role="combobox"
              aria-expanded={isFocused && !!result}
              id="action-search"
              autoComplete="off"
              className="w-full pl-3 pr-9 py-1.5 h-9 text-sm rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4">
              <AnimatePresence mode="popLayout">
                {query.length > 0 ? (
                  <motion.div
                    key="send"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Send className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="search"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Search className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="w-full max-w-sm">
          <AnimatePresence>
            {isFocused && result && !selectedAction && (
              <motion.div
                className="w-full border rounded-md shadow-sm overflow-hidden dark:border-gray-800 bg-white dark:bg-black mt-1"
                variants={ANIMATION_VARIANTS.container}
                role="listbox"
                aria-label="Search results"
                initial="hidden"
                animate="show"
                exit="exit"
              >
                <motion.ul role="none">
                  {result.actions.map((action, idx) => (
                    <motion.li
                      key={action.id}
                      className={cn(
                        "px-3 py-2 flex items-center justify-between hover:bg-gray-200 dark:hover:bg-zinc-900 cursor-pointer rounded-md",
                        activeIndex === idx
                          ? "bg-gray-100 dark:bg-zinc-800"
                          : ""
                      )}
                      variants={ANIMATION_VARIANTS.item}
                      layout
                      onClick={() => setSelectedAction(action)}
                      role="option"
                      aria-selected={activeIndex === idx}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500" aria-hidden="true">
                          {action.icon}
                        </span>
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {action.label}
                        </span>
                        {action.description && (
                          <span className="text-xs text-gray-400">
                            {action.description}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {action.short && (
                          <span className="text-xs text-gray-400">
                            {action.short}
                          </span>
                        )}
                        {action.end && (
                          <span className="text-xs text-gray-400 text-right">
                            {action.end}
                          </span>
                        )}
                      </div>
                    </motion.li>
                  ))}
                </motion.ul>
                <div className="mt-2 px-3 py-2 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Press Cmd+K to open commands</span>
                    <span>ESC to cancel</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
