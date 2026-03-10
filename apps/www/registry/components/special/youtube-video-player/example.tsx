"use client"

import { YouTubePlayer } from "./component"

export default function YouTubeVideoPlayerDemo() {
  return (
    <div className="space-y-12 p-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">YouTube Video Player Examples</h1>
        <p className="text-muted-foreground">
          A collection of YouTube video player examples showcasing different
          configurations and styling options.
        </p>
      </div>

      {/* Basic Player */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Basic Player</h2>
          <p className="text-muted-foreground">
            A simple YouTube video player with default settings.
          </p>
        </div>
        <div className="max-w-2xl">
          <YouTubePlayer
            videoId="dQw4w9WgXcQ"
            title="Rick Astley - Never Gonna Give You Up"
          />
        </div>
      </section>

      {/* Custom Styling */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Custom Styling</h2>
          <p className="text-muted-foreground">
            Player with custom styling classes for different elements.
          </p>
        </div>
        <div className="max-w-2xl">
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
      </section>

      {/* Multiple Players */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Multiple Players</h2>
          <p className="text-muted-foreground">
            A grid of multiple video players with different content.
          </p>
        </div>
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
      </section>
    </div>
  )
}
