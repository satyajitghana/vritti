"use client"
import PieChart, { PieCenter, PieSlice } from "./component"

const data = [
  { label: "React", value: 400, color: "var(--chart-1)" },
  { label: "Vue", value: 200, color: "var(--chart-2)" },
  { label: "Angular", value: 150, color: "var(--chart-3)" },
  { label: "Svelte", value: 100, color: "var(--chart-4)" },
]

export default function PieChartDonutDemo() {
  return (
    <div className="flex justify-center p-8">
      <PieChart cornerRadius={4} data={data} innerRadius={80} padAngle={0.04} size={300}>
        {data.map((item, index) => (
          <PieSlice index={index} key={item.label} />
        ))}
        <PieCenter defaultLabel="Total" />
      </PieChart>
    </div>
  )
}
