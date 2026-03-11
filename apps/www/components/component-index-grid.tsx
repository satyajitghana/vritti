"use client"

import * as React from "react"
import Link from "next/link"
import { Search } from "lucide-react"
import { Index } from "@/registry/__index__"

interface ComponentItem {
  name: string
  title: string
  category: string
  tags: string[]
}

interface ComponentIndexGridProps {
  components: ComponentItem[]
  categories: string[]
}

function toTitleCase(str: string): string {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

function LazyPreview({ name }: { name: string }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = React.useState(false)
  const [hasError, setHasError] = React.useState(false)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: "200px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const demoName = `${name}-demo`
  const Component = isVisible ? Index[demoName]?.component ?? Index[name]?.component : null

  return (
    <div ref={ref} className="relative h-[200px] w-full overflow-hidden bg-background">
      {isVisible && Component && !hasError ? (
        <React.Suspense
          fallback={
            <div className="flex h-full items-center justify-center">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
            </div>
          }
        >
          <ErrorBoundary onError={() => setHasError(true)}>
            <div className="pointer-events-none flex h-[400px] w-[200%] origin-top-left scale-50 items-center justify-center p-8">
              <Component />
            </div>
          </ErrorBoundary>
        </React.Suspense>
      ) : (
        <div className="flex h-full items-center justify-center text-muted-foreground/40">
          <span className="text-sm">{toTitleCase(name)}</span>
        </div>
      )}
    </div>
  )
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode; onError: () => void },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; onError: () => void }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch() {
    this.props.onError()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-full items-center justify-center text-muted-foreground/40">
          <span className="text-sm">Preview unavailable</span>
        </div>
      )
    }
    return this.props.children
  }
}

export function ComponentIndexGrid({ components, categories }: ComponentIndexGridProps) {
  const [search, setSearch] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all")

  const filtered = React.useMemo(() => {
    const term = search.trim().toLowerCase()
    return components.filter((item) => {
      const categoryOk = selectedCategory === "all" || item.category === selectedCategory
      if (!term) return categoryOk
      return (
        categoryOk &&
        (item.name.toLowerCase().includes(term) ||
          item.title.toLowerCase().includes(term) ||
          item.tags.some((t) => t.toLowerCase().includes(term)))
      )
    })
  }, [components, selectedCategory, search])

  const grouped = React.useMemo(() => {
    const map = new Map<string, ComponentItem[]>()
    for (const item of filtered) {
      const list = map.get(item.category) || []
      list.push(item)
      map.set(item.category, list)
    }
    return map
  }, [filtered])

  return (
    <div>
      {/* Search and filter bar */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search components..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full rounded-md border bg-background pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              selectedCategory === "all"
                ? "bg-foreground text-background"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            All ({components.length})
          </button>
          {categories.map((cat) => {
            const count = components.filter((c) => c.category === cat).length
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  selectedCategory === cat
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {toTitleCase(cat)} ({count})
              </button>
            )
          })}
        </div>
      </div>

      {/* Results count */}
      <p className="mb-6 text-sm text-muted-foreground">
        {filtered.length} component{filtered.length !== 1 ? "s" : ""}
        {search && ` matching "${search}"`}
      </p>

      {/* Component grid grouped by category */}
      {selectedCategory === "all" ? (
        Array.from(grouped.entries()).map(([category, items]) => (
          <div key={category} className="mb-10">
            <h2 className="mb-4 text-xl font-semibold tracking-tight">
              {toTitleCase(category)}{" "}
              <span className="text-muted-foreground font-normal">({items.length})</span>
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <ComponentCard key={item.name} item={item} />
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <ComponentCard key={item.name} item={item} />
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-lg font-medium">No components found</p>
          <p className="text-sm text-muted-foreground mt-1">
            Try a different search term or category.
          </p>
        </div>
      )}
    </div>
  )
}

function ComponentCard({ item }: { item: ComponentItem }) {
  return (
    <Link
      href={`/docs/components/${item.name}`}
      className="group relative flex flex-col overflow-hidden rounded-lg border bg-card transition-all hover:shadow-md hover:border-foreground/20"
    >
      <div className="border-b">
        <LazyPreview name={item.name} />
      </div>
      <div className="flex items-center justify-between p-3">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-medium group-hover:text-foreground">
            {item.title}
          </h3>
        </div>
        <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
          {toTitleCase(item.category)}
        </span>
      </div>
    </Link>
  )
}
