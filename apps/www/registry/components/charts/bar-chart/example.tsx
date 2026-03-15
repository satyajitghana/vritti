"use client"
import BarChart, { Bar, BarXAxis, Grid, ChartTooltip } from "./component"

const data = [
  { month: "Jan", revenue: 12000, profit: 4500 },
  { month: "Feb", revenue: 15500, profit: 5200 },
  { month: "Mar", revenue: 11000, profit: 3800 },
  { month: "Apr", revenue: 18500, profit: 7100 },
  { month: "May", revenue: 16800, profit: 5400 },
  { month: "Jun", revenue: 21200, profit: 8800 },
]

export default function BarChartDemo() {
  return (
    <div className="w-full p-4">
      <BarChart data={data} xDataKey="month">
        <Grid horizontal />
        <Bar dataKey="revenue" fill="hsl(217, 91%, 60%)" lineCap={4} />
        <Bar dataKey="profit" fill="hsl(280, 87%, 65%)" lineCap={4} />
        <BarXAxis />
        <ChartTooltip />
      </BarChart>
    </div>
  )
}
