"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const slides = [
  { id: 1, gradient: "from-rose-500 to-pink-600", title: "Vibrant Horizons" },
  { id: 2, gradient: "from-blue-500 to-cyan-600", title: "Azure Dreams" },
  { id: 3, gradient: "from-emerald-500 to-teal-600", title: "Emerald Forest" },
  { id: 4, gradient: "from-violet-500 to-purple-600", title: "Lavender Fields" },
  { id: 5, gradient: "from-amber-500 to-orange-600", title: "Golden Hour" },
  { id: 6, gradient: "from-indigo-500 to-blue-600", title: "Midnight Glow" },
];

export interface GalleryCarouselProps {
  className?: string;
}

export default function GalleryCarousel({ className }: GalleryCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current]
  );

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <section className={cn("w-full py-12 px-4", className)}>
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-2 text-center text-3xl font-bold tracking-tight text-foreground">
          Image Carousel
        </h2>
        <p className="mb-8 text-center text-muted-foreground">
          Browse through our featured collection.
        </p>

        <div
          className="relative overflow-hidden rounded-xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative h-[300px] w-full sm:h-[400px] lg:h-[500px]">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <div
                  className={cn(
                    "h-full w-full bg-gradient-to-br",
                    slides[current].gradient
                  )}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-6">
                  <h3 className="text-xl font-semibold text-white">
                    {slides[current].title}
                  </h3>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/30 text-white hover:bg-black/50 hover:text-white"
            onClick={prev}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/30 text-white hover:bg-black/50 hover:text-white"
            onClick={next}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        <div className="mt-4 flex justify-center gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => goTo(index)}
              className={cn(
                "h-16 w-24 overflow-hidden rounded-md border-2 transition-all",
                current === index
                  ? "border-primary ring-2 ring-primary/30"
                  : "border-transparent opacity-60 hover:opacity-100"
              )}
            >
              <div
                className={cn(
                  "h-full w-full bg-gradient-to-br",
                  slide.gradient
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
