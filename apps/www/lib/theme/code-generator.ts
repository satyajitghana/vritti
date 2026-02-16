import { hexToHsl, hexToOklch, type ThemeConfig } from './apply-theme';

// ============================================================
// CSS Variables Generation
// ============================================================

/**
 * Generate CSS variables for globals.css
 * Reused from original theme-editor.tsx
 */
export function generateCSS(config: ThemeConfig): string {
  const lines: string[] = ['@layer base {', '  :root {'];

  // Light mode colors
  for (const [key, value] of Object.entries(config.light)) {
    lines.push(`    --${key}: ${hexToHsl(value)};`);
  }
  lines.push(`    --radius: ${config.radius};`);
  lines.push('  }', '', '  .dark {');

  // Dark mode colors
  for (const [key, value] of Object.entries(config.dark)) {
    lines.push(`    --${key}: ${hexToHsl(value)};`);
  }
  lines.push('  }', '}');

  return lines.join('\n');
}

/**
 * Generate CSS with OKLCH color format
 */
export function generateCSSWithOKLCH(config: ThemeConfig): string {
  const lines: string[] = ['@layer base {', '  :root {'];

  // Light mode colors
  for (const [key, value] of Object.entries(config.light)) {
    lines.push(`    --${key}: ${hexToOklch(value)};`);
  }
  lines.push(`    --radius: ${config.radius};`);
  lines.push('  }', '', '  .dark {');

  // Dark mode colors
  for (const [key, value] of Object.entries(config.dark)) {
    lines.push(`    --${key}: ${hexToOklch(value)};`);
  }
  lines.push('  }', '}');

  return lines.join('\n');
}

// ============================================================
// Tailwind v3 Config Generation
// ============================================================

/**
 * Generate Tailwind v3 configuration
 */
export function generateTailwindV3Config(config: ThemeConfig): string {
  return `/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}`;
}

// ============================================================
// Tailwind v4 Config Generation
// ============================================================

/**
 * Generate Tailwind v4 @theme inline configuration
 */
export function generateTailwindV4Config(config: ThemeConfig): string {
  const lines: string[] = ['@theme inline {'];

  // Color definitions for light mode
  lines.push('  :root {');
  for (const [key, value] of Object.entries(config.light)) {
    lines.push(`    --color-${key}: ${hexToOklch(value)};`);
  }
  lines.push(`    --radius: ${config.radius};`);
  lines.push('  }');
  lines.push('');

  // Color definitions for dark mode
  lines.push('  .dark {');
  for (const [key, value] of Object.entries(config.dark)) {
    lines.push(`    --color-${key}: ${hexToOklch(value)};`);
  }
  lines.push('  }');
  lines.push('');

  // Radius variants
  lines.push('  --radius-lg: var(--radius);');
  lines.push('  --radius-md: calc(var(--radius) - 0.125rem);');
  lines.push('  --radius-sm: calc(var(--radius) - 0.25rem);');

  lines.push('}');

  return lines.join('\n');
}

// ============================================================
// shadcn/ui Config Generation
// ============================================================

/**
 * Generate shadcn/ui compatible configuration
 */
export function generateShadcnConfig(config: ThemeConfig): string {
  return JSON.stringify(
    {
      $schema: 'https://ui.shadcn.com/schema.json',
      style: 'default',
      rsc: true,
      tsx: true,
      tailwind: {
        config: 'tailwind.config.ts',
        css: 'app/globals.css',
        baseColor: 'neutral',
        cssVariables: true,
        prefix: '',
      },
      aliases: {
        components: '@/components',
        utils: '@/lib/utils',
        ui: '@/components/ui',
        lib: '@/lib',
        hooks: '@/hooks',
      },
      theme: {
        light: config.light,
        dark: config.dark,
        radius: config.radius,
      },
    },
    null,
    2
  );
}

// ============================================================
// JSON Export
// ============================================================

/**
 * Export theme as JSON
 */
export function generateJSON(config: ThemeConfig): string {
  return JSON.stringify(config, null, 2);
}

/**
 * Export theme with metadata as JSON
 */
export function generateJSONWithMetadata(
  config: ThemeConfig,
  metadata: {
    name?: string;
    description?: string;
    author?: string;
    version?: string;
  }
): string {
  return JSON.stringify(
    {
      ...metadata,
      theme: config,
      exportedAt: new Date().toISOString(),
    },
    null,
    2
  );
}

// ============================================================
// Code Format Utilities
// ============================================================

/**
 * Format code with syntax highlighting metadata
 */
export function formatCodeWithLanguage(code: string, language: string): { code: string; language: string } {
  return { code, language };
}

/**
 * Get file extension for export type
 */
export function getFileExtension(exportType: string): string {
  switch (exportType) {
    case 'css':
      return '.css';
    case 'tailwind-v3':
    case 'tailwind-v4':
      return '.js';
    case 'shadcn':
    case 'json':
      return '.json';
    default:
      return '.txt';
  }
}

/**
 * Get filename for export
 */
export function getExportFilename(exportType: string, themeName?: string): string {
  const name = themeName || 'theme';
  const ext = getFileExtension(exportType);

  switch (exportType) {
    case 'css':
      return `${name}-globals${ext}`;
    case 'tailwind-v3':
      return `tailwind.config${ext}`;
    case 'tailwind-v4':
      return `tailwind-v4${ext}`;
    case 'shadcn':
      return `components.json`;
    case 'json':
      return `${name}${ext}`;
    default:
      return `${name}${ext}`;
  }
}
