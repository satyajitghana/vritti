"use client"

import { ConfettiButton } from "./component"

export default function ConfettiExample() {
  return (
    <div className="relative flex items-center justify-center">
      <ConfettiButton
        className="rounded-md bg-black px-4 py-2 text-white dark:bg-white dark:text-black"
      >
        Celebrate!
      </ConfettiButton>
    </div>
  )
}
