"use client"

import * as React from "react"

import { Tabs } from "@/components/ui/tabs"

export function CodeTabs({ children }: React.ComponentProps<typeof Tabs>) {
  const [value, setValue] = React.useState("npm")

  return (
    <Tabs
      value={value}
      onValueChange={setValue}
      className="relative mt-6 w-full"
    >
      {children}
    </Tabs>
  )
}
