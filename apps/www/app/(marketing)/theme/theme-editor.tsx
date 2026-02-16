'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Check, Sun, Moon, Palette, Type, SlidersHorizontal, Code } from 'lucide-react';
import { FontPicker } from '@/components/theme/font-picker';
import { ContrastChecker } from '@/components/theme/contrast-checker';
import { CSSImportDialog } from '@/components/theme/css-import-dialog';
import { THEME_PRESETS, type ThemePreset, type ThemeColors } from '@/lib/theme-presets';
import { useThemeStore, selectCurrentColors } from '@/lib/stores/theme-store';
import { applyThemeToElement } from '@/lib/theme/apply-theme';
import { toLabel } from '@/lib/theme/color-utils';
import { generateCSS } from '@/lib/theme/code-generator';
import { ActionBar } from '@/components/theme/action-bar';
import { ColorPickerEnhanced } from '@/components/theme/color-picker/color-picker-enhanced';
import { ColorFocusIndicator } from '@/components/theme/color-picker/color-focus-indicator';
import { PreviewContainer } from '@/components/theme/preview/preview-container';
import { ExportDialog } from '@/components/theme/export-dialog';
import { ShareDialog } from '@/components/theme/share-dialog';
import { SavedThemesManager } from '@/components/theme/saved-themes-manager';
import { MobileThemeSwitcher } from '@/components/theme/mobile-theme-switcher';

// ============================================================
// Color Groups for the UI
// ============================================================

const COLOR_GROUPS = [
  {
    label: 'Base',
    keys: ['background', 'foreground'] as (keyof ThemeColors)[],
  },
  {
    label: 'Primary',
    keys: ['primary', 'primary-foreground'] as (keyof ThemeColors)[],
  },
  {
    label: 'Secondary',
    keys: ['secondary', 'secondary-foreground'] as (keyof ThemeColors)[],
  },
  {
    label: 'Muted',
    keys: ['muted', 'muted-foreground'] as (keyof ThemeColors)[],
  },
  {
    label: 'Accent',
    keys: ['accent', 'accent-foreground'] as (keyof ThemeColors)[],
  },
  {
    label: 'Destructive',
    keys: ['destructive', 'destructive-foreground'] as (keyof ThemeColors)[],
  },
  {
    label: 'Card',
    keys: ['card', 'card-foreground'] as (keyof ThemeColors)[],
  },
  {
    label: 'Popover',
    keys: ['popover', 'popover-foreground'] as (keyof ThemeColors)[],
  },
  {
    label: 'Border & Input',
    keys: ['border', 'input', 'ring'] as (keyof ThemeColors)[],
  },
  {
    label: 'Charts',
    keys: ['chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5'] as (keyof ThemeColors)[],
  },
  {
    label: 'Sidebar',
    keys: [
      'sidebar-background', 'sidebar-foreground', 'sidebar-primary',
      'sidebar-primary-foreground', 'sidebar-accent', 'sidebar-accent-foreground',
      'sidebar-border', 'sidebar-ring',
    ] as (keyof ThemeColors)[],
  },
];

// ============================================================
// Main Theme Editor
// ============================================================

export function ThemeEditor() {
  const { config, activeMode, activePreset, fontSans, fontMono, fontSerif } = useThemeStore();
  const currentColors = useThemeStore(selectCurrentColors);
  const { setActiveMode, updateColor, updateRadius, applyPreset, setFont } = useThemeStore();

  const [copied, setCopied] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isSavedThemesOpen, setIsSavedThemesOpen] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleApplyPreset = (preset: ThemePreset) => {
    applyPreset(preset);
  };

  const copyCSS = () => {
    navigator.clipboard.writeText(generateCSS(config));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCSSImport = (imported: { light: Record<string, string>; dark: Record<string, string> }) => {
    // For simplicity, we'll use setConfig through the store
    // In a real implementation, you'd want to add a method to the store for this
    const newConfig = {
      ...config,
      light: { ...config.light, ...imported.light as Partial<ThemeColors> } as ThemeColors,
      dark: { ...config.dark, ...imported.dark as Partial<ThemeColors> } as ThemeColors,
    };
    useThemeStore.setState({ config: newConfig, activePreset: 'custom' });
  };

  // Apply theme to preview container
  useEffect(() => {
    const el = previewRef.current;
    if (!el) return;
    applyThemeToElement(config, el, activeMode);
  }, [config, activeMode]);

  // Controls Panel Content
  const controlsPanel = (
    <div className="space-y-4">
      {/* Mode Toggle */}
      <div className="flex items-center gap-2 rounded-lg border bg-card p-2 shadow-sm">
        <Button
          variant={activeMode === 'light' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveMode('light')}
          className="flex-1"
        >
          <Sun className="mr-2 h-4 w-4" />
          Light
        </Button>
        <Button
          variant={activeMode === 'dark' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveMode('dark')}
          className="flex-1"
        >
          <Moon className="mr-2 h-4 w-4" />
          Dark
        </Button>
      </div>

      <Tabs defaultValue="colors">
        <TabsList className="w-full grid grid-cols-4">
          <TabsTrigger value="colors" className="text-xs">
            <Palette className="mr-1.5 h-3.5 w-3.5" />
            Colors
          </TabsTrigger>
          <TabsTrigger value="typography" className="text-xs">
            <Type className="mr-1.5 h-3.5 w-3.5" />
            Type
          </TabsTrigger>
          <TabsTrigger value="other" className="text-xs">
            <SlidersHorizontal className="mr-1.5 h-3.5 w-3.5" />
            Other
          </TabsTrigger>
          <TabsTrigger value="code" className="text-xs">
            <Code className="mr-1.5 h-3.5 w-3.5" />
            Code
          </TabsTrigger>
        </TabsList>

        <TabsContent value="colors" className="space-y-4 mt-4">
          {/* Presets */}
          <div>
            <label className="text-sm font-medium mb-2 block">Presets ({THEME_PRESETS.length})</label>
            <div className="grid grid-cols-3 gap-2 max-h-[320px] overflow-y-auto pr-1">
              {THEME_PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => handleApplyPreset(preset)}
                  className={cn(
                    'rounded-lg border p-2 text-xs font-medium transition-all hover:border-primary text-left',
                    activePreset === preset.name
                      ? 'border-primary bg-primary/5'
                      : 'border-border'
                  )}
                >
                  <div className="flex gap-1 mb-1.5">
                    <div
                      className="h-4 w-4 rounded-full border"
                      style={{ backgroundColor: preset.config.light.primary }}
                    />
                    <div
                      className="h-4 w-4 rounded-full border"
                      style={{ backgroundColor: preset.config.light.secondary }}
                    />
                    <div
                      className="h-4 w-4 rounded-full border"
                      style={{ backgroundColor: preset.config.light.accent }}
                    />
                  </div>
                  <span className="truncate block">{preset.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Color Groups */}
          {COLOR_GROUPS.map((group) => (
            <div key={group.label} className="rounded-lg border bg-card shadow-sm p-3">
              <h4 className="text-sm font-semibold mb-2">{group.label}</h4>
              <div className="space-y-1">
                {group.keys.map((key) => (
                  <ColorFocusIndicator key={key} colorKey={key}>
                    <ColorPickerEnhanced
                      label={toLabel(key)}
                      value={currentColors[key]}
                      onChange={(val) => updateColor(activeMode, key, val)}
                    />
                  </ColorFocusIndicator>
                ))}
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="typography" className="space-y-4 mt-4">
          <div className="rounded-lg border bg-card shadow-sm p-4 space-y-4">
            <h4 className="text-sm font-semibold">Font Families</h4>
            <FontPicker
              label="Sans Serif (--font-sans)"
              value={fontSans}
              onChange={(val) => setFont('sans', val)}
            />
            <FontPicker
              label="Serif (--font-serif)"
              value={fontSerif}
              onChange={(val) => setFont('serif', val)}
            />
            <FontPicker
              label="Monospace (--font-mono)"
              value={fontMono}
              onChange={(val) => setFont('mono', val)}
            />

            <div className="space-y-2 pt-2">
              <h4 className="text-sm font-semibold">Preview</h4>
              <div className="rounded-md border p-3">
                <p className="text-xs text-muted-foreground mb-1">Sans</p>
                <p className="text-lg" style={{ fontFamily: fontSans }}>
                  The quick brown fox jumps over the lazy dog
                </p>
              </div>
              <div className="rounded-md border p-3">
                <p className="text-xs text-muted-foreground mb-1">Serif</p>
                <p className="text-lg" style={{ fontFamily: fontSerif }}>
                  The quick brown fox jumps over the lazy dog
                </p>
              </div>
              <div className="rounded-md border p-3">
                <p className="text-xs text-muted-foreground mb-1">Mono</p>
                <p className="text-lg" style={{ fontFamily: fontMono }}>
                  The quick brown fox jumps over the lazy dog
                </p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="other" className="space-y-4 mt-4">
          {/* Contrast Checker */}
          <div className="rounded-lg border bg-card shadow-sm p-4">
            <ContrastChecker colors={currentColors as unknown as Record<string, string>} />
          </div>

          {/* CSS Import */}
          <div className="rounded-lg border bg-card shadow-sm p-4">
            <CSSImportDialog onImport={handleCSSImport} />
          </div>

          <div className="rounded-lg border bg-card shadow-sm p-4 space-y-4">
            <h4 className="text-sm font-semibold">Border Radius</h4>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="0"
                max="1.5"
                step="0.125"
                value={parseFloat(config.radius)}
                onChange={(e) => updateRadius(`${e.target.value}rem`)}
                className="flex-1"
              />
              <span className="text-sm font-mono w-16 text-right">{config.radius}</span>
            </div>
            <div className="flex gap-2">
              {['0rem', '0.375rem', '0.5rem', '0.625rem', '0.75rem', '1rem'].map((r) => (
                <button
                  key={r}
                  onClick={() => updateRadius(r)}
                  className={cn(
                    'rounded border px-2.5 py-1 text-xs',
                    config.radius === r
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  )}
                >
                  {r}
                </button>
              ))}
            </div>
            <div className="flex gap-2 mt-2">
              <div
                className="h-16 w-16 border-2 border-primary bg-primary/10"
                style={{ borderRadius: config.radius }}
              />
              <div
                className="h-16 flex-1 border-2 border-primary bg-primary/10"
                style={{ borderRadius: config.radius }}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="code" className="mt-4">
          <div className="rounded-lg border bg-card shadow-sm">
            <div className="flex items-center justify-between border-b bg-muted/50 px-4 py-2">
              <span className="text-sm font-medium">globals.css</span>
              <Button variant="ghost" size="sm" onClick={copyCSS}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <pre className="overflow-auto p-4 text-xs font-mono max-h-[60vh] bg-muted/20">
              {generateCSS(config)}
            </pre>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );

  // Preview Panel Content
  const previewPanel = (
    <div ref={previewRef} className="rounded-lg border overflow-hidden bg-background">
      <div className="flex items-center justify-between border-b bg-card px-4 py-2">
        <span className="text-sm font-medium">Preview</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setActiveMode(activeMode === 'light' ? 'dark' : 'light')}
        >
          {activeMode === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </Button>
      </div>
      <div className="p-6 min-h-[600px] overflow-auto bg-background text-foreground">
        <PreviewContainer />
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen">
      <ActionBar
        onExport={() => setIsExportOpen(true)}
        onShare={() => setIsShareOpen(true)}
        onSave={() => setIsSavedThemesOpen(true)}
        onImport={() => {
          // Trigger CSS import dialog
        }}
      />

      <div className="container max-w-screen-2xl py-6 flex-1 overflow-hidden">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Theme Editor</h1>
          <p className="text-muted-foreground mt-1">
            Customize your shadcn/ui theme with real-time preview. Export as CSS variables.
          </p>
        </div>

        {/* Desktop: Grid Layout */}
        <div className="hidden lg:grid lg:grid-cols-[380px_1fr] gap-6 h-[calc(100vh-200px)]">
          <div className="h-full overflow-y-auto">{controlsPanel}</div>
          <div className="h-full overflow-hidden">{previewPanel}</div>
        </div>

        {/* Mobile: Tab Switcher */}
        <div className="lg:hidden">
          <MobileThemeSwitcher
            controlsPanel={<div className="overflow-y-auto max-h-[calc(100vh-300px)]">{controlsPanel}</div>}
            previewPanel={previewPanel}
          />
        </div>
      </div>

      {/* Dialogs */}
      <ExportDialog open={isExportOpen} onOpenChange={setIsExportOpen} />
      <ShareDialog open={isShareOpen} onOpenChange={setIsShareOpen} />
      <SavedThemesManager open={isSavedThemesOpen} onOpenChange={setIsSavedThemesOpen} />
    </div>
  );
}
