import { TextureOverlay } from "./component"
import type { TextureType } from "./component"

const allTextures: TextureType[] = [
  "dots", "grid", "noise", "crosshatch", "diagonal", "scatteredDots",
  "halftone", "triangular", "chevron", "paperGrain", "horizontalLines", "verticalLines"
]

export default function TextureOverlayAllExample() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 p-8">
      {allTextures.map((texture) => (
        <div key={texture} className="relative h-24 rounded-lg bg-muted dark:bg-neutral-800 overflow-hidden">
          <TextureOverlay texture={texture} />
          <div className="absolute inset-0 flex items-end p-2">
            <span className="text-[10px] font-medium text-foreground/70">{texture}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
