import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ArrowRight, Heart } from 'lucide-react';

export function CTA() {
  return (
    <div className="col-span-full mt-4">
      <div className="rounded-2xl border bg-card p-8 md:p-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand/5 via-transparent to-brand-secondary/5" />
        <div className="relative">
          <Heart className="mx-auto mb-4 size-8 text-brand" fill="currentColor" />
          <h2 className="text-3xl font-medium tracking-tight mb-4 lg:text-4xl">
            Start Building with <span className="text-brand">Vritti UI</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-8">
            184+ beautifully designed, open-source components ready for your next project.
            Copy, paste, and customize.
          </p>
          <div className="flex flex-row items-center justify-center gap-4 flex-wrap">
            <Link
              href="/docs"
              className={cn(
                'inline-flex justify-center items-center gap-2 px-6 py-3 rounded-full font-medium tracking-tight transition-colors',
                'bg-brand text-brand-foreground hover:bg-brand/90'
              )}
            >
              Read the Docs
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="https://github.com/satyajitghana/vritti"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'inline-flex justify-center items-center gap-2 px-6 py-3 rounded-full font-medium tracking-tight transition-colors',
                'border bg-secondary text-secondary-foreground hover:bg-accent'
              )}
            >
              Star on GitHub
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
