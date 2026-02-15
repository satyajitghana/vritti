"use client";

import { useState, useId } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Check, Phone } from "lucide-react";
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
      { name: "Up to 3 projects" },
      { name: "Basic analytics" },
      { name: "Community support" },
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
      { name: "Unlimited projects" },
      { name: "Advanced analytics" },
      { name: "Priority support" },
      { name: "Custom domains" },
      { name: "Team management" },
    ],
  },
  {
    id: "enterprise",
    title: "Enterprise",
    description: "For organizations that need more support and compliance features.",
    currency: "$",
    monthlyPrice: "Custom",
    yearlyPrice: "Custom",
    buttonText: "Contact sales",
    features: [
      { name: "Everything in Pro" },
      { name: "Dedicated support" },
      { name: "Custom SLA" },
      { name: "SSO integration" },
      { name: "Unlimited storage" },
    ],
  },
];

export interface PricingTableFiveProps {
  plans?: Plan[];
  title?: string;
  description?: string;
  onPlanSelect?: (planId: string) => void;
  className?: string;
}

export default function PricingTableFive({
  plans = defaultPlans,
  title = "Pricing Plans",
  description = "Choose the plan that's right for you",
  onPlanSelect,
  className,
}: PricingTableFiveProps) {
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

  const regularPlans = plans.slice(0, -1);
  const contactUsPlan = plans[plans.length - 1];

  return (
    <section className={cn("py-20", className)}>
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-12 pb-1 text-center">
          <h2 className="text-foreground mb-4 text-4xl font-bold lg:text-5xl">
            {title}
          </h2>
          <p className="text-muted-foreground mx-auto mb-8 max-w-3xl text-lg lg:text-xl">
            {description}
          </p>

          <div className="bg-muted mx-auto mt-8 flex h-11 w-fit items-center justify-center rounded-md p-1">
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
                  Annually
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

        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="flex flex-col gap-4 lg:w-2/3">
            {regularPlans.map((plan) => (
              <Card
                key={plan.id}
                className={cn(
                  "relative rounded-lg border p-6 transition-all duration-300",
                  plan.highlight
                    ? "bg-muted/50 border-primary/20 shadow-md"
                    : "bg-card border-border shadow-sm hover:bg-muted/30"
                )}
              >
                {plan.badge && (
                  <Badge className="bg-primary text-primary-foreground absolute -top-3 left-1/2 z-10 -translate-x-1/2 transform">
                    {plan.badge}
                  </Badge>
                )}
                <CardContent className="flex flex-col gap-6 p-0 md:flex-row md:items-center md:justify-between">
                  <div className="flex min-w-[200px] flex-col gap-3">
                    <Badge
                      variant="outline"
                      className="w-fit text-xs font-medium uppercase"
                    >
                      {plan.title}
                    </Badge>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold">
                        {parseFloat(
                          isAnnually ? plan.yearlyPrice : plan.monthlyPrice
                        ) >= 0 && plan.currency}
                        {isAnnually ? plan.yearlyPrice : plan.monthlyPrice}
                      </span>
                      <span className="text-muted-foreground text-sm">
                        /{isAnnually ? "year" : "month"}
                      </span>
                    </div>
                    <Button
                      onClick={() => onPlanSelect?.(plan.id)}
                      className="w-full md:w-auto"
                      variant={plan.highlight ? "default" : "secondary"}
                    >
                      {plan.buttonText}
                    </Button>
                  </div>
                  <div className="grid flex-1 gap-3 md:grid-cols-2">
                    {plan.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-start gap-2"
                      >
                        <Check className="text-primary mt-0.5 h-4 w-4 flex-none" />
                        <span className="text-muted-foreground text-sm">
                          {feature.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="lg:w-1/3">
            <Card className="bg-muted/50 border-border h-full rounded-lg border p-8 shadow-sm hover:bg-muted/70">
              <CardContent className="flex flex-col items-center space-y-6 p-0 text-center">
                <div className="bg-primary/10 flex h-16 w-16 items-center justify-center rounded-full">
                  <Phone className="text-primary h-8 w-8" />
                </div>
                <div>
                  <h3 className="mb-2 text-2xl font-bold">
                    {contactUsPlan.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {contactUsPlan.description}
                  </p>
                </div>
                <Button
                  onClick={() => onPlanSelect?.(contactUsPlan.id)}
                  variant="outline"
                  className="hover:bg-primary hover:text-primary-foreground w-full transition-colors"
                >
                  {contactUsPlan.buttonText}
                </Button>
                <p className="text-muted-foreground text-xs">
                  Custom pricing and solutions available
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
