"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import {
  DollarSign,
  Eye,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";

interface StatCard {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  trend: number;
  icon: LucideIcon;
}

const defaultStats: StatCard[] = [
  {
    label: "Total Users",
    value: 12847,
    trend: 12.5,
    icon: Users,
  },
  {
    label: "Revenue",
    value: 48295,
    prefix: "$",
    trend: 8.2,
    icon: DollarSign,
  },
  {
    label: "Page Views",
    value: 284910,
    trend: -3.1,
    icon: Eye,
  },
  {
    label: "Orders",
    value: 1423,
    trend: 24.3,
    icon: ShoppingCart,
  },
];

function useCountAnimation(target: number, duration = 1500) {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const startTime = performance.now();

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    }

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, duration]);

  return count;
}

function StatCardItem({
  stat,
  index,
}: {
  stat: StatCard;
  index: number;
}) {
  const animatedValue = useCountAnimation(stat.value);
  const isPositive = stat.trend >= 0;
  const Icon = stat.icon;

  const formatValue = (val: number) => {
    return val.toLocaleString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className="bg-background rounded-2xl border p-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="bg-muted rounded-xl p-3">
            <Icon className="text-foreground h-5 w-5" />
          </div>
          <div
            className={cn(
              "flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium",
              isPositive
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                : "bg-red-500/10 text-red-600 dark:text-red-400"
            )}
          >
            {isPositive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            {Math.abs(stat.trend)}%
          </div>
        </div>

        <div className="mt-4">
          <p className="text-foreground text-3xl font-bold tracking-tight">
            {stat.prefix}
            {formatValue(animatedValue)}
            {stat.suffix}
          </p>
          <p className="text-muted-foreground mt-1 text-sm">{stat.label}</p>
        </div>
      </div>
    </motion.div>
  );
}

export interface StatsCardsProps {
  className?: string;
  stats?: StatCard[];
}

export default function StatsCards({
  className,
  stats = defaultStats,
}: StatsCardsProps) {
  return (
    <section className={cn("px-4 py-16", className)}>
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCardItem key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
