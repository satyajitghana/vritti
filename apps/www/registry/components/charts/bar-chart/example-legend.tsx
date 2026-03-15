"use client"
import BarChart, {
  Bar,
  BarXAxis,
  ChartTooltip,
  Grid,
  Legend,
  LegendItem,
  LegendLabel,
  LegendMarker,
  type LegendItemData,
} from "./component"

const stackedData = [
  { month: "Jan", desktop: 4000, mobile: 2400 },
  { month: "Feb", desktop: 5000, mobile: 3000 },
  { month: "Mar", desktop: 3500, mobile: 2800 },
  { month: "Apr", desktop: 4200, mobile: 3200 },
  { month: "May", desktop: 3800, mobile: 2600 },
  { month: "Jun", desktop: 5500, mobile: 3800 },
]

const legendItems: LegendItemData[] = [
  { label: "Desktop", value: 0, color: "hsl(217, 91%, 60%)" },
  { label: "Mobile", value: 0, color: "hsl(217, 91%, 75%)" },
]

export default function BarChartLegendDemo() {
  return (
    <div className="w-full p-4">
      <BarChart data={stackedData} stacked stackGap={3} xDataKey="month">
        <Grid horizontal />
        <Bar
          dataKey="desktop"
          fill="hsl(217, 91%, 60%)"
          lineCap={4}
          stackGap={3}
        />
        <Bar
          dataKey="mobile"
          fill="hsl(217, 91%, 75%)"
          lineCap={4}
          stackGap={3}
        />
        <BarXAxis />
        <ChartTooltip />
      </BarChart>
      <Legend
        className="flex-row justify-center gap-6"
        items={legendItems}
      >
        <LegendItem className="flex items-center gap-2">
          <LegendMarker />
          <LegendLabel />
        </LegendItem>
      </Legend>
    </div>
  )
}
