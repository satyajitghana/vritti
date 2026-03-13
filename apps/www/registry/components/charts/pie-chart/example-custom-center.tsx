"use client"
import { useState } from "react"
import PieChart, { PieCenter, PieSlice, type PieData } from "./component"

const salesData: PieData[] = [
  { label: "Electronics", value: 4250, color: "#0ea5e9" },
  { label: "Clothing", value: 3120, color: "#a855f7" },
  { label: "Food", value: 2100, color: "#f59e0b" },
  { label: "Home", value: 1580, color: "#10b981" },
  { label: "Other", value: 1050, color: "#ef4444" },
]

const total = salesData.reduce((sum, d) => sum + d.value, 0)

export default function PieChartCustomCenterDemo() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="flex justify-center p-4">
      <PieChart
        data={salesData}
        hoveredIndex={hoveredIndex}
        innerRadius={80}
        onHoverChange={setHoveredIndex}
        size={300}
      >
        {salesData.map((item, index) => (
          <PieSlice index={index} key={item.label} />
        ))}
        <PieCenter>
          {({ value, label, isHovered, data }) => (
            <div className="text-center">
              <div
                className="font-bold text-3xl"
                style={{ color: isHovered ? data.color : undefined }}
              >
                {value.toLocaleString()}
              </div>
              <div className="text-muted-foreground text-sm">{label}</div>
              {isHovered && (
                <div className="mt-1 text-muted-foreground text-xs">
                  {((data.value / total) * 100).toFixed(1)}% of total
                </div>
              )}
            </div>
          )}
        </PieCenter>
      </PieChart>
    </div>
  )
}
