"use client";

import ScrambleIn from "./component";

export default function ScrambleInExample() {
  return (
    <div className="w-full h-[400px] flex items-center justify-center">
      <div className="text-4xl font-mono font-bold">
        <ScrambleIn
          text="Hello, World!"
          scrambleSpeed={50}
          scrambledLetterCount={3}
          className="text-foreground"
          scrambledClassName="text-foreground/40"
          autoStart
        />
      </div>
    </div>
  );
}
