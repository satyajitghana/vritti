"use client"

import { TextureButton } from "./component"

export default function TextureButtonVariantsExample() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 max-w-xs mx-auto">
      <TextureButton variant="secondary">Secondary</TextureButton>
      <TextureButton variant="minimal">Minimal</TextureButton>
      <TextureButton variant="primary" size="sm">Small</TextureButton>
      <TextureButton variant="primary" size="lg">Large</TextureButton>
    </div>
  )
}
