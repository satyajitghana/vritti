"use client"

import { useState } from "react"

import { MorphSurface } from "./component"

export default function MorphSurfaceControlledExample() {
  const [isControlledOpen, setIsControlledOpen] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    const message = formData.get("message") as string
    console.log("Submitted message:", message)
    await new Promise((resolve) => setTimeout(resolve, 500))
  }

  return (
    <div className="flex flex-col items-center gap-4 min-h-[300px] p-8">
      <button
        type="button"
        onClick={() => setIsControlledOpen(!isControlledOpen)}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
      >
        {isControlledOpen ? "Close" : "Open"} Morph Surface
      </button>
      <MorphSurface
        isOpen={isControlledOpen}
        onOpenChange={setIsControlledOpen}
        triggerLabel="Controlled"
        placeholder="This surface is controlled externally..."
        onSubmit={handleSubmit}
      />
    </div>
  )
}
