"use client"

import { PixelParagraphWords } from "./component"

export default function PixelParagraphWordsDemo() {
  return (
    <div className="max-w-2xl space-y-8 p-4">
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Square pixel font</p>
        <PixelParagraphWords
          text="Build beautiful interfaces with animated components and pixel-perfect typography. Free, open source, and ready for production."
          pixelWords={["animated", "pixel-perfect", "open source"]}
          font="square"
          className="text-lg leading-relaxed"
        />
      </div>

      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Grid pixel font</p>
        <PixelParagraphWords
          text="Design systems that scale. Every component is crafted for accessibility, performance, and developer experience."
          pixelWords={["Design systems", "accessibility", "developer experience"]}
          font="grid"
          className="text-lg leading-relaxed text-muted-foreground"
        />
      </div>

      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
          Circle pixel font with custom styling
        </p>
        <PixelParagraphWords
          text="Ship faster with Vritti UI. Drop-in components that work with any React framework."
          pixelWords={["Vritti UI", "React"]}
          font="circle"
          pixelWordClassName="text-foreground"
          className="text-lg leading-relaxed text-muted-foreground"
        />
      </div>
    </div>
  )
}
