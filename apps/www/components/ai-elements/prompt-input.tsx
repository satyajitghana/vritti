"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ArrowUp, Square } from "lucide-react"

interface PromptInputProps extends Omit<React.HTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  onSubmit?: (message: { text: string }) => void
}

const PromptInputContext = React.createContext<{
  text: string
  setText: (text: string) => void
  submit: () => void
}>({
  text: "",
  setText: () => {},
  submit: () => {},
})

const PromptInput = React.forwardRef<HTMLFormElement, PromptInputProps>(
  ({ className, children, onSubmit, ...props }, ref) => {
    const [text, setText] = React.useState("")

    const submit = React.useCallback(() => {
      if (text.trim() && onSubmit) {
        onSubmit({ text: text.trim() })
        setText("")
      }
    }, [text, onSubmit])

    return (
      <PromptInputContext.Provider value={{ text, setText, submit }}>
        <form
          ref={ref}
          className={cn("relative w-full max-w-3xl mx-auto", className)}
          onSubmit={(e) => {
            e.preventDefault()
            submit()
          }}
          {...props}
        >
          <div data-slot="input-group" className="rounded-lg border bg-background shadow-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
            {children}
          </div>
        </form>
      </PromptInputContext.Provider>
    )
  }
)
PromptInput.displayName = "PromptInput"

interface PromptInputTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const PromptInputTextarea = React.forwardRef<
  HTMLTextAreaElement,
  PromptInputTextareaProps
>(({ className, onChange, onKeyDown, ...props }, ref) => {
  const { submit } = React.useContext(PromptInputContext)

  return (
    <textarea
      ref={ref}
      rows={1}
      className={cn(
        "w-full resize-none bg-transparent px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      onChange={onChange}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault()
          submit()
        }
        onKeyDown?.(e)
      }}
      {...props}
    />
  )
})
PromptInputTextarea.displayName = "PromptInputTextarea"

const PromptInputFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center justify-between px-3 py-2",
      className
    )}
    {...props}
  />
))
PromptInputFooter.displayName = "PromptInputFooter"

const PromptInputTools = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-1", className)}
    {...props}
  />
))
PromptInputTools.displayName = "PromptInputTools"

const PromptInputButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    className={cn(
      "inline-flex items-center justify-center rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
      className
    )}
    {...props}
  />
))
PromptInputButton.displayName = "PromptInputButton"

interface PromptInputSubmitProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  status?: string
}

const PromptInputSubmit = React.forwardRef<
  HTMLButtonElement,
  PromptInputSubmitProps
>(({ className, status = "ready", disabled, ...props }, ref) => {
  const isStreaming = status === "streaming" || status === "submitted"

  return (
    <button
      ref={ref}
      type="submit"
      disabled={disabled}
      className={cn(
        "inline-flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    >
      {isStreaming ? (
        <Square className="size-3.5 fill-current" />
      ) : (
        <ArrowUp className="size-4" />
      )}
    </button>
  )
})
PromptInputSubmit.displayName = "PromptInputSubmit"

export {
  PromptInput,
  PromptInputButton,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
}
