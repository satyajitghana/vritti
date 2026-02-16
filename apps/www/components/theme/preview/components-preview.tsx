'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';

// Enhanced version of the original PreviewCard component
// Now uses proper Tailwind classes instead of inline styles for better theming

export function ComponentsPreview() {
  return (
    <div className="space-y-6">
      {/* Card with Buttons */}
      <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
        <h3 className="text-lg font-semibold leading-none tracking-tight">Card Title</h3>
        <p className="text-sm text-muted-foreground mt-2">
          This is a card description to show how your theme looks with different text styles.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button variant="default">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button
            className="bg-accent text-accent-foreground shadow-sm hover:bg-accent/80"
          >
            Accent
          </Button>
        </div>
      </div>

      {/* Form Elements */}
      <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
        <h3 className="text-lg font-semibold leading-none tracking-tight mb-4">Form Elements</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-sm font-medium">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="hello@example.com"
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="message" className="text-sm font-medium">Message</Label>
            <textarea
              id="message"
              placeholder="Your message..."
              rows={3}
              className="mt-1.5 flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded border-2 border-primary bg-primary flex items-center justify-center">
              <svg
                className="h-3 w-3 text-primary-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-sm">Accept terms and conditions</span>
          </div>
        </div>
      </div>

      {/* Badges & Alerts */}
      <div className="rounded-xl border bg-card shadow p-6">
        <h3 className="text-lg font-semibold leading-none tracking-tight text-card-foreground mb-4">
          Badges & Alerts
        </h3>
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="default">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge className="bg-accent text-accent-foreground hover:bg-accent/80">Accent</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>

        <div className="space-y-3">
          <div className="rounded-md border bg-muted text-muted-foreground p-4">
            <p className="text-sm font-medium text-foreground mb-1">
              Muted Alert
            </p>
            <p className="text-sm">This is an informational alert using muted colors.</p>
          </div>

          <div className="rounded-md border-l-4 border-l-accent bg-accent/10 text-accent-foreground p-4">
            <p className="text-sm font-medium mb-1">Accent Alert</p>
            <p className="text-sm opacity-90">This alert uses the accent color scheme.</p>
          </div>
        </div>
      </div>

      {/* Popovers / Tooltips Preview */}
      <div className="rounded-xl border bg-card shadow p-6">
        <h3 className="text-lg font-semibold leading-none tracking-tight text-card-foreground mb-4">
          Popover Colors
        </h3>
        <div className="rounded-md border bg-popover text-popover-foreground shadow-md p-4 inline-block">
          <p className="text-sm font-medium mb-2">Popover Content</p>
          <p className="text-sm opacity-90">
            This is how popovers and tooltips will appear with your theme.
          </p>
        </div>
      </div>
    </div>
  );
}
