"use client"

import { YouTubePlayer } from "./component"

export default function YouTubeVideoPlayerMultiple() {
  return (
    <div className="p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <YouTubePlayer
          videoId="dQw4w9WgXcQ"
          title="Rick Astley - Never Gonna Give You Up"
          className="w-full"
        />
        <YouTubePlayer
          videoId="9bZkp7q19f0"
          title="PSY - GANGNAM STYLE"
          className="w-full"
        />
        <YouTubePlayer
          videoId="kJQP7kiw5Fk"
          title="Luis Fonsi - Despacito"
          className="w-full"
        />
      </div>
    </div>
  )
}
