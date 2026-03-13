"use client"
import { useState } from "react"
import PieChart, {
  PieSlice,
  type PieSliceHoverEffect,
  type PieData,
} from "./component"

const salesData: PieData[] = [
  { label: "Electronics", value: 4250, color: "#0ea5e9" },
  { label: "Clothing", value: 3120, color: "#a855f7" },
  { label: "Food", value: 2100, color: "#f59e0b" },
  { label: "Home", value: 1580, color: "#10b981" },
  { label: "Other", value: 1050, color: "#ef4444" },
]

export default function PieChartHoverDemo() {
  const [hoverEffect, setHoverEffect] = useState<PieSliceHoverEffect>("translate")

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <div className="flex items-center gap-3">
        <span className="text-muted-foreground text-sm">Hover Effect:</span>
        <div className="flex gap-2">
          {(["translate", "grow", "none"] as PieSliceHoverEffect[]).map((effect) => (
            <button
              key={effect}
              type="button"
              onClick={() => setHoverEffect(effect)}
              className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                hoverEffect === effect
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {effect.charAt(0).toUpperCase() + effect.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <PieChart data={salesData} size={280}>
        {salesData.map((item, index) => (
          <PieSlice hoverEffect={hoverEffect} index={index} key={item.label} />
        ))}
      </PieChart>
    </div>
  )
}
