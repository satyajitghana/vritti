"use client"

import { useEffect, useState } from "react"
import { Monitor, Moon, Sun } from "lucide-react"

import { PopoverForm } from "./component"

type Theme = "light" | "dark" | "system"

export default function PopoverFormThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>("system")
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">("light")
  const [open, setOpen] = useState(false)
  const themes: Theme[] = ["light", "dark", "system"]

  useEffect(() => {
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)")
    const updateSystemTheme = () => {
      setSystemTheme(systemPrefersDark.matches ? "dark" : "light")
    }

    updateSystemTheme()
    systemPrefersDark.addEventListener("change", updateSystemTheme)

    return () => {
      systemPrefersDark.removeEventListener("change", updateSystemTheme)
    }
  }, [])

  return (
    <div className="flex w-full items-center justify-center">
      <PopoverForm
        showSuccess={false}
        title="Choose theme"
        open={open}
        setOpen={setOpen}
        width="200px"
        height="175px"
        showCloseButton={true}
        openChild={
          <div className="p-2">
            <h3 className="text-sm tracking-tight text-muted-foreground">
              Theme
            </h3>

            <div className="pt-2 space-y-2">
              {themes.map((t) => {
                const isSelected = theme === t
                return (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`w-full flex items-center px-3 py-2 text-sm rounded-md ${
                      isSelected
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    {t === "light" && <Sun className="mr-2 h-4 w-4" />}
                    {t === "dark" && <Moon className="mr-2 h-4 w-4" />}
                    {t === "system" && <Monitor className="mr-2 h-4 w-4" />}
                    <span className="capitalize">{t}</span>
                  </button>
                )
              })}
            </div>
          </div>
        }
      />
    </div>
  )
}
