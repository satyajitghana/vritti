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

// Sub-groups to split large categories into logical sections
const SUB_GROUPS: Record<string, Record<string, string[]>> = {
  animations: {
    Cursors: [
      'blob-cursor', 'crosshair', 'ghost-cursor', 'splash-cursor',
      'target-cursor', 'smooth-cursor', 'pointer', 'pixel-trail',
      'image-trail', 'text-cursor',
    ],
    'Beams & Borders': [
      'animated-beam', 'border-beam', 'electric-border',
      'laser-flow', 'shine-border', 'star-border',
    ],
    'Visual Effects': [
      'distorted-glass', 'lightboard', 'morph-surface', 'shader-lens-blur',
    ],
  },
  backgrounds: {
    'Textures & Overlays': [
      'bg-image-texture', 'bg-media', 'texture-overlay', 'stripe-bg-guides',
    ],
    'Animated Backgrounds': [
      'bg-animated-fractal-dot-grid', 'bg-animated-gradient', 'canvas-fractal-grid',
    ],
  },
  buttons: {
    'Animated Buttons': [
      'bg-animate-button', 'glow-button', 'shimmer-button', 'shiny-button',
      'pulsating-button', 'rainbow-button',
    ],
    'Styled Buttons': [
      'family-button', 'neumorph-button', 'texture-button',
    ],
  },
  layouts: {
    Cards: [
      'decay-card', 'magic-card', 'neon-gradient-card', 'pixel-card',
      'profile-card', 'reflective-card', 'spotlight-card', 'tilted-card',
      'magic-bento', 'bento-grid', 'minimal-card', 'shift-card', 'texture-card',
    ],
    Navigation: [
      'bubble-menu', 'card-nav', 'dock', 'flowing-menu', 'gooey-nav',
      'infinite-menu', 'pill-nav', 'staggered-menu', 'direction-aware-tabs',
      'toolbar-expandable', 'side-panel', 'floating-panel',
    ],
    Galleries: [
      'carousel', 'chroma-grid', 'circular-gallery', 'dome-gallery',
      'masonry', 'flying-posters', 'bounce-cards', 'card-swap',
      'feature-carousel', 'logo-carousel',
      'three-d-carousel',
    ],
    'Expandable & Drawers': [
      'expandable', 'expandable-screen', 'family-drawer', 'dynamic-island',
      'deck',
    ],
    'Lists & Grids': [
      'sortable-list', 'tweet-grid',
    ],
  },
  text: {
    'Typewriter Effects': [
      'typewriter', 'type-animate', 'typing-animation', 'text-type',
    ],
    'Number Animations': [
      'animated-number', 'count-up', 'number-ticker',
    ],
    'Headings & Style': [
      'gradient-heading', 'neumorph-eyebrow', 'text-gif',
    ],
  },
  special: {
    'Device Mocks': ['android', 'iphone', 'safari', 'mock-browser-window'],
    'Interactive Widgets': [
      'timer', 'rating', 'theme-switcher', 'dropzone', 'image-zoom',
    ],
    'Data Display': [
      'avatar-stack', 'banner', 'contribution-graph',
      'relative-time', 'tree',
    ],
    'Media & Content': [
      'code-block', 'snippet', 'hover-video-player', 'youtube-video-player',
    ],
    'Cards & Popovers': [
      'comparison', 'popover-form', 'squiggle-arrow', 'cursor',
    ],
  },
};

function buildNavSections(): NavSection[] {
  const sections: NavSection[] = [
    {
      title: 'Getting Started',
      items: [
        { title: 'Introduction', href: '/docs/getting-started/introduction', icon: BookOpen },
        { title: 'Installation', href: '/docs/getting-started/installation', icon: Download },
      ],
    },
  ];

  for (const category of CATEGORIES) {
    const categoryComponents = componentList.filter((c) => c.category === category.name);
    if (categoryComponents.length === 0) continue;

    const subGroups = SUB_GROUPS[category.name];
    if (!subGroups) {
      // No sub-groups: add category as a single section
      sections.push({
        title: category.label,
        items: categoryComponents.map((c) => ({
          title: c.title,
          href: `/docs/components/${c.name}`,
        })),
      });
      continue;
    }

    // Collect all sub-grouped component names
    const subGroupedNames = new Set(Object.values(subGroups).flat());

    // Remaining components not in any sub-group
    const remaining = categoryComponents.filter((c) => !subGroupedNames.has(c.name));

    // Add the main category section (remaining items)
    if (remaining.length > 0) {
      sections.push({
        title: category.label,
        items: remaining.map((c) => ({
          title: c.title,
          href: `/docs/components/${c.name}`,
        })),
      });
    }

    // Add sub-group sections
    for (const [groupLabel, names] of Object.entries(subGroups)) {
      const items = names
        .map((name) => categoryComponents.find((c) => c.name === name))
        .filter(Boolean)
        .map((c) => ({
          title: c!.title,
          href: `/docs/components/${c!.name}`,
        }));
      if (items.length > 0) {
        sections.push({ title: groupLabel, items });
      }
    }
  }

  return sections;
}

const docsNav: NavSection[] = buildNavSections();

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
