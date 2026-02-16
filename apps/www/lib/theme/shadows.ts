// Shadow system matching tweakcn's shadow generation
// Generates shadow-2xs through shadow-2xl based on base shadow configuration

import type { ThemeConfig } from './apply-theme';

const SHADOW_LEVELS = [
  { name: 'shadow-2xs', blur: 1, spread: 0, offsetY: 1 },
  { name: 'shadow-xs', blur: 2, spread: 0, offsetY: 1 },
  { name: 'shadow-sm', blur: 3, spread: 0, offsetY: 1 },
  { name: 'shadow', blur: 4, spread: 0, offsetY: 2 },
  { name: 'shadow-md', blur: 6, spread: -1, offsetY: 4 },
  { name: 'shadow-lg', blur: 10, spread: -2, offsetY: 8 },
  { name: 'shadow-xl', blur: 20, spread: -4, offsetY: 16 },
  { name: 'shadow-2xl', blur: 40, spread: -8, offsetY: 24 },
] as const;

/**
 * Generate shadow CSS variables based on theme configuration
 * Creates shadow-2xs through shadow-2xl with calculated values
 */
export function generateShadowVariables(
  config: ThemeConfig,
  mode: 'light' | 'dark'
): Record<string, string> {
  const colors = mode === 'light' ? config.light : config.dark;

  // Extract shadow configuration from theme
  const shadowColor = colors['shadow-color'] || 'hsl(0 0% 0%)';
  const shadowOpacity = colors['shadow-opacity'] || '0.1';
  const baseBlur = parseInt(colors['shadow-blur'] || '3');
  const baseSpread = parseInt(colors['shadow-spread'] || '0');
  const offsetX = colors['shadow-offset-x'] || '0px';
  const baseOffsetY = parseInt(colors['shadow-offset-y'] || '1');

  const shadows: Record<string, string> = {};

  SHADOW_LEVELS.forEach(level => {
    // Scale blur and offsetY based on base values
    const blur = Math.round(level.blur * (baseBlur / 3));
    const spread = level.spread + baseSpread;
    const offsetY = Math.round(level.offsetY * (baseOffsetY / 1));

    // Generate shadow using color-mix for proper opacity
    shadows[level.name] = `${offsetX} ${offsetY}px ${blur}px ${spread}px color-mix(in srgb, ${shadowColor} ${parseFloat(shadowOpacity) * 100}%, transparent)`;
  });

  return shadows;
}

/**
 * Apply shadow variables to a DOM element
 */
export function applyShadowVariables(
  element: HTMLElement,
  shadows: Record<string, string>
): void {
  Object.entries(shadows).forEach(([key, value]) => {
    element.style.setProperty(`--${key}`, value);
  });
}
