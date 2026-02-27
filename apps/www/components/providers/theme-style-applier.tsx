'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import { useThemeStore } from '@/lib/stores/theme-store';
import { applyThemeToElement, applyFontsToElement } from '@/lib/theme/apply-theme';

/**
 * Global component that watches the theme store and applies
 * CSS variables to document.documentElement so the entire
 * website reflects the theme editor's current configuration.
 *
 * Architecture: Zustand is the single source of truth for theme mode.
 * This component does forward-only sync: Zustand → next-themes.
 * All theme toggles (header, command menu, theme editor) must update
 * Zustand directly via setActiveMode, NOT next-themes' setTheme.
 */
export function ThemeStyleApplier() {
  const config = useThemeStore((s) => s.config);
  const activeMode = useThemeStore((s) => s.activeMode);
  const fontSans = useThemeStore((s) => s.fontSans);
  const fontMono = useThemeStore((s) => s.fontMono);
  const fontSerif = useThemeStore((s) => s.fontSerif);
  const { setTheme: setNextTheme } = useTheme();

  // Stable ref for setNextTheme — next-themes does not memoize it,
  // so including it directly in effect deps would cause infinite re-renders.
  const setNextThemeRef = useRef(setNextTheme);
  setNextThemeRef.current = setNextTheme;

  // Apply theme CSS variables to root element
  useEffect(() => {
    const root = document.documentElement;
    if (!root) return;
    applyThemeToElement(config, root, activeMode);
    applyFontsToElement(root, { sans: fontSans, mono: fontMono, serif: fontSerif });
  }, [config, activeMode, fontSans, fontMono, fontSerif]);

  // Forward sync only: Zustand → next-themes.
  // next-themes manages the dark class on <html> via attribute="class".
  useEffect(() => {
    setNextThemeRef.current(activeMode);
  }, [activeMode]);

  return null;
}
