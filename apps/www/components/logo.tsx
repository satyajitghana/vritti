import { cn } from "@/lib/utils"

type PixelVariant = "line" | "triangle" | "circle"

const variantFontClass: Record<PixelVariant, string> = {
  line: "font-[family-name:var(--font-geist-pixel-line)]",
  triangle: "font-[family-name:var(--font-geist-pixel-triangle)]",
  circle: "font-[family-name:var(--font-geist-pixel-circle)]",
}

export function Logo({
  variant = "triangle",
  size = "md",
  className,
  showText = false,
}: {
  variant?: PixelVariant
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  showText?: boolean
}) {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
    xl: "text-6xl",
  }

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl",
    xl: "text-3xl",
  }

  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span
        className={cn(
          variantFontClass[variant],
          sizeClasses[size],
          "leading-none select-none"
        )}
      >
        V
      </span>
      {showText && (
        <span
          className={cn(
            variantFontClass[variant],
            textSizeClasses[size],
            "leading-none select-none"
          )}
        >
          ritti
        </span>
      )}
    </span>
  )
}
