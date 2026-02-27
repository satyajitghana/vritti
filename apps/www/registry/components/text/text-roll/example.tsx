"use client";

import TextRoll from "./component";

export default function TextRollExample() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <TextRoll className="text-4xl font-extrabold uppercase tracking-tight">
        Hello
      </TextRoll>
      <TextRoll center className="text-4xl font-extrabold uppercase tracking-tight">
        World
      </TextRoll>
    </div>
  );
}
