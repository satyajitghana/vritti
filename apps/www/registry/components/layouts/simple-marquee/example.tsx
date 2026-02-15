"use client";

import SimpleMarquee from "./component";

export default function SimpleMarqueeExample() {
  return (
    <div className="w-full overflow-hidden">
      <SimpleMarquee
        baseVelocity={3}
        direction="left"
        slowdownOnHover
        className="py-4"
      >
        {["React", "Next.js", "TypeScript", "Tailwind", "Motion"].map(
          (tech) => (
            <span
              key={tech}
              className="mx-8 text-2xl font-bold text-foreground/80"
            >
              {tech}
            </span>
          )
        )}
      </SimpleMarquee>
    </div>
  );
}
