"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface HeroCenteredProps {
  className?: string;
  title?: string;
  highlight?: string;
  description?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

export default function HeroCentered({
  className,
  title = "Build beautiful products",
  highlight = "faster than ever",
  description = "A modern component library that helps you ship stunning interfaces in record time. Designed for developers who value quality and speed.",
  primaryButtonText = "Get Started",
  secondaryButtonText = "Learn More",
  onPrimaryClick,
  onSecondaryClick,
}: HeroCenteredProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden py-24 md:py-32 lg:py-40",
        className
      )}
    >
      <div className="container mx-auto max-w-5xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="bg-muted text-muted-foreground mb-6 inline-block rounded-full px-4 py-1.5 text-sm font-medium">
            Introducing our latest release
          </span>
        </motion.div>

        <motion.h1
          className="text-foreground mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {title}{" "}
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {highlight}
          </span>
        </motion.h1>

        <motion.p
          className="text-muted-foreground mx-auto mb-10 max-w-2xl text-lg md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {description}
        </motion.p>

        <motion.div
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button size="lg" className="gap-2 px-8" onClick={onPrimaryClick}>
            {primaryButtonText}
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="px-8"
            onClick={onSecondaryClick}
          >
            {secondaryButtonText}
          </Button>
        </motion.div>

        <motion.div
          className="mx-auto mt-16 flex items-center justify-center gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="text-muted-foreground text-sm">
            Trusted by 10,000+ developers worldwide
          </p>
        </motion.div>
      </div>
    </section>
  );
}
