"use client"
import CandlestickChart, {
  Candlestick,
  ChartTooltip,
  Grid,
  XAxis,
  YAxis,
} from "./component"

const data = [
  { date: new Date(2026, 0, 2),  open: 272.26, high: 277.84, low: 269.00, close: 271.01, volume: 37838054 },
  { date: new Date(2026, 0, 5),  open: 270.64, high: 271.51, low: 266.14, close: 267.26, volume: 45647190 },
  { date: new Date(2026, 0, 6),  open: 267.00, high: 267.55, low: 262.12, close: 262.36, volume: 52352090 },
  { date: new Date(2026, 0, 7),  open: 263.20, high: 263.68, low: 259.81, close: 260.33, volume: 48309804 },
  { date: new Date(2026, 0, 8),  open: 257.02, high: 259.29, low: 255.70, close: 259.04, volume: 50419337 },
  { date: new Date(2026, 0, 9),  open: 259.08, high: 260.21, low: 256.22, close: 259.37, volume: 39996967 },
  { date: new Date(2026, 0, 12), open: 259.16, high: 261.30, low: 256.80, close: 260.25, volume: 45263767 },
  { date: new Date(2026, 0, 13), open: 258.72, high: 261.81, low: 258.39, close: 261.05, volume: 45730847 },
  { date: new Date(2026, 0, 14), open: 259.49, high: 261.82, low: 256.71, close: 259.96, volume: 40019421 },
  { date: new Date(2026, 0, 15), open: 260.65, high: 261.04, low: 257.05, close: 258.21, volume: 39388564 },
  { date: new Date(2026, 0, 16), open: 257.90, high: 258.90, low: 254.93, close: 255.53, volume: 72142773 },
  { date: new Date(2026, 0, 20), open: 252.73, high: 254.79, low: 243.42, close: 246.70, volume: 80267517 },
  { date: new Date(2026, 0, 21), open: 248.70, high: 251.56, low: 245.18, close: 247.65, volume: 54641725 },
  { date: new Date(2026, 0, 22), open: 249.20, high: 251.00, low: 248.15, close: 248.35, volume: 39708340 },
  { date: new Date(2026, 0, 23), open: 247.32, high: 249.41, low: 244.68, close: 248.04, volume: 41688982 },
  { date: new Date(2026, 0, 26), open: 251.48, high: 256.56, low: 249.80, close: 255.41, volume: 55969234 },
  { date: new Date(2026, 0, 27), open: 259.17, high: 261.95, low: 258.21, close: 258.27, volume: 49648271 },
  { date: new Date(2026, 0, 28), open: 257.65, high: 258.86, low: 254.51, close: 256.44, volume: 41287971 },
  { date: new Date(2026, 0, 29), open: 258.00, high: 259.65, low: 254.41, close: 258.28, volume: 67253009 },
  { date: new Date(2026, 0, 30), open: 255.17, high: 261.90, low: 252.18, close: 259.48, volume: 92443408 },
  { date: new Date(2026, 1, 2),  open: 260.03, high: 270.49, low: 259.21, close: 270.01, volume: 73913425 },
  { date: new Date(2026, 1, 3),  open: 269.20, high: 271.88, low: 267.61, close: 269.48, volume: 64394655 },
  { date: new Date(2026, 1, 4),  open: 272.29, high: 278.95, low: 272.29, close: 276.49, volume: 90545710 },
  { date: new Date(2026, 1, 5),  open: 278.13, high: 279.50, low: 273.23, close: 275.91, volume: 52977441 },
  { date: new Date(2026, 1, 6),  open: 277.12, high: 280.91, low: 276.93, close: 278.12, volume: 50453414 },
  { date: new Date(2026, 1, 9),  open: 277.91, high: 278.20, low: 271.70, close: 274.62, volume: 44623396 },
  { date: new Date(2026, 1, 10), open: 274.89, high: 275.37, low: 272.94, close: 273.68, volume: 34376898 },
  { date: new Date(2026, 1, 11), open: 274.70, high: 280.18, low: 274.45, close: 275.50, volume: 51931283 },
  { date: new Date(2026, 1, 12), open: 275.59, high: 275.72, low: 260.18, close: 261.73, volume: 81077229 },
  { date: new Date(2026, 1, 13), open: 262.01, high: 262.23, low: 255.45, close: 255.78, volume: 56290673 },
]

export default function CandlestickOHLVDemo() {
  return (
    <div className="w-full p-4">
      <CandlestickChart data={data}>
        <Grid horizontal />
        <Candlestick />
        <XAxis />
        <YAxis formatValue={(v) => `$${v.toFixed(0)}`} />
        <ChartTooltip
          showDatePill
          showCrosshair
          showDots={false}
          indicatorColor={(point) => {
            const p = point as { close: number; open: number }
            return p.close >= p.open
              ? "var(--color-emerald-500)"
              : "var(--color-red-500)"
          }}
          rows={(point) => {
            const p = point as {
              open: number
              high: number
              low: number
              close: number
              volume: number
            }
            return [
              {
                color: "var(--muted-foreground)",
                label: "Open",
                value: `$${p.open.toFixed(2)}`,
              },
              {
                color: "hsl(142 71% 45%)",
                label: "High",
                value: `$${p.high.toFixed(2)}`,
              },
              {
                color: "hsl(0 84% 60%)",
                label: "Low",
                value: `$${p.low.toFixed(2)}`,
              },
              {
                color: "var(--muted-foreground)",
                label: "Close",
                value: `$${p.close.toFixed(2)}`,
              },
              {
                color: "var(--muted-foreground)",
                label: "Volume",
                value: `${(p.volume / 1_000_000).toFixed(1)}M`,
              },
            ]
          }}
        />
      </CandlestickChart>
    </div>
  )
}
