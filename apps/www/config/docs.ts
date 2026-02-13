import { CATEGORIES } from '@/registry/schema'
import { componentList } from '@/registry/component-list'

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
  ],
}
