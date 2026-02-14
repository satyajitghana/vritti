"use client";

import { useState } from "react";
import { ColorPicker } from "./component";

export default function ColorPickerExample() {
  const [color, setColor] = useState("#3b82f6");

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <ColorPicker value={color} onValueChange={setColor} />
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <div
          className="size-5 rounded border"
          style={{ backgroundColor: color }}
        />
        <span>Selected: {color}</span>
      </div>
    </div>
  );
}
