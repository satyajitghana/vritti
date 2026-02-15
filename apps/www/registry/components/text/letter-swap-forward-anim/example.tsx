"use client";

import LetterSwapForward from "./component";

export default function LetterSwapForwardExample() {
  return (
    <div className="w-full h-[400px] flex items-center justify-center">
      <LetterSwapForward
        label="Hover Me"
        className="text-4xl font-bold cursor-pointer"
        staggerDuration={0.04}
        reverse
      />
    </div>
  );
}
