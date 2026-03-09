"use client";

import { useWebHaptics } from "./component";

const presets = [
  { name: "success", label: "Success", description: "Form saved, upload complete" },
  { name: "warning", label: "Warning", description: "Destructive action" },
  { name: "error", label: "Error", description: "Validation fail" },
  { name: "light", label: "Light", description: "Small toggle" },
  { name: "medium", label: "Medium", description: "Button press" },
  { name: "heavy", label: "Heavy", description: "Major state change" },
  { name: "soft", label: "Soft", description: "Cushioned feel" },
  { name: "rigid", label: "Rigid", description: "Hard, crisp tap" },
  { name: "selection", label: "Selection", description: "Picker scroll" },
  { name: "nudge", label: "Nudge", description: "Reminder" },
  { name: "buzz", label: "Buzz", description: "Long vibration" },
] as const;

export default function WebHapticsExample() {
  const { trigger, isSupported } = useWebHaptics();

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <p className="text-sm text-muted-foreground">
        {isSupported
          ? "Haptics supported — tap the buttons!"
          : "Haptics not supported on this device"}
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-md">
        {presets.map((preset) => (
          <button
            key={preset.name}
            onClick={() => trigger(preset.name)}
            className="flex flex-col items-center gap-1 rounded-lg border border-border bg-card p-3 text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground active:scale-95"
          >
            <span className="text-sm font-medium">{preset.label}</span>
            <span className="text-xs text-muted-foreground">
              {preset.description}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
