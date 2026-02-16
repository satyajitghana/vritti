"use client"

import { RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import type { PropDefinition } from "@/registry/schema"

interface PropEditorProps {
  definitions: PropDefinition[]
  values: Record<string, string | number | boolean>
  onChange: (name: string, value: string | number | boolean) => void
  onReset: () => void
  hasChanges: boolean
  className?: string
}

export function PropEditor({
  definitions,
  values,
  onChange,
  onReset,
  hasChanges,
  className,
}: PropEditorProps) {
  return (
    <div className={cn("space-y-4 rounded-lg border bg-muted/30 p-4", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Customize</h3>
        {hasChanges && (
          <Button variant="ghost" size="sm" onClick={onReset} className="h-7 gap-1 text-xs">
            <RotateCcw className="size-3" />
            Reset
          </Button>
        )}
      </div>
      <div className="space-y-3">
        {definitions.map((def) => (
          <PropControl
            key={def.name}
            definition={def}
            value={values[def.name]}
            onChange={(v) => onChange(def.name, v)}
          />
        ))}
      </div>
    </div>
  )
}

function PropControl({
  definition,
  value,
  onChange,
}: {
  definition: PropDefinition
  value: string | number | boolean
  onChange: (value: string | number | boolean) => void
}) {
  const { name, type, description, options, min, max, step } = definition

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <Label htmlFor={name} className="text-xs font-medium">
          {name}
        </Label>
        {type === "number" && (
          <span className="text-xs text-muted-foreground tabular-nums">{value}</span>
        )}
      </div>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}

      {type === "boolean" && (
        <Switch
          id={name}
          checked={value as boolean}
          onCheckedChange={(checked) => onChange(checked)}
        />
      )}

      {type === "number" && (
        <Slider
          id={name}
          value={[value as number]}
          onValueChange={([v]) => onChange(v)}
          min={min ?? 0}
          max={max ?? 100}
          step={step ?? 1}
          className="py-1"
        />
      )}

      {type === "string" && (
        <Input
          id={name}
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
          className="h-8 text-xs"
        />
      )}

      {type === "color" && (
        <div className="flex items-center gap-2">
          <input
            type="color"
            id={name}
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            className="h-8 w-8 cursor-pointer rounded border-0 bg-transparent p-0"
          />
          <Input
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            className="h-8 flex-1 text-xs font-mono"
          />
        </div>
      )}

      {type === "select" && options && (
        <div className="flex flex-wrap gap-1">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => onChange(opt)}
              className={cn(
                "rounded-md px-2 py-1 text-xs transition-colors",
                value === opt
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
