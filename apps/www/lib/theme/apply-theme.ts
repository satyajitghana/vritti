import type { ThemeColors } from '@/lib/theme-presets';

export interface ThemeConfig {
  light: ThemeColors;
  dark: ThemeColors;
  radius: string;
}

// ============================================================
// Color Conversion
// ============================================================

/**
 * Converts a hex color to HSL format
 * Reused from original theme-editor.tsx
 */
export function hexToHsl(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '0 0% 0%';

  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

/**
 * Converts HSL to hex color
 */
export function hslToHex(hsl: string): string {
  const match = hsl.match(/(\d+)\s+(\d+)%\s+(\d+)%/);
  if (!match) return '#000000';

  const h = parseInt(match[1]) / 360;
  const s = parseInt(match[2]) / 100;
  const l = parseInt(match[3]) / 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  const toHex = (x: number) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Converts hex to OKLCH format (approximate)
 */
export function hexToOklch(hex: string): string {
  // Simplified conversion - for more accurate conversion, would need a color library
  const hsl = hexToHsl(hex);
  const match = hsl.match(/(\d+)\s+(\d+)%\s+(\d+)%/);
  if (!match) return 'oklch(0 0 0)';

  const h = parseInt(match[1]);
  const s = parseInt(match[2]) / 100;
  const l = parseInt(match[3]) / 100;

  // Approximate OKLCH values
  const lightness = l;
  const chroma = s * 0.4; // Rough approximation
  const hue = h;

  return `oklch(${lightness.toFixed(3)} ${chroma.toFixed(3)} ${hue})`;
}

// ============================================================
// Theme Application
// ============================================================

/**
 * Apply theme configuration to a DOM element
 */
export function applyThemeToElement(
  config: ThemeConfig,
  element: HTMLElement,
  mode: 'light' | 'dark'
): void {
  const colors = mode === 'light' ? config.light : config.dark;

  // Apply color variables
  for (const [key, value] of Object.entries(colors)) {
    element.style.setProperty(`--${key}`, hexToHsl(value));
  }

  // Apply radius
  element.style.setProperty('--radius', config.radius);

  // Toggle dark class
  if (mode === 'dark') {
    element.classList.add('dark');
  } else {
    element.classList.remove('dark');
  }
}

/**
 * Remove theme styles from a DOM element
 */
export function removeThemeFromElement(element: HTMLElement): void {
  // Remove all CSS variables
  element.style.cssText = '';
  element.classList.remove('dark');
}

// ============================================================
// Font Loading
// ============================================================

/**
 * Load a Google Font dynamically
 */
export async function loadGoogleFont(fontFamily: string): Promise<void> {
  if (!fontFamily || fontFamily === 'inherit') return;

  // Check if font is already loaded
  if (document.fonts.check(`12px "${fontFamily}"`)) {
    return;
  }

  // Create font-face for Google Fonts
  const fontName = fontFamily.replace(/\s+/g, '+');
  const weights = '400;500;600;700';

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${fontName}:wght@${weights}&display=swap`;

  // Check if link already exists
  const existing = document.querySelector(`link[href="${link.href}"]`);
  if (!existing) {
    document.head.appendChild(link);
  }

  // Wait for font to load
  await waitForFont(fontFamily);
}

/**
 * Wait for a font to be loaded and ready
 */
export async function waitForFont(
  fontFamily: string,
  timeout: number = 3000
): Promise<boolean> {
  if (!fontFamily || fontFamily === 'inherit') return true;

  try {
    await Promise.race([
      document.fonts.load(`12px "${fontFamily}"`),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Font load timeout')), timeout)
      ),
    ]);
    return true;
  } catch {
    console.warn(`Font "${fontFamily}" failed to load within ${timeout}ms`);
    return false;
  }
}

/**
 * Apply font families to an element
 */
export function applyFontsToElement(
  element: HTMLElement,
  fonts: { sans?: string; mono?: string; serif?: string }
): void {
  if (fonts.sans) {
    element.style.setProperty('--font-sans', `"${fonts.sans}", sans-serif`);
  }
  if (fonts.mono) {
    element.style.setProperty('--font-mono', `"${fonts.mono}", monospace`);
  }
  if (fonts.serif) {
    element.style.setProperty('--font-serif', `"${fonts.serif}", serif`);
  }
}
