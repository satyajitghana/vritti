"use client"
import PieChart, { PieSlice, PieCenter } from "./component"

const data = [
  { label: "React", value: 400, color: "hsl(217, 91%, 60%)" },
  { label: "Vue", value: 200, color: "hsl(142, 71%, 45%)" },
  { label: "Angular", value: 150, color: "hsl(0, 91%, 65%)" },
  { label: "Svelte", value: 100, color: "hsl(38, 92%, 50%)" },
]

const total = data.reduce((s, d) => s + d.value, 0)

export default function PieChartDonutDemo() {
  return (
    <div className="flex justify-center p-8">
      <PieChart data={data} size={300} innerRadius={80} cornerRadius={4} padAngle={0.04}>
        {data.map((item, index) => (
          <PieSlice index={index} key={item.label} />
        ))}
        <PieCenter>
          <div className="text-center">
            <div className="text-2xl font-bold">{total}</div>
            <div className="text-sm text-muted-foreground">Total</div>
          </div>
        </PieCenter>
      </PieChart>
    </div>
  )
}
