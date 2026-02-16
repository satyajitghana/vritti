'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Save, Trash2, Download } from 'lucide-react';
import { useThemeStore, type ThemeConfig } from '@/lib/stores/theme-store';

interface SavedTheme {
  id: string;
  name: string;
  config: ThemeConfig;
  savedAt: string;
}

interface SavedThemesManagerProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
}

const STORAGE_KEY = 'vritti-saved-themes';

export function SavedThemesManager({ open, onOpenChange, trigger }: SavedThemesManagerProps) {
  const { config, setConfig } = useThemeStore();
  const [savedThemes, setSavedThemes] = useState<SavedTheme[]>([]);
  const [themeName, setThemeName] = useState('');

  useEffect(() => {
    loadSavedThemes();
  }, []);

  const loadSavedThemes = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setSavedThemes(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Failed to load saved themes:', error);
    }
  };

  const saveCurrentTheme = () => {
    if (!themeName.trim()) return;

    const newTheme: SavedTheme = {
      id: Date.now().toString(),
      name: themeName,
      config,
      savedAt: new Date().toISOString(),
    };

    const updated = [...savedThemes, newTheme];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setSavedThemes(updated);
    setThemeName('');
  };

  const deleteTheme = (id: string) => {
    const updated = savedThemes.filter((t) => t.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setSavedThemes(updated);
  };

  const loadTheme = (theme: SavedTheme) => {
    setConfig(theme.config);
    onOpenChange?.(false);
  };

  const exportAll = () => {
    const dataStr = JSON.stringify(savedThemes, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vritti-themes.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Saved Themes</DialogTitle>
          <DialogDescription>
            Manage your saved theme configurations.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 flex-1 overflow-hidden flex flex-col">
          {/* Save Current Theme */}
          <div className="flex gap-2">
            <Input
              placeholder="Theme name..."
              value={themeName}
              onChange={(e) => setThemeName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') saveCurrentTheme();
              }}
            />
            <Button onClick={saveCurrentTheme} disabled={!themeName.trim()}>
              <Save className="h-4 w-4 mr-1.5" />
              Save
            </Button>
          </div>

          {/* Saved Themes List */}
          <div className="flex-1 overflow-auto space-y-2 border rounded-lg p-4">
            {savedThemes.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No saved themes yet. Save your current theme to get started.
              </p>
            ) : (
              savedThemes.map((theme) => (
                <div
                  key={theme.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-medium">{theme.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(theme.savedAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => loadTheme(theme)}
                    >
                      Load
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteTheme(theme.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Export All */}
          {savedThemes.length > 0 && (
            <Button variant="outline" onClick={exportAll} className="w-full">
              <Download className="h-4 w-4 mr-1.5" />
              Export All Themes
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
