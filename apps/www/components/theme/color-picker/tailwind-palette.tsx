'use client';

import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { getTailwindColorsByName, type ColorName } from '@/lib/theme/color-utils';
import { cn } from '@/lib/utils';

interface TailwindPaletteProps {
  onSelect: (color: string) => void;
  selectedColor?: string;
}

export function TailwindPalette({ onSelect, selectedColor }: TailwindPaletteProps) {
  const [search, setSearch] = useState('');
  const colors = getTailwindColorsByName();

  const filteredColors = Object.entries(colors).filter(([name]) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-3">
      <Input
        placeholder="Search colors..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="h-8"
      />

      <ScrollArea className="h-[300px]">
        <div className="space-y-4 pr-4">
          {filteredColors.map(([colorName, shades]) => (
            <div key={colorName}>
              <h4 className="text-xs font-medium mb-2 capitalize">{colorName}</h4>
              <div className="grid grid-cols-11 gap-1">
                {Object.entries(shades).map(([shade, hex]) => {
                  const isSelected = selectedColor?.toLowerCase() === hex.toLowerCase();
                  return (
                    <button
                      key={`${colorName}-${shade}`}
                      onClick={() => onSelect(hex)}
                      className={cn(
                        'h-8 w-full rounded border transition-all hover:scale-110 hover:shadow-lg relative group',
                        isSelected && 'ring-2 ring-primary ring-offset-2'
                      )}
                      style={{ backgroundColor: hex }}
                      title={`${colorName}-${shade}\n${hex}`}
                    >
                      {isSelected && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="h-1.5 w-1.5 rounded-full bg-white shadow-md" />
                        </div>
                      )}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block">
                        <div className="bg-popover text-popover-foreground text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
                          {shade}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
