import * as culori from 'culori';
import type { ThemeColors } from '@/lib/theme-presets';

export interface ThemeConfig {
  light: ThemeColors;
  dark: ThemeColors;
  radius: string;
}

// ============================================================
// Color Conversion (using culori for accurate conversions)
// ============================================================

/**
 * Universal color formatter using culori for proper color conversion
 * @param colorValue - Input color (hex, hsl, oklch, rgb, etc.)
 * @param format - Output format ('hsl' | 'oklch' | 'hex' | 'rgb')
 * @param tailwindVersion - For HSL: '3' returns "h s% l%", '4' returns "hsl(h s% l%)"
 */
export function colorFormatter(
  colorValue: string,
  format: 'hsl' | 'oklch' | 'hex' | 'rgb' = 'hsl',
  tailwindVersion: '3' | '4' = '4'
): string {
  const color = culori.parse(colorValue);
  if (!color) {
    console.warn(`Unable to parse color: ${colorValue}`);
    return colorValue;
  }

  switch (format) {
    case 'hsl': {
      const hsl = culori.converter('hsl')(color);
      if (!hsl || hsl.h === undefined || hsl.s === undefined || hsl.l === undefined) {
        return tailwindVersion === '4' ? 'hsl(0 0% 0%)' : '0 0% 0%';
      }
      const h = Math.round(hsl.h || 0);
      const s = Math.round((hsl.s || 0) * 100);
      const l = Math.round((hsl.l || 0) * 100);

      if (tailwindVersion === '4') {
        return `hsl(${h} ${s}% ${l}%)`;
      }
      return `${h} ${s}% ${l}%`;
    }
    case 'oklch': {
      const oklch = culori.converter('oklch')(color);
      if (!oklch || oklch.l === undefined) {
        return 'oklch(0 0 0)';
      }
      const l = (oklch.l || 0).toFixed(3);
      const c = (oklch.c || 0).toFixed(3);
      const h = Math.round(oklch.h || 0);
      return `oklch(${l} ${c} ${h})`;
    }
    case 'hex':
      return culori.formatHex(color);
    case 'rgb': {
      const rgb = culori.converter('rgb')(color);
      if (!rgb) return 'rgb(0 0 0)';
      return `rgb(${Math.round(rgb.r * 255)} ${Math.round(rgb.g * 255)} ${Math.round(rgb.b * 255)})`;
    }
    default:
      return colorValue;
  }
}

/**
 * Converts a hex color to HSL format (backward compatible)
 * @deprecated Use colorFormatter() instead for accurate conversion
 */
export function hexToHsl(hex: string): string {
  return colorFormatter(hex, 'hsl', '3');
}

/**
 * Converts HSL to hex color (backward compatible)
 * @deprecated Use colorFormatter() instead for accurate conversion
 */
export function hslToHex(hsl: string): string {
  return colorFormatter(hsl, 'hex');
}

/**
 * Converts hex to OKLCH format (backward compatible)
 * @deprecated Use colorFormatter() instead for accurate conversion
 */
export function hexToOklch(hex: string): string {
  return colorFormatter(hex, 'oklch');
}

// ============================================================
// Theme Application
// ============================================================

import { isCommonStyle, extractCommonStyles } from './common-styles';
import { generateShadowVariables } from './shadows';

/**
 * Apply common styles from light mode to the element
 * Common styles include fonts, radius, shadows, spacing, etc.
 */
function applyCommonStyles(element: HTMLElement, colors: ThemeColors): void {
  const commonStyles = extractCommonStyles(colors as unknown as Record<string, string>);

  Object.entries(commonStyles).forEach(([key, value]) => {
    if (value) {
      element.style.setProperty(`--${key}`, value);
    }
  });
}

/**
 * Apply theme configuration to a DOM element
 */
export function applyThemeToElement(
  config: ThemeConfig,
  element: HTMLElement,
  mode: 'light' | 'dark'
): void {
  const colors = mode === 'light' ? config.light : config.dark;

  // Apply common styles from light mode (fonts, radius, shadows apply to both modes)
  applyCommonStyles(element, config.light);

  // Apply color variables (excluding common styles)
  for (const [key, value] of Object.entries(colors)) {
    if (!isCommonStyle(key) && typeof value === 'string') {
      element.style.setProperty(`--${key}`, colorFormatter(value, 'hsl', '3'));
    }
  }

  // Apply radius (backward compatibility - check both locations)
  const radius = config.radius || config.light.radius || '0.5rem';
  element.style.setProperty('--radius', radius);

  // Generate and apply shadow variables
  const shadows = generateShadowVariables(config, mode);
  Object.entries(shadows).forEach(([key, value]) => {
    element.style.setProperty(`--${key}`, value);
  });

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
