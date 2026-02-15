"use client";

import RandomLetterSwapForward from "./component";

export default function RandomLetterSwapForwardExample() {
  return (
    <div className="w-full h-[400px] flex items-center justify-center">
      <RandomLetterSwapForward
        label="Random Swap"
        className="text-4xl font-bold cursor-pointer"
        staggerDuration={0.03}
        reverse
      />
    </div>
  );
}
