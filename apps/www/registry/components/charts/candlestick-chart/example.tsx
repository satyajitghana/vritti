"use client"
import CandlestickChart, { Candlestick, Grid, XAxis, YAxis, ChartTooltip } from "./component"

const generateOHLC = () => {
  const points = []
  const days = 30
  let open = 100
  const base = new Date(2024, 0, 1).getTime()
  for (let i = 0; i < days; i++) {
    const date = new Date(base + i * 24 * 60 * 60 * 1000)
    const high = open + Math.abs((i * 7 % 5 - 2) * 1.5 + 1.5)
    const low = open - Math.abs((i * 11 % 5 - 2) * 1.5 + 1.5)
    const close = low + (i * 13 % 10) / 10 * (high - low)
    points.push({ date, open, high, low, close })
    open = close
  }
  return points
}

const data = generateOHLC()

export default function CandlestickChartDemo() {
  return (
    <div className="w-full p-4">
      <CandlestickChart data={data}>
        <Grid horizontal />
        <Candlestick />
        <XAxis />
        <YAxis formatValue={(v) => `$${v.toFixed(0)}`} />
        <ChartTooltip showDatePill showDots={false} showCrosshair />
      </CandlestickChart>
    </div>
  )
}
