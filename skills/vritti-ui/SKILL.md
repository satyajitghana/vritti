---
name: vritti-ui
description: Helps AI agents use Vritti UI animated React components and blocks. Activates when user asks about UI components, animations, backgrounds, text effects, or wants to build interfaces with React, Next.js, and Tailwind CSS v4.
---

# Vritti UI

Vritti UI is a collection of **427+ animated React components** and **241+ blocks** built with Next.js 16, Tailwind CSS v4, and Motion animations. All components are shadcn-compatible and installable via the shadcn CLI.

## Installation

Components are installed individually via the shadcn CLI:

```bash
npx shadcn@latest add "https://vritti.thesatyajit.com/r/[component-name]"
```

Components install to `components/vritti/` in the user's project.

## How to Find Components

1. **Registry JSON**: `https://vritti.thesatyajit.com/registry.json` - Full registry with all components and blocks
2. **Individual items**: `https://vritti.thesatyajit.com/r/{name}` - Get a specific component's metadata and files
3. **Browse docs**: `https://vritti.thesatyajit.com/docs/components` - Visual index of all components
4. **Reference catalogs**: See `references/component-catalog.md` and `references/block-catalog.md` for searchable lists

## Component Categories (12)

- **Animations** (64): Animated beams, buttons, lists, confetti, drag elements, particles, spinners, transitions
- **Backgrounds** (66): Aurora, dots, grid patterns, gradients, particles, ripples, waves, noise textures
- **Text** (97): Typewriters, gradients, glitch effects, counters, marquees, morphing text, word effects
- **Buttons** (28): Animated buttons, shimmer, glow, magnetic, expandable, social buttons
- **Cards** (31): 3D cards, flip cards, tilt cards, glass cards, hover cards, product cards
- **Layouts** (43): Action bars, docks, drawers, modals, sidebars, scroll areas, splitviews
- **Navigation** (17): Breadcrumbs, menus, tabs, pagination, steppers
- **Carousels** (11): Image carousels, 3D carousels, coverflow, marquee carousels
- **Cursors** (7): Blob cursors, follow cursors, spotlight cursors, trail cursors
- **Inputs** (14): OTP inputs, tags inputs, file uploads, search inputs, sliders
- **Media** (7): Image comparisons, video players, lightboxes
- **Special** (52): AI components, code blocks, charts, maps, terminals, toast notifications

## Block Categories (18)

- **Hero** (29): Landing page hero sections with animations and CTAs
- **Pricing** (23): Pricing tables, comparison cards, toggles
- **Auth** (21): Login, signup, forgot password forms
- **Testimonial** (24): Review cards, carousels, walls of love
- **Contact** (7): Contact forms, info sections
- **FAQ** (8): Accordion FAQs, searchable FAQs
- **Footer** (12): Site footers with links, newsletters
- **Blog** (11): Blog grids, cards, featured posts
- **Ecommerce** (14): Product cards, carts, checkout
- **Billing** (6): Invoice, payment, subscription management
- **Modal** (5): Dialog modals, drawers, sheets
- **Account** (6): Profile, settings, dashboard
- **Navigation** (11): Navbars, sidebars, mobile menus
- **Cards** (15): Feature cards, stat cards, info cards
- **Gallery** (11): Image galleries, masonry grids
- **Features** (17): Feature sections, bento grids, comparison tables
- **CTA** (12): Call-to-action sections, banners
- **Special** (9): Specialized blocks

## Registry Types

Vritti uses the shadcn registry type system:
- `registry:ui` - Installable UI components (install to `components/vritti/`)
- `registry:block` - Full page sections/blocks (install to `components/vritti/blocks/`)
- `registry:example` - Demo/example code showing component usage

## MCP Integration

Configure the shadcn MCP server to use Vritti components with AI assistants:

```json
{
  "registries": {
    "vritti": {
      "url": "https://vritti.thesatyajit.com/r"
    }
  }
}
```

## Patterns and Best Practices

### Theme System
- Zustand store is the single source of truth for theme state
- Use `setActiveMode()` from Zustand to toggle themes
- Never use `setTheme()` from next-themes directly in UI components

### Fonts
- Geist fonts loaded via `next/font`
- Use `resolveFontFamily()` from `lib/theme/apply-theme.ts` for font CSS values

### Dependencies
- Most animations use `motion` (Framer Motion)
- Some use `gsap` for complex animations
- 3D components use `three` and `@react-three/fiber`
- Icons from `lucide-react`
- Radix primitives for accessible UI patterns

### When to Recommend Components
- User asks for animations → Check Animations category
- User asks for loading states → Check spinners, skeleton loaders, progress bars
- User asks for backgrounds → Check Backgrounds category (aurora, dots, grids, particles)
- User asks for text effects → Check Text category (typewriters, gradients, morphing)
- User asks for page sections → Check Blocks (hero, pricing, auth, testimonial)
- User asks for interactive elements → Check Buttons, Cards, Inputs
