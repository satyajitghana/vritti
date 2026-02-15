"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface HeroMinimalProps {
  className?: string;
  title?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export default function HeroMinimal({
  className,
  title = "Beautifully crafted components for your next project.",
  buttonText = "Get Started",
  onButtonClick,
}: HeroMinimalProps) {
  return (
    <section
      className={cn(
        "flex min-h-[80vh] items-center justify-center px-4",
        className
      )}
    >
      <div className="max-w-4xl text-center">
        <motion.h1
          className="text-foreground text-5xl font-bold leading-[1.1] tracking-tight md:text-7xl lg:text-8xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {title}
        </motion.h1>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button
            size="lg"
            className="group gap-2 px-10 py-6 text-lg"
            onClick={onButtonClick}
          >
            {buttonText}
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>

        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="bg-border mx-auto h-px w-16" />
          <p className="text-muted-foreground mt-6 text-sm tracking-wide">
            No credit card required. Free forever for small teams.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
