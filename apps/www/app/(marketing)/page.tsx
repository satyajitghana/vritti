import { Hero } from "@/components/marketing/hero";
import { Features } from "@/components/marketing/features";
import { Showcase } from "@/components/marketing/showcase";
import { CTA } from "@/components/marketing/testimonials";
import { InstallAnimation } from "@/components/marketing/install-animation";

export default function Home() {
  return (
    <main className="pb-6 md:pb-12">
      <Hero />
      <div className="grid grid-cols-1 gap-8 mt-12 px-6 mx-auto w-full max-w-[1400px] md:px-12 lg:grid-cols-2">
        {/* Intro tagline */}
        <p className="text-2xl tracking-tight leading-snug font-light col-span-full md:text-3xl xl:text-4xl">
          Vritti UI is a <span className="text-brand font-medium">React</span> component
          library for <span className="text-brand font-medium">Developers</span>, beautifully
          designed with <span className="text-brand font-medium">Tailwind CSS</span> and{" "}
          <span className="text-brand font-medium">Motion</span>. Copy, paste, and build —
          no dependencies, full ownership.
        </p>

        {/* Install animation */}
        <div className="col-span-full">
          <h2 className="text-xl text-center text-brand font-mono font-bold uppercase mb-4">
            Try it out.
          </h2>
          <div className="mx-auto w-full max-w-[800px]">
            <InstallAnimation />
          </div>
        </div>

        {/* Feature cards */}
        <Features />

        {/* Category showcase */}
        <Showcase />

        {/* CTA */}
        <CTA />
      </div>
    </main>
  );
}
