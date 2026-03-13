"use client"
import RadarChart, {
  RadarArea,
  RadarAxis,
  RadarGrid,
  RadarLabels,
  type RadarData,
  type RadarMetric,
} from "./component"

const simpleMetrics: RadarMetric[] = [
  { key: "speed", label: "Speed" },
  { key: "power", label: "Power" },
  { key: "technique", label: "Technique" },
  { key: "stamina", label: "Stamina" },
  { key: "agility", label: "Agility" },
]

const simpleData: RadarData[] = [
  {
    label: "Player A",
    color: "#6366f1",
    values: { speed: 85, power: 70, technique: 90, stamina: 75, agility: 88 },
  },
  {
    label: "Player B",
    color: "#f97316",
    values: { speed: 65, power: 95, technique: 60, stamina: 88, agility: 55 },
  },
]

export default function RadarChartMinimalDemo() {
  return (
    <div className="flex justify-center p-4">
      <RadarChart data={simpleData} levels={4} metrics={simpleMetrics} size={300}>
        <RadarGrid showLabels={false} />
        <RadarAxis />
        <RadarLabels fontSize={12} offset={20} />
        {simpleData.map((item, index) => (
          <RadarArea index={index} key={item.label} />
        ))}
      </RadarChart>
    </div>
  )
}
