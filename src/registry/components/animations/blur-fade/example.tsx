"use client"

import { BlurFade } from "./component"

export default function BlurFadeExample() {
  return (
    <div className="flex flex-col items-center gap-4">
      <BlurFade delay={0.25} inView>
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
          Hello World
        </h2>
      </BlurFade>
      <BlurFade delay={0.5} inView>
        <span className="text-xl text-pretty tracking-tighter sm:text-3xl xl:text-4xl">
          Nice to meet you
        </span>
      </BlurFade>
    </div>
  )
}
