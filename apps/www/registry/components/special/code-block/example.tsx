"use client";

import { CodeBlock } from "./component";

export default function CodeBlockExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="w-full max-w-lg">
        <CodeBlock
          language="typescript"
          filename="example.ts"
          highlightLines={[2, 3]}
          code={`function greet(name: string) {
  const message = \`Hello, \${name}!\`;
  console.log(message);
}

greet("World");`}
        />
      </div>
    </div>
  );
}
