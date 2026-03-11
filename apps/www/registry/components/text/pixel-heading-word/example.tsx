"use client"

import { PixelHeadingWord } from "./component"

export default function PixelHeadingWordDemo() {
  return (
    <div className="space-y-10 p-4">
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
          Swap mode: hover to swap between square and circle
        </p>
        <PixelHeadingWord
          initialFont="square"
          hoverFont="circle"
          showLabel
          className="text-5xl sm:text-7xl"
        >
          Pixel Swap
        </PixelHeadingWord>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
          Cycle mode: hover to cycle through all pixel fonts
        </p>
        <PixelHeadingWord
          as="h2"
          cycleInterval={200}
          showLabel
          className="text-4xl sm:text-6xl"
        >
          Cycle Fonts
        </PixelHeadingWord>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
          Grid font with triangle on hover
        </p>
        <PixelHeadingWord
          initialFont="grid"
          hoverFont="triangle"
          className="text-4xl sm:text-5xl"
        >
          Grid to Triangle
        </PixelHeadingWord>
      </div>
    </div>
  )
}
