"use client";

import { BarChart3, AlertTriangle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface UsageItem {
  name: string;
  used: number;
  limit: number;
  unit?: string;
}

const defaultUsage: UsageItem[] = [
  { name: "API Requests", used: 8432, limit: 10000 },
  { name: "Storage", used: 3.2, limit: 10, unit: "GB" },
  { name: "Bandwidth", used: 45, limit: 100, unit: "GB" },
  { name: "Team Members", used: 5, limit: 10 },
  { name: "Webhooks", used: 12, limit: 20 },
];

function formatValue(value: number, unit?: string) {
  if (unit) return `${value} ${unit}`;
  return new Intl.NumberFormat().format(value);
}

export default function UsageMeter({
  className,
  usage = defaultUsage,
}: {
  className?: string;
  usage?: UsageItem[];
}) {
  return (
    <Card className={cn("mx-auto w-full max-w-2xl", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
              <BarChart3 className="text-primary h-5 w-5" />
            </div>
            <div>
              <CardTitle>Usage</CardTitle>
              <CardDescription>
                Current billing period usage
              </CardDescription>
            </div>
          </div>
          <Badge variant="secondary">Current Period</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {usage.map((item) => {
          const pct = Math.min((item.used / item.limit) * 100, 100);
          const isHigh = pct >= 80;
          const isCritical = pct >= 95;

          return (
            <div key={item.name} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{item.name}</span>
                  {isCritical && (
                    <AlertTriangle className="h-3.5 w-3.5 text-red-500" />
                  )}
                </div>
                <span
                  className={cn(
                    "font-medium",
                    isCritical && "text-red-500",
                    isHigh && !isCritical && "text-amber-500"
                  )}
                >
                  {formatValue(item.used, item.unit)} /{" "}
                  {formatValue(item.limit, item.unit)}
                </span>
              </div>
              <Progress
                value={pct}
                className={cn(
                  isCritical && "[&>div]:bg-red-500",
                  isHigh && !isCritical && "[&>div]:bg-amber-500"
                )}
              />
            </div>
          );
        })}

        <div className="flex justify-end pt-2">
          <Button variant="outline" size="sm">
            Upgrade Limits
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
