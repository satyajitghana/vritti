import { promises as fs } from 'fs'
import path from 'path'

const REGISTRY_BASE = path.join(process.cwd(), 'registry', 'components')
const BLOCKS_BASE = path.join(process.cwd(), 'registry', 'blocks')
const COMPONENT_DOCS_OUTPUT = path.join(process.cwd(), 'content', 'docs', 'components')
const BLOCK_DOCS_OUTPUT = path.join(process.cwd(), 'content', 'docs', 'blocks')

const CATEGORIES = [
  { name: 'animations', label: 'Animations' },
  { name: 'backgrounds', label: 'Backgrounds' },
  { name: 'text', label: 'Text Effects' },
  { name: 'buttons', label: 'Buttons' },
  { name: 'layouts', label: 'Layouts' },
  { name: 'inputs', label: 'Inputs' },
  { name: 'media', label: 'Media' },
  { name: 'special', label: 'Special' },
]

const BLOCK_CATEGORIES = [
  { name: 'hero', label: 'Hero Sections' },
  { name: 'pricing', label: 'Pricing' },
  { name: 'auth', label: 'Authentication' },
  { name: 'testimonial', label: 'Testimonials' },
  { name: 'contact', label: 'Contact' },
  { name: 'faq', label: 'FAQ' },
  { name: 'footer', label: 'Footers' },
  { name: 'blog', label: 'Blog' },
  { name: 'ecommerce', label: 'E-Commerce' },
  { name: 'billing', label: 'Billing' },
  { name: 'modal', label: 'Modals' },
  { name: 'account', label: 'Account' },
  { name: 'special', label: 'Special' },
]

function toTitleCase(str: string): string {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

interface ItemInfo {
  name: string
  title: string
  description: string
  category: string
  dependencies: string[]
  hasExample: boolean
  type: 'component' | 'block'
}

async function scanItems(basePath: string, categories: { name: string; label: string }[], itemType: 'component' | 'block'): Promise<ItemInfo[]> {
  const items: ItemInfo[] = []

  for (const category of categories) {
    const categoryPath = path.join(basePath, category.name)
    let entries: string[]
    try {
      entries = await fs.readdir(categoryPath)
    } catch {
      continue
    }

    for (const name of entries) {
      const itemDir = path.join(categoryPath, name)
      const stat = await fs.stat(itemDir)
      if (!stat.isDirectory()) continue

      const hasComponent = await fs
        .access(path.join(itemDir, 'component.tsx'))
        .then(() => true)
        .catch(() => false)

      if (!hasComponent) continue

      let metadata: Record<string, unknown> = {}
      try {
        const jsonContent = await fs.readFile(
          path.join(itemDir, 'component.json'),
          'utf-8'
        )
        metadata = JSON.parse(jsonContent)
      } catch {
        // Use defaults
      }

      const hasExample = await fs
        .access(path.join(itemDir, 'example.tsx'))
        .then(() => true)
        .catch(() => false)

      items.push({
        name,
        title: (metadata.title as string) || toTitleCase(name),
        description:
          (metadata.description as string) ||
          `${toTitleCase(name)} ${itemType}.`,
        category: category.name,
        dependencies: (metadata.dependencies as string[]) || [],
        hasExample,
        type: itemType,
      })
    }
  }

  return items.sort((a, b) => a.name.localeCompare(b.name))
}

function generateItemMDX(item: ItemInfo): string {
  const lines: string[] = []
  const docsPath = item.type === 'component' ? 'components' : 'blocks'

  lines.push('---')
  lines.push(`title: ${item.title}`)
  lines.push(`description: ${item.description}`)
  lines.push('---')
  lines.push('')

  if (item.hasExample) {
    lines.push(`<ComponentPreview name="${item.name}-demo" />`)
    lines.push('')
  }

  lines.push('## Installation')
  lines.push('')
  lines.push('<Steps>')
  lines.push('')
  lines.push(
    '<Step>Copy and paste the following code into your project.</Step>'
  )
  lines.push('')
  lines.push(`<ComponentSource name="${item.name}" />`)
  lines.push('')
  lines.push('<Step>Update the import paths to match your project setup.</Step>')
  lines.push('')
  lines.push('</Steps>')

  if (item.dependencies.length > 0) {
    lines.push('')
    lines.push('## Dependencies')
    lines.push('')
    lines.push('```bash')
    lines.push(`npm install ${item.dependencies.join(' ')}`)
    lines.push('```')
  }

  lines.push('')

  return lines.join('\n')
}

function generateIndexMDX(
  items: ItemInfo[],
  categories: { name: string; label: string }[],
  title: string,
  description: string,
): string {
  const lines: string[] = []

  lines.push('---')
  lines.push(`title: ${title}`)
  lines.push(`description: ${description}`)
  lines.push('---')
  lines.push('')
  lines.push(
    `Explore our collection of **${items.length}+** ${title.toLowerCase()} organized into ${categories.length} categories.`
  )
  lines.push('')

  for (const category of categories) {
    const categoryItems = items.filter(
      (c) => c.category === category.name
    )
    if (categoryItems.length === 0) continue

    const docsPath = categoryItems[0].type === 'component' ? 'components' : 'blocks'

    lines.push(`## ${category.label}`)
    lines.push('')
    for (const item of categoryItems) {
      lines.push(
        `- [${item.title}](/docs/${docsPath}/${item.name}) - ${item.description}`
      )
    }
    lines.push('')
  }

  return lines.join('\n')
}

async function main() {
  // === COMPONENTS ===
  console.log('Scanning components...')
  const components = await scanItems(REGISTRY_BASE, CATEGORIES, 'component')
  console.log(`Found ${components.length} components`)

  await fs.mkdir(COMPONENT_DOCS_OUTPUT, { recursive: true })

  let created = 0
  for (const comp of components) {
    const filePath = path.join(COMPONENT_DOCS_OUTPUT, `${comp.name}.mdx`)
    const content = generateItemMDX(comp)
    await fs.writeFile(filePath, content, 'utf-8')
    created++
  }
  console.log(`Generated ${created} component MDX files`)

  const componentIndexContent = generateIndexMDX(
    components,
    CATEGORIES,
    'Components',
    'Browse all Vritti UI components organized by category.',
  )
  await fs.writeFile(path.join(COMPONENT_DOCS_OUTPUT, 'index.mdx'), componentIndexContent, 'utf-8')
  console.log('Generated components/index.mdx')

  // === BLOCKS ===
  console.log('Scanning blocks...')
  const blocks = await scanItems(BLOCKS_BASE, BLOCK_CATEGORIES, 'block')
  console.log(`Found ${blocks.length} blocks`)

  await fs.mkdir(BLOCK_DOCS_OUTPUT, { recursive: true })

  let blockCreated = 0
  for (const block of blocks) {
    const filePath = path.join(BLOCK_DOCS_OUTPUT, `${block.name}.mdx`)
    const content = generateItemMDX(block)
    await fs.writeFile(filePath, content, 'utf-8')
    blockCreated++
  }
  console.log(`Generated ${blockCreated} block MDX files`)

  const blockIndexContent = generateIndexMDX(
    blocks,
    BLOCK_CATEGORIES,
    'Blocks',
    'Browse all Vritti UI blocks organized by category. Ready-to-use page sections.',
  )
  await fs.writeFile(path.join(BLOCK_DOCS_OUTPUT, 'index.mdx'), blockIndexContent, 'utf-8')
  console.log('Generated blocks/index.mdx')

  // === META FILES ===
  // Root docs meta
  await fs.writeFile(
    path.join(process.cwd(), 'content', 'docs', 'meta.json'),
    JSON.stringify(
      {
        title: 'Documentation',
        pages: ['index', 'getting-started', 'components', 'blocks'],
      },
      null,
      2
    ),
    'utf-8'
  )
  console.log('Generated content/docs/meta.json')

  // Getting started meta
  await fs.writeFile(
    path.join(
      process.cwd(),
      'content',
      'docs',
      'getting-started',
      'meta.json'
    ),
    JSON.stringify(
      {
        title: 'Getting Started',
        pages: ['introduction', 'installation'],
      },
      null,
      2
    ),
    'utf-8'
  )
  console.log('Generated content/docs/getting-started/meta.json')

  // Components meta
  await fs.writeFile(
    path.join(COMPONENT_DOCS_OUTPUT, 'meta.json'),
    JSON.stringify(
      {
        title: 'Components',
        pages: ['index', '---All---'],
      },
      null,
      2
    ),
    'utf-8'
  )
  console.log('Generated content/docs/components/meta.json')

  // Blocks meta
  await fs.writeFile(
    path.join(BLOCK_DOCS_OUTPUT, 'meta.json'),
    JSON.stringify(
      {
        title: 'Blocks',
        pages: ['index', '---All---'],
      },
      null,
      2
    ),
    'utf-8'
  )
  console.log('Generated content/docs/blocks/meta.json')

  console.log('Done!')
}

main().catch((error) => {
  console.error('Failed to generate docs:', error)
  process.exit(1)
})
