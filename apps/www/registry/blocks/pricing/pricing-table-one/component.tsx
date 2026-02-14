"use client";

import { Check } from "lucide-react";
import { useState, useId } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface Plan {
  id: string;
  title: string;
  description: string;
  highlight?: boolean;
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
    description: "For individuals getting started.",
    currency: "$",
    monthlyPrice: "0",
    yearlyPrice: "0",
    buttonText: "Start for free",
    features: [
      { name: "Up to 3 projects" },
      { name: "Basic analytics" },
      { name: "Community support" },
      { name: "1 GB storage" },
    ],
  },
  {
    id: "pro",
    title: "Pro",
    description: "For teams building in production.",
    currency: "$",
    monthlyPrice: "20",
    yearlyPrice: "199",
    buttonText: "Sign up",
    highlight: true,
    features: [
      { name: "Unlimited projects" },
      { name: "Advanced analytics" },
      { name: "Priority support" },
      { name: "10 GB storage" },
      { name: "Custom domains" },
    ],
  },
  {
    id: "enterprise",
    title: "Enterprise",
    description: "For organizations needing more.",
    currency: "$",
    monthlyPrice: "Custom",
    yearlyPrice: "Custom",
    buttonText: "Contact sales",
    features: [
      { name: "Everything in Pro" },
      { name: "Dedicated support" },
      { name: "Custom integrations" },
      { name: "SLA guarantee" },
      { name: "Unlimited storage" },
    ],
  },
];

export interface PricingTableOneProps {
  className?: string;
  plans?: Plan[];
  title?: string;
  description?: string;
  onPlanSelect?: (planId: string) => void;
}

export default function PricingTableOne({
  className,
  plans = defaultPlans,
  title,
  description,
  onPlanSelect,
}: PricingTableOneProps) {
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
    ) {
      return 0;
    }

    const discount = ((monthly * 12 - yearly) / (monthly * 12)) * 100;
    return Math.round(discount);
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
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-6 flex flex-col gap-4">
          <h2 className="text-pretty text-left text-4xl font-bold lg:text-5xl">
            {title || "Pricing"}
          </h2>
        </div>

        <div className="flex flex-col justify-between gap-5 md:flex-row md:gap-10">
          <p className="text-muted-foreground max-w-3xl text-left text-lg lg:text-xl">
            {description ||
              "Transparent pricing with no hidden fees. Upgrade or downgrade anytime."}
          </p>
          <div className="bg-muted flex h-11 w-fit shrink-0 items-center rounded-md p-1 text-lg">
            <RadioGroup
              defaultValue="monthly"
              className="h-full grid-cols-2"
              onValueChange={(value) => {
                setIsAnnually(value === "annually");
              }}
            >
              <div className='has-[button[data-state="checked"]]:bg-background h-full rounded-md transition-all'>
                <RadioGroupItem
                  value="monthly"
                  id={`${uniqueId}-monthly`}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={`${uniqueId}-monthly`}
                  className="text-muted-foreground peer-data-[state=checked]:text-primary hover:text-foreground flex h-full cursor-pointer items-center justify-center px-2 font-semibold transition-all md:px-7"
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
                  className="text-muted-foreground peer-data-[state=checked]:text-primary hover:text-foreground flex h-full cursor-pointer items-center justify-center gap-1 px-2 font-semibold transition-all md:px-7"
                >
                  Yearly
                  {yearlyPriceDiscount > 0 && (
                    <span className="bg-primary/10 text-primary border-primary/20 ml-1 rounded border px-2 py-0.5 text-xs font-medium">
                      Save {yearlyPriceDiscount}%
                    </span>
                  )}
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <div className="mt-10 flex w-full flex-col items-stretch gap-6 md:flex-row md:items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                "flex w-full flex-col rounded-lg border p-6 text-left transition-all duration-300",
                plan.highlight ? "bg-muted" : ""
              )}
            >
              <Badge className="mb-8 block w-fit">{plan.title}</Badge>

              <div>
                {isAnnually ? (
                  <>
                    <span className="text-4xl font-medium">
                      {parseFloat(plan.yearlyPrice) >= 0 && (
                        <>{plan.currency}</>
                      )}
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
                    <p className="text-muted-foreground">per year</p>
                  </>
                ) : (
                  <>
                    <span className="text-4xl font-medium">
                      {parseFloat(plan.monthlyPrice) >= 0 && (
                        <>{plan.currency}</>
                      )}
                      {plan.monthlyPrice}
                    </span>
                    <p className="text-muted-foreground">per month</p>
                  </>
                )}
              </div>

              <Separator className="my-6" />

              <div className="flex h-full flex-col justify-between gap-10">
                <ul className="text-muted-foreground space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex gap-3">
                      <Check className="text-primary h-4 w-4 flex-none" />
                      <span>{feature.name}</span>
                    </li>
                  ))}
                </ul>

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
      </div>
    </section>
  );
}
