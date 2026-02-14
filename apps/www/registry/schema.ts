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
  | 'special'
  | 'inputs'
  | 'media';

export type BlockCategory =
  | 'hero'
  | 'pricing'
  | 'auth'
  | 'testimonial'
  | 'contact'
  | 'faq'
  | 'footer'
  | 'blog'
  | 'ecommerce'
  | 'billing'
  | 'modal'
  | 'account'
  | 'special';

export interface RegistryComponent {
  /** Component name in kebab-case (e.g., "dot-pattern") */
  name: string;
  /** Component type */
  type: 'component' | 'block';
  /** Brief description of the component */
  description: string;
  /** Component category (REQUIRED) */
  category: ComponentCategory | BlockCategory;
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
    /** Source library */
    source?: string;
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
  /** Block category information */
  blockCategories: BlockCategoryInfo[];
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

export interface BlockCategoryInfo {
  /** Block category identifier */
  name: BlockCategory;
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
    name: 'inputs',
    label: 'Inputs',
    description: 'Form inputs and interactive controls',
    icon: 'TextCursorInput',
    order: 6,
  },
  {
    name: 'media',
    label: 'Media',
    description: 'Media players and content display',
    icon: 'Play',
    order: 7,
  },
  {
    name: 'shaders',
    label: 'Shaders',
    description: 'Advanced shader-based effects',
    icon: 'Sparkles',
    order: 8,
  },
  {
    name: 'special',
    label: 'Special',
    description: 'Complex and unique components',
    icon: 'Star',
    order: 9,
  },
];

/** Block category definitions */
export const BLOCK_CATEGORIES: BlockCategoryInfo[] = [
  {
    name: 'hero',
    label: 'Hero Sections',
    description: 'Landing page hero sections',
    icon: 'Rocket',
    order: 1,
  },
  {
    name: 'pricing',
    label: 'Pricing',
    description: 'Pricing tables and plan comparison',
    icon: 'CreditCard',
    order: 2,
  },
  {
    name: 'auth',
    label: 'Authentication',
    description: 'Login, signup, and authentication forms',
    icon: 'Lock',
    order: 3,
  },
  {
    name: 'testimonial',
    label: 'Testimonials',
    description: 'Customer testimonials and reviews',
    icon: 'Quote',
    order: 4,
  },
  {
    name: 'contact',
    label: 'Contact',
    description: 'Contact forms and information sections',
    icon: 'Mail',
    order: 5,
  },
  {
    name: 'faq',
    label: 'FAQ',
    description: 'Frequently asked questions sections',
    icon: 'HelpCircle',
    order: 6,
  },
  {
    name: 'footer',
    label: 'Footers',
    description: 'Page footer sections',
    icon: 'PanelBottom',
    order: 7,
  },
  {
    name: 'blog',
    label: 'Blog',
    description: 'Blog post layouts and content sections',
    icon: 'FileText',
    order: 8,
  },
  {
    name: 'ecommerce',
    label: 'E-Commerce',
    description: 'Product listings, carts, and checkout',
    icon: 'ShoppingCart',
    order: 9,
  },
  {
    name: 'billing',
    label: 'Billing',
    description: 'Billing dashboards and payment management',
    icon: 'Receipt',
    order: 10,
  },
  {
    name: 'modal',
    label: 'Modals',
    description: 'Modal dialogs and overlays',
    icon: 'Square',
    order: 11,
  },
  {
    name: 'account',
    label: 'Account',
    description: 'Account settings and management',
    icon: 'User',
    order: 12,
  },
  {
    name: 'special',
    label: 'Special',
    description: 'AI agents, Web3, and other specialized blocks',
    icon: 'Sparkles',
    order: 13,
  },
];
