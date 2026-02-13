"use client"

import * as React from "react"
import { CheckIcon, ClipboardIcon } from "lucide-react"

import { SiNpm, SiPnpm, SiYarn, SiBun } from "react-icons/si"

import { useConfig, type PackageManager } from "@/hooks/use-config"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

const PM_META: Record<PackageManager, { icon: React.ComponentType<{ className?: string }>; label: string }> = {
  pnpm: { icon: SiPnpm, label: "pnpm" },
  npm: { icon: SiNpm, label: "npm" },
  yarn: { icon: SiYarn, label: "yarn" },
  bun: { icon: SiBun, label: "bun" },
}

export function CodeBlockCommand({
  __npm__,
  __yarn__,
  __pnpm__,
  __bun__,
}: React.ComponentProps<"pre"> & {
  __npm__?: string
  __yarn__?: string
  __pnpm__?: string
  __bun__?: string
}) {
  const [config, setConfig] = useConfig()
  const [hasCopied, setHasCopied] = React.useState(false)

  React.useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => setHasCopied(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [hasCopied])

  const packageManager = config.packageManager || "pnpm"
  const tabs = React.useMemo(() => {
    return {
      pnpm: __pnpm__,
      npm: __npm__,
      yarn: __yarn__,
      bun: __bun__,
    }
  }, [__npm__, __pnpm__, __yarn__, __bun__])

  const copyCommand = React.useCallback(() => {
    const command = tabs[packageManager]
    if (!command) return
    navigator.clipboard.writeText(command)
    setHasCopied(true)
  }, [packageManager, tabs])

  return (
    <div className="relative overflow-x-auto">
      <Tabs
        value={packageManager}
        className="gap-0"
        onValueChange={(value) => {
          setConfig({
            ...config,
            packageManager: value as PackageManager,
          })
        }}
      >
        <div className="border-border/50 flex items-center gap-2 border-b px-3 py-1">
          <TabsList className="h-auto rounded-none bg-transparent p-0 gap-0">
            {(Object.keys(tabs) as PackageManager[]).map((key) => {
              const { icon: Icon, label } = PM_META[key]
              return (
                <TabsTrigger
                  key={key}
                  value={key}
                  className={cn(
                    "data-[state=active]:bg-accent data-[state=active]:border-input",
                    "h-7 gap-1.5 rounded-md border border-transparent px-2 pt-0.5 text-xs",
                    "data-[state=active]:shadow-none"
                  )}
                >
                  <Icon className="size-3.5" />
                  {label}
                </TabsTrigger>
              )
            })}
          </TabsList>
        </div>
        <div className="no-scrollbar overflow-x-auto">
          {(Object.entries(tabs) as [PackageManager, string | undefined][]).map(([key, value]) => (
            <TabsContent key={key} value={key} className="mt-0 px-4 py-3.5">
              <pre>
                <code
                  className="relative font-mono text-sm leading-none"
                  data-language="bash"
                >
                  {value}
                </code>
              </pre>
            </TabsContent>
          ))}
        </div>
      </Tabs>
      <Button
        data-slot="copy-button"
        size="icon"
        variant="ghost"
        className="absolute top-1.5 right-2 z-10 size-7 opacity-70 hover:opacity-100 focus-visible:opacity-100"
        onClick={copyCommand}
      >
        <span className="sr-only">Copy</span>
        {hasCopied ? <CheckIcon className="size-3.5" /> : <ClipboardIcon className="size-3.5" />}
      </Button>
    </div>
  )
}
