# Vritti UI Visual Verification Report

**Date:** 2026-02-26
**Method:** Automated Playwright screenshots + AI visual inspection
**Viewport:** 1280x900 (headless Chromium)

---

## Executive Summary

| Metric | Count |
|--------|-------|
| **Total registry items** | 607 (383 components + 224 blocks) |
| **Successfully screenshotted** | 568 |
| **Screenshot timeout errors** | 8 |
| **Skipped (WebGL/shader)** | 31 |
| **Visually inspected** | 575+ |
| **Items with issues** | ~102 |
| **Issues: Broken/missing images** | ~60 |
| **Issues: Blank/empty render** | ~25 |
| **Issues: Layout/sizing problems** | ~10 |
| **Issues: Modal not triggered** | 15 |
| **Issues: Runtime errors** | 2 |
| **Clean renders (no issues)** | ~470+ (82%+) |

---

## Issue Categories

### 1. CRITICAL: Runtime Errors (2)

| Component | Category | Error |
|-----------|----------|-------|
| **fluid-glass** | layouts | `Runtime Error: Could not load /assets/3d/lens.glb` - 404 Not Found. Missing 3D asset file. |
| **form-layout-05** | blocks/special | Red "3 Issues" dev error badge visible, overlapping content. |

### 2. HIGH: Broken/Missing Images (~60 items)

This is the most prevalent issue. Components reference images via URLs or paths that don't resolve in the local dev environment. This affects:

**Components:**
- **animations:** float, logo-loop, orbit-images, pixel-image (4)
- **special:** avatar-circles, avatar-group, avatar-stack, image-zoom, lens, youtube-video-player (6)
- **layouts:** box-carousel, bubble-menu, card-nav, carousel-cards, decay-card, dome-gallery, feature-carousel, pill-nav, showcase, simple-carousel, three-d-carousel (11)

**Blocks:**
- **blog:** ALL 8 items (blog-cards-layout, blog-cards-simple, blog-content-cards, blog-highlighted, blog-highlighted-categories, blog-large-preview, blog-post-tags, blog-rectangular)
- **ecommerce:** 18 of 21 items (credit-card-display, ecommerce-grid, ecommerce-product-detail, empty-cart, order-details, order-history, product-description, product-description-complex, product-details-advanced, product-details-minimal, product-details-simple, product-listing-filters, product-overview-dark, product-overview-digital, product-preview-interactive, promotional-cards, shopping-cart)
- **testimonial:** 10 of 22 items (testimonial-badge, testimonial-bordered, testimonial-columns, testimonial-gradient, testimonial-highlight, testimonial-minimal, testimonial-slider, testimonial-social, testimonial-split, testimonial-video)
- **billing:** payment-method (1)
- **contact:** contact-form-image, contact-form-map (2)
- **special:** file-upload-01, web3-dashboard, web3-nft-gallery, web3-staking, web3-token-swap, web3-wallet (6)

**Root cause:** Image `src` paths reference external URLs or placeholder images (e.g., unsplash, placeholder services) that are not accessible from the dev server. Components should use local fallback images or handle image load failures gracefully.

### 3. MEDIUM: Blank/Empty Renders (~25 items)

Components that render a completely blank white page with no visible content:

**Animations (9):**
- crosshair, ghost-cursor, icon-cloud, image-trail, metallic-paint, ribbons, shape-blur, sticker-peel, target-cursor

**Backgrounds (4):**
- floating-lines, gradient-blinds, light-pillar, prismatic-burst

**Layouts (10):**
- border-glide, bounce-cards, card-flip, flying-posters, glass-surface, infinite-menu, masonry, pixel-card, tilted-card, flowing-menu

**Special (1):**
- comparison

**Likely causes:**
- Canvas/WebGL-dependent rendering that doesn't work in headless Chromium
- CSS animations that need mouse interaction or specific viewport conditions
- Components that require user interaction (hover/click) to display content

### 4. MEDIUM: Modal Content Not Triggered (15 items)

All these modal components only show a trigger button because the demo doesn't auto-open the modal:

- limited-offer-dialog, modal-alert, modal-confirmation, modal-cookie, modal-delete, modal-feedback, modal-form, modal-invite, modal-newsletter, modal-notification, modal-pricing, modal-profile, modal-settings, modal-share, modal-success

**Note:** The command-menu and dialog variants (dialog-01 through dialog-12) DO render their content correctly. The issue is specific to `modal-*` prefixed blocks whose demos require a click to open.

### 5. LOW: Layout/Sizing Issues (~10 items)

| Component | Category | Issue |
|-----------|----------|-------|
| card-stack | layouts | Cards compressed into narrow vertical strip, text overlaps |
| gradual-blur | animations | Content pushed to extreme bottom-left edge |
| flashy-card | layouts | Only crosshair/target graphic, no card content |
| deck | layouts | Shows "No more cards" - all cards swiped away |
| staggered-menu | layouts | Only "Logo" text, no menu items |
| interactive-grid-pattern | backgrounds | Grid doesn't fill full container width (75%) |
| backgroundmeteors | backgrounds | Only faint grid, no meteor effects visible |
| pixelate-svg-filter | special | Content renders as tiny, nearly invisible element |
| globe | special | Renders as solid black semicircle instead of 3D globe |
| shine-border | animations | Border container renders but empty inside |
| circular-gallery | layouts | All images render as solid black rectangles |

### 6. LOW: Input Component Issues (3 items)

| Component | Category | Issue |
|-----------|----------|-------|
| kokonut-file-upload | inputs | Only a faint vertical line visible, no upload UI |
| profile-dropdown | inputs | Avatar and username text clipped on right side |
| team-selector | inputs | Avatar labels overlap, images failed to load |

### 7. INFO: Screenshot Timeout Errors (8 items)

These components timed out (>20s) during navigation, likely due to heavy media loading:

- fluid-glass (layouts) - has runtime error for missing .glb file
- client-tweet-card (special) - network dependent (Twitter API)
- hover-video-player (special) - needs video media
- text-pressure (text) - heavy canvas rendering
- video-text (text) - needs video media
- bg-media (backgrounds) - needs video media
- grid-scan (backgrounds) - heavy rendering (but actually rendered fine in error capture)
- ecommerce-video-hero (ecommerce) - needs video media

### 8. INFO: Skipped WebGL/Shader Components (31 items)

These were intentionally skipped as they require GPU rendering:

aurora, aurora-dots, balatro, ballpit, beams, beams-background, bg-animated-fractal-dot-grid, black-hole, bolt-strike, canvas-fractal-grid, color-bends, fluid-cursor, gradient-background, gravity, grid-distortion, hyperspeed, iridescent, lanyard, lightning, liquid-chrome, liquid-ether, model-viewer, noise-gradient, orb, particles, particles-3d, pixel-trail, silk, silk-shader, splash-cursor, star-border, threads, warp-background, waves, wobble

---

## Results by Category

### Components (383 total)

| Category | Total | Screenshotted | OK | Issues | Issue Rate |
|----------|-------|--------------|-----|--------|------------|
| animations | 68 | 68 | 53 | 15 | 22% |
| backgrounds | 39 | 37 | 31 | 6 | 16% |
| buttons | 21 | 21 | 19 | 2 | 10% |
| inputs | 12 | 12 | 9 | 3 | 25% |
| layouts | 87 | 87 | 63 | 26* | 30% |
| special | 44 | 42 | 32 | 13* | 30% |
| text | 87 | 85 | ~78 | ~7 | ~8% |

*includes broken images

### Blocks (224 total)

| Category | Total | Screenshotted | OK | Issues | Issue Rate |
|----------|-------|--------------|-----|--------|------------|
| account | 7 | 7 | 7 | 0 | 0% |
| auth | 13 | 13 | 13 | 0 | 0% |
| billing | 20 | 20 | 18 | 2 | 10% |
| blog | 8 | 8 | 0 | 8 | 100% |
| contact | 15 | 15 | 13 | 2 | 13% |
| ecommerce | 21 | 20 | 3 | 18 | 86% |
| faq | 9 | 9 | 9 | 0 | 0% |
| footer | 20 | 20 | 20 | 0 | 0% |
| hero | 4 | 4 | 4 | 0 | 0% |
| modal | 30 | 30 | 15 | 15 | 50% |
| pricing | 6 | 6 | 6 | 0 | 0% |
| special | 48 | 48 | 41 | 7 | 15% |
| testimonial | 22 | 22 | 12 | 10 | 45% |

---

## Recommendations

### Priority 1: Fix broken images (affects ~60 components)
- Add local fallback/placeholder images for all components that reference external image URLs
- Use `next/image` placeholder blur or fallback patterns
- Consider bundling sample images in `public/` for demo/preview purposes

### Priority 2: Fix runtime error in fluid-glass
- The component references `/assets/3d/lens.glb` which returns 404
- Either add the missing asset or remove the dependency

### Priority 3: Fix modal demos to auto-open
- The 15 `modal-*` block demos should open automatically (or use `defaultOpen`) in preview mode
- The `dialog-*` and `command-menu-*` demos already do this correctly

### Priority 4: Investigate blank-rendering components
- 25+ components render blank - these may need:
  - Canvas/WebGL fallbacks for headless rendering
  - Default content that doesn't require user interaction
  - CSS animation triggers that work without mouse events

### Priority 5: Fix layout issues
- card-stack: Fix compressed vertical layout
- gradual-blur: Fix content positioning
- interactive-grid-pattern: Grid should fill full container width

---

## Test Infrastructure

**Files created:**
- `scripts/visual-verify.py` - Playwright screenshot automation script
- `screenshots/` - All screenshot files organized by category
- `screenshots/report.json` - Machine-readable results
- `screenshots/VERIFICATION_REPORT.md` - This report
