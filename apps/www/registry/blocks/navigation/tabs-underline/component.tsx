"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import { cn } from "@/lib/utils";

export interface TabItem {
  label: string;
  content: React.ReactNode;
}

export interface TabsUnderlineProps {
  className?: string;
  tabs?: TabItem[];
}

const defaultTabs: TabItem[] = [
  {
    label: "Overview",
    content: (
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground">Overview</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          This is the overview panel. It provides a high-level summary of all
          your projects and recent activity across your workspace.
        </p>
      </div>
    ),
  },
  {
    label: "Analytics",
    content: (
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground">Analytics</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          View detailed analytics and insights about your usage, performance
          metrics, and growth trends over time.
        </p>
      </div>
    ),
  },
  {
    label: "Settings",
    content: (
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground">Settings</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Configure your preferences, manage integrations, and customize your
          workspace settings to fit your workflow.
        </p>
      </div>
    ),
  },
  {
    label: "Billing",
    content: (
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground">Billing</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Manage your subscription, view invoices, and update your payment
          methods and billing information.
        </p>
      </div>
    ),
  },
];

export default function TabsUnderline({
  className,
  tabs = defaultTabs,
}: TabsUnderlineProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={cn("w-full", className)}>
      {/* Tab Buttons */}
      <div className="relative border-b border-border">
        <div className="flex gap-0">
          {tabs.map((tab, index) => (
            <button
              key={tab.label}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "relative px-5 py-3 text-sm font-medium transition-colors",
                activeIndex === index
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
              {activeIndex === index && (
                <motion.div
                  layoutId="tabs-underline-indicator"
                  className="absolute inset-x-0 -bottom-px h-0.5 bg-primary"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="relative overflow-hidden py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {tabs[activeIndex]?.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
