"use client";

import { Check } from "lucide-react";
import { useState, useId } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

interface Plan {
  id: string;
  title: string;
  description: string;
  highlight?: boolean;
  badge?: string;
  currency?: string;
  monthlyPrice: string;
  yearlyPrice: string;
  buttonText: string;
  features: { name: string }[];
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
      { name: "Presence" },
      { name: "Comments" },
      { name: "Notifications" },
      { name: "Text Editor" },
      { name: "Sync Datastore" },
    ],
  },
  {
    id: "pro",
    title: "Pro",
    description: "For companies adding collaboration in production.",
    currency: "$",
    monthlyPrice: "20",
    yearlyPrice: "199",
    buttonText: "Sign up",
    badge: "Most popular",
    highlight: true,
    features: [
      { name: "Presence" },
      { name: "Comments" },
      { name: "Notifications" },
      { name: "Text Editor" },
      { name: "Sync Datastore" },
    ],
  },
  {
    id: "enterprise",
    title: "Enterprise",
    description: "For organizations that need more support.",
    currency: "$",
    monthlyPrice: "Custom",
    yearlyPrice: "Custom",
    buttonText: "Contact sales",
    features: [
      { name: "Presence" },
      { name: "Comments" },
      { name: "Notifications" },
      { name: "Text Editor" },
      { name: "Sync Datastore" },
    ],
  },
];

export interface PricingTableThreeProps {
  className?: string;
  plans?: Plan[];
  onPlanSelect?: (planId: string) => void;
  showFooter?: boolean;
  footerText?: string;
  footerButtonText?: string;
  onFooterButtonClick?: () => void;
}

export default function PricingTableThree({
  className,
  plans = defaultPlans,
  onPlanSelect,
  showFooter = true,
  footerText,
  footerButtonText,
  onFooterButtonClick,
}: PricingTableThreeProps) {
  const [isAnnually, setIsAnnually] = useState(false);
  const uniqueId = useId();

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
    <div className={cn("mx-auto mt-10 max-w-7xl px-4", className)}>
      <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row md:items-start md:gap-10">
        <div className="bg-muted flex h-11 w-fit shrink-0 items-center rounded-md p-1 text-lg">
          <RadioGroup
            defaultValue="monthly"
            className="h-full grid-cols-2"
            onValueChange={(value) => setIsAnnually(value === "annually")}
          >
            <div className='has-[button[data-state="checked"]]:bg-background h-full rounded-md transition-all'>
              <RadioGroupItem
                value="monthly"
                id={`${uniqueId}-monthly`}
                className="peer sr-only"
              />
              <Label
                htmlFor={`${uniqueId}-monthly`}
                className="text-muted-foreground peer-data-[state=checked]:text-primary flex h-full cursor-pointer items-center justify-center px-7 font-semibold"
              >
                Monthly
              </Label>
            </div>
            <div className='has-[button[data-state="checked"]]:bg-background h-full rounded-md transition-all'>
              <RadioGroupItem
                value="annually"
                id={`${uniqueId}-annually`}
                className="peer sr-only"
              />
              <Label
                htmlFor={`${uniqueId}-annually`}
                className="text-muted-foreground peer-data-[state=checked]:text-primary flex h-full cursor-pointer items-center justify-center gap-1 px-7 font-semibold"
              >
                Yearly
              </Label>
            </div>
          </RadioGroup>
        </div>
        {yearlyPriceDiscount > 0 && (
          <span className="text-muted-foreground mt-2 text-xs">
            Save up to {yearlyPriceDiscount}% with yearly plan
          </span>
        )}
      </div>

      <div
        className={cn(
          "grid gap-4 md:gap-0",
          plans.length === 1 && "mx-auto max-w-md grid-cols-1",
          plans.length === 2 && "mx-auto max-w-4xl grid-cols-1 md:grid-cols-2",
          plans.length === 3 && "grid-cols-1 md:grid-cols-3",
          plans.length >= 4 &&
            "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        )}
      >
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={cn(
              "text-card-foreground relative flex flex-col rounded-xl border shadow-sm transition-all duration-200 md:rounded-none md:border-none md:shadow-none",
              plan.highlight
                ? "bg-muted/30 border-border z-10 shadow-lg md:-mt-8 md:rounded-md md:border-t"
                : "bg-card"
            )}
          >
            {plan.badge && (
              <Badge className="bg-secondary text-secondary-foreground absolute -top-3 left-1/2 -translate-x-1/2 transform px-3 py-1 text-xs">
                {plan.badge}
              </Badge>
            )}
            <CardHeader className="pb-4">
              <div className="space-y-2">
                <h3 className="text-left text-xl font-semibold">
                  {plan.title}
                </h3>
                <p className="text-muted-foreground w-full text-left text-sm">
                  {plan.description}
                </p>
              </div>
              <div className="space-y-1 text-left">
                {isAnnually ? (
                  <div>
                    <span className="text-left text-4xl font-medium">
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
                    <p className="text-muted-foreground">Per year</p>
                  </div>
                ) : (
                  <div>
                    <span className="text-left text-4xl font-medium">
                      {parseFloat(plan.monthlyPrice) >= 0 && plan.currency}
                      {plan.monthlyPrice}
                    </span>
                    <p className="text-muted-foreground">Per month</p>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col space-y-6">
              <div className="flex-1 space-y-4">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="bg-primary h-2 w-2 rounded-sm" />
                    <span className="text-sm">{feature.name}</span>
                    <span className="text-muted-foreground ml-auto text-sm">
                      Included
                    </span>
                  </div>
                ))}
              </div>
              <Button
                className="mt-auto w-full"
                variant={plan.highlight ? "default" : "secondary"}
                onClick={() => onPlanSelect?.(plan.id)}
              >
                {plan.buttonText}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {showFooter && (
        <div className="bg-muted/50 border-border flex items-center justify-between border-t p-6">
          <div className="flex w-full flex-col justify-between gap-4 md:flex-row">
            <p className="text-card-foreground my-auto w-full text-left text-lg font-medium">
              {footerText ||
                "Pre-negotiated discounts are available to early-stage startups and nonprofits."}
            </p>
            <Button
              variant="secondary"
              className="px-6"
              onClick={onFooterButtonClick}
            >
              {footerButtonText || "Apply now"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
