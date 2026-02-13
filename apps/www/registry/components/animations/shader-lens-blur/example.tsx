"use client"

import ShaderLensBlur from "./component"

export default function ShaderLensBlurExample() {
  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Shader Lens Blur</h2>
      <p className="text-sm text-muted-foreground mb-6">
        An interactive WebGL shader with mouse-reactive lens blur effect.
      </p>
      <div className="rounded-lg overflow-hidden border border-border">
        <ShaderLensBlur />
      </div>
    </div>
  )
}
