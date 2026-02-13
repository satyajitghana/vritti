"use client"

import { useState } from "react"

import { BackgroundImageTexture } from "./component"
import type { TextureVariant } from "./component"

const textureVariants: TextureVariant[] = [
  "fabric-of-squares",
  "grid-noise",
  "inflicted",
  "debut-light",
  "groovepaper",
  "none",
]

export default function BackgroundImageTextureExample() {
  const [selectedVariant, setSelectedVariant] =
    useState<TextureVariant>("fabric-of-squares")

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 p-4">
      <div>
        <h2 className="text-xl font-bold mb-2">Background Image Texture</h2>
        <p className="text-sm text-muted-foreground">
          Select a texture variant to preview it as a background.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {textureVariants.map((variant) => (
          <button
            key={variant}
            onClick={() => setSelectedVariant(variant)}
            className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${
              selectedVariant === variant
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background border-border hover:bg-muted"
            }`}
          >
            {variant === "none" ? "None" : variant}
          </button>
        ))}
      </div>

      <BackgroundImageTexture
        variant={selectedVariant}
        opacity={0.5}
        className="rounded-lg border border-border p-8 min-h-[300px]"
      >
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-foreground">
            Texture Background
          </h3>
          <p className="text-muted-foreground">
            This content sits on top of the texture layer. The texture is fully
            interactive and customizable.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-card/50 border border-border">
              <h4 className="font-semibold mb-1">Feature 1</h4>
              <p className="text-sm text-muted-foreground">
                Content with texture background
              </p>
            </div>
            <div className="p-4 rounded-lg bg-card/50 border border-border">
              <h4 className="font-semibold mb-1">Feature 2</h4>
              <p className="text-sm text-muted-foreground">
                More content examples
              </p>
            </div>
          </div>
        </div>
      </BackgroundImageTexture>
    </div>
  )
}
