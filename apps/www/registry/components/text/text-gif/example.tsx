"use client"

import { useState } from "react"

import { TextGif } from "./component"

export default function TextGifExample() {
  const [text, setText] = useState("TextGif")
  const [size, setSize] = useState("xl")
  const [weight, setWeight] = useState("bold")

  const gifUrls = [
    "https://media.giphy.com/media/3zvbrvbRe7wxBofOBI/giphy.gif",
    "https://media.giphy.com/media/fnglNFjBGiyAFtm6ke/giphy.gif",
    "https://media.giphy.com/media/9Pmfazv34l7aNIKK05/giphy.gif",
    "https://media.giphy.com/media/4bhs1boql4XVJgmm4H/giphy.gif",
  ]

  const [selectedGif, setSelectedGif] = useState(gifUrls[0])

  return (
    <div className="max-w-3xl mx-auto space-y-8 p-6 bg-neutral-50 dark:bg-neutral-900 rounded-xl">
      {/* Preview */}
      <div className="flex items-center justify-center p-12 bg-white dark:bg-black rounded-xl">
        <TextGif
          gifUrl={selectedGif}
          text={text}
          size={size as any}
          weight={weight as any}
        />
      </div>

      {/* Controls */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Text</label>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text"
            className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">GIF Background</label>
          <select
            value={selectedGif}
            onChange={(e) => setSelectedGif(e.target.value)}
            className="w-full h-10 px-3 border border-border rounded-md bg-background text-sm"
          >
            {gifUrls.map((gif, index) => (
              <option key={index} value={gif}>
                GIF {index + 1}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Text Size</label>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full h-10 px-3 border border-border rounded-md bg-background text-sm"
          >
            {["sm", "md", "lg", "xl", "xxl"].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Font Weight</label>
          <select
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full h-10 px-3 border border-border rounded-md bg-background text-sm"
          >
            {["normal", "medium", "semi", "bold"].map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Examples */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Examples</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-black rounded-xl">
            <TextGif
              gifUrl={gifUrls[1]}
              text="Headings"
              size="xl"
              weight="bold"
            />
          </div>
          <div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-black rounded-xl">
            <TextGif gifUrl={gifUrls[2]} text="$49" size="xxl" weight="bold" />
            <p className="text-sm mt-2">per month</p>
          </div>
        </div>
      </div>
    </div>
  )
}
