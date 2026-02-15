'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { CATEGORIES, BLOCK_CATEGORIES } from '@/registry/schema';
import { componentList } from '@/registry/component-list';
import { blockList } from '@/registry/block-list';
import {
  ChevronDown,
  BookOpen,
  Download,
  Blocks,
  Sparkles,
} from 'lucide-react';
import { useState } from 'react';

// AI components to group together (pulled from various categories)
const AI_COMPONENT_NAMES = [
  'ai-prompt',
  'ai-input-search',
  'action-search-bar',
  'ai-loading',
  'ai-text-loading',
  'ai-voice',
];

// AI blocks to group together
const AI_BLOCK_NAMES = [
  'ai-chat-streaming',
  'ai-image-generator',
  'ai-video-generator',
];

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
      'card-tilt', 'border-glide', 'drift-card', 'flashy-card',
      'vercel-card', 'flipstack', 'layer-stack', 'card-stack',
      'liquid-glass-card', 'card-flip',
    ],
    Navigation: [
      'bubble-menu', 'card-nav', 'dock', 'flowing-menu', 'gooey-nav',
      'infinite-menu', 'pill-nav', 'staggered-menu', 'direction-aware-tabs',
      'toolbar-expandable', 'side-panel', 'floating-panel',
      'morphic-navbar', 'smooth-drawer', 'smooth-tab',
      'magicdock', 'navbar-flow',
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
      'sortable-list', 'tweet-grid', 'kanban', 'parallax-cards',
      'infinite-canvas',
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
      'electric-text', 'lustre-text',
    ],
    'Cursor & Scroll Effects': [
      'text-cursor-proximity', 'sensitive-text', 'variable-font-cursor',
      'scroll-swap-text', 'text-along-path',
    ],
    'Reveal & Swap': [
      'letter-3d-swap', 'scramble-hover', 'vertical-cut-reveal',
      'breathing-text', 'text-spotlight', 'stagger-chars', 'reveal-text',
    ],
  },
  inputs: {
    'Selection & Pickers': [
      'color-picker', 'tags-input', 'combobox', 'mention',
      'angle-slider', 'currency-transfer',
    ],
    'File & Media': [
      'file-upload', 'image-cropper',
    ],
  },
  special: {
    'Device Mocks': ['android', 'iphone', 'safari', 'mock-browser-window'],
    'Interactive Widgets': [
      'timer', 'rating', 'theme-switcher', 'dropzone', 'image-zoom',
      'qr-code', 'speed-dial',
    ],
    'Data Display': [
      'avatar-stack', 'banner', 'contribution-graph',
      'relative-time', 'tree', 'timeline',
    ],
    'Media & Content': [
      'code-block', 'snippet', 'hover-video-player', 'youtube-video-player',
    ],
    'Cards & Popovers': [
      'comparison', 'popover-form', 'squiggle-arrow', 'cursor',
    ],
    'Physics & 3D': [
      'gravity', 'elastic-line', 'cursor-attractor', 'css-3d-box',
    ],
  },
};

function buildComponentSections(): NavSection[] {
  const sections: NavSection[] = [
    {
      title: 'Getting Started',
      items: [
        { title: 'Introduction', href: '/docs/getting-started/introduction', icon: BookOpen },
        { title: 'Installation', href: '/docs/getting-started/installation', icon: Download },
      ],
    },
  ];

  // Add AI section pulling components from various categories
  const allComponents = componentList;
  const aiItems = AI_COMPONENT_NAMES
    .map((name) => allComponents.find((c) => c.name === name))
    .filter(Boolean)
    .map((c) => ({
      title: c!.title,
      href: `/docs/components/${c!.name}`,
      icon: Sparkles,
    }));
  if (aiItems.length > 0) {
    sections.push({ title: 'AI', items: aiItems });
  }

  for (const category of CATEGORIES) {
    const categoryComponents = componentList.filter(
      (c) => c.category === category.name && !AI_COMPONENT_NAMES.includes(c.name)
    );
    if (categoryComponents.length === 0) continue;

    const subGroups = SUB_GROUPS[category.name];
    if (!subGroups) {
      sections.push({
        title: category.label,
        items: categoryComponents.map((c) => ({
          title: c.title,
          href: `/docs/components/${c.name}`,
        })),
      });
      continue;
    }

    const subGroupedNames = new Set(Object.values(subGroups).flat());
    const remaining = categoryComponents.filter((c) => !subGroupedNames.has(c.name));

    if (remaining.length > 0) {
      sections.push({
        title: category.label,
        items: remaining.map((c) => ({
          title: c.title,
          href: `/docs/components/${c.name}`,
        })),
      });
    }

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

function buildBlockSections(): NavSection[] {
  const sections: NavSection[] = [];

  // Add AI blocks section at the top
  const aiBlockItems = AI_BLOCK_NAMES
    .map((name) => blockList.find((b) => b.name === name))
    .filter(Boolean)
    .map((b) => ({
      title: b!.title,
      href: `/docs/blocks/${b!.name}`,
      icon: Sparkles,
    }));
  if (aiBlockItems.length > 0) {
    sections.push({ title: 'AI', items: aiBlockItems });
  }

  for (const category of BLOCK_CATEGORIES) {
    const categoryBlocks = blockList.filter(
      (b) => b.category === category.name && !AI_BLOCK_NAMES.includes(b.name)
    );
    if (categoryBlocks.length === 0) continue;

    sections.push({
      title: category.label,
      items: categoryBlocks.map((b) => ({
        title: b.title,
        href: `/docs/blocks/${b.name}`,
      })),
    });
  }

  return sections;
}

const docsNav: NavSection[] = buildComponentSections();
const blocksNav: NavSection[] = buildBlockSections();

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
  const isBlocksPage = pathname?.startsWith('/docs/blocks');

  return (
    <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
      <div className="py-6 pr-6 lg:py-8">
        <div className="w-full">
          {isBlocksPage ? (
            <>
              <div className="px-2 pb-4">
                <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                  <Blocks className="size-4" />
                  Blocks
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Ready-to-use page sections
                </p>
              </div>
              {blocksNav.map((section) => (
                <CollapsibleSection
                  key={section.title}
                  section={section}
                  pathname={pathname}
                  defaultOpen={false}
                />
              ))}
            </>
          ) : (
            <>
              {docsNav.map((section, i) => (
                <CollapsibleSection
                  key={section.title}
                  section={section}
                  pathname={pathname}
                  defaultOpen={i === 0}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
