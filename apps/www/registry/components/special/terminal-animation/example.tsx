"use client"

import {
  TerminalAnimationRoot,
  TerminalAnimationWindow,
  TerminalAnimationContent,
  TerminalAnimationCommandBar,
  TerminalAnimationOutput,
  TerminalAnimationTabList,
  TerminalAnimationTabTrigger,
  TerminalAnimationBlinkingCursor,
  defaultTerminalTabs,
  type TerminalLine,
} from "@/registry/components/special/terminal-animation/component"

import { cn } from "@/lib/utils"

export default function TerminalAnimationExample() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <TerminalAnimationRoot
        tabs={defaultTerminalTabs}
        className="relative overflow-hidden rounded-xl"
      >
        {/* Tab bar */}
        <TerminalAnimationTabList className="flex gap-1 border-b border-border bg-muted/50 px-4 pt-3 pb-0">
          {defaultTerminalTabs.map((tab, i) => (
            <TerminalAnimationTabTrigger
              key={tab.label}
              index={i}
              className={cn(
                "rounded-t-lg px-3 py-1.5 text-xs font-medium transition-colors",
                "data-[state=active]:bg-card data-[state=active]:text-foreground",
                "data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:text-foreground"
              )}
            >
              {tab.label}
            </TerminalAnimationTabTrigger>
          ))}
        </TerminalAnimationTabList>

        {/* Terminal window */}
        <TerminalAnimationWindow
          minHeight="20rem"
          style={{ backgroundColor: "#0a0a0a" }}
          className="rounded-t-none"
        >
          <TerminalAnimationContent>
            {/* Command line */}
            <div className="flex items-center font-mono text-sm">
              <span className="mr-2 text-emerald-400">$</span>
              <TerminalAnimationCommandBar className="text-neutral-200" />
            </div>

            {/* Output */}
            <TerminalAnimationOutput
              className="mt-1 font-mono text-sm"
              renderLine={(line: TerminalLine, _index: number, visible: boolean) => {
                if (!visible) return null
                return (
                  <div className={cn(line.color, "leading-6")}>
                    {line.text || "\u00A0"}
                  </div>
                )
              }}
            />
          </TerminalAnimationContent>
        </TerminalAnimationWindow>
      </TerminalAnimationRoot>
    </div>
  )
}
