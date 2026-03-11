"use client"

import { TextureButton } from "./component"

export default function TextureButtonExample() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 max-w-xs mx-auto">
      <TextureButton variant="primary">Primary</TextureButton>
      <TextureButton variant="accent">Accent</TextureButton>
      <TextureButton variant="destructive">Destructive</TextureButton>
    </div>
  )
}
