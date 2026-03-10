"use client"

import { YouTubePlayer } from "./component"

export default function YouTubeVideoPlayerDemo() {
  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <YouTubePlayer
          videoId="dQw4w9WgXcQ"
          title="Rick Astley - Never Gonna Give You Up"
        />
      </div>
    </div>
  )
}
