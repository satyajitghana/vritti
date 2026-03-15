"use client"
import { useState } from "react"
import RadarChart, {
  Legend,
  LegendItem,
  LegendLabel,
  LegendMarker,
  LegendValue,
  RadarArea,
  RadarAxis,
  RadarGrid,
  RadarLabels,
  type LegendItemData,
  type RadarData,
  type RadarMetric,
} from "./component"

const metrics: RadarMetric[] = [
  { key: "engagement", label: "Engagement" },
  { key: "pagesPerSession", label: "Pages/Session" },
  { key: "sessionDuration", label: "Duration" },
  { key: "conversionRate", label: "Conversion" },
  { key: "bounceInverse", label: "Retention" },
]

const campaignData: RadarData[] = [
  {
    label: "Google Search",
    color: "#3b82f6",
    values: {
      engagement: 72,
      pagesPerSession: 68,
      sessionDuration: 70,
      conversionRate: 75,
      bounceInverse: 65,
    },
  },
  {
    label: "Display Ads",
    color: "#f59e0b",
    values: {
      engagement: 85,
      pagesPerSession: 45,
      sessionDuration: 40,
      conversionRate: 30,
      bounceInverse: 88,
    },
  },
  {
    label: "Newsletter",
    color: "#10b981",
    values: {
      engagement: 45,
      pagesPerSession: 90,
      sessionDuration: 92,
      conversionRate: 88,
      bounceInverse: 42,
    },
  },
  {
    label: "Social",
    color: "#ec4899",
    values: {
      engagement: 95,
      pagesPerSession: 35,
      sessionDuration: 25,
      conversionRate: 55,
      bounceInverse: 78,
    },
  },
]

export default function RadarChartLegendDemo() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const legendItems: LegendItemData[] = campaignData.map((d, index) => ({
    label: d.label,
    value:
      Object.values(d.values).reduce((a, b) => a + b, 0) / metrics.length,
    maxValue: 100,
    color: d.color ?? `var(--chart-${index + 1})`,
  }))

  return (
    <div className="flex flex-col items-center justify-center gap-8 p-4 lg:flex-row lg:gap-12">
      <RadarChart
        data={campaignData}
        hoveredIndex={hoveredIndex}
        metrics={metrics}
        onHoverChange={setHoveredIndex}
        size={400}
      >
        <RadarGrid />
        <RadarAxis />
        <RadarLabels />
        {campaignData.map((item, index) => (
          <RadarArea index={index} key={item.label} />
        ))}
      </RadarChart>

      <Legend
        hoveredIndex={hoveredIndex}
        items={legendItems}
        onHoverChange={setHoveredIndex}
        title="Campaign Performance"
      >
        <LegendItem className="flex items-center gap-3">
          <LegendMarker />
          <LegendLabel className="flex-1 text-sm font-medium" />
          <LegendValue formatValue={(v) => `${v.toFixed(0)}%`} />
        </LegendItem>
      </Legend>
    </div>
  )
}
