"use client";

import { LogosCarousel } from "./component";

export default function LogosCarouselExample() {
  return (
    <div className="flex items-center justify-center p-8 w-full">
      <LogosCarousel count={3}>
        <div className="flex items-center gap-2 text-sm font-medium">React</div>
        <div className="flex items-center gap-2 text-sm font-medium">Next.js</div>
        <div className="flex items-center gap-2 text-sm font-medium">TypeScript</div>
        <div className="flex items-center gap-2 text-sm font-medium">Tailwind</div>
        <div className="flex items-center gap-2 text-sm font-medium">Vercel</div>
        <div className="flex items-center gap-2 text-sm font-medium">Prisma</div>
      </LogosCarousel>
    </div>
  );
}
