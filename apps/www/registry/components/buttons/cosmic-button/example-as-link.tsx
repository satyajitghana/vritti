"use client"

import { CosmicButton } from "./component"

export default function CosmicButtonAsLinkExample() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <CosmicButton as="a" href="#">
        Visit Website
      </CosmicButton>
    </div>
  )
}
