import { promises as fs } from 'fs'
import path from 'path'

const REGISTRY_BASE = path.join(process.cwd(), 'registry', 'components')
const DOCS_OUTPUT = path.join(process.cwd(), 'content', 'docs', 'components')

const CATEGORIES = [
  { name: 'animations', label: 'Animations' },
  { name: 'backgrounds', label: 'Backgrounds' },
  { name: 'text', label: 'Text Effects' },
  { name: 'buttons', label: 'Buttons' },
  { name: 'layouts', label: 'Layouts' },
  { name: 'special', label: 'Special' },
]

function toTitleCase(str: string): string {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

interface ComponentInfo {
  name: string
  title: string
  description: string
  category: string
  dependencies: string[]
  hasExample: boolean
}

async function scanComponents(): Promise<ComponentInfo[]> {
  const components: ComponentInfo[] = []

  for (const category of CATEGORIES) {
    const categoryPath = path.join(REGISTRY_BASE, category.name)
    let items: string[]
    try {
      items = await fs.readdir(categoryPath)
    } catch {
      continue
    }

    for (const name of items) {
      const componentDir = path.join(categoryPath, name)
      const stat = await fs.stat(componentDir)
      if (!stat.isDirectory()) continue

      const hasComponent = await fs
        .access(path.join(componentDir, 'component.tsx'))
        .then(() => true)
        .catch(() => false)

      if (!hasComponent) continue

      let metadata: Record<string, unknown> = {}
      try {
        const jsonContent = await fs.readFile(
          path.join(componentDir, 'component.json'),
          'utf-8'
        )
        metadata = JSON.parse(jsonContent)
      } catch {
        // Use defaults
      }

      const hasExample = await fs
        .access(path.join(componentDir, 'example.tsx'))
        .then(() => true)
        .catch(() => false)

      components.push({
        name,
        title: (metadata.title as string) || toTitleCase(name),
        description:
          (metadata.description as string) ||
          `${toTitleCase(name)} component.`,
        category: category.name,
        dependencies: (metadata.dependencies as string[]) || [],
        hasExample,
      })
    }
  }

  return components.sort((a, b) => a.name.localeCompare(b.name))
}

function generateComponentMDX(comp: ComponentInfo): string {
  const lines: string[] = []

  lines.push('---')
  lines.push(`title: ${comp.title}`)
  lines.push(`description: ${comp.description}`)
  lines.push('---')
  lines.push('')

  if (comp.hasExample) {
    lines.push(`<ComponentPreview name="${comp.name}-demo" />`)
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
  lines.push(`<ComponentSource name="${comp.name}" />`)
  lines.push('')
  lines.push('<Step>Update the import paths to match your project setup.</Step>')
  lines.push('')
  lines.push('</Steps>')

  if (comp.dependencies.length > 0) {
    lines.push('')
    lines.push('## Dependencies')
    lines.push('')
    lines.push('```bash')
    lines.push(`npm install ${comp.dependencies.join(' ')}`)
    lines.push('```')
  }

  lines.push('')

  return lines.join('\n')
}

function generateIndexMDX(
  components: ComponentInfo[]
): string {
  const lines: string[] = []

  lines.push('---')
  lines.push('title: Components')
  lines.push(
    'description: Browse all Vritti UI components organized by category.'
  )
  lines.push('---')
  lines.push('')
  lines.push(
    `Explore our collection of **${components.length}+** components organized into ${CATEGORIES.length} categories.`
  )
  lines.push('')

  for (const category of CATEGORIES) {
    const categoryComponents = components.filter(
      (c) => c.category === category.name
    )
    if (categoryComponents.length === 0) continue

    lines.push(`## ${category.label}`)
    lines.push('')
    for (const comp of categoryComponents) {
      lines.push(
        `- [${comp.title}](/docs/components/${comp.name}) - ${comp.description}`
      )
    }
    lines.push('')
  }

  return lines.join('\n')
}

async function main() {
  console.log('Scanning components...')
  const components = await scanComponents()
  console.log(`Found ${components.length} components`)

  // Ensure output directory exists
  await fs.mkdir(DOCS_OUTPUT, { recursive: true })

  // Generate individual component docs
  let created = 0
  for (const comp of components) {
    const filePath = path.join(DOCS_OUTPUT, `${comp.name}.mdx`)
    const content = generateComponentMDX(comp)
    await fs.writeFile(filePath, content, 'utf-8')
    created++
  }
  console.log(`Generated ${created} component MDX files`)

  // Generate components index
  const indexContent = generateIndexMDX(components)
  await fs.writeFile(path.join(DOCS_OUTPUT, 'index.mdx'), indexContent, 'utf-8')
  console.log('Generated components/index.mdx')

  // Generate meta.json files for fumadocs page tree
  // Root docs meta
  await fs.writeFile(
    path.join(process.cwd(), 'content', 'docs', 'meta.json'),
    JSON.stringify(
      {
        title: 'Documentation',
        pages: ['index', 'getting-started', 'components'],
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

  // Components meta - use "---All---" to include all pages alphabetically
  await fs.writeFile(
    path.join(DOCS_OUTPUT, 'meta.json'),
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

  console.log('Done!')
}

main().catch((error) => {
  console.error('Failed to generate docs:', error)
  process.exit(1)
})
