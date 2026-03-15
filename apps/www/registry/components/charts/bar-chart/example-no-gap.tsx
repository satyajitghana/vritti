"use client"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { motion, useSpring } from "motion/react"
import BarChart, {
  Bar,
  BarXAxis,
  ChartTooltip,
  Grid,
  LinearGradient,
  useChart,
} from "./component"

const data = [
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 15500 },
  { month: "Mar", revenue: 11000 },
  { month: "Apr", revenue: 18500 },
  { month: "May", revenue: 16800 },
  { month: "Jun", revenue: 21200 },
]

function AnimatedBarLine({
  barX,
  barTopY,
  barBottomY,
  width,
  isHovered,
}: {
  barX: number
  barTopY: number
  barBottomY: number
  width: number
  isHovered: boolean
}) {
  const animatedY = useSpring(barBottomY, { stiffness: 300, damping: 30 })
  const animatedOpacity = useSpring(0, { stiffness: 300, damping: 30 })

  useEffect(() => {
    animatedY.set(isHovered ? barTopY : barBottomY)
    animatedOpacity.set(isHovered ? 1 : 0)
  }, [isHovered, barTopY, barBottomY, animatedY, animatedOpacity])

  return (
    <motion.rect
      fill="var(--chart-indicator-color)"
      height={2}
      style={{ opacity: animatedOpacity, y: animatedY }}
      width={width}
      x={barX}
    />
  )
}

function BarHorizontalLineIndicator() {
  const { barScale, bandWidth, innerHeight, margin, containerRef, hoveredBarIndex, yScale } =
    useChart()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const container = containerRef.current
  if (!(mounted && container && bandWidth && barScale)) {
    return null
  }

  return createPortal(
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-50"
      height="100%"
      width="100%"
    >
      <g transform={`translate(${margin.left},${margin.top})`}>
        {data.map((d, i) => {
          const barX = (barScale as (v: string) => number)(d.month) ?? 0
          const barTopY = (yScale as (v: number) => number)(d.revenue) ?? innerHeight
          const isHovered = hoveredBarIndex === i

          return (
            <AnimatedBarLine
              barBottomY={innerHeight}
              barTopY={barTopY}
              barX={barX}
              isHovered={isHovered}
              key={d.month}
              width={bandWidth}
            />
          )
        })}
      </g>
    </svg>,
    container
  )
}

export default function BarChartNoGapDemo() {
  return (
    <div className="w-full p-4">
      <BarChart barGap={0} data={data} xDataKey="month">
        <LinearGradient
          from="var(--chart-3)"
          id="noGapGradient"
          to="transparent"
        />
        <Grid horizontal />
        <Bar
          dataKey="revenue"
          fill="url(#noGapGradient)"
          lineCap="butt"
          stroke="var(--chart-3)"
        />
        <BarXAxis />
        <ChartTooltip showCrosshair={false} showDots={false} />
        <BarHorizontalLineIndicator />
      </BarChart>
    </div>
  )
}
