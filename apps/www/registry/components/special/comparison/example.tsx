"use client";

import { Comparison, ComparisonHandle, ComparisonItem } from "./component";

export default function ComparisonExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <Comparison className="aspect-video max-w-lg rounded-lg border">
        <ComparisonItem position="left">
          <div className="flex size-full items-center justify-center bg-muted">
            <p className="text-lg font-semibold text-muted-foreground">Before</p>
          </div>
        </ComparisonItem>
        <ComparisonItem position="right">
          <div className="flex size-full items-center justify-center bg-primary">
            <p className="text-lg font-semibold text-primary-foreground">After</p>
          </div>
        </ComparisonItem>
        <ComparisonHandle />
      </Comparison>
    </div>
  );
}
