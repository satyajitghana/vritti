import { getPage, generateParams } from '@/lib/source';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function Page(props: PageProps) {
  const params = await props.params;

  // Handle root /docs route - show index page
  const slug = !params.slug || params.slug.length === 0 ? ['index'] : params.slug;
  const page = getPage(slug);

  if (!page) {
    notFound();
  }

  // Get the MDX content component
  // @ts-ignore - accessing body from page
  const Content = page.body;

  return (
    <div className="space-y-2">
      {params.slug && params.slug.length > 0 && (
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
          <Link href="/docs" className="hover:text-foreground transition-colors">
            Docs
          </Link>
          {params.slug.map((segment, i) => (
            <span key={i} className="flex items-center gap-1">
              <span className="mx-1">/</span>
              <span className={i === params.slug!.length - 1 ? 'text-foreground font-medium' : ''}>
                {segment.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </span>
            </span>
          ))}
        </div>
      )}

      <article className="prose prose-slate dark:prose-invert max-w-none">
        {/* @ts-ignore */}
        <h1>{page.title}</h1>
        {/* @ts-ignore */}
        {page.description && (
          <p className="text-xl text-muted-foreground">{page.description}</p>
        )}
        <Content />
      </article>
    </div>
  );
}

export async function generateStaticParams() {
  return generateParams();
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const page = getPage(params.slug);

  if (!page) {
    return {};
  }

  return {
    // @ts-ignore - accessing title and description from page
    title: page.title,
    // @ts-ignore
    description: page.description,
  };
}
