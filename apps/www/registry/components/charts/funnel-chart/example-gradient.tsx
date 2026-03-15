"use client"
import FunnelChart from "./component"

const data = [
  {
    label: "Awareness",
    value: 8000,
    gradient: [
      { offset: "0%", color: "hsl(280, 87%, 65%)" },
      { offset: "100%", color: "hsl(217, 91%, 60%)" },
    ],
  },
  {
    label: "Interest",
    value: 3500,
    gradient: [
      { offset: "0%", color: "hsl(280, 87%, 65%)" },
      { offset: "100%", color: "hsl(217, 91%, 60%)" },
    ],
  },
  {
    label: "Decision",
    value: 1200,
    gradient: [
      { offset: "0%", color: "hsl(280, 87%, 65%)" },
      { offset: "100%", color: "hsl(217, 91%, 60%)" },
    ],
  },
  {
    label: "Action",
    value: 400,
    gradient: [
      { offset: "0%", color: "hsl(280, 87%, 65%)" },
      { offset: "100%", color: "hsl(217, 91%, 60%)" },
    ],
  },
]

export default function FunnelChartGradientDemo() {
  return (
    <div className="w-full max-w-sm mx-auto p-4">
      <FunnelChart data={data} showValues showLabels layers={3} />
    </div>
  )
}
