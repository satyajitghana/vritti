"use client";

import { ScrollFadeEffect } from "./component";

export default function ScrollFadeEffectExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <ScrollFadeEffect className="h-48 w-64 overflow-y-auto">
        <div className="space-y-4 p-4">
          {Array.from({ length: 20 }, (_, i) => (
            <p key={i} className="text-sm text-muted-foreground">
              Item {i + 1} - Scroll to see the fade effect
            </p>
          ))}
        </div>
      </ScrollFadeEffect>
    </div>
  );
}
