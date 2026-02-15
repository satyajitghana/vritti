"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type MessageContextValue = {
  from: "user" | "assistant"
}

const MessageContext = React.createContext<MessageContextValue>({
  from: "assistant",
})

interface MessageProps extends React.HTMLAttributes<HTMLDivElement> {
  from: "user" | "assistant"
}

const Message = React.forwardRef<HTMLDivElement, MessageProps>(
  ({ className, from, children, ...props }, ref) => (
    <MessageContext.Provider value={{ from }}>
      <div
        ref={ref}
        data-role={from}
        className={cn(
          "flex gap-3",
          from === "user" && "justify-end",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </MessageContext.Provider>
  )
)
Message.displayName = "Message"

const MessageContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { from } = React.useContext(MessageContext)
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-xl px-3 py-2 text-sm",
        from === "user"
          ? "bg-primary text-primary-foreground"
          : "text-foreground",
        className
      )}
      {...props}
    />
  )
})
MessageContent.displayName = "MessageContent"

function MessageResponse({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const content = typeof children === "string" ? formatMarkdown(children) : children

  return (
    <div
      className={cn("prose prose-sm dark:prose-invert max-w-none", className)}
      {...props}
    >
      {typeof content === "string" ? (
        <div dangerouslySetInnerHTML={{ __html: content }} />
      ) : (
        content
      )}
    </div>
  )
}
MessageResponse.displayName = "MessageResponse"

function formatMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/`(.*?)`/g, "<code>$1</code>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n- /g, "</p><ul><li>")
    .replace(/\n(\d+)\. /g, "</p><ol><li>")
    .replace(/<\/li>(?=<li>)/g, "</li>")
    .replace(/(<ul>(?:<li>.*?<\/li>)+)/g, "$1</ul>")
    .replace(/(<ol>(?:<li>.*?<\/li>)+)/g, "$1</ol>")
    .replace(/\n/g, "<br/>")
}

export { Message, MessageContent, MessageResponse }
