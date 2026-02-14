'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Check, RotateCcw, Sun, Moon, Palette, Type, SlidersHorizontal, Code } from 'lucide-react';

// ============================================================
// Types
// ============================================================

interface ThemeColors {
  background: string;
  foreground: string;
  card: string;
  'card-foreground': string;
  popover: string;
  'popover-foreground': string;
  primary: string;
  'primary-foreground': string;
  secondary: string;
  'secondary-foreground': string;
  muted: string;
  'muted-foreground': string;
  accent: string;
  'accent-foreground': string;
  destructive: string;
  'destructive-foreground': string;
  border: string;
  input: string;
  ring: string;
  'chart-1': string;
  'chart-2': string;
  'chart-3': string;
  'chart-4': string;
  'chart-5': string;
  'sidebar-background': string;
  'sidebar-foreground': string;
  'sidebar-primary': string;
  'sidebar-primary-foreground': string;
  'sidebar-accent': string;
  'sidebar-accent-foreground': string;
  'sidebar-border': string;
  'sidebar-ring': string;
}

interface ThemeConfig {
  light: ThemeColors;
  dark: ThemeColors;
  radius: string;
}

interface ThemePreset {
  name: string;
  label: string;
  config: ThemeConfig;
}

// ============================================================
// Default Themes / Presets
// ============================================================

const defaultLight: ThemeColors = {
  background: '#ffffff',
  foreground: '#0a0a0a',
  card: '#ffffff',
  'card-foreground': '#0a0a0a',
  popover: '#ffffff',
  'popover-foreground': '#0a0a0a',
  primary: '#171717',
  'primary-foreground': '#fafafa',
  secondary: '#f5f5f5',
  'secondary-foreground': '#171717',
  muted: '#f5f5f5',
  'muted-foreground': '#737373',
  accent: '#f5f5f5',
  'accent-foreground': '#171717',
  destructive: '#ef4444',
  'destructive-foreground': '#fafafa',
  border: '#e5e5e5',
  input: '#e5e5e5',
  ring: '#171717',
  'chart-1': '#e76e50',
  'chart-2': '#2a9d90',
  'chart-3': '#274754',
  'chart-4': '#e8c468',
  'chart-5': '#f4a462',
  'sidebar-background': '#fafafa',
  'sidebar-foreground': '#0a0a0a',
  'sidebar-primary': '#171717',
  'sidebar-primary-foreground': '#fafafa',
  'sidebar-accent': '#f5f5f5',
  'sidebar-accent-foreground': '#171717',
  'sidebar-border': '#e5e5e5',
  'sidebar-ring': '#171717',
};

const defaultDark: ThemeColors = {
  background: '#0a0a0a',
  foreground: '#fafafa',
  card: '#0a0a0a',
  'card-foreground': '#fafafa',
  popover: '#0a0a0a',
  'popover-foreground': '#fafafa',
  primary: '#fafafa',
  'primary-foreground': '#171717',
  secondary: '#262626',
  'secondary-foreground': '#fafafa',
  muted: '#262626',
  'muted-foreground': '#a3a3a3',
  accent: '#262626',
  'accent-foreground': '#fafafa',
  destructive: '#7f1d1d',
  'destructive-foreground': '#fafafa',
  border: '#262626',
  input: '#262626',
  ring: '#d4d4d4',
  'chart-1': '#2563eb',
  'chart-2': '#16a34a',
  'chart-3': '#e5e7eb',
  'chart-4': '#8b5cf6',
  'chart-5': '#f59e0b',
  'sidebar-background': '#171717',
  'sidebar-foreground': '#fafafa',
  'sidebar-primary': '#fafafa',
  'sidebar-primary-foreground': '#171717',
  'sidebar-accent': '#262626',
  'sidebar-accent-foreground': '#fafafa',
  'sidebar-border': '#262626',
  'sidebar-ring': '#d4d4d4',
};

const PRESETS: ThemePreset[] = [
  {
    name: 'default',
    label: 'Default',
    config: { light: defaultLight, dark: defaultDark, radius: '0.625rem' },
  },
  {
    name: 'blue',
    label: 'Ocean Blue',
    config: {
      light: {
        ...defaultLight,
        primary: '#2563eb',
        'primary-foreground': '#ffffff',
        ring: '#2563eb',
        'sidebar-primary': '#2563eb',
      },
      dark: {
        ...defaultDark,
        primary: '#3b82f6',
        'primary-foreground': '#ffffff',
        ring: '#3b82f6',
        'sidebar-primary': '#3b82f6',
      },
      radius: '0.5rem',
    },
  },
  {
    name: 'violet',
    label: 'Violet Bloom',
    config: {
      light: {
        ...defaultLight,
        primary: '#7c3aed',
        'primary-foreground': '#ffffff',
        ring: '#7c3aed',
        accent: '#f3e8ff',
        'accent-foreground': '#6b21a8',
        'sidebar-primary': '#7c3aed',
      },
      dark: {
        ...defaultDark,
        primary: '#8b5cf6',
        'primary-foreground': '#ffffff',
        ring: '#8b5cf6',
        accent: '#1e1b4b',
        'accent-foreground': '#c4b5fd',
        'sidebar-primary': '#8b5cf6',
      },
      radius: '0.75rem',
    },
  },
  {
    name: 'emerald',
    label: 'Emerald',
    config: {
      light: {
        ...defaultLight,
        primary: '#059669',
        'primary-foreground': '#ffffff',
        ring: '#059669',
        'sidebar-primary': '#059669',
      },
      dark: {
        ...defaultDark,
        primary: '#10b981',
        'primary-foreground': '#ffffff',
        ring: '#10b981',
        'sidebar-primary': '#10b981',
      },
      radius: '0.5rem',
    },
  },
  {
    name: 'rose',
    label: 'Rose',
    config: {
      light: {
        ...defaultLight,
        primary: '#e11d48',
        'primary-foreground': '#ffffff',
        ring: '#e11d48',
        destructive: '#dc2626',
        'sidebar-primary': '#e11d48',
      },
      dark: {
        ...defaultDark,
        primary: '#fb7185',
        'primary-foreground': '#1c1917',
        ring: '#fb7185',
        'sidebar-primary': '#fb7185',
      },
      radius: '0.625rem',
    },
  },
  {
    name: 'amber',
    label: 'Amber Warmth',
    config: {
      light: {
        ...defaultLight,
        primary: '#d97706',
        'primary-foreground': '#ffffff',
        ring: '#d97706',
        accent: '#fef3c7',
        'accent-foreground': '#92400e',
        'sidebar-primary': '#d97706',
      },
      dark: {
        ...defaultDark,
        primary: '#f59e0b',
        'primary-foreground': '#1c1917',
        ring: '#f59e0b',
        accent: '#451a03',
        'accent-foreground': '#fbbf24',
        'sidebar-primary': '#f59e0b',
      },
      radius: '0.75rem',
    },
  },
];

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
// Helpers
// ============================================================

function hexToHsl(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '0 0% 0%';
  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

function toLabel(key: string): string {
  return key
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function generateCSS(config: ThemeConfig): string {
  const lines: string[] = ['@layer base {', '  :root {'];
  for (const [key, value] of Object.entries(config.light)) {
    lines.push(`    --${key}: ${hexToHsl(value)};`);
  }
  lines.push(`    --radius: ${config.radius};`);
  lines.push('  }', '', '  .dark {');
  for (const [key, value] of Object.entries(config.dark)) {
    lines.push(`    --${key}: ${hexToHsl(value)};`);
  }
  lines.push('  }', '}');
  return lines.join('\n');
}

// ============================================================
// Color Picker Input
// ============================================================

function ColorInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="flex items-center gap-3 py-1">
      <div className="relative">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-8 w-8 cursor-pointer rounded-md border border-border bg-transparent p-0.5"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-medium text-foreground truncate">{label}</div>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            const v = e.target.value;
            if (/^#[0-9a-fA-F]{6}$/.test(v)) onChange(v);
          }}
          className="w-full text-xs text-muted-foreground bg-transparent border-none p-0 font-mono focus:outline-none"
          placeholder="#000000"
        />
      </div>
    </div>
  );
}

// ============================================================
// Preview Components
// ============================================================

function PreviewCard({ style }: { style: React.CSSProperties }) {
  return (
    <div style={style} className="space-y-6">
      {/* Card */}
      <div
        className="rounded-lg border p-6"
        style={{
          backgroundColor: 'hsl(var(--card))',
          color: 'hsl(var(--card-foreground))',
          borderColor: 'hsl(var(--border))',
        }}
      >
        <h3 className="text-lg font-semibold">Card Title</h3>
        <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
          This is a card description to show how your theme looks.
        </p>
        <div className="mt-4 flex gap-2">
          <button
            className="rounded-md px-4 py-2 text-sm font-medium"
            style={{
              backgroundColor: 'hsl(var(--primary))',
              color: 'hsl(var(--primary-foreground))',
            }}
          >
            Primary
          </button>
          <button
            className="rounded-md px-4 py-2 text-sm font-medium"
            style={{
              backgroundColor: 'hsl(var(--secondary))',
              color: 'hsl(var(--secondary-foreground))',
            }}
          >
            Secondary
          </button>
          <button
            className="rounded-md px-4 py-2 text-sm font-medium"
            style={{
              backgroundColor: 'hsl(var(--destructive))',
              color: 'hsl(var(--destructive-foreground))',
            }}
          >
            Destructive
          </button>
        </div>
      </div>

      {/* Form Elements */}
      <div
        className="rounded-lg border p-6"
        style={{
          backgroundColor: 'hsl(var(--card))',
          color: 'hsl(var(--card-foreground))',
          borderColor: 'hsl(var(--border))',
        }}
      >
        <h3 className="text-lg font-semibold mb-4">Form Elements</h3>
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="hello@example.com"
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
              style={{
                backgroundColor: 'hsl(var(--background))',
                borderColor: 'hsl(var(--input))',
                color: 'hsl(var(--foreground))',
              }}
            />
          </div>
          <div className="flex items-center gap-2">
            <div
              className="h-5 w-5 rounded-md border"
              style={{
                backgroundColor: 'hsl(var(--primary))',
                borderColor: 'hsl(var(--primary))',
              }}
            />
            <span className="text-sm">Accept terms and conditions</span>
          </div>
        </div>
      </div>

      {/* Badges & Alerts */}
      <div
        className="rounded-lg border p-6"
        style={{
          backgroundColor: 'hsl(var(--card))',
          borderColor: 'hsl(var(--border))',
        }}
      >
        <h3 className="text-lg font-semibold mb-4" style={{ color: 'hsl(var(--card-foreground))' }}>
          Badges & Alerts
        </h3>
        <div className="flex flex-wrap gap-2 mb-4">
          <span
            className="rounded-full px-3 py-1 text-xs font-medium"
            style={{ backgroundColor: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}
          >
            Primary
          </span>
          <span
            className="rounded-full px-3 py-1 text-xs font-medium"
            style={{ backgroundColor: 'hsl(var(--secondary))', color: 'hsl(var(--secondary-foreground))' }}
          >
            Secondary
          </span>
          <span
            className="rounded-full px-3 py-1 text-xs font-medium"
            style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}
          >
            Accent
          </span>
          <span
            className="rounded-full px-3 py-1 text-xs font-medium"
            style={{ backgroundColor: 'hsl(var(--destructive))', color: 'hsl(var(--destructive-foreground))' }}
          >
            Destructive
          </span>
          <span
            className="rounded-full border px-3 py-1 text-xs font-medium"
            style={{ borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }}
          >
            Outline
          </span>
        </div>
        <div
          className="rounded-md border p-4"
          style={{
            backgroundColor: 'hsl(var(--muted))',
            borderColor: 'hsl(var(--border))',
            color: 'hsl(var(--muted-foreground))',
          }}
        >
          <p className="text-sm font-medium" style={{ color: 'hsl(var(--foreground))' }}>
            Muted Alert
          </p>
          <p className="text-sm">This is an informational alert using muted colors.</p>
        </div>
      </div>

      {/* Color Palette */}
      <div
        className="rounded-lg border p-6"
        style={{
          backgroundColor: 'hsl(var(--card))',
          borderColor: 'hsl(var(--border))',
        }}
      >
        <h3 className="text-lg font-semibold mb-4" style={{ color: 'hsl(var(--card-foreground))' }}>
          Color Palette
        </h3>
        <div className="grid grid-cols-5 gap-2">
          {['chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5'].map((c) => (
            <div key={c} className="space-y-1">
              <div
                className="h-12 w-full rounded-md"
                style={{ backgroundColor: `hsl(var(--${c}))` }}
              />
              <p className="text-xs text-center" style={{ color: 'hsl(var(--muted-foreground))' }}>
                {c.replace('chart-', 'Chart ')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Main Theme Editor
// ============================================================

export function ThemeEditor() {
  const [config, setConfig] = useState<ThemeConfig>(PRESETS[0].config);
  const [activeMode, setActiveMode] = useState<'light' | 'dark'>('light');
  const [activePreset, setActivePreset] = useState('default');
  const [copied, setCopied] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const currentColors = activeMode === 'light' ? config.light : config.dark;

  const updateColor = useCallback(
    (key: keyof ThemeColors, value: string) => {
      setConfig((prev) => ({
        ...prev,
        [activeMode]: { ...prev[activeMode], [key]: value },
      }));
      setActivePreset('custom');
    },
    [activeMode]
  );

  const applyPreset = useCallback((preset: ThemePreset) => {
    setConfig(preset.config);
    setActivePreset(preset.name);
  }, []);

  const resetToDefault = useCallback(() => {
    applyPreset(PRESETS[0]);
  }, [applyPreset]);

  const copyCSS = useCallback(() => {
    navigator.clipboard.writeText(generateCSS(config));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [config]);

  // Apply theme to preview container
  useEffect(() => {
    const el = previewRef.current;
    if (!el) return;
    const colors = activeMode === 'light' ? config.light : config.dark;
    for (const [key, value] of Object.entries(colors)) {
      el.style.setProperty(`--${key}`, hexToHsl(value));
    }
    el.style.setProperty('--radius', config.radius);
    if (activeMode === 'dark') {
      el.classList.add('dark');
    } else {
      el.classList.remove('dark');
    }
  }, [config, activeMode]);

  return (
    <div className="container max-w-screen-2xl py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Theme Editor</h1>
          <p className="text-muted-foreground mt-1">
            Customize your shadcn/ui theme with real-time preview. Export as CSS variables.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={resetToDefault}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
          <Button size="sm" onClick={copyCSS}>
            {copied ? (
              <Check className="mr-2 h-4 w-4" />
            ) : (
              <Copy className="mr-2 h-4 w-4" />
            )}
            {copied ? 'Copied!' : 'Copy CSS'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">
        {/* Controls Panel */}
        <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-12rem)]">
          {/* Mode Toggle */}
          <div className="flex items-center gap-2 rounded-lg border p-2">
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
            <TabsList className="w-full">
              <TabsTrigger value="colors" className="flex-1">
                <Palette className="mr-1.5 h-3.5 w-3.5" />
                Colors
              </TabsTrigger>
              <TabsTrigger value="typography" className="flex-1">
                <Type className="mr-1.5 h-3.5 w-3.5" />
                Typography
              </TabsTrigger>
              <TabsTrigger value="other" className="flex-1">
                <SlidersHorizontal className="mr-1.5 h-3.5 w-3.5" />
                Other
              </TabsTrigger>
              <TabsTrigger value="code" className="flex-1">
                <Code className="mr-1.5 h-3.5 w-3.5" />
                Code
              </TabsTrigger>
            </TabsList>

            <TabsContent value="colors" className="space-y-4 mt-4">
              {/* Presets */}
              <div>
                <label className="text-sm font-medium mb-2 block">Presets</label>
                <div className="grid grid-cols-3 gap-2">
                  {PRESETS.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => applyPreset(preset)}
                      className={cn(
                        'rounded-lg border p-2 text-xs font-medium transition-all hover:border-primary',
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
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Groups */}
              {COLOR_GROUPS.map((group) => (
                <div key={group.label} className="rounded-lg border p-3">
                  <h4 className="text-sm font-semibold mb-2">{group.label}</h4>
                  <div className="space-y-1">
                    {group.keys.map((key) => (
                      <ColorInput
                        key={key}
                        label={toLabel(key)}
                        value={currentColors[key]}
                        onChange={(val) => updateColor(key, val)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="typography" className="space-y-4 mt-4">
              <div className="rounded-lg border p-4 space-y-4">
                <h4 className="text-sm font-semibold">Font Family</h4>
                <p className="text-xs text-muted-foreground">
                  Font configuration is handled via your Tailwind CSS config and CSS imports.
                  The theme editor focuses on color customization.
                </p>
                <div className="space-y-2">
                  <div className="rounded-md border p-3">
                    <p className="text-xs text-muted-foreground mb-1">Sans (default)</p>
                    <p className="text-lg font-sans">The quick brown fox jumps over the lazy dog</p>
                  </div>
                  <div className="rounded-md border p-3">
                    <p className="text-xs text-muted-foreground mb-1">Mono</p>
                    <p className="text-lg font-mono">The quick brown fox jumps over the lazy dog</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="other" className="space-y-4 mt-4">
              <div className="rounded-lg border p-4 space-y-4">
                <h4 className="text-sm font-semibold">Border Radius</h4>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="0"
                    max="1.5"
                    step="0.125"
                    value={parseFloat(config.radius)}
                    onChange={(e) => {
                      setConfig((prev) => ({
                        ...prev,
                        radius: `${e.target.value}rem`,
                      }));
                      setActivePreset('custom');
                    }}
                    className="flex-1"
                  />
                  <span className="text-sm font-mono w-16 text-right">{config.radius}</span>
                </div>
                <div className="flex gap-2">
                  {['0rem', '0.375rem', '0.5rem', '0.625rem', '0.75rem', '1rem'].map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        setConfig((prev) => ({ ...prev, radius: r }));
                        setActivePreset('custom');
                      }}
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
              <div className="rounded-lg border">
                <div className="flex items-center justify-between border-b px-4 py-2">
                  <span className="text-sm font-medium">globals.css</span>
                  <Button variant="ghost" size="sm" onClick={copyCSS}>
                    {copied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <pre className="overflow-auto p-4 text-xs font-mono max-h-[60vh]">
                  {generateCSS(config)}
                </pre>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Preview Panel */}
        <div className="rounded-lg border overflow-hidden">
          <div className="flex items-center justify-between border-b px-4 py-2">
            <span className="text-sm font-medium">Preview</span>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveMode(activeMode === 'light' ? 'dark' : 'light')}
              >
                {activeMode === 'light' ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          <div
            ref={previewRef}
            className="p-6 min-h-[600px] overflow-auto"
            style={{
              backgroundColor: `hsl(${hexToHsl(currentColors.background)})`,
              color: `hsl(${hexToHsl(currentColors.foreground)})`,
            }}
          >
            <PreviewCard style={{}} />
          </div>
        </div>
      </div>
    </div>
  );
}
