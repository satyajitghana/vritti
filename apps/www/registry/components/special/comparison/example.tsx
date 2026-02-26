"use client";

import { Comparison, ComparisonHandle, ComparisonItem } from "./component";

export default function ComparisonExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <Comparison className="aspect-video w-full max-w-lg rounded-lg border">
        <ComparisonItem position="left">
          <div className="flex size-full items-center justify-center bg-zinc-200 dark:bg-zinc-800">
            <p className="text-lg font-semibold text-zinc-600 dark:text-zinc-300">Before</p>
          </div>
        </ComparisonItem>
        <ComparisonItem position="right">
          <div className="flex size-full items-center justify-center bg-zinc-900 dark:bg-zinc-100">
            <p className="text-lg font-semibold text-white dark:text-zinc-900">After</p>
          </div>
        </ComparisonItem>
        <ComparisonHandle />
      </Comparison>
    </div>
  );
}
