"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

function formatNumber(n: number) {
  return new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(n);
}

export type UsageBasedPricingProps = {
  className?: string;
  min?: number;
  max?: number;
  currency?: string;
  basePrice?: number;
  includedCredits?: number;
  title?: string;
  subtitle?: string;
  onChange?: (value: number) => void;
};

export default function UsageBasedPricing({
  className,
  min = 4000,
  max = 25000,
  currency = "$",
  basePrice = 39.99,
  includedCredits = 4000,
  title = "Pay as you use pricing",
  subtitle = "Start with a flat monthly rate that includes 4,000 credits.",
  onChange,
}: UsageBasedPricingProps) {
  const [value, setValue] = useState(min);

  const price = useMemo(() => {
    const extra = Math.max(0, value - includedCredits);
    const thousandsOver = Math.ceil(extra / 1000);
    const extraCost = thousandsOver * 10;
    return basePrice + extraCost;
  }, [value, includedCredits, basePrice]);

  const handleChange = (vals: number[]) => {
    const v = vals[0];
    setValue(v);
    onChange?.(v);
  };

  return (
    <Card className={cn("mx-auto w-full max-w-3xl", className)}>
      <CardHeader className="text-left">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mt-4 flex flex-col items-center gap-2">
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold tabular-nums">
              {currency}
              {price.toFixed(2)}
            </span>
            <span className="text-muted-foreground text-sm">/mo</span>
          </div>
          <p className="text-muted-foreground text-xs">
            {formatNumber(value)} credits per month
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="space-y-4">
            <Slider
              value={[value]}
              onValueChange={handleChange}
              min={min}
              max={max}
              step={100}
              className="w-full"
            />
            <div className="text-muted-foreground flex justify-between px-1 text-xs">
              <span>{formatNumber(min)} credits</span>
              <span>{formatNumber(max)} credits</span>
            </div>
          </div>

          <div className="bg-muted/50 space-y-2 rounded-lg border p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Base price</span>
              <span className="font-medium">
                {currency}
                {basePrice.toFixed(2)}/mo
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Included credits</span>
              <span className="font-medium">
                {formatNumber(includedCredits)}
              </span>
            </div>
            {value > includedCredits && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Additional credits
                </span>
                <span className="font-medium">
                  {formatNumber(value - includedCredits)} ($10 per 1,000)
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
