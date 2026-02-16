import { create } from 'zustand';

// ============================================================
// Types
// ============================================================

interface ElementMetadata {
  tagName: string;
  classList: string[];
  computedStyles: Record<string, string>;
  appliedColors: string[];
}

interface InspectorState {
  // Inspector mode active
  isActive: boolean;

  // Currently hovered element
  hoveredElement: HTMLElement | null;

  // Currently selected element
  selectedElement: HTMLElement | null;

  // Metadata for selected element
  metadata: ElementMetadata | null;

  // Actions
  toggleInspector: () => void;
  setHoveredElement: (element: HTMLElement | null) => void;
  setSelectedElement: (element: HTMLElement | null) => void;
  setMetadata: (metadata: ElementMetadata | null) => void;
  reset: () => void;
}

// ============================================================
// Store
// ============================================================

export const useInspectorStore = create<InspectorState>((set) => ({
  isActive: false,
  hoveredElement: null,
  selectedElement: null,
  metadata: null,

  toggleInspector: () => {
    set((state) => {
      const newActive = !state.isActive;
      // Reset everything when deactivating
      if (!newActive) {
        return {
          isActive: false,
          hoveredElement: null,
          selectedElement: null,
          metadata: null,
        };
      }
      return { isActive: true };
    });
  },

  setHoveredElement: (element) => {
    set({ hoveredElement: element });
  },

  setSelectedElement: (element) => {
    set({ selectedElement: element });
  },

  setMetadata: (metadata) => {
    set({ metadata });
  },

  reset: () => {
    set({
      isActive: false,
      hoveredElement: null,
      selectedElement: null,
      metadata: null,
    });
  },
}));
