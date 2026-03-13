"use client"
import RadarChart, { RadarArea, RadarAxis, RadarGrid, RadarLabels } from "./component"

const metrics = [
  { key: "speed", label: "Speed" },
  { key: "power", label: "Power" },
  { key: "defense", label: "Defense" },
  { key: "agility", label: "Agility" },
  { key: "stamina", label: "Stamina" },
]

const data = [
  {
    label: "Player A",
    color: "hsl(217, 91%, 60%)",
    values: { speed: 85, power: 70, defense: 60, agility: 90, stamina: 75 },
  },
]

export default function RadarChartDemo() {
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
