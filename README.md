# Vritti UI

> A massive collection of beautifully designed React components and page blocks built with React 19, Tailwind CSS v4, and Motion animations. Copy and paste into your projects.

## Overview

Vritti UI is a modern, open-source component library with **350+ components** and **50+ blocks** sourced from the best community projects and unified into a single, searchable registry.

### Sources

Components and blocks are curated from these open-source projects:

- [ScrollX-UI](https://github.com/Adityakishore0/ScrollX-UI) - 80+ animated UI components
- [KokonutUI](https://github.com/kokonut-labs/kokonutui) - Modern buttons, cards, inputs
- [Fancy](https://github.com/danielpetho/fancy) - Physics and animation-focused components
- [DiceUI](https://github.com/sadmann7/diceui) - Headless input primitives
- [BillingSDK](https://github.com/dodopayments/billingsdk) - Billing and pricing blocks
- [Creative Tim UI](https://github.com/creativetimofficial/ui) - Page section blocks
- [Limeplay](https://github.com/WINOFFRG/limeplay) - Media player components

Plus original components from [MagicUI](https://magicui.design), [CultUI](https://cult-ui.com), [Kibo UI](https://kibo-ui.com), and [React Bits](https://react-bits.dev).

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **React**: React 19
- **Styling**: Tailwind CSS v4
- **Animations**: Motion (motion/react)
- **Type Safety**: TypeScript
- **Icons**: Lucide React
- **Effects**: @paper-design/shaders-react
- **Docs**: Fumadocs (MDX)
- **Package Manager**: pnpm

## Component Categories

Components are organized into **8 categories**:

| Category | Description |
|----------|-------------|
| **Animations** | Cursors, beams, borders, visual effects, loaders |
| **Backgrounds** | Animated gradients, particles, grids, textures |
| **Buttons** | Interactive buttons with hover effects, animations |
| **Inputs** | Search bars, prompts, sliders, file uploads |
| **Layouts** | Cards, navbars, drawers, docks, carousels |
| **Media** | Video/audio players, media controls |
| **Special** | QR codes, timelines, gauges, clocks |
| **Text** | Text animations, typewriters, scramble effects |

## Block Categories

Page-section blocks are organized into **12 categories**:

| Category | Description |
|----------|-------------|
| **Hero** | Landing page hero sections |
| **Auth** | Login, register, forgot password, 2FA |
| **Pricing** | Pricing tables and plan comparisons |
| **Billing** | Payment forms, invoices, subscriptions |
| **Testimonial** | Customer reviews and social proof |
| **Contact** | Contact forms and maps |
| **FAQ** | Frequently asked questions sections |
| **Footer** | Page footer layouts |
| **Blog** | Blog post cards and layouts |
| **E-Commerce** | Product pages, carts, checkout |
| **Modal** | Dialog and modal patterns |
| **Account** | Account settings and profile pages |

## Getting Started

### Installation

```bash
pnpm install
```

### Development

Start the development server:
```bash
pnpm dev
```

Build for production:
```bash
pnpm build
```

Build component registry:
```bash
pnpm build:registry
```

Generate documentation:
```bash
cd apps/www && npx tsx scripts/generate-docs.mts
```

## Project Structure

```
apps/www/
├── app/                        # Next.js App Router
│   ├── (marketing)/            # Marketing pages (home)
│   └── (docs)/                 # Documentation pages
├── components/                 # React components
│   ├── ui/                     # Shadcn UI primitives
│   ├── marketing/              # Marketing page sections
│   └── navigation/             # Header, footer, sidebar
├── registry/                   # Component & block registry
│   ├── schema.ts               # Registry types & categories
│   ├── __index__.tsx            # Auto-generated registry index
│   ├── component-list.ts       # Auto-generated component list
│   ├── block-list.ts           # Auto-generated block list
│   ├── components/             # Components by category
│   │   ├── animations/
│   │   ├── backgrounds/
│   │   ├── buttons/
│   │   ├── inputs/
│   │   ├── layouts/
│   │   ├── media/
│   │   ├── special/
│   │   └── text/
│   └── blocks/                 # Blocks by category
│       ├── hero/
│       ├── auth/
│       ├── pricing/
│       ├── billing/
│       ├── testimonial/
│       ├── contact/
│       ├── faq/
│       ├── footer/
│       ├── blog/
│       ├── ecommerce/
│       ├── modal/
│       └── account/
├── content/docs/               # Documentation (MDX)
├── scripts/                    # Build scripts
│   ├── build-registry.mts      # Registry index generator
│   └── generate-docs.mts       # Docs MDX generator
├── lib/                        # Utilities
├── styles/                     # Global CSS styles
├── config/                     # Site & docs configuration
└── public/                     # Static assets
```

## Adding a Component

1. Create directory: `registry/components/[category]/[name]/`
2. Add `component.json` with metadata:
   ```json
   {
     "name": "my-component",
     "type": "component",
     "description": "A brief description",
     "category": "animations",
     "dependencies": ["motion"],
     "meta": { "tags": ["animation"], "source": "original" }
   }
   ```
3. Create `component.tsx` with your component (default export)
4. Create `example.tsx` for the docs preview (default export)
5. Run `pnpm build:registry` to rebuild the index
6. Run `npx tsx scripts/generate-docs.mts` to generate MDX docs

## Adding a Block

Same as components, but in `registry/blocks/[category]/[name]/` with `"type": "block"` in `component.json`.

## Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production (runs registry build first) |
| `pnpm build:registry` | Generate registry index files |
| `pnpm lint` | Run ESLint |
| `pnpm format` | Format with Prettier |
| `pnpm type-check` | TypeScript type checking |

## License

MIT

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.
