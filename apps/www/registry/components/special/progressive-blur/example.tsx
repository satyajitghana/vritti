"use client";

import { ProgressiveBlur } from "./component";

export default function ProgressiveBlurExample() {
  return (
    <div className="relative w-full rounded-xl border h-[300px]">
      <div className="h-full overflow-auto">
        <div className="flex flex-col gap-2 p-4">
          {Array.from({ length: 15 }).map((_, index) => (
            <div
              key={index}
              className="flex h-16 w-full items-center justify-center rounded-xl border"
            >
              Item {index + 1}
            </div>
          ))}
        </div>
      </div>
      <ProgressiveBlur position="bottom" height="40%" />
    </div>
  );
}
