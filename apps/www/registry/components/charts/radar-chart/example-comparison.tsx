"use client"
import RadarChart, { RadarArea, RadarAxis, RadarGrid, RadarLabels } from "./component"

const metrics = [
  { key: "react", label: "React" },
  { key: "typescript", label: "TypeScript" },
  { key: "css", label: "CSS" },
  { key: "testing", label: "Testing" },
  { key: "perf", label: "Performance" },
  { key: "a11y", label: "Accessibility" },
]

const data = [
  {
    label: "Frontend",
    color: "hsl(217, 91%, 60%)",
    values: { react: 95, typescript: 80, css: 90, testing: 65, perf: 75, a11y: 70 },
  },
  {
    label: "Fullstack",
    color: "hsl(142, 71%, 45%)",
    values: { react: 75, typescript: 85, css: 65, testing: 80, perf: 70, a11y: 60 },
  },
]

export default function RadarChartComparisonDemo() {
  return (
    <div className="flex justify-center p-4">
      <RadarChart data={data} metrics={metrics} size={340}>
        <RadarGrid />
        <RadarAxis />
        <RadarLabels />
        <RadarArea />
      </RadarChart>
    </div>
  )
}
