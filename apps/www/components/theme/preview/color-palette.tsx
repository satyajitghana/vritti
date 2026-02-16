'use client';

import { useThemeStore, selectCurrentColors } from '@/lib/stores/theme-store';
import { hexToHsl } from '@/lib/theme/apply-theme';
import { toLabel } from '@/lib/theme/color-utils';
import { useColorFocusStore } from '@/lib/stores/color-focus-store';
import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ThemeColors } from '@/lib/theme-presets';

export function ColorPalette() {
  const currentColors = useThemeStore(selectCurrentColors);
  const { focusColor } = useColorFocusStore();

  const colorGroups = [
    {
      label: 'Base Colors',
      colors: ['background', 'foreground'] as (keyof ThemeColors)[],
    },
    {
      label: 'Primary',
      colors: ['primary', 'primary-foreground'] as (keyof ThemeColors)[],
    },
    {
      label: 'Secondary',
      colors: ['secondary', 'secondary-foreground'] as (keyof ThemeColors)[],
    },
    {
      label: 'Accent',
      colors: ['accent', 'accent-foreground'] as (keyof ThemeColors)[],
    },
    {
      label: 'Muted',
      colors: ['muted', 'muted-foreground'] as (keyof ThemeColors)[],
    },
    {
      label: 'Destructive',
      colors: ['destructive', 'destructive-foreground'] as (keyof ThemeColors)[],
    },
    {
      label: 'Card',
      colors: ['card', 'card-foreground'] as (keyof ThemeColors)[],
    },
    {
      label: 'Popover',
      colors: ['popover', 'popover-foreground'] as (keyof ThemeColors)[],
    },
    {
      label: 'Borders & Input',
      colors: ['border', 'input', 'ring'] as (keyof ThemeColors)[],
    },
    {
      label: 'Charts',
      colors: ['chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5'] as (keyof ThemeColors)[],
    },
    {
      label: 'Sidebar',
      colors: [
        'sidebar-background',
        'sidebar-foreground',
        'sidebar-primary',
        'sidebar-primary-foreground',
        'sidebar-accent',
        'sidebar-accent-foreground',
        'sidebar-border',
        'sidebar-ring',
      ] as (keyof ThemeColors)[],
    },
  ];

  const handleEditClick = (colorKey: keyof ThemeColors) => {
    focusColor(colorKey);
  };

  return (
    <div className="space-y-6">
      {colorGroups.map((group) => (
        <div key={group.label}>
          <h3 className="text-sm font-semibold mb-3">{group.label}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {group.colors.map((colorKey) => {
              const hexColor = currentColors[colorKey];
              const hslColor = hexToHsl(hexColor);

              return (
                <div
                  key={colorKey}
                  className="group rounded-lg border p-4 transition-all hover:shadow-md"
                  style={{
                    backgroundColor: 'hsl(var(--card))',
                    borderColor: 'hsl(var(--border))',
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="h-12 w-12 rounded-md border flex-shrink-0"
                      style={{
                        backgroundColor: hexColor,
                        borderColor: 'hsl(var(--border))',
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-medium truncate">{toLabel(colorKey)}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditClick(colorKey)}
                          className="h-7 px-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Pencil className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="mt-1 space-y-0.5">
                        <p className="text-xs font-mono text-muted-foreground">{hexColor}</p>
                        <p className="text-xs font-mono text-muted-foreground">hsl({hslColor})</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
