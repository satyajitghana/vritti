import type { Metadata } from 'next';
import { ThemeEditor } from './theme-editor';

export const metadata: Metadata = {
  title: 'Theme Editor',
  description: 'Visual theme editor for shadcn/ui and Tailwind CSS. Customize colors, typography, radius, and more with real-time preview.',
};

export default function ThemePage() {
  return <ThemeEditor />;
}
