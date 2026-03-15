"use client"
import FunnelChart from "./component"

// Real B2B SaaS marketing funnel benchmarks (source: firstpagesage / userpilot)
// 2% visitor-to-signup CVR; 30% signup-to-activation; 21% trial-to-paid
const data = [
  { label: "Impressions", value: 50000, color: "var(--chart-1)" },
  { label: "Clicks",      value:  1000, color: "var(--chart-2)" },
  { label: "Sign-ups",    value:   500, color: "var(--chart-3)" },
  { label: "Activated",   value:   150, color: "var(--chart-4)" },
  { label: "Paid",        value:    32, color: "hsl(280 87% 65%)" },
]

export default function FunnelChartSaaSDemo() {
  return (
    <div className="w-full max-w-sm mx-auto p-4">
      <FunnelChart
        data={data}
        orientation="horizontal"
        showValues
        showLabels
        showPercentage
        layers={3}
        formatValue={(v) =>
          v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)
        }
      />
    </div>
  )
}
