"use client";

import { motion } from "motion/react";
import { Check, Zap, Shield } from "lucide-react";

import { cn } from "@/lib/utils";

const features = [
  {
    title: "Lightning-Fast Performance",
    description:
      "Built with speed at its core. Our optimized architecture ensures your application loads instantly and responds to user interactions without delay.",
    gradient: "from-blue-500 to-cyan-600",
    icon: Zap,
    bullets: [
      "Sub-second page loads worldwide",
      "Optimized bundle sizes with tree-shaking",
      "Edge-cached static assets for minimal latency",
    ],
  },
  {
    title: "Enterprise-Grade Security",
    description:
      "Protect your users and data with industry-leading security measures baked into every layer of the stack.",
    gradient: "from-violet-500 to-purple-600",
    icon: Shield,
    bullets: [
      "End-to-end encryption for all data",
      "SOC 2 Type II certified infrastructure",
      "Automatic vulnerability scanning and patching",
    ],
  },
  {
    title: "Seamless Integration",
    description:
      "Connect with your existing tools and workflows effortlessly. Our platform plays well with the technologies you already love.",
    gradient: "from-emerald-500 to-teal-600",
    icon: Check,
    bullets: [
      "RESTful and GraphQL APIs included",
      "Webhooks for real-time event notifications",
      "Pre-built connectors for popular services",
    ],
  },
];

export interface FeaturesAlternatingProps {
  className?: string;
}

export default function FeaturesAlternating({
  className,
}: FeaturesAlternatingProps) {
  return (
    <section className={cn("w-full py-16 px-4", className)}>
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Why Choose Us
        </h2>
        <p className="mx-auto mb-16 max-w-2xl text-center text-muted-foreground">
          Everything you need to build, deploy, and scale your next project with
          confidence.
        </p>

        <div className="space-y-24">
          {features.map((feature, index) => {
            const isReversed = index % 2 === 1;
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={cn(
                  "flex flex-col items-center gap-8 lg:flex-row lg:gap-16",
                  isReversed && "lg:flex-row-reverse"
                )}
              >
                <div className="flex-1">
                  <div
                    className={cn(
                      "flex h-64 w-full items-center justify-center rounded-2xl bg-gradient-to-br sm:h-80",
                      feature.gradient
                    )}
                  >
                    <Icon className="h-20 w-20 text-white/80" />
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <h3 className="text-2xl font-bold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                  <ul className="space-y-3 pt-2">
                    {feature.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-3 text-sm text-foreground"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
