/**
 * Component Registry Index
 * This file exports all registered components
 */

import { type Registry, CATEGORIES } from './schema';

export const registry: Registry = {
  components: [
    // Components will be added here as we build them
  ],
  categories: CATEGORIES,
  version: '0.1.0',
  updatedAt: new Date().toISOString(),
};

export default registry;
