'use client';

import { useThemeStore } from '@/lib/stores/theme-store';

export function TypographyPreview() {
  const { fontSans, fontMono, fontSerif } = useThemeStore();

  return (
    <div className="space-y-8">
      {/* Headings */}
      <div>
        <h4 className="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wide">
          Headings
        </h4>
        <div className="space-y-4" style={{ fontFamily: fontSans }}>
          <h1 className="text-4xl font-bold tracking-tight">Heading 1</h1>
          <h2 className="text-3xl font-semibold tracking-tight">Heading 2</h2>
          <h3 className="text-2xl font-semibold tracking-tight">Heading 3</h3>
          <h4 className="text-xl font-semibold tracking-tight">Heading 4</h4>
          <h5 className="text-lg font-semibold tracking-tight">Heading 5</h5>
          <h6 className="text-base font-semibold tracking-tight">Heading 6</h6>
        </div>
      </div>

      {/* Body Text */}
      <div>
        <h4 className="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wide">
          Body Text
        </h4>
        <div className="space-y-4" style={{ fontFamily: fontSans }}>
          <p className="text-base">
            The quick brown fox jumps over the lazy dog. This is a paragraph of regular body text to show
            how the font appears in normal reading content.
          </p>
          <p className="text-sm text-muted-foreground">
            Smaller text is often used for secondary information or helper text. It should still be readable
            and comfortable to read.
          </p>
          <p className="text-xs text-muted-foreground">
            Extra small text for fine print or metadata.
          </p>
        </div>
      </div>

      {/* Font Families */}
      <div>
        <h4 className="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wide">
          Font Families
        </h4>
        <div className="space-y-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1 font-mono">{fontSans}</p>
            <p className="text-lg" style={{ fontFamily: fontSans }}>
              The quick brown fox jumps over the lazy dog. 0123456789
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1 font-mono">{fontSerif}</p>
            <p className="text-lg" style={{ fontFamily: fontSerif }}>
              The quick brown fox jumps over the lazy dog. 0123456789
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1 font-mono">{fontMono}</p>
            <p className="text-lg" style={{ fontFamily: fontMono }}>
              The quick brown fox jumps over the lazy dog. 0123456789
            </p>
          </div>
        </div>
      </div>

      {/* Code Block */}
      <div>
        <h4 className="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wide">
          Code Block
        </h4>
        <pre
          className="rounded-lg border p-4 text-sm overflow-x-auto"
          style={{
            backgroundColor: 'hsl(var(--muted))',
            borderColor: 'hsl(var(--border))',
            fontFamily: fontMono,
          }}
        >
          <code style={{ color: 'hsl(var(--foreground))' }}>
            {`function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

const message = greet("World");
console.log(message);`}
          </code>
        </pre>
      </div>

      {/* Lists */}
      <div>
        <h4 className="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wide">
          Lists
        </h4>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm font-medium mb-2">Unordered List</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>First item in the list</li>
              <li>Second item in the list</li>
              <li>Third item in the list</li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Ordered List</p>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>First item in the list</li>
              <li>Second item in the list</li>
              <li>Third item in the list</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Blockquote */}
      <div>
        <h4 className="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wide">
          Blockquote
        </h4>
        <blockquote
          className="border-l-4 pl-4 italic text-muted-foreground"
          style={{ borderLeftColor: 'hsl(var(--primary))' }}
        >
          "Design is not just what it looks like and feels like. Design is how it works."
          <footer className="text-sm mt-2 not-italic">— Steve Jobs</footer>
        </blockquote>
      </div>
    </div>
  );
}
