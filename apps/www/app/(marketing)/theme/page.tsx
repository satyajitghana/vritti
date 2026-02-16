import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ThemeEditor } from './theme-editor';

export const metadata: Metadata = {
  title: 'Theme Editor',
  description: 'Visual theme editor for shadcn/ui and Tailwind CSS. Customize colors, typography, radius, and more with real-time preview.',
};

export default function ThemePage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading theme editor...</div>}>
      <ThemeEditor />
    </Suspense>
  );
}
