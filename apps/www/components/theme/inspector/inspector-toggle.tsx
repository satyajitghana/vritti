'use client';

import { Button } from '@/components/ui/button';
import { useInspectorStore } from '@/lib/stores/inspector-store';
import { MousePointer2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function InspectorToggle() {
  const { isActive, toggleInspector } = useInspectorStore();

  return (
    <Button
      variant={isActive ? 'default' : 'outline'}
      size="sm"
      onClick={toggleInspector}
      className={cn('gap-2', isActive && 'bg-primary text-primary-foreground')}
    >
      <MousePointer2 className="h-4 w-4" />
      {isActive ? 'Inspecting...' : 'Inspect'}
    </Button>
  );
}
