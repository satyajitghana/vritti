"use client"

import { useState } from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import { SidePanel } from "./component"

export default function SidePanelExample() {
  const [panelOpen, setPanelOpen] = useState(false)

  const handlePanelOpen = () => {
    setPanelOpen(!panelOpen)
  }

  const renderButton = (handleToggle: () => void) => (
    <div
      className={cn(
        "flex items-center w-full justify-start pr-4 md:pl-4 py-1 md:py-1",
        panelOpen ? "pr-3" : ""
      )}
    >
      <p className="text-xl font-black tracking-tight text-gray-900 sm:text-3xl">
        <span className="bg-gradient-to-t from-neutral-200 to-stone-300 bg-clip-text font-brand text-xl font-bold text-transparent sm:text-6xl">
          panel
        </span>
      </p>
      <Button
        className="rounded-r-[33px] py-8 ml-2"
        onClick={handlePanelOpen}
        variant="secondary"
      >
        {panelOpen ? "close" : "open"}
      </Button>
    </div>
  )

  return (
    <div className="w-full max-w-4xl">
      <div className="min-h-[500px] flex flex-col justify-center border border-dashed rounded-lg space-y-4">
        <SidePanel
          panelOpen={panelOpen}
          handlePanelOpen={handlePanelOpen}
          renderButton={renderButton}
        >
          {panelOpen && (
            <div className="flex items-center justify-center w-full h-[300px] md:h-[500px] rounded-2xl bg-muted/50 border border-border p-8">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold">Side Panel Content</h3>
                <p className="text-muted-foreground max-w-sm">
                  This panel slides open from the side with smooth spring
                  animations. Click the button to toggle it.
                </p>
              </div>
            </div>
          )}
        </SidePanel>
      </div>
    </div>
  )
}
