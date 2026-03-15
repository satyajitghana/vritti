"use client"
import { useState } from "react"
import PieChart, {
  Legend,
  LegendItem,
  LegendLabel,
  LegendMarker,
  LegendValue,
  PieSlice,
  type LegendItemData,
  type PieData,
} from "./component"

const salesData: PieData[] = [
  { label: "Electronics", value: 4250, color: "#0ea5e9" },
  { label: "Clothing", value: 3120, color: "#a855f7" },
  { label: "Food", value: 2100, color: "#f59e0b" },
  { label: "Home", value: 1580, color: "#10b981" },
  { label: "Other", value: 1050, color: "#ef4444" },
]

const total = salesData.reduce((sum, d) => sum + d.value, 0)

const legendItems: LegendItemData[] = salesData.map((d) => ({
  label: d.label,
  value: d.value,
  maxValue: total,
  color: d.color ?? "",
}))

export default function PieChartLegendDemo() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="flex flex-col items-center justify-center gap-8 p-4 lg:flex-row lg:gap-12">
      <PieChart
        data={salesData}
        hoveredIndex={hoveredIndex}
        onHoverChange={setHoveredIndex}
        size={280}
      >
        {salesData.map((item, index) => (
          <PieSlice index={index} key={item.label} />
        ))}
      </PieChart>

      <Legend
        hoveredIndex={hoveredIndex}
        items={legendItems}
        onHoverChange={setHoveredIndex}
        title="Sales by Category"
      >
        <LegendItem className="flex items-center gap-3">
          <LegendMarker />
          <LegendLabel className="flex-1 text-sm font-medium" />
          <LegendValue showPercentage />
        </LegendItem>
      </Legend>
    </div>
  )
}
