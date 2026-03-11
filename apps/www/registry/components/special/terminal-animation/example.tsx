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
} from "./component"

export default function TerminalAnimationExample() {
  return (
    <div className="flex items-center justify-center p-4 w-full">
      <TerminalAnimationRoot tabs={defaultTerminalTabs} alwaysDark className="w-full max-w-2xl relative">
        <TerminalAnimationWindow className="bg-neutral-950 border border-neutral-800">
          {/* Tab bar */}
          <div className="flex items-center gap-2 px-4 pt-4 pb-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <TerminalAnimationTabList className="flex gap-1 ml-4">
              {defaultTerminalTabs.map((tab, i) => (
                <TerminalAnimationTabTrigger
                  key={tab.label}
                  index={i}
                  className="px-3 py-1 text-xs rounded-md transition-colors data-[state=active]:bg-neutral-800 data-[state=active]:text-white text-neutral-500 hover:text-neutral-300"
                >
                  {tab.label}
                </TerminalAnimationTabTrigger>
              ))}
            </TerminalAnimationTabList>
          </div>

          <TerminalAnimationContent className="font-mono text-sm">
            {/* Command line */}
            <div className="flex items-center gap-2 text-neutral-300">
              <span className="text-green-400">~</span>
              <span className="text-neutral-600">$</span>
              <TerminalAnimationCommandBar className="text-neutral-100" />
            </div>

            {/* Output */}
            <TerminalAnimationOutput className="mt-1 space-y-0.5 text-[13px] leading-5" />
          </TerminalAnimationContent>
        </TerminalAnimationWindow>
      </TerminalAnimationRoot>
    </div>
  )
}
