'use client';

import { useRef, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Palette, Sliders } from 'lucide-react';
import { TailwindPalette } from './tailwind-palette';
import { HSLControls } from './hsl-controls';
import { cn } from '@/lib/utils';

interface ColorPickerEnhancedProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function ColorPickerEnhanced({
  label,
  value,
  onChange,
  className,
}: ColorPickerEnhancedProps) {
  const [isOpen, setIsOpen] = useState(false);
  const textInputRef = useRef<HTMLInputElement>(null);

  const handleColorChange = (newColor: string) => {
    onChange(newColor);
  };

  const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    if (/^#[0-9a-fA-F]{6}$/.test(v)) {
      onChange(v);
    }
  };

  return (
    <div className={cn('mb-3', className)}>
      <div className="mb-1.5 flex items-center justify-between">
        <label className="text-xs font-medium">{label}</label>
      </div>
      <div className="relative flex items-center gap-1">
        {/* Styled swatch with hidden native color input */}
        <div
          className="relative flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded border"
          style={{ backgroundColor: value }}
        >
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />
        </div>

        {/* Hex input */}
        <input
          ref={textInputRef}
          type="text"
          value={value}
          onChange={handleTextInputChange}
          className="h-8 flex-1 rounded border border-border/20 bg-input/25 px-2 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-ring"
          placeholder="#000000"
        />

        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Palette className="h-3.5 w-3.5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[400px]" align="end">
            <Tabs defaultValue="palette" className="w-full">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="palette" className="text-xs">
                  <Palette className="h-3.5 w-3.5 mr-1.5" />
                  Palette
                </TabsTrigger>
                <TabsTrigger value="adjust" className="text-xs">
                  <Sliders className="h-3.5 w-3.5 mr-1.5" />
                  Adjust
                </TabsTrigger>
              </TabsList>

              <TabsContent value="palette" className="mt-3">
                <TailwindPalette
                  onSelect={(color) => {
                    handleColorChange(color);
                    setIsOpen(false);
                  }}
                  selectedColor={value}
                />
              </TabsContent>

              <TabsContent value="adjust" className="mt-3">
                <HSLControls color={value} onChange={handleColorChange} />
              </TabsContent>
            </Tabs>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
