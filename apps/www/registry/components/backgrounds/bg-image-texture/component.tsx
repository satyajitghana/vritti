import type React from "react"

import { cn } from "@/lib/utils"

export type TextureVariant =
  | "fabric-of-squares"
  | "grid-noise"
  | "inflicted"
  | "debut-light"
  | "groovepaper"
  | "none"

interface BackgroundImageTextureProps {
  variant?: TextureVariant
  opacity?: number
  className?: string
  children?: React.ReactNode
}

const textureCss: Record<Exclude<TextureVariant, "none">, React.CSSProperties> = {
  "fabric-of-squares": {
    backgroundImage:
      "linear-gradient(45deg, rgba(0,0,0,0.03) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.03) 75%), linear-gradient(45deg, rgba(0,0,0,0.03) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.03) 75%)",
    backgroundSize: "20px 20px",
    backgroundPosition: "0 0, 10px 10px",
  },
  "grid-noise": {
    backgroundImage:
      "linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)",
    backgroundSize: "16px 16px",
  },
  inflicted: {
    backgroundImage:
      "radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)",
    backgroundSize: "12px 12px",
  },
  "debut-light": {
    backgroundImage:
      "linear-gradient(0deg, rgba(0,0,0,0.02) 50%, transparent 50%), linear-gradient(90deg, rgba(0,0,0,0.02) 50%, transparent 50%)",
    backgroundSize: "4px 4px",
  },
  groovepaper: {
    backgroundImage:
      "linear-gradient(rgba(0,0,0,0.03) 2px, transparent 2px), linear-gradient(90deg, rgba(0,0,0,0.03) 2px, transparent 2px), linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)",
    backgroundSize: "40px 40px, 40px 40px, 10px 10px, 10px 10px",
  },
}

export function BackgroundImageTexture({
  variant = "fabric-of-squares",
  opacity = 0.5,
  className,
  children,
}: BackgroundImageTextureProps) {
  const textureStyle = variant !== "none" ? textureCss[variant] : null

  return (
    <div className={cn("relative", className)}>
      {textureStyle && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            ...textureStyle,
            backgroundRepeat: "repeat",
            opacity,
          }}
        />
      )}
      {children && <div className="relative">{children}</div>}
    </div>
  )
}
