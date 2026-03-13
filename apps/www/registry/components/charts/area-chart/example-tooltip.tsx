"use client"
import AreaChart, { Area, ChartTooltip, Grid, XAxis, YAxis } from "./component"

const data = [
  { date: new Date(2024, 0, 1), revenue: 12000, costs: 7500 },
  { date: new Date(2024, 1, 1), revenue: 15500, costs: 9200 },
  { date: new Date(2024, 2, 1), revenue: 11000, costs: 6800 },
  { date: new Date(2024, 3, 1), revenue: 18500, costs: 11100 },
  { date: new Date(2024, 4, 1), revenue: 16800, costs: 10400 },
  { date: new Date(2024, 5, 1), revenue: 21200, costs: 12800 },
]

export default function AreaChartTooltipDemo() {
  return (
    <div className="w-full p-4">
      <AreaChart data={data}>
        <Grid horizontal />
        <Area
          dataKey="revenue"
          fill="var(--chart-line-primary)"
          stroke="var(--chart-line-primary)"
        />
        <Area
          dataKey="costs"
          fill="var(--chart-line-secondary)"
          stroke="var(--chart-line-secondary)"
        />
        <XAxis />
        <YAxis />
        <ChartTooltip
          rows={(point) => [
            {
              color: "var(--chart-line-primary)",
              label: "Revenue",
              value: `$${(point.revenue as number)?.toLocaleString() ?? 0}`,
            },
            {
              color: "var(--chart-line-secondary)",
              label: "Costs",
              value: `$${(point.costs as number)?.toLocaleString() ?? 0}`,
            },
          ]}
        />
      </AreaChart>
    </div>
  )
}
