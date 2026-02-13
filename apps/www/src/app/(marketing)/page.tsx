import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 md:p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Build Beautiful React Apps
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Faster
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Copy and paste 184+ stunning React components built with Next.js 16, Tailwind CSS v4, and Motion
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button asChild size="lg" className="text-base">
            <Link href="/docs">Browse Components</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-base">
            <Link href={siteConfig.links.github} target="_blank">
              View on GitHub
            </Link>
          </Button>
        </div>

        <div className="pt-8 space-y-2">
          <p className="text-sm text-muted-foreground">Built with</p>
          <div className="flex flex-wrap gap-4 justify-center text-sm font-medium">
            <span className="px-3 py-1 rounded-full bg-secondary">Next.js 16</span>
            <span className="px-3 py-1 rounded-full bg-secondary">React 19</span>
            <span className="px-3 py-1 rounded-full bg-secondary">Tailwind CSS v4</span>
            <span className="px-3 py-1 rounded-full bg-secondary">Motion</span>
          </div>
        </div>
      </div>
    </main>
  );
}
