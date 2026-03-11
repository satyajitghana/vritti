"use client"

import { cn } from "@/lib/utils"

export const DistortedGlass = ({ className }: { className?: string }) => {
  return (
    <>
      <div
        className={cn(
          "relative h-[50px] w-full overflow-hidden rounded-b-2xl",
          className
        )}
      >
        <div className="pointer-events-none absolute bottom-0 z-10 size-full overflow-hidden rounded-b-2xl border border-border/20">
          <div className="glass-effect size-full"></div>
        </div>
        <svg className="absolute" width="0" height="0">
          <title>Distorted Glass</title>
          <defs>
            <filter id="fractal-noise-glass">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.12 0.12"
                numOctaves="1"
                result="warp"
              ></feTurbulence>
              <feDisplacementMap
                xChannelSelector="R"
                yChannelSelector="G"
                scale="30"
                in="SourceGraphic"
                in2="warp"
              />
            </filter>
          </defs>
        </svg>
      </div>

      <style jsx>{`
        .glass-effect {
          background: repeating-radial-gradient(
            circle at 50% 50%,
            transparent,
            rgba(128, 128, 128, 0.15) 10px,
            rgba(128, 128, 128, 0.05) 31px
          );
          filter: url(#fractal-noise-glass);
          background-size: 6px 6px;
          backdrop-filter: blur(0px);
        }
        :global(.dark) .glass-effect {
          background: repeating-radial-gradient(
            circle at 50% 50%,
            transparent,
            rgba(255, 255, 255, 0.1) 10px,
            rgba(255, 255, 255, 0.03) 31px
          );
        }
      `}</style>
    </>
  )
}
