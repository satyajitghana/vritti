"use client"
import PieChart, { PieSlice } from "./component"

const data = [
  { label: "Chrome", value: 275, color: "hsl(217, 91%, 60%)" },
  { label: "Safari", value: 200, color: "hsl(280, 87%, 65%)" },
  { label: "Firefox", value: 187, color: "hsl(142, 71%, 45%)" },
  { label: "Edge", value: 173, color: "hsl(38, 92%, 50%)" },
  { label: "Other", value: 90, color: "hsl(0, 91%, 65%)" },
]

export default function PieChartDemo() {
  return (
    <div className="flex justify-center p-8">
      <PieChart data={data} size={300}>
        {data.map((item, index) => (
          <PieSlice index={index} key={item.label} />
        ))}
      </PieChart>
    </div>
  )
}
