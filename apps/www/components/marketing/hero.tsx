import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { TechStack } from "@/components/tech-stack";
import { HeroShaders } from "./hero-shaders";

export function Hero() {
  return (
    <section id="hero" className="px-4 pt-4 md:px-6 md:pt-6">
      <div className="relative flex min-h-[600px] h-[70vh] max-h-[900px] border rounded-2xl overflow-hidden mx-auto w-full max-w-[1400px] bg-origin-border">
        <HeroShaders />
        <div className="flex flex-col z-2 px-6 size-full md:p-12 max-md:items-center max-md:text-center">
          {/* Badge */}
          <Link
            href="/docs"
            className="mt-12 text-xs text-brand font-medium rounded-full py-2 px-4 border border-brand/50 w-fit transition-colors hover:bg-brand/10"
          >
            184+ Production-Ready Components
            <ChevronRight className="inline ml-1 size-3.5" />
          </Link>

          {/* Main Heading */}
          <h1
            className={cn(
              "text-foreground",
              "my-8 leading-tight font-medium tracking-tighter",
              "text-4xl xl:text-5xl xl:mb-12",
              "max-w-2xl"
            )}
          >
            UI library for{" "}
            <span className="text-brand">Design Engineers</span>
          </h1>

          {/* Description */}
          <p className="max-w-xl text-base tracking-tight text-balance text-muted-foreground md:text-lg mb-8">
            184+ free and open-source animated components and effects built
            with <b className="font-medium text-foreground">React</b>,{" "}
            <b className="font-medium text-foreground">TypeScript</b>,{" "}
            <b className="font-medium text-foreground">Tailwind CSS</b>, and{" "}
            <b className="font-medium text-foreground">Motion</b>.
            <br />
            Perfect companion for{" "}
            <b className="font-medium text-foreground">shadcn/ui</b>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-row items-center gap-4 flex-wrap w-fit">
            <Link
              href="/docs"
              className={cn(
                "inline-flex justify-center px-6 py-3 rounded-full font-medium tracking-tight transition-colors",
                "bg-brand text-brand-foreground hover:bg-brand/90",
                "max-sm:text-sm"
              )}
            >
              Browse Components
            </Link>
            <Link
              href="https://github.com/satyajitghana/vritti"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex justify-center px-6 py-3 rounded-full font-medium tracking-tight transition-colors",
                "border bg-secondary text-secondary-foreground hover:bg-accent",
                "max-sm:text-sm"
              )}
            >
              View on GitHub
            </Link>
          </div>

          {/* Tech Stack */}
          <div className="mt-auto pb-4">
            <TechStack
              className="flex items-center gap-3"
              technologies={[
                "react",
                "typescript",
                "tailwindcss",
                "motion",
                "shadcn",
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
