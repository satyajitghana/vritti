"use client"

import { MinimalCard, MinimalCardImage, MinimalCardTitle, MinimalCardDescription } from "./component"

export default function MinimalCardExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <MinimalCard className="max-w-[280px]">
        <MinimalCardImage src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop" alt="Abstract art" />
        <MinimalCardTitle>Minimal Card</MinimalCardTitle>
        <MinimalCardDescription>A clean card with subtle shadows and composable layout.</MinimalCardDescription>
      </MinimalCard>
    </div>
  )
}
