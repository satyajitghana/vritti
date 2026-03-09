"use client";

import { ExplodingInput } from "./component";

export default function ExplodingInputExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <ExplodingInput
        content={["🎉", "✨", "💥", "⭐"]}
        count={3}
      />
    </div>
  );
}
