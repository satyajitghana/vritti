"use client";

import { useState, useEffect } from "react";
import { useWebHaptics, defaultPatterns } from "@/registry/components/special/web-haptics/component";
import { siteConfig } from "@/config/site";

const presetInfo = [
  { key: "success", label: "Success", icon: "✓", desc: "Form saved, upload complete", category: "Notification" },
  { key: "warning", label: "Warning", icon: "⚠", desc: "Destructive action, approaching limit", category: "Notification" },
  { key: "error", label: "Error", icon: "✕", desc: "Validation fail, network error", category: "Notification" },
  { key: "light", label: "Light", icon: "○", desc: "Small toggle, minor interaction", category: "Impact" },
  { key: "medium", label: "Medium", icon: "◉", desc: "Button press, standard interaction", category: "Impact" },
  { key: "heavy", label: "Heavy", icon: "●", desc: "Major state change, force press", category: "Impact" },
  { key: "soft", label: "Soft", icon: "◌", desc: "Cushioned, rounded feel", category: "Impact" },
  { key: "rigid", label: "Rigid", icon: "▪", desc: "Hard, crisp tap", category: "Impact" },
  { key: "selection", label: "Selection", icon: "⋮", desc: "Picker scroll, slider detent", category: "Selection" },
  { key: "nudge", label: "Nudge", icon: "→", desc: "Nudge or reminder", category: "Custom" },
  { key: "buzz", label: "Buzz", icon: "〰", desc: "Long continuous vibration", category: "Custom" },
] as const;

const categories = ["Notification", "Impact", "Selection", "Custom"] as const;

const codeExample = `import { useWebHaptics } from "@/components/ui/web-haptics";

function MyComponent() {
  const { trigger, isSupported } = useWebHaptics();

  return (
    <button onClick={() => trigger("success")}>
      Save
    </button>
  );
}`;

const customExample = `// Custom pattern
trigger([
  { duration: 50, intensity: 0.8 },
  { delay: 100, duration: 30, intensity: 0.5 },
]);

// Simple duration
trigger(100);

// Number array (on/off alternating)
trigger([100, 50, 100]);`;

function QRCode({ url, size = 200 }: { url: string; size?: number }) {
  // Simple QR code using a canvas-free SVG approach via Google Charts API image
  // Falls back to a text link if the image doesn't load
  const [loaded, setLoaded] = useState(false);
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(url)}&format=svg`;

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="rounded-xl border border-border bg-white p-3"
        style={{ width: size + 24, height: size + 24 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={qrUrl}
          alt={`QR code to open ${url}`}
          width={size}
          height={size}
          onLoad={() => setLoaded(true)}
          className={loaded ? "opacity-100" : "opacity-0"}
          style={{ transition: "opacity 0.3s" }}
        />
      </div>
      <p className="text-xs text-muted-foreground text-center max-w-[200px]">
        Scan with your phone to feel the haptics
      </p>
    </div>
  );
}

export default function HapticsPage() {
  const { trigger, isSupported } = useWebHaptics({ debug: true });
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [customDuration, setCustomDuration] = useState(50);
  const [customIntensity, setCustomIntensity] = useState(0.7);
  const [isMobile, setIsMobile] = useState(false);
  const [pageUrl, setPageUrl] = useState(`${siteConfig.url}/haptics`);

  useEffect(() => {
    setIsMobile("ontouchstart" in window || navigator.maxTouchPoints > 0);
    setPageUrl(window.location.href);
  }, []);

  const handlePresetTap = (key: string) => {
    setActivePreset(key);
    trigger(key);
    setTimeout(() => setActivePreset(null), 300);
  };

  const handleCustomTrigger = () => {
    trigger([{ duration: customDuration, intensity: customIntensity }]);
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="border-b border-border">
        <div className="container mx-auto max-w-4xl px-4 py-10 sm:py-16 lg:py-24">
          <div className="flex flex-col items-center text-center gap-4 sm:gap-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-sm text-muted-foreground">
              <span
                className={`inline-block h-2 w-2 rounded-full ${
                  isSupported ? "bg-green-500" : "bg-yellow-500"
                } animate-pulse`}
              />
              {isSupported
                ? "Haptics supported — tap the patterns below!"
                : "Open on mobile for haptic feedback"}
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Web Haptics
            </h1>
            <p className="max-w-2xl text-base sm:text-lg text-muted-foreground">
              Native haptic feedback for mobile web apps. 11 built-in patterns inspired by
              Apple&apos;s Human Interface Guidelines. Zero dependencies, shadcn-installable.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button
                onClick={() => trigger("success")}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform active:scale-95"
              >
                Try Haptics
              </button>
              <a
                href="/docs/components/web-haptics"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-accent"
              >
                Documentation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* QR Code for Desktop Users */}
      {!isMobile && (
        <section className="border-b border-border bg-muted/30">
          <div className="container mx-auto max-w-4xl px-4 py-8 sm:py-12">
            <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
              <QRCode url={pageUrl} size={160} />
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-xl font-bold mb-2">Best experienced on mobile</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Haptic feedback requires a mobile device with vibration support.
                  Scan the QR code to open this page on your phone, then tap the
                  patterns below to feel each haptic effect.
                </p>
                <p className="text-muted-foreground text-xs mt-3">
                  On desktop, debug mode plays audio tones to simulate the feedback.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Install */}
      <section className="border-b border-border">
        <div className="container mx-auto max-w-4xl px-4 py-8 sm:py-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Installation</h2>
          <div className="rounded-lg border border-border bg-muted/50 p-3 sm:p-4 font-mono text-xs sm:text-sm overflow-x-auto">
            npx shadcn@latest add &quot;{siteConfig.url}/r/web-haptics&quot;
          </div>
        </div>
      </section>

      {/* Presets Grid */}
      <section className="border-b border-border">
        <div className="container mx-auto max-w-4xl px-4 py-8 sm:py-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">Built-in Patterns</h2>
          <p className="text-muted-foreground text-sm sm:text-base mb-6 sm:mb-8">
            {isMobile
              ? "Tap each pattern to feel the haptic feedback."
              : "Tap each pattern to preview. On mobile, you\u2019ll feel the vibration."}
          </p>

          {categories.map((category) => (
            <div key={category} className="mb-6 sm:mb-8">
              <h3 className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2 sm:mb-3">
                {category}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                {presetInfo
                  .filter((p) => p.category === category)
                  .map((preset) => {
                    const pattern = defaultPatterns[preset.key as keyof typeof defaultPatterns];
                    const totalMs = pattern.pattern.reduce(
                      (sum, v) => sum + v.duration + ("delay" in v ? (v as { delay: number }).delay : 0),
                      0,
                    );
                    return (
                      <button
                        key={preset.key}
                        onClick={() => handlePresetTap(preset.key)}
                        className={`group relative flex flex-col items-start gap-1.5 sm:gap-2 rounded-xl border p-3 sm:p-4 text-left transition-all active:scale-[0.97] ${
                          activePreset === preset.key
                            ? "border-primary bg-primary/5 scale-[0.97]"
                            : "border-border hover:border-primary/50 hover:bg-accent/50"
                        }`}
                      >
                        <div className="flex items-center gap-1.5 sm:gap-2 w-full">
                          <span className="text-base sm:text-lg">{preset.icon}</span>
                          <span className="font-medium text-xs sm:text-sm">{preset.label}</span>
                          <span className="ml-auto text-[10px] sm:text-xs text-muted-foreground">
                            {totalMs}ms
                          </span>
                        </div>
                        <span className="text-[10px] sm:text-xs text-muted-foreground leading-relaxed">
                          {preset.desc}
                        </span>
                        {/* Intensity visualization */}
                        <div className="flex gap-0.5 mt-0.5 sm:mt-1">
                          {pattern.pattern.map((v, i) => (
                            <div
                              key={i}
                              className="rounded-full bg-primary/80"
                              style={{
                                width: Math.max(3, v.duration / 5),
                                height: Math.max(3, (v.intensity ?? 0.5) * 16),
                                marginLeft: "delay" in v ? (v as { delay: number }).delay / 10 : 0,
                              }}
                            />
                          ))}
                        </div>
                      </button>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Custom Pattern Builder */}
      <section className="border-b border-border">
        <div className="container mx-auto max-w-4xl px-4 py-8 sm:py-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Custom Pattern Builder</h2>
          <div className="rounded-xl border border-border p-4 sm:p-6">
            <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Duration: {customDuration}ms
                  </label>
                  <input
                    type="range"
                    min={5}
                    max={500}
                    value={customDuration}
                    onChange={(e) => setCustomDuration(Number(e.target.value))}
                    className="w-full accent-primary h-2"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                    <span>5ms</span>
                    <span>500ms</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Intensity: {Math.round(customIntensity * 100)}%
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={customIntensity * 100}
                    onChange={(e) => setCustomIntensity(Number(e.target.value) / 100)}
                    className="w-full accent-primary h-2"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                    <span>0%</span>
                    <span>100%</span>
                  </div>
                </div>
                <button
                  onClick={handleCustomTrigger}
                  className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-transform active:scale-95"
                >
                  Trigger Custom Pattern
                </button>
              </div>
              <div className="flex items-center justify-center rounded-lg bg-muted/50 p-6 min-h-[120px]">
                <div className="flex items-end gap-1">
                  <div
                    className="rounded-full bg-primary transition-all duration-200"
                    style={{
                      width: Math.max(8, customDuration / 5),
                      height: Math.max(8, customIntensity * 64),
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section className="border-b border-border">
        <div className="container mx-auto max-w-4xl px-4 py-8 sm:py-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Usage</h2>
          <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
            <div>
              <h3 className="text-xs sm:text-sm font-medium text-muted-foreground mb-2 sm:mb-3">Basic Usage</h3>
              <pre className="rounded-lg border border-border bg-muted/50 p-3 sm:p-4 text-xs sm:text-sm overflow-x-auto">
                <code>{codeExample}</code>
              </pre>
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-medium text-muted-foreground mb-2 sm:mb-3">Custom Patterns</h3>
              <pre className="rounded-lg border border-border bg-muted/50 p-3 sm:p-4 text-xs sm:text-sm overflow-x-auto">
                <code>{customExample}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Browser Compatibility */}
      <section>
        <div className="container mx-auto max-w-4xl px-4 py-8 sm:py-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Browser Compatibility</h2>
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-3 sm:px-4 py-2 sm:py-3 text-left font-medium">Platform</th>
                    <th className="px-3 sm:px-4 py-2 sm:py-3 text-left font-medium">Support</th>
                    <th className="px-3 sm:px-4 py-2 sm:py-3 text-left font-medium hidden sm:table-cell">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="px-3 sm:px-4 py-2 sm:py-3">Android (Chrome)</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3">
                      <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400">
                        ✓ Full
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-muted-foreground hidden sm:table-cell">
                      Native Vibration API
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-3 sm:px-4 py-2 sm:py-3">iOS (Safari)</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3">
                      <span className="inline-flex items-center gap-1 text-yellow-600 dark:text-yellow-400">
                        ~ Limited
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-muted-foreground hidden sm:table-cell">
                      No Vibration API; silent no-op
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 sm:px-4 py-2 sm:py-3">Desktop</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3">
                      <span className="inline-flex items-center gap-1 text-muted-foreground">
                        — Debug
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-muted-foreground hidden sm:table-cell">
                      Audio feedback via Web Audio API when debug enabled
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
