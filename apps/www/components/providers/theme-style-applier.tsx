'use client';

import { useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useThemeStore } from '@/lib/stores/theme-store';
import { applyThemeToElement, applyFontsToElement } from '@/lib/theme/apply-theme';

/**
 * Global component that watches the theme store and applies
 * CSS variables to document.documentElement so the entire
 * website reflects the theme editor's current configuration.
 *
 * Inspired by tweakcn's ThemeProvider pattern.
 */
export function ThemeStyleApplier() {
  const config = useThemeStore((s) => s.config);
  const activeMode = useThemeStore((s) => s.activeMode);
  const setActiveMode = useThemeStore((s) => s.setActiveMode);
  const fontSans = useThemeStore((s) => s.fontSans);
  const fontMono = useThemeStore((s) => s.fontMono);
  const fontSerif = useThemeStore((s) => s.fontSerif);
  const { setTheme: setNextTheme, resolvedTheme } = useTheme();

  // Reverse sync: when next-themes changes (e.g. navbar toggle, command menu),
  // update Zustand store so CSS variables are applied for the correct mode
  useEffect(() => {
    if (
      resolvedTheme &&
      (resolvedTheme === 'light' || resolvedTheme === 'dark') &&
      resolvedTheme !== activeMode
    ) {
      setActiveMode(resolvedTheme);
    }
  }, [resolvedTheme, activeMode, setActiveMode]);

  // Apply theme CSS variables to root element
  useEffect(() => {
    const root = document.documentElement;
    if (!root) return;
    applyThemeToElement(config, root, activeMode);
    applyFontsToElement(root, { sans: fontSans, mono: fontMono, serif: fontSerif });
  }, [config, activeMode, fontSans, fontMono, fontSerif]);

  // Forward sync: keep next-themes in sync with Zustand store
  useEffect(() => {
    setNextTheme(activeMode);
  }, [activeMode, setNextTheme]);

  return null;
}
