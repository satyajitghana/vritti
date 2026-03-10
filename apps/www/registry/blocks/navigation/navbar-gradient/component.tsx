"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface NavbarGradientProps {
  className?: string;
  logo?: string;
  links?: { label: string; href: string }[];
  ctaLabel?: string;
  onCtaClick?: () => void;
}

const defaultLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export default function NavbarGradient({
  className,
  logo = "Vritti",
  links = defaultLinks,
  ctaLabel = "Get Started",
  onCtaClick,
}: NavbarGradientProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={cn("w-full px-4 pt-4", className)}>
      <nav
        className={cn(
          "relative mx-auto max-w-5xl rounded-2xl border border-border/50",
          "bg-gradient-to-r from-background/80 via-background/60 to-background/80",
          "backdrop-blur-xl shadow-lg"
        )}
      >
        <div className="flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <a href="#" className="text-lg font-bold text-foreground">
            {logo}
          </a>

          {/* Desktop Links */}
          <div className="hidden items-center gap-1 md:flex">
            {links.map((link, index) => (
              <a
                key={link.label}
                href={link.href}
                className="relative px-3 py-2"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {hoveredIndex === index && (
                  <motion.span
                    layoutId="navbar-hover"
                    className="absolute inset-0 rounded-lg bg-accent"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                  {link.label}
                </span>
              </a>
            ))}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              className="hidden md:inline-flex"
              onClick={onCtaClick}
            >
              {ctaLabel}
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>

            <button
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden md:hidden"
            >
              <div className="flex flex-col gap-1 border-t border-border/50 px-4 py-3">
                {links.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <Button
                  size="sm"
                  className="mt-2"
                  onClick={() => {
                    onCtaClick?.();
                    setMobileOpen(false);
                  }}
                >
                  {ctaLabel}
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}
