import { CATEGORIES, BLOCK_CATEGORIES } from '@/registry/schema'
import { componentList } from '@/registry/component-list'
import { blockList } from '@/registry/block-list'

export interface NavItem {
  title: string
  href: string
  external?: boolean
  label?: string
}

export interface NavItemWithChildren {
  title: string
  items: NavItem[]
}

interface DocsConfig {
  mainNav: NavItem[]
  sidebarNav: NavItemWithChildren[]
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Components",
      href: "/docs/components",
    },
    {
      title: "Blocks",
      href: "/docs/blocks",
    },
  ],
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs/getting-started/introduction",
        },
        {
          title: "Installation",
          href: "/docs/getting-started/installation",
        },
      ],
    },
    ...CATEGORIES.map((cat) => ({
      title: cat.label,
      items: componentList
        .filter((c) => c.category === cat.name)
        .map((c) => ({
          title: c.title,
          href: `/docs/components/${c.name}`,
        })),
    })).filter((section) => section.items.length > 0),
    ...BLOCK_CATEGORIES.map((cat) => ({
      title: `${cat.label} (Blocks)`,
      items: blockList
        .filter((b) => b.category === cat.name)
        .map((b) => ({
          title: b.title,
          href: `/docs/blocks/${b.name}`,
        })),
    })).filter((section) => section.items.length > 0),
  ],
}
