'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { CATEGORIES } from '@/registry/schema';
import { componentList } from '@/registry/component-list';
import {
  ChevronDown,
  BookOpen,
  Download,
} from 'lucide-react';
import { useState } from 'react';

interface NavSection {
  title: string;
  items: {
    title: string;
    href: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
}

const docsNav: NavSection[] = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Introduction', href: '/docs/getting-started/introduction', icon: BookOpen },
      { title: 'Installation', href: '/docs/getting-started/installation', icon: Download },
    ],
  },
  ...CATEGORIES.map((category) => ({
    title: category.label,
    items: componentList
      .filter((c) => c.category === category.name)
      .map((c) => ({
        title: c.title,
        href: `/docs/components/${c.name}`,
      })),
  })).filter((section) => section.items.length > 0),
];

function CollapsibleSection({
  section,
  pathname,
  defaultOpen = true,
}: {
  section: NavSection;
  pathname: string;
  defaultOpen?: boolean;
}) {
  const hasActiveItem = section.items.some(
    (item) => pathname === item.href || pathname.startsWith(item.href + '/')
  );
  const [isOpen, setIsOpen] = useState(defaultOpen || hasActiveItem);

  return (
    <div className="pb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm font-semibold hover:bg-accent/50 transition-colors"
      >
        {section.title}
        <ChevronDown
          className={cn(
            'size-4 text-muted-foreground transition-transform duration-200',
            !isOpen && '-rotate-90'
          )}
        />
      </button>
      {isOpen && (
        <div className="mt-1 space-y-0.5">
          {section.items.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'group flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors',
                  isActive
                    ? 'bg-brand/10 text-brand font-medium border-l-2 border-brand ml-0.5'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                )}
              >
                {Icon && (
                  <Icon
                    className={cn(
                      'size-4 shrink-0',
                      isActive ? 'text-brand' : 'text-muted-foreground group-hover:text-foreground'
                    )}
                  />
                )}
                {item.title}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
      <div className="py-6 pr-6 lg:py-8">
        <div className="w-full">
          {docsNav.map((section, i) => (
            <CollapsibleSection
              key={section.title}
              section={section}
              pathname={pathname}
              defaultOpen={i === 0}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}
