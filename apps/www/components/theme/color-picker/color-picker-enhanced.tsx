'use client';

import { useState } from 'react';
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
    <div className={cn('flex items-center gap-3 py-1', className)}>
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
          onChange={handleTextInputChange}
          className="w-full text-xs text-muted-foreground bg-transparent border-none p-0 font-mono focus:outline-none"
          placeholder="#000000"
        />
      </div>

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm" className="h-7 px-2">
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
  );
}
