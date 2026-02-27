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

  // Refs for unstable function references to avoid infinite effect loops.
  // next-themes' setTheme is recreated on every context update, so including
  // it directly in effect deps would cause the forward sync to re-fire endlessly.
  const setNextThemeRef = useRef(setNextTheme);
  setNextThemeRef.current = setNextTheme;
  const activeModeRef = useRef(activeMode);
  activeModeRef.current = activeMode;

  // Reverse sync: when next-themes changes (e.g. navbar toggle, command menu),
  // update Zustand store so CSS variables are applied for the correct mode.
  // Only depends on resolvedTheme to avoid ping-pong with forward sync.
  useEffect(() => {
    if (
      resolvedTheme &&
      (resolvedTheme === 'light' || resolvedTheme === 'dark') &&
      resolvedTheme !== activeModeRef.current
    ) {
      setActiveMode(resolvedTheme);
    }
  }, [resolvedTheme, setActiveMode]);

  // Apply theme CSS variables to root element
  useEffect(() => {
    const root = document.documentElement;
    if (!root) return;
    applyThemeToElement(config, root, activeMode);
    applyFontsToElement(root, { sans: fontSans, mono: fontMono, serif: fontSerif });
  }, [config, activeMode, fontSans, fontMono, fontSerif]);

  // Forward sync: keep next-themes in sync with Zustand store.
  // Uses ref for setNextTheme to avoid re-firing when the function reference changes.
  useEffect(() => {
    setNextThemeRef.current(activeMode);
  }, [activeMode]);

  return null;
}
