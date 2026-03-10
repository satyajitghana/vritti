"use client"

import { Suspense, useState, useMemo, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { componentList } from "@/registry/component-list"
import { CATEGORIES } from "@/registry/schema"

function ComponentCard({
  name,
  title,
  category,
  tags,
}: {
  name: string
  title: string
  category: string
  tags: string[]
}) {
  return (
    <Link
      href={`/docs/components/${name}`}
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
      <div className="flex flex-col gap-1 p-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium truncate">{title}</span>
          <span className="text-xs text-muted-foreground bg-muted rounded-full px-2 py-0.5 shrink-0 ml-2">
            {category}
          </span>
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] text-muted-foreground/70 bg-muted/50 rounded px-1.5 py-0.5"
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="text-[10px] text-muted-foreground/50">
                +{tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  )
}

function ComponentsPageInner() {
  const searchParams = useSearchParams()
  const tagParam = searchParams.get("tag")

  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [activeTag, setActiveTag] = useState<string | null>(tagParam)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    setActiveTag(tagParam)
    if (tagParam) {
      setActiveCategory("all")
    }
  }, [tagParam])

  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    for (const comp of componentList) {
      for (const tag of comp.tags) {
        tagSet.add(tag)
      }
    }
    return Array.from(tagSet).sort()
  }, [])

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: componentList.length }
    for (const comp of componentList) {
      counts[comp.category] = (counts[comp.category] || 0) + 1
    }
    return counts
  }, [])

  const filteredComponents = useMemo(() => {
    let result = componentList

    if (activeCategory !== "all") {
      result = result.filter((c) => c.category === activeCategory)
    }

    if (activeTag) {
      result = result.filter((c) => c.tags.includes(activeTag))
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (c) =>
          c.name.includes(q) ||
          c.title.toLowerCase().includes(q) ||
          c.tags.some((t) => t.includes(q))
      )
    }

    return result
  }, [activeCategory, activeTag, searchQuery])

  return (
    <div className="mx-auto w-full max-w-[1400px] px-6 py-12 md:px-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Components
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {componentList.length} beautifully crafted components. Browse, preview, and install.
        </p>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search components..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md rounded-lg border bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => {
            setActiveCategory("all")
            setActiveTag(null)
          }}
          className={cn(
            "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
            activeCategory === "all" && !activeTag
              ? "bg-foreground text-background"
              : "bg-muted text-muted-foreground hover:text-foreground"
          )}
        >
          All ({categoryCounts.all})
        </button>
        {CATEGORIES.map((cat) => {
          const count = categoryCounts[cat.name] || 0
          if (count === 0) return null
          return (
            <button
              key={cat.name}
              onClick={() => {
                setActiveCategory(cat.name)
                setActiveTag(null)
              }}
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

      {activeTag && (
        <div className="mb-6 flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Filtered by tag:</span>
          <span className="inline-flex items-center gap-1.5 rounded-full border bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            {activeTag}
            <button
              onClick={() => setActiveTag(null)}
              className="ml-1 hover:text-foreground"
            >
              &times;
            </button>
          </span>
        </div>
      )}

      {!activeTag && (
        <div className="mb-8 flex flex-wrap gap-1.5">
          {allTags.slice(0, 30).map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setActiveTag(tag)
                setActiveCategory("all")
              }}
              className="rounded-full border bg-muted/50 px-2.5 py-0.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      <p className="mb-4 text-sm text-muted-foreground">
        Showing {filteredComponents.length} component{filteredComponents.length !== 1 ? "s" : ""}
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredComponents.map((comp) => (
          <ComponentCard
            key={comp.name}
            name={comp.name}
            title={comp.title}
            category={comp.category}
            tags={comp.tags}
          />
        ))}
      </div>

      {filteredComponents.length === 0 && (
        <div className="py-16 text-center text-muted-foreground">
          No components found. Try a different search or filter.
        </div>
      )}
    </div>
  )
}

export default function ComponentsPage() {
  return (
    <Suspense fallback={
      <div className="mx-auto w-full max-w-[1400px] px-6 py-12 md:px-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Components</h1>
          <p className="mt-2 text-lg text-muted-foreground">Loading components...</p>
        </div>
      </div>
    }>
      <ComponentsPageInner />
    </Suspense>
  )
}
