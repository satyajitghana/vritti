"use client";

import { Clock, ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface TrialExpiryCardProps {
  className?: string;
  daysRemaining?: number;
  totalDays?: number;
  planName?: string;
  features?: string[];
  onUpgrade?: () => void;
}

export default function TrialExpiryCard({
  className,
  daysRemaining = 5,
  totalDays = 14,
  planName = "Pro Plan",
  features = [
    "Unlimited projects",
    "Advanced analytics",
    "Priority support",
    "Custom domains",
    "Team collaboration",
  ],
  onUpgrade,
}: TrialExpiryCardProps) {
  const progressPct = ((totalDays - daysRemaining) / totalDays) * 100;
  const isUrgent = daysRemaining <= 3;

  return (
    <Card className={cn("mx-auto w-full max-w-md", className)}>
      <CardHeader className="text-center">
        <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100">
          <Clock className={cn("h-7 w-7", isUrgent ? "text-red-500" : "text-amber-600")} />
        </div>
        <CardTitle className="text-2xl">Trial Expiring Soon</CardTitle>
        <CardDescription>
          Your free trial ends in{" "}
          <span className={cn("font-semibold", isUrgent ? "text-red-500" : "text-foreground")}>
            {daysRemaining} days
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Trial progress</span>
            <span className="font-medium">
              {totalDays - daysRemaining} of {totalDays} days used
            </span>
          </div>
          <Progress value={progressPct} className={cn(isUrgent && "[&>div]:bg-red-500")} />
        </div>

        <div className="rounded-lg border p-4">
          <h3 className="mb-3 font-semibold">
            Upgrade to {planName} to keep:
          </h3>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-sm">
                <Check className="text-primary h-4 w-4 flex-none" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <Button className="w-full gap-2" onClick={onUpgrade}>
            <ArrowUpRight className="h-4 w-4" />
            Upgrade Now
          </Button>
          <p className="text-muted-foreground text-center text-xs">
            Cancel anytime. No commitment required.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
