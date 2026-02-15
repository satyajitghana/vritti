"use client";

import UnderlineToBackground from "./component";

export default function UnderlineToBackgroundExample() {
  return (
    <div className="w-full h-[400px] flex flex-col items-center justify-center gap-6">
      <UnderlineToBackground
        className="text-3xl font-semibold"
        targetTextColor="#ffffff"
      >
        Hover to fill background
      </UnderlineToBackground>
      <UnderlineToBackground
        className="text-xl"
        targetTextColor="#ffffff"
      >
        Another example
      </UnderlineToBackground>
    </div>
  );
}
