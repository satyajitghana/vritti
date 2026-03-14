"use client"
import RingChart, { Ring, RingCenter } from "./component"

const data = [
  { label: "Organic", value: 4250, maxValue: 5000, color: "var(--chart-1)" },
  { label: "Paid", value: 3120, maxValue: 5000, color: "var(--chart-2)" },
  { label: "Email", value: 2100, maxValue: 5000, color: "var(--chart-3)" },
  { label: "Social", value: 1580, maxValue: 5000, color: "var(--chart-4)" },
]

export default function RingChartDemo() {
  return (
    <div className="flex justify-center p-8">
      <RingChart data={data} size={280}>
        {data.map((item, index) => (
          <Ring index={index} key={item.label} />
        ))}
        <RingCenter defaultLabel="Sessions" />
      </RingChart>
    </div>
  )
}
