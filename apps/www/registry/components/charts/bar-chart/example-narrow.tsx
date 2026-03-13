"use client"
import BarChart, { Bar, BarXAxis, ChartTooltip, Grid } from "./component"

const data = [
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 15500 },
  { month: "Mar", revenue: 11000 },
  { month: "Apr", revenue: 18500 },
  { month: "May", revenue: 16800 },
  { month: "Jun", revenue: 21200 },
]

export default function BarChartNarrowDemo() {
  return (
    <div className="w-full p-4">
      <BarChart barGap={0.1} data={data} xDataKey="month">
        <Grid horizontal />
        <Bar
          dataKey="revenue"
          fill="var(--chart-line-primary)"
          lineCap="round"
        />
        <BarXAxis />
        <ChartTooltip />
      </BarChart>
    </div>
  )
}
