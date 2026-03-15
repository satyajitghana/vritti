"use client"
import { useCallback, useEffect, useState } from "react"
import LineChart, {
  ChartTooltip,
  Grid,
  Line,
  SegmentBackground,
  SegmentLineFrom,
  SegmentLineTo,
  XAxis,
  useChart,
} from "./component"

const chartData = [
  { date: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000), sessions: 3200 },
  { date: new Date(Date.now() - 27 * 24 * 60 * 60 * 1000), sessions: 2900 },
  { date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000), sessions: 3550 },
  { date: new Date(Date.now() - 23 * 24 * 60 * 60 * 1000), sessions: 4100 },
  { date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000), sessions: 3900 },
  { date: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000), sessions: 4350 },
  { date: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000), sessions: 4200 },
  { date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), sessions: 4600 },
  { date: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000), sessions: 4800 },
  { date: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000), sessions: 5100 },
  { date: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000), sessions: 4750 },
  { date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), sessions: 5400 },
  { date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), sessions: 5600 },
  { date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), sessions: 5300 },
  { date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), sessions: 6100 },
  { date: new Date(), sessions: 6400 },
]

interface SegmentStats {
  value: number
  change: number
  changePct: number
  startDate: Date
  endDate: Date
}

function SegmentBridge({
  onSegmentChange,
}: {
  onSegmentChange: (stats: SegmentStats | null) => void
}) {
  const { selection, data, xAccessor } = useChart()

  useEffect(() => {
    if (!selection?.active) {
      onSegmentChange(null)
      return
    }

    const startIdx = Math.max(0, selection.startIndex)
    const endIdx = Math.min(data.length - 1, selection.endIndex)
    if (startIdx >= endIdx) {
      onSegmentChange(null)
      return
    }

    const startPoint = data[startIdx] as { sessions?: number }
    const endPoint = data[endIdx] as { sessions?: number }
    if (!(startPoint && endPoint)) {
      onSegmentChange(null)
      return
    }

    const startVal = startPoint.sessions
    const endVal = endPoint.sessions
    if (typeof startVal !== "number" || typeof endVal !== "number") {
      onSegmentChange(null)
      return
    }

    onSegmentChange({
      value: endVal,
      change: endVal - startVal,
      changePct: startVal !== 0 ? ((endVal - startVal) / startVal) * 100 : 0,
      startDate: xAccessor(data[startIdx]),
      endDate: xAccessor(data[endIdx]),
    })
  }, [selection, data, xAccessor, onSegmentChange])

  return null
}

export default function LineChartSegmentDemo() {
  const [stats, setStats] = useState<SegmentStats | null>(null)
  const handleSegmentChange = useCallback(
    (s: SegmentStats | null) => setStats(s),
    []
  )

  const firstVal = chartData[0]?.sessions ?? 0
  const lastVal = chartData.at(-1)?.sessions ?? 0

  const displayValue = stats?.value ?? lastVal
  const displayChange = stats?.change ?? lastVal - firstVal
  const displayPct =
    stats?.changePct ??
    (firstVal > 0 ? ((lastVal - firstVal) / firstVal) * 100 : 0)
  const isPositive = displayChange >= 0

  const startLabel = (
    stats?.startDate ?? chartData[0]?.date
  )?.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  const endLabel = (
    stats?.endDate ?? chartData.at(-1)?.date
  )?.toLocaleDateString("en-US", { month: "short", day: "numeric" })

  return (
    <div className="w-full p-4">
      <div className="mb-4 space-y-1">
        <div className="flex items-baseline gap-2">
          <span className="font-semibold text-2xl tabular-nums">
            {displayValue.toLocaleString()}
          </span>
          <span className="text-muted-foreground text-sm">sessions</span>
        </div>
        <div className="flex items-baseline gap-2 text-sm">
          <span className={isPositive ? "text-emerald-500" : "text-red-500"}>
            {isPositive ? "+" : ""}
            {displayChange.toLocaleString()} ({isPositive ? "+" : ""}
            {displayPct.toFixed(1)}%)
          </span>
          <span className="text-muted-foreground">
            {startLabel} &ndash; {endLabel}
          </span>
        </div>
      </div>

      <LineChart data={chartData}>
        <Grid horizontal />
        <Line dataKey="sessions" stroke="var(--chart-line-primary)" />
        <SegmentBackground />
        <SegmentLineFrom />
        <SegmentLineTo />
        <XAxis />
        <ChartTooltip />
        <SegmentBridge onSegmentChange={handleSegmentChange} />
      </LineChart>
    </div>
  )
}
