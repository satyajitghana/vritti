"use client";

import LetterSwapPingPong from "./component";

export default function LetterSwapPingPongExample() {
  return (
    <div className="w-full h-[400px] flex items-center justify-center">
      <LetterSwapPingPong
        label="Hover Me"
        className="text-4xl font-bold cursor-pointer"
        staggerDuration={0.04}
        reverse
      />
    </div>
  );
}
