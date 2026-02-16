"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

const Conversation = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const [showScrollButton, setShowScrollButton] = React.useState(false)

  const handleScroll = React.useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 100
    setShowScrollButton(!isNearBottom)
  }, [])

  React.useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.addEventListener("scroll", handleScroll)
    return () => el.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  React.useEffect(() => {
    const el = scrollRef.current
    if (el) {
      el.scrollTop = el.scrollHeight
    }
  })

  return (
    <ConversationContext.Provider value={{ scrollRef, showScrollButton }}>
      <div
        ref={(node) => {
          if (typeof ref === "function") ref(node)
          else if (ref) ref.current = node
          ;(scrollRef as React.MutableRefObject<HTMLDivElement | null>).current = node
        }}
        className={cn("relative flex-1 overflow-y-auto", className)}
        {...props}
      >
        {children}
      </div>
    </ConversationContext.Provider>
  )
})
Conversation.displayName = "Conversation"

type ConversationContextValue = {
  scrollRef: React.RefObject<HTMLDivElement | null>
  showScrollButton: boolean
}

const ConversationContext = React.createContext<ConversationContextValue>({
  scrollRef: { current: null },
  showScrollButton: false,
})

function useConversation() {
  return React.useContext(ConversationContext)
}

const ConversationContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-4 p-4", className)}
    {...props}
  />
))
ConversationContent.displayName = "ConversationContent"

function ConversationScrollButton({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { scrollRef, showScrollButton } = useConversation()

  if (!showScrollButton) return null

  return (
    <button
      type="button"
      className={cn(
        "absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full border bg-background p-1.5 shadow-md transition-opacity hover:bg-accent",
        className
      )}
      onClick={() => {
        const el = scrollRef.current
        if (el) {
          el.scrollTo({ top: el.scrollHeight, behavior: "smooth" })
        }
      }}
      {...props}
    >
      <ChevronDown className="size-4" />
    </button>
  )
}
ConversationScrollButton.displayName = "ConversationScrollButton"

export { Conversation, ConversationContent, ConversationScrollButton, useConversation }
