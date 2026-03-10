"use client"

import React from "react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

import { GradientHeading } from "../../text/gradient-heading/component"
import { HoverVideoPlayer } from "./component"

export default function HoverVideoPlayerDemo() {
  return (
    <div className="flex flex-col gap-12 py-12 w-full h-full items-center justify-center">
      <div className="text-center">
        <GradientHeading>Hover video player</GradientHeading>
      </div>
      <motion.div
        initial={{ maxWidth: "24rem" }}
        whileHover={{ maxWidth: "100%" }}
        transition={{
          duration: 0.5,
          ease: [0.32, 0.72, 0, 1],
        }}
        className={cn(
          "group relative flex flex-col overflow-hidden rounded-lg w-full h-full",
          "bg-white shadow-sm ring-1 ring-black/5",
          "data-[dark]:bg-stone-800 data-[dark]:ring-white/15"
        )}
      >
        <HoverVideoPlayer
          videoSrc="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          thumbnailSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Big_buck_bunny_poster_big.jpg/800px-Big_buck_bunny_poster_big.jpg"
          enableControls
          style={{
            width: "100%",
            maxWidth: "100vw",
            aspectRatio: "16/9",
          }}
        />
      </motion.div>

      <p className="text-sm text-muted-foreground">
        Hover over the video to play
      </p>
    </div>
  )
}
