"use client"
import PieChart, { PieData, PieSlice, RadialGradient } from "./component"

const gradientData: PieData[] = [
  { label: "Segment A", value: 40 },
  { label: "Segment B", value: 30 },
  { label: "Segment C", value: 30 },
]

export default function PieChartGradientDemo() {
  return (
    <div className="flex justify-center p-4">
      <PieChart data={gradientData} size={280}>
        <RadialGradient
          from="#0ea5e9"
          fromOffset="0%"
          id="pie-gradient-1"
          to="#06b6d4"
          toOffset="100%"
        />
        <RadialGradient
          from="#a855f7"
          fromOffset="0%"
          id="pie-gradient-2"
          to="#ec4899"
          toOffset="100%"
        />
        <RadialGradient
          from="#f59e0b"
          fromOffset="0%"
          id="pie-gradient-3"
          to="#ef4444"
          toOffset="100%"
        />
        <PieSlice fill="url(#pie-gradient-1)" index={0} />
        <PieSlice fill="url(#pie-gradient-2)" index={1} />
        <PieSlice fill="url(#pie-gradient-3)" index={2} />
      </PieChart>
    </div>
  )
}
