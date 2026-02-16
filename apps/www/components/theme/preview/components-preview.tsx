'use client';

// Enhanced version of the original PreviewCard component
// Extracted from theme-editor.tsx and enhanced with more examples

export function ComponentsPreview() {
  return (
    <div className="space-y-6">
      {/* Card with Buttons */}
      <div
        className="rounded-lg border p-6"
        style={{
          backgroundColor: 'hsl(var(--card))',
          color: 'hsl(var(--card-foreground))',
          borderColor: 'hsl(var(--border))',
        }}
      >
        <h3 className="text-lg font-semibold">Card Title</h3>
        <p className="text-sm mt-2" style={{ color: 'hsl(var(--muted-foreground))' }}>
          This is a card description to show how your theme looks with different text styles.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            className="rounded-md px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90"
            style={{
              backgroundColor: 'hsl(var(--primary))',
              color: 'hsl(var(--primary-foreground))',
            }}
          >
            Primary
          </button>
          <button
            className="rounded-md px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90"
            style={{
              backgroundColor: 'hsl(var(--secondary))',
              color: 'hsl(var(--secondary-foreground))',
            }}
          >
            Secondary
          </button>
          <button
            className="rounded-md px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90"
            style={{
              backgroundColor: 'hsl(var(--destructive))',
              color: 'hsl(var(--destructive-foreground))',
            }}
          >
            Destructive
          </button>
          <button
            className="rounded-md px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90"
            style={{
              backgroundColor: 'hsl(var(--accent))',
              color: 'hsl(var(--accent-foreground))',
            }}
          >
            Accent
          </button>
        </div>
      </div>

      {/* Form Elements */}
      <div
        className="rounded-lg border p-6"
        style={{
          backgroundColor: 'hsl(var(--card))',
          color: 'hsl(var(--card-foreground))',
          borderColor: 'hsl(var(--border))',
        }}
      >
        <h3 className="text-lg font-semibold mb-4">Form Elements</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Email</label>
            <input
              type="email"
              placeholder="hello@example.com"
              className="w-full rounded-md border px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2"
              style={{
                backgroundColor: 'hsl(var(--background))',
                borderColor: 'hsl(var(--input))',
                color: 'hsl(var(--foreground))',
              }}
              onFocus={(e) => {
                e.target.style.setProperty('--tw-ring-color', 'hsl(var(--ring))');
              }}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Message</label>
            <textarea
              placeholder="Your message..."
              rows={3}
              className="w-full rounded-md border px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2"
              style={{
                backgroundColor: 'hsl(var(--background))',
                borderColor: 'hsl(var(--input))',
                color: 'hsl(var(--foreground))',
              }}
              onFocus={(e) => {
                e.target.style.setProperty('--tw-ring-color', 'hsl(var(--ring))');
              }}
            />
          </div>
          <div className="flex items-center gap-2">
            <div
              className="h-5 w-5 rounded border flex items-center justify-center"
              style={{
                backgroundColor: 'hsl(var(--primary))',
                borderColor: 'hsl(var(--primary))',
              }}
            >
              <svg
                className="h-3 w-3"
                style={{ color: 'hsl(var(--primary-foreground))' }}
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
      <div
        className="rounded-lg border p-6"
        style={{
          backgroundColor: 'hsl(var(--card))',
          borderColor: 'hsl(var(--border))',
        }}
      >
        <h3 className="text-lg font-semibold mb-4" style={{ color: 'hsl(var(--card-foreground))' }}>
          Badges & Alerts
        </h3>
        <div className="flex flex-wrap gap-2 mb-4">
          <span
            className="rounded-full px-3 py-1 text-xs font-medium"
            style={{ backgroundColor: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}
          >
            Primary
          </span>
          <span
            className="rounded-full px-3 py-1 text-xs font-medium"
            style={{ backgroundColor: 'hsl(var(--secondary))', color: 'hsl(var(--secondary-foreground))' }}
          >
            Secondary
          </span>
          <span
            className="rounded-full px-3 py-1 text-xs font-medium"
            style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}
          >
            Accent
          </span>
          <span
            className="rounded-full px-3 py-1 text-xs font-medium"
            style={{ backgroundColor: 'hsl(var(--destructive))', color: 'hsl(var(--destructive-foreground))' }}
          >
            Destructive
          </span>
          <span
            className="rounded-full border px-3 py-1 text-xs font-medium"
            style={{ borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }}
          >
            Outline
          </span>
        </div>

        <div className="space-y-3">
          <div
            className="rounded-md border p-4"
            style={{
              backgroundColor: 'hsl(var(--muted))',
              borderColor: 'hsl(var(--border))',
              color: 'hsl(var(--muted-foreground))',
            }}
          >
            <p className="text-sm font-medium mb-1" style={{ color: 'hsl(var(--foreground))' }}>
              Muted Alert
            </p>
            <p className="text-sm">This is an informational alert using muted colors.</p>
          </div>

          <div
            className="rounded-md border-l-4 p-4"
            style={{
              backgroundColor: 'hsl(var(--accent))',
              borderLeftColor: 'hsl(var(--accent-foreground))',
              color: 'hsl(var(--accent-foreground))',
            }}
          >
            <p className="text-sm font-medium mb-1">Accent Alert</p>
            <p className="text-sm opacity-90">This alert uses the accent color scheme.</p>
          </div>
        </div>
      </div>

      {/* Popovers / Tooltips Preview */}
      <div
        className="rounded-lg border p-6"
        style={{
          backgroundColor: 'hsl(var(--card))',
          borderColor: 'hsl(var(--border))',
        }}
      >
        <h3 className="text-lg font-semibold mb-4" style={{ color: 'hsl(var(--card-foreground))' }}>
          Popover Colors
        </h3>
        <div
          className="rounded-md border p-4 inline-block"
          style={{
            backgroundColor: 'hsl(var(--popover))',
            borderColor: 'hsl(var(--border))',
            color: 'hsl(var(--popover-foreground))',
          }}
        >
          <p className="text-sm font-medium mb-2">Popover Content</p>
          <p className="text-sm opacity-90">
            This is how popovers and tooltips will appear with your theme.
          </p>
        </div>
      </div>
    </div>
  );
}
