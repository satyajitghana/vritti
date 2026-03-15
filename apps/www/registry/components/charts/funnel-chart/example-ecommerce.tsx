"use client"
import FunnelChart from "./component"

// Real 2024 e-commerce conversion benchmarks (source: smartinsights / invespcro)
// Overall CVR ~1.89%; add-to-cart rate ~7.5%; cart abandonment ~70%
const data = [
  { label: "Visitors",      value: 10000, color: "var(--chart-1)" },
  { label: "Product Views", value:  4200, color: "var(--chart-2)" },
  { label: "Add to Cart",   value:   750, color: "var(--chart-3)" },
  { label: "Checkout",      value:   215, color: "var(--chart-4)" },
  { label: "Purchase",      value:   189, color: "hsl(217 91% 75%)" },
]

export default function FunnelChartEcommerceDemo() {
  return (
    <div className="w-full max-w-xs mx-auto p-4">
      <FunnelChart
        data={data}
        orientation="vertical"
        showValues
        showLabels
        showPercentage
        layers={4}
        formatValue={(v) =>
          v >= 1000 ? `${(v / 1000).toFixed(1)}k` : String(v)
        }
      />
    </div>
  )
}
