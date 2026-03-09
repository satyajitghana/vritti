"use client";

import { Timeline } from "./component";

export default function TimelineExample() {
  const data = [
    {
      title: "2024",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm">
            Started building amazing components with modern web technologies.
          </p>
        </div>
      ),
    },
    {
      title: "2025",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm">
            Launched the component library with beautiful animations and interactions.
          </p>
        </div>
      ),
    },
    {
      title: "2026",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm">
            Continued expanding with new features and community contributions.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
}
