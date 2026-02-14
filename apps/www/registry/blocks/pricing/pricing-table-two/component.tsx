"use client";

import { Check, Minus } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface Plan {
  id: string;
  title: string;
  description: string;
  highlight?: boolean;
  currency?: string;
  monthlyPrice: string;
  yearlyPrice: string;
  buttonText: string;
  features: { name: string; icon?: string }[];
}

const defaultPlans: Plan[] = [
  {
    id: "starter",
    title: "Starter",
    description: "For developers testing locally.",
    currency: "$",
    monthlyPrice: "0",
    yearlyPrice: "0",
    buttonText: "Start today for free",
    features: [
      { name: "Presence", icon: "check" },
      { name: "Comments", icon: "check" },
      { name: "Notifications", icon: "check" },
    ],
  },
  {
    id: "pro",
    title: "Pro",
    description: "For companies in production.",
    currency: "$",
    monthlyPrice: "20",
    yearlyPrice: "199",
    buttonText: "Sign up",
    highlight: true,
    features: [
      { name: "Presence", icon: "check" },
      { name: "Comments", icon: "check" },
      { name: "Notifications", icon: "check" },
      { name: "Text Editor", icon: "check" },
      { name: "Sync Datastore", icon: "check" },
    ],
  },
  {
    id: "enterprise",
    title: "Enterprise",
    description: "For orgs needing compliance.",
    currency: "$",
    monthlyPrice: "Custom",
    yearlyPrice: "Custom",
    buttonText: "Contact sales",
    features: [
      { name: "Presence", icon: "check" },
      { name: "Comments", icon: "check" },
      { name: "Notifications", icon: "check" },
      { name: "Text Editor", icon: "check" },
      { name: "Sync Datastore", icon: "check" },
    ],
  },
];

export interface PricingTableTwoProps {
  className?: string;
  plans?: Plan[];
  title?: string;
  description?: string;
  onPlanSelect?: (planId: string) => void;
}

export default function PricingTableTwo({
  className,
  plans = defaultPlans,
  title,
  description,
  onPlanSelect,
}: PricingTableTwoProps) {
  const [isAnnually, setIsAnnually] = useState(false);

  function calculateDiscount(
    monthlyPrice: string,
    yearlyPrice: string
  ): number {
    const monthly = parseFloat(monthlyPrice);
    const yearly = parseFloat(yearlyPrice);
    if (
      monthlyPrice.toLowerCase() === "custom" ||
      yearlyPrice.toLowerCase() === "custom" ||
      isNaN(monthly) ||
      isNaN(yearly) ||
      monthly === 0
    )
      return 0;
    return Math.round(((monthly * 12 - yearly) / (monthly * 12)) * 100);
  }

  const yearlyPriceDiscount = plans.length
    ? Math.max(
        ...plans.map((plan) =>
          calculateDiscount(plan.monthlyPrice, plan.yearlyPrice)
        )
      )
    : 0;

  return (
    <section className={cn("py-20", className)}>
      <div className="container mx-auto max-w-5xl px-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="mb-2 text-3xl font-semibold lg:text-5xl">
            {title || "We offer 3 plans"}
          </h2>
          <p className="text-muted-foreground text-center lg:text-lg">
            {description ||
              "Choose the plan that best fits your needs. Upgrade anytime."}
          </p>
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
          <span
            className={cn(
              "text-sm font-medium transition-all",
              !isAnnually ? "text-foreground" : "text-muted-foreground"
            )}
          >
            Monthly
          </span>
          <Switch checked={isAnnually} onCheckedChange={setIsAnnually} />
          <span
            className={cn(
              "text-sm font-medium transition-all",
              isAnnually ? "text-foreground" : "text-muted-foreground"
            )}
          >
            Yearly
          </span>
        </div>

        {yearlyPriceDiscount > 0 && (
          <div className="mt-2 flex justify-center">
            <span className="text-muted-foreground text-xs">
              Save up to {yearlyPriceDiscount}% with yearly plan
            </span>
          </div>
        )}

        <div
          className={cn(
            "mt-10 flex gap-4 md:gap-0",
            plans.length <= 2
              ? "mx-auto max-w-4xl flex-col md:flex-row"
              : "mx-auto max-w-7xl flex-col lg:flex-row"
          )}
        >
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              className={cn(
                "bg-card text-card-foreground flex w-full flex-col justify-between gap-8 rounded-xl border py-6 text-center shadow-sm md:rounded-none",
                index === 0 && "md:rounded-l-xl md:border-r-0",
                index === plans.length - 1 && "md:rounded-r-xl md:border-l-0",
                index > 0 &&
                  index < plans.length - 1 &&
                  "md:border-r-0 md:border-l-0",
                plan.highlight && "bg-muted/30 shadow-lg"
              )}
            >
              <div className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6">
                <div className="flex items-center justify-center gap-2">
                  <div className="font-semibold leading-none">{plan.title}</div>
                </div>
                <p className="text-muted-foreground text-center">
                  {plan.description}
                </p>
              </div>

              <div className="px-6">
                {isAnnually ? (
                  <div>
                    <span className="text-5xl font-bold">
                      {parseFloat(plan.yearlyPrice) >= 0 && plan.currency}
                      {plan.yearlyPrice}
                      {calculateDiscount(
                        plan.monthlyPrice,
                        plan.yearlyPrice
                      ) > 0 && (
                        <span className="ml-2 text-xs underline">
                          {calculateDiscount(
                            plan.monthlyPrice,
                            plan.yearlyPrice
                          )}
                          % off
                        </span>
                      )}
                    </span>
                    <p className="text-muted-foreground mt-3">per year</p>
                  </div>
                ) : (
                  <div>
                    <span className="text-5xl font-bold">
                      {parseFloat(plan.monthlyPrice) >= 0 && plan.currency}
                      {plan.monthlyPrice}
                    </span>
                    <p className="text-muted-foreground mt-3">per month</p>
                  </div>
                )}
              </div>

              <div className="flex items-center px-6">
                <Button
                  className="w-full"
                  variant={plan.highlight ? "default" : "secondary"}
                  onClick={() => onPlanSelect?.(plan.id)}
                >
                  {plan.buttonText}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="relative mt-10 w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]"></TableHead>
                {plans.map((plan) => (
                  <TableHead
                    key={plan.id}
                    className="text-primary text-center font-bold"
                  >
                    {plan.title}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {(() => {
                const allFeatures = new Set<string>();
                plans.forEach((plan) => {
                  plan.features.forEach((feature) => {
                    allFeatures.add(feature.name);
                  });
                });
                return Array.from(allFeatures).map(
                  (featureName, featureIndex) => (
                    <TableRow key={featureIndex}>
                      <TableCell className="text-left font-medium">
                        {featureName}
                      </TableCell>
                      {plans.map((plan) => {
                        const feature = plan.features.find(
                          (f) => f.name === featureName
                        );
                        return (
                          <TableCell key={plan.id} className="text-center">
                            {feature ? (
                              <Check className="mx-auto h-5 w-5" />
                            ) : (
                              <Minus className="text-muted-foreground mx-auto h-5 w-5" />
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  )
                );
              })()}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}
