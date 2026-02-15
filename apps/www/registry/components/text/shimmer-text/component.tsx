"use client";

import { motion } from "motion/react";

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}

interface ShimmerTextProps {
  text?: string;
  className?: string;
}

export default function ShimmerText({
  text = "Text Shimmer",
  className,
}: ShimmerTextProps) {
  return (
    <div className="flex items-center justify-center p-8">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden px-4 py-2"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          animate={{
            backgroundPosition: ["200% center", "-200% center"],
          }}
          className={cn(
            "bg-[length:200%_100%] bg-gradient-to-r from-neutral-950 via-neutral-400 to-neutral-950 bg-clip-text font-bold text-3xl text-transparent dark:from-white dark:via-neutral-600 dark:to-white",
            className
          )}
          transition={{
            duration: 2.5,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
          }}
        >
          {text}
        </motion.h1>
      </motion.div>
    </div>
  );
}
