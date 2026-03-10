"use client";

import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { Code, Globe, Layers, Palette, Shield, Zap } from "lucide-react";

import { cn } from "@/lib/utils";

interface FeatureCard {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  colSpan?: number;
  rowSpan?: number;
}

const defaultFeatures: FeatureCard[] = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Optimized for speed with edge computing and smart caching. Your users get sub-100ms response times worldwide.",
    gradient: "from-amber-500/10 to-orange-500/10",
    colSpan: 2,
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "SOC2 compliant with end-to-end encryption and role-based access control.",
    gradient: "from-blue-500/10 to-cyan-500/10",
  },
  {
    icon: Globe,
    title: "Global CDN",
    description:
      "Deployed across 200+ edge locations for reliable delivery anywhere in the world.",
    gradient: "from-emerald-500/10 to-green-500/10",
  },
  {
    icon: Palette,
    title: "Customizable Design",
    description:
      "Fully themeable with CSS variables. Match your brand perfectly with zero compromises on aesthetics.",
    gradient: "from-pink-500/10 to-rose-500/10",
    colSpan: 2,
  },
  {
    icon: Code,
    title: "Developer First",
    description:
      "Clean APIs, comprehensive docs, and TypeScript support out of the box.",
    gradient: "from-violet-500/10 to-purple-500/10",
    colSpan: 2,
  },
  {
    icon: Layers,
    title: "Composable",
    description:
      "Build complex UIs from simple, reusable components that snap together seamlessly.",
    gradient: "from-fuchsia-500/10 to-pink-500/10",
  },
];

export interface FeatureCardsBentoProps {
  className?: string;
  features?: FeatureCard[];
}

export default function FeatureCardsBento({
  className,
  features = defaultFeatures,
}: FeatureCardsBentoProps) {
  return (
    <section className={cn("px-4 py-16", className)}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
            Everything You Need
          </h2>
          <p className="text-muted-foreground mt-3 text-lg">
            Powerful features to help you build, ship, and scale.
          </p>
        </div>

        <div className="grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ scale: 1.02 }}
                className={cn(
                  feature.colSpan === 2 && "sm:col-span-2",
                  feature.rowSpan === 2 && "sm:row-span-2"
                )}
              >
                <div
                  className={cn(
                    "bg-background relative h-full overflow-hidden rounded-2xl border p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
                  )}
                >
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-br opacity-50",
                      feature.gradient
                    )}
                  />
                  <div className="relative">
                    <div className="bg-muted mb-4 inline-flex rounded-xl p-3">
                      <Icon className="text-foreground h-5 w-5" />
                    </div>
                    <h3 className="text-foreground text-lg font-semibold">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
