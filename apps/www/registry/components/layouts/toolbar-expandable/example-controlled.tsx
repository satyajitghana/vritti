"use client"

import { useState } from "react"
import { FileText, Image, Music, Video } from "lucide-react"

import { Button } from "@/components/ui/button"
import ToolbarExpandable from "./component"

const mediaSteps = [
  {
    id: "documents",
    title: "Documents",
    description: "Browse and manage your document files.",
    icon: FileText,
    content: (
      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-md border border-border p-3">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-blue-500" />
            <span className="text-sm">report-2024.pdf</span>
          </div>
          <span className="text-xs text-muted-foreground">2.4 MB</span>
        </div>
        <div className="flex items-center justify-between rounded-md border border-border p-3">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-blue-500" />
            <span className="text-sm">notes.docx</span>
          </div>
          <span className="text-xs text-muted-foreground">128 KB</span>
        </div>
      </div>
    ),
  },
  {
    id: "images",
    title: "Images",
    description: "View and organize your image library.",
    icon: Image,
    content: (
      <div className="grid grid-cols-3 gap-2">
        {["bg-blue-100", "bg-green-100", "bg-purple-100", "bg-orange-100", "bg-pink-100", "bg-yellow-100"].map(
          (color, i) => (
            <div
              key={i}
              className={`${color} dark:opacity-50 aspect-square rounded-md flex items-center justify-center`}
            >
              <Image className="h-4 w-4 text-muted-foreground" />
            </div>
          )
        )}
      </div>
    ),
  },
  {
    id: "videos",
    title: "Videos",
    description: "Access your video collection.",
    icon: Video,
    content: (
      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-md border border-border p-3">
          <div className="flex items-center gap-2">
            <Video className="h-4 w-4 text-red-500" />
            <span className="text-sm">intro-video.mp4</span>
          </div>
          <span className="text-xs text-muted-foreground">24 MB</span>
        </div>
      </div>
    ),
  },
  {
    id: "audio",
    title: "Audio",
    description: "Manage your audio files and playlists.",
    icon: Music,
    content: (
      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-md border border-border p-3">
          <div className="flex items-center gap-2">
            <Music className="h-4 w-4 text-green-500" />
            <span className="text-sm">podcast-ep1.mp3</span>
          </div>
          <span className="text-xs text-muted-foreground">8.2 MB</span>
        </div>
      </div>
    ),
  },
]

export default function ToolbarExpandableControlled() {
  const [expanded, setExpanded] = useState(false)
  const [activeStep, setActiveStep] = useState<string | null>(null)

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex items-center gap-2 justify-center">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setExpanded(!expanded)
            if (expanded) {
              setActiveStep(null)
            } else {
              setActiveStep("documents")
            }
          }}
        >
          {expanded ? "Collapse" : "Expand"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setActiveStep(null)
            setExpanded(false)
          }}
        >
          Reset
        </Button>
      </div>
      <ToolbarExpandable
        steps={mediaSteps}
        expanded={expanded}
        onExpandedChange={setExpanded}
        activeStep={activeStep}
        onActiveStepChange={setActiveStep}
      />
      <p className="text-center text-xs text-muted-foreground">
        Active: {activeStep ?? "none"} &middot;{" "}
        {expanded ? "Expanded" : "Collapsed"}
      </p>
    </div>
  )
}
