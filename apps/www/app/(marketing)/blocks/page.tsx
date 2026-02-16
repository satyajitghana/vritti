"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { blockList } from "@/registry/block-list"
import { BLOCK_CATEGORIES } from "@/registry/schema"

function BlockCard({
  name,
  title,
  category,
}: {
  name: string
  title: string
  category: string
}) {
  return (
    <Link
      href={`/docs/blocks/${name}`}
      className="group relative flex flex-col overflow-hidden rounded-lg border bg-background transition-all hover:shadow-lg hover:border-foreground/20"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <iframe
          src={`/preview/${name}-demo`}
          className="pointer-events-none absolute left-0 top-0 h-[400%] w-[400%] origin-top-left scale-25 border-0"
          tabIndex={-1}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-transparent group-hover:bg-foreground/5 transition-colors" />
      </div>
      <div className="flex items-center justify-between p-3">
        <span className="text-sm font-medium truncate">{title}</span>
        <span className="text-xs text-muted-foreground bg-muted rounded-full px-2 py-0.5 shrink-0 ml-2">
          {category}
        </span>
      </div>
    </Link>
  )
}

export default function BlocksPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all")

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: blockList.length }
    for (const block of blockList) {
      counts[block.category] = (counts[block.category] || 0) + 1
    }
    return counts
  }, [])

  const filteredBlocks = useMemo(
    () =>
      activeCategory === "all"
        ? blockList
        : blockList.filter((b) => b.category === activeCategory),
    [activeCategory]
  )

  return (
    <div className="mx-auto w-full max-w-[1400px] px-6 py-12 md:px-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Blocks
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {blockList.length} ready-to-use page sections. Copy, paste, and customize.
        </p>
      </div>

      {/* Category filter tabs */}
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory("all")}
          className={cn(
            "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
            activeCategory === "all"
              ? "bg-foreground text-background"
              : "bg-muted text-muted-foreground hover:text-foreground"
          )}
        >
          All ({categoryCounts.all})
        </button>
        {BLOCK_CATEGORIES.map((cat) => {
          const count = categoryCounts[cat.name] || 0
          if (count === 0) return null
          return (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                activeCategory === cat.name
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              {cat.label} ({count})
            </button>
          )
        })}
      </div>

      {/* Block grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredBlocks.map((block) => (
          <BlockCard
            key={block.name}
            name={block.name}
            title={block.title}
            category={block.category}
          />
        ))}
      </div>
    </div>
  )
}
