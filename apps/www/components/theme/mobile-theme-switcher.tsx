'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SlidersHorizontal, Eye } from 'lucide-react';

interface MobileThemeSwitcherProps {
  controlsPanel: React.ReactNode;
  previewPanel: React.ReactNode;
}

export function MobileThemeSwitcher({ controlsPanel, previewPanel }: MobileThemeSwitcherProps) {
  const [activeTab, setActiveTab] = useState<'controls' | 'preview'>('controls');

  return (
    <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'controls' | 'preview')} className="w-full">
      <TabsList className="w-full grid grid-cols-2">
        <TabsTrigger value="controls" className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Controls
        </TabsTrigger>
        <TabsTrigger value="preview" className="flex items-center gap-2">
          <Eye className="h-4 w-4" />
          Preview
        </TabsTrigger>
      </TabsList>

      <TabsContent value="controls" className="mt-4">
        {controlsPanel}
      </TabsContent>

      <TabsContent value="preview" className="mt-4">
        {previewPanel}
      </TabsContent>
    </Tabs>
  );
}
