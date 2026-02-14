"use client";

import { Check, Package, Award, Building2 } from "lucide-react";
import { useState, useId } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";

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
    description: "For organizations that need more support and compliance.",
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

const defaultIcons: Record<string, React.ReactNode> = {
  starter: <Package className="h-4 w-4" />,
  pro: <Award className="h-4 w-4" />,
  enterprise: <Building2 className="h-4 w-4" />,
};

export interface PricingTableFourProps {
  plans?: Plan[];
  title?: string;
  description?: string;
  subtitle?: string;
  onPlanSelect?: (planId: string) => void;
  className?: string;
}

export default function PricingTableFour({
  plans = defaultPlans,
  title = "Choose Your Perfect Plan",
  description = "Transform your project with our comprehensive pricing options designed for every need.",
  subtitle,
  onPlanSelect,
  className,
}: PricingTableFourProps) {
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

  const getPlanIcon = (planId: string) => {
    return defaultIcons[planId] || <Package className="h-5 w-5" />;
  };

  return (
    <section className={cn("py-20", className)}>
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          {subtitle && (
            <p className="text-primary mb-3 text-sm font-medium uppercase tracking-wide">
              {subtitle}
            </p>
          )}
          <h2 className="text-foreground mb-4 text-4xl font-bold lg:text-5xl">
            {title}
          </h2>
          <p className="text-muted-foreground mx-auto mb-2 max-w-3xl text-lg lg:text-xl">
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

        <div
          className={cn(
            "grid gap-6",
            plans.length === 1 && "mx-auto max-w-md grid-cols-1",
            plans.length === 2 && "mx-auto max-w-4xl grid-cols-1 md:grid-cols-2",
            plans.length === 3 && "grid-cols-1 md:grid-cols-3",
            plans.length >= 4 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          )}
        >
          {plans.map((plan) => (
            <div key={plan.id} className="group relative h-full">
              {plan.badge && (
                <Badge className="bg-primary text-primary-foreground absolute -top-3 left-1/2 z-20 -translate-x-1/2 transform">
                  {plan.badge}
                </Badge>
              )}

              <div
                className={cn(
                  "bg-card text-card-foreground relative h-full rounded-lg border p-6 transition-all duration-300",
                  plan.highlight
                    ? "bg-muted/50 border-primary/20"
                    : "hover:bg-muted/30"
                )}
              >
                <div className="flex h-full flex-col">
                  <div className="mb-4 flex items-start gap-4">
                    <div className="flex-1">
                      <h3 className="mb-1 text-xl font-bold">{plan.title}</h3>
                      <p className="text-muted-foreground text-sm">
                        {plan.description}
                      </p>
                    </div>
                    <div className="bg-muted text-foreground border-border flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border">
                      {getPlanIcon(plan.id)}
                    </div>
                  </div>

                  <div className="mb-6">
                    {isAnnually ? (
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-medium">
                          {parseFloat(plan.yearlyPrice) >= 0 &&
                            plan.yearlyPrice.toLowerCase() !== "custom" &&
                            plan.currency}
                          {plan.yearlyPrice}
                        </span>
                        <span className="text-muted-foreground text-sm">
                          /year
                        </span>
                        {calculateDiscount(
                          plan.monthlyPrice,
                          plan.yearlyPrice
                        ) > 0 && (
                          <span className="text-primary ml-2 text-xs font-medium">
                            {calculateDiscount(
                              plan.monthlyPrice,
                              plan.yearlyPrice
                            )}
                            % off
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-medium">
                          {parseFloat(plan.monthlyPrice) >= 0 &&
                            plan.monthlyPrice.toLowerCase() !== "custom" &&
                            plan.currency}
                          {plan.monthlyPrice}
                        </span>
                        <span className="text-muted-foreground text-sm">
                          /month
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mb-6">
                    <Button
                      onClick={() => onPlanSelect?.(plan.id)}
                      className="w-full"
                      variant={plan.highlight ? "default" : "secondary"}
                    >
                      {plan.buttonText}
                    </Button>
                  </div>

                  <div className="flex-1">
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-start gap-3"
                        >
                          <Check className="text-primary h-4 w-4 flex-none" />
                          <span className="text-muted-foreground text-sm">
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
