"use client"
import PieChart, { PatternLines, PieData, PieSlice } from "./component"

const patternData: PieData[] = [
  { label: "Category A", value: 35 },
  { label: "Category B", value: 25 },
  { label: "Category C", value: 20 },
  { label: "Category D", value: 20 },
]

export default function PieChartPatternDemo() {
  return (
    <div className="flex justify-center p-4">
      <PieChart data={patternData} size={280}>
        <PatternLines
          height={6}
          id="pie-pattern-1"
          orientation={["diagonal"]}
          stroke="var(--chart-1)"
          strokeWidth={1}
          width={6}
        />
        <PatternLines
          height={6}
          id="pie-pattern-2"
          orientation={["horizontal"]}
          stroke="var(--chart-2)"
          strokeWidth={1}
          width={6}
        />
        <PatternLines
          height={6}
          id="pie-pattern-3"
          orientation={["vertical"]}
          stroke="var(--chart-3)"
          strokeWidth={1}
          width={6}
        />
        <PatternLines
          height={8}
          id="pie-pattern-4"
          orientation={["diagonalRightToLeft"]}
          stroke="var(--chart-4)"
          strokeWidth={1}
          width={8}
        />
        <PieSlice fill="url(#pie-pattern-1)" index={0} />
        <PieSlice fill="url(#pie-pattern-2)" index={1} />
        <PieSlice fill="url(#pie-pattern-3)" index={2} />
        <PieSlice fill="url(#pie-pattern-4)" index={3} />
      </PieChart>
    </div>
  )
}
