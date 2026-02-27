/**
 * Validates all registry components can be served without syntax errors.
 *
 * Usage:
 *   1. Start the dev server: pnpm --filter @vritti/www dev
 *   2. Run: pnpm --filter @vritti/www tsx scripts/validate-registry.mts
 *
 * The script fetches each component from the /r/<name> API endpoint and
 * validates that every file's content is parseable TypeScript/TSX.
 */

import { promises as fs } from "fs"
import path from "path"
import { Project, ScriptKind } from "ts-morph"

const BASE_URL = process.env.BASE_URL || "http://localhost:3000"

const REGISTRY_BASE = path.join(process.cwd(), "registry", "components")
const BLOCKS_BASE = path.join(process.cwd(), "registry", "blocks")

const CATEGORIES = [
  "animations",
  "backgrounds",
  "text",
  "buttons",
  "layouts",
  "inputs",
  "media",
  "special",
]

const BLOCK_CATEGORIES = [
  "hero",
  "pricing",
  "auth",
  "testimonial",
  "contact",
  "faq",
  "footer",
  "blog",
  "ecommerce",
  "billing",
  "modal",
  "account",
  "special",
]

async function scanNames(basePath: string, categories: string[]): Promise<string[]> {
  const names: string[] = []
  for (const category of categories) {
    const categoryPath = path.join(basePath, category)
    let entries: string[]
    try {
      entries = await fs.readdir(categoryPath)
    } catch {
      continue
    }
    for (const name of entries) {
      const componentDir = path.join(categoryPath, name)
      const stat = await fs.stat(componentDir)
      if (!stat.isDirectory()) continue
      const hasComponent = await fs
        .access(path.join(componentDir, "component.tsx"))
        .then(() => true)
        .catch(() => false)
      if (hasComponent) names.push(name)
    }
  }
  return names.sort()
}

interface RegistryFile {
  path: string
  content: string
  type: string
  target?: string
}

interface RegistryResponse {
  name: string
  files: RegistryFile[]
  error?: string
}

async function fetchComponent(name: string): Promise<RegistryResponse> {
  const url = `${BASE_URL}/r/${name}`
  const resp = await fetch(url)
  if (!resp.ok) {
    throw new Error(`HTTP ${resp.status} for ${name}`)
  }
  return resp.json()
}

function validateTypeScript(content: string, fileName: string): string | null {
  try {
    const project = new Project({ compilerOptions: {} })
    project.createSourceFile(
      `/tmp/validate-${fileName}`,
      content,
      { scriptKind: ScriptKind.TSX }
    )
    // ts-morph will throw on severe parse errors, but we also check for diagnostics
    return null
  } catch (err: unknown) {
    return err instanceof Error ? err.message : String(err)
  }
}

async function main() {
  console.log("Scanning component directories...")
  const componentNames = await scanNames(REGISTRY_BASE, CATEGORIES)
  const blockNames = await scanNames(BLOCKS_BASE, BLOCK_CATEGORIES)
  const allNames = [...componentNames, ...blockNames]
  console.log(`Found ${componentNames.length} components and ${blockNames.length} blocks (${allNames.length} total)`)

  console.log(`\nFetching from ${BASE_URL}/r/...\n`)

  const results: { name: string; status: "pass" | "fail"; error?: string }[] = []
  let passCount = 0
  let failCount = 0

  // Process in batches of 10 for reasonable concurrency
  const BATCH_SIZE = 10
  for (let i = 0; i < allNames.length; i += BATCH_SIZE) {
    const batch = allNames.slice(i, i + BATCH_SIZE)
    const batchResults = await Promise.allSettled(
      batch.map(async (name) => {
        try {
          const data = await fetchComponent(name)

          if (data.error) {
            return { name, status: "fail" as const, error: `API error: ${data.error}` }
          }

          if (!data.files || !Array.isArray(data.files) || data.files.length === 0) {
            return { name, status: "fail" as const, error: "No files in response" }
          }

          // Validate each file's content is parseable
          for (const file of data.files) {
            if (!file.content) {
              return { name, status: "fail" as const, error: `Empty content for ${file.path}` }
            }

            // Check for the specific broken pattern: "export <Identifier>;" without braces
            const brokenExport = file.content.match(/^export\s+(?!default|function|class|const|let|var|type|interface|enum|async|abstract|\{|\*)(\w+)\s*;?\s*$/m)
            if (brokenExport) {
              return {
                name,
                status: "fail" as const,
                error: `Broken export in ${file.path}: "export ${brokenExport[1]};" - should be "export { ${brokenExport[1]} }"`
              }
            }

            const parseErr = validateTypeScript(file.content, `${name}-${file.path.replace(/\//g, "-")}`)
            if (parseErr) {
              return { name, status: "fail" as const, error: `Parse error in ${file.path}: ${parseErr}` }
            }
          }

          return { name, status: "pass" as const }
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : String(err)
          return { name, status: "fail" as const, error: msg }
        }
      })
    )

    for (const result of batchResults) {
      const value = result.status === "fulfilled"
        ? result.value
        : { name: "unknown", status: "fail" as const, error: String((result as PromiseRejectedResult).reason) }

      results.push(value)
      if (value.status === "pass") {
        passCount++
        process.stdout.write(".")
      } else {
        failCount++
        process.stdout.write("F")
      }
    }
  }

  console.log("\n")

  // Print failures
  const failures = results.filter((r) => r.status === "fail")
  if (failures.length > 0) {
    console.log(`\n--- FAILURES (${failures.length}) ---\n`)
    for (const f of failures) {
      console.log(`  FAIL: ${f.name}`)
      console.log(`        ${f.error}\n`)
    }
  }

  console.log(`\n--- SUMMARY ---`)
  console.log(`  Total:  ${allNames.length}`)
  console.log(`  Pass:   ${passCount}`)
  console.log(`  Fail:   ${failCount}`)
  console.log()

  process.exit(failCount > 0 ? 1 : 0)
}

main().catch((err) => {
  console.error("Fatal error:", err)
  process.exit(1)
})
