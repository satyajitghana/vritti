"use client"

import { AnimatePresence, motion } from "motion/react"
import * as React from "react"
import { cn } from "@/lib/utils"

interface TabItem {
  id: string
  title: string
  content?: React.ReactNode
  color: string
}

const DEFAULT_TABS: TabItem[] = [
  {
    id: "Models",
    title: "Models",
    color: "bg-blue-500 hover:bg-blue-600",
    content: (
      <div className="relative flex h-full flex-col p-6">
        <div className="space-y-2">
          <h3 className="font-semibold text-2xl tracking-tight">Models</h3>
          <p className="max-w-[90%] text-black/50 text-sm leading-relaxed dark:text-white/50">
            Choose the model you want to use
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "MCPs",
    title: "MCPs",
    color: "bg-purple-500 hover:bg-purple-600",
    content: (
      <div className="relative flex h-full flex-col p-6">
        <div className="space-y-2">
          <h3 className="font-semibold text-xl tracking-tight">MCPs</h3>
          <p className="max-w-[90%] text-black/50 text-sm leading-relaxed dark:text-white/50">
            Choose the MCP you want to use
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "Agents",
    title: "Agents",
    color: "bg-emerald-500 hover:bg-emerald-600",
    content: (
      <div className="relative flex h-full flex-col p-6">
        <div className="space-y-2">
          <h3 className="font-semibold text-2xl tracking-tight">Agents</h3>
          <p className="max-w-[90%] text-black/50 text-sm leading-relaxed dark:text-white/50">
            Choose the agent you want to use
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "Users",
    title: "Users",
    color: "bg-amber-500 hover:bg-amber-600",
    content: (
      <div className="relative flex h-full flex-col p-6">
        <div className="space-y-2">
          <h3 className="font-semibold text-2xl tracking-tight">Users</h3>
          <p className="max-w-[90%] text-black/50 text-sm leading-relaxed dark:text-white/50">
            Choose the user you want to use
          </p>
        </div>
      </div>
    ),
  },
]

interface SmoothTabProps {
  items?: TabItem[]
  defaultTabId?: string
  className?: string
  activeColor?: string
  onChange?: (tabId: string) => void
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    filter: "blur(8px)",
    scale: 0.95,
    position: "absolute" as const,
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    position: "absolute" as const,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
    filter: "blur(8px)",
    scale: 0.95,
    position: "absolute" as const,
  }),
}

const transition = {
  duration: 0.4,
  ease: [0.32, 0.72, 0, 1] as [number, number, number, number],
}

export default function SmoothTab({
  items = DEFAULT_TABS,
  defaultTabId = DEFAULT_TABS[0].id,
  className,
  activeColor = "bg-[#1F9CFE]",
  onChange,
}: SmoothTabProps) {
  const [selected, setSelected] = React.useState<string>(defaultTabId)
  const [direction, setDirection] = React.useState(0)
  const [dimensions, setDimensions] = React.useState({ width: 0, left: 0 })

  const buttonRefs = React.useRef<Map<string, HTMLButtonElement>>(new Map())
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useLayoutEffect(() => {
    const updateDimensions = () => {
      const selectedButton = buttonRefs.current.get(selected)
      const container = containerRef.current

      if (selectedButton && container) {
        const rect = selectedButton.getBoundingClientRect()
        const containerRect = container.getBoundingClientRect()

        setDimensions({
          width: rect.width,
          left: rect.left - containerRect.left,
        })
      }
    }

    requestAnimationFrame(() => {
      updateDimensions()
    })

    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [selected])

  const handleTabClick = (tabId: string) => {
    const currentIndex = items.findIndex((item) => item.id === selected)
    const newIndex = items.findIndex((item) => item.id === tabId)
    setDirection(newIndex > currentIndex ? 1 : -1)
    setSelected(tabId)
    onChange?.(tabId)
  }

  const selectedItem = items.find((item) => item.id === selected)

  return (
    <div className="flex h-full flex-col">
      <div className="relative mb-4 flex-1">
        <div className="relative h-[200px] w-full rounded-lg border bg-card">
          <div className="absolute inset-0 overflow-hidden rounded-lg">
            <AnimatePresence
              custom={direction}
              initial={false}
              mode="popLayout"
            >
              <motion.div
                animate="center"
                className="absolute inset-0 h-full w-full bg-card will-change-transform"
                custom={direction}
                exit="exit"
                initial="enter"
                key={`card-${selected}`}
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
                transition={transition}
                variants={slideVariants}
              >
                {selectedItem?.content}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div
        aria-label="Smooth tabs"
        className={cn(
          "relative mt-auto flex items-center justify-between gap-1 py-1",
          "mx-auto w-[400px] bg-background",
          "rounded-xl border",
          "transition-all duration-200",
          className
        )}
        ref={containerRef}
        role="tablist"
      >
        <motion.div
          animate={{
            width: dimensions.width - 8,
            x: dimensions.left + 4,
            opacity: 1,
          }}
          className={cn(
            "absolute z-[1] rounded-lg",
            selectedItem?.color || activeColor
          )}
          initial={false}
          style={{ height: "calc(100% - 8px)", top: "4px" }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
          }}
        />

        <div className="relative z-[2] grid w-full grid-cols-4 gap-1">
          {items.map((item) => {
            const isSelected = selected === item.id
            return (
              <motion.button
                aria-selected={isSelected}
                className={cn(
                  "relative flex items-center justify-center gap-0.5 rounded-lg px-2 py-1.5",
                  "font-medium text-sm transition-all duration-300",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  "truncate",
                  isSelected
                    ? "text-white"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                )}
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                ref={(el) => {
                  if (el) buttonRefs.current.set(item.id, el)
                  else buttonRefs.current.delete(item.id)
                }}
                role="tab"
                tabIndex={isSelected ? 0 : -1}
                type="button"
              >
                <span className="truncate">{item.title}</span>
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
