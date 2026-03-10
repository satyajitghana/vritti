"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import { cn } from "@/lib/utils";

type Category = "All" | "Design" | "Development" | "Marketing";

const categories: Category[] = ["All", "Design", "Development", "Marketing"];

const items = [
  { id: 1, title: "Brand Identity", category: "Design" as const, gradient: "from-rose-500 to-pink-600" },
  { id: 2, title: "Web Application", category: "Development" as const, gradient: "from-blue-500 to-cyan-600" },
  { id: 3, title: "SEO Campaign", category: "Marketing" as const, gradient: "from-amber-500 to-orange-600" },
  { id: 4, title: "UI Components", category: "Design" as const, gradient: "from-violet-500 to-purple-600" },
  { id: 5, title: "Mobile App", category: "Development" as const, gradient: "from-emerald-500 to-teal-600" },
  { id: 6, title: "Social Media", category: "Marketing" as const, gradient: "from-pink-500 to-rose-600" },
  { id: 7, title: "Icon Set", category: "Design" as const, gradient: "from-indigo-500 to-blue-600" },
  { id: 8, title: "API Platform", category: "Development" as const, gradient: "from-teal-500 to-emerald-600" },
  { id: 9, title: "Email Campaign", category: "Marketing" as const, gradient: "from-orange-500 to-red-600" },
  { id: 10, title: "Dashboard UI", category: "Design" as const, gradient: "from-cyan-500 to-blue-600" },
  { id: 11, title: "CLI Tool", category: "Development" as const, gradient: "from-gray-500 to-slate-600" },
  { id: 12, title: "Ad Creatives", category: "Marketing" as const, gradient: "from-yellow-500 to-amber-600" },
];

export interface GalleryGridFilterProps {
  className?: string;
}

export default function GalleryGridFilter({ className }: GalleryGridFilterProps) {
  const [active, setActive] = useState<Category>("All");

  const filtered = active === "All" ? items : items.filter((i) => i.category === active);

  return (
    <section className={cn("w-full py-12 px-4", className)}>
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-2 text-center text-3xl font-bold tracking-tight text-foreground">
          Portfolio
        </h2>
        <p className="mb-8 text-center text-muted-foreground">
          Filter by category to explore our work.
        </p>

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={cn(
                "relative rounded-full px-5 py-2 text-sm font-medium transition-colors",
                active === cat
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {active === cat && (
                <motion.span
                  layoutId="gallery-filter-tab"
                  className="absolute inset-0 rounded-full bg-primary"
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group overflow-hidden rounded-lg border border-border bg-card"
              >
                <div
                  className={cn(
                    "h-48 w-full bg-gradient-to-br",
                    item.gradient
                  )}
                />
                <div className="p-4">
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <span className="mt-1 inline-block rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                    {item.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
