"use client"
import LineChart, { ChartTooltip, Grid, Line, XAxis, YAxis } from "./component"

const data = [
  { date: new Date(2024, 0, 1), pageviews: 28000, bounces: 8400 },
  { date: new Date(2024, 1, 1), pageviews: 35000, bounces: 10500 },
  { date: new Date(2024, 2, 1), pageviews: 29000, bounces: 7250 },
  { date: new Date(2024, 3, 1), pageviews: 42000, bounces: 12600 },
  { date: new Date(2024, 4, 1), pageviews: 38500, bounces: 11550 },
  { date: new Date(2024, 5, 1), pageviews: 47000, bounces: 14100 },
]

export default function LineChartTooltipDemo() {
  return (
    <div className="w-full p-4">
      <LineChart data={data}>
        <Grid horizontal />
        <Line dataKey="pageviews" stroke="var(--chart-line-primary)" />
        <Line dataKey="bounces" stroke="var(--chart-line-secondary)" />
        <XAxis />
        <YAxis />
        <ChartTooltip
          rows={(point) => [
            {
              color: "var(--chart-line-primary)",
              label: "Page Views",
              value: (point.pageviews as number)?.toLocaleString() ?? "0",
            },
            {
              color: "var(--chart-line-secondary)",
              label: "Bounces",
              value: (point.bounces as number)?.toLocaleString() ?? "0",
            },
          ]}
        />
      </LineChart>
    </div>
  )
}
