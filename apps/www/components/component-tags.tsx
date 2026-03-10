import Link from "next/link"

interface ComponentTagsProps {
  tags: string[]
}

export function ComponentTags({ tags }: ComponentTagsProps) {
  if (!tags || tags.length === 0) return null

  return (
    <div className="flex flex-wrap gap-1.5 not-first:mt-3 mb-4">
      {tags.map((tag) => (
        <Link
          key={tag}
          href={`/docs/components?tag=${encodeURIComponent(tag)}`}
          className="inline-flex items-center rounded-full border border-border bg-muted/50 px-2.5 py-0.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          {tag}
        </Link>
      ))}
    </div>
  )
}
