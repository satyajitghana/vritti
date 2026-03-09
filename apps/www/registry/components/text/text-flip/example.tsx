"use client";

import { TextFlip } from "./component";

export default function TextFlipExample() {
  return (
    <div className="flex items-center justify-center gap-2 p-8 text-2xl font-bold">
      <span>Build with</span>
      <TextFlip className="text-primary">
        {["React", "Next.js", "Tailwind", "Motion"]}
      </TextFlip>
    </div>
  );
}
