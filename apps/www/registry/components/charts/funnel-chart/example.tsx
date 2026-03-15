"use client"
import FunnelChart from "./component"

const data = [
  { label: "Visitors", value: 10000, color: "hsl(217, 91%, 60%)" },
  { label: "Sign-ups", value: 4200, color: "hsl(217, 91%, 65%)" },
  { label: "Active", value: 2100, color: "hsl(217, 91%, 70%)" },
  { label: "Paid", value: 850, color: "hsl(217, 91%, 75%)" },
  { label: "Retained", value: 380, color: "hsl(217, 91%, 80%)" },
]

export default function FunnelChartDemo() {
  return (
    <div className="w-full max-w-sm mx-auto p-4">
      <FunnelChart data={data} showValues showLabels showPercentage />
    </div>
  )
}
