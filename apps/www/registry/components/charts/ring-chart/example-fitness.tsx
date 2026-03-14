"use client"
import RingChart, { Ring, RingCenter } from "./component"

const data = [
  { label: "Steps",      value:  8420, maxValue: 10000, color: "var(--chart-1)" },
  { label: "Calories",   value:  1840, maxValue:  2200, color: "var(--chart-2)" },
  { label: "Active Min", value:    38, maxValue:    60, color: "var(--chart-3)" },
  { label: "Sleep (h)",  value:   7.2, maxValue:     8, color: "var(--chart-4)" },
]

export default function RingChartFitnessDemo() {
  return (
    <div className="flex justify-center p-8">
      <RingChart data={data} size={280}>
        {data.map((item, index) => (
          <Ring index={index} key={item.label} />
        ))}
        <RingCenter
          defaultLabel="Today"
          formatOptions={{ maximumFractionDigits: 1 }}
        />
      </RingChart>
    </div>
  )
}
