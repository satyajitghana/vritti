"use client"

import { ShiftCard } from "./component"

export default function ShiftCardExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <ShiftCard
        topContent={
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500" />
            <span className="text-sm font-medium text-foreground">Project Alpha</span>
          </div>
        }
        middleContent={
          <div className="flex flex-col items-center justify-center gap-2 py-8">
            <div className="text-4xl font-bold text-foreground">42</div>
            <div className="text-sm text-muted-foreground">Tasks Completed</div>
          </div>
        }
        bottomContent={
          <div className="p-4 bg-muted/50 dark:bg-muted/30 rounded-xl">
            <div className="text-sm font-medium text-foreground mb-2">Recent Activity</div>
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">Updated dashboard layout</div>
              <div className="text-xs text-muted-foreground">Fixed navigation bug</div>
              <div className="text-xs text-muted-foreground">Added dark mode support</div>
            </div>
          </div>
        }
      />
    </div>
  )
}
