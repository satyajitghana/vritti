"use client"
import { useCallback, useEffect, useRef, useState } from "react"
import LiveLineChart, {
  LiveLine,
  LiveXAxis,
  LiveYAxis,
  type LiveLinePoint,
} from "./component"

function useHeartRateData(intervalMs: number) {
  const [data, setData] = useState<LiveLinePoint[]>([])
  const [value, setValue] = useState(72)
  const startRef = useRef(Date.now())

  useEffect(() => {
    const now = Date.now() / 1000
    const seed: LiveLinePoint[] = []
    for (let i = 59; i >= 0; i--) {
      seed.push({
        time: now - i * (intervalMs / 1000),
        value: 68 + Math.random() * 14,
      })
    }
    setData(seed)
    startRef.current = Date.now() - 30000 // start mid-warmup
  }, [intervalMs])

  useEffect(() => {
    const id = setInterval(() => {
      const elapsedSec = (Date.now() - startRef.current) / 1000
      const cycle = elapsedSec % 120 // 2-minute workout cycle

      let target: number
      if (cycle < 30) {
        // warmup: 68 → 85 BPM
        target = 68 + (cycle / 30) * 17
      } else if (cycle < 90) {
        // cardio: 140 → 178 BPM
        const t = (cycle - 30) / 60
        target = 140 + t * 38
      } else {
        // cooldown: 118 → 72 BPM
        const t = (cycle - 90) / 30
        target = 118 - t * 46
      }

      const bpm = Math.round(target + (Math.random() - 0.5) * 8)
      const now = Date.now() / 1000
      setValue(bpm)
      setData((prev) => [
        ...prev.filter((p) => p.time >= now - 120),
        { time: now, value: bpm },
      ])
    }, intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])

  return { data, value }
}

export default function LiveLineChartHeartRateDemo() {
  const { data, value } = useHeartRateData(500)
  const formatBpm = useCallback((v: number) => `${Math.round(v)} BPM`, [])

  return (
    <div className="w-full p-4">
      <LiveLineChart
        data={data}
        value={value}
        window={60}
        margin={{ top: 16, right: 16, bottom: 40, left: 72 }}
        style={{ height: 260 }}
      >
        <LiveLine
          dataKey="value"
          stroke="hsl(0 84% 60%)"
          formatValue={formatBpm}
        />
        <LiveXAxis />
        <LiveYAxis formatValue={formatBpm} position="left" />
      </LiveLineChart>
    </div>
  )
}
