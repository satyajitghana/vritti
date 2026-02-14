"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface NavItem {
  path: string
  name: string
}

interface MorphicNavbarProps {
  items?: NavItem[]
  defaultActive?: string
  onNavigate?: (path: string) => void
}

const defaultNavItems: NavItem[] = [
  { path: "/", name: "home" },
  { path: "/works", name: "works" },
  { path: "/blog", name: "blog" },
  { path: "/about", name: "about" },
]

export default function MorphicNavbar({
  items = defaultNavItems,
  defaultActive = "/",
  onNavigate,
}: MorphicNavbarProps) {
  const [activePath, setActivePath] = useState(defaultActive)

  const isActiveLink = (path: string) => {
    if (path === "/") {
      return activePath === "/"
    }
    return activePath.startsWith(path)
  }

  const handleClick = (path: string) => {
    setActivePath(path)
    onNavigate?.(path)
  }

  return (
    <nav className="mx-auto max-w-4xl px-4 py-2">
      <div className="flex items-center justify-center">
        <div className="flex items-center justify-between overflow-hidden rounded-xl">
          {items.map((item, index) => {
            const isActive = isActiveLink(item.path)
            const isFirst = index === 0
            const isLast = index === items.length - 1
            const prevItem = index > 0 ? items[index - 1] : null
            const nextItem =
              index < items.length - 1 ? items[index + 1] : null

            return (
              <button
                className={cn(
                  "flex items-center justify-center bg-black p-1.5 px-4 text-sm text-white transition-all duration-300 dark:bg-white dark:text-black",
                  isActive
                    ? "mx-2 rounded-xl font-semibold text-sm"
                    : cn(
                        (isActiveLink(prevItem?.path || "") || isFirst) &&
                          "rounded-l-xl",
                        (isActiveLink(nextItem?.path || "") || isLast) &&
                          "rounded-r-xl"
                      )
                )}
                key={item.path}
                onClick={() => handleClick(item.path)}
                type="button"
              >
                {item.name}
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
