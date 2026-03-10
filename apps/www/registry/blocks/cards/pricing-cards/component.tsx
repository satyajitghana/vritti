"use client";

import { motion } from "motion/react";
import { Check, Sparkles, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingTier {
  name: string;
  price: number;
  period: string;
  description: string;
  features: PricingFeature[];
  popular?: boolean;
  cta: string;
}

const defaultTiers: PricingTier[] = [
  {
    name: "Basic",
    price: 9,
    period: "/month",
    description: "Perfect for individuals just getting started.",
    cta: "Get Started",
    features: [
      { text: "Up to 3 projects", included: true },
      { text: "Basic analytics", included: true },
      { text: "Community support", included: true },
      { text: "Custom domains", included: false },
      { text: "Priority support", included: false },
      { text: "Advanced integrations", included: false },
    ],
  },
  {
    name: "Pro",
    price: 29,
    period: "/month",
    description: "Best for growing teams and businesses.",
    popular: true,
    cta: "Start Free Trial",
    features: [
      { text: "Unlimited projects", included: true },
      { text: "Advanced analytics", included: true },
      { text: "Priority support", included: true },
      { text: "Custom domains", included: true },
      { text: "Team collaboration", included: true },
      { text: "Advanced integrations", included: false },
    ],
  },
  {
    name: "Enterprise",
    price: 99,
    period: "/month",
    description: "For large organizations with custom needs.",
    cta: "Contact Sales",
    features: [
      { text: "Unlimited everything", included: true },
      { text: "Custom analytics", included: true },
      { text: "Dedicated support", included: true },
      { text: "Custom domains", included: true },
      { text: "Team collaboration", included: true },
      { text: "Advanced integrations", included: true },
    ],
  },
];

export interface PricingCardsProps {
  className?: string;
  tiers?: PricingTier[];
}

export default function PricingCards({
  className,
  tiers = defaultTiers,
}: PricingCardsProps) {
  return (
    <section className={cn("px-4 py-16", className)}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="text-muted-foreground mt-3 text-lg">
            Choose the plan that works best for you.
          </p>
        </div>

        <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-3">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: tier.popular ? 1.02 : 1.03 }}
              className={cn("relative", tier.popular && "z-10")}
            >
              <div
                className={cn(
                  "bg-background relative rounded-2xl border p-8 shadow-sm transition-shadow duration-300 hover:shadow-md",
                  tier.popular && "border-primary scale-105 shadow-lg"
                )}
              >
                {tier.popular && (
                  <div className="bg-primary text-primary-foreground absolute -top-3.5 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full px-4 py-1 text-xs font-semibold">
                    <Sparkles className="h-3 w-3" />
                    Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-foreground text-lg font-semibold">
                    {tier.name}
                  </h3>
                  <p className="text-muted-foreground mt-1 text-sm">
                    {tier.description}
                  </p>
                </div>

                <div className="mb-6">
                  <span className="text-foreground text-4xl font-bold">
                    ${tier.price}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    {tier.period}
                  </span>
                </div>

                <ul className="mb-8 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature.text} className="flex items-center gap-2">
                      {feature.included ? (
                        <Check className="h-4 w-4 shrink-0 text-emerald-500" />
                      ) : (
                        <X className="text-muted-foreground h-4 w-4 shrink-0" />
                      )}
                      <span
                        className={cn(
                          "text-sm",
                          feature.included
                            ? "text-foreground"
                            : "text-muted-foreground"
                        )}
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full"
                  variant={tier.popular ? "default" : "outline"}
                >
                  {tier.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
