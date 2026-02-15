"use client"

import {
  AlertCircleIcon,
  ArchiveXIcon,
  BanIcon,
  Trash2Icon,
  XCircleIcon,
} from "lucide-react"
import { motion, useAnimation } from "motion/react"
import { useState } from "react"
import { cn } from "@/lib/utils"

type HoldButtonVariant = "red" | "green" | "blue" | "orange" | "grey"

interface HoldButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  holdDuration?: number
  variant?: HoldButtonVariant
}

const variantStyles: Record<HoldButtonVariant, string> = {
  red: "bg-red-100 dark:bg-red-200 hover:bg-red-100 dark:hover:bg-red-200 text-red-500 dark:text-red-600 border border-red-200 dark:border-red-300",
  green:
    "bg-green-100 dark:bg-green-200 hover:bg-green-100 dark:hover:bg-green-200 text-green-500 dark:text-green-600 border border-green-200 dark:border-green-300",
  blue: "bg-blue-100 dark:bg-blue-200 hover:bg-blue-100 dark:hover:bg-blue-200 text-blue-500 dark:text-blue-600 border border-blue-200 dark:border-blue-300",
  orange:
    "bg-orange-100 dark:bg-orange-200 hover:bg-orange-100 dark:hover:bg-orange-200 text-orange-500 dark:text-orange-600 border border-orange-200 dark:border-orange-300",
  grey: "bg-gray-100 dark:bg-gray-200 hover:bg-gray-100 dark:hover:bg-gray-200 text-gray-500 dark:text-gray-600 border border-gray-200 dark:border-gray-300",
}

const fillStyles: Record<HoldButtonVariant, string> = {
  red: "bg-red-200/30 dark:bg-red-300/30",
  green: "bg-green-200/30 dark:bg-green-300/30",
  blue: "bg-blue-200/30 dark:bg-blue-300/30",
  orange: "bg-orange-200/30 dark:bg-orange-300/30",
  grey: "bg-gray-200/30 dark:bg-gray-300/30",
}

const variantIcons: Record<HoldButtonVariant, React.ReactNode> = {
  red: <Trash2Icon className="h-4 w-4" />,
  green: <ArchiveXIcon className="h-4 w-4" />,
  blue: <XCircleIcon className="h-4 w-4" />,
  orange: <AlertCircleIcon className="h-4 w-4" />,
  grey: <BanIcon className="h-4 w-4" />,
}

export default function HoldButton({
  className,
  variant = "red",
  holdDuration = 3000,
  ...props
}: HoldButtonProps) {
  const [isHolding, setIsHolding] = useState(false)
  const controls = useAnimation()

  async function handleHoldStart() {
    setIsHolding(true)
    controls.set({ width: "0%" })
    await controls.start({
      width: "100%",
      transition: {
        duration: holdDuration / 1000,
        ease: "linear",
      },
    })
  }

  function handleHoldEnd() {
    setIsHolding(false)
    controls.stop()
    controls.start({
      width: "0%",
      transition: { duration: 0.1 },
    })
  }

  return (
    <button
      className={cn(
        "relative min-w-40 touch-none overflow-hidden rounded-md px-4 py-2 font-medium text-sm",
        variantStyles[variant],
        className
      )}
      onMouseDown={handleHoldStart}
      onMouseLeave={handleHoldEnd}
      onMouseUp={handleHoldEnd}
      onTouchCancel={handleHoldEnd}
      onTouchEnd={handleHoldEnd}
      onTouchStart={handleHoldStart}
      {...props}
    >
      <motion.div
        animate={controls}
        className={cn("absolute top-0 left-0 h-full", fillStyles[variant])}
        initial={{ width: "0%" }}
      />
      <span className="relative z-10 flex w-full items-center justify-center gap-2">
        {variantIcons[variant]}
        {isHolding ? "Release" : "Hold me"}
      </span>
    </button>
  )
}
