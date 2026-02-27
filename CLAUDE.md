# Vritti UI - Claude Code Guidelines

## Project Structure

This is a monorepo using pnpm workspaces with Turborepo:

- `apps/www` - Main documentation/marketing site (Next.js 16, Tailwind CSS v4, React 19)
- `packages/` - Shared packages
- `registry/` - Component registry served via `/r/[name]` API route

## Key Commands

```bash
# Install dependencies
pnpm install

# Build the www app
pnpm --filter @vritti/www build

# Dev server
pnpm --filter @vritti/www dev

# Regenerate component/block docs from registry
pnpm --filter @vritti/www tsx apps/www/scripts/generate-docs.mts
```

## Testing with Playwright

Use Python Playwright to take screenshots and verify the site visually. Install and use it like this:

```bash
# Install (already available in the environment)
pip install playwright
python3 -m playwright install chromium

# Take a screenshot
python3 -c "
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={'width': 1280, 'height': 720})
    page.goto('http://localhost:3000')
    page.wait_for_timeout(2000)
    page.screenshot(path='/tmp/screenshot.png')
    browser.close()
"
```

Use Playwright to:
- Verify pages render without errors after changes
- Check theme toggle works (click button, screenshot before/after)
- Verify no console errors (especially React Error #185)
- Test component rendering on specific pages

## Architecture Notes

### Theme System

The theme system uses a **single source of truth** pattern:

1. **Zustand store** (`lib/stores/theme-store.ts`) is the single source of truth for `activeMode` (light/dark)
2. **ThemeStyleApplier** (`components/providers/theme-style-applier.tsx`) does **forward-only sync**: Zustand → next-themes
3. **next-themes** manages the `dark` class on `<html>` via `attribute="class"`
4. **`applyThemeToElement()`** applies CSS variables only — it does NOT touch the `dark` class

All theme toggles (header, command menu, theme editor) must call `setActiveMode()` from Zustand directly. Never use `setTheme()` from next-themes directly in UI components — that would bypass Zustand and break the single-direction data flow.

### Fonts

Geist fonts are loaded via `next/font` with hashed `@font-face` names. Use `resolveFontFamily()` from `lib/theme/apply-theme.ts` to get the correct CSS value (returns `var(--font-geist-sans)` for bundled fonts, quoted names for Google Fonts).

### Registry

Components are served via the `/r/[name]` API route. The shadcn CLI installs them using full URLs:
```bash
npx shadcn@latest add "https://vritti-ui.vercel.app/r/[component-name]"
```
