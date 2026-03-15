"use client"
import AreaChart, { Area, Grid, XAxis, YAxis, ChartTooltip } from "./component"

const data = [
  { date: new Date(2024, 0, 1), desktop: 186 },
  { date: new Date(2024, 1, 1), desktop: 305 },
  { date: new Date(2024, 2, 1), desktop: 237 },
  { date: new Date(2024, 3, 1), desktop: 73 },
  { date: new Date(2024, 4, 1), desktop: 209 },
  { date: new Date(2024, 5, 1), desktop: 214 },
]

export default function AreaChartDemo() {
  return (
    <div className="w-full p-4">
      <AreaChart data={data}>
        <Grid horizontal />
        <Area dataKey="desktop" fill="var(--chart-line-primary)" stroke="var(--chart-line-primary)" />
        <XAxis />
        <YAxis />
        <ChartTooltip />
      </AreaChart>
    </div>
  )
}
