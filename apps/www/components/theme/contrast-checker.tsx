"use client"

import { useMemo, useState } from "react"
import { cn } from "@/lib/utils"
import { CheckCircle2, XCircle } from "lucide-react"

interface ContrastPair {
  label: string
  fgKey: string
  bgKey: string
}

const CONTRAST_PAIRS: ContrastPair[] = [
  { label: "Text on Background", fgKey: "foreground", bgKey: "background" },
  { label: "Primary on Primary BG", fgKey: "primary-foreground", bgKey: "primary" },
  { label: "Secondary Text", fgKey: "secondary-foreground", bgKey: "secondary" },
  { label: "Muted Text", fgKey: "muted-foreground", bgKey: "muted" },
  { label: "Accent Text", fgKey: "accent-foreground", bgKey: "accent" },
  { label: "Card Text", fgKey: "card-foreground", bgKey: "card" },
  { label: "Popover Text", fgKey: "popover-foreground", bgKey: "popover" },
  { label: "Destructive Text", fgKey: "destructive-foreground", bgKey: "destructive" },
  { label: "Muted on Background", fgKey: "muted-foreground", bgKey: "background" },
  { label: "Sidebar Text", fgKey: "sidebar-foreground", bgKey: "sidebar" },
  { label: "Sidebar Primary", fgKey: "sidebar-primary-foreground", bgKey: "sidebar-primary" },
  { label: "Sidebar Accent", fgKey: "sidebar-accent-foreground", bgKey: "sidebar-accent" },
  { label: "Border on Background", fgKey: "border", bgKey: "background" },
]

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return null
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  }
}

function luminance(hex: string): number {
  const rgb = hexToRgb(hex)
  if (!rgb) return 0
  const [rs, gs, bs] = [rgb.r / 255, rgb.g / 255, rgb.b / 255].map((c) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  )
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

function contrastRatio(hex1: string, hex2: string): number {
  const l1 = luminance(hex1)
  const l2 = luminance(hex2)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

function getWCAGLevel(ratio: number): { level: string; pass: boolean } {
  if (ratio >= 7) return { level: "AAA", pass: true }
  if (ratio >= 4.5) return { level: "AA", pass: true }
  if (ratio >= 3) return { level: "AA Large", pass: true }
  return { level: "Fail", pass: false }
}

interface ContrastCheckerProps {
  colors: Record<string, string>
  className?: string
}

export function ContrastChecker({ colors, className }: ContrastCheckerProps) {
  const [filter, setFilter] = useState<"all" | "issues">("all")

  const results = useMemo(() => {
    return CONTRAST_PAIRS.map((pair) => {
      const fg = colors[pair.fgKey] || "#000000"
      const bg = colors[pair.bgKey] || "#ffffff"
      const ratio = contrastRatio(fg, bg)
      const wcag = getWCAGLevel(ratio)
      return { ...pair, fg, bg, ratio, ...wcag }
    })
  }, [colors])

  const filteredResults = useMemo(
    () => (filter === "issues" ? results.filter((r) => !r.pass) : results),
    [results, filter]
  )

  const issueCount = results.filter((r) => !r.pass).length

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold">Contrast Checker</h4>
        <div className="flex gap-1">
          <button
            onClick={() => setFilter("all")}
            className={cn(
              "rounded-full px-2 py-0.5 text-xs",
              filter === "all" ? "bg-foreground text-background" : "bg-muted text-muted-foreground"
            )}
          >
            All ({results.length})
          </button>
          <button
            onClick={() => setFilter("issues")}
            className={cn(
              "rounded-full px-2 py-0.5 text-xs",
              filter === "issues" ? "bg-destructive text-destructive-foreground" : "bg-muted text-muted-foreground"
            )}
          >
            Issues ({issueCount})
          </button>
        </div>
      </div>

      <div className="space-y-1.5 max-h-[300px] overflow-y-auto">
        {filteredResults.map((result) => (
          <div
            key={result.label}
            className="flex items-center gap-2 rounded-md border p-2"
          >
            <div className="flex gap-1">
              <div
                className="size-6 rounded border"
                style={{ backgroundColor: result.bg }}
                title={`BG: ${result.bg}`}
              />
              <div
                className="size-6 rounded border"
                style={{ backgroundColor: result.fg }}
                title={`FG: ${result.fg}`}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate">{result.label}</p>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-xs font-mono tabular-nums">{result.ratio.toFixed(1)}:1</span>
              {result.pass ? (
                <span className="flex items-center gap-0.5 text-xs text-emerald-600">
                  <CheckCircle2 className="size-3" />
                  {result.level}
                </span>
              ) : (
                <span className="flex items-center gap-0.5 text-xs text-red-500">
                  <XCircle className="size-3" />
                  {result.level}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
