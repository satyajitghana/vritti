import { Code2, Copy, Moon, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: Layers,
    title: '184+ Components',
    description:
      'Animations, backgrounds, text effects, buttons, layouts, and more — all production-ready.',
  },
  {
    icon: Copy,
    title: 'Copy & Paste',
    description:
      'No npm install needed. Copy components directly into your project, shadcn/ui style.',
  },
  {
    icon: Moon,
    title: 'Dark Mode Ready',
    description:
      'Every component supports light and dark mode out of the box with smooth transitions.',
  },
  {
    icon: Code2,
    title: 'Fully Typed',
    description:
      'Built with TypeScript for complete type safety and excellent developer experience.',
  },
];

export function Features() {
  return (
    <>
      {features.map((feature) => (
        <div
          key={feature.title}
          className={cn(
            'rounded-2xl text-sm p-6 shadow-sm border bg-card',
            'flex flex-col gap-4 transition-shadow hover:shadow-md'
          )}
        >
          <div className="flex items-center justify-center size-10 rounded-lg bg-brand/10 text-brand">
            <feature.icon className="size-5" />
          </div>
          <h3 className="text-lg font-medium tracking-tight">{feature.title}</h3>
          <p className="text-muted-foreground">{feature.description}</p>
        </div>
      ))}
    </>
  );
}
