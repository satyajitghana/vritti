"use client"

import { useState } from "react"
import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CSSImportDialogProps {
  onImport: (colors: { light: Record<string, string>; dark: Record<string, string> }) => void
  className?: string
}

function parseHslToHex(hsl: string): string {
  // Parse "H S% L%" format
  const parts = hsl.trim().split(/\s+/)
  if (parts.length < 3) return "#000000"
  const h = parseFloat(parts[0]) / 360
  const s = parseFloat(parts[1]) / 100
  const l = parseFloat(parts[2]) / 100

  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1
    if (t > 1) t -= 1
    if (t < 1 / 6) return p + (q - p) * 6 * t
    if (t < 1 / 2) return q
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
    return p
  }

  let r: number, g: number, b: number
  if (s === 0) {
    r = g = b = l
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }

  const toHex = (c: number) =>
    Math.round(c * 255)
      .toString(16)
      .padStart(2, "0")
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

function parseCSS(css: string): { light: Record<string, string>; dark: Record<string, string> } {
  const light: Record<string, string> = {}
  const dark: Record<string, string> = {}

  // Match :root { ... } and .dark { ... }
  const rootMatch = css.match(/:root\s*\{([\s\S]+?)\}/)
  const darkMatch = css.match(/\.dark\s*\{([\s\S]+?)\}/)

  const parseBlock = (block: string, target: Record<string, string>) => {
    const varRegex = /--([a-z-]+):\s*([^;]+);/g
    let match
    while ((match = varRegex.exec(block)) !== null) {
      const [, name, value] = match
      const trimmed = value.trim()

      // Skip radius and non-color vars
      if (name === "radius") continue

      // Check if it's already a hex color
      if (trimmed.startsWith("#")) {
        target[name] = trimmed
        continue
      }

      // HSL format: "H S% L%"
      if (/^\d+\s+\d+%\s+\d+%$/.test(trimmed)) {
        target[name] = parseHslToHex(trimmed)
        continue
      }

      // oklch or other formats — store as-is for now
      target[name] = trimmed
    }
  }

  if (rootMatch) parseBlock(rootMatch[1], light)
  if (darkMatch) parseBlock(darkMatch[1], dark)

  return { light, dark }
}

export function CSSImportDialog({ onImport, className }: CSSImportDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [css, setCss] = useState("")
  const [error, setError] = useState("")

  const handleImport = () => {
    try {
      const result = parseCSS(css)
      if (Object.keys(result.light).length === 0 && Object.keys(result.dark).length === 0) {
        setError("No CSS variables found. Make sure your CSS uses :root { } and/or .dark { } blocks.")
        return
      }
      onImport(result)
      setIsOpen(false)
      setCss("")
      setError("")
    } catch {
      setError("Failed to parse CSS. Check the format.")
    }
  }

  if (!isOpen) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className={className}
      >
        <Upload className="mr-1.5 size-3.5" />
        Import CSS
      </Button>
    )
  }

  return (
    <div className="rounded-lg border bg-background p-4 space-y-3 shadow-lg">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold">Import CSS Variables</h4>
        <button onClick={() => setIsOpen(false)} className="text-xs text-muted-foreground hover:text-foreground">
          Close
        </button>
      </div>
      <p className="text-xs text-muted-foreground">
        Paste your CSS with :root and .dark blocks containing color variables.
      </p>
      <textarea
        value={css}
        onChange={(e) => {
          setCss(e.target.value)
          setError("")
        }}
        placeholder={`:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  ...
}

.dark {
  --background: 0 0% 3.9%;
  ...
}`}
        className="w-full h-40 rounded-md border bg-muted/30 p-3 text-xs font-mono resize-none focus:outline-none focus:ring-1 focus:ring-ring"
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
      <div className="flex justify-end gap-2">
        <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
        <Button size="sm" onClick={handleImport}>
          Import
        </Button>
      </div>
    </div>
  )
}
