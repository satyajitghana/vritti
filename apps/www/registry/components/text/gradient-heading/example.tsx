"use client"

import { GradientHeading } from "./component"

export default function GradientHeadingDemo() {
  return (
    <div className="space-y-6 p-4">
      <GradientHeading variant="default" size="xl" weight="bold">
        Default Gradient Heading
      </GradientHeading>

      <GradientHeading variant="pink" size="lg" weight="semi">
        Accent Gradient Heading
      </GradientHeading>

      <GradientHeading variant="secondary" size="md" weight="bold">
        Secondary Gradient Heading
      </GradientHeading>

      <GradientHeading variant="default" size="sm" weight="base">
        Small Base Weight
      </GradientHeading>
    </div>
  )
}
