interface ThemeColors {
  background: string;
  foreground: string;
  card: string;
  'card-foreground': string;
  popover: string;
  'popover-foreground': string;
  primary: string;
  'primary-foreground': string;
  secondary: string;
  'secondary-foreground': string;
  muted: string;
  'muted-foreground': string;
  accent: string;
  'accent-foreground': string;
  destructive: string;
  'destructive-foreground': string;
  border: string;
  input: string;
  ring: string;
  'chart-1': string;
  'chart-2': string;
  'chart-3': string;
  'chart-4': string;
  'chart-5': string;
  'sidebar-background': string;
  'sidebar-foreground': string;
  'sidebar-primary': string;
  'sidebar-primary-foreground': string;
  'sidebar-accent': string;
  'sidebar-accent-foreground': string;
  'sidebar-border': string;
  'sidebar-ring': string;
}

export interface ThemePreset {
  name: string;
  label: string;
  config: {
    light: ThemeColors;
    dark: ThemeColors;
    radius: string;
  };
}

const base = {
  'chart-1': '#e76e50',
  'chart-2': '#2a9d90',
  'chart-3': '#274754',
  'chart-4': '#e8c468',
  'chart-5': '#f4a462',
};

function make(
  label: string,
  light: Partial<ThemeColors>,
  dark: Partial<ThemeColors>,
  radius = '0.625rem'
): ThemePreset {
  const defaultLight: ThemeColors = {
    background: '#ffffff', foreground: '#0a0a0a', card: '#ffffff', 'card-foreground': '#0a0a0a',
    popover: '#ffffff', 'popover-foreground': '#0a0a0a', primary: '#171717', 'primary-foreground': '#fafafa',
    secondary: '#f5f5f5', 'secondary-foreground': '#171717', muted: '#f5f5f5', 'muted-foreground': '#737373',
    accent: '#f5f5f5', 'accent-foreground': '#171717', destructive: '#ef4444', 'destructive-foreground': '#fafafa',
    border: '#e5e5e5', input: '#e5e5e5', ring: '#171717', ...base,
    'sidebar-background': '#fafafa', 'sidebar-foreground': '#0a0a0a', 'sidebar-primary': '#171717',
    'sidebar-primary-foreground': '#fafafa', 'sidebar-accent': '#f5f5f5', 'sidebar-accent-foreground': '#171717',
    'sidebar-border': '#e5e5e5', 'sidebar-ring': '#171717',
  };
  const defaultDark: ThemeColors = {
    background: '#0a0a0a', foreground: '#fafafa', card: '#0a0a0a', 'card-foreground': '#fafafa',
    popover: '#0a0a0a', 'popover-foreground': '#fafafa', primary: '#fafafa', 'primary-foreground': '#171717',
    secondary: '#262626', 'secondary-foreground': '#fafafa', muted: '#262626', 'muted-foreground': '#a3a3a3',
    accent: '#262626', 'accent-foreground': '#fafafa', destructive: '#7f1d1d', 'destructive-foreground': '#fafafa',
    border: '#262626', input: '#262626', ring: '#d4d4d4',
    'chart-1': '#2563eb', 'chart-2': '#16a34a', 'chart-3': '#e5e7eb', 'chart-4': '#8b5cf6', 'chart-5': '#f59e0b',
    'sidebar-background': '#171717', 'sidebar-foreground': '#fafafa', 'sidebar-primary': '#fafafa',
    'sidebar-primary-foreground': '#171717', 'sidebar-accent': '#262626', 'sidebar-accent-foreground': '#fafafa',
    'sidebar-border': '#262626', 'sidebar-ring': '#d4d4d4',
  };
  const name = label.toLowerCase().replace(/\s+/g, '-');
  return {
    name,
    label,
    config: {
      light: { ...defaultLight, ...light },
      dark: { ...defaultDark, ...dark },
      radius,
    },
  };
}

export const THEME_PRESETS: ThemePreset[] = [
  make('Default', {}, {}),

  make('Violet Bloom', {
    primary: '#7c3aed', 'primary-foreground': '#ffffff', ring: '#7c3aed',
    accent: '#f3e8ff', 'accent-foreground': '#6b21a8', 'sidebar-primary': '#7c3aed',
  }, {
    primary: '#8b5cf6', 'primary-foreground': '#ffffff', ring: '#8b5cf6',
    accent: '#1e1b4b', 'accent-foreground': '#c4b5fd', 'sidebar-primary': '#8b5cf6',
  }, '0.75rem'),

  make('Ocean Blue', {
    primary: '#2563eb', 'primary-foreground': '#ffffff', ring: '#2563eb', 'sidebar-primary': '#2563eb',
  }, {
    primary: '#3b82f6', 'primary-foreground': '#ffffff', ring: '#3b82f6', 'sidebar-primary': '#3b82f6',
  }, '0.5rem'),

  make('Emerald', {
    primary: '#059669', 'primary-foreground': '#ffffff', ring: '#059669', 'sidebar-primary': '#059669',
  }, {
    primary: '#10b981', 'primary-foreground': '#ffffff', ring: '#10b981', 'sidebar-primary': '#10b981',
  }, '0.5rem'),

  make('Rose', {
    primary: '#e11d48', 'primary-foreground': '#ffffff', ring: '#e11d48', 'sidebar-primary': '#e11d48',
  }, {
    primary: '#fb7185', 'primary-foreground': '#1c1917', ring: '#fb7185', 'sidebar-primary': '#fb7185',
  }),

  make('Amber Warmth', {
    primary: '#d97706', 'primary-foreground': '#ffffff', ring: '#d97706',
    accent: '#fef3c7', 'accent-foreground': '#92400e', 'sidebar-primary': '#d97706',
  }, {
    primary: '#f59e0b', 'primary-foreground': '#1c1917', ring: '#f59e0b',
    accent: '#451a03', 'accent-foreground': '#fbbf24', 'sidebar-primary': '#f59e0b',
  }, '0.75rem'),

  make('T3 Chat', {
    background: '#ffffff', foreground: '#1a1a2e', primary: '#6c63ff', 'primary-foreground': '#ffffff',
    secondary: '#f0efff', 'secondary-foreground': '#1a1a2e', muted: '#f5f5ff', 'muted-foreground': '#6b7280',
    accent: '#e8e6ff', 'accent-foreground': '#4338ca', border: '#e5e3ff', ring: '#6c63ff',
  }, {
    background: '#0f0f23', foreground: '#e2e8f0', primary: '#818cf8', 'primary-foreground': '#0f0f23',
    secondary: '#1e1e3f', 'secondary-foreground': '#e2e8f0', muted: '#1a1a35', 'muted-foreground': '#94a3b8',
    accent: '#2d2b55', 'accent-foreground': '#a5b4fc', border: '#2d2b55', ring: '#818cf8',
  }, '0.75rem'),

  make('Twitter', {
    primary: '#1d9bf0', 'primary-foreground': '#ffffff', ring: '#1d9bf0',
    background: '#ffffff', foreground: '#0f1419', border: '#eff3f4', muted: '#eff3f4',
  }, {
    primary: '#1d9bf0', 'primary-foreground': '#ffffff', ring: '#1d9bf0',
    background: '#15202b', foreground: '#e7e9ea', border: '#38444d', muted: '#1e2d3d',
  }, '1rem'),

  make('Mocha Mousse', {
    background: '#faf8f5', foreground: '#3d2c1e', primary: '#8b6f47', 'primary-foreground': '#faf8f5',
    secondary: '#f0ebe3', 'secondary-foreground': '#5d4831', muted: '#ede7dd', 'muted-foreground': '#8b7e6f',
    accent: '#e8dfd3', 'accent-foreground': '#5d4831', border: '#ddd5c9', ring: '#8b6f47',
  }, {
    background: '#1a1410', foreground: '#e8dfd3', primary: '#c4a47a', 'primary-foreground': '#1a1410',
    secondary: '#2d2319', 'secondary-foreground': '#e8dfd3', muted: '#241c14', 'muted-foreground': '#a89580',
    accent: '#3d2f22', 'accent-foreground': '#e8dfd3', border: '#3d2f22', ring: '#c4a47a',
  }, '0.5rem'),

  make('Catppuccin', {
    background: '#eff1f5', foreground: '#4c4f69', primary: '#8839ef', 'primary-foreground': '#eff1f5',
    secondary: '#dce0e8', 'secondary-foreground': '#4c4f69', muted: '#e6e9ef', 'muted-foreground': '#6c6f85',
    accent: '#ccd0da', 'accent-foreground': '#4c4f69', border: '#ccd0da', ring: '#8839ef',
    destructive: '#d20f39', 'destructive-foreground': '#eff1f5',
  }, {
    background: '#1e1e2e', foreground: '#cdd6f4', primary: '#cba6f7', 'primary-foreground': '#1e1e2e',
    secondary: '#313244', 'secondary-foreground': '#cdd6f4', muted: '#313244', 'muted-foreground': '#a6adc8',
    accent: '#45475a', 'accent-foreground': '#cdd6f4', border: '#45475a', ring: '#cba6f7',
    destructive: '#f38ba8', 'destructive-foreground': '#1e1e2e',
  }, '0.5rem'),

  make('Cyberpunk', {
    background: '#0a0a0a', foreground: '#00ff41', primary: '#ff00ff', 'primary-foreground': '#0a0a0a',
    secondary: '#1a1a2e', 'secondary-foreground': '#00ff41', muted: '#16213e', 'muted-foreground': '#00b8d4',
    accent: '#0f3460', 'accent-foreground': '#e94560', border: '#1a1a2e', ring: '#ff00ff',
    destructive: '#e94560', 'destructive-foreground': '#0a0a0a',
  }, {
    background: '#0a0a0a', foreground: '#00ff41', primary: '#ff00ff', 'primary-foreground': '#0a0a0a',
    secondary: '#1a1a2e', 'secondary-foreground': '#00ff41', muted: '#16213e', 'muted-foreground': '#00b8d4',
    accent: '#0f3460', 'accent-foreground': '#e94560', border: '#1a1a2e', ring: '#ff00ff',
  }, '0rem'),

  make('Neo Brutalism', {
    background: '#fffbe6', foreground: '#1a1a1a', primary: '#ff5722', 'primary-foreground': '#1a1a1a',
    secondary: '#ffeb3b', 'secondary-foreground': '#1a1a1a', muted: '#fff9c4', 'muted-foreground': '#616161',
    accent: '#76ff03', 'accent-foreground': '#1a1a1a', border: '#1a1a1a', ring: '#ff5722',
  }, {
    background: '#1a1a1a', foreground: '#fffbe6', primary: '#ff5722', 'primary-foreground': '#fffbe6',
    secondary: '#ffeb3b', 'secondary-foreground': '#1a1a1a', muted: '#333333', 'muted-foreground': '#bdbdbd',
    accent: '#76ff03', 'accent-foreground': '#1a1a1a', border: '#fffbe6', ring: '#ff5722',
  }, '0rem'),

  make('Pastel Dreams', {
    background: '#fdf2f8', foreground: '#1f2937', primary: '#ec4899', 'primary-foreground': '#ffffff',
    secondary: '#fce7f3', 'secondary-foreground': '#831843', muted: '#fdf2f8', 'muted-foreground': '#9ca3af',
    accent: '#e0f2fe', 'accent-foreground': '#0369a1', border: '#fbcfe8', ring: '#ec4899',
  }, {
    background: '#1a1625', foreground: '#f9fafb', primary: '#f472b6', 'primary-foreground': '#1a1625',
    secondary: '#2d1f3d', 'secondary-foreground': '#f9fafb', muted: '#231c30', 'muted-foreground': '#a5a0b3',
    accent: '#1e293b', 'accent-foreground': '#7dd3fc', border: '#2d1f3d', ring: '#f472b6',
  }, '1rem'),

  make('Midnight Bloom', {
    background: '#f0f4ff', foreground: '#1e1b4b', primary: '#4f46e5', 'primary-foreground': '#ffffff',
    secondary: '#e0e7ff', 'secondary-foreground': '#3730a3', muted: '#eef2ff', 'muted-foreground': '#6366f1',
    accent: '#ddd6fe', 'accent-foreground': '#5b21b6', border: '#c7d2fe', ring: '#4f46e5',
  }, {
    background: '#020617', foreground: '#e2e8f0', primary: '#818cf8', 'primary-foreground': '#020617',
    secondary: '#1e1b4b', 'secondary-foreground': '#e2e8f0', muted: '#0f172a', 'muted-foreground': '#94a3b8',
    accent: '#312e81', 'accent-foreground': '#c4b5fd', border: '#1e293b', ring: '#818cf8',
  }, '0.75rem'),

  make('Northern Lights', {
    background: '#f0fdf4', foreground: '#022c22', primary: '#059669', 'primary-foreground': '#ffffff',
    secondary: '#d1fae5', 'secondary-foreground': '#064e3b', muted: '#ecfdf5', 'muted-foreground': '#6b7280',
    accent: '#cffafe', 'accent-foreground': '#0e7490', border: '#a7f3d0', ring: '#059669',
  }, {
    background: '#022c22', foreground: '#d1fae5', primary: '#34d399', 'primary-foreground': '#022c22',
    secondary: '#064e3b', 'secondary-foreground': '#d1fae5', muted: '#064e3b', 'muted-foreground': '#6ee7b7',
    accent: '#155e75', 'accent-foreground': '#cffafe', border: '#065f46', ring: '#34d399',
  }, '0.75rem'),

  make('Sunset Horizon', {
    background: '#fffbf0', foreground: '#1a1a1a', primary: '#ea580c', 'primary-foreground': '#ffffff',
    secondary: '#fff7ed', 'secondary-foreground': '#9a3412', muted: '#fef3c7', 'muted-foreground': '#92400e',
    accent: '#fde68a', 'accent-foreground': '#78350f', border: '#fed7aa', ring: '#ea580c',
  }, {
    background: '#1c1108', foreground: '#fef3c7', primary: '#fb923c', 'primary-foreground': '#1c1108',
    secondary: '#451a03', 'secondary-foreground': '#fef3c7', muted: '#431407', 'muted-foreground': '#fdba74',
    accent: '#78350f', 'accent-foreground': '#fde68a', border: '#92400e', ring: '#fb923c',
  }, '0.5rem'),

  make('Retro Arcade', {
    background: '#0f0f23', foreground: '#00ff00', primary: '#ff0066', 'primary-foreground': '#0f0f23',
    secondary: '#1a1a40', 'secondary-foreground': '#00ff00', muted: '#16163a', 'muted-foreground': '#666699',
    accent: '#330066', 'accent-foreground': '#cc66ff', border: '#333366', ring: '#ff0066',
  }, {
    background: '#0f0f23', foreground: '#00ff00', primary: '#ff0066', 'primary-foreground': '#0f0f23',
    secondary: '#1a1a40', 'secondary-foreground': '#00ff00', muted: '#16163a', 'muted-foreground': '#666699',
    accent: '#330066', 'accent-foreground': '#cc66ff', border: '#333366', ring: '#ff0066',
  }, '0rem'),

  make('Vintage Paper', {
    background: '#faf6f1', foreground: '#2c1810', primary: '#8b4513', 'primary-foreground': '#faf6f1',
    secondary: '#f0e6d8', 'secondary-foreground': '#2c1810', muted: '#ede3d5', 'muted-foreground': '#8b7355',
    accent: '#ddd0be', 'accent-foreground': '#4a2c17', border: '#d2c4b0', ring: '#8b4513',
  }, {
    background: '#1c1410', foreground: '#e8d5c4', primary: '#cd853f', 'primary-foreground': '#1c1410',
    secondary: '#2d2018', 'secondary-foreground': '#e8d5c4', muted: '#241c15', 'muted-foreground': '#b8a088',
    accent: '#3d2d1e', 'accent-foreground': '#e8d5c4', border: '#3d2d1e', ring: '#cd853f',
  }, '0.375rem'),

  make('Claude', {
    background: '#fdf8f3', foreground: '#1a1613', primary: '#c96442', 'primary-foreground': '#fdf8f3',
    secondary: '#f5ebe0', 'secondary-foreground': '#44332a', muted: '#f0e6d9', 'muted-foreground': '#8a7565',
    accent: '#e8d5c4', 'accent-foreground': '#44332a', border: '#e0d0c0', ring: '#c96442',
  }, {
    background: '#1a1613', foreground: '#f0e6d9', primary: '#e07c5a', 'primary-foreground': '#1a1613',
    secondary: '#2d251e', 'secondary-foreground': '#f0e6d9', muted: '#241e18', 'muted-foreground': '#b8a48e',
    accent: '#3d3028', 'accent-foreground': '#f0e6d9', border: '#3d3028', ring: '#e07c5a',
  }, '0.625rem'),

  make('Vercel', {
    background: '#fcfcfc', foreground: '#000000', primary: '#000000', 'primary-foreground': '#ffffff',
    secondary: '#ebebeb', 'secondary-foreground': '#000000', muted: '#f5f5f5', 'muted-foreground': '#525252',
    accent: '#ebebeb', 'accent-foreground': '#000000', border: '#e4e4e4', ring: '#000000',
  }, {
    background: '#000000', foreground: '#ffffff', primary: '#ffffff', 'primary-foreground': '#000000',
    secondary: '#222222', 'secondary-foreground': '#ffffff', muted: '#1d1d1d', 'muted-foreground': '#a4a4a4',
    accent: '#333333', 'accent-foreground': '#ffffff', border: '#242424', ring: '#a4a4a4',
  }, '0.5rem'),

  make('Darkmatter', {
    background: '#09090b', foreground: '#fafafa', primary: '#fafafa', 'primary-foreground': '#09090b',
    secondary: '#18181b', 'secondary-foreground': '#fafafa', muted: '#27272a', 'muted-foreground': '#a1a1aa',
    accent: '#27272a', 'accent-foreground': '#fafafa', border: '#27272a', ring: '#d4d4d8',
  }, {
    background: '#09090b', foreground: '#fafafa', primary: '#fafafa', 'primary-foreground': '#09090b',
    secondary: '#18181b', 'secondary-foreground': '#fafafa', muted: '#27272a', 'muted-foreground': '#a1a1aa',
    accent: '#27272a', 'accent-foreground': '#fafafa', border: '#27272a', ring: '#d4d4d8',
  }, '0.5rem'),

  make('Mono', {
    background: '#ffffff', foreground: '#000000', primary: '#000000', 'primary-foreground': '#ffffff',
    secondary: '#f0f0f0', 'secondary-foreground': '#000000', muted: '#f5f5f5', 'muted-foreground': '#666666',
    accent: '#e0e0e0', 'accent-foreground': '#000000', border: '#d0d0d0', ring: '#000000',
  }, {
    background: '#111111', foreground: '#eeeeee', primary: '#eeeeee', 'primary-foreground': '#111111',
    secondary: '#222222', 'secondary-foreground': '#eeeeee', muted: '#1a1a1a', 'muted-foreground': '#999999',
    accent: '#333333', 'accent-foreground': '#eeeeee', border: '#333333', ring: '#999999',
  }, '0.375rem'),

  make('Supabase', {
    background: '#f8f9fa', foreground: '#1c1c1c', primary: '#3ecf8e', 'primary-foreground': '#1c1c1c',
    secondary: '#e2f5ec', 'secondary-foreground': '#1c1c1c', muted: '#f1f3f5', 'muted-foreground': '#687076',
    accent: '#ddf4ea', 'accent-foreground': '#1c1c1c', border: '#e6e8eb', ring: '#3ecf8e',
  }, {
    background: '#1c1c1c', foreground: '#ededed', primary: '#3ecf8e', 'primary-foreground': '#1c1c1c',
    secondary: '#2a2a2a', 'secondary-foreground': '#ededed', muted: '#333333', 'muted-foreground': '#888888',
    accent: '#2a3a2f', 'accent-foreground': '#3ecf8e', border: '#333333', ring: '#3ecf8e',
  }, '0.5rem'),

  make('Caffeine', {
    background: '#faf8f5', foreground: '#1b1816', primary: '#6f4e37', 'primary-foreground': '#faf8f5',
    secondary: '#f0e9df', 'secondary-foreground': '#3e2a1a', muted: '#ede5d8', 'muted-foreground': '#8b7355',
    accent: '#d4c4a8', 'accent-foreground': '#3e2a1a', border: '#ddd0bb', ring: '#6f4e37',
  }, {
    background: '#1b1816', foreground: '#ede5d8', primary: '#a0785c', 'primary-foreground': '#1b1816',
    secondary: '#2e2520', 'secondary-foreground': '#ede5d8', muted: '#261f1a', 'muted-foreground': '#a69075',
    accent: '#3d3025', 'accent-foreground': '#ede5d8', border: '#3d3025', ring: '#a0785c',
  }, '0.5rem'),

  make('Sage Garden', {
    background: '#f5f7f2', foreground: '#1a2e1a', primary: '#5c7c5c', 'primary-foreground': '#f5f7f2',
    secondary: '#e8ede4', 'secondary-foreground': '#2d4a2d', muted: '#eef1ea', 'muted-foreground': '#6b8a6b',
    accent: '#d4e0d0', 'accent-foreground': '#2d4a2d', border: '#c8d4c0', ring: '#5c7c5c',
  }, {
    background: '#121a12', foreground: '#d4e0d0', primary: '#7a9e7a', 'primary-foreground': '#121a12',
    secondary: '#1e2e1e', 'secondary-foreground': '#d4e0d0', muted: '#1a261a', 'muted-foreground': '#7a9e7a',
    accent: '#2d4a2d', 'accent-foreground': '#d4e0d0', border: '#2d4a2d', ring: '#7a9e7a',
  }, '0.75rem'),

  make('Bubblegum', {
    background: '#fff0f5', foreground: '#2d1b2e', primary: '#ff69b4', 'primary-foreground': '#2d1b2e',
    secondary: '#ffe0ed', 'secondary-foreground': '#2d1b2e', muted: '#ffd6e7', 'muted-foreground': '#8b6080',
    accent: '#e0b0ff', 'accent-foreground': '#2d1b2e', border: '#ffb6d9', ring: '#ff69b4',
  }, {
    background: '#1a0e1a', foreground: '#ffd6e7', primary: '#ff69b4', 'primary-foreground': '#1a0e1a',
    secondary: '#2d1b2e', 'secondary-foreground': '#ffd6e7', muted: '#261626', 'muted-foreground': '#cc80a8',
    accent: '#3d1f40', 'accent-foreground': '#e0b0ff', border: '#3d1f40', ring: '#ff69b4',
  }, '1rem'),

  make('Ocean Breeze', {
    background: '#f0f9ff', foreground: '#0c1d29', primary: '#0284c7', 'primary-foreground': '#ffffff',
    secondary: '#e0f2fe', 'secondary-foreground': '#075985', muted: '#f0f9ff', 'muted-foreground': '#64748b',
    accent: '#bae6fd', 'accent-foreground': '#075985', border: '#bae6fd', ring: '#0284c7',
  }, {
    background: '#0c1d29', foreground: '#e0f2fe', primary: '#38bdf8', 'primary-foreground': '#0c1d29',
    secondary: '#164e63', 'secondary-foreground': '#e0f2fe', muted: '#0e2a3a', 'muted-foreground': '#7dd3fc',
    accent: '#155e75', 'accent-foreground': '#cffafe', border: '#164e63', ring: '#38bdf8',
  }, '0.75rem'),

  make('Graphite', {
    background: '#f4f4f5', foreground: '#27272a', primary: '#52525b', 'primary-foreground': '#fafafa',
    secondary: '#e4e4e7', 'secondary-foreground': '#27272a', muted: '#e4e4e7', 'muted-foreground': '#71717a',
    accent: '#d4d4d8', 'accent-foreground': '#27272a', border: '#d4d4d8', ring: '#52525b',
  }, {
    background: '#18181b', foreground: '#e4e4e7', primary: '#a1a1aa', 'primary-foreground': '#18181b',
    secondary: '#27272a', 'secondary-foreground': '#e4e4e7', muted: '#27272a', 'muted-foreground': '#71717a',
    accent: '#3f3f46', 'accent-foreground': '#e4e4e7', border: '#3f3f46', ring: '#a1a1aa',
  }, '0.375rem'),

  make('Cosmic Night', {
    background: '#0f0b1a', foreground: '#e2d9f3', primary: '#a855f7', 'primary-foreground': '#0f0b1a',
    secondary: '#1e1533', 'secondary-foreground': '#e2d9f3', muted: '#1a1230', 'muted-foreground': '#9d8ec4',
    accent: '#2d1f50', 'accent-foreground': '#d8b4fe', border: '#2d1f50', ring: '#a855f7',
  }, {
    background: '#0f0b1a', foreground: '#e2d9f3', primary: '#a855f7', 'primary-foreground': '#0f0b1a',
    secondary: '#1e1533', 'secondary-foreground': '#e2d9f3', muted: '#1a1230', 'muted-foreground': '#9d8ec4',
    accent: '#2d1f50', 'accent-foreground': '#d8b4fe', border: '#2d1f50', ring: '#a855f7',
  }, '0.75rem'),

  make('Clean Slate', {
    background: '#ffffff', foreground: '#09090b', primary: '#18181b', 'primary-foreground': '#fafafa',
    secondary: '#f4f4f5', 'secondary-foreground': '#18181b', muted: '#f4f4f5', 'muted-foreground': '#71717a',
    accent: '#f4f4f5', 'accent-foreground': '#18181b', border: '#e4e4e7', ring: '#18181b',
  }, {
    background: '#09090b', foreground: '#fafafa', primary: '#fafafa', 'primary-foreground': '#09090b',
    secondary: '#27272a', 'secondary-foreground': '#fafafa', muted: '#27272a', 'muted-foreground': '#a1a1aa',
    accent: '#27272a', 'accent-foreground': '#fafafa', border: '#27272a', ring: '#d4d4d8',
  }, '0.5rem'),

  make('Tangerine', {
    primary: '#f97316', 'primary-foreground': '#ffffff', ring: '#f97316',
    accent: '#fff7ed', 'accent-foreground': '#c2410c', 'sidebar-primary': '#f97316',
  }, {
    primary: '#fb923c', 'primary-foreground': '#1c1917', ring: '#fb923c',
    accent: '#431407', 'accent-foreground': '#fed7aa', 'sidebar-primary': '#fb923c',
  }, '0.5rem'),

  make('Soft Pop', {
    background: '#faf5ff', foreground: '#1e1b2d', primary: '#a855f7', 'primary-foreground': '#ffffff',
    secondary: '#f3e8ff', 'secondary-foreground': '#6b21a8', muted: '#f5f3ff', 'muted-foreground': '#7c6d97',
    accent: '#ede9fe', 'accent-foreground': '#5b21b6', border: '#e9d5ff', ring: '#a855f7',
  }, {
    background: '#13111c', foreground: '#f3e8ff', primary: '#c084fc', 'primary-foreground': '#13111c',
    secondary: '#1e1533', 'secondary-foreground': '#f3e8ff', muted: '#1a1428', 'muted-foreground': '#9d8ec4',
    accent: '#2d1f50', 'accent-foreground': '#e9d5ff', border: '#2d1f50', ring: '#c084fc',
  }, '1rem'),

  make('Starry Night', {
    background: '#0c1445', foreground: '#e8eaf6', primary: '#fdd835', 'primary-foreground': '#0c1445',
    secondary: '#1a237e', 'secondary-foreground': '#e8eaf6', muted: '#1a2060', 'muted-foreground': '#9fa8da',
    accent: '#283593', 'accent-foreground': '#fff59d', border: '#283593', ring: '#fdd835',
  }, {
    background: '#0c1445', foreground: '#e8eaf6', primary: '#fdd835', 'primary-foreground': '#0c1445',
    secondary: '#1a237e', 'secondary-foreground': '#e8eaf6', muted: '#1a2060', 'muted-foreground': '#9fa8da',
    accent: '#283593', 'accent-foreground': '#fff59d', border: '#283593', ring: '#fdd835',
  }, '0.5rem'),
];
