// Common style properties that apply to both light and dark modes
// These are extracted from light mode and applied globally
// Based on tweakcn's COMMON_STYLES approach

export const COMMON_STYLE_KEYS = [
  'font-sans',
  'font-serif',
  'font-mono',
  'radius',
  'shadow-color',
  'shadow-opacity',
  'shadow-blur',
  'shadow-spread',
  'shadow-offset-x',
  'shadow-offset-y',
  'letter-spacing',
  'spacing',
] as const;

export type CommonStyleKey = (typeof COMMON_STYLE_KEYS)[number];

/**
 * Type guard to check if a key is a common style
 */
export function isCommonStyle(key: string): key is CommonStyleKey {
  return COMMON_STYLE_KEYS.includes(key as CommonStyleKey);
}

/**
 * Extract common styles from a theme colors object
 */
export function extractCommonStyles(colors: Record<string, string>): Record<CommonStyleKey, string> {
  const commonStyles: Partial<Record<CommonStyleKey, string>> = {};

  COMMON_STYLE_KEYS.forEach(key => {
    if (key in colors && colors[key]) {
      commonStyles[key] = colors[key];
    }
  });

  return commonStyles as Record<CommonStyleKey, string>;
}
