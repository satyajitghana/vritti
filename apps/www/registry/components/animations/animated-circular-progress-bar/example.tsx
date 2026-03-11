"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

import { AnimatedCircularProgressBar } from "./component"

export default function AnimatedCircularProgressBarExample() {
  const [value, setValue] = useState(0)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const handleIncrement = (prev: number) => {
      if (prev === 100) {
        return 0
      }
      return prev + 10
    }
    setValue(handleIncrement)
    const interval = setInterval(() => setValue(handleIncrement), 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatedCircularProgressBar
      value={value}
      gaugePrimaryColor="rgb(79 70 229)"
      gaugeSecondaryColor={
        resolvedTheme === "dark"
          ? "rgba(255, 255, 255, 0.1)"
          : "rgba(0, 0, 0, 0.1)"
      }
    />
  )
}
