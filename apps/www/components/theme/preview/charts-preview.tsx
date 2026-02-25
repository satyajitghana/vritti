'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Area,
  AreaChart,
  Pie,
  PieChart,
  RadialBar,
  RadialBarChart,
  PolarAngleAxis,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, type ChartConfig } from '@/components/ui/chart';
import { TrendingUp, TrendingDown } from 'lucide-react';

const barData = [
  { month: 'Jan', desktop: 186, mobile: 80 },
  { month: 'Feb', desktop: 305, mobile: 200 },
  { month: 'Mar', desktop: 237, mobile: 120 },
  { month: 'Apr', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'Jun', desktop: 214, mobile: 140 },
];

const lineData = [
  { month: 'Jan', desktop: 186, mobile: 80 },
  { month: 'Feb', desktop: 305, mobile: 200 },
  { month: 'Mar', desktop: 237, mobile: 120 },
  { month: 'Apr', desktop: 173, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'Jun', desktop: 314, mobile: 240 },
];

const areaData = [
  { month: 'Jan', desktop: 186, mobile: 80 },
  { month: 'Feb', desktop: 305, mobile: 200 },
  { month: 'Mar', desktop: 237, mobile: 120 },
  { month: 'Apr', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'Jun', desktop: 214, mobile: 140 },
];

const pieData = [
  { name: 'Chrome', value: 275, fill: 'var(--color-chrome)' },
  { name: 'Safari', value: 200, fill: 'var(--color-safari)' },
  { name: 'Firefox', value: 187, fill: 'var(--color-firefox)' },
  { name: 'Edge', value: 173, fill: 'var(--color-edge)' },
  { name: 'Other', value: 90, fill: 'var(--color-other)' },
];

const radialData = [
  { name: 'Safari', visitors: 200, fill: 'var(--color-safari)' },
  { name: 'Chrome', visitors: 275, fill: 'var(--color-chrome)' },
  { name: 'Firefox', visitors: 187, fill: 'var(--color-firefox)' },
];

const barConfig = {
  desktop: { label: 'Desktop', color: 'var(--chart-1)' },
  mobile: { label: 'Mobile', color: 'var(--chart-2)' },
} satisfies ChartConfig;

const lineConfig = {
  desktop: { label: 'Desktop', color: 'var(--chart-1)' },
  mobile: { label: 'Mobile', color: 'var(--chart-3)' },
} satisfies ChartConfig;

const areaConfig = {
  desktop: { label: 'Desktop', color: 'var(--chart-1)' },
  mobile: { label: 'Mobile', color: 'var(--chart-2)' },
} satisfies ChartConfig;

const pieConfig = {
  visitors: { label: 'Visitors' },
  chrome: { label: 'Chrome', color: 'var(--chart-1)' },
  safari: { label: 'Safari', color: 'var(--chart-2)' },
  firefox: { label: 'Firefox', color: 'var(--chart-3)' },
  edge: { label: 'Edge', color: 'var(--chart-4)' },
  other: { label: 'Other', color: 'var(--chart-5)' },
} satisfies ChartConfig;

const radialConfig = {
  safari: { label: 'Safari', color: 'var(--chart-2)' },
  chrome: { label: 'Chrome', color: 'var(--chart-1)' },
  firefox: { label: 'Firefox', color: 'var(--chart-3)' },
} satisfies ChartConfig;

export function ChartsPreview() {
  return (
    <div className="space-y-6">
      {/* Bar + Line side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Bar Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Bar Chart</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={barConfig} className="aspect-auto h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(v) => v.slice(0, 3)}
                  />
                  <Tooltip />
                  <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                  <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="flex items-center gap-2 mt-2 text-sm">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">
                Trending up by <span className="font-medium text-foreground">5.2%</span> this month
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Line Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Line Chart</CardTitle>
            <CardDescription>Showing total visitors</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={lineConfig} className="aspect-auto h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(v) => v.slice(0, 3)}
                  />
                  <Tooltip />
                  <Line
                    dataKey="desktop"
                    type="monotone"
                    stroke="var(--color-desktop)"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    dataKey="mobile"
                    type="monotone"
                    stroke="var(--color-mobile)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="flex items-center gap-2 mt-2 text-sm">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">
                Trending up by <span className="font-medium text-foreground">12.5%</span> this month
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Area Chart - full width */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Area Chart - Stacked</CardTitle>
          <CardDescription>Showing total visitors for the last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={areaConfig} className="aspect-auto h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(v) => v.slice(0, 3)}
                />
                <Tooltip />
                <Area
                  dataKey="mobile"
                  type="natural"
                  fill="var(--color-mobile)"
                  fillOpacity={0.4}
                  stroke="var(--color-mobile)"
                  stackId="a"
                />
                <Area
                  dataKey="desktop"
                  type="natural"
                  fill="var(--color-desktop)"
                  fillOpacity={0.4}
                  stroke="var(--color-desktop)"
                  stackId="a"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Pie + Radial side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pie Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Pie Chart</CardTitle>
            <CardDescription>Browser usage - January 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={pieConfig} className="aspect-auto h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip />
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    strokeWidth={2}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="flex justify-center gap-4 mt-2 text-xs text-muted-foreground">
              {pieData.map((entry) => (
                <div key={entry.name} className="flex items-center gap-1.5">
                  <div
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: entry.fill }}
                  />
                  {entry.name}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Radial Bar Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Radial Chart</CardTitle>
            <CardDescription>Top 3 browsers by visitors</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={radialConfig} className="aspect-auto h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  data={radialData}
                  innerRadius={30}
                  outerRadius={100}
                  startAngle={180}
                  endAngle={0}
                >
                  <RadialBar dataKey="visitors" background />
                  <PolarAngleAxis type="number" domain={[0, 300]} tick={false} />
                </RadialBarChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="flex justify-center gap-4 mt-2 text-xs text-muted-foreground">
              {radialData.map((entry) => (
                <div key={entry.name} className="flex items-center gap-1.5">
                  <div
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: entry.fill }}
                  />
                  {entry.name}: {entry.visitors}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Overview */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">Revenue Overview</CardTitle>
              <CardDescription>Monthly revenue and expenses</CardDescription>
            </div>
            <div className="flex items-center gap-1 text-sm text-primary">
              <TrendingDown className="h-4 w-4" />
              <span className="font-medium">-2.4%</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              revenue: { label: 'Revenue', color: 'var(--chart-1)' },
              expenses: { label: 'Expenses', color: 'var(--chart-4)' },
            }}
            className="aspect-auto h-[220px] w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { month: 'Jan', revenue: 4000, expenses: 2400 },
                  { month: 'Feb', revenue: 3000, expenses: 1398 },
                  { month: 'Mar', revenue: 5000, expenses: 3800 },
                  { month: 'Apr', revenue: 2780, expenses: 3908 },
                  { month: 'May', revenue: 1890, expenses: 4800 },
                  { month: 'Jun', revenue: 4390, expenses: 3800 },
                ]}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <YAxis tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" fill="var(--color-expenses)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
