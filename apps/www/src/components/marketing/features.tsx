import { Zap, Code2, Palette, Sparkles, Lock, Rocket } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Built with Next.js 16 and React 19 for maximum performance. Optimized for production with server components.',
  },
  {
    icon: Code2,
    title: 'Copy & Paste',
    description: 'No npm packages to install. Simply copy the component code and paste it into your project. Full ownership.',
  },
  {
    icon: Palette,
    title: 'Beautifully Designed',
    description: 'Every component is crafted with attention to detail. Supports light and dark modes out of the box.',
  },
  {
    icon: Sparkles,
    title: 'Motion Powered',
    description: 'Smooth animations and transitions using Motion. Engaging micro-interactions that delight users.',
  },
  {
    icon: Lock,
    title: 'Type Safe',
    description: 'Written in TypeScript with full type definitions. Catch errors early and ship with confidence.',
  },
  {
    icon: Rocket,
    title: 'Production Ready',
    description: 'Battle-tested components used in production. Accessible, responsive, and optimized for all devices.',
  },
];

export function Features() {
  return (
    <section className="py-20 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Everything you need to build faster
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A complete component library designed for modern React applications
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative overflow-hidden rounded-lg border bg-background p-6 transition-all hover:shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 transition-opacity group-hover:opacity-100 dark:from-blue-950/20 dark:to-purple-950/20" />
                <div className="relative space-y-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
