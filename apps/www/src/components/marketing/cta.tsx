import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function CTA() {
  return (
    <section className="py-20 md:py-32">
      <div className="container">
        <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-blue-600 to-purple-600 p-12 md:p-20">
          {/* Decorative gradient overlay */}
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />

          <div className="relative mx-auto max-w-3xl text-center space-y-8 text-white">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Ready to build something amazing?
            </h2>
            <p className="text-lg text-blue-100 sm:text-xl">
              Join developers who are building beautiful React applications with Vritti UI.
              Get started in minutes with our comprehensive documentation.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="group text-base bg-white text-blue-600 hover:bg-white/90"
              >
                <Link href="/docs">
                  Get Started Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-base border-white/20 bg-white/10 text-white hover:bg-white/20"
              >
                <Link href="/docs/components">
                  View All Components
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
