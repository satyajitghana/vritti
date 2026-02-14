"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";
import * as React from "react";
import { cn } from "@/lib/utils";

// ---- Color types and conversion utilities ----

type ColorFormat = "hex" | "rgb" | "hsl";

interface ColorValue {
  r: number;
  g: number;
  b: number;
  a: number;
}

interface HSVColorValue {
  h: number;
  s: number;
  v: number;
  a: number;
}

function hexToRgb(hex: string, alpha?: number): ColorValue {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: Number.parseInt(result[1] ?? "0", 16),
        g: Number.parseInt(result[2] ?? "0", 16),
        b: Number.parseInt(result[3] ?? "0", 16),
        a: alpha ?? 1,
      }
    : { r: 0, g: 0, b: 0, a: alpha ?? 1 };
}

function rgbToHex(color: ColorValue): string {
  const toHex = (n: number) => {
    const hex = Math.round(n).toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };
  return `#${toHex(color.r)}${toHex(color.g)}${toHex(color.b)}`;
}

function rgbToHsv(color: ColorValue): HSVColorValue {
  const r = color.r / 255;
  const g = color.g / 255;
  const b = color.b / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;
  let h = 0;
  if (diff !== 0) {
    switch (max) {
      case r:
        h = ((g - b) / diff) % 6;
        break;
      case g:
        h = (b - r) / diff + 2;
        break;
      case b:
        h = (r - g) / diff + 4;
        break;
    }
  }
  h = Math.round(h * 60);
  if (h < 0) h += 360;
  const s = max === 0 ? 0 : diff / max;
  const v = max;
  return { h, s: Math.round(s * 100), v: Math.round(v * 100), a: color.a };
}

function hsvToRgb(hsv: HSVColorValue): ColorValue {
  const h = hsv.h / 360;
  const s = hsv.s / 100;
  const v = hsv.v / 100;
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  let r = 0, g = 0, b = 0;
  switch (i % 6) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    case 5: r = v; g = p; b = q; break;
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
    a: hsv.a,
  };
}

function rgbToHsl(color: ColorValue) {
  const r = color.r / 255;
  const g = color.g / 255;
  const b = color.b / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;
  const sum = max + min;
  const l = sum / 2;
  let h = 0, s = 0;
  if (diff !== 0) {
    s = l > 0.5 ? diff / (2 - sum) : diff / sum;
    if (max === r) h = (g - b) / diff + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / diff + 2;
    else if (max === b) h = (r - g) / diff + 4;
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function parseColorString(value: string): ColorValue | null {
  const trimmed = value.trim();
  if (trimmed.startsWith("#")) {
    const hexMatch = trimmed.match(/^#([a-fA-F0-9]{3}|[a-fA-F0-9]{6})$/);
    if (hexMatch) return hexToRgb(trimmed);
  }
  const rgbMatch = trimmed.match(
    /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+))?\s*\)$/,
  );
  if (rgbMatch) {
    return {
      r: Number.parseInt(rgbMatch[1] ?? "0", 10),
      g: Number.parseInt(rgbMatch[2] ?? "0", 10),
      b: Number.parseInt(rgbMatch[3] ?? "0", 10),
      a: rgbMatch[4] ? Number.parseFloat(rgbMatch[4]) : 1,
    };
  }
  return null;
}

// ---- Main component ----

interface ColorPickerProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

function ColorPicker({
  value: valueProp,
  defaultValue = "#3b82f6",
  onValueChange,
  className,
}: ColorPickerProps) {
  const initialColor = hexToRgb(valueProp ?? defaultValue);
  const [color, setColor] = React.useState<ColorValue>(initialColor);
  const [hsv, setHsv] = React.useState<HSVColorValue>(rgbToHsv(initialColor));
  const [hexInput, setHexInput] = React.useState(rgbToHex(initialColor));

  React.useEffect(() => {
    if (valueProp) {
      const c = hexToRgb(valueProp, color.a);
      setColor(c);
      setHsv(rgbToHsv(c));
      setHexInput(valueProp);
    }
  }, [valueProp]);

  const updateFromHsv = React.useCallback(
    (newHsv: HSVColorValue) => {
      setHsv(newHsv);
      const newColor = hsvToRgb(newHsv);
      setColor(newColor);
      const hex = rgbToHex(newColor);
      setHexInput(hex);
      onValueChange?.(hex);
    },
    [onValueChange],
  );

  const isDraggingRef = React.useRef(false);
  const areaRef = React.useRef<HTMLDivElement>(null);

  const updateColorFromPosition = React.useCallback(
    (clientX: number, clientY: number) => {
      if (!areaRef.current) return;
      const rect = areaRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, 1 - (clientY - rect.top) / rect.height));
      updateFromHsv({ h: hsv.h, s: Math.round(x * 100), v: Math.round(y * 100), a: hsv.a });
    },
    [hsv.h, hsv.a, updateFromHsv],
  );

  const onAreaPointerDown = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      isDraggingRef.current = true;
      areaRef.current?.setPointerCapture(event.pointerId);
      updateColorFromPosition(event.clientX, event.clientY);
    },
    [updateColorFromPosition],
  );

  const onAreaPointerMove = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (isDraggingRef.current) {
        updateColorFromPosition(event.clientX, event.clientY);
      }
    },
    [updateColorFromPosition],
  );

  const onAreaPointerUp = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      isDraggingRef.current = false;
      areaRef.current?.releasePointerCapture(event.pointerId);
    },
    [],
  );

  const backgroundHue = hsvToRgb({ h: hsv.h, s: 100, v: 100, a: 1 });

  const onHueChange = React.useCallback(
    (values: number[]) => {
      updateFromHsv({ ...hsv, h: values[0] ?? 0 });
    },
    [hsv, updateFromHsv],
  );

  const onHexInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setHexInput(val);
      const parsed = parseColorString(val);
      if (parsed) {
        setColor(parsed);
        setHsv(rgbToHsv(parsed));
        onValueChange?.(rgbToHex(parsed));
      }
    },
    [onValueChange],
  );

  const hsl = rgbToHsl(color);
  const hexValue = rgbToHex(color);

  return (
    <div className={cn("flex w-[300px] flex-col gap-3 rounded-lg border bg-popover p-4 shadow-md", className)}>
      {/* Color area */}
      <div
        ref={areaRef}
        className="relative h-40 w-full cursor-crosshair touch-none rounded-sm border"
        onPointerDown={onAreaPointerDown}
        onPointerMove={onAreaPointerMove}
        onPointerUp={onAreaPointerUp}
      >
        <div className="absolute inset-0 overflow-hidden rounded-sm">
          <div
            className="absolute inset-0"
            style={{ backgroundColor: `rgb(${backgroundHue.r}, ${backgroundHue.g}, ${backgroundHue.b})` }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #fff, transparent)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent, #000)" }} />
        </div>
        <div
          className="absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-sm"
          style={{ left: `${hsv.s}%`, top: `${100 - hsv.v}%` }}
        />
      </div>

      {/* Hue slider */}
      <SliderPrimitive.Root
        max={360}
        step={1}
        className="relative flex w-full touch-none select-none items-center"
        value={[hsv.h]}
        onValueChange={onHueChange}
      >
        <SliderPrimitive.Track className="relative h-3 w-full grow overflow-hidden rounded-full bg-[linear-gradient(to_right,#ff0000_0%,#ffff00_16.66%,#00ff00_33.33%,#00ffff_50%,#0000ff_66.66%,#ff00ff_83.33%,#ff0000_100%)]">
          <SliderPrimitive.Range className="absolute h-full" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="block size-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
      </SliderPrimitive.Root>

      {/* Color info */}
      <div className="flex items-center gap-3">
        <div
          className="size-8 shrink-0 rounded-sm border shadow-sm"
          style={{ backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})` }}
        />
        <input
          className="h-8 flex-1 rounded-md border border-input bg-transparent px-2 font-mono text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          value={hexInput}
          onChange={onHexInputChange}
          placeholder="#000000"
        />
      </div>

      {/* Color values */}
      <div className="flex gap-2 text-xs text-muted-foreground">
        <span>RGB: {color.r}, {color.g}, {color.b}</span>
        <span>HSL: {hsl.h}, {hsl.s}%, {hsl.l}%</span>
      </div>
    </div>
  );
}

export { ColorPicker, type ColorPickerProps };
