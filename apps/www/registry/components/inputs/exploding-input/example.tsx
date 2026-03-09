"use client";

import { ExplodingInput } from "./component";

export default function ExplodingInputExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <label className="relative">
        <input
          type="text"
          placeholder="Type something..."
          className="rounded-lg border border-border bg-background px-4 py-2 text-foreground outline-none"
        />
        <ExplodingInput
          content={["🎉", "✨", "💥", "⭐"]}
          count={3}
        />
      </label>
    </div>
  );
}
