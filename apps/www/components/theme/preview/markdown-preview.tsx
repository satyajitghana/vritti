'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export function MarkdownPreview() {
  return (
    <Card>
      <CardContent className="max-w-none p-6 space-y-4 text-foreground">
        {/* H1 */}
        <h1 className="text-3xl font-bold tracking-tight border-b pb-2">
          Markdown Theme Preview
        </h1>
        <p className="text-muted-foreground leading-7">
          This preview shows how <strong className="text-foreground font-semibold">markdown content</strong> renders
          with your theme. Markdown is used extensively in documentation, blog posts, and README files.
        </p>

        {/* H2 */}
        <h2 className="text-2xl font-semibold tracking-tight border-b pb-1.5 mt-8">
          Text Formatting
        </h2>
        <p className="leading-7">
          You can use <strong className="font-semibold">bold text</strong>,{' '}
          <em>italic text</em>,{' '}
          <strong className="font-semibold"><em>bold and italic</em></strong>, and{' '}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">inline code</code>.
          You can also use{' '}
          <a href="#" className="text-primary underline underline-offset-4 hover:text-primary/80">links</a>{' '}
          and <del className="text-muted-foreground">strikethrough</del> text.
        </p>

        {/* Blockquote */}
        <h3 className="text-xl font-semibold mt-6">Blockquotes</h3>
        <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
          <p className="leading-7">
            &ldquo;The best way to predict the future is to invent it.&rdquo;
          </p>
          <p className="text-sm mt-1">&mdash; Alan Kay</p>
        </blockquote>

        {/* Lists */}
        <h3 className="text-xl font-semibold mt-6">Lists</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Unordered</h4>
            <ul className="space-y-1.5 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1.5">•</span>
                First item with some detail
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1.5">•</span>
                <div>
                  Second item with a nested list:
                  <ul className="mt-1 ml-4 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="text-muted-foreground mt-1.5">◦</span>
                      Nested item one
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-muted-foreground mt-1.5">◦</span>
                      Nested item two
                    </li>
                  </ul>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1.5">•</span>
                Third item
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Ordered</h4>
            <ol className="space-y-1.5 text-sm list-decimal list-inside">
              <li>Install dependencies</li>
              <li>Configure your theme</li>
              <li>Build and deploy</li>
            </ol>
          </div>
        </div>

        {/* Code Block */}
        <h3 className="text-xl font-semibold mt-6">Code Blocks</h3>
        <div className="rounded-lg border bg-muted/50 overflow-hidden">
          <div className="flex items-center gap-2 border-b bg-muted px-4 py-2">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-500/70" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
              <div className="h-3 w-3 rounded-full bg-green-500/70" />
            </div>
            <span className="text-xs text-muted-foreground font-mono ml-2">theme-toggle.tsx</span>
          </div>
          <pre className="p-4 text-sm font-mono overflow-x-auto leading-relaxed">
            <code>{`import { useTheme } from 'next-themes'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button onClick={() => setTheme(
      theme === 'dark' ? 'light' : 'dark'
    )}>
      Toggle Theme
    </button>
  )
}`}</code>
          </pre>
        </div>

        {/* Table */}
        <h3 className="text-xl font-semibold mt-6">Tables</h3>
        <div className="rounded-lg border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left font-semibold p-3">Property</th>
                <th className="text-left font-semibold p-3">Type</th>
                <th className="text-left font-semibold p-3">Default</th>
                <th className="text-left font-semibold p-3">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3"><code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">theme</code></td>
                <td className="p-3 text-muted-foreground"><code className="font-mono text-xs">string</code></td>
                <td className="p-3"><code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">&quot;system&quot;</code></td>
                <td className="p-3">The active theme</td>
              </tr>
              <tr className="border-b">
                <td className="p-3"><code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">radius</code></td>
                <td className="p-3 text-muted-foreground"><code className="font-mono text-xs">number</code></td>
                <td className="p-3"><code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">0.5</code></td>
                <td className="p-3">Border radius in rem</td>
              </tr>
              <tr>
                <td className="p-3"><code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">fontSans</code></td>
                <td className="p-3 text-muted-foreground"><code className="font-mono text-xs">string</code></td>
                <td className="p-3"><code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">&quot;Geist&quot;</code></td>
                <td className="p-3">Sans-serif font family</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Horizontal Rule */}
        <Separator className="my-6" />

        {/* Task List */}
        <h3 className="text-xl font-semibold">Task List</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2">
            <input type="checkbox" checked readOnly className="rounded border-border" />
            <span className="line-through text-muted-foreground">Setup project structure</span>
          </li>
          <li className="flex items-center gap-2">
            <input type="checkbox" checked readOnly className="rounded border-border" />
            <span className="line-through text-muted-foreground">Configure theme variables</span>
          </li>
          <li className="flex items-center gap-2">
            <input type="checkbox" readOnly className="rounded border-border" />
            <span>Write documentation</span>
          </li>
          <li className="flex items-center gap-2">
            <input type="checkbox" readOnly className="rounded border-border" />
            <span>Add tests</span>
          </li>
        </ul>

        {/* Alert/Callout */}
        <h3 className="text-xl font-semibold mt-6">Callouts</h3>
        <div className="rounded-lg border-l-4 border-primary bg-primary/5 p-4">
          <p className="font-semibold text-sm">Note</p>
          <p className="text-sm text-muted-foreground mt-1">
            This is an informational callout. It uses the primary theme color for the left border.
          </p>
        </div>
        <div className="rounded-lg border-l-4 border-destructive bg-destructive/5 p-4 mt-3">
          <p className="font-semibold text-sm">Warning</p>
          <p className="text-sm text-muted-foreground mt-1">
            This is a warning callout. It uses the destructive theme color for emphasis.
          </p>
        </div>

        {/* Keyboard shortcuts */}
        <h3 className="text-xl font-semibold mt-6">Inline Elements</h3>
        <p className="leading-7 text-sm">
          Press <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-xs">Ctrl</kbd> +{' '}
          <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-xs">C</kbd> to copy.
          You can <mark className="rounded bg-primary/20 px-1">highlight important text</mark> and use{' '}
          <abbr title="HyperText Markup Language" className="underline decoration-dotted cursor-help">HTML</abbr>{' '}
          abbreviations.
        </p>
      </CardContent>
    </Card>
  );
}
