"use client"
import BarChart, { Bar, BarYAxis, Grid, ChartTooltip } from "./component"

const data = [
  { browser: "Chrome", users: 275 },
  { browser: "Safari", users: 200 },
  { browser: "Firefox", users: 187 },
  { browser: "Edge", users: 173 },
  { browser: "Other", users: 90 },
]

export default function BarChartHorizontalDemo() {
  return (
    <div className="w-full p-4">
      <BarChart data={data} xDataKey="browser" orientation="horizontal" aspectRatio="4 / 3" margin={{ left: 80 }}>
        <Grid fadeVertical horizontal={false} vertical />
        <Bar dataKey="users" fill="hsl(217, 91%, 60%)" lineCap={4} />
        <BarYAxis />
        <ChartTooltip showCrosshair={false} />
      </BarChart>
    </div>
  )
}
