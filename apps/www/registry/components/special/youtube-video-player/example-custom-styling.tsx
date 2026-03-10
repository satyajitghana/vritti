"use client"

import { YouTubePlayer } from "./component"

export default function YouTubeVideoPlayerCustomStyling() {
  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <YouTubePlayer
          videoId="9bZkp7q19f0"
          title="PSY - GANGNAM STYLE"
          containerClassName="border-2 border-primary rounded-2xl shadow-2xl"
          thumbnailImageClassName="opacity-90 saturate-150"
          playButtonClassName="bg-primary/20 border-border/20 hover:bg-primary/30"
          playIconClassName="text-secondary fill-secondary"
          titleClassName="text-secondary font-bold"
          controlsClassName="right-4 top-4"
          expandButtonClassName="bg-secondary/20 hover:bg-secondary/30 border-secondary text-secondary"
        />
      </div>
    </div>
  )
}
