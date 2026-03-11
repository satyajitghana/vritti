"use client"

import { LoadingCarousel } from "./component"

const sampleTips = [
  {
    text: "Components are designed to be composable and customizable.",
  },
  {
    text: "Use the CLI to quickly scaffold new components in your project.",
  },
  {
    text: "All components support dark mode out of the box.",
  },
  {
    text: "Motion animations provide smooth, spring-based transitions.",
  },
  {
    text: "Keyboard navigation and screen reader support are built in.",
  },
]

export default function LoadingCarouselExample() {
  return (
    <div className="relative flex min-h-[500px] w-full items-center justify-center overflow-hidden rounded-lg border bg-background p-4">
      <LoadingCarousel
        tips={sampleTips}
        autoplayInterval={4000}
        showProgress={true}
        showIndicators={true}
        animateText={true}
      />
    </div>
  )
}
