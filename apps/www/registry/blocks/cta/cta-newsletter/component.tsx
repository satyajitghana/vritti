"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface CtaNewsletterProps {
  className?: string;
  onSubscribe?: (email: string) => void;
}

export default function CtaNewsletter({
  className,
  onSubscribe,
}: CtaNewsletterProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    onSubscribe?.(email);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail("");
    }, 3000);
  };

  return (
    <section className={cn("w-full py-16 px-4", className)}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-2xl text-center"
      >
        <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <Mail className="h-7 w-7 text-primary" />
        </div>

        <h2 className="mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Stay in the Loop
        </h2>
        <p className="mb-8 text-muted-foreground">
          Get the latest updates, tips, and resources delivered straight to your
          inbox. No spam, unsubscribe anytime.
        </p>

        <form onSubmit={handleSubmit} className="mx-auto max-w-md">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="h-11 w-full rounded-lg border border-border bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                >
                  <Button
                    type="button"
                    size="lg"
                    className="h-11 bg-emerald-600 hover:bg-emerald-600"
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="submit"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                >
                  <Button type="submit" size="lg" className="h-11">
                    Subscribe
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </form>

        <AnimatePresence>
          {submitted ? (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 text-sm font-medium text-emerald-600 dark:text-emerald-400"
            >
              Thanks for subscribing! Check your inbox for a confirmation.
            </motion.p>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-sm text-muted-foreground"
            >
              Join 10,000+ subscribers who trust us with their inbox.
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
