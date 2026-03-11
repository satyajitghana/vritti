"use client"

import { FeatureCarousel } from "./component"

const features = [
  {
    id: "1",
    name: "Step 1",
    title: "Lightning Fast",
    description:
      "Optimized for performance with minimal bundle size and efficient rendering for smooth user experiences.",
  },
  {
    id: "2",
    name: "Step 2",
    title: "Fully Customizable",
    description:
      "Every aspect can be tailored to your needs with flexible props and composable architecture.",
  },
  {
    id: "3",
    name: "Step 3",
    title: "Dark Mode Ready",
    description:
      "Built-in support for light and dark themes with seamless transitions between modes.",
  },
  {
    id: "4",
    name: "Step 4",
    title: "Accessible by Default",
    description:
      "Follows WAI-ARIA guidelines with keyboard navigation and screen reader support built in.",
  },
]

export default function FeatureCarouselExample() {
  return (
    <div className="relative flex min-h-[600px] w-full items-center justify-center overflow-hidden rounded-lg border bg-background p-4">
      <FeatureCarousel
        title="Features"
        description="Explore what makes this component special"
        steps={features}
        autoPlayInterval={4000}
      />
    </div>
  )
}
