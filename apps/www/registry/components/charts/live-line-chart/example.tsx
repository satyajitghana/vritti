"use client"
import { useEffect, useRef, useState } from "react"
import LiveLineChart, { LiveLine, LiveXAxis, LiveYAxis } from "./component"

function generatePoint(t: number) {
  return 50 + Math.sin(t / 5) * 20 + (Math.random() - 0.5) * 10
}

export default function LiveLineChartDemo() {
  const [data, setData] = useState(() => {
    const now = Math.floor(Date.now() / 1000)
    return Array.from({ length: 30 }, (_, i) => ({
      time: now - (29 - i),
      value: generatePoint(i),
    }))
  })
  const [value, setValue] = useState(50)
  const counterRef = useRef(30)

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Math.floor(Date.now() / 1000)
      const newValue = generatePoint(counterRef.current++)
      setValue(newValue)
      setData(prev => [...prev.slice(-59), { time: now, value: newValue }])
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full p-4">
      <LiveLineChart data={data} value={value} window={30}>
        <LiveLine stroke="var(--chart-line-primary)" />
        <LiveXAxis />
        <LiveYAxis />
      </LiveLineChart>
    </div>
  )
}
