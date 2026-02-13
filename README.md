# Vritti UI

> Beautifully designed React components built with Next.js 16, Tailwind CSS v4, and Motion animations.

## Overview

Vritti UI is a modern UI components library that combines the best aspects of popular component libraries:

- **Shadcn UI**: CLI-based component installation approach
- **MagicUI**: Beautiful component designs and category organization
- **Aceternity UI**: Animation-first philosophy
- **Fumadocs**: Modern documentation website design
- **Paper Design Shaders**: Stunning visual effects

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**: Motion library
- **Type Safety**: TypeScript
- **Icons**: Lucide React
- **Effects**: @paper-design/shaders-react
- **Package Manager**: pnpm

## Getting Started

### Installation

Using pnpm (recommended):
```bash
pnpm install
```

Using npm:
```bash
npm install
```

Using yarn:
```bash
yarn install
```

Using bun:
```bash
bun install
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

## Component Categories

Components are organized into 7 categories:

1. **Backgrounds** - Background patterns and effects
2. **Animations** - Motion and animated components
3. **Text** - Text effects and animations
4. **Buttons** - Interactive button components
5. **Layouts** - Layout and grid systems
6. **Shaders** - Advanced shader-based effects
7. **Special** - Complex and unique components

## Project Structure

```
vritti/
├── src/
│   ├── app/                    # Next.js App Router
│   ├── components/ui/          # Shadcn UI components
│   ├── registry/               # Component registry
│   │   ├── schema.ts           # Registry types
│   │   ├── index.tsx           # Registry index
│   │   └── components/         # Components by category
│   ├── lib/                    # Utilities
│   ├── hooks/                  # React hooks
│   ├── styles/                 # Global styles
│   └── config/                 # Configuration
├── registry/                   # Generated registry JSON
├── scripts/                    # Build scripts
├── content/                    # Documentation (MDX)
└── public/                     # Static assets
```

## Development Workflow

1. Create component in `src/registry/components/[category]/[name]/`
2. Add `component.json` with metadata
3. Create `component.tsx` with component code
4. Create `example.tsx` for documentation
5. Run `pnpm build:registry`
6. Test in development server

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm build:registry` - Generate registry JSON
- `pnpm lint` - Run ESLint
- `pnpm format` - Format with Prettier
- `pnpm type-check` - TypeScript type checking

## License

MIT © 2026 Vritti UI

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.
