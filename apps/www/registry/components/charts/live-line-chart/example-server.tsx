"use client"
import { useEffect, useRef, useState } from "react"
import LiveLineChart, {
  LiveLine,
  LiveXAxis,
  LiveYAxis,
  type LiveLinePoint,
} from "./component"

type ServerPoint = { time: number; cpu: number; memory: number }

function useLiveServerData(intervalMs: number) {
  const [data, setData] = useState<ServerPoint[]>([])
  const [lastCpu, setLastCpu] = useState(35)
  const cpuRef = useRef(35)
  const memRef = useRef(58)
  const tickRef = useRef(0)

  useEffect(() => {
    const now = Date.now() / 1000
    const seed: ServerPoint[] = []
    let cpu = 35
    let mem = 58
    for (let i = 29; i >= 0; i--) {
      cpu = Math.max(5, Math.min(95, cpu + (Math.random() - 0.5) * 8))
      mem = Math.max(40, Math.min(85, mem + (Math.random() - 0.5) * 3))
      seed.push({ time: now - i * (intervalMs / 1000), cpu, memory: mem })
    }
    cpuRef.current = cpu
    memRef.current = mem
    setData(seed)
  }, [intervalMs])

  useEffect(() => {
    const id = setInterval(() => {
      tickRef.current++
      // simulate CPU spike every ~10 seconds
      if (tickRef.current % 12 === 0) {
        cpuRef.current = Math.min(95, cpuRef.current + 35 + Math.random() * 20)
      } else {
        cpuRef.current = Math.max(5, cpuRef.current * 0.85 + Math.random() * 8)
      }
      memRef.current = Math.max(
        40,
        Math.min(85, memRef.current + (Math.random() - 0.48) * 2),
      )
      const now = Date.now() / 1000
      const cpu = Math.round(cpuRef.current * 10) / 10
      const point: ServerPoint = {
        time: now,
        cpu,
        memory: Math.round(memRef.current * 10) / 10,
      }
      setLastCpu(cpu)
      setData((prev) => [
        ...prev.filter((p) => p.time >= now - 60),
        point,
      ])
    }, intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])

  return { data, lastCpu }
}

export default function LiveLineChartServerDemo() {
  const { data, lastCpu } = useLiveServerData(800)
  const formatPct = (v: number) => `${v.toFixed(1)}%`

  return (
    <div className="w-full p-4">
      <LiveLineChart
        data={data as unknown as LiveLinePoint[]}
        value={lastCpu}
        window={30}
        margin={{ top: 16, right: 16, bottom: 40, left: 56 }}
        style={{ height: 260 }}
      >
        <LiveLine
          dataKey="cpu"
          stroke="var(--chart-1)"
          formatValue={formatPct}
        />
        <LiveLine
          dataKey="memory"
          stroke="var(--chart-2)"
          formatValue={formatPct}
        />
        <LiveXAxis />
        <LiveYAxis formatValue={formatPct} position="left" />
      </LiveLineChart>
    </div>
  )
}
