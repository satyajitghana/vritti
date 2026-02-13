/**
 * Build Registry Script
 * Scans src/registry/components/ and generates registry JSON files
 */

import { promises as fs } from 'fs';
import * as path from 'path';
import { type Registry, type RegistryComponent, CATEGORIES } from '../src/registry/schema';

const REGISTRY_PATH = path.join(process.cwd(), 'src', 'registry', 'components');
const OUTPUT_PATH = path.join(process.cwd(), 'registry');

async function buildRegistry() {
  console.log('🚀 Building component registry...');

  const components: RegistryComponent[] = [];

  // Scan each category directory
  for (const category of CATEGORIES) {
    const categoryPath = path.join(REGISTRY_PATH, category.name);

    try {
      const items = await fs.readdir(categoryPath, { withFileTypes: true });

      for (const item of items) {
        if (item.isDirectory()) {
          const componentName = item.name;
          const componentPath = path.join(categoryPath, componentName);

          // Read component.json
          const metadataPath = path.join(componentPath, 'component.json');
          try {
            const metadataContent = await fs.readFile(metadataPath, 'utf-8');
            const metadata: RegistryComponent = JSON.parse(metadataContent);

            // Read component.tsx
            const componentFilePath = path.join(componentPath, 'component.tsx');
            const componentContent = await fs.readFile(componentFilePath, 'utf-8');

            // Add file to component
            metadata.files = [
              {
                path: `components/ui/${componentName}.tsx`,
                content: componentContent,
                type: 'component',
              },
            ];

            // Validate category matches
            if (metadata.category !== category.name) {
              console.warn(
                `⚠️  Component "${componentName}" has category "${metadata.category}" but is in "${category.name}" directory`
              );
            }

            components.push(metadata);
            console.log(`  ✓ Added ${category.name}/${componentName}`);
          } catch (error) {
            console.warn(`  ⚠️  Skipping ${category.name}/${componentName}: ${error}`);
          }
        }
      }
    } catch (error) {
      console.warn(`  ⚠️  Category "${category.name}" directory not found or empty`);
    }
  }

  // Create registry object
  const registry: Registry = {
    components,
    categories: CATEGORIES,
    version: '0.1.0',
    updatedAt: new Date().toISOString(),
  };

  // Ensure output directory exists
  await fs.mkdir(OUTPUT_PATH, { recursive: true });

  // Write registry files
  await fs.writeFile(
    path.join(OUTPUT_PATH, 'index.json'),
    JSON.stringify(registry, null, 2),
    'utf-8'
  );

  await fs.writeFile(
    path.join(OUTPUT_PATH, 'components.json'),
    JSON.stringify(
      {
        components: components.filter((c) => c.type === 'component'),
      },
      null,
      2
    ),
    'utf-8'
  );

  await fs.writeFile(
    path.join(OUTPUT_PATH, 'blocks.json'),
    JSON.stringify(
      {
        blocks: components.filter((c) => c.type === 'block'),
      },
      null,
      2
    ),
    'utf-8'
  );

  console.log(`\n✅ Registry built successfully!`);
  console.log(`   Components: ${components.length}`);
  console.log(`   Categories: ${CATEGORIES.length}`);
  console.log(`   Output: ${OUTPUT_PATH}`);
}

// Run the build
buildRegistry().catch((error) => {
  console.error('❌ Failed to build registry:', error);
  process.exit(1);
});
