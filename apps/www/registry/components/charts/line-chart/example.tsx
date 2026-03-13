"use client"
import LineChart, { Line, Grid, XAxis, YAxis, ChartTooltip } from "./component"

const data = [
  { date: new Date(2024, 0, 1), value: 186 },
  { date: new Date(2024, 1, 1), value: 305 },
  { date: new Date(2024, 2, 1), value: 237 },
  { date: new Date(2024, 3, 1), value: 73 },
  { date: new Date(2024, 4, 1), value: 209 },
  { date: new Date(2024, 5, 1), value: 214 },
]

export default function LineChartDemo() {
  return (
    <div className="w-full p-4">
      <LineChart data={data}>
        <Grid horizontal />
        <Line dataKey="value" stroke="var(--chart-line-primary)" />
        <XAxis />
        <YAxis />
        <ChartTooltip />
      </LineChart>
    </div>
  )
}
