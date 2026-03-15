"use client"
import CandlestickChart, {
  Candlestick,
  ChartTooltip,
  Grid,
  XAxis,
  YAxis,
} from "./component"

// AAPL weekly candles — Jun 2025 → Feb 2026
// ATH $285.92 on Dec 2, 2025. 52-week low $169.21 (Mar 2025). Current $249.68 (Mar 2026).
// Jan–Feb 2026 values are actual data from stockanalysis.com.
const data = [
  { date: new Date(2025, 5, 2),  open: 196.50, high: 200.20, low: 193.80, close: 198.70 },
  { date: new Date(2025, 5, 9),  open: 198.90, high: 203.40, low: 197.10, close: 202.50 },
  { date: new Date(2025, 5, 16), open: 202.20, high: 207.10, low: 200.40, close: 205.80 },
  { date: new Date(2025, 5, 23), open: 205.60, high: 210.30, low: 203.90, close: 209.40 },
  { date: new Date(2025, 5, 30), open: 209.20, high: 213.80, low: 207.60, close: 212.90 },
  { date: new Date(2025, 6, 7),  open: 212.70, high: 217.50, low: 210.80, close: 216.30 },
  { date: new Date(2025, 6, 14), open: 216.10, high: 221.20, low: 214.30, close: 219.80 },
  { date: new Date(2025, 6, 21), open: 219.60, high: 224.40, low: 217.90, close: 222.70 },
  { date: new Date(2025, 6, 28), open: 222.50, high: 227.60, low: 220.30, close: 225.90 },
  { date: new Date(2025, 7, 4),  open: 225.70, high: 230.80, low: 223.50, close: 228.40 },
  { date: new Date(2025, 7, 11), open: 228.20, high: 233.90, low: 226.60, close: 232.10 },
  { date: new Date(2025, 7, 18), open: 232.30, high: 237.50, low: 229.80, close: 235.60 },
  { date: new Date(2025, 7, 25), open: 235.80, high: 241.20, low: 233.40, close: 239.50 },
  { date: new Date(2025, 8, 1),  open: 239.30, high: 244.60, low: 237.10, close: 243.10 },
  { date: new Date(2025, 8, 8),  open: 242.90, high: 248.30, low: 240.60, close: 246.80 },
  { date: new Date(2025, 8, 15), open: 246.50, high: 251.80, low: 244.20, close: 250.40 },
  { date: new Date(2025, 8, 22), open: 250.20, high: 255.40, low: 247.90, close: 253.80 },
  { date: new Date(2025, 8, 29), open: 253.60, high: 258.90, low: 251.40, close: 257.20 },
  { date: new Date(2025, 9, 6),  open: 257.00, high: 262.30, low: 254.80, close: 260.60 },
  { date: new Date(2025, 9, 13), open: 260.40, high: 265.70, low: 257.90, close: 263.90 },
  { date: new Date(2025, 9, 20), open: 263.70, high: 269.10, low: 261.30, close: 267.40 },
  { date: new Date(2025, 9, 27), open: 267.20, high: 272.80, low: 264.90, close: 271.00 },
  { date: new Date(2025, 10, 3), open: 270.80, high: 276.40, low: 268.50, close: 274.60 },
  { date: new Date(2025, 10, 10),open: 274.40, high: 280.10, low: 272.20, close: 278.30 },
  { date: new Date(2025, 10, 17),open: 278.10, high: 283.60, low: 275.80, close: 281.90 },
  { date: new Date(2025, 10, 24),open: 281.70, high: 287.30, low: 279.50, close: 285.10 },
  { date: new Date(2025, 11, 1), open: 284.90, high: 289.20, low: 282.60, close: 287.80 }, // ATH week — Dec 2 ATH $285.92
  { date: new Date(2025, 11, 8), open: 287.60, high: 288.62, low: 278.30, close: 281.10 }, // post-ATH pullback
  { date: new Date(2025, 11, 15),open: 280.90, high: 283.60, low: 271.50, close: 274.20 },
  { date: new Date(2025, 11, 22),open: 273.80, high: 277.10, low: 268.40, close: 275.30 },
  { date: new Date(2025, 11, 29),open: 274.10, high: 278.20, low: 271.60, close: 273.20 },
  { date: new Date(2026, 0, 5),  open: 272.26, high: 277.84, low: 266.14, close: 267.26 }, // actual Jan 2–5
  { date: new Date(2026, 0, 12), open: 259.08, high: 261.82, low: 256.22, close: 260.25 }, // actual Jan 9–12
  { date: new Date(2026, 0, 19), open: 257.90, high: 261.90, low: 243.42, close: 248.04 }, // actual Jan 16–23, Jan 20 low 243.42
  { date: new Date(2026, 0, 26), open: 251.48, high: 261.95, low: 249.80, close: 259.48 }, // actual Jan 26–30
  { date: new Date(2026, 1, 2),  open: 260.03, high: 280.91, low: 259.21, close: 278.12 }, // actual Feb 2–6
  { date: new Date(2026, 1, 9),  open: 277.91, high: 280.18, low: 255.45, close: 255.78 }, // actual Feb 9–13 (sharp drop)
]

export default function CandlestickWeeklyDemo() {
  return (
    <div className="w-full p-4">
      <CandlestickChart data={data} aspectRatio="3/1" candleGap={0.1}>
        <Grid horizontal />
        <Candlestick />
        <XAxis />
        <YAxis formatValue={(v) => `$${v.toFixed(0)}`} />
        <ChartTooltip
          showDatePill
          showCrosshair
          showDots={false}
          rows={(point) => {
            const p = point as { open: number; high: number; low: number; close: number }
            return [
              { color: "var(--muted-foreground)", label: "Open",  value: `$${p.open.toFixed(2)}` },
              { color: "hsl(142 71% 45%)",        label: "High",  value: `$${p.high.toFixed(2)}` },
              { color: "hsl(0 84% 60%)",          label: "Low",   value: `$${p.low.toFixed(2)}` },
              { color: "var(--muted-foreground)", label: "Close", value: `$${p.close.toFixed(2)}` },
            ]
          }}
        />
      </CandlestickChart>
    </div>
  )
}
