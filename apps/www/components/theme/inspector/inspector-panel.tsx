'use client';

import { useInspectorStore } from '@/lib/stores/inspector-store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Info, Palette, Code, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function InspectorPanel() {
  const { selectedElement, metadata, setSelectedElement, setMetadata } = useInspectorStore();

  if (!selectedElement || !metadata) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            Element Inspector
          </CardTitle>
          <CardDescription>
            Click on any element in the preview to inspect it
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const handleClose = () => {
    setSelectedElement(null);
    setMetadata(null);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              <code className="text-sm">&lt;{metadata.tagName.toLowerCase()}&gt;</code>
            </CardTitle>
            <CardDescription>Element Details</CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={handleClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="classes" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="classes">Classes</TabsTrigger>
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="styles">Styles</TabsTrigger>
          </TabsList>

          <TabsContent value="classes" className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {metadata.classList.length > 0 ? (
                metadata.classList.map((className, idx) => (
                  <Badge key={idx} variant="secondary" className="font-mono text-xs">
                    {className}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No classes</p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="colors" className="space-y-2">
            <ScrollArea className="h-[200px]">
              {metadata.appliedColors.length > 0 ? (
                <div className="space-y-2">
                  {metadata.appliedColors.map((color, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div
                        className="h-8 w-8 rounded border"
                        style={{ backgroundColor: color }}
                      />
                      <code className="text-xs font-mono">{color}</code>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No colors detected</p>
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="styles">
            <ScrollArea className="h-[200px]">
              <div className="space-y-1">
                {Object.entries(metadata.computedStyles).map(([prop, value]) => (
                  <div key={prop} className="text-xs">
                    <code className="text-muted-foreground">{prop}:</code>{' '}
                    <code className="font-semibold">{value}</code>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
