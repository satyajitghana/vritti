"use client"

import { AnimatedButton } from "./component";

export default function AnimatedButtonExample() {
  return (
    <div className="relative flex h-[200px] w-full items-center justify-center gap-4 overflow-hidden rounded-lg border">
      <AnimatedButton>Click Me</AnimatedButton>
      <AnimatedButton variant="glow" glow>Glow Effect</AnimatedButton>
    </div>
  );
}
