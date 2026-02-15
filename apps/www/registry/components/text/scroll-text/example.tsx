"use client";

import ScrollText from "./component";

export default function ScrollTextExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <ScrollText texts={["React", "Next.js", "TailwindCSS", "Motion", "TypeScript"]} />
    </div>
  );
}
