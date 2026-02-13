/**
 * Build Registry Script
 * Scans src/registry/components/ and generates:
 * - registry/index.json (full registry)
 * - registry/components.json (components only)
 * - registry/blocks.json (blocks only)
 * - public/llms.txt (LLM-friendly component index)
 * - public/llms-full.txt (LLM-friendly full source dump)
 */

import { promises as fs } from 'fs';
import * as path from 'path';
import { type Registry, type RegistryComponent, CATEGORIES } from '../apps/www/src/registry/schema';
import { siteConfig } from '../apps/www/src/config/site';

const REGISTRY_PATH = path.join(process.cwd(), 'apps', 'www', 'src', 'registry', 'components');
const OUTPUT_PATH = path.join(process.cwd(), 'registry');
const PUBLIC_PATH = path.join(process.cwd(), 'apps', 'www', 'public');

async function buildRegistry() {
  console.log('Building component registry...');

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

            // Read example.tsx if it exists
            let exampleContent: string | undefined;
            const exampleFilePath = path.join(componentPath, 'example.tsx');
            try {
              exampleContent = await fs.readFile(exampleFilePath, 'utf-8');
            } catch {
              // example.tsx is optional
            }

            // Add files to component
            metadata.files = [
              {
                path: `components/ui/${componentName}.tsx`,
                content: componentContent,
                type: 'component',
              },
            ];

            // Store example content in meta for llms-full.txt generation
            if (exampleContent) {
              if (!metadata.meta) metadata.meta = {};
              (metadata.meta as Record<string, unknown>)._exampleContent = exampleContent;
            }

            // Validate category matches
            if (metadata.category !== category.name) {
              console.warn(
                `  Warning: Component "${componentName}" has category "${metadata.category}" but is in "${category.name}" directory`
              );
            }

            components.push(metadata);
            console.log(`  + ${category.name}/${componentName}`);
          } catch (error) {
            console.warn(`  Warning: Skipping ${category.name}/${componentName}: ${error}`);
          }
        }
      }
    } catch {
      // Category directory doesn't exist yet, that's fine
    }
  }

  // Create registry object
  const registry: Registry = {
    components,
    categories: CATEGORIES,
    version: '0.1.0',
    updatedAt: new Date().toISOString(),
  };

  // Ensure output directories exist
  await fs.mkdir(OUTPUT_PATH, { recursive: true });
  await fs.mkdir(PUBLIC_PATH, { recursive: true });

  // Write registry files
  // Strip _exampleContent from meta before writing registry JSON
  const cleanComponents = components.map((c) => {
    const meta = { ...c.meta };
    delete (meta as Record<string, unknown>)._exampleContent;
    return { ...c, meta: Object.keys(meta).length > 0 ? meta : c.meta };
  });

  const cleanRegistry = { ...registry, components: cleanComponents };

  await fs.writeFile(
    path.join(OUTPUT_PATH, 'index.json'),
    JSON.stringify(cleanRegistry, null, 2),
    'utf-8'
  );

  await fs.writeFile(
    path.join(OUTPUT_PATH, 'components.json'),
    JSON.stringify(
      { components: cleanComponents.filter((c) => c.type === 'component') },
      null,
      2
    ),
    'utf-8'
  );

  await fs.writeFile(
    path.join(OUTPUT_PATH, 'blocks.json'),
    JSON.stringify(
      { blocks: cleanComponents.filter((c) => c.type === 'block') },
      null,
      2
    ),
    'utf-8'
  );

  console.log(`\nRegistry built: ${components.length} components across ${CATEGORIES.length} categories`);

  // Generate llms.txt and llms-full.txt
  await buildLlmsFiles(components);
}

async function buildLlmsFiles(components: RegistryComponent[]) {
  console.log('\nGenerating llms.txt files...');

  const sorted = [...components].sort((a, b) => a.name.localeCompare(b.name));

  // Generate llms.txt (component index)
  const llmsLines = [
    `# ${siteConfig.name}`,
    '',
    `> ${siteConfig.description}`,
    '',
    'This file provides LLM-friendly entry points to documentation and examples.',
    '',
    '## Components',
    '',
    ...sorted.map((c) => {
      const title = c.name
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
      return `- [${title}](${siteConfig.url}/docs/components/${c.name}): ${c.description}`;
    }),
    '',
    '## Examples',
    '',
    ...sorted.map((c) => {
      const title = c.name
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
      return `- [${title} Example](${siteConfig.links.github}/blob/main/apps/www/src/registry/components/${c.category}/${c.name}/example.tsx): Example usage`;
    }),
    '',
    '## Optional',
    '',
    `- [Repository](${siteConfig.links.github}): Source code and issues`,
    `- [Sitemap](${siteConfig.url}/sitemap.xml): Indexable pages`,
  ];

  await fs.writeFile(path.join(PUBLIC_PATH, 'llms.txt'), llmsLines.join('\n'), 'utf-8');
  console.log(`  Generated public/llms.txt (${sorted.length} components)`);

  // Generate llms-full.txt (full source dump)
  const fullParts: string[] = [];

  for (const component of sorted) {
    const title = component.name
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

    const parts = [
      `===== COMPONENT: ${component.name} =====`,
      `Title: ${title}`,
      `Description: ${component.description}`,
      `Category: ${component.category}`,
      `Dependencies: ${component.dependencies?.join(', ') || 'none'}`,
      '',
    ];

    // Add component source
    if (component.files?.[0]?.content) {
      parts.push(`--- file: component.tsx ---`);
      parts.push(component.files[0].content);
    }

    // Add example source
    const exampleContent = (component.meta as Record<string, unknown>)?._exampleContent;
    if (exampleContent) {
      parts.push('');
      parts.push(`===== EXAMPLE: ${component.name}-example =====`);
      parts.push(`Title: ${title} Example`);
      parts.push('');
      parts.push(`--- file: example.tsx ---`);
      parts.push(exampleContent as string);
    }

    fullParts.push(parts.join('\n'));
  }

  await fs.writeFile(
    path.join(PUBLIC_PATH, 'llms-full.txt'),
    fullParts.join('\n\n\n'),
    'utf-8'
  );
  console.log(`  Generated public/llms-full.txt`);
}

// Run the build
buildRegistry().catch((error) => {
  console.error('Failed to build registry:', error);
  process.exit(1);
});
