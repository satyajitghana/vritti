"use client"

import { MorphSurface } from "./component"

export default function MorphSurfaceCustomLabelsExample() {
  const handleSubmit = async (formData: FormData) => {
    const message = formData.get("message") as string
    console.log("Submitted message:", message)
    await new Promise((resolve) => setTimeout(resolve, 500))
  }

  return (
    <div className="flex justify-center items-center min-h-[300px] p-8">
      <MorphSurface
        triggerLabel="Send Feedback"
        placeholder="Share your thoughts..."
        onSubmit={handleSubmit}
        onSuccess={() => {
          console.log("Feedback submitted successfully!")
        }}
      />
    </div>
  )
}
