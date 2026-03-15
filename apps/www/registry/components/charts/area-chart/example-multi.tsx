"use client"
import AreaChart, { Area, Grid, XAxis, YAxis, ChartTooltip, Legend, LegendItem, LegendMarker, LegendLabel } from "./component"

const data = [
  { date: new Date(2024, 0, 1), desktop: 186, mobile: 80 },
  { date: new Date(2024, 1, 1), desktop: 305, mobile: 200 },
  { date: new Date(2024, 2, 1), desktop: 237, mobile: 120 },
  { date: new Date(2024, 3, 1), desktop: 73, mobile: 190 },
  { date: new Date(2024, 4, 1), desktop: 209, mobile: 130 },
  { date: new Date(2024, 5, 1), desktop: 214, mobile: 140 },
]

const legendItems = [
  { label: "Desktop", value: 0, color: "hsl(217, 91%, 60%)" },
  { label: "Mobile", value: 0, color: "hsl(280, 87%, 65%)" },
]

export default function AreaChartMultiDemo() {
  return (
    <div className="w-full p-4">
      <AreaChart data={data}>
        <Grid horizontal />
        <Area dataKey="desktop" fill="hsl(217, 91%, 60%)" stroke="hsl(217, 91%, 60%)" />
        <Area dataKey="mobile" fill="hsl(280, 87%, 65%)" stroke="hsl(280, 87%, 65%)" />
        <XAxis />
        <YAxis />
        <ChartTooltip />
      </AreaChart>
      <Legend className="flex-row justify-center gap-6" items={legendItems}>
        <LegendItem className="flex items-center gap-2">
          <LegendMarker />
          <LegendLabel />
        </LegendItem>
      </Legend>
    </div>
  )
}
