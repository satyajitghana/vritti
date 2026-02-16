"use client"

import { useState, useMemo, useCallback } from "react"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

const FONT_CATEGORIES = [
  "All",
  "Sans Serif",
  "Serif",
  "Monospace",
  "Display",
  "Handwriting",
] as const

type FontCategory = (typeof FONT_CATEGORIES)[number]

interface FontOption {
  family: string
  category: FontCategory
}

// Popular Google Fonts organized by category
const POPULAR_FONTS: FontOption[] = [
  // Project fonts first
  { family: "Geist Sans", category: "Sans Serif" },
  { family: "Geist Mono", category: "Monospace" },
  // Sans Serif
  { family: "Inter", category: "Sans Serif" },
  { family: "Roboto", category: "Sans Serif" },
  { family: "Open Sans", category: "Sans Serif" },
  { family: "Lato", category: "Sans Serif" },
  { family: "Poppins", category: "Sans Serif" },
  { family: "Nunito", category: "Sans Serif" },
  { family: "Montserrat", category: "Sans Serif" },
  { family: "Raleway", category: "Sans Serif" },
  { family: "Work Sans", category: "Sans Serif" },
  { family: "DM Sans", category: "Sans Serif" },
  { family: "Plus Jakarta Sans", category: "Sans Serif" },
  { family: "Outfit", category: "Sans Serif" },
  { family: "Manrope", category: "Sans Serif" },
  { family: "Space Grotesk", category: "Sans Serif" },
  // Serif
  { family: "Playfair Display", category: "Serif" },
  { family: "Merriweather", category: "Serif" },
  { family: "Lora", category: "Serif" },
  { family: "Georgia", category: "Serif" },
  { family: "Crimson Pro", category: "Serif" },
  { family: "Source Serif 4", category: "Serif" },
  { family: "Libre Baskerville", category: "Serif" },
  { family: "Fraunces", category: "Serif" },
  // Monospace
  { family: "JetBrains Mono", category: "Monospace" },
  { family: "Fira Code", category: "Monospace" },
  { family: "Source Code Pro", category: "Monospace" },
  { family: "IBM Plex Mono", category: "Monospace" },
  { family: "Cascadia Code", category: "Monospace" },
  { family: "Space Mono", category: "Monospace" },
  // Display
  { family: "Syne", category: "Display" },
  { family: "Bebas Neue", category: "Display" },
  { family: "Righteous", category: "Display" },
  { family: "Abril Fatface", category: "Display" },
  { family: "Oswald", category: "Display" },
  { family: "Anton", category: "Display" },
  // Handwriting
  { family: "Caveat", category: "Handwriting" },
  { family: "Dancing Script", category: "Handwriting" },
  { family: "Pacifico", category: "Handwriting" },
  { family: "Permanent Marker", category: "Handwriting" },
]

interface FontPickerProps {
  value: string
  onChange: (font: string) => void
  label: string
  className?: string
}

export function FontPicker({ value, onChange, label, className }: FontPickerProps) {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState<FontCategory>("All")
  const [isOpen, setIsOpen] = useState(false)

  const filteredFonts = useMemo(() => {
    return POPULAR_FONTS.filter((font) => {
      const matchesSearch = font.family.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = category === "All" || font.category === category
      return matchesSearch && matchesCategory
    })
  }, [search, category])

  const loadFont = useCallback((family: string) => {
    if (family.startsWith("Geist")) return // Already loaded
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@400;500;600;700&display=swap`
    document.head.appendChild(link)
  }, [])

  return (
    <div className={cn("space-y-2", className)}>
      <label className="text-xs font-medium">{label}</label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-md border px-3 py-2 text-sm"
      >
        <span style={{ fontFamily: value }}>{value || "Select font..."}</span>
        <span className="text-muted-foreground text-xs">Change</span>
      </button>

      {isOpen && (
        <div className="rounded-lg border bg-background p-3 space-y-3 shadow-lg">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" />
            <Input
              placeholder="Search fonts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-8 pl-8 text-xs"
            />
          </div>

          <div className="flex flex-wrap gap-1">
            {FONT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  "rounded-full px-2 py-0.5 text-xs transition-colors",
                  category === cat
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="max-h-[200px] space-y-0.5 overflow-y-auto">
            {filteredFonts.map((font) => (
              <button
                key={font.family}
                onClick={() => {
                  loadFont(font.family)
                  onChange(font.family)
                  setIsOpen(false)
                }}
                onMouseEnter={() => loadFont(font.family)}
                className={cn(
                  "flex w-full items-center justify-between rounded px-2 py-1.5 text-sm transition-colors",
                  value === font.family
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted"
                )}
                style={{ fontFamily: font.family }}
              >
                <span>{font.family}</span>
                <span className="text-xs text-muted-foreground">{font.category}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
