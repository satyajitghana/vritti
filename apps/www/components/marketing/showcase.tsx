import Link from 'next/link';
import { ArrowRight, Layers, Zap, Type, MousePointer, Layout, Sparkles, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CATEGORIES } from '@/registry/schema';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Layers,
  Zap,
  Type,
  MousePointer,
  Layout,
  Sparkles,
  Star,
};

export function Showcase() {
  return (
    <div className="col-span-full">
      <h2 className="text-3xl font-medium tracking-tight text-center mb-2 lg:text-4xl">
        Explore <span className="text-brand">Components</span>
      </h2>
      <p className="text-center text-muted-foreground mb-8">
        Organized into {CATEGORIES.length} categories for every use case
      </p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((category, i) => {
          const Icon = iconMap[category.icon] || Layers;
          return (
            <Link
              key={category.name}
              href="/docs/components"
              className={cn(
                'group rounded-2xl p-6 transition-all hover:shadow-md',
                i % 2 === 0
                  ? 'border bg-card shadow-sm'
                  : 'border border-brand/20 bg-brand/5'
              )}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center size-9 rounded-lg bg-brand/10 text-brand">
                  <Icon className="size-4.5" />
                </div>
                <h3 className="text-base font-medium tracking-tight group-hover:text-brand transition-colors">
                  {category.label}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {category.description}
              </p>
              <span className="inline-flex items-center text-sm font-medium text-brand">
                View Components
                <ArrowRight className="ml-1.5 size-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
