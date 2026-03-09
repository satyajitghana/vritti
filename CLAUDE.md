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

**IMPORTANT:** After changing any component, you MUST verify it with Playwright screenshots before committing.

Use Python Playwright to take screenshots and verify the site visually.

### Setup

```bash
# 1. Install Python Playwright
pip install playwright

# 2. Try the normal browser install first
python3 -m playwright install chromium

# 3. If DNS for storage.googleapis.com is blocked, download manually:
#    Check browsers.json for the required version:
#    cat /usr/local/lib/python3.11/dist-packages/playwright/driver/package/browsers.json
#    Then download via curl (cdn.playwright.dev usually works):
CHROME_VERSION="145.0.7632.6"  # Update from browsers.json browserVersion
mkdir -p /root/.cache/ms-playwright/chromium-1208
curl -L -o /tmp/chrome-linux64.zip "https://cdn.playwright.dev/chrome-for-testing-public/${CHROME_VERSION}/linux64/chrome-linux64.zip"
cd /root/.cache/ms-playwright/chromium-1208 && unzip -q -o /tmp/chrome-linux64.zip

mkdir -p /root/.cache/ms-playwright/chromium_headless_shell-1208
curl -L -o /tmp/chrome-headless-shell-linux64.zip "https://cdn.playwright.dev/chrome-for-testing-public/${CHROME_VERSION}/linux64/chrome-headless-shell-linux64.zip"
cd /root/.cache/ms-playwright/chromium_headless_shell-1208 && unzip -q -o /tmp/chrome-headless-shell-linux64.zip
```

### Usage

```bash
# Take a single page screenshot
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

```bash
# Screenshot a specific component (replace COMPONENT_NAME)
python3 -c "
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={'width': 1280, 'height': 720})
    page.goto('http://localhost:3000/docs/components/COMPONENT_NAME')
    page.wait_for_timeout(3000)
    page.screenshot(path='/tmp/COMPONENT_NAME.png')
    browser.close()
"
```

```bash
# Batch screenshot multiple components
python3 -c "
from playwright.sync_api import sync_playwright
import os
os.makedirs('/tmp/screenshots', exist_ok=True)
components = ['animated-button', 'click-spark', 'sortable-list']  # add your components
with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={'width': 1280, 'height': 720})
    for name in components:
        page.goto(f'http://localhost:3000/docs/components/{name}', timeout=15000)
        page.wait_for_timeout(3000)
        page.screenshot(path=f'/tmp/screenshots/{name}.png')
    browser.close()
"
```

### Verification Workflow

After modifying any component:

1. Start the dev server: `pnpm --filter @vritti/www dev`
2. Take a screenshot of the modified component page
3. Read the screenshot to visually verify it renders correctly
4. Check both light and dark mode if theme-related changes were made
5. Component doc pages are at: `/docs/components/<component-name>`

Use Playwright to:
- Verify pages render without errors after changes
- Check theme toggle works (click button, screenshot before/after)
- Verify no console errors (especially React Error #185)
- Test component rendering on specific pages
- Verify components are visible in both light and dark mode

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
