import type { Metadata } from "next"
import { componentList } from "@/registry/component-list"
import { ComponentIndexGrid } from "@/components/component-index-grid"

export const metadata: Metadata = {
  title: "Components",
  description: "Browse all 427+ Vritti UI components with live previews.",
}

const CATEGORIES = [
  "animations",
  "backgrounds",
  "text",
  "buttons",
  "cards",
  "layouts",
  "navigation",
  "carousels",
  "cursors",
  "inputs",
  "media",
  "special",
]

export default function ComponentsIndexPage() {
  return (
    <div className="flex-1 min-w-0">
      <h1 className="text-3xl font-semibold tracking-tight">Components</h1>
      <p className="text-lg text-muted-foreground mt-2 mb-6">
        Browse all {componentList.length}+ components with live previews. Click any component to
        view documentation and installation instructions.
      </p>
      <div className="border-b mb-6" />
      <ComponentIndexGrid components={componentList} categories={CATEGORIES} />
    </div>
  )
}
