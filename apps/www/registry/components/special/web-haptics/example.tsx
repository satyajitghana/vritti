"use client";

import { useState } from "react";
import { useWebHaptics } from "./component";
import { cn } from "@/lib/utils";

const categories = [
  {
    name: "Notification",
    presets: [
      { name: "success", icon: "✓", label: "Success", desc: "Form saved" },
      { name: "warning", icon: "⚠", label: "Warning", desc: "Caution" },
      { name: "error", icon: "✕", label: "Error", desc: "Failed" },
    ],
  },
  {
    name: "Impact",
    presets: [
      { name: "light", icon: "·", label: "Light", desc: "Small toggle" },
      { name: "medium", icon: "•", label: "Medium", desc: "Button press" },
      { name: "heavy", icon: "●", label: "Heavy", desc: "Major change" },
      { name: "soft", icon: "○", label: "Soft", desc: "Cushioned" },
      { name: "rigid", icon: "▪", label: "Rigid", desc: "Crisp tap" },
    ],
  },
  {
    name: "Selection",
    presets: [
      { name: "selection", icon: "⋮", label: "Selection", desc: "Picker scroll" },
    ],
  },
  {
    name: "Custom",
    presets: [
      { name: "nudge", icon: "→", label: "Nudge", desc: "Reminder" },
      { name: "buzz", icon: "〰", label: "Buzz", desc: "Long vibration" },
    ],
  },
] as const;

export default function WebHapticsExample() {
  const { trigger, isSupported } = useWebHaptics();
  const [active, setActive] = useState<string | null>(null);

  const handleTrigger = (name: string) => {
    trigger(name);
    setActive(name);
    setTimeout(() => setActive(null), 300);
  };

  return (
    <div className="flex flex-col gap-5 p-6 w-full max-w-lg mx-auto">
      <p className="text-sm text-muted-foreground text-center">
        {isSupported
          ? "Haptics supported — tap the buttons!"
          : "Haptics not supported on this device"}
      </p>

      {categories.map((category) => (
        <div key={category.name} className="flex flex-col gap-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {category.name}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {category.presets.map((preset) => (
              <button
                key={preset.name}
                onClick={() => handleTrigger(preset.name)}
                className={cn(
                  "flex items-center gap-2.5 rounded-xl border bg-card p-3 text-left transition-all duration-150",
                  "hover:bg-accent hover:text-accent-foreground",
                  active === preset.name
                    ? "border-primary bg-primary/5 scale-[0.97]"
                    : "border-border"
                )}
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-base">
                  {preset.icon}
                </span>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-medium leading-tight">{preset.label}</span>
                  <span className="text-xs text-muted-foreground truncate">{preset.desc}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
