"use client"

import { useState } from "react"
import { ColorPicker } from "@/registry/components/inputs/color-picker/component"

export default function ColorPickerExample() {
  const [color, setColor] = useState("hsl(220, 90%, 56%)")

  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center gap-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground">Pick a Color</h3>
        <p className="text-sm text-muted-foreground">
          Choose from presets or use the HSL picker
        </p>
      </div>

      <ColorPicker color={color} onChange={setColor} />

      <div className="flex items-center gap-4 rounded-lg border border-border bg-muted/50 p-4">
        <div
          className="h-16 w-16 rounded-lg shadow-sm"
          style={{ backgroundColor: color }}
        />
        <div>
          <p className="text-sm font-medium text-foreground">Selected Color</p>
          <p className="font-mono text-xs text-muted-foreground">{color}</p>
        </div>
      </div>
    </div>
  )
}
