import { create } from 'zustand';
import type { ThemeColors } from '@/lib/theme-presets';

// ============================================================
// Types
// ============================================================

interface ColorFocusState {
  // Currently focused color key
  focusedColorKey: keyof ThemeColors | null;

  // Whether to show focus animation
  shouldAnimate: boolean;

  // Actions
  focusColor: (key: keyof ThemeColors) => void;
  clearFocus: () => void;
  setAnimation: (animate: boolean) => void;
}

// ============================================================
// Store
// ============================================================

export const useColorFocusStore = create<ColorFocusState>((set) => ({
  focusedColorKey: null,
  shouldAnimate: false,

  focusColor: (key) => {
    set({ focusedColorKey: key, shouldAnimate: true });

    // Clear animation after 1.5 seconds
    setTimeout(() => {
      set({ shouldAnimate: false });
    }, 1500);
  },

  clearFocus: () => {
    set({ focusedColorKey: null, shouldAnimate: false });
  },

  setAnimation: (animate) => {
    set({ shouldAnimate: animate });
  },
}));
