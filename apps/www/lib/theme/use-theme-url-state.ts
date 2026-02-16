'use client';

import { useEffect, useCallback, useRef } from 'react';
import { useQueryState } from 'nuqs';
import { useThemeStore, type ThemeConfig } from '@/lib/stores/theme-store';

// Compress theme config to a shareable URL-safe string
function compressTheme(config: ThemeConfig): string {
  try {
    const compressed = JSON.stringify({
      l: config.light,
      d: config.dark,
      r: config.radius,
    });
    return btoa(compressed);
  } catch {
    return '';
  }
}

// Decompress theme config from URL parameter
function decompressTheme(encoded: string): Partial<ThemeConfig> | null {
  try {
    const decoded = atob(encoded);
    const parsed = JSON.parse(decoded);
    return {
      light: parsed.l,
      dark: parsed.d,
      radius: parsed.r,
    };
  } catch {
    return null;
  }
}

export function useThemeUrlState() {
  const { config, fontSans, fontMono, fontSerif, setConfig, setFont } = useThemeStore();
  const [themeParam, setThemeParam] = useQueryState('theme', {
    defaultValue: '',
    history: 'replace',
  });
  const [presetParam, setPresetParam] = useQueryState('preset', {
    defaultValue: '',
    history: 'replace',
  });
  const [fontSansParam, setFontSansParam] = useQueryState('fontSans', {
    defaultValue: '',
    history: 'replace',
  });
  const [fontMonoParam, setFontMonoParam] = useQueryState('fontMono', {
    defaultValue: '',
    history: 'replace',
  });
  const [fontSerifParam, setFontSerifParam] = useQueryState('fontSerif', {
    defaultValue: '',
    history: 'replace',
  });

  const isInitialLoad = useRef(true);
  const updateTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Load theme from URL on mount
  useEffect(() => {
    if (!isInitialLoad.current) return;
    isInitialLoad.current = false;

    // Try to load custom theme from URL
    if (themeParam) {
      const decompressed = decompressTheme(themeParam);
      if (decompressed) {
        setConfig({
          ...config,
          ...decompressed,
        });
        useThemeStore.setState({ activePreset: 'custom' });
      }
    }

    // Load preset from URL
    if (presetParam) {
      useThemeStore.setState({ activePreset: presetParam });
    }

    // Load fonts from URL
    if (fontSansParam) {
      setFont('sans', fontSansParam);
    }
    if (fontMonoParam) {
      setFont('mono', fontMonoParam);
    }
    if (fontSerifParam) {
      setFont('serif', fontSerifParam);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Sync theme changes to URL (debounced)
  const syncToUrl = useCallback(() => {
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }

    updateTimeoutRef.current = setTimeout(() => {
      const compressed = compressTheme(config);
      if (compressed) {
        setThemeParam(compressed);
      }
      setFontSansParam(fontSans);
      setFontMonoParam(fontMono);
      setFontSerifParam(fontSerif);
    }, 500); // Debounce for 500ms
  }, [config, fontSans, fontMono, fontSerif, setThemeParam, setFontSansParam, setFontMonoParam, setFontSerifParam]);

  // Generate shareable URL
  const generateShareableUrl = useCallback(() => {
    if (typeof window === 'undefined') return '';

    const url = new URL(window.location.href);
    const compressed = compressTheme(config);

    if (compressed) {
      url.searchParams.set('theme', compressed);
    }
    url.searchParams.set('fontSans', fontSans);
    url.searchParams.set('fontMono', fontMono);
    url.searchParams.set('fontSerif', fontSerif);

    return url.toString();
  }, [config, fontSans, fontMono, fontSerif]);

  return {
    syncToUrl,
    generateShareableUrl,
  };
}
