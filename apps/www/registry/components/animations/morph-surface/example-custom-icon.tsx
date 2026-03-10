"use client"

import { HelpCircle } from "lucide-react"

import { MorphSurface } from "./component"

export default function MorphSurfaceCustomIconExample() {
  const handleSubmit = async (formData: FormData) => {
    const message = formData.get("message") as string
    console.log("Submitted message:", message)
    await new Promise((resolve) => setTimeout(resolve, 500))
  }

  return (
    <div className="flex justify-center items-center min-h-[300px] p-8">
      <MorphSurface
        triggerLabel="Help"
        triggerIcon={<HelpCircle className="w-4 h-4" />}
        placeholder="How can we help you?"
        onSubmit={handleSubmit}
      />
    </div>
  )
}
