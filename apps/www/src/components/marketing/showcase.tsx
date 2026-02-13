import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '@/registry/schema';

export function Showcase() {
  // Get first 3 categories with their component counts
  const featuredCategories = CATEGORIES.slice(0, 3);

  return (
    <section className="py-20 md:py-32 bg-muted/50">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Explore our component categories
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From buttons to complex layouts, find exactly what you need
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {featuredCategories.map((category) => (
            <Link
              key={category.name}
              href={`/docs/components#${category.name}`}
              className="group relative overflow-hidden rounded-lg border bg-background p-8 transition-all hover:shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 transition-opacity group-hover:opacity-100 dark:from-blue-950/20 dark:to-purple-950/20" />
              <div className="relative space-y-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold group-hover:text-primary transition-colors">
                    {category.label}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.description || `Explore ${category.label.toLowerCase()} components`}
                  </p>
                </div>
                <div className="flex items-center text-sm font-medium text-primary">
                  View Components
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg" variant="outline">
            <Link href="/docs/components">
              Browse All {CATEGORIES.length} Categories
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
