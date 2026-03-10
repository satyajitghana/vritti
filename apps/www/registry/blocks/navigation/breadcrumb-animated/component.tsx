"use client";

import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, Home } from "lucide-react";

import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbAnimatedProps {
  className?: string;
  items?: BreadcrumbItem[];
}

const defaultItems: BreadcrumbItem[] = [
  { label: "Home", href: "#" },
  { label: "Dashboard", href: "#" },
  { label: "Projects", href: "#" },
  { label: "Settings" },
];

export default function BreadcrumbAnimated({
  className,
  items = defaultItems,
}: BreadcrumbAnimatedProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("w-full px-4 py-3", className)}
    >
      <ol className="flex items-center gap-1">
        <AnimatePresence mode="popLayout">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const isFirst = index === 0;

            return (
              <motion.li
                key={`${item.label}-${index}`}
                initial={{ opacity: 0, x: -8, filter: "blur(4px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: 8, filter: "blur(4px)" }}
                transition={{ duration: 0.25, delay: index * 0.05 }}
                className="flex items-center gap-1"
              >
                {index > 0 && (
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60" />
                )}
                {isLast ? (
                  <span className="flex items-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium text-foreground">
                    {isFirst && <Home className="h-3.5 w-3.5" />}
                    {item.label}
                  </span>
                ) : (
                  <motion.a
                    href={item.href}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="group flex items-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    {isFirst && <Home className="h-3.5 w-3.5" />}
                    <span>{item.label}</span>
                  </motion.a>
                )}
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ol>
    </nav>
  );
}
