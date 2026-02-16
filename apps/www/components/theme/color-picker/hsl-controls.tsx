'use client';

import { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { hexToHsl, hslToHex } from '@/lib/theme/apply-theme';
import { HSL_PRESETS } from '@/lib/theme/color-utils';
import { cn } from '@/lib/utils';

interface HSLControlsProps {
  color: string;
  onChange: (color: string) => void;
}

export function HSLControls({ color, onChange }: HSLControlsProps) {
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(0);
  const [lightness, setLightness] = useState(0);

  // Parse HSL from hex color
  useEffect(() => {
    const hsl = hexToHsl(color);
    const match = hsl.match(/(\d+)\s+(\d+)%\s+(\d+)%/);
    if (match) {
      setHue(parseInt(match[1]));
      setSaturation(parseInt(match[2]));
      setLightness(parseInt(match[3]));
    }
  }, [color]);

  const handleHueChange = (value: number[]) => {
    const newHue = value[0];
    setHue(newHue);
    const newHex = hslToHex(`${newHue} ${saturation}% ${lightness}%`);
    onChange(newHex);
  };

  const handleSaturationChange = (value: number[]) => {
    const newSaturation = value[0];
    setSaturation(newSaturation);
    const newHex = hslToHex(`${hue} ${newSaturation}% ${lightness}%`);
    onChange(newHex);
  };

  const handleLightnessChange = (value: number[]) => {
    const newLightness = value[0];
    setLightness(newLightness);
    const newHex = hslToHex(`${hue} ${saturation}% ${newLightness}%`);
    onChange(newHex);
  };

  const applyPreset = (preset: (typeof HSL_PRESETS)[number]) => {
    const newColor = preset.fn(color);
    onChange(newColor);
  };

  return (
    <div className="space-y-4">
      {/* HSL Sliders */}
      <div className="space-y-3">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium">Hue</label>
            <span className="text-xs text-muted-foreground font-mono">{hue}°</span>
          </div>
          <Slider
            value={[hue]}
            onValueChange={handleHueChange}
            min={0}
            max={360}
            step={1}
            className="w-full"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium">Saturation</label>
            <span className="text-xs text-muted-foreground font-mono">{saturation}%</span>
          </div>
          <Slider
            value={[saturation]}
            onValueChange={handleSaturationChange}
            min={0}
            max={100}
            step={1}
            className="w-full"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium">Lightness</label>
            <span className="text-xs text-muted-foreground font-mono">{lightness}%</span>
          </div>
          <Slider
            value={[lightness]}
            onValueChange={handleLightnessChange}
            min={0}
            max={100}
            step={1}
            className="w-full"
          />
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="pt-2 border-t">
        <h4 className="text-xs font-medium mb-2">Quick Adjustments</h4>
        <div className="grid grid-cols-3 gap-1.5">
          {HSL_PRESETS.map((preset, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => applyPreset(preset)}
              className="h-7 text-xs px-2"
            >
              {preset.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
