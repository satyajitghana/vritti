"use client";

import { motion } from "motion/react";
import { Zap, Lock, Globe, Palette, Layers, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

const features = [
  {
    icon: Zap,
    title: "Blazing Fast",
    description:
      "Optimized for speed with lazy loading, code splitting, and edge caching built in.",
    color: "bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400",
  },
  {
    icon: Lock,
    title: "Secure by Default",
    description:
      "Enterprise-grade security with encryption at rest, in transit, and automatic threat detection.",
    color: "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
  },
  {
    icon: Globe,
    title: "Global Scale",
    description:
      "Deploy to the edge with a single command. Serve users worldwide with minimal latency.",
    color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400",
  },
  {
    icon: Palette,
    title: "Fully Themeable",
    description:
      "Customize every aspect of the design system with CSS variables and a visual theme editor.",
    color: "bg-pink-100 text-pink-600 dark:bg-pink-950 dark:text-pink-400",
  },
  {
    icon: Layers,
    title: "Composable",
    description:
      "Build complex interfaces from small, reusable components that snap together like building blocks.",
    color: "bg-violet-100 text-violet-600 dark:bg-violet-950 dark:text-violet-400",
  },
  {
    icon: Sparkles,
    title: "AI-Powered",
    description:
      "Integrated AI capabilities for smart suggestions, auto-completion, and content generation.",
    color: "bg-cyan-100 text-cyan-600 dark:bg-cyan-950 dark:text-cyan-400",
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export interface FeaturesIconGridProps {
  className?: string;
}

export default function FeaturesIconGrid({ className }: FeaturesIconGridProps) {
  return (
    <section className={cn("w-full py-16 px-4", className)}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything You Need
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            A comprehensive toolkit designed to help you build better products
            faster, with less complexity and more confidence.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={item}
                className="rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
              >
                <div
                  className={cn(
                    "mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full",
                    feature.color
                  )}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
