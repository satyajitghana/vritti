"use client";

import RandomLetterSwapPingPong from "./component";

export default function RandomLetterSwapPingPongExample() {
  return (
    <div className="w-full h-[400px] flex items-center justify-center">
      <RandomLetterSwapPingPong
        label="Ping Pong"
        className="text-4xl font-bold cursor-pointer"
        staggerDuration={0.03}
        reverse
      />
    </div>
  );
}
