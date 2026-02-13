'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { CATEGORIES } from '@/registry/schema';

const docsNav = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Introduction', href: '/docs/getting-started/introduction' },
      { title: 'Installation', href: '/docs/getting-started/installation' },
    ],
  },
  {
    title: 'Components',
    items: CATEGORIES.map((category) => ({
      title: category.label,
      href: `/docs/components#${category.name}`,
    })),
  },
];

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
      <div className="py-6 pr-6 lg:py-8">
        <div className="w-full">
          {docsNav.map((section, i) => (
            <div key={i} className="pb-4">
              <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
                {section.title}
              </h4>
              {section.items.map((item, j) => (
                <Link
                  key={j}
                  href={item.href}
                  className={cn(
                    'group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-sm hover:underline',
                    pathname === item.href
                      ? 'font-medium text-foreground'
                      : 'text-muted-foreground'
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
