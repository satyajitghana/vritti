/**
 * Component Registry Schema
 * Defines the structure for the Vritti UI component registry
 */

export type ComponentCategory =
  | 'backgrounds'
  | 'animations'
  | 'text'
  | 'buttons'
  | 'layouts'
  | 'shaders'
  | 'special';

export interface RegistryComponent {
  /** Component name in kebab-case (e.g., "dot-pattern") */
  name: string;
  /** Component type */
  type: 'component' | 'block';
  /** Brief description of the component */
  description: string;
  /** Component category (REQUIRED) */
  category: ComponentCategory;
  /** npm package dependencies */
  dependencies?: string[];
  /** Other registry components this component depends on */
  registryDependencies?: string[];
  /** Component files (code, examples, docs) */
  files: RegistryFile[];
  /** Additional metadata */
  meta?: {
    /** Searchable tags */
    tags?: string[];
    /** Show on homepage */
    featured?: boolean;
    /** Premium component */
    pro?: boolean;
    /** Demo video URL */
    video?: string;
  };
}

export interface RegistryFile {
  /** File path in user's project (e.g., "components/ui/dot-pattern.tsx") */
  path: string;
  /** File content (source code) */
  content: string;
  /** File type */
  type: 'component' | 'lib' | 'hook' | 'util';
  /** Optional: specific target location in user's project */
  target?: string;
}

export interface Registry {
  /** All registered components */
  components: RegistryComponent[];
  /** Category information */
  categories: CategoryInfo[];
  /** Registry version */
  version: string;
  /** Last update timestamp */
  updatedAt: string;
}

export interface CategoryInfo {
  /** Category identifier */
  name: ComponentCategory;
  /** Display label */
  label: string;
  /** Category description */
  description: string;
  /** Lucide icon name */
  icon: string;
  /** Display order */
  order: number;
}

/** Category definitions */
export const CATEGORIES: CategoryInfo[] = [
  {
    name: 'backgrounds',
    label: 'Backgrounds',
    description: 'Background patterns and effects',
    icon: 'Layers',
    order: 1,
  },
  {
    name: 'animations',
    label: 'Animations',
    description: 'Motion and animated components',
    icon: 'Zap',
    order: 2,
  },
  {
    name: 'text',
    label: 'Text Effects',
    description: 'Text animations and effects',
    icon: 'Type',
    order: 3,
  },
  {
    name: 'buttons',
    label: 'Buttons',
    description: 'Interactive button components',
    icon: 'MousePointer',
    order: 4,
  },
  {
    name: 'layouts',
    label: 'Layouts',
    description: 'Layout and grid systems',
    icon: 'Layout',
    order: 5,
  },
  {
    name: 'shaders',
    label: 'Shaders',
    description: 'Advanced shader-based effects',
    icon: 'Sparkles',
    order: 6,
  },
  {
    name: 'special',
    label: 'Special',
    description: 'Complex and unique components',
    icon: 'Star',
    order: 7,
  },
];
