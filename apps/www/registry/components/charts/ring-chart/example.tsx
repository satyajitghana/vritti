"use client"
import RingChart, { Ring, RingCenter } from "./component"

const data = [
  { label: "Sleep", value: 7.5, maxValue: 9, color: "hsl(217, 91%, 60%)" },
  { label: "Exercise", value: 45, maxValue: 60, color: "hsl(142, 71%, 45%)" },
  { label: "Water", value: 6, maxValue: 8, color: "hsl(280, 87%, 65%)" },
  { label: "Steps", value: 8200, maxValue: 10000, color: "hsl(38, 92%, 50%)" },
]

export default function RingChartDemo() {
  return (
    <div className="flex justify-center p-8">
      <RingChart data={data} size={300}>
        {data.map((item, index) => (
          <Ring index={index} key={item.label} />
        ))}
        <RingCenter>
          <div className="text-center">
            <div className="text-sm font-medium text-muted-foreground">Daily Goals</div>
          </div>
        </RingCenter>
      </RingChart>
    </div>
  )
}
