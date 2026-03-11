import { TextureOverlay } from "./component"

export default function TextureOverlayExample() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-8">
      {(["dots", "grid", "crosshatch", "diagonal", "halftone", "paperGrain"] as const).map((texture) => (
        <div key={texture} className="relative h-32 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 overflow-hidden">
          <TextureOverlay texture={texture} />
          <div className="absolute inset-0 flex items-end p-3">
            <span className="text-xs font-medium text-white/90">{texture}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
