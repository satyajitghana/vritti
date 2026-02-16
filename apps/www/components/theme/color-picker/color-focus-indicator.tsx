'use client';

import { useEffect, useRef } from 'react';
import { useColorFocusStore } from '@/lib/stores/color-focus-store';
import type { ThemeColors } from '@/lib/theme-presets';
import { cn } from '@/lib/utils';

interface ColorFocusIndicatorProps {
  colorKey: keyof ThemeColors;
  children: React.ReactNode;
  className?: string;
}

export function ColorFocusIndicator({
  colorKey,
  children,
  className,
}: ColorFocusIndicatorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { focusedColorKey, shouldAnimate } = useColorFocusStore();

  const isFocused = focusedColorKey === colorKey;

  useEffect(() => {
    if (isFocused && shouldAnimate && ref.current) {
      // Scroll into view
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [isFocused, shouldAnimate]);

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-300',
        isFocused && shouldAnimate && 'bg-primary/10 ring-2 ring-primary -m-1.5 mb-1.5 rounded-sm p-1.5',
        className
      )}
    >
      {children}
    </div>
  );
}
