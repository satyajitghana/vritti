"use client"

import { Button } from "@/components/ui/button"
import {
  ExpandableScreen,
  ExpandableScreenContent,
  ExpandableScreenTrigger,
} from "./component"

export default function ExpandableScreenExample() {
  return (
    <ExpandableScreen
      layoutId="cta-card"
      triggerRadius="100px"
      contentRadius="24px"
    >
      <div className="relative flex min-h-screen flex-col items-center justify-center px-4 sm:px-6 py-12 sm:py-20">
        <div className="relative z-10 flex flex-col items-center gap-4 sm:gap-6 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal leading-[90%] tracking-[-0.03em] text-foreground max-w-2xl">
            Join the waitlist
          </h1>

          <p className="text-base sm:text-lg md:text-xl leading-[160%] text-foreground max-w-2xl px-4">
            Be among the first to experience our next-generation platform.
          </p>

          <ExpandableScreenTrigger>
            <div className="bg-primary h-15 px-6 sm:px-8 py-3 text-lg sm:text-xl font-regular text-primary-foreground tracking-[-0.01em]">
              Get early access
            </div>
          </ExpandableScreenTrigger>
        </div>
      </div>

      <ExpandableScreenContent className="bg-primary">
        <div className="relative z-10 flex flex-col h-full w-full max-w-[800px] mx-auto items-center p-6 sm:p-10 lg:p-16 gap-8">
          <h2 className="text-3xl sm:text-4xl font-medium text-primary-foreground leading-none tracking-[-0.03em]">
            Reserve your spot
          </h2>

          <form className="space-y-4 w-full max-w-md">
            <div>
              <label className="block text-xs font-mono text-primary-foreground mb-2 uppercase tracking-wider">
                Full Name *
              </label>
              <input
                type="text"
                className="w-full px-4 py-2.5 rounded-lg bg-card border-0 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/20 text-sm h-10"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-primary-foreground mb-2 uppercase tracking-wider">
                Email *
              </label>
              <input
                type="email"
                className="w-full px-4 py-2.5 rounded-lg bg-card border-0 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/20 text-sm h-10"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-primary-foreground mb-2 uppercase tracking-wider">
                What are you most excited about?
              </label>
              <textarea
                rows={3}
                placeholder="Tell us what features you're looking forward to..."
                className="w-full px-4 py-3 rounded-lg bg-card border-0 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/20 resize-none text-sm"
              />
            </div>

            <Button
              type="submit"
              className="w-full px-8 py-2.5 rounded-full bg-primary-foreground text-primary font-medium hover:bg-primary-foreground/90 h-10"
            >
              Join waitlist
            </Button>
          </form>
        </div>
      </ExpandableScreenContent>
    </ExpandableScreen>
  )
}
