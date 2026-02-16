import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { THEME_PRESETS, type ThemePreset, type ThemeColors } from '@/lib/theme-presets';

// ============================================================
// Types
// ============================================================

export interface ThemeConfig {
  light: ThemeColors;
  dark: ThemeColors;
  radius: string;
}

interface ThemeHistoryEntry {
  config: ThemeConfig;
  timestamp: number;
}

interface ThemeState {
  // Current theme configuration
  config: ThemeConfig;
  activeMode: 'light' | 'dark';
  activePreset: string;

  // Font configuration
  fontSans: string;
  fontMono: string;
  fontSerif: string;

  // History for undo/redo
  history: ThemeHistoryEntry[];
  historyIndex: number;

  // Internal state
  lastHistoryUpdate: number;

  // Actions
  setConfig: (config: ThemeConfig) => void;
  updateColor: (mode: 'light' | 'dark', key: keyof ThemeColors, value: string) => void;
  updateRadius: (radius: string) => void;
  setActiveMode: (mode: 'light' | 'dark') => void;
  applyPreset: (preset: ThemePreset) => void;
  setFont: (type: 'sans' | 'mono' | 'serif', font: string) => void;

  // History actions
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  reset: () => void;

  // Internal actions
  _addToHistory: (config: ThemeConfig) => void;
}

// ============================================================
// Constants
// ============================================================

const MAX_HISTORY_ENTRIES = 30;
const HISTORY_DEBOUNCE_MS = 500;

const defaultPreset = THEME_PRESETS[0];
const initialState = {
  config: defaultPreset.config,
  activeMode: 'light' as const,
  activePreset: defaultPreset.name,
  fontSans: 'Geist Sans',
  fontMono: 'Geist Mono',
  fontSerif: 'Georgia',
  history: [],
  historyIndex: -1,
  lastHistoryUpdate: 0,
};

// ============================================================
// Store
// ============================================================

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setConfig: (config) => {
        set({ config, activePreset: 'custom' });
        get()._addToHistory(config);
      },

      updateColor: (mode, key, value) => {
        const currentConfig = get().config;
        const newConfig = {
          ...currentConfig,
          [mode]: { ...currentConfig[mode], [key]: value },
        };
        set({ config: newConfig, activePreset: 'custom' });
        get()._addToHistory(newConfig);
      },

      updateRadius: (radius) => {
        const currentConfig = get().config;
        const newConfig = { ...currentConfig, radius };
        set({ config: newConfig, activePreset: 'custom' });
        get()._addToHistory(newConfig);
      },

      setActiveMode: (mode) => {
        set({ activeMode: mode });
      },

      applyPreset: (preset) => {
        set({
          config: preset.config,
          activePreset: preset.name
        });
        get()._addToHistory(preset.config);
      },

      setFont: (type, font) => {
        const fontKey = `font${type.charAt(0).toUpperCase() + type.slice(1)}` as 'fontSans' | 'fontMono' | 'fontSerif';
        set({ [fontKey]: font });
      },

      // History management
      undo: () => {
        const { history, historyIndex } = get();
        if (historyIndex > 0) {
          const newIndex = historyIndex - 1;
          const entry = history[newIndex];
          set({
            config: entry.config,
            historyIndex: newIndex,
            activePreset: 'custom'
          });
        }
      },

      redo: () => {
        const { history, historyIndex } = get();
        if (historyIndex < history.length - 1) {
          const newIndex = historyIndex + 1;
          const entry = history[newIndex];
          set({
            config: entry.config,
            historyIndex: newIndex,
            activePreset: 'custom'
          });
        }
      },

      canUndo: () => {
        const { historyIndex } = get();
        return historyIndex > 0;
      },

      canRedo: () => {
        const { history, historyIndex } = get();
        return historyIndex < history.length - 1;
      },

      reset: () => {
        set({
          config: defaultPreset.config,
          activePreset: defaultPreset.name,
          activeMode: 'light'
        });
        get()._addToHistory(defaultPreset.config);
      },

      // Internal: Add to history with debouncing
      _addToHistory: (config) => {
        const now = Date.now();
        const { lastHistoryUpdate, history, historyIndex } = get();

        // Debounce: only add to history if enough time has passed
        if (now - lastHistoryUpdate < HISTORY_DEBOUNCE_MS && history.length > 0) {
          // Update the most recent entry instead of creating a new one
          const newHistory = [...history];
          newHistory[newHistory.length - 1] = { config, timestamp: now };
          set({
            history: newHistory,
            lastHistoryUpdate: now
          });
          return;
        }

        // Create new history entry
        const newEntry: ThemeHistoryEntry = { config, timestamp: now };

        // Remove any "future" history if we're not at the end
        const truncatedHistory = history.slice(0, historyIndex + 1);

        // Add new entry
        let newHistory = [...truncatedHistory, newEntry];

        // Limit to MAX_HISTORY_ENTRIES
        if (newHistory.length > MAX_HISTORY_ENTRIES) {
          newHistory = newHistory.slice(newHistory.length - MAX_HISTORY_ENTRIES);
        }

        set({
          history: newHistory,
          historyIndex: newHistory.length - 1,
          lastHistoryUpdate: now
        });
      },
    }),
    {
      name: 'vritti-theme-storage',
      partialize: (state) => ({
        config: state.config,
        activeMode: state.activeMode,
        activePreset: state.activePreset,
        fontSans: state.fontSans,
        fontMono: state.fontMono,
        fontSerif: state.fontSerif,
        // Don't persist history to avoid localStorage bloat
      }),
    }
  )
);

// ============================================================
// Selectors
// ============================================================

export const selectCurrentColors = (state: ThemeState) =>
  state.activeMode === 'light' ? state.config.light : state.config.dark;

export const selectCanUndo = (state: ThemeState) => state.canUndo();
export const selectCanRedo = (state: ThemeState) => state.canRedo();
