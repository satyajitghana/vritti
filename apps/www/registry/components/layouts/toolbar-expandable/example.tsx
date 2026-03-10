"use client"

import { FileText, ImageIcon, Settings } from "lucide-react"

import ToolbarExpandable from "./component"

const steps = [
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
    icon: ImageIcon,
    content: (
      <div className="grid grid-cols-3 gap-2">
        {["bg-blue-100", "bg-green-100", "bg-purple-100"].map((color, i) => (
          <div
            key={i}
            className={`${color} dark:opacity-50 aspect-square rounded-md flex items-center justify-center`}
          >
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "settings",
    title: "Settings",
    description: "Configure your preferences.",
    icon: Settings,
    content: (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm">Notifications</span>
          <span className="text-xs text-muted-foreground">Enabled</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Auto-save</span>
          <span className="text-xs text-muted-foreground">Every 5 min</span>
        </div>
      </div>
    ),
  },
]

export default function ToolbarExpandableExample() {
  return (
    <div className="max-w-2xl mx-auto">
      <ToolbarExpandable steps={steps} />
    </div>
  )
}
