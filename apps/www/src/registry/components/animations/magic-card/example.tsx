"use client"

import { MagicCard } from "./component"

export default function MagicCardExample() {
  return (
    <div className="flex h-[500px] w-full flex-col gap-4 lg:h-[250px] lg:flex-row">
      <MagicCard
        className="flex cursor-pointer flex-col items-center justify-center overflow-hidden p-20 shadow-2xl"
        gradientColor="#D9D9D955"
      >
        <p className="z-10 text-4xl font-medium whitespace-nowrap">Magic</p>
      </MagicCard>
      <MagicCard
        className="flex cursor-pointer flex-col items-center justify-center overflow-hidden p-20 shadow-2xl"
        gradientColor="#D9D9D955"
      >
        <p className="z-10 text-4xl font-medium whitespace-nowrap">Card</p>
      </MagicCard>
    </div>
  )
}
