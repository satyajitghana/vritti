"use client"
import { useState } from "react"
import RingChart, {
  Legend,
  LegendItem,
  LegendLabel,
  LegendMarker,
  LegendProgress,
  LegendValue,
  Ring,
  RingCenter,
  type LegendItemData,
  type RingData,
} from "./component"

const sessionsData: RingData[] = [
  { label: "Organic", value: 4250, maxValue: 5000, color: "#0ea5e9" },
  { label: "Paid", value: 3120, maxValue: 5000, color: "#a855f7" },
  { label: "Email", value: 2100, maxValue: 5000, color: "#f59e0b" },
  { label: "Social", value: 1580, maxValue: 5000, color: "#10b981" },
  { label: "Referral", value: 1050, maxValue: 5000, color: "#ef4444" },
  { label: "Direct", value: 747, maxValue: 5000, color: "#6366f1" },
]

const legendItems: LegendItemData[] = sessionsData.map((d) => ({
  label: d.label,
  value: d.value,
  maxValue: d.maxValue,
  color: d.color ?? "",
}))

export default function RingChartLegendDemo() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="flex flex-col items-center justify-center gap-8 p-4 lg:flex-row lg:gap-12">
      <RingChart
        data={sessionsData}
        hoveredIndex={hoveredIndex}
        onHoverChange={setHoveredIndex}
        size={320}
      >
        {sessionsData.map((item, index) => (
          <Ring index={index} key={item.label} />
        ))}
        <RingCenter defaultLabel="Total Sessions" />
      </RingChart>

      <Legend
        hoveredIndex={hoveredIndex}
        items={legendItems}
        onHoverChange={setHoveredIndex}
        title="Sessions by Channel"
      >
        <LegendItem className="grid grid-cols-[auto_1fr_auto] items-center gap-x-3 gap-y-1">
          <LegendMarker />
          <LegendLabel />
          <LegendValue showPercentage />
          <div className="col-span-full">
            <LegendProgress />
          </div>
        </LegendItem>
      </Legend>
    </div>
  )
}
