"use client"

import { PixelParagraphWordsInverse } from "./component"

export default function PixelParagraphWordsInverseDemo() {
  return (
    <div className="max-w-2xl space-y-8 p-4">
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
          Square pixel base with sans escape words
        </p>
        <PixelParagraphWordsInverse
          text="Build beautiful interfaces with animated components and pixel-perfect typography. Free, open source, and ready for production."
          plainWords={["animated", "pixel-perfect", "open source"]}
          pixelFont="square"
          plainFont="sans"
          className="text-lg leading-relaxed"
        />
      </div>

      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
          Grid pixel base with mono escape words
        </p>
        <PixelParagraphWordsInverse
          text="Every component ships with TypeScript types, full accessibility support, and zero runtime dependencies."
          plainWords={["TypeScript", "accessibility", "zero runtime"]}
          pixelFont="grid"
          plainFont="mono"
          className="text-lg leading-relaxed text-muted-foreground"
        />
      </div>

      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
          Triangle pixel base with styled escape words
        </p>
        <PixelParagraphWordsInverse
          text="Drop into any React project. Works with Next.js, Remix, and Vite out of the box."
          plainWords={["React", "Next.js", "Remix", "Vite"]}
          pixelFont="triangle"
          plainFont="sans"
          plainWordClassName="font-semibold"
          className="text-lg leading-relaxed"
        />
      </div>
    </div>
  )
}
