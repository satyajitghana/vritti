import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './registry/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
        'pixel-square': ['var(--font-geist-pixel-square)', 'monospace'],
        'pixel-grid': ['var(--font-geist-pixel-grid)', 'monospace'],
        'pixel-circle': ['var(--font-geist-pixel-circle)', 'monospace'],
        'pixel-triangle': ['var(--font-geist-pixel-triangle)', 'monospace'],
        'pixel-line': ['var(--font-geist-pixel-line)', 'monospace'],
      },
    },
  },
};

export default config;
