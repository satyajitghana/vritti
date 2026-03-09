"use client";

import { ColorSelector } from "./component";

export default function ColorSelectorExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <ColorSelector
        colors={["#ef4444", "#3b82f6", "#22c55e", "#eab308", "#a855f7", "#ec4899"]}
        defaultValue="#3b82f6"
        onColorSelect={(color) => console.log(color)}
      />
    </div>
  );
}
