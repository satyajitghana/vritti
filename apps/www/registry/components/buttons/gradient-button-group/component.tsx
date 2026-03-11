"use client"

import { useEffect, useState } from "react"
import { animate, useMotionValue } from "motion/react"
import * as motion from "motion/react-client"

import { cn } from "@/lib/utils"

interface NavItem {
  id: string
  icon: React.ReactNode
  label: string
}

function InnerButtonOverlay({
  isOverlayActive,
  isDarkMode,
}: {
  isOverlayActive: boolean
  isDarkMode: boolean
}) {
  const overlayProgress = useMotionValue(isOverlayActive ? 1 : 0)

  useEffect(() => {
    const controls = animate(overlayProgress, isOverlayActive ? 1 : 0, {
      delay: isOverlayActive ? 0.02 : 0,
      duration: isOverlayActive ? 0.18 : 0.14,
      ease: "easeOut",
    })
    return () => controls.stop()
  }, [isOverlayActive, overlayProgress])

  return (
    <motion.span
      initial={false}
      className="absolute inset-0 rounded-[10px]"
      animate={
        isOverlayActive
          ? {
              borderWidth: 1,
              borderColor: isDarkMode
                ? "rgba(255,255,255,0.08)"
                : "rgba(0,0,0,0.08)",
            }
          : {
              borderWidth: 0,
              borderColor: "transparent",
              boxShadow: "none",
            }
      }
      transition={{
        borderColor: { duration: 0.16, ease: "easeOut" },
      }}
      style={{ borderStyle: "solid" }}
    />
  )
}

export interface GradientButtonGroupProps {
  items?: NavItem[]
  defaultActiveId?: string
  onActiveChange?: (id: string) => void
  className?: string
}

const defaultNavItems: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <line x1="8" y1="17" x2="8" y2="11" />
        <line x1="12" y1="17" x2="12" y2="7" />
        <line x1="16" y1="17" x2="16" y2="13" />
      </svg>
    ),
  },
  {
    id: "layers",
    label: "Layers",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    id: "storage",
    label: "Storage",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 4h16v6H4z" />
        <path d="M4 14h16v6H4z" />
        <circle cx="7" cy="7" r="1" fill="currentColor" />
        <circle cx="7" cy="17" r="1" fill="currentColor" />
      </svg>
    ),
  },
]

export function GradientButtonGroup({
  items = defaultNavItems,
  defaultActiveId,
  onActiveChange,
  className,
}: GradientButtonGroupProps) {
  const [activeId, setActiveId] = useState(defaultActiveId ?? items[0]?.id ?? "")
  const [overlayReadyId, setOverlayReadyId] = useState<string | null>(activeId)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const html = document.documentElement
    setIsDarkMode(html.classList.contains("dark"))
    const observer = new MutationObserver(() => {
      setIsDarkMode(html.classList.contains("dark"))
    })
    observer.observe(html, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [])

  const handleSelect = (id: string) => {
    if (id === activeId) return
    setOverlayReadyId(null)
    setActiveId(id)
    onActiveChange?.(id)
  }

  return (
    <div className={cn("flex w-full justify-center py-1", className)}>
      <div className="inline-flex min-w-max origin-center scale-[0.72] items-center sm:scale-[0.82] md:scale-[0.9] lg:scale-100">
        <div className="relative inline-flex items-center">
          {/* Background tray layer */}
          <div
            className="absolute inset-0 z-0 rounded-[28px] transition-colors duration-300"
            style={{
              background: isDarkMode
                ? "linear-gradient(180deg, #141416 0%, #111113 50%, #0e0e10 100%)"
                : "linear-gradient(180deg, #d1d1d6 0%, #cacad0 50%, #c3c3c9 100%)",
              boxShadow: isDarkMode
                ? "inset 0 2px 8px rgba(0,0,0,0.6), inset 0 1px 2px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.04)"
                : "inset 0 2px 6px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(0,0,0,0.08), 0 1px 0 rgba(255,255,255,0.55)",
            }}
          />

          {/* Foreground nav layer */}
          <div className="relative flex z-10">
            <div
              className="absolute -inset-[4px] rounded-[28px] border-[1px] bg-muted dark:bg-background transition-colors duration-300"
              style={{
                borderColor: isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.08)",
              }}
            />

            <nav
              className="relative inline-flex items-center gap-3 rounded-[24px] p-1.5 transition-colors duration-300"
              style={{
                background: isDarkMode
                  ? "linear-gradient(180deg, #1c1c1f 0%, #17171a 52%, #131316 100%)"
                  : "linear-gradient(180deg, #ffffff 0%, #fefeff 52%, #fcfcfe 100%)",
                borderTop: isDarkMode
                  ? "1px solid rgba(255,255,255,0.1)"
                  : "1px solid rgba(255,255,255,1)",
                boxShadow: isDarkMode
                  ? "none"
                  : "0 1px 2px rgba(0,0,0,0.04), 0 1px 0 rgba(255,255,255,1)",
              }}
            >
              {items.map((item) => {
                const isActive = activeId === item.id
                const isOverlayActive = isActive && overlayReadyId === item.id

                const wellStyle = isDarkMode
                  ? {
                      background: "linear-gradient(180deg, #0a0a0c 0%, #0e0e10 50%, #0c0c0e 100%)",
                      boxShadow: "inset 0 2px 6px rgba(0,0,0,0.9), inset 0 0 4px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.05)",
                    }
                  : {
                      boxShadow: "inset 0 2px 6px rgba(0,0,0,0.12), inset 0 0 4px rgba(0,0,0,0.06), 0 1px 0 rgba(255,255,255,0.9)",
                    }

                const innerGapStyle = isDarkMode
                  ? {
                      background: "#0a0a0d",
                      boxShadow: "inset 0 1px 3px rgba(0,0,0,0.9), inset 0 0 2px rgba(0,0,0,0.6)",
                    }
                  : {
                      boxShadow: "inset 0 1px 3px rgba(0,0,0,0.18), inset 0 0 2px rgba(0,0,0,0.1)",
                    }

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelect(item.id)}
                    className={cn(
                      "group/nav relative flex h-[76px] w-[76px] items-center justify-center rounded-[18px] transition-all duration-300",
                      isActive
                        ? isDarkMode ? "text-white" : "text-zinc-900"
                        : isDarkMode ? "text-[#6b6b6d] hover:text-zinc-400" : "text-zinc-400 hover:text-zinc-600"
                    )}
                    aria-label={item.label}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {isActive && (
                      <>
                        <motion.span
                          layoutId="active-well"
                          className="absolute inset-0 bg-muted rounded-[18px] transition-colors duration-300"
                          style={wellStyle}
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                        <motion.span
                          layoutId="active-gold-ring"
                          className="absolute inset-[3px] overflow-hidden rounded-[15px]"
                          onLayoutAnimationComplete={() => setOverlayReadyId(item.id)}
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        >
                          <span
                            className="absolute inset-[-60%] origin-center will-change-transform animate-[gold-spin_4s_linear_infinite]"
                            style={{
                              background: "conic-gradient(from 220deg, #6FF7CC 0%, #44EBCF 16%, #ADFA1F 33%, #C8FF5A 50%, #89F5A0 66%, #37D8C5 82%, #6FF7CC 100%)",
                            }}
                          />
                        </motion.span>
                        <motion.span
                          layoutId="active-inner-ring"
                          className="absolute inset-[6px] bg-muted rounded-[12px] transition-colors duration-300"
                          style={innerGapStyle}
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      </>
                    )}

                    <motion.span
                      initial={false}
                      className={cn(
                        "relative z-10 flex items-center justify-center rounded-[10px]",
                        isActive ? "h-[calc(100%-18px)] w-[calc(100%-18px)]" : "h-full w-full"
                      )}
                      animate={isActive ? { scale: 1, opacity: 1 } : { scale: 0.985, opacity: 0.96 }}
                      transition={{ type: "spring", stiffness: 380, damping: 30, delay: isActive ? 0.12 : 0 }}
                    >
                      <InnerButtonOverlay isOverlayActive={isOverlayActive} isDarkMode={isDarkMode} />
                      <span className="relative z-10">{item.icon}</span>
                    </motion.span>
                  </button>
                )
              })}
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GradientButtonGroup
