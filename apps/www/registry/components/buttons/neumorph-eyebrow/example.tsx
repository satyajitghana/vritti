"use client"

import { NeumorphEyebrow } from "./component"

export default function NeumorphEyebrowDemo() {
  return (
    <div className="flex flex-col items-start gap-4 p-4">
      <NeumorphEyebrow>Default Eyebrow</NeumorphEyebrow>
      <NeumorphEyebrow intent="primary">Primary Eyebrow</NeumorphEyebrow>
      <NeumorphEyebrow intent="secondary">Secondary Eyebrow</NeumorphEyebrow>
    </div>
  )
}
