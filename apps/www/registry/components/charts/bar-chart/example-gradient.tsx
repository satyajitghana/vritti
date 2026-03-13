"use client"
import BarChart, { Bar, BarXAxis, ChartTooltip, Grid, LinearGradient } from "./component"

const data = [
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 15500 },
  { month: "Mar", revenue: 11000 },
  { month: "Apr", revenue: 18500 },
  { month: "May", revenue: 16800 },
  { month: "Jun", revenue: 21200 },
]

export default function BarChartGradientDemo() {
  return (
    <div className="w-full p-4">
      <BarChart data={data} xDataKey="month">
        <LinearGradient
          from="hsl(217, 91%, 60%)"
          id="barGradient"
          to="hsl(280, 87%, 65%)"
        />
        <Grid horizontal />
        <Bar
          dataKey="revenue"
          fill="url(#barGradient)"
          lineCap={4}
          stroke="hsl(217, 91%, 60%)"
        />
        <BarXAxis />
        <ChartTooltip />
      </BarChart>
    </div>
  )
}
