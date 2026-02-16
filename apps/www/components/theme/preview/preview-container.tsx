'use client';

import { lazy, Suspense } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';

// Lazy load preview components for better performance
const ComponentsPreview = lazy(() =>
  import('./components-preview').then((mod) => ({ default: mod.ComponentsPreview }))
);
const ColorPalette = lazy(() =>
  import('./color-palette').then((mod) => ({ default: mod.ColorPalette }))
);
const TypographyPreview = lazy(() =>
  import('./typography-preview').then((mod) => ({ default: mod.TypographyPreview }))
);

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
    </div>
  );
}

export function PreviewContainer() {
  return (
    <Tabs defaultValue="components" className="w-full">
      <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
        <TabsTrigger
          value="components"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
        >
          Components
        </TabsTrigger>
        <TabsTrigger
          value="colors"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
        >
          Colors
        </TabsTrigger>
        <TabsTrigger
          value="typography"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
        >
          Typography
        </TabsTrigger>
      </TabsList>

      <div className="mt-6">
        <TabsContent value="components" className="mt-0">
          <Suspense fallback={<LoadingFallback />}>
            <ComponentsPreview />
          </Suspense>
        </TabsContent>

        <TabsContent value="colors" className="mt-0">
          <Suspense fallback={<LoadingFallback />}>
            <ColorPalette />
          </Suspense>
        </TabsContent>

        <TabsContent value="typography" className="mt-0">
          <Suspense fallback={<LoadingFallback />}>
            <TypographyPreview />
          </Suspense>
        </TabsContent>
      </div>
    </Tabs>
  );
}
