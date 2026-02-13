"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { BrowserWindow } from "./component"

export default function MockBrowserWindowExample() {
  const [variant, setVariant] = useState<"chrome" | "safari">("chrome")
  const [headerStyle, setHeaderStyle] = useState<"minimal" | "full">("full")
  const [size, setSize] = useState<"sm" | "md" | "lg" | "xl">("lg")
  const [showSidebar, setShowSidebar] = useState(true)

  const sidebarItems = [
    { label: "Overview", active: true },
    { label: "Users", badge: "12" },
    { label: "Analytics", badge: "new" },
    { label: "Settings" },
  ]

  return (
    <div className="min-h-screen">
      <main className="container">
        <div className="mx-auto max-w-7xl space-y-12">
          <div className="space-y-8">
            <h2 className="text-lg font-semibold mb-6">Preview</h2>
            <div className="flex justify-center p-8 bg-muted/30 rounded-xl border">
              <BrowserWindow
                variant={variant}
                headerStyle={headerStyle}
                size={size}
                showSidebar={showSidebar}
                sidebarPosition="left"
                url="https://example.com/dashboard"
                sidebarItems={showSidebar ? sidebarItems : undefined}
                className="w-full max-w-4xl"
              />
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-lg font-semibold">Window Settings</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Browser</label>
                <select
                  value={variant}
                  onChange={(e) =>
                    setVariant(e.target.value as "chrome" | "safari")
                  }
                  className="w-full h-10 px-3 border border-border rounded-md bg-background text-sm"
                >
                  <option value="chrome">Chrome</option>
                  <option value="safari">Safari</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Header Style</label>
                <select
                  value={headerStyle}
                  onChange={(e) =>
                    setHeaderStyle(e.target.value as "minimal" | "full")
                  }
                  className="w-full h-10 px-3 border border-border rounded-md bg-background text-sm"
                >
                  <option value="minimal">Minimal</option>
                  <option value="full">Address Bar</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Size</label>
                <select
                  value={size}
                  onChange={(e) =>
                    setSize(e.target.value as "sm" | "md" | "lg" | "xl")
                  }
                  className="w-full h-10 px-3 border border-border rounded-md bg-background text-sm"
                >
                  <option value="sm">Small</option>
                  <option value="md">Medium</option>
                  <option value="lg">Large</option>
                  <option value="xl">Extra Large</option>
                </select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Show Sidebar</label>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={showSidebar}
                    onClick={() => setShowSidebar(!showSidebar)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      showSidebar ? "bg-primary" : "bg-muted"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        showSidebar ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="space-y-2 md:col-span-2 lg:col-span-1">
                <label className="text-sm font-medium">Quick Presets</label>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                    onClick={() => {
                      setVariant("chrome")
                      setHeaderStyle("full")
                      setShowSidebar(true)
                      setSize("lg")
                    }}
                  >
                    Chrome Dashboard
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                    onClick={() => {
                      setVariant("safari")
                      setHeaderStyle("minimal")
                      setShowSidebar(false)
                      setSize("md")
                    }}
                  >
                    Safari Minimal
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
