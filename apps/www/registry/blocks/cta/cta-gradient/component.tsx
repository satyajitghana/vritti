"use client";

import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface CtaGradientProps {
  className?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

export default function CtaGradient({
  className,
  onPrimaryClick,
  onSecondaryClick,
}: CtaGradientProps) {
  return (
    <section className={cn("w-full py-16 px-4", className)}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-5xl"
      >
        <div className="relative overflow-hidden rounded-2xl">
          <motion.div
            className="absolute inset-0 bg-[length:200%_200%]"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #6366f1, #8b5cf6, #d946ef, #ec4899, #6366f1)",
            }}
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 6, ease: "linear", repeat: Infinity }}
          />

          <div className="relative z-10 px-6 py-16 text-center sm:px-12 sm:py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
                <Sparkles className="h-4 w-4" />
                Limited Time Offer
              </div>

              <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Start Building Today
              </h2>

              <p className="mx-auto mb-8 max-w-xl text-lg text-white/80">
                Join thousands of developers who are already shipping faster
                with our platform. Get started for free, no credit card
                required.
              </p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button
                  size="lg"
                  className="bg-white text-violet-700 hover:bg-white/90"
                  onClick={onPrimaryClick}
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="ghost"
                  className="border border-white/30 text-white hover:bg-white/10 hover:text-white"
                  onClick={onSecondaryClick}
                >
                  View Live Demo
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
