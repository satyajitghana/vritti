"use client"
import RingChart, { Ring } from "./component"

const data = [
  { label: "Q1 Target", value: 75, maxValue: 100, color: "hsl(217, 91%, 60%)" },
  { label: "Q2 Target", value: 50, maxValue: 100, color: "hsl(280, 87%, 65%)" },
  { label: "Q3 Target", value: 90, maxValue: 100, color: "hsl(142, 71%, 45%)" },
]

export default function RingChartProgressDemo() {
  return (
    <div className="flex justify-center p-8">
      <RingChart data={data} size={260} strokeWidth={16} ringGap={8}>
        {data.map((item, index) => (
          <Ring index={index} key={item.label} />
        ))}
      </RingChart>
    </div>
  )
}
