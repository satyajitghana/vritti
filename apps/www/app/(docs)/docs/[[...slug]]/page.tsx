import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, ExternalLink, ArrowLeft, ArrowRight } from 'lucide-react'
import { findNeighbour } from 'fumadocs-core/page-tree'
import { getBreadcrumbItems, type BreadcrumbItem } from 'fumadocs-core/breadcrumb'

import { source } from '@/lib/source'
import { siteConfig } from '@/config/site'
import { TableOfContents } from '@/components/docs/table-of-contents'
import { useMDXComponents } from '@/mdx-components'

export const revalidate = false
export const dynamic = 'force-static'

interface PageProps {
  params: Promise<{ slug?: string[] }>
}

export function generateStaticParams() {
  return source.generateParams()
}

export default async function Page(props: PageProps) {
  const params = await props.params
  const slug = params.slug ?? []
  const page = source.getPage(slug)

  if (!page) {
    notFound()
  }

  const doc = page.data
  const MDX = doc.body
  const neighbours = findNeighbour(source.pageTree, page.url)
  const breadcrumbs = getBreadcrumbItems(page.url, source.pageTree, {
    includeRoot: { url: '/docs' },
    includePage: true,
  })
  const mdxComponents = useMDXComponents({})

  const resolveBreadcrumbName = (item: BreadcrumbItem): string => {
    if (typeof item.name === 'string') return item.name
    if (typeof item.name === 'number') return `${item.name}`
    return doc.title
  }

  // Deduplicate consecutive breadcrumb items with the same name (e.g., folder + index page)
  const dedupedBreadcrumbs = breadcrumbs.filter((item, i) => {
    if (i === 0) return true
    return resolveBreadcrumbName(item) !== resolveBreadcrumbName(breadcrumbs[i - 1])
  })

  return (
    <div className="flex gap-10">
      <div className="flex-1 min-w-0">
        {/* Breadcrumbs */}
        {dedupedBreadcrumbs.length > 1 && (
          <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
            {dedupedBreadcrumbs.map((item, i) => {
              const label = resolveBreadcrumbName(item)
              const isLast = i === dedupedBreadcrumbs.length - 1
              return (
                <span key={item.url ?? label} className="flex items-center gap-1">
                  {i > 0 && (
                    <ChevronRight className="size-3.5 text-muted-foreground/50" />
                  )}
                  {isLast ? (
                    <span className="text-foreground font-medium">{label}</span>
                  ) : item.url ? (
                    <Link
                      href={item.url}
                      className="hover:text-foreground transition-colors"
                    >
                      {label}
                    </Link>
                  ) : (
                    <span>{label}</span>
                  )}
                </span>
              )
            })}
          </nav>
        )}

        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1 className="text-3xl font-semibold tracking-tight">{doc.title}</h1>
          {doc.description && (
            <p className="text-lg text-muted-foreground mt-2 mb-6 not-prose">
              {doc.description}
            </p>
          )}
          <div className="border-b mb-6" />
          <MDX components={mdxComponents} />
        </article>

        {/* Previous/Next Navigation */}
        <div className="mt-12 border-t pt-6 flex items-center justify-between text-sm">
          {neighbours.previous ? (
            <Link
              href={neighbours.previous.url}
              className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="size-3.5" />
              {neighbours.previous.name}
            </Link>
          ) : (
            <div />
          )}
          {neighbours.next ? (
            <Link
              href={neighbours.next.url}
              className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
            >
              {neighbours.next.name}
              <ArrowRight className="size-3.5" />
            </Link>
          ) : (
            <div />
          )}
        </div>

        {/* Edit on GitHub */}
        <div className="mt-4 flex items-center text-sm text-muted-foreground">
          <Link
            href={`${siteConfig.links.github}/tree/master/apps/www/content/docs/${params.slug?.join('/') || 'index'}.mdx`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
          >
            Edit this page on GitHub
            <ExternalLink className="size-3.5" />
          </Link>
        </div>
      </div>

      {/* Table of Contents */}
      <TableOfContents />
    </div>
  )
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params
  const page = source.getPage(params.slug ?? [])

  if (!page) {
    return {}
  }

  const slug = params.slug ?? []
  const category =
    slug[0]
      ? slug[0].charAt(0).toUpperCase() + slug[0].slice(1)
      : 'Docs'
  const ogImageUrl = `${siteConfig.url}/api/og?title=${encodeURIComponent(page.data.title)}&description=${encodeURIComponent(page.data.description ?? '')}&category=${encodeURIComponent(category)}`

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      type: 'article',
      url: `${siteConfig.url}/docs/${slug.join('/')}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: page.data.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.data.title,
      description: page.data.description,
      images: [ogImageUrl],
    },
  }
}
