"use client";

import { motion } from "motion/react";
import { ArrowRight, Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface HeroSplitProps {
  className?: string;
  title?: string;
  description?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  stats?: { value: string; label: string }[];
}

const defaultStats = [
  { value: "10K+", label: "Active Users" },
  { value: "99.9%", label: "Uptime" },
  { value: "150+", label: "Integrations" },
];

export default function HeroSplit({
  className,
  title = "Ship your next project with confidence",
  description = "Build scalable applications with our battle-tested component library. From prototype to production in days, not months.",
  primaryButtonText = "Start Building",
  secondaryButtonText = "Watch Demo",
  onPrimaryClick,
  onSecondaryClick,
  stats = defaultStats,
}: HeroSplitProps) {
  return (
    <section className={cn("py-20 md:py-28 lg:py-32", className)}>
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary mb-4 inline-block text-sm font-semibold uppercase tracking-wider">
              Next Generation Platform
            </span>

            <h1 className="text-foreground mb-6 text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              {title}
            </h1>

            <p className="text-muted-foreground mb-8 max-w-lg text-lg">
              {description}
            </p>

            <div className="mb-10 flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
                className="gap-2 px-8"
                onClick={onPrimaryClick}
              >
                {primaryButtonText}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="gap-2"
                onClick={onSecondaryClick}
              >
                <Play className="h-4 w-4" />
                {secondaryButtonText}
              </Button>
            </div>

            <div className="flex gap-8 border-t pt-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                >
                  <p className="text-foreground text-2xl font-bold">
                    {stat.value}
                  </p>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-muted relative aspect-square overflow-hidden rounded-2xl lg:aspect-[4/3]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="bg-muted-foreground/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                    <svg
                      className="text-muted-foreground h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
                      />
                    </svg>
                  </div>
                  <p className="text-muted-foreground text-sm font-medium">
                    Image or Illustration
                  </p>
                  <p className="text-muted-foreground/60 mt-1 text-xs">
                    Replace with your own content
                  </p>
                </div>
              </div>
            </div>

            <motion.div
              className="bg-background absolute -bottom-4 -left-4 rounded-xl border p-4 shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                  <svg
                    className="text-primary h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-foreground text-sm font-semibold">
                    Ready to deploy
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Production-grade quality
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
