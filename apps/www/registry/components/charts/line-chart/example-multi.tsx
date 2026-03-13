"use client"
import LineChart, { Line, Grid, XAxis, YAxis, ChartTooltip } from "./component"

const data = [
  { date: new Date(2024, 0, 1), desktop: 186, mobile: 80 },
  { date: new Date(2024, 1, 1), desktop: 305, mobile: 200 },
  { date: new Date(2024, 2, 1), desktop: 237, mobile: 120 },
  { date: new Date(2024, 3, 1), desktop: 73, mobile: 190 },
  { date: new Date(2024, 4, 1), desktop: 209, mobile: 130 },
  { date: new Date(2024, 5, 1), desktop: 214, mobile: 140 },
]

export default function LineChartMultiDemo() {
  return (
    <div className="w-full p-4">
      <LineChart data={data}>
        <Grid horizontal />
        <Line dataKey="desktop" stroke="hsl(217, 91%, 60%)" />
        <Line dataKey="mobile" stroke="hsl(280, 87%, 65%)" />
        <XAxis />
        <YAxis />
        <ChartTooltip />
      </LineChart>
    </div>
  )
}
