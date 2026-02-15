"use client"

import { ArrowRight, Repeat2 } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

export interface CardFlipProps {
  title?: string
  subtitle?: string
  description?: string
  features?: string[]
}

export default function CardFlip({
  title = "Design Systems",
  subtitle = "Explore the fundamentals",
  description = "Dive deep into the world of modern UI/UX design.",
  features = ["UI/UX", "Modern Design", "Tailwind CSS", "Components"],
}: CardFlipProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div
      className="group relative h-[320px] w-full max-w-[280px] [perspective:2000px]"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className={cn(
          "relative h-full w-full",
          "[transform-style:preserve-3d]",
          "transition-all duration-700",
          isFlipped
            ? "[transform:rotateY(180deg)]"
            : "[transform:rotateY(0deg)]"
        )}
      >
        {/* Front of card */}
        <div
          className={cn(
            "absolute inset-0 h-full w-full",
            "[backface-visibility:hidden] [transform:rotateY(0deg)]",
            "overflow-hidden rounded-2xl",
            "bg-zinc-50 dark:bg-zinc-900",
            "border border-zinc-200 dark:border-zinc-800/50",
            "shadow-sm dark:shadow-lg",
            "transition-all duration-700",
            "group-hover:shadow-lg dark:group-hover:shadow-xl",
            isFlipped ? "opacity-0" : "opacity-100"
          )}
        >
          <div className="relative h-full overflow-hidden bg-gradient-to-b from-zinc-100 to-white dark:from-zinc-900 dark:to-black">
            <div className="absolute inset-0 flex items-start justify-center pt-24">
              <div className="relative flex h-[100px] w-[200px] items-center justify-center">
                {[...Array(10)].map((_, i) => (
                  <div
                    className={cn(
                      "absolute h-[50px] w-[50px]",
                      "rounded-[140px]",
                      "opacity-0",
                      "shadow-[0_0_50px_rgba(255,165,0,0.5)]"
                    )}
                    key={i}
                    style={{
                      animation: `cardFlipScale 3s linear infinite`,
                      animationDelay: `${i * 0.3}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="absolute right-0 bottom-0 left-0 p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-1.5">
                <h3 className="font-semibold text-lg text-zinc-900 leading-snug tracking-tighter dark:text-white">
                  {title}
                </h3>
                <p className="line-clamp-2 text-sm text-zinc-600 tracking-tight dark:text-zinc-200">
                  {subtitle}
                </p>
              </div>
              <Repeat2 className="h-4 w-4 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div
          className={cn(
            "absolute inset-0 h-full w-full",
            "[backface-visibility:hidden] [transform:rotateY(180deg)]",
            "rounded-2xl p-6",
            "bg-gradient-to-b from-zinc-100 to-white dark:from-zinc-900 dark:to-black",
            "border border-zinc-200 dark:border-zinc-800",
            "shadow-sm dark:shadow-lg",
            "flex flex-col",
            "transition-all duration-700",
            isFlipped ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="flex-1 space-y-6">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-zinc-900 leading-snug tracking-tight dark:text-white">
                {title}
              </h3>
              <p className="line-clamp-2 text-sm text-zinc-600 tracking-tight dark:text-zinc-400">
                {description}
              </p>
            </div>

            <div className="space-y-2">
              {features.map((feature, index) => (
                <div
                  className="flex items-center gap-2 text-sm text-zinc-700 transition-all duration-500 dark:text-zinc-300"
                  key={feature}
                  style={{
                    transform: isFlipped
                      ? "translateX(0)"
                      : "translateX(-10px)",
                    opacity: isFlipped ? 1 : 0,
                    transitionDelay: `${index * 100 + 200}ms`,
                  }}
                >
                  <ArrowRight className="h-3 w-3 text-orange-500" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 border-zinc-200 border-t pt-6 dark:border-zinc-800">
            <div className="flex items-center justify-between rounded-xl bg-zinc-100 p-3 transition-all duration-300 hover:bg-orange-500/10 hover:cursor-pointer dark:bg-zinc-800 dark:hover:bg-orange-500/20">
              <span className="font-medium text-sm text-zinc-900 dark:text-white">
                Start today
              </span>
              <ArrowRight className="h-4 w-4 text-orange-500" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes cardFlipScale {
          0% {
            transform: scale(2);
            opacity: 0;
            box-shadow: 0px 0px 50px rgba(255, 165, 0, 0.5);
          }
          50% {
            transform: translate(0px, -5px) scale(1);
            opacity: 1;
            box-shadow: 0px 8px 20px rgba(255, 165, 0, 0.5);
          }
          100% {
            transform: translate(0px, 5px) scale(0.1);
            opacity: 0;
            box-shadow: 0px 10px 20px rgba(255, 165, 0, 0);
          }
        }
      `}</style>
    </div>
  )
}
