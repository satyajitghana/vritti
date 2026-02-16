'use client';

import { Button } from '@/components/ui/button';
import {
  Undo,
  Redo,
  RotateCcw,
  Save,
  Share2,
  Download,
  Upload,
  Eye,
  Code,
} from 'lucide-react';
import { useThemeStore, selectCanUndo, selectCanRedo } from '@/lib/stores/theme-store';
import { useInspectorStore } from '@/lib/stores/inspector-store';
import { useEffect } from 'react';

interface ActionBarProps {
  onExport?: () => void;
  onShare?: () => void;
  onSave?: () => void;
  onImport?: () => void;
}

export function ActionBar({ onExport, onShare, onSave, onImport }: ActionBarProps) {
  const { undo, redo, reset } = useThemeStore();
  const canUndo = useThemeStore(selectCanUndo);
  const canRedo = useThemeStore(selectCanRedo);
  const { isActive: inspectorActive, toggleInspector } = useInspectorStore();

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + Z = Undo
      if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        if (canUndo) undo();
      }

      // Cmd/Ctrl + Shift + Z = Redo
      if ((e.metaKey || e.ctrlKey) && e.key === 'z' && e.shiftKey) {
        e.preventDefault();
        if (canRedo) redo();
      }

      // Cmd/Ctrl + S = Save
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        onSave?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canUndo, canRedo, undo, redo, onSave]);

  return (
    <div className="flex items-center justify-between border-b px-4 py-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-1">
        {/* Undo/Redo */}
        <Button
          variant="ghost"
          size="sm"
          onClick={undo}
          disabled={!canUndo}
          title="Undo (Cmd+Z)"
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={redo}
          disabled={!canRedo}
          title="Redo (Cmd+Shift+Z)"
        >
          <Redo className="h-4 w-4" />
        </Button>

        <div className="mx-1 h-6 w-px bg-border" />

        {/* Reset */}
        <Button
          variant="ghost"
          size="sm"
          onClick={reset}
          title="Reset to default"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-1">
        {/* Inspector */}
        <Button
          variant={inspectorActive ? 'default' : 'ghost'}
          size="sm"
          onClick={toggleInspector}
          title="Toggle inspector"
        >
          <Eye className="h-4 w-4 mr-1.5" />
          Inspector
        </Button>

        <div className="mx-1 h-6 w-px bg-border" />

        {/* Import */}
        {onImport && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onImport}
            title="Import theme"
          >
            <Upload className="h-4 w-4 mr-1.5" />
            Import
          </Button>
        )}

        {/* Export */}
        {onExport && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onExport}
            title="Export code"
          >
            <Code className="h-4 w-4 mr-1.5" />
            Export
          </Button>
        )}

        {/* Share */}
        {onShare && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onShare}
            title="Share theme"
          >
            <Share2 className="h-4 w-4 mr-1.5" />
            Share
          </Button>
        )}

        {/* Save */}
        {onSave && (
          <Button
            variant="default"
            size="sm"
            onClick={onSave}
            title="Save theme (Cmd+S)"
          >
            <Save className="h-4 w-4 mr-1.5" />
            Save
          </Button>
        )}
      </div>
    </div>
  );
}
