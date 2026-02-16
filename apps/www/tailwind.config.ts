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
        pixel: {
          line: ['var(--font-geist-pixel-line)', 'monospace'],
          triangle: ['var(--font-geist-pixel-triangle)', 'monospace'],
          circle: ['var(--font-geist-pixel-circle)', 'monospace'],
        },
      },
    },
  },
};

export default config;
