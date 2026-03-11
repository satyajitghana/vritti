"use client"

import { PixelHeadingCharacter } from "./component"

export default function PixelHeadingCharacterDemo() {
  return (
    <div className="space-y-10 p-4">
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
          Multi mode (hover to animate)
        </p>
        <PixelHeadingCharacter mode="multi" className="text-5xl sm:text-7xl">
          Pixel Fonts
        </PixelHeadingCharacter>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Wave mode with autoplay</p>
        <PixelHeadingCharacter
          mode="wave"
          autoPlay
          cycleInterval={100}
          staggerDelay={30}
          className="text-4xl sm:text-6xl"
        >
          Wave Effect
        </PixelHeadingCharacter>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
          With prefix and label
        </p>
        <PixelHeadingCharacter
          prefix="Vritti"
          prefixFont="grid"
          mode="multi"
          showLabel
          className="text-4xl sm:text-6xl"
        >
          expanded
        </PixelHeadingCharacter>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
          Random mode (hover to scramble)
        </p>
        <PixelHeadingCharacter mode="random" className="text-4xl sm:text-5xl">
          Random Scramble
        </PixelHeadingCharacter>
      </div>
    </div>
  )
}
