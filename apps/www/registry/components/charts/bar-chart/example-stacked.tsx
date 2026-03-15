"use client"
import BarChart, { Bar, BarXAxis, Grid, ChartTooltip } from "./component"

const data = [
  { month: "Jan", desktop: 4000, mobile: 2400 },
  { month: "Feb", desktop: 5000, mobile: 3000 },
  { month: "Mar", desktop: 3500, mobile: 2800 },
  { month: "Apr", desktop: 4200, mobile: 3200 },
  { month: "May", desktop: 3800, mobile: 2600 },
  { month: "Jun", desktop: 5500, mobile: 3800 },
]

export default function BarChartStackedDemo() {
  return (
    <div className="w-full p-4">
      <BarChart data={data} xDataKey="month" stacked stackGap={3}>
        <Grid horizontal />
        <Bar dataKey="desktop" fill="hsl(217, 91%, 60%)" lineCap={4} stackGap={3} />
        <Bar dataKey="mobile" fill="hsl(217, 91%, 75%)" lineCap={4} stackGap={3} />
        <BarXAxis />
        <ChartTooltip />
      </BarChart>
    </div>
  )
}
