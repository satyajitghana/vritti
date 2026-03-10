"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const items = [
  { id: 1, height: 250, gradient: "from-rose-500 to-pink-600", title: "Sunset Vista" },
  { id: 2, height: 180, gradient: "from-blue-500 to-cyan-600", title: "Ocean Breeze" },
  { id: 3, height: 320, gradient: "from-emerald-500 to-teal-600", title: "Forest Trail" },
  { id: 4, height: 200, gradient: "from-violet-500 to-purple-600", title: "Mountain Peak" },
  { id: 5, height: 280, gradient: "from-amber-500 to-orange-600", title: "Desert Dunes" },
  { id: 6, height: 150, gradient: "from-indigo-500 to-blue-600", title: "Night Sky" },
  { id: 7, height: 350, gradient: "from-pink-500 to-rose-600", title: "Cherry Blossoms" },
  { id: 8, height: 220, gradient: "from-teal-500 to-emerald-600", title: "Coral Reef" },
];

export interface GalleryMasonryProps {
  className?: string;
}

export default function GalleryMasonry({ className }: GalleryMasonryProps) {
  const [selected, setSelected] = useState<(typeof items)[0] | null>(null);

  return (
    <section className={cn("w-full py-12 px-4", className)}>
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-2 text-center text-3xl font-bold tracking-tight text-foreground">
          Photo Gallery
        </h2>
        <p className="mb-8 text-center text-muted-foreground">
          A curated collection of moments captured in time.
        </p>

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className="mb-4 break-inside-avoid"
            >
              <div
                className="group relative cursor-pointer overflow-hidden rounded-lg"
                style={{ height: item.height }}
                onClick={() => setSelected(item)}
              >
                <div
                  className={cn(
                    "h-full w-full bg-gradient-to-br",
                    item.gradient
                  )}
                />
                <motion.div
                  className="absolute inset-0 flex items-end bg-black/0 p-4 transition-colors group-hover:bg-black/40"
                  initial={false}
                >
                  <motion.span
                    className="translate-y-4 text-sm font-medium text-white opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    {item.title}
                  </motion.span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="relative w-full max-w-3xl overflow-hidden rounded-xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={cn(
                  "h-[400px] w-full bg-gradient-to-br sm:h-[500px]",
                  selected.gradient
                )}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <h3 className="text-xl font-semibold text-white">
                  {selected.title}
                </h3>
              </div>
              <button
                className="absolute right-3 top-3 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
                onClick={() => setSelected(null)}
              >
                <X className="h-5 w-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
