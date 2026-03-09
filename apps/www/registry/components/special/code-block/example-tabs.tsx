"use client";

import { CodeBlock } from "./component";

export default function CodeBlockTabsExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="w-full max-w-lg">
        <CodeBlock
          language="typescript"
          filename="multi-tab"
          tabs={[
            {
              name: "index.ts",
              code: `import { greet } from "./utils";\n\ngreet("World");`,
              language: "typescript",
            },
            {
              name: "utils.ts",
              code: `export function greet(name: string) {\n  console.log(\`Hello, \${name}!\`);\n}`,
              language: "typescript",
              highlightLines: [2],
            },
          ]}
        />
      </div>
    </div>
  );
}
