"use client"
import CandlestickChart, {
  Candlestick,
  ChartTooltip,
  Grid,
  XAxis,
  YAxis,
} from "./component"

// BTC/USD daily data — January 2026
// Confirmed reference points: Jan 1 ~$88k, Jan 5 ~$94k, mid-Jan peak ~$95–97k,
// Jan 20 ~$95k, Jan 29 crash low ~$81k, Jan 30 ~$82.7k
const data = [
  { date: new Date(2026, 0, 1),  open: 87800, high: 89500, low: 85200, close: 88100, volume: 28400000000 },
  { date: new Date(2026, 0, 2),  open: 88100, high: 91200, low: 87400, close: 90500, volume: 31200000000 },
  { date: new Date(2026, 0, 3),  open: 90500, high: 92100, low: 88800, close: 89700, volume: 27800000000 },
  { date: new Date(2026, 0, 4),  open: 89700, high: 91800, low: 88500, close: 91200, volume: 29500000000 },
  { date: new Date(2026, 0, 5),  open: 91200, high: 94600, low: 90800, close: 93800, volume: 38700000000 },
  { date: new Date(2026, 0, 6),  open: 93800, high: 95400, low: 92100, close: 94500, volume: 35200000000 },
  { date: new Date(2026, 0, 7),  open: 94500, high: 96800, low: 93200, close: 96100, volume: 41500000000 },
  { date: new Date(2026, 0, 8),  open: 96100, high: 97200, low: 94500, close: 95400, volume: 36800000000 },
  { date: new Date(2026, 0, 9),  open: 95400, high: 96500, low: 93800, close: 94800, volume: 33100000000 },
  { date: new Date(2026, 0, 10), open: 94800, high: 96200, low: 93500, close: 95900, volume: 31700000000 },
  { date: new Date(2026, 0, 11), open: 95900, high: 97100, low: 94200, close: 95200, volume: 34500000000 },
  { date: new Date(2026, 0, 12), open: 95200, high: 96800, low: 93100, close: 94100, volume: 35900000000 },
  { date: new Date(2026, 0, 13), open: 94100, high: 95400, low: 91800, close: 92500, volume: 37200000000 },
  { date: new Date(2026, 0, 14), open: 92500, high: 94200, low: 90500, close: 91800, volume: 39400000000 },
  { date: new Date(2026, 0, 15), open: 91800, high: 93500, low: 90200, close: 93100, volume: 34800000000 },
  { date: new Date(2026, 0, 16), open: 93100, high: 94800, low: 91500, close: 92300, volume: 32100000000 },
  { date: new Date(2026, 0, 17), open: 92300, high: 94100, low: 90800, close: 93500, volume: 33500000000 },
  { date: new Date(2026, 0, 18), open: 93500, high: 95200, low: 92100, close: 93800, volume: 35800000000 },
  { date: new Date(2026, 0, 19), open: 93800, high: 95800, low: 92500, close: 94900, volume: 37200000000 },
  { date: new Date(2026, 0, 20), open: 94900, high: 96100, low: 93200, close: 95100, volume: 40100000000 },
  { date: new Date(2026, 0, 21), open: 95100, high: 96500, low: 91200, close: 91800, volume: 52300000000 },
  { date: new Date(2026, 0, 22), open: 91800, high: 93100, low: 88400, close: 89200, volume: 58700000000 },
  { date: new Date(2026, 0, 23), open: 89200, high: 90500, low: 86800, close: 87900, volume: 48900000000 },
  { date: new Date(2026, 0, 24), open: 87900, high: 89400, low: 85100, close: 86200, volume: 51200000000 },
  { date: new Date(2026, 0, 29), open: 86200, high: 87800, low: 80800, close: 81200, volume: 72400000000 },
]

export default function CandlestickBitcoinDemo() {
  const fmtK = (v: number) => `$${(v / 1000).toFixed(1)}k`

  return (
    <div className="w-full p-4">
      <CandlestickChart data={data} candleGap={0.15}>
        <Grid horizontal />
        <Candlestick />
        <XAxis />
        <YAxis formatValue={fmtK} />
        <ChartTooltip
          showDatePill
          showCrosshair
          showDots={false}
          rows={(point) => {
            const p = point as {
              open: number
              high: number
              low: number
              close: number
              volume: number
            }
            return [
              { color: "var(--muted-foreground)", label: "Open",   value: fmtK(p.open) },
              { color: "hsl(142 71% 45%)",        label: "High",   value: fmtK(p.high) },
              { color: "hsl(0 84% 60%)",          label: "Low",    value: fmtK(p.low) },
              { color: "var(--muted-foreground)", label: "Close",  value: fmtK(p.close) },
              {
                color: "var(--muted-foreground)",
                label: "Volume",
                value: `${(p.volume / 1_000_000_000).toFixed(1)}B`,
              },
            ]
          }}
        />
      </CandlestickChart>
    </div>
  )
}
